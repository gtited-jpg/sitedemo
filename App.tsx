import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Ticket, 
  Package, 
  Bot, 
  Settings, 
  X, 
  Maximize2, 
  Minimize2, 
  ArrowRight, 
  Store, 
  Cpu, 
  Shield, 
  Zap, 
  LogOut, 
  CheckCircle2, 
  Infinity,
  Smartphone,
  Globe,
  Chrome,
  Monitor,
  Check,
  Layout,
  MonitorCheck,
  Gift,
  Users,
  FileText,
  DollarSign,
  ShoppingCart,
  Megaphone,
  BarChart3,
  BookOpen,
  Truck,
  Library,
  Coins,
  Scale,
  Award,
  ShieldCheck,
  Star,
  Trophy,
  Medal,
  Power,
  Tablet,
  Laptop
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  icon: React.ReactNode;
}

interface AppDefinition {
  id: string;
  name: string;
  icon: React.ReactNode;
  imageIcon?: string;
  color: string;
  component: React.FC<{ onClose: () => void }>;
}

interface IconPos {
  id: string;
  col: number; row: number;
}

// --- Constants ---
const PATENT_NOTICE = "Patent Pending: US 10/2025/08429-DAEMON";
const GRID_SIZE_X = 100;
const GRID_SIZE_Y = 110;
const PADDING = 24;

const IMAGES = {
  logo: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/repairoslogo.png",
  multitask: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/multitask.png",
  nexus: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/Screenshot%202025-12-19%20172435.png",
  inventory: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/inventory.png",
  settings: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/employee.png",
  employeesLog: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/employeeslog.png",
  employeesMain: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/employees.png",
  tickets1: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/tickets.png",
  tickets2: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/ticketdatabase.png",
  tickets4: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/ticketmodal.png",
  estimates: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/estimates2.png",
  buyback: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/buyback.png",
  analytics: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/analytics.png",
  guide: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/guide.png",
  payroll1: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/payrollROS.png",
  payroll2: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/payroll2ROS.png",
  payroll3: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/payroll3ROS.png",
  pos: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/posROS.png"
};

const LEMON_SQUEEZY_LINK = "https://daemoncore.lemonsqueezy.com/checkout/buy/460d2a55-e651-4839-bd7c-3bab72437301";

// --- Components ---

const Lightbox: React.FC<{ src: string; onClose: () => void; label?: string }> = ({ src, onClose, label }) => (
  <div 
    className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4 md:p-8 animate-in fade-in duration-300"
    onClick={onClose}
  >
    <button 
      onClick={onClose}
      className="absolute top-6 right-6 z-[100001] p-5 bg-white/10 hover:bg-red-500 text-white rounded-3xl transition-all border border-white/20 shadow-2xl"
    >
      <X size={32} />
    </button>
    <img src={src} className="max-w-[90vw] max-h-[85vh] object-contain rounded-3xl shadow-2xl animate-in zoom-in duration-500" alt="Preview" />
  </div>
);

const DesktopIcon: React.FC<{ 
  app: AppDefinition; 
  pos: { col: number; row: number };
  onDragEnd: (id: string, col: number, row: number) => void;
  onClick: () => void;
}> = ({ app, pos, onDragEnd, onClick }) => {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    e.preventDefault();
  };

  useEffect(() => {
    if (!dragging) return;
    const handleMouseUp = (e: MouseEvent) => {
      setDragging(false);
      const col = Math.round((e.clientX - PADDING - offset.x) / GRID_SIZE_X);
      const row = Math.round((e.clientY - PADDING - offset.y) / GRID_SIZE_Y);
      onDragEnd(app.id, Math.max(0, col), Math.max(0, row));
    };
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [dragging, offset, app.id, onDragEnd]);

  return (
    <div 
      onMouseDown={handleMouseDown}
      onClick={() => !dragging && onClick()}
      className={`absolute transition-all duration-300 group flex flex-col items-center gap-1 w-20 p-2 cursor-pointer select-none rounded-xl border border-transparent hover:bg-white/10 active:scale-95 ${dragging ? 'opacity-50 z-[1000] scale-110 !transition-none' : 'z-10'}`}
      style={{ left: PADDING + pos.col * GRID_SIZE_X, top: PADDING + pos.row * GRID_SIZE_Y }}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg overflow-hidden ${app.imageIcon ? 'bg-black' : `bg-gradient-to-br ${app.color}`}`}>
        {app.imageIcon ? <img src={app.imageIcon} className="w-full h-full object-cover" alt="" /> : React.cloneElement(app.icon as React.ReactElement<any>, { size: 24 })}
      </div>
      <span className="text-[10px] font-bold text-white/90 text-center drop-shadow-md line-clamp-2 leading-tight">{app.name}</span>
    </div>
  );
};

const Window: React.FC<{
  window: WindowState;
  app: AppDefinition;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}> = ({ window, app, onClose, onMinimize, onFocus, children }) => {
  if (!window.isOpen || window.isMinimized) return null;
  return (
    <div 
      onMouseDown={onFocus}
      className="absolute top-10 left-10 md:top-20 md:left-40 w-[90vw] h-[80vh] md:w-[85vw] md:h-[80vh] glass rounded-3xl overflow-hidden window-shadow border border-white/10 flex flex-col animate-in zoom-in duration-300 shadow-2xl"
      style={{ zIndex: window.zIndex }}
    >
      <div className="h-12 bg-black/60 border-b border-white/5 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-white ${app.imageIcon ? 'bg-black' : `bg-gradient-to-br ${app.color}`}`}>
            {app.imageIcon ? <img src={app.imageIcon} className="w-full h-full object-cover" alt="" /> : React.cloneElement(app.icon as React.ReactElement<any>, { size: 12 })}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-white/80">{app.name}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={onMinimize} className="p-2 hover:bg-white/10 rounded-lg text-white/40"><Minimize2 size={16} /></button>
          <button onClick={onClose} className="p-2 hover:bg-red-500 rounded-lg text-white/40 hover:text-white"><X size={16} /></button>
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-[#0a0b0d]">{children}</div>
    </div>
  );
};

const FeatureSplitView: React.FC<{ 
  title: string; 
  children: React.ReactNode; 
  icon: React.ReactNode; 
  colorClass: string;
  screenshots: string[];
  highlights: string[];
}> = ({ title, children, icon, colorClass, screenshots, highlights }) => {
  const [lb, setLb] = useState<string | null>(null);
  return (
    <>
      <div className="flex flex-col lg:flex-row h-full font-poppins">
        <div className="w-full lg:w-[40%] p-10 lg:p-14 overflow-y-auto border-r border-white/5 bg-black/30 flex flex-col h-full">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-8 shadow-2xl`}>
            {React.cloneElement(icon as React.ReactElement<any>, { size: 32, className: "text-white" })}
          </div>
          <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">{title}</h2>
          <div className="text-white/50 leading-relaxed mb-10">{children}</div>
          <div className="pt-8 border-t border-white/5 space-y-3">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-bold text-white/40">
                <CheckCircle2 size={16} className="text-emerald-500" /> {h}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-8 overflow-y-auto bg-black/50 space-y-10">
          {screenshots.map((s, i) => (
            <button key={i} onClick={() => setLb(s)} className="w-full rounded-2xl border border-white/10 overflow-hidden hover:scale-[1.01] transition-transform shadow-2xl">
              <img src={s} className="w-full h-auto" alt="" />
            </button>
          ))}
        </div>
      </div>
      {lb && <Lightbox src={lb} onClose={() => setLb(null)} />}
    </>
  );
};

// --- App Modules ---
const Dashboard = () => <FeatureSplitView title="Dashboard" icon={<LayoutDashboard />} colorClass="from-blue-600 to-indigo-600" screenshots={[IMAGES.multitask]} highlights={["Real-time Telemetry", "Bench Pressure Matrix", "Cashflow Signals"]}><p>Command your shop from a unified cockpit. Track every metric in real-time.</p></FeatureSplitView>;
const Tickets = () => <FeatureSplitView title="Tickets" icon={<Ticket />} colorClass="from-pink-600 to-rose-600" screenshots={[IMAGES.tickets1, IMAGES.tickets2, IMAGES.tickets4]} highlights={["Kanban Matrix", "Automated SMS", "L1-L4 Tech Flow"]}><p>Advanced device intake and workflow management system.</p></FeatureSplitView>;
const Inventory = () => <FeatureSplitView title="Inventory" icon={<Package />} colorClass="from-emerald-600 to-teal-600" screenshots={[IMAGES.inventory]} highlights={["Vault Storage", "Low Stock Triggers", "Supplier Sync"]}><p>The ultimate part repository. Manage thousands of SKUs with ease.</p></FeatureSplitView>;
const Payroll = () => <FeatureSplitView title="Payroll" icon={<Coins />} colorClass="from-green-600 to-emerald-700" screenshots={[IMAGES.payroll1, IMAGES.payroll2, IMAGES.payroll3]} highlights={["Tax Logic", "Commission Tracking", "Direct Deposit"]}><p>Precision accounting for your technicians and staff.</p></FeatureSplitView>;
const POS = () => <FeatureSplitView title="Terminal POS" icon={<ShoppingCart />} colorClass="from-amber-400 to-orange-600" screenshots={[IMAGES.pos]} highlights={["Split Pay", "Integrated Readers", "Offline Buffer"]}><p>High-velocity retail environment terminal.</p></FeatureSplitView>;
const Estimates = () => <FeatureSplitView title="Estimates" icon={<FileText />} colorClass="from-amber-600 to-orange-700" screenshots={[IMAGES.estimates]} highlights={["Instant Quoting", "PDF Pipeline", "Approval Matrix"]}><p>Professional quotes delivered in seconds.</p></FeatureSplitView>;
const BuyBack = () => <FeatureSplitView title="Buy Back" icon={<DollarSign />} colorClass="from-teal-600 to-cyan-700" screenshots={[IMAGES.buyback]} highlights={["Grading Algorithm", "Instant Offers", "Contract Automation"]}><p>Scale your pre-owned inventory with surgical pricing.</p></FeatureSplitView>;
const Analytics = () => <FeatureSplitView title="Analytics" icon={<BarChart3 />} colorClass="from-emerald-500 to-cyan-600" screenshots={[IMAGES.analytics]} highlights={["Profitability Maps", "Labor Efficiency", "Weekly Signals"]}><p>Deep data insights for growth-focused shops.</p></FeatureSplitView>;
const Personnel = () => <FeatureSplitView title="Personnel" icon={<Users />} colorClass="from-slate-600 to-indigo-800" screenshots={[IMAGES.employeesMain, IMAGES.employeesLog]} highlights={["Security Clearance", "Performance Logs", "Uptime Tracking"]}><p>Manage your recruits from intake to retirement.</p></FeatureSplitView>;
const Nexus = () => <FeatureSplitView title="Nexus Store" icon={<Store />} colorClass="from-cyan-600 to-blue-600" screenshots={[IMAGES.nexus]} highlights={["Module Hub", "Verified Apps", "Weekly Updates"]}><p>Expand your OS capabilities with native shop modules.</p></FeatureSplitView>;
const Guide = () => <FeatureSplitView title="RepairOS Guide" icon={<Library />} colorClass="from-blue-700 to-blue-900" screenshots={[IMAGES.guide]} highlights={["SOP Database", "Tech Training", "Hardware Config"]}><p>The master documentation for every Repair OS module.</p></FeatureSplitView>;

const DaemonAI = () => {
  const [msgs, setMsgs] = useState([{ r: 'ai', c: 'DAEMON ONLINE. State your directive, Administrator.' }]);
  const [inp, setInp] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSend = async () => {
    if (!inp.trim() || loading) return;
    const uMsg = { r: 'user', c: inp };
    setMsgs(prev => [...prev, uMsg]);
    setInp('');
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const resp = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [...msgs, uMsg].map(m => ({ role: m.r === 'ai' ? 'model' : 'user', parts: [{ text: m.c }] })),
        config: { systemInstruction: 'You are DAEMON AI. Professional, elite, and direct. Membership is $199/mo with zero upsells. Every single app is included.' }
      });
      setMsgs(prev => [...prev, { r: 'ai', c: resp.text || "Neural link failure." }]);
    } catch { setMsgs(prev => [...prev, { r: 'ai', c: "Neural core timeout." }]); } finally { setLoading(false); }
  };
  return (
    <div className="flex flex-col h-full bg-[#0d0e12] font-poppins">
      <div className="flex-1 p-8 overflow-y-auto space-y-6">
        {msgs.map((m, i) => (
          <div key={i} className={`p-5 rounded-2xl max-w-2xl ${m.r === 'ai' ? 'bg-purple-600/10 border border-purple-500/20 text-white' : 'bg-white/5 border border-white/10 ml-auto text-white'}`}>
            <div className="text-[9px] font-black uppercase text-white/30 mb-2 tracking-widest">{m.r}</div>
            <p className="text-sm font-medium">{m.c}</p>
          </div>
        ))}
        {loading && <div className="text-purple-400 text-[10px] font-black animate-pulse uppercase tracking-widest">Processing command...</div>}
      </div>
      <div className="p-6 border-t border-white/5 flex gap-4">
        <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-purple-500/50" placeholder="Command DAEMON..." />
        <button onClick={handleSend} className="p-4 bg-purple-600 rounded-2xl text-white hover:bg-purple-500 transition-colors"><ArrowRight size={20} /></button>
      </div>
    </div>
  );
};

const APPS: AppDefinition[] = [
  { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard />, color: 'from-blue-600 to-indigo-600', component: Dashboard },
  { id: 'tickets', name: 'Tickets', icon: <Ticket />, color: 'from-pink-600 to-rose-600', component: Tickets },
  { id: 'inventory', name: 'Inventory', icon: <Package />, color: 'from-emerald-600 to-teal-600', component: Inventory },
  { id: 'pos', name: 'Terminal POS', icon: <ShoppingCart />, color: 'from-amber-400 to-orange-600', component: POS },
  { id: 'payroll', name: 'Payroll', icon: <Coins />, color: 'from-green-600 to-emerald-700', component: Payroll },
  { id: 'marketing', name: 'Marketing', icon: <Megaphone />, color: 'from-indigo-600 to-purple-600', component: () => <FeatureSplitView title="Marketing" icon={<Megaphone />} colorClass="from-indigo-600 to-purple-600" screenshots={[IMAGES.nexus]} highlights={["Automated Reviews", "SMS Campaigns", "Loyalty Hub"]}><p>Automate your business growth engine.</p></FeatureSplitView> },
  { id: 'analytics', name: 'Analytics', icon: <BarChart3 />, color: 'from-emerald-500 to-cyan-600', component: Analytics },
  { id: 'personnel', name: 'Personnel', icon: <Users />, color: 'from-slate-600 to-indigo-800', component: Personnel },
  { id: 'estimates', name: 'Estimates', icon: <FileText />, color: 'from-amber-600 to-orange-700', component: Estimates },
  { id: 'buyback', name: 'Buy Back', icon: <DollarSign />, color: 'from-teal-600 to-cyan-700', component: BuyBack },
  { id: 'wiki', name: 'Wiki', icon: <BookOpen />, color: 'from-slate-600 to-slate-800', component: () => <FeatureSplitView title="Wiki" icon={<BookOpen />} colorClass="from-slate-600 to-slate-800" screenshots={[IMAGES.nexus]} highlights={["Schematic Library", "SOP Storage", "Internal Training"]}><p>Knowledge is power. Centralize your shop intelligence.</p></FeatureSplitView> },
  { id: 'guide', name: 'Guide', icon: <Library />, color: 'from-blue-700 to-blue-900', component: Guide },
  { id: 'suppliers', name: 'Suppliers', icon: <Truck />, color: 'from-rose-600 to-pink-600', component: () => <FeatureSplitView title="Suppliers" icon={<Truck />} colorClass="from-rose-600 to-pink-600" screenshots={[IMAGES.inventory]} highlights={["Global Hub", "Instant Orders", "Return Tracking"]}><p>Direct parts procurement pipeline.</p></FeatureSplitView> },
  { id: 'daemon', name: 'Daemon AI', icon: <Bot />, color: 'from-purple-600 to-fuchsia-600', component: DaemonAI },
  { id: 'nexus', name: 'Nexus', icon: <Store />, color: 'from-cyan-600 to-blue-600', component: Nexus },
  { id: 'settings', name: 'Setup', icon: <Settings />, color: 'from-gray-600 to-slate-600', component: () => <FeatureSplitView title="Setup" icon={<Settings />} colorClass="from-gray-600 to-slate-600" screenshots={[IMAGES.settings]} highlights={["Global Config", "User Management", "Theme Overrides"]}><p>Configure your shop environment settings.</p></FeatureSplitView> },
];

// --- Showcase Component ---

const ShowCase: React.FC<{ onLaunch: () => void }> = ({ onLaunch }) => {
  const [lbImage, setLbImage] = useState<string | null>(null);
  const [showLegal, setShowLegal] = useState(false);
  
  const awards = [
    { icon: <ShieldCheck size={20} />, label: "Security Verified 2025" },
    { icon: <Trophy size={20} />, label: "Shop Choice Award" },
    { icon: <Award size={20} />, label: "Elite Tech Choice" },
    { icon: <Medal size={20} />, label: "Product of the Year" }
  ];

  return (
    <div className="w-full bg-[#050505] text-white selection:bg-blue-500/30 overflow-y-auto h-screen scroll-smooth font-poppins relative">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-black/50 backdrop-blur-xl px-12 py-8 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-3xl font-black tracking-tighter uppercase leading-none">REPAIR<span className="text-blue-500">OS</span></span>
          <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/20 mt-1">BY DAEMONCORE®</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
          <a href="#everything" className="hover:text-white transition-colors">Membership</a>
          <a href="#compatibility" className="hover:text-white transition-colors">Compatibility</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <button onClick={onLaunch} className="bg-white text-black px-10 py-3 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl">Launch Demo</button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-10 text-center pt-32 pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_60%)]"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-black uppercase tracking-[0.4em] mb-12 animate-pulse">
            <Zap size={14} /> NEW APPS ADDED WEEKLY // NO UPSELLS
          </div>

          <div className="flex flex-col items-center mb-16">
            <h1 className="text-[7rem] md:text-[11rem] font-black leading-[0.75] tracking-tighter uppercase drop-shadow-[0_0_80px_rgba(59,130,246,0.2)]">
              REPAIR<span className="text-blue-500">OS</span>
            </h1>
            <div className="text-[12px] md:text-[14px] font-black tracking-[1.2em] text-white/20 uppercase mt-8 flex items-center gap-6">
              <div className="h-px w-12 bg-white/10"></div>
              BY DAEMONCORE®
              <div className="h-px w-12 bg-white/10"></div>
            </div>
          </div>

          <h2 className="text-4xl md:text-7xl font-extrabold mb-16 max-w-6xl mx-auto leading-[1.1] uppercase tracking-tight text-white/90">
            THE WORLD'S FIRST <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">OPERATING SYSTEM</span> <br/>DEDICATED EXCLUSIVELY TO REPAIR SHOPS.
          </h2>

          <div className="flex flex-col items-center gap-12">
            <button onClick={onLaunch} className="bg-blue-600 hover:bg-blue-500 text-white px-16 py-8 rounded-[40px] font-black text-2xl transition-all flex items-center gap-6 uppercase group shadow-2xl shadow-blue-500/30 active:scale-95">
              LAUNCH SYSTEM DEMO <ArrowRight className="group-hover:translate-x-3 transition-transform" />
            </button>

            {/* Restored & Enhanced Awards */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-5xl">
              {awards.map((award, idx) => (
                <div key={idx} className="flex items-center gap-3 px-6 py-3 glass rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white hover:border-blue-500/30 transition-all hover:-translate-y-1 cursor-default group">
                  <div className="text-blue-500 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">{award.icon}</div>
                  {award.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section id="everything" className="py-40 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-10 grid md:grid-cols-2 gap-24 items-center">
           <div>
              <h3 className="text-7xl font-black uppercase mb-8 leading-none tracking-tighter">ONE <br/><span className="text-blue-500">MEMBERSHIP.</span></h3>
              <p className="text-2xl text-white/40 font-light mb-12">No pro tiers. No locked features. Every tool we build is yours for one flat fee. Infinite scaling for your shop.</p>
              <div className="space-y-4">
                 {[
                   { t: "Infinite App Expansion", i: <Infinity className="text-blue-500" /> },
                   { t: "Zero Upsells, Forever", i: <Shield className="text-pink-500" /> },
                   { t: "Cross-Platform Runtime", i: <Globe className="text-emerald-500" /> }
                 ].map((item, idx) => (
                   <div key={idx} className="flex items-center gap-6 p-6 glass rounded-3xl border border-white/10 group hover:border-blue-500/30 transition-all">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">{item.i}</div>
                      <span className="text-lg font-bold uppercase">{item.t}</span>
                   </div>
                 ))}
              </div>
           </div>
           <div className="relative group cursor-pointer" onClick={() => setLbImage(IMAGES.multitask)}>
              <div className="absolute -inset-10 bg-blue-600/5 blur-[100px] rounded-full"></div>
              <img src={IMAGES.multitask} className="relative rounded-[40px] border border-white/10 shadow-2xl group-hover:scale-[1.02] transition-transform duration-700" alt="Interface" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-[40px]">
                <Maximize2 size={48} className="text-white drop-shadow-2xl" />
              </div>
           </div>
        </div>
      </section>

      {/* Compatibility Section */}
      <section id="compatibility" className="py-40 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-10">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-20 text-center tracking-tighter">RUN ON <span className="text-blue-500">EVERYTHING.</span></h2>
          <div className="grid md:grid-cols-4 gap-10">
             {[
               { icon: <Tablet size={40} />, name: "iPad & Android", desc: "Full touch-optimized interface for floor diagnostics." },
               { icon: <Monitor size={40} />, name: "PC & Mac", desc: "Native desktop feel in any modern web browser." },
               { icon: <Laptop size={40} />, name: "Surface Hub", desc: "High-density view for large command center displays." },
               { icon: <Smartphone size={40} />, name: "Mobile Ready", desc: "Check your shop signals from the palm of your hand." }
             ].map((device, idx) => (
               <div key={idx} className="glass p-10 rounded-[40px] border border-white/10 flex flex-col items-center text-center group hover:border-blue-500/50 transition-all">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-all">
                    {device.icon}
                  </div>
                  <h4 className="text-xl font-black uppercase mb-4 tracking-widest">{device.name}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{device.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Pricing & Footer Section - Fully Restored to Design Image */}
      <section id="pricing" className="py-40 bg-black">
        <div className="max-w-7xl mx-auto px-10">
          {/* Main Price Header */}
          <div className="mb-12">
            <div className="flex items-baseline gap-2 mb-4">
              <h2 className="text-8xl md:text-[10rem] font-black leading-none tracking-tighter">$199</h2>
              <span className="text-4xl text-white/40 font-bold">/mo</span>
            </div>
            <p className="text-2xl font-medium text-white tracking-tight">Unlimited users. All current apps. All future apps.</p>
            <p className="text-xl font-black uppercase tracking-widest text-white/90 mt-2">PRICE LOCKED FOR 5 YEARS.</p>
          </div>

          {/* Feature Grid & Action Card */}
          <div className="grid md:grid-cols-2 gap-8 mb-40">
            {/* Left Box: Features */}
            <div className="glass p-12 rounded-[32px] border border-white/5 bg-white/[0.02]">
              <h3 className="text-xl font-black uppercase tracking-widest mb-10 inline-block border-b-2 border-blue-500 pb-1">Included in the box:</h3>
              <ul className="space-y-6">
                {[
                  "Full Desktop OS Environment",
                  "Daemon AI Neural Core",
                  "Omnichannel Ticketing",
                  "Warehouse Stock Vault",
                  "App Store Access (All future modules included)"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-white/70 font-bold uppercase text-[11px] tracking-widest">
                    <Check size={18} className="text-emerald-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Box: Call to Action */}
            <div className="glass p-12 rounded-[32px] border border-white/5 bg-white/[0.02] flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 leading-none">READY TO UPGRADE?</h3>
                <p className="text-white/40 text-lg leading-relaxed font-medium">
                  Join the shops running on the world's first Repair Operating System. Try it in your shop for 14 days, completely free.
                </p>
              </div>
              <a href={LEMON_SQUEEZY_LINK} target="_blank" className="block w-full bg-white text-black py-7 rounded-2xl font-black uppercase text-sm tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl text-center mt-10">
                Start Free Trial
              </a>
            </div>
          </div>

          {/* RESTORED LEGAL STUFF AREA (MATCHING THE PIC) */}
          <div className="border-t border-white/5 pt-16 flex flex-col gap-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              {/* Left Side: Legal Disclaimer label */}
              <button 
                onClick={() => setShowLegal(true)}
                className="flex items-center gap-3 text-[10px] font-black text-white/20 uppercase tracking-[0.4em] hover:text-white transition-colors group"
              >
                <Scale size={16} className="text-white/30 group-hover:text-blue-500" /> LEGAL DISCLAIMER
              </button>
              
              {/* Right Side: Links and Inquiries */}
              <div className="flex flex-col items-start md:items-end gap-2">
                <a href="https://daemoncore.app" target="_blank" className="text-[11px] font-black text-blue-500 uppercase tracking-[0.3em] hover:text-blue-400 transition-colors">
                  DAEMONCORE.APP
                </a>
                <a 
                  href="mailto:contact@daemoncore.app"
                  className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] hover:text-white transition-colors"
                >
                  INQUIRIES: CONTACT@DAEMONCORE.APP
                </a>
              </div>
            </div>

            {/* Centered Trademark & Patent Footer */}
            <footer className="text-center text-[10px] font-black text-white/10 uppercase tracking-[0.5em] pb-10">
              © 2025 REPAIR OS BY DAEMONCORE • PATENT PENDING: US 10/2025/08429-DAEMON
            </footer>
          </div>
        </div>
      </section>
      
      {/* Lightbox for membership image */}
      {lbImage && <Lightbox src={lbImage} onClose={() => setLbImage(null)} />}

      {/* Legal Disclaimer Modal */}
      {showLegal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={() => setShowLegal(false)}></div>
          <div className="relative glass w-full max-w-4xl max-h-[80vh] overflow-y-auto p-12 md:p-20 rounded-[48px] border border-white/10 animate-in zoom-in duration-300 shadow-[0_0_100px_rgba(59,130,246,0.1)]">
            <button 
              onClick={() => setShowLegal(false)}
              className="absolute top-10 right-10 p-4 hover:bg-white/10 rounded-2xl transition-all"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col gap-10">
              <div className="flex items-center gap-4 text-blue-500">
                <Shield size={40} />
                <h2 className="text-5xl font-black uppercase tracking-tighter">LEGAL<br/>DISCLAIMER</h2>
              </div>
              <div className="space-y-8 text-white/50 text-lg leading-relaxed font-light">
                <p>
                  Repair OS is a professional-grade operating environment designed exclusively for repair businesses. By accessing this platform—whether in a demonstration capacity or through a full enterprise membership—you acknowledge and agree that <span className="text-white font-bold italic">DaemonCore</span> and its parent entities are not liable for any direct, indirect, incidental, or consequential damages resulting from system use.
                </p>
                <p>
                  Our software is provided on an "as-is" and "as-available" basis. While we strive for 99.9% uptime, we do not guarantee uninterrupted service. The <span className="text-blue-400 font-bold uppercase tracking-widest">Daemon AI</span> neural core is a tool to assist, not replace, certified technician judgment.
                </p>
                <p>
                  All proprietary technologies, including the omnichannel ticketing matrix and the warehouse stock vault, are protected under international copyright law. 
                  <br/>
                  <span className="text-white font-black uppercase tracking-[0.2em]">{PATENT_NOTICE}</span>
                </p>
                <p className="pt-10 border-t border-white/5 text-[11px] font-black uppercase tracking-[0.5em]">
                  © 2025 DAEMONCORE TECHNOLOGY GROUP. ALL RIGHTS RESERVED.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'showcase' | 'os'>('showcase');
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZ, setNextZ] = useState(10);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isBooting, setIsBooting] = useState(false);
  const [positions, setPositions] = useState<IconPos[]>([]);
  const [showImmersiveModal, setShowImmersiveModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (viewMode === 'os' && positions.length === 0) {
      setPositions(APPS.map((a, i) => ({
        id: a.id,
        col: Math.floor(i / 8),
        row: i % 8
      })));
    }
  }, [viewMode]);

  const launch = () => {
    setIsBooting(true);
    setTimeout(() => {
      setIsBooting(false);
      setViewMode('os');
      setShowImmersiveModal(true);
      openApp('dashboard');
    }, 2000);
  };

  const openApp = (id: string) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === id);
      if (existing) return prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: nextZ } : w);
      return [...prev, { id, title: id, isOpen: true, isMinimized: false, zIndex: nextZ, icon: <Package /> }];
    });
    setNextZ(z => z + 1);
  };

  const closeWindow = (id: string) => setWindows(prev => prev.filter(w => w.id !== id));
  const minWindow = (id: string) => setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: nextZ } : w));
    setNextZ(z => z + 1);
  };

  if (isBooting) return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center font-poppins">
      <Cpu className="text-blue-500 animate-spin mb-10" size={64} />
      <span className="text-white text-xs tracking-[0.6em] font-black uppercase animate-pulse">Initializing OS Core...</span>
      <div className="w-64 h-1 bg-white/5 rounded-full mt-8 overflow-hidden">
        <div className="h-full bg-blue-500 animate-[load_2s_ease-in-out]"></div>
      </div>
      <style>{`@keyframes load { 0% { width: 0%; } 100% { width: 100%; } }`}</style>
    </div>
  );

  if (viewMode === 'showcase') return <ShowCase onLaunch={launch} />;

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-[#050505] font-poppins">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-black to-purple-950/30"></div>
      
      {/* Immersive Modal Pop-up */}
      {showImmersiveModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 backdrop-blur-3xl animate-in fade-in duration-500">
           <div className="max-w-xl w-full mx-6 glass p-12 rounded-[48px] border border-white/20 shadow-[0_0_100px_rgba(59,130,246,0.3)] flex flex-col items-center text-center animate-in zoom-in slide-in-from-bottom-10 duration-700">
              <div className="w-24 h-24 rounded-[32px] bg-blue-600 flex items-center justify-center mb-10 shadow-2xl shadow-blue-500/50">
                <Monitor size={48} className="text-white" />
              </div>
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-6 leading-none">NATIVE DESKTOP<br/><span className="text-blue-500">ENGAGED</span></h3>
              <p className="text-xl text-white/40 font-light leading-relaxed mb-10">
                For the ultimate command center experience, we recommend entering <span className="text-white font-bold italic">Immersive Mode.</span>
              </p>
              <div className="flex flex-col items-center gap-4 mb-12">
                 <div className="bg-white text-black px-10 py-6 rounded-3xl font-black text-5xl shadow-xl border-b-8 border-gray-300">F11</div>
                 <p className="text-[12px] font-black uppercase tracking-[0.5em] text-blue-400 mt-4">UNLEASH FULL PIXEL DENSITY</p>
              </div>
              <button onClick={() => setShowImmersiveModal(false)} className="w-full bg-white text-black py-6 rounded-3xl font-black uppercase text-lg tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95">READY TO OPERATE</button>
           </div>
        </div>
      )}

      {/* Clock & Date */}
      <div className="absolute top-16 right-16 z-10 text-right select-none opacity-80 pointer-events-none">
        <div className="text-[120px] font-black leading-none tracking-tighter text-white uppercase">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </div>
        <div className="text-lg font-bold tracking-[0.5em] text-white/20 uppercase mt-4 mb-10">
          {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* JUMPING RED OFFER BUTTON */}
      <div className="absolute top-80 right-16 z-20">
         <a 
          href={LEMON_SQUEEZY_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-center gap-2 bg-white text-black px-10 py-5 rounded-3xl font-black text-2xl tracking-tighter uppercase transition-all hover:bg-blue-600 hover:text-white hover:-translate-y-1 shadow-2xl"
         >
            <div className="absolute -top-5 -right-5 bg-red-600 text-white text-[12px] font-black px-5 py-2 rounded-full border-2 border-white animate-bounce shadow-[0_10px_30px_rgba(220,38,38,0.5)]">
              HOT OFFER
            </div>
            <span className="flex items-center gap-4">
              <Gift className="group-hover:rotate-12 transition-transform" size={32} />
              UPGRADE YOUR SHOP
            </span>
         </a>
      </div>

      {/* System Sandbox Watermark - OS View */}
      <div className="absolute bottom-10 left-10 z-10 pointer-events-none">
         <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">System Sandbox // Demonstration Environment Only</span>
         </div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute inset-0 z-10">
        {positions.map(p => {
          const app = APPS.find(a => a.id === p.id);
          return app && (
            <DesktopIcon 
              key={p.id} 
              app={app} 
              pos={p} 
              onDragEnd={(id, col, row) => setPositions(v => v.map(o => o.id === id ? { ...o, col, row } : o))} 
              onClick={() => openApp(p.id)} 
            />
          );
        })}
      </div>

      {/* Restored Exit Button - Bottom Right */}
      <div className="absolute bottom-10 right-10 z-[500]">
        <button 
          onClick={() => setViewMode('showcase')}
          className="flex flex-col items-center gap-2 group transition-all"
        >
          <div className="w-14 h-14 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl flex items-center justify-center border border-red-500/20 shadow-2xl transition-all group-hover:scale-110">
            <Power size={24} />
          </div>
          <span className="text-[10px] font-black text-white/20 uppercase tracking-widest group-hover:text-red-500 transition-colors">Terminate OS</span>
        </button>
      </div>

      {/* Windows Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {windows.map(w => {
          const app = APPS.find(a => a.id === w.id);
          if (!app) return null;
          return (
            <div key={w.id} className="pointer-events-auto h-full w-full">
              <Window 
                window={w} 
                app={app} 
                onClose={() => closeWindow(w.id)} 
                onMinimize={() => minWindow(w.id)} 
                onFocus={() => focusWindow(w.id)}
              >
                <app.component onClose={() => closeWindow(w.id)} />
              </Window>
            </div>
          );
        })}
      </div>

      {/* Slimmed Sleek Taskbar */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[500]">
        <div className="glass px-4 py-2.5 rounded-[24px] flex items-center gap-2.5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          {APPS.map(app => (
            <button 
              key={app.id} 
              onClick={() => openApp(app.id)} 
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all relative group ${windows.some(w => w.id === app.id) ? 'bg-white/15 text-white scale-110 shadow-lg' : 'text-white/30 hover:bg-white/5 hover:text-white hover:scale-105'}`}
            >
              <div className="shrink-0">
                {app.imageIcon ? (
                  <img src={app.imageIcon} className="w-6 h-6 object-cover rounded" alt="" />
                ) : (
                  React.cloneElement(app.icon as React.ReactElement<any>, { size: 18 })
                )}
              </div>
              {windows.some(w => w.id === app.id) && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_5px_rgba(59,130,246,1)]"></div>
              )}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-xl rounded-lg text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 shadow-2xl">
                {app.name}
              </div>
            </button>
          ))}
          <div className="w-px h-6 bg-white/10 mx-1"></div>
          <button onClick={launch} className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-500 transition-colors">
            <LayoutDashboard size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
