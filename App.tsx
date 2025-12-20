import React, { useState, useEffect, useRef } from 'react';
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
  Gem, 
  Infinity,
  Smartphone,
  Globe,
  Chrome,
  Monitor,
  Check,
  Layout,
  MonitorCheck,
  Gift,
  MonitorSmartphone,
  Users,
  FileText,
  DollarSign
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
  color: string;
  component: React.FC<{ onClose: () => void }>;
}

// --- Constants ---
const PATENT_NOTICE = "Patent Pending: US 10/2025/08429-DAEMON";

// --- Images Mapping ---
const IMAGES = {
  logo: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/repairoslogo.png",
  multitask: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/multitask.png",
  neural: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/neuralcore.png",
  nexus: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/Screenshot%202025-12-19%20172435.png",
  inventory: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/inventory.png",
  
  // Personnel & Settings
  settings: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/employee.png",
  employeesLog: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/employeeslog.png",
  employeesMain: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/employees.png",
  
  // Tickets Showcase
  tickets1: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/tickets.png",
  tickets2: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/ticketdatabase.png",
  tickets4: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/ticketmodal.png",

  // New Apps
  estimates: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/estimates.png",
  buyback: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/buyback.png"
};

const LEMON_SQUEEZY_LINK = "https://daemoncore.lemonsqueezy.com/checkout/buy/460d2a55-e651-4839-bd7c-3bab72437301";

// --- UI Helper Components ---

const DesktopIcon: React.FC<{ app: AppDefinition; onClick: () => void }> = ({ app, onClick }) => (
  <button 
    onClick={onClick}
    className="group flex flex-col items-center gap-1 w-20 p-2 transition-all hover:bg-white/10 rounded-xl border border-transparent hover:border-white/20"
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-transform group-active:scale-95 shadow-lg bg-gradient-to-br ${app.color}`}>
      {React.cloneElement(app.icon as React.ReactElement<any>, { size: 24 })}
    </div>
    <span className="text-[10px] font-semibold text-white/90 text-center drop-shadow-md select-none font-poppins">{app.name}</span>
  </button>
);

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
      className="absolute top-10 left-10 md:top-20 md:left-40 w-[90vw] h-[80vh] md:w-[85vw] md:h-[80vh] glass rounded-3xl overflow-hidden window-shadow border border-white/10 flex flex-col animate-in fade-in zoom-in duration-300 font-poppins"
      style={{ zIndex: window.zIndex }}
    >
      <div className="h-12 bg-black/50 border-b border-white/5 flex items-center justify-between px-6 select-none">
        <div className="flex items-center gap-4">
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] bg-gradient-to-br ${app.color}`}>
            {React.cloneElement(app.icon as React.ReactElement<any>, { size: 14 })}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">{app.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onMinimize} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white/80"><Minimize2 size={16} /></button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white/80"><Maximize2 size={16} /></button>
          <button onClick={onClose} className="p-2 hover:bg-red-500/80 rounded-lg transition-colors text-white/40 hover:text-white"><X size={16} /></button>
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
}> = ({ title, children, icon, colorClass, screenshots, highlights }) => (
  <div className="flex flex-col lg:flex-row h-full font-poppins">
    <div className="w-full lg:w-[40%] p-10 lg:p-14 overflow-y-auto border-r border-white/5 bg-black/30 flex flex-col h-full">
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-8 shadow-2xl`}>
        {React.cloneElement(icon as React.ReactElement<any>, { size: 32, className: "text-white" })}
      </div>
      <h2 className="text-4xl font-extrabold text-white mb-8 tracking-tighter leading-tight">{title}</h2>
      <div className="space-y-8 text-white/50 leading-relaxed text-base flex-grow font-normal">
        {children}
        <div className="pt-8 border-t border-white/5">
          <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center gap-2 text-blue-400">
            <Infinity size={14} /> SYSTEM HIGHLIGHTS
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-white/60">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> {h}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
          <Gem size={12} /> THE MEMBERSHIP PROMISE
        </p>
        <p className="text-xs text-white/40 font-medium">New modules added weekly. Always included. Zero upsells.</p>
      </div>
    </div>
    <div className="w-full lg:w-[60%] relative bg-[#050505] p-6 lg:p-10 overflow-y-auto">
      <div className="space-y-10">
        {screenshots.map((src, idx) => (
          <div key={idx} className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 w-full group">
            <img src={src} className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-105" alt={`${title} screenshot ${idx+1}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40"></div>
            <div className="absolute bottom-5 left-5 flex items-center gap-3 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest">OS VIEWPORT {idx + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- App Modal Content Components ---

const DashboardInfo: React.FC = () => (
  <FeatureSplitView 
    title="System Overview" 
    icon={<LayoutDashboard />} 
    colorClass="from-blue-600 to-indigo-600" 
    screenshots={[IMAGES.multitask]} 
    highlights={["Real-time Cashflow Telemetry", "Dynamic Bench Pressure Map", "Financial Signal Intelligence"]}
  >
    <div className="p-5 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-8 group transition-all hover:bg-blue-500/20">
      <div className="flex items-start gap-4">
        <MonitorSmartphone className="text-blue-400 shrink-0" size={24} />
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400 mb-2">OS PRO TIP: NATIVE IMMERSION</p>
          <p className="text-sm text-white/90 font-bold mb-3 leading-tight">Press <span className="bg-white text-black px-1.5 py-0.5 rounded text-[10px] mx-1">F11</span> for Full Screen.</p>
          <p className="text-xs text-white/60 leading-relaxed font-medium">
            This mode transforms your browser into a true native command center. It is what makes Repair OS truly unique.
          </p>
        </div>
      </div>
    </div>
    <div className="space-y-6">
      <p className="text-white/80 font-bold">
        Repair OS already features nearly <span className="text-blue-400">30 specialized apps</span> and counting. 
      </p>
      <p>
        Command your entire shop from a single, high-fidelity dashboard. Track revenue, active tickets, and client volume with native-speed analytics. 
      </p>
      <p className="text-emerald-400 font-black text-xs uppercase tracking-widest pt-4 border-t border-white/5 animate-pulse">
        We're just getting started.
      </p>
    </div>
  </FeatureSplitView>
);

const TicketInfo: React.FC = () => (
  <FeatureSplitView 
    title="Mission Control: Tickets" 
    icon={<Ticket />} 
    colorClass="from-pink-600 to-rose-600" 
    screenshots={[IMAGES.tickets1, IMAGES.tickets2, IMAGES.tickets4]} 
    highlights={["Kanban-Style Ticket Board", "Automated SMS Uplink", "Secure PIN-Protected Portals", "L1-L4 Tech Assignment"]}
  >
    <p>Manage repair missions with our advanced Kanban Matrix. Intake devices in under 15 seconds and move them through your workflow with surgical precision.</p>
    <p>Our integrated SMS triggers keep customers informed automatically as you update ticket status on the bench. Every step is tracked in our high-density database.</p>
  </FeatureSplitView>
);

const InventoryInfo: React.FC = () => (
  <FeatureSplitView 
    title="Inventory Vault" 
    icon={<Package />} 
    colorClass="from-emerald-600 to-teal-600" 
    screenshots={[IMAGES.inventory]} 
    highlights={["Kanban Stock Management", "Automated Low-Stock Logic", "Supplier Direct Restock API"]}
  >
    <p>Never lose track of a part again. Our Warehouse Core uses Kanban boards to show you exactly what stock is low, what needs ordering, and what's on the shelf.</p>
    <p>Track thousands of SKUs with sub-millisecond search. Restock alerts are baked into the core OS logic to ensure your bench never runs dry.</p>
  </FeatureSplitView>
);

const EmployeeConsoleInfo: React.FC = () => (
  <FeatureSplitView 
    title="Human Capital Core" 
    icon={<Users />} 
    colorClass="from-slate-600 to-indigo-800" 
    screenshots={[IMAGES.employeesLog, IMAGES.employeesMain]} 
    highlights={["Granular Pay Scale Tracking", "Tax Document Vault", "Clearance Level Management", "Status-Aware Clocking"]}
  >
    <p>The ultimate employee database. Manage every recruit from hire to fire. Track rates of pay, status, and clearance levels across all terminals.</p>
    <p>Integrate tax info and personnel files directly into your operating system environment. Secure, encrypted, and accessible only to Level 4 Administrators.</p>
  </FeatureSplitView>
);

const EstimatesInfo: React.FC = () => (
  <FeatureSplitView 
    title="The Quote Engine" 
    icon={<FileText />} 
    colorClass="from-amber-600 to-orange-700" 
    screenshots={[IMAGES.estimates]} 
    highlights={["Instant Quote Generation", "PDF Export Pipeline", "Approval Tracking", "Conversion Analytics"]}
  >
    <p>Generate high-fidelity estimates in seconds. Our proprietary quote engine calculates labor and parts costs with precision to ensure maximum profitability.</p>
    <p>Track which estimates turn into missions and analyze your conversion rates in real-time. Everything is built to close more deals.</p>
  </FeatureSplitView>
);

const BuyBackInfo: React.FC = () => (
  <FeatureSplitView 
    title="Re-Commerce Hub" 
    icon={<DollarSign />} 
    colorClass="from-teal-600 to-cyan-700" 
    screenshots={[IMAGES.buyback]} 
    highlights={["Proprietary Grading Algorithm", "Instant Cash Offer Engine", "Legal Document Automation", "Inventory Pipeline Sync"]}
  >
    <p>Scale your inventory with our proprietary buyback system. Grade devices and generate instant cash offers that are competitive yet profitable.</p>
    <p>Automatically generate legal bill-of-sale documents and sync purchased devices directly into your Inventory Vault. Turn your shop into a trade-in powerhouse.</p>
  </FeatureSplitView>
);

const NexusInfo: React.FC = () => (
  <FeatureSplitView 
    title="Nexus Store" 
    icon={<Store />} 
    colorClass="from-cyan-600 to-blue-600" 
    screenshots={[IMAGES.nexus]} 
    highlights={["Infinite App Library", "One-Click Installation", "Verified Security Sandbox"]}
  >
    <p>Nexus is the heartbeat of expansion. Browse dozens of specialized modules for Payroll, Marketing, POS, and Document Management.</p>
    <p>Every single app in the Nexus is included in your membership. If we build it, it's yours at no extra cost.</p>
  </FeatureSplitView>
);

const PersonnelInfo: React.FC = () => (
  <FeatureSplitView 
    title="Terminal Config" 
    icon={<Settings />} 
    colorClass="from-gray-600 to-slate-600" 
    screenshots={[IMAGES.settings]} 
    highlights={["Hardware Signal Tuning", "Global Theme Overrides", "API Uplink Management"]}
  >
    <p>Tune your OS experience to match your hardware. Manage staff clearance levels and configure global shop signals from a unified control pane.</p>
  </FeatureSplitView>
);

const DaemonAI: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([{ role: 'ai', content: 'Greetings, Administrator. I am DAEMON, your neural interface for RepairOS. How may I assist with shop operations today?' }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isTyping]);
  
  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [...messages, userMsg].map(m => ({ role: m.role === 'ai' ? 'model' : 'user', parts: [{ text: m.content }] })),
        config: { systemInstruction: 'You are DAEMON AI. You are a genius terminal AI for Repair OS. Explain that everything is included in the membership ($199/mo), zero upsells, and new apps are added weekly. Use bold and direct language. NO ITALICS.' }
      });
      setMessages(prev => [...prev, { role: 'ai', content: response.text || "Neural core offline." }]);
    } catch { setMessages(prev => [...prev, { role: 'ai', content: 'Connection timed out.' }]); } finally { setIsTyping(false); }
  };
  
  return (
    <div className="flex flex-col lg:flex-row h-full font-poppins bg-[#0d0e12]">
      <div className="w-full lg:w-1/2 flex flex-col border-r border-white/10 h-full">
        <div className="p-6 border-b border-purple-500/20 bg-purple-900/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot size={20} className="text-purple-400" />
            <span className="text-xs font-bold tracking-widest text-purple-400 uppercase">DAEMON AI // NEURAL LINK ACTIVE</span>
          </div>
        </div>
        <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`p-5 rounded-2xl ${m.role === 'ai' ? 'bg-purple-600/10 border border-purple-500/20' : 'bg-white/5 border border-white/10 ml-12'}`}>
              <div className="text-[10px] uppercase tracking-widest text-white/30 mb-2 font-bold">{m.role}</div>
              <p className="text-sm font-normal leading-relaxed">{m.content}</p>
            </div>
          ))}
          {isTyping && <div className="text-purple-400 text-[10px] font-bold animate-pulse">UPLINKING TO NEURAL CORE...</div>}
        </div>
        <div className="p-6 border-t border-white/10 flex gap-3">
          <input disabled={isTyping} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-purple-500/50 transition-colors" placeholder="Command DAEMON..." />
          <button onClick={handleSend} disabled={isTyping} className="p-4 bg-purple-600 rounded-2xl text-white hover:bg-purple-500 transition-colors"><ArrowRight size={20} /></button>
        </div>
      </div>
      <div className="hidden lg:flex w-1/2 p-6 items-center justify-center bg-black">
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl">
          <img src={IMAGES.neural} className="w-full h-full object-contain" alt="DAEMON AI System Interface" />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 pointer-events-none">
            <Bot size={100} className="text-purple-500/20 animate-pulse mb-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

const APPS: AppDefinition[] = [
  { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard />, color: 'from-blue-600 to-indigo-600', component: DashboardInfo },
  { id: 'tickets', name: 'Tickets', icon: <Ticket />, color: 'from-pink-600 to-rose-600', component: TicketInfo },
  { id: 'inventory', name: 'Inventory', icon: <Package />, color: 'from-emerald-600 to-teal-600', component: InventoryInfo },
  { id: 'employees', name: 'Personnel', icon: <Users />, color: 'from-slate-600 to-indigo-800', component: EmployeeConsoleInfo },
  { id: 'estimates', name: 'Estimates', icon: <FileText />, color: 'from-amber-600 to-orange-700', component: EstimatesInfo },
  { id: 'buyback', name: 'Buy Back', icon: <DollarSign />, color: 'from-teal-600 to-cyan-700', component: BuyBackInfo },
  { id: 'daemon', name: 'Daemon AI', icon: <Bot />, color: 'from-purple-600 to-fuchsia-600', component: DaemonAI },
  { id: 'nexus', name: 'Nexus Store', icon: <Store />, color: 'from-cyan-600 to-blue-600', component: NexusInfo },
  { id: 'settings', name: 'Setup', icon: <Settings />, color: 'from-gray-600 to-slate-600', component: PersonnelInfo },
];

// --- Landing Page ---

const ShowCase: React.FC<{ onLaunch: () => void }> = ({ onLaunch }) => (
  <div className="w-full bg-[#050505] text-white selection:bg-blue-500/30 overflow-y-auto h-screen scroll-smooth font-poppins">
    <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-black/50 backdrop-blur-xl px-12 py-6 md:py-8 flex items-center justify-between">
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="flex flex-col">
          <span className="text-2xl md:text-3xl font-black tracking-tighter leading-none uppercase">
            REPAIR<span className="text-blue-500">OS</span>
          </span>
          <span className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase mt-1 group-hover:text-blue-500/50 transition-colors">
            Command Center
          </span>
        </div>
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse self-start mt-2"></div>
      </div>
      <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-[0.3em] text-white/40">
        <a href="#everything" className="hover:text-white transition-colors">Membership</a>
        <a href="#compatibility" className="hover:text-white transition-colors">Devices</a>
        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
      </div>
      <button onClick={onLaunch} className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-2xl">Launch Demo</button>
    </nav>

    {/* Hero */}
    <section className="relative min-h-screen flex flex-col items-center justify-center px-10 pt-40 pb-96 overflow-hidden text-center">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_60%)]"></div>
      <div className="relative z-10 max-w-6xl">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-[0.4em] mb-12 animate-pulse">
          <Zap size={14} /> NEW APPS ADDED WEEKLY // NO UPSELLS
        </div>
        <h1 className="text-7xl md:text-[10rem] font-black leading-[0.8] tracking-tight mb-12 drop-shadow-2xl uppercase">
          THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">ONLY</span> <br/>REPAIR SHOP <br/>OPERATING SYSTEM.
        </h1>
        <p className="text-xl md:text-3xl text-white/40 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
          The ultimate command center for modern technicians. One platform. Unlimited potential. Everything included.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-20">
          <button onClick={onLaunch} className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-14 py-6 rounded-3xl font-extrabold text-xl transition-all flex items-center justify-center gap-5 group shadow-2xl shadow-blue-500/20 uppercase">
            LAUNCH TERMINAL <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>

    {/* Membership Section */}
    <section id="everything" className="py-40 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-6xl md:text-[5.5rem] font-black mb-10 uppercase leading-none tracking-tight">ONE <br/><span className="text-blue-500">MEMBERSHIP.</span></h2>
            <p className="text-2xl text-white/40 leading-relaxed mb-12 font-light">Forget the Pro versions. We built an ecosystem where every single tool is at your fingertips from day one. If we build it, you own it.</p>
            <div className="space-y-6">
               {[
                 { title: "Apps Added All The Time", icon: <Infinity className="text-blue-500" /> },
                 { title: "Zero Upsells, Ever", icon: <Shield className="text-pink-500" /> },
                 { title: "Unlimited Seats & Locations", icon: <Globe className="text-emerald-500" /> }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-6 p-7 glass rounded-[32px] border border-white/10 group hover:border-blue-500/30 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">{item.icon}</div>
                    <span className="text-xl font-bold uppercase tracking-tight">{item.title}</span>
                 </div>
               ))}
            </div>
          </div>
          <div className="relative group">
             <div className="absolute -inset-10 bg-blue-600/10 blur-[120px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity"></div>
             <img src={IMAGES.multitask} className="relative rounded-[60px] border border-white/10 shadow-2xl" alt="Multitasking Interface" />
             <div className="absolute -bottom-8 -right-8 glass px-8 py-5 rounded-[28px] border border-white/10 shadow-2xl animate-bounce font-black text-sm uppercase tracking-widest text-blue-400">UNLIMITED CAPACITY</div>
          </div>
        </div>
      </div>
    </section>

    {/* "Runs on 99.9% of devices" Section */}
    <section id="compatibility" className="py-40 relative overflow-hidden bg-black text-center">
       <div className="max-w-6xl mx-auto px-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-10">
            <Check size={12} /> Universal Runtime
          </div>
          <h2 className="text-6xl md:text-[5rem] font-black mb-10 tracking-tight leading-none uppercase">Runs on 99.9% of devices.</h2>
          <p className="text-white/40 text-xl md:text-2xl max-w-4xl mx-auto mb-20 font-light leading-relaxed">
            If it has a browser, it runs your shop. No installers. No drivers. No IT headaches. Repair OS brings native-like performance to whatever hardware you already own.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-20">
             {[
               { icon: <Monitor size={32} />, name: "Windows" },
               { icon: <MonitorCheck size={32} />, name: "macOS" },
               { icon: <Layout size={32} />, name: "Linux" },
               { icon: <Chrome size={32} />, name: "ChromeOS" },
               { icon: <Smartphone size={32} />, name: "iPad / Tablet" },
               { icon: <Bot size={32} />, name: "Android" }
             ].map((item, i) => (
               <div key={i} className="glass p-8 rounded-[32px] border border-white/5 flex flex-col items-center gap-4 group hover:border-white/20 transition-all">
                  <div className="text-white/30 group-hover:text-white transition-colors">{item.icon}</div>
                  <span className="text-xs font-bold uppercase tracking-widest">{item.name}</span>
               </div>
             ))}
          </div>
          
          <div className="bg-white/5 rounded-2xl py-3 px-8 inline-block">
             <span className="text-[11px] text-white/30 font-medium uppercase tracking-[0.3em]">Zero installation required. Log in and your entire OS streams instantly.</span>
          </div>
       </div>
    </section>

    {/* Pricing Section */}
    <section id="pricing" className="py-40 bg-[#050505] relative z-10 px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white/60 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div> ONE MEMBERSHIP • EVERYTHING INCLUDED
          </div>
          <h2 className="text-[10rem] font-black leading-none tracking-tighter mb-4">$199<span className="text-4xl text-white/30 tracking-normal font-medium ml-4">/mo</span></h2>
          <div className="space-y-4">
            <p className="text-2xl text-white font-medium mb-2">Unlimited users. All current apps. All future apps.</p>
            <p className="text-sm text-white/30 font-bold uppercase tracking-[0.2em]">Note: Excessive use may require a custom plan.</p>
            <p className="text-2xl font-black text-white uppercase tracking-tight">Price locked for 5 years.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-20">
          {/* Left Feature Box */}
          <div className="glass p-12 rounded-[32px] border border-white/10 shadow-2xl">
            <h3 className="text-2xl font-bold mb-10 text-white uppercase tracking-tight">The Full Ecosystem</h3>
            <div className="space-y-6">
              {[
                "Desktop OS Shell & Window Management",
                "Unlimited Employee Accounts",
                "Ticketing, Invoicing, Inventory, CRM",
                "Daemon Neural AI (Unlimited usage)",
                "App Store Access (All future modules included)"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 text-white/80 font-medium">
                  <Check size={20} className="text-emerald-500 shrink-0" strokeWidth={3} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Trial Box */}
          <div className="glass p-12 rounded-[32px] border border-white/10 shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-white uppercase tracking-tight">Ready to upgrade your shop?</h3>
              <p className="text-white/50 text-lg leading-relaxed font-light">Join the shops running on the world's first Repair Operating System. Try it in your shop for 14 days, completely free.</p>
            </div>
            <div className="mt-12 text-center">
              <a 
                href={LEMON_SQUEEZY_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-white text-black font-black uppercase py-6 rounded-2xl tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all text-lg shadow-2xl mb-6 inline-block"
              >
                Start 14-Day Free Trial
              </a>
              <p className="text-xs text-white/30 font-medium tracking-widest uppercase">Secure payment via LemonSqueezy • Cancel anytime</p>
            </div>
          </div>
        </div>

        <div className="mt-40 pt-12 border-t border-white/5 text-center flex flex-col items-center gap-4">
          <p className="text-white/20 text-[11px] font-bold uppercase tracking-[0.5em]">© 2025 Repair OS by DaemonCore • {PATENT_NOTICE}</p>
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-white/20">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Status</a>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// --- Main App ---

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'showcase' | 'os'>('showcase');
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isBooting, setIsBooting] = useState(false);
  
  useEffect(() => { 
    const timer = setInterval(() => setCurrentTime(new Date()), 1000); 
    return () => clearInterval(timer); 
  }, []);

  const launchOS = () => { 
    setIsBooting(true); 
    setTimeout(() => { 
      setIsBooting(false); 
      setViewMode('os'); 
      openApp('dashboard'); 
    }, 2500); 
  };

  const openApp = (appId: string) => {
    const app = APPS.find(a => a.id === appId);
    if (!app) return;
    setWindows(prev => {
      const existing = prev.find(w => w.id === appId);
      if (existing) return prev.map(w => w.id === appId ? { ...w, isMinimized: false, zIndex: nextZIndex } : w);
      return [...prev, { id: app.id, title: app.name, isOpen: true, isMinimized: false, zIndex: nextZIndex, icon: app.icon }];
    });
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => setWindows(prev => prev.filter(w => w.id !== id));
  const toggleMinimize = (id: string) => setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
  const focusWindow = (id: string) => { 
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: nextZIndex } : w)); 
    setNextZIndex(prev => prev + 1); 
  };

  if (isBooting) return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center font-poppins">
      <div className="w-72 space-y-6 text-center">
        <Cpu className="text-blue-500 animate-spin mx-auto mb-6" size={48} />
        <span className="text-white text-xs tracking-[0.6em] font-black uppercase">Establishing Link...</span>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 animate-[progress_2.5s_ease-in-out]"></div>
        </div>
        <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">Establishing Neural Link</p>
      </div>
      <style>{`@keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }`}</style>
    </div>
  );

  if (viewMode === 'showcase') return <ShowCase onLaunch={launchOS} />;

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-[#050505] font-poppins">
      {/* OS Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-black to-purple-950/40 z-0"></div>
      
      {/* OS Clock & Buy Now Section */}
      <div className="absolute top-16 right-16 z-10 text-right pointer-events-none">
        <div className="text-[120px] font-black leading-none tracking-tighter text-white/90 uppercase">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </div>
        <div className="text-lg font-bold tracking-[0.4em] text-white/20 uppercase mt-4 mb-10">
          {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>

        {/* STANDOUT BUY NOW BUTTON */}
        <div className="pointer-events-auto flex flex-col items-end gap-4 animate-in fade-in slide-in-from-right duration-1000 delay-500">
           <a 
            href={LEMON_SQUEEZY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center gap-1 bg-white text-black px-10 py-5 rounded-2xl font-black text-2xl tracking-tighter uppercase transition-all hover:bg-blue-600 hover:text-white hover:-translate-y-1 shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:shadow-blue-500/50"
           >
              <span className="flex items-center gap-3">
                <Gift className="group-hover:rotate-12 transition-transform" size={28} />
                UPGRADE YOUR SHOP
              </span>
              <div className="absolute -top-3 -left-3 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full border-2 border-black rotate-[-10deg] animate-bounce">
                OFFER
              </div>
           </a>
           <div className="glass px-6 py-3 rounded-xl border border-white/10 text-right max-w-[280px]">
              <p className="text-[11px] font-black text-white uppercase tracking-widest mb-1 flex items-center justify-end gap-2">
                <Shield size={12} className="text-emerald-500" /> CHRISTMAS SPECIAL
              </p>
              <p className="text-[10px] font-medium text-white/40 uppercase tracking-widest leading-relaxed">
                SIGN UP NOW TO RECEIVE A <span className="text-white font-bold">5 YEAR PRICE LOCK</span> GUARANTEE.
              </p>
           </div>
        </div>
      </div>

      {/* Desktop Grid - Optimized with 2 columns to keep icons accessible */}
      <div className="absolute top-16 left-16 z-10 grid grid-cols-2 gap-x-12 gap-y-4">
        {APPS.map(app => ( <DesktopIcon key={app.id} app={app} onClick={() => openApp(app.id)} /> ))}
        <button onClick={() => setViewMode('showcase')} className="group flex flex-col items-center gap-2 w-20 p-2 transition-all hover:bg-white/10 rounded-2xl text-white/20 hover:text-white col-span-2 mt-4">
          <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center"><LogOut size={24} /></div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Exit Terminal</span>
        </button>
      </div>

      {/* Application Windows */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {windows.map(win => {
          const app = APPS.find(a => a.id === win.id);
          if (!app) return null;
          return (
            <div key={win.id} className="pointer-events-auto h-full w-full">
              <Window window={win} app={app} onClose={() => closeWindow(win.id)} onMinimize={() => toggleMinimize(win.id)} onFocus={() => focusWindow(win.id)}>
                <app.component onClose={() => closeWindow(win.id)} />
              </Window>
            </div>
          );
        })}
      </div>

      {/* Disclaimer Section */}
      <div className="absolute bottom-4 left-6 z-[100] pointer-events-none opacity-40 flex flex-col gap-1">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
          * Simulated dummy environment meant to look like Repair OS. In the real version the icons are moveable.
        </p>
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50">
          {PATENT_NOTICE}
        </p>
      </div>

      {/* Interactive Dock */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
        <div className="glass px-6 py-4 rounded-[32px] flex items-center gap-3 lg:gap-6 border border-white/10 shadow-2xl overflow-x-auto max-w-[90vw]">
          <div className="flex items-center gap-2">
             {APPS.map(app => (
               <button 
                key={app.id} 
                onClick={() => openApp(app.id)} 
                className={`p-3 lg:p-4 rounded-2xl transition-all relative group ${windows.some(w => w.id === app.id) ? 'bg-white/10 text-white' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
               >
                 {React.cloneElement(app.icon as React.ReactElement<any>, { size: 22 })}
                 {windows.some(w => w.id === app.id) && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>}
               </button>
             ))}
          </div>
          <div className="w-px h-10 bg-white/10 shrink-0"></div>
          <div className="flex items-center gap-3 lg:gap-6 px-2">
             <button className="text-white/40 hover:text-white transition-colors"><Maximize2 size={22} /></button>
             <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black text-[11px] shadow-lg shrink-0">TO</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;