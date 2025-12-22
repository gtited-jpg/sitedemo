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
  DollarSign,
  Search,
  Command,
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
  Medal
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
  imageIcon?: string; // Optional image-based icon
  color: string;
  component: React.FC<{ onClose: () => void }>;
}

interface IconPos {
  id: string;
  col: number;
  row: number;
}

// --- Constants ---
const PATENT_NOTICE = "Patent Pending: US 10/2025/08429-DAEMON";
const GRID_SIZE_X = 100;
const GRID_SIZE_Y = 110;
const PADDING = 24;

const IMAGES = {
  logo: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/repairoslogo.png",
  multitask: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/multitask.png",
  neural: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/neuralcore.png",
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

// --- Global Context for Lightbox ---
const Lightbox: React.FC<{ src: string; onClose: () => void; label?: string }> = ({ src, onClose, label }) => (
  <div 
    className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4 md:p-8 animate-in fade-in duration-300 overflow-hidden"
    onClick={onClose}
  >
    <button 
      onClick={onClose}
      className="absolute top-6 right-6 md:top-10 md:right-10 z-[100001] p-5 bg-white/10 hover:bg-red-500/80 text-white rounded-3xl transition-all border border-white/20 group shadow-2xl"
    >
      <X size={36} className="group-hover:rotate-90 transition-transform duration-300" />
    </button>
    
    <div 
      className="relative max-w-[95vw] max-h-[90vh] animate-in zoom-in duration-500 flex flex-col items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.8)] bg-black/50">
        <img 
          src={src} 
          className="w-full h-auto max-h-[85vh] object-contain" 
          alt="System Preview" 
        />
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-[20px] border-black/10"></div>
      </div>
      
      <div className="mt-8 flex flex-col items-center gap-3">
        <span className="text-[12px] font-black text-white/50 uppercase tracking-[0.8em] animate-pulse text-center">
          {label || "SYSTEM INTERFACE PIPELINE // ADMINISTRATOR VIEW"}
        </span>
        <div className="flex items-center gap-6">
           <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_100px_rgba(59,130,246,0.3)]"></div>
           <div className="w-48 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
           <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_100px_rgba(59,130,246,0.3)]"></div>
        </div>
      </div>
    </div>
  </div>
);

// --- Draggable Icon Component ---
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
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
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
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, offset, app.id, onDragEnd]);

  return (
    <div 
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        if (dragging) return;
        onClick();
      }}
      className={`absolute transition-all duration-300 group flex flex-col items-center gap-1 w-20 p-2 cursor-pointer select-none rounded-xl border border-transparent hover:bg-white/10 hover:border-white/20 active:scale-95 ${dragging ? 'opacity-50 z-[1000] scale-110 !transition-none' : 'z-10'}`}
      style={{
        left: PADDING + pos.col * GRID_SIZE_X,
        top: PADDING + pos.row * GRID_SIZE_Y,
        width: 80,
      }}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-transform shadow-lg overflow-hidden ${app.imageIcon ? 'bg-black' : `bg-gradient-to-br ${app.color}`}`}>
        {app.imageIcon ? (
          <img src={app.imageIcon} className="w-full h-full object-cover" alt={app.name} />
        ) : (
          React.cloneElement(app.icon as React.ReactElement<any>, { size: 24 })
        )}
      </div>
      <span className="text-[10px] font-semibold text-white/90 text-center drop-shadow-md font-poppins pointer-events-none line-clamp-2 leading-tight">
        {app.name}
      </span>
    </div>
  );
};

// --- Window Component ---
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
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] overflow-hidden ${app.imageIcon ? 'bg-black' : `bg-gradient-to-br ${app.color}`}`}>
            {app.imageIcon ? (
              <img src={app.imageIcon} className="w-full h-full object-cover" alt="" />
            ) : (
              React.cloneElement(app.icon as React.ReactElement<any>, { size: 14 })
            )}
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
}> = ({ title, children, icon, colorClass, screenshots, highlights }) => {
  const [activeLightbox, setActiveLightbox] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-col lg:flex-row h-full font-poppins">
        <div className="w-full lg:w-[40%] p-10 lg:p-14 overflow-y-auto border-r border-white/5 bg-black/30 flex flex-col h-full">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-8 shadow-2xl overflow-hidden`}>
            {React.cloneElement(icon as React.ReactElement<any>, { size: 32, className: "text-white" })}
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-8 tracking-tighter leading-tight uppercase">{title}</h2>
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
        </div>
        <div className="w-full lg:w-[60%] relative bg-[#050505] p-6 lg:p-10 overflow-y-auto">
          <div className="space-y-10">
            {screenshots.map((src, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveLightbox(src)}
                className="relative block rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 w-full group cursor-zoom-in"
              >
                <img src={src} className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-105" alt={`${title} screenshot ${idx+1}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 transition-opacity group-hover:opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100">
                  <div className="p-4 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 shadow-2xl">
                    <Maximize2 className="text-white" size={32} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {activeLightbox && <Lightbox src={activeLightbox} onClose={() => setActiveLightbox(null)} label={`${title.toUpperCase()} // HIGH-FIDELITY PIPELINE`} />}
    </>
  );
};

// --- App Modal Content Components ---

const DashboardInfo: React.FC = () => (
  <FeatureSplitView 
    title="Dashboard" 
    icon={<LayoutDashboard />} 
    colorClass="from-blue-600 to-indigo-600" 
    screenshots={[IMAGES.multitask]} 
    highlights={["Real-time Cashflow Telemetry", "Dynamic Bench Pressure Map", "Financial Signal Intelligence"]}
  >
    <p>Command your entire shop from a single, high-fidelity dashboard. Track revenue, active tickets, and client volume with native-speed analytics.</p>
  </FeatureSplitView>
);

const POSInfo: React.FC = () => (
  <FeatureSplitView 
    title="Terminal POS" 
    icon={<ShoppingCart />} 
    colorClass="from-amber-500 to-orange-600" 
    screenshots={[IMAGES.pos]} 
    highlights={["Split Payment Logic", "Integrated Card Reader API", "Offline Mode Redundancy"]}
  >
    <p>Our Point of Sale terminal is designed for high-velocity environments. Process cash, card, and finance payments with zero friction.</p>
  </FeatureSplitView>
);

const MarketingInfo: React.FC = () => (
  <FeatureSplitView 
    title="Marketing Hub" 
    icon={<Megaphone />} 
    colorClass="from-indigo-600 to-purple-600" 
    screenshots={[IMAGES.nexus]} 
    highlights={["Automated Google Review Triggers", "SMS Blast Pipeline", "Email Retention Campaigns"]}
  >
    <p>Grow your business while you sleep. Set automated SMS triggers to ask for reviews the moment a repair is picked up.</p>
  </FeatureSplitView>
);

const AnalyticsInfo: React.FC = () => (
  <FeatureSplitView 
    title="Analytics" 
    icon={<BarChart3 />} 
    colorClass="from-emerald-500 to-cyan-600" 
    screenshots={[IMAGES.analytics]} 
    highlights={["Profitability Heatmaps", "Labor Margin Tracking", "Technician Efficiency Metrics"]}
  >
    <p>Turn your shop data into a competitive advantage. Visualize your margins and find exactly where your shop is losing money.</p>
  </FeatureSplitView>
);

const WikiInfo: React.FC = () => (
  <FeatureSplitView 
    title="Repair Wiki" 
    icon={<BookOpen />} 
    colorClass="from-slate-600 to-slate-800" 
    screenshots={[IMAGES.nexus]} 
    highlights={["Proprietary Motherboard Schematics", "Internal Repair Protocols", "Interactive Part Search"]}
  >
    <p>Centralize your shop's knowledge. Store repair guides, schematics, and internal SOPs in a secure, searchable wiki.</p>
  </FeatureSplitView>
);

const GuideInfo: React.FC = () => (
  <FeatureSplitView 
    title="RepairOS Guide" 
    icon={<Library />} 
    colorClass="from-blue-700 to-blue-900" 
    screenshots={[IMAGES.guide]} 
    highlights={["Complete OS Documentation", "Technician Training Modules", "Hardware Compatibility List", "API Integration Guide"]}
  >
    <p>The definitive master manual for Repair OS. Learn how to master every module, from the Neural AI core to the Warehouse Vault.</p>
    <p>Includes step-by-step video tutorials and configuration blueprints for multi-location shop management.</p>
  </FeatureSplitView>
);

const SupplierInfo: React.FC = () => (
  <FeatureSplitView 
    title="Supplier Hub" 
    icon={<Truck />} 
    colorClass="from-rose-600 to-pink-600" 
    screenshots={[IMAGES.inventory]} 
    highlights={["Global Price Comparison", "Instant Bulk Orders", "Defect Return Tracking"]}
  >
    <p>Connect directly to major parts suppliers. Compare prices across multiple vendors and order restocks with a single click.</p>
  </FeatureSplitView>
);

const TicketInfo: React.FC = () => (
  <FeatureSplitView 
    title="Tickets" 
    icon={<Ticket />} 
    colorClass="from-pink-600 to-rose-600" 
    screenshots={[IMAGES.tickets1, IMAGES.tickets2, IMAGES.tickets4]} 
    highlights={["Kanban-Style Ticket Board", "Automated SMS Uplink", "Secure PIN-Protected Portals", "L1-L4 Tech Assignment"]}
  >
    <p>Manage repair missions with our advanced Kanban Matrix. Intake devices in under 15 seconds and move them through your workflow with surgical precision.</p>
  </FeatureSplitView>
);

const InventoryInfo: React.FC = () => (
  <FeatureSplitView 
    title="Inventory" 
    icon={<Package />} 
    colorClass="from-emerald-600 to-teal-600" 
    screenshots={[IMAGES.inventory]} 
    highlights={["Kanban Stock Management", "Automated Low-Stock Logic", "Supplier Direct Restock API"]}
  >
    <p>Never lose track of a part again. Our Warehouse Core uses Kanban boards to show you exactly what stock is low, what needs ordering, and what's on the shelf.</p>
  </FeatureSplitView>
);

const EmployeeConsoleInfo: React.FC = () => (
  <FeatureSplitView 
    title="Personnel" 
    icon={<Users />} 
    colorClass="from-slate-600 to-indigo-800" 
    screenshots={[IMAGES.employeesLog, IMAGES.employeesMain]} 
    highlights={["Granular Pay Scale Tracking", "Tax Document Vault", "Clearance Level Management", "Status-Aware Clocking"]}
  >
    <p>The ultimate employee database. Manage every recruit from hire to fire. Track rates of pay, status, and clearance levels across all terminals.</p>
  </FeatureSplitView>
);

const EstimatesInfo: React.FC = () => (
  <FeatureSplitView 
    title="Estimates" 
    icon={<FileText />} 
    colorClass="from-amber-600 to-orange-700" 
    screenshots={[IMAGES.estimates]} 
    highlights={["Instant Quote Generation", "PDF Export Pipeline", "Approval Tracking", "Conversion Analytics"]}
  >
    <p>Generate high-fidelity estimates in seconds. Our proprietary quote engine calculates labor and parts costs with precision to ensure maximum profitability.</p>
  </FeatureSplitView>
);

const BuyBackInfo: React.FC = () => (
  <FeatureSplitView 
    title="Buy Back" 
    icon={<DollarSign />} 
    colorClass="from-teal-600 to-cyan-700" 
    screenshots={[IMAGES.buyback]} 
    highlights={["Proprietary Grading Algorithm", "Instant Cash Offer Engine", "Legal Document Automation", "Inventory Pipeline Sync"]}
  >
    <p>Scale your inventory with our proprietary buyback system. Grade devices and generate instant cash offers that are competitive yet profitable.</p>
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
  </FeatureSplitView>
);

const PersonnelInfo: React.FC = () => (
  <FeatureSplitView 
    title="Setup" 
    icon={<Settings />} 
    colorClass="from-gray-600 to-slate-600" 
    screenshots={[IMAGES.settings]} 
    highlights={["Hardware Signal Tuning", "Global Theme Overrides", "API Uplink Management"]}
  >
    <p>Tune your OS experience to match your hardware. Manage staff clearance levels and configure global shop signals from a unified control pane.</p>
  </FeatureSplitView>
);

const PayrollInfo: React.FC = () => (
  <FeatureSplitView 
    title="Payroll" 
    icon={<Coins />} 
    colorClass="from-green-600 to-emerald-700" 
    screenshots={[IMAGES.payroll1, IMAGES.payroll2, IMAGES.payroll3]} 
    highlights={["Automated Tax Calculations", "Direct Deposit Integration", "Employee Commission Tracking", "Timesheet Verification Matrix"]}
  >
    <p>Manage your shop's payroll with surgical precision. Track commissions, bonuses, and hourly rates automatically based on ticket completions and clock-in logs.</p>
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
    </div>
  );
};

const APPS: AppDefinition[] = [
  { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard />, color: 'from-blue-600 to-indigo-600', component: DashboardInfo },
  { id: 'tickets', name: 'Tickets', icon: <Ticket />, color: 'from-pink-600 to-rose-600', component: TicketInfo },
  { id: 'inventory', name: 'Inventory', icon: <Package />, color: 'from-emerald-600 to-teal-600', component: InventoryInfo },
  { id: 'pos', name: 'Terminal POS', icon: <ShoppingCart />, color: 'from-amber-400 to-orange-600', component: POSInfo },
  { id: 'payroll', name: 'Payroll', icon: <Coins />, color: 'from-green-600 to-emerald-700', component: PayrollInfo },
  { id: 'marketing', name: 'Marketing', icon: <Megaphone />, color: 'from-indigo-600 to-purple-600', component: MarketingInfo },
  { id: 'analytics', name: 'Analytics', icon: <BarChart3 />, color: 'from-emerald-500 to-cyan-600', component: AnalyticsInfo },
  { id: 'employees', name: 'Personnel', icon: <Users />, color: 'from-slate-600 to-indigo-800', component: EmployeeConsoleInfo },
  { id: 'estimates', name: 'Estimates', icon: <FileText />, color: 'from-amber-600 to-orange-700', component: EstimatesInfo },
  { id: 'buyback', name: 'Buy Back', icon: <DollarSign />, color: 'from-teal-600 to-cyan-700', component: BuyBackInfo },
  { id: 'wiki', name: 'Repair Wiki', icon: <BookOpen />, color: 'from-slate-600 to-slate-800', component: WikiInfo },
  { id: 'guide', name: 'RepairOS Guide', icon: <Library />, color: 'from-blue-700 to-blue-900', component: GuideInfo },
  { id: 'suppliers', name: 'Supplier Hub', icon: <Truck />, color: 'from-rose-600 to-pink-600', component: SupplierInfo },
  { id: 'daemon', name: 'Daemon AI', icon: <Bot />, color: 'from-purple-600 to-fuchsia-600', component: DaemonAI },
  { id: 'nexus', name: 'Nexus Store', icon: <Store />, color: 'from-cyan-600 to-blue-600', component: NexusInfo },
  { id: 'settings', name: 'Setup', icon: <Settings />, color: 'from-gray-600 to-slate-600', component: PersonnelInfo },
];

// --- Showcase Component ---

const ShowCase: React.FC<{ onLaunch: () => void }> = ({ onLaunch }) => {
  const [activeLightbox, setActiveLightbox] = useState<string | null>(null);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const awards = [
    { icon: <ShieldCheck size={20} />, label: "Security Verified 2025" },
    { icon: <Trophy size={20} />, label: "Shop Choice Award" },
    { icon: <Star size={20} />, label: "Elite Tech Choice" },
    { icon: <Medal size={20} />, label: "Industry Gold Standard" },
    { icon: <Globe size={20} />, label: "Universal Compliance" }
  ];

  return (
    <div className="w-full bg-[#050505] text-white selection:bg-blue-500/30 overflow-y-auto h-screen scroll-smooth font-poppins">
      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-black/50 backdrop-blur-xl px-12 py-6 md:py-8 flex items-center justify-between">
        <div className="flex items-center gap-3 group">
          <span className="text-2xl md:text-3xl font-black tracking-tighter leading-none uppercase cursor-default">
            REPAIR<span className="text-blue-500">OS</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-[0.3em] text-white/40">
          <a href="#everything" className="hover:text-white transition-colors">Membership</a>
          <a href="#compatibility" className="hover:text-white transition-colors">Devices</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <button onClick={onLaunch} className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-2xl">Launch Demo</button>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-10 pt-40 pb-40 overflow-hidden text-center">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_60%)]"></div>
        <div className="relative z-10 max-w-7xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-[0.4em] mb-8 animate-pulse">
            <Zap size={14} /> NEW APPS ADDED WEEKLY // NO UPSELLS
          </div>
          
          <h1 className="text-8xl md:text-[13rem] font-black leading-[0.8] tracking-tighter mb-10 drop-shadow-2xl uppercase">
            REPAIR<span className="text-blue-500">OS</span>
          </h1>
          
          <h2 className="text-3xl md:text-6xl font-extrabold text-white/90 tracking-tight mb-12 max-w-5xl mx-auto leading-tight uppercase">
            THE WORLD'S FIRST <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">OPERATING SYSTEM</span> <br/>BUILT EXCLUSIVELY FOR REPAIR SHOPS.
          </h2>

          <p className="text-xl md:text-2xl text-white/40 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
            Not just another POS. Repair OS is a complete desktop ecosystem that replaces your fragmented tools with a single, high-fidelity operating environment.
          </p>
          
          <div className="flex flex-col items-center gap-14">
            <button onClick={onLaunch} className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-14 py-7 rounded-[32px] font-extrabold text-xl transition-all flex items-center justify-center gap-5 group shadow-2xl shadow-blue-500/20 uppercase active:scale-95">
              LAUNCH DEMO <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>

            {/* Awards Row - Explicitly Visible */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 max-w-5xl pt-8 border-t border-white/5">
              {awards.map((award, idx) => (
                <div key={idx} className="flex items-center gap-3 px-5 py-3 glass rounded-2xl border border-white/5 group hover:border-white/20 transition-all hover:-translate-y-1 bg-white/5 backdrop-blur-md">
                  <div className="text-blue-500 group-hover:scale-110 transition-transform">{award.icon}</div>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors whitespace-nowrap">{award.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* One Membership Section */}
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
               <button 
                onClick={() => setActiveLightbox(IMAGES.multitask)}
                className="relative block rounded-[60px] overflow-hidden border border-white/10 shadow-2xl cursor-zoom-in transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-blue-500/20"
               >
                 <img src={IMAGES.multitask} className="w-full h-auto" alt="Multitasking Interface" />
                 <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100 p-6 bg-white/10 backdrop-blur-2xl rounded-full border border-white/30 shadow-2xl">
                   <Maximize2 className="text-white" size={48} />
                 </div>
               </button>
               <div className="absolute -bottom-8 -right-8 glass px-8 py-5 rounded-[28px] border border-white/10 shadow-2xl animate-bounce font-black text-sm uppercase tracking-widest text-blue-400">UNLIMITED CAPACITY</div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility Section */}
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
                 { icon: <Smartphone size={32} />, name: "iPad" },
                 { icon: <Bot size={32} />, name: "Android" }
               ].map((item, i) => (
                 <div key={i} className="glass p-8 rounded-[32px] border border-white/5 flex flex-col items-center gap-4 group hover:border-white/20 transition-all">
                    <div className="text-white/30 group-hover:text-white transition-colors">{item.icon}</div>
                    <span className="text-xs font-bold uppercase tracking-widest">{item.name}</span>
                 </div>
               ))}
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
              <p className="text-2xl font-black text-white uppercase tracking-tight">Price locked for 5 years.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-20">
            <div className="glass p-12 rounded-[32px] border border-white/10 shadow-2xl">
              <h3 className="text-2xl font-bold mb-10 text-white uppercase tracking-tight">Included in the box:</h3>
              <ul className="space-y-6">
                {[
                  "Full Desktop OS Environment",
                  "Daemon AI Neural Core",
                  "Omnichannel Ticketing",
                  "Warehouse Stock Vault",
                  "App Store Access (All future modules included)"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-white/80 font-medium">
                    <Check size={20} className="text-emerald-500 shrink-0" strokeWidth={3} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass p-12 rounded-[32px] border border-white/10 shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-white uppercase tracking-tight">Ready to upgrade?</h3>
                <p className="text-white/50 text-lg leading-relaxed font-light">Join the shops running on the world's first Repair Operating System. Try it in your shop for 14 days, completely free.</p>
              </div>
              <div className="mt-12 text-center">
                <a href={LEMON_SQUEEZY_LINK} target="_blank" rel="noopener noreferrer" className="w-full bg-white text-black font-black uppercase py-6 rounded-2xl tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all text-lg shadow-2xl block">Start Free Trial</a>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto border-t border-white/5 pt-16 mt-32">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col items-center md:items-start gap-4">
                <button 
                  onClick={() => setIsDisclaimerOpen(true)}
                  className="text-[10px] text-white/20 hover:text-white transition-colors uppercase tracking-[0.2em] font-bold flex items-center gap-2"
                >
                  <Scale size={14} /> Legal Disclaimer
                </button>
              </div>
              <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
                <a href="https://daemoncore.app" target="_blank" className="text-blue-500 hover:text-white transition-colors font-black text-[11px] uppercase tracking-[0.3em]">DaemonCore.app</a>
                <a href="mailto:contact@daemoncore.app" className="text-white/40 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">Inquiries: contact@daemoncore.app</a>
              </div>
            </div>
            <p className="text-center text-white/20 text-[11px] font-bold uppercase tracking-[0.5em] mt-16">
              © 2025 Repair OS by DaemonCore • {PATENT_NOTICE}
            </p>
          </div>
        </div>
      </section>

      {/* Showcase Lightbox */}
      {activeLightbox && <Lightbox src={activeLightbox} onClose={() => setActiveLightbox(null)} label="SYSTEM CORE PREVIEW // CLICK TO DISMISS" />}

      {/* Legal Disclaimer Modal */}
      {isDisclaimerOpen && (
        <div 
          className="fixed inset-0 z-[1000000] flex items-center justify-center bg-black/90 backdrop-blur-3xl p-6 animate-in fade-in duration-300"
          onClick={() => setIsDisclaimerOpen(false)}
        >
          <div 
            className="max-w-2xl w-full glass p-10 md:p-14 rounded-[48px] border border-white/20 shadow-[0_0_100px_rgba(255,255,255,0.05)] relative animate-in zoom-in slide-in-from-bottom-10 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsDisclaimerOpen(false)}
              className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-2xl text-white/40 hover:text-white transition-all"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                <Scale className="text-white/50" size={32} />
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-8 leading-none">OPERATOR<br/><span className="text-white/40">AGREEMENT</span></h3>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-8"></div>
              <p className="text-[11px] md:text-[13px] text-white/60 uppercase tracking-[0.15em] leading-[2] font-medium text-justify">
                Legal Disclaimer: Repair OS is a proprietary interface for professional repair environments. 
                DaemonCore provides this platform "as is" without express or implied warranties. 
                Mission-critical operations and hardware handling remain the sole responsibility of the technician. 
                DaemonCore is not liable for business interruptions, data integrity issues, or hardware outcomes resulting from software utilization. 
                Usage of this OS constitutes acceptance of these operational boundaries.
              </p>
              <div className="mt-12 w-full">
                <button 
                  onClick={() => setIsDisclaimerOpen(false)}
                  className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95"
                >
                  Acknowledge & Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'showcase' | 'os'>('showcase');
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isBooting, setIsBooting] = useState(false);
  const [showImmersiveModal, setShowImmersiveModal] = useState(false);
  const [viewportSize, setViewportSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [iconPositions, setIconPositions] = useState<IconPos[]>([]);
  
  useEffect(() => {
    const handleResize = () => setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxRows = useMemo(() => Math.floor((viewportSize.height - PADDING * 2) / GRID_SIZE_Y), [viewportSize.height]);
  
  useEffect(() => {
    if (viewMode !== 'os') return;
    setIconPositions(prev => {
      const newPositions = [...prev];
      let col = 0;
      let row = 0;
      APPS.forEach((app) => {
        const existing = newPositions.find(p => p.id === app.id);
        if (!existing) {
          newPositions.push({ id: app.id, col, row });
          row++;
          if (row >= maxRows) { row = 0; col++; }
        } else if (existing.row >= maxRows) {
           existing.row = 0;
           existing.col++;
        }
      });
      return newPositions;
    });
  }, [viewMode, maxRows]);

  const handleDragEnd = (id: string, col: number, row: number) => {
    setIconPositions(prev => prev.map(p => p.id === id ? { ...p, col, row } : p));
  };

  useEffect(() => { 
    const timer = setInterval(() => setCurrentTime(new Date()), 1000); 
    return () => clearInterval(timer); 
  }, []);

  const launchOS = () => { 
    setIsBooting(true); 
    setTimeout(() => { 
      setIsBooting(false); 
      setViewMode('os'); 
      setShowImmersiveModal(true);
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
        <span className="text-white text-xs tracking-[0.6em] font-black uppercase">Syncing Neural Core...</span>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 animate-[progress_2.5s_ease-in-out]"></div>
        </div>
      </div>
      <style>{`@keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }`}</style>
    </div>
  );

  if (viewMode === 'showcase') return <ShowCase onLaunch={launchOS} />;

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-[#050505] font-poppins">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-black to-purple-950/40 z-0"></div>
      
      {showImmersiveModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/40 backdrop-blur-3xl animate-in fade-in duration-500">
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

      {/* Clock Display */}
      <div className="absolute top-16 right-16 z-10 text-right pointer-events-none select-none">
        <div className="text-[120px] font-black leading-none tracking-tighter text-white/90 uppercase">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </div>
        <div className="text-lg font-bold tracking-[0.4em] text-white/20 uppercase mt-4 mb-10">
          {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>

        {/* UPGRADE BUTTON */}
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
        </div>
      </div>

      {/* Desktop Icons Container */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {iconPositions.map(pos => {
          const app = APPS.find(a => a.id === pos.id);
          if (!app) return null;
          return (
            <DesktopIcon 
              key={app.id} 
              app={app} 
              pos={pos} 
              onDragEnd={handleDragEnd}
              onClick={() => openApp(app.id)}
            />
          );
        })}
        <div 
          onClick={() => setViewMode('showcase')}
          className="absolute bottom-16 right-16 z-10 group flex flex-col items-center gap-2 w-20 p-2 transition-all hover:bg-white/10 rounded-2xl text-white/20 hover:text-white cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center"><LogOut size={24} /></div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Exit OS</span>
        </div>
      </div>

      {/* Windows Layer */}
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

      {/* Taskbar Dock */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[500]">
        <div className="glass px-6 py-4 rounded-[32px] flex items-center gap-3 lg:gap-6 border border-white/10 shadow-2xl overflow-x-auto max-w-[90vw]">
          <div className="flex items-center gap-2">
             {APPS.map(app => (
               <button 
                key={app.id} 
                onClick={() => openApp(app.id)} 
                className={`p-3 lg:p-4 rounded-2xl transition-all relative group shrink-0 ${windows.some(w => w.id === app.id) ? 'bg-white/10 text-white' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
               >
                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden ${app.imageIcon ? 'bg-black' : ''}`}>
                    {app.imageIcon ? (
                      <img src={app.imageIcon} className="w-full h-full object-cover" alt="" />
                    ) : (
                      React.cloneElement(app.icon as React.ReactElement<any>, { size: 22 })
                    )}
                 </div>
                 {windows.some(w => w.id === app.id) && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>}
               </button>
             ))}
          </div>
          <div className="w-px h-10 bg-white/10 shrink-0"></div>
          <div className="flex items-center gap-3 lg:gap-6 px-2">
             <button className="text-white/40 hover:text-white transition-colors" onClick={() => setShowImmersiveModal(true)}><Maximize2 size={22} /></button>
             <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black text-[11px] shadow-lg shrink-0">TO</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;