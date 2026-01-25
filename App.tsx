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
  Laptop,
  Lock,
  ShieldAlert,
  Calculator,
  Navigation,
  Microscope,
  HardDrive,
  Database,
  History as HistoryIcon,
  Layers,
  Code,
  MessageSquare,
  CloudLightning,
  LockKeyhole,
  Rocket,
  ArrowRightLeft,
  CalendarDays,
  StickyNote,
  Send,
  Mail,
  Sparkles,
  Key,
  AppWindow,
  DownloadCloud,
  Banknote,
  TrendingUp,
  Workflow,
  Activity,
  Box,
  CreditCard,
  Target,
  Repeat,
  Compass,
  CpuIcon,
  Fingerprint,
  Globe2,
  HardHat,
  Heart,
  Image,
  Inbox,
  Languages,
  LifeBuoy,
  Link,
  List,
  Map,
  MousePointer,
  Music,
  Navigation2,
  Phone,
  PieChart,
  Printer,
  QrCode,
  Radio,
  Save,
  Search,
  Server,
  Share2,
  Sliders,
  Speaker,
  Sun,
  Terminal,
  Trash2,
  Upload,
  Video,
  Volume2,
  Wifi,
  Wind,
  Hammer,
  Wrench,
  Cog,
  Bell,
  Eye,
  ZapOff,
  Battery,
  Bluetooth,
  WifiOff,
  Cloud,
  File,
  Folder,
  Archive,
  Clipboard,
  Table,
  Filter,
  RefreshCw,
  LogIn,
  User,
  UserPlus,
  UserCheck,
  GlobeLock,
  ShieldQuestion,
  MessageCircle,
  Headphones,
  Minus,
  Command,
  MonitorSmartphone,
  ServerCrash,
  AlertTriangle,
  Flame,
  Timer,
  Scan,
  HardDriveDownload,
  Activity as ActivityIcon,
  Skull,
  Fingerprint as FingerprintIcon,
  ChevronRight,
  DatabaseZap,
  ShieldX,
  History,
  Zap as ZapIcon,
  XCircle,
  Ghost,
  RadioTower,
  BrainCircuit,
  Gavel,
  Microscope as Forensics,
  ShieldHalf,
  ChevronDown,
  Percent,
  Copy,
  Ticket as TicketIcon,
  MousePointer2,
  UploadCloud,
  Dna,
  DatabaseZap as VaultIcon
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

/**
 * REPAIR OS - SYSTEM CORE DEFINITIONS
 * 
 * Version: 2.6.2-STABLE (Visual Mockup & Footer Update)
 */

// --- Types & Interfaces ---

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

interface FeatureItem {
  t: string;
  d: string;
  icon?: React.ReactNode;
}

interface ChatMessage {
  role: 'ai' | 'user';
  content: string;
}

// --- Constants & Global Assets ---

const PATENT_NOTICE = "Patent Pending: US 10/2023/08429-DAEMON";
const GRID_SIZE_X = 100;
const GRID_SIZE_Y = 110;
const PADDING = 24;
const LEMON_SQUEEZY_LINK = "https://register.repairos.app";
const SUPPORT_EMAIL = "contact@daemoncore.app";
const LEGAL_URL = "https://legal.repairos.app";

const IMAGES = {
  logo: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/repairoslogo.png",
  multitask: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/multitask.png",
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
  pos: "https://cutlzlouwruvvdldospp.supabase.co/storage/v1/object/public/marketing/posROS.png",
  checkin: "https://hlelnadzajmnxryzteww.supabase.co/storage/v1/object/public/RepairOS/checkin.png",
  checkedIn: "https://hlelnadzajmnxryzteww.supabase.co/storage/v1/object/public/RepairOS/Screenshot%202025-12-30%20170021.png",
  desktopNew: "https://hlelnadzajmnxryzteww.supabase.co/storage/v1/object/public/RepairOS/desktopROS.png",
  desktopSecondary: "https://hlelnadzajmnxryzteww.supabase.co/storage/v1/object/public/RepairOS/Screenshot%202026-01-01%20053335.png",
  emailBlaster: "https://hlelnadzajmnxryzteww.supabase.co/storage/v1/object/public/RepairOS/Screenshot%202025-12-30%20175802.png",
  unlockSoftware: "https://hlelnadzajmnxryzteww.supabase.co/storage/v1/object/public/RepairOS/Screenshot%202025-12-27%20155945.png",
  nexus: "https://hlelnadzajmnxryzteww.supabase.co/storage/v1/object/public/RepairOS/Screenshot%202026-01-01%20050121.png",
  buyback1: "https://hlelnadzajmnxryzteww.supabase.co/storage/v1/object/public/RepairOS/Screenshot%202026-01-01%20050938.png",
  buyback2: "https://hlelnadzajmnxryzteww.supabase.co/storage/v1/object/public/RepairOS/Screenshot%202026-01-01%20051032.png",
  heroScreen: "https://hlelnadzajmnxryzteww.supabase.co/storage/v1/object/public/RepairOS/Screenshot%202026-01-24%20194902.png"
};

// --- New Strategic Components ---

const MigrationVisualizer: React.FC = () => {
  const [active, setActive] = useState(false);
  const sources = [
    { name: 'ShopMonkey', icon: <Skull size={24} className="text-gray-500" /> },
    { name: 'RepairShopr', icon: <TicketIcon size={24} className="text-gray-500" /> },
    { name: 'Excel Sheets', icon: <Table size={24} className="text-emerald-600" /> },
    { name: 'Paper Files', icon: <FileText size={24} className="text-gray-500" /> },
  ];

  return (
    <div className="w-full py-32 bg-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-10 text-center relative z-10">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
           <ArrowRightLeft size={14} /> ZERO-FRICTION IMPORT
        </div>
        <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">THE MIGRATION <br/><span className="text-blue-500">PIPELINE.</span></h3>
        <p className="text-xl text-white/40 max-w-2xl mx-auto font-medium mb-20 uppercase tracking-tighter">Switching is instant. Our automated vault ingestion streams your legacy data into Repair OS in seconds.</p>

        <div className="relative h-[300px] flex items-center justify-between px-20">
           {/* Source Pile */}
           <div className="grid grid-cols-2 gap-4">
              {sources.map((s, i) => (
                <div key={i} className="w-20 h-20 glass rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-2 group transition-all">
                   {s.icon}
                   <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">{s.name}</span>
                </div>
              ))}
           </div>

           {/* Animated Data Conduit - Thicker and more visible */}
           <div className="flex-1 relative mx-20 h-4 bg-white/5 rounded-full overflow-visible">
              {/* Core Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-500/40 to-blue-600/0 blur-md transition-all duration-[1s] ${active ? 'opacity-100 scale-y-150' : 'opacity-20'}`}></div>
              
              {/* Dynamic Stream Path */}
              <div className={`absolute top-1/2 -translate-y-1/2 left-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent transition-all duration-700 ease-in-out ${active ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
              
              {/* Particle Stream */}
              <div className="absolute inset-0 overflow-visible pointer-events-none">
                 {[...Array(12)].map((_, i) => (
                   <div 
                     key={i} 
                     className={`absolute top-1/2 -translate-y-1/2 w-8 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent blur-[1px] animate-stream-fast`} 
                     style={{ 
                       animationDelay: `${i * 0.2}s`,
                       opacity: active ? 1 : 0,
                       transition: 'opacity 0.3s ease'
                     }}
                   ></div>
                 ))}
                 {/* Glowing Orbs */}
                 {[...Array(5)].map((_, i) => (
                    <div 
                      key={`orb-${i}`}
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400 blur-sm shadow-[0_0_15px_rgba(59,130,246,1)] animate-stream-orb"
                      style={{ 
                        animationDelay: `${i * 0.6}s`,
                        opacity: active ? 0.8 : 0,
                        transition: 'opacity 0.5s ease'
                      }}
                    ></div>
                 ))}
              </div>
           </div>

           {/* Repair OS Vault */}
           <div className="relative">
              <div className={`absolute -inset-10 bg-blue-600/20 blur-[60px] rounded-full transition-opacity duration-1000 ${active ? 'opacity-100' : 'opacity-0'}`}></div>
              <div className="w-40 h-40 glass rounded-[40px] border-2 border-blue-500/30 flex flex-col items-center justify-center gap-4 relative z-10 shadow-[0_0_50px_rgba(37,99,235,0.2)]">
                 <VaultIcon size={56} className={`${active ? 'text-blue-500 animate-pulse' : 'text-white/20'}`} />
                 <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">ROS VAULT</span>
              </div>
           </div>
        </div>

        <a 
          href={LEMON_SQUEEZY_LINK}
          target="_blank"
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          className="inline-block mt-20 bg-white text-black px-16 py-6 rounded-[30px] font-black uppercase text-sm tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95 border-b-4 border-gray-300 no-underline"
        >
          START DATA INGESTION
        </a>
      </div>

      <style>{`
        @keyframes stream-fast {
          0% { left: -10%; opacity: 0; transform: translateY(-50%) scaleX(0.5); }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 110%; opacity: 0; transform: translateY(-50%) scaleX(2); }
        }
        @keyframes stream-orb {
          0% { left: -5%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 105%; opacity: 0; }
        }
        .animate-stream-fast {
          animation: stream-fast 0.8s linear infinite;
        }
        .animate-stream-orb {
          animation: stream-orb 1.2s linear infinite;
        }
      `}</style>
    </div>
  );
};

// --- UI Components Core ---

const ExitIntentModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const code = "CORE20";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6 animate-in fade-in duration-500 backdrop-blur-2xl">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      <div className="relative max-w-xl w-full glass rounded-[60px] border-2 border-blue-500/30 shadow-[0_0_150px_rgba(37,99,235,0.3)] p-12 md:p-16 flex flex-col items-center text-center animate-in zoom-in slide-in-from-bottom-10 duration-700 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-400 to-blue-600 animate-pulse"></div>
        <button onClick={onClose} className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-2xl text-white/30 hover:text-white transition-all"><X size={20} /></button>
        
        <div className="w-24 h-24 rounded-[36px] bg-blue-600/20 flex items-center justify-center mb-10 shadow-[0_0_40px_rgba(37,99,235,0.4)] border border-blue-500/40">
          <Gift size={48} className="text-blue-500 animate-bounce" />
        </div>

        <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-none">DON'T LEAVE YOUR PROFIT <span className="text-blue-500">ON THE BENCH.</span></h3>
        <p className="text-lg text-white/50 font-bold mb-12 uppercase tracking-widest leading-relaxed">Your workshop deserves a proprietary edge. Claim a <span className="text-white font-black italic">20% Discount</span> on your first month today.</p>
        
        <div className="w-full bg-white/5 rounded-[32px] border border-white/10 p-8 flex flex-col items-center gap-6 mb-12 group hover:bg-white/[0.08] transition-all">
           <div className="text-[10px] font-black uppercase text-blue-400 tracking-[0.4em]">ACTIVATE COUPON CODE</div>
           <div className="flex items-center gap-4 bg-black/40 px-10 py-6 rounded-2xl border border-blue-500/20 w-full justify-between">
              <span className="text-3xl font-black text-white tracking-[0.2em]">{code}</span>
              <button onClick={handleCopy} className="p-3 hover:bg-blue-600 rounded-xl transition-all text-blue-400 hover:text-white">
                {copied ? <Check size={24} /> : <Copy size={24} />}
              </button>
           </div>
           {copied && <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest animate-pulse">COPIED TO CLIPBOARD</div>}
        </div>

        <div className="flex flex-col gap-4 w-full">
           <a href={LEMON_SQUEEZY_LINK} target="_blank" className="w-full bg-blue-600 text-white py-8 rounded-[30px] font-black uppercase text-2xl tracking-[0.2em] hover:bg-blue-500 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.5)] active:scale-95 border-b-8 border-blue-800 flex items-center justify-center gap-4">
             SECURE MY DISCOUNT <Zap size={28} />
           </a>
           <button onClick={onClose} className="text-[10px] font-black uppercase text-white/20 tracking-[0.3em] hover:text-white transition-colors py-4">
             NO THANKS, I'LL PAY FULL PRICE
           </button>
        </div>
      </div>
    </div>
  );
};

const PrivacyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" onClick={onClose}></div>
      <div className="relative max-w-2xl w-full glass rounded-[40px] border border-white/10 shadow-[0_0_100px_rgba(37,99,235,0.2)] p-10 md:p-16 flex flex-col animate-in zoom-in slide-in-from-bottom-5 duration-500 max-h-[85vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-2xl text-white/30 hover:text-white transition-all"><X size={20} /></button>
        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-4"><ShieldCheck className="text-blue-500" /> PRIVACY PROTOCOL</h3>
        <div className="space-y-6 text-white/50 text-sm font-bold uppercase tracking-widest leading-loose">
          <p>Repair OS (DaemonCore Systems) values your shop's data integrity. We operate on a zero-trust architecture. </p>
          <p>We do not sell shop-specific diagnostic data, technician logs, or customer lists to third-party aggregators. All PII (Personally Identifiable Information) is encrypted at rest using military-grade AES-256 protocols.</p>
          <p>Metadata collected during active sessions is strictly utilized for kernel optimization, WASM performance auditing, and system-wide security patches. By using the OS, you agree to local storage allocation for offline caching functionality.</p>
          <p>All carrier unlock logs and buyback valuations are strictly confidential and mapped to your unique Node ID within the Nexus vault.</p>
        </div>
        <button onClick={onClose} className="mt-12 w-full bg-white text-black py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all">ACKNOWLEDGE PROTOCOL</button>
      </div>
    </div>
  );
};

const ProfitLeakDiagnostic: React.FC = () => {
  const [leaks, setLeaks] = useState({
    manualSms: false,
    paperWork: false,
    shrinkage: false,
    quoteDelay: false,
    techChaos: false
  });

  const values = {
    manualSms: 90,
    paperWork: 150,
    shrinkage: 250,
    quoteDelay: 120,
    techChaos: 160
  };

  const totalLoss = Object.entries(leaks).reduce((acc, [key, active]) => 
    active ? acc + values[key as keyof typeof values] : acc, 0
  );

  const toggle = (key: keyof typeof leaks) => setLeaks(l => ({ ...l, [key]: !l[key] }));

  return (
    <div className="w-full max-w-5xl mx-auto glass rounded-[60px] border border-white/10 p-12 lg:p-20 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8">
        <ActivityIcon className="text-red-500 animate-pulse" size={32} />
      </div>
      
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
           <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
              <ShieldAlert size={14} /> FINANCIAL HEMORRHAGE AUDIT
           </div>
           <h3 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">DIAGNOSE YOUR <br/><span className="text-red-500">PROFIT LEAKS.</span></h3>
           <p className="text-xl text-white/40 font-medium mb-12 uppercase tracking-tighter">Legacy workflows are costing you daily. Select your current inefficiencies to see the monthly damage.</p>
           
           <div className="space-y-4">
              {[
                { id: 'manualSms', t: 'MANUAL SMS UPDATES', d: 'Technician labor lost to manual texting.' },
                { id: 'paperWork', t: 'PAPER INVOICING', d: 'Supply costs and filing latency overhead.' },
                { id: 'shrinkage', t: 'STOCK DISCREPANCIES', d: 'Unaccounted parts and audit inaccuracy.' },
                { id: 'quoteDelay', t: 'QUOTING DELAYS', d: 'Lost conversion due to slow quote delivery.' },
                { id: 'techChaos', t: 'TECH BENCH CONGESTION', d: 'Inefficiency from unrouted technician flows.' },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => toggle(item.id as keyof typeof leaks)}
                  className={`w-full flex items-center justify-between p-6 rounded-3xl border transition-all group ${leaks[item.id as keyof typeof leaks] ? 'bg-red-500/10 border-red-500/50' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                >
                  <div className="text-left">
                    <div className={`text-sm font-black uppercase tracking-widest mb-1 ${leaks[item.id as keyof typeof leaks] ? 'text-red-400' : 'text-white/60'}`}>{item.t}</div>
                    <div className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{item.d}</div>
                  </div>
                  <div className={`w-12 h-6 rounded-full relative transition-colors ${leaks[item.id as keyof typeof leaks] ? 'bg-red-600' : 'bg-white/10'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${leaks[item.id as keyof typeof leaks] ? 'left-7' : 'left-1'}`}></div>
                  </div>
                </button>
              ))}
           </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center p-12 bg-black/40 rounded-[48px] border border-white/5 relative overflow-hidden group">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1),transparent_70%)]"></div>
           <Skull className={`mb-10 transition-all duration-700 ${totalLoss > 0 ? 'text-red-500 scale-125 drop-shadow-[0_0_30px_rgba(239,68,68,0.6)]' : 'text-white/10'}`} size={80} />
           <div className="text-[12px] font-black text-white/20 uppercase tracking-[0.5em] mb-4">ESTIMATED MONTHLY LOSS</div>
           <div className="text-7xl lg:text-9xl font-black tabular-nums text-white tracking-tighter drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]">
              $<span className={totalLoss > 0 ? 'text-red-500' : 'text-white'}>{totalLoss}</span>
           </div>
           <div className="mt-12 p-8 glass rounded-3xl border-red-500/20 w-full animate-pulse">
              <div className="text-[11px] font-black text-red-400 uppercase tracking-[0.3em] mb-2">CRITICAL DIAGNOSTIC:</div>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest leading-relaxed">
                {totalLoss === 0 ? "Select an inefficiency to begin audit." : totalLoss >= 199 ? "Repair OS pays for itself by eliminating these leaks today." : "You are bleeding capital every month. Repair OS stops the hemorrhage."}
              </p>
           </div>
           <button 
             onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} 
             className="mt-12 w-full bg-white text-black py-6 rounded-3xl font-black uppercase text-sm tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all border-b-4 border-gray-300"
           >
             STOP THE LEAK NOW
           </button>
        </div>
      </div>
    </div>
  );
};

const LegacyComparison: React.FC = () => {
  const points = [
    { label: "CELL UNLOCKING", legacy: "Manual/3rd Party Apps", ros: "Proprietary Kernel Apps", icon: <RadioTower /> },
    { label: "ASSET VALUATION", legacy: "Fixed Price Lists", ros: "Gemini AI Trade Engine", icon: <BrainCircuit /> },
    { label: "PAYROLL SYNC", legacy: "External QuickBooks", ros: "Q2 2026 Core Integrated", icon: <DollarSign /> },
    { label: "DISPATCHING", legacy: "Manual Messaging", ros: "Surgical Matrix Matrix", icon: <Workflow /> },
    { label: "CELL FORENSICS", legacy: "Non-Existent", ros: "Native L4 Forensic Suite", icon: <Forensics /> },
    { label: "TICKETING / POS", legacy: "Legacy Web Bloat", ros: "Unified High-Fidelity", icon: <Ticket /> },
    { label: "INVOICING / QUOTES", legacy: "Paper & Generic PDF", ros: "Proprietary Neural Gen", icon: <FileText /> },
    { label: "INVENTORY VAULT", legacy: "Spreadsheet Chaos", ros: "Encrypted SKU Repository", icon: <Package /> },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-48 px-10 relative">
      <div className="flex flex-col items-center text-center mb-32">
        <a 
          href={LEMON_SQUEEZY_LINK} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-red-600 text-white text-[12px] font-black uppercase tracking-[0.6em] mb-12 shadow-[0_0_40px_rgba(220,38,38,0.5)] border-t border-white/20 hover:scale-105 hover:bg-red-500 transition-all cursor-pointer"
        >
          <ZapIcon size={16} fill="currentColor" /> THE KILL CHART
        </a>
        <h3 className="text-7xl lg:text-9xl font-black uppercase tracking-tighter mb-8 leading-none">TERMINATE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">OBSOLETE.</span></h3>
        <p className="text-2xl text-white/40 max-w-4xl font-black uppercase tracking-widest italic">The era of "Repair Shopr" and "Shop Monkey" is over.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-px overflow-hidden rounded-[80px] border-[6px] border-white/5 bg-white/5 shadow-[0_60px_150px_rgba(0,0,0,1)] relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')] opacity-10 pointer-events-none"></div>
        
        {/* Legacy Side - Dark, Grungy, Decaying Red */}
        <div className="p-16 lg:p-24 bg-[#1a0a0a] relative group overflow-hidden flex flex-col">
           <div className="absolute inset-0 bg-gradient-to-b from-red-600/5 to-transparent opacity-50"></div>
           <div className="flex items-center gap-6 mb-20 relative z-10">
              <div className="w-16 h-16 rounded-[28px] bg-red-600/20 border-2 border-red-600/40 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                <Skull className="text-red-500" size={36} />
              </div>
              <div>
                <span className="text-4xl font-black uppercase tracking-tighter text-red-500 block leading-none mb-1">LEGACY ERA</span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-900/60">SHOP MONKEY / REPAIR SHOPR</span>
           </div>
           </div>
           
           <div className="space-y-12 relative z-10 flex-1">
              {points.map((p, i) => (
                <div key={i} className="group/item">
                  <div className="text-[10px] font-black text-red-900 uppercase tracking-[0.5em] mb-4 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-900/50"></div>
                    {p.label}
                  </div>
                  <div className="text-2xl font-black uppercase tracking-tighter text-red-200/20 italic flex items-center gap-6 line-through decoration-red-900/60 decoration-[1px]">
                    <XCircle size={22} className="text-red-900 shrink-0" /> {p.legacy}
                  </div>
                </div>
              ))}
           </div>

           <div className="mt-24 p-10 min-h-[140px] flex items-center justify-center bg-black/40 rounded-[40px] border border-red-900/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.05),transparent_70%)]"></div>
              <p className="text-red-900 text-xs font-black uppercase tracking-widest text-center leading-relaxed relative z-10">
                FRAGMENTED SYSTEM ARCHITECTURE <br/> DETECTED // PERFORMANCE DECAY: CRITICAL
              </p>
           </div>
        </div>

        {/* Repair OS Side - High-Voltage, Vivid Blue */}
        <div className="p-16 lg:p-24 bg-[#0a0f1a] relative group overflow-hidden flex flex-col">
           <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent"></div>
           <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full animate-pulse"></div>
           
           <div className="flex items-center gap-6 mb-20 relative z-10">
              <div className="w-16 h-16 rounded-[28px] bg-blue-600 border-2 border-blue-400 flex items-center justify-center shadow-[0_0_60px_rgba(37,99,235,0.7)] animate-pulse">
                <Cpu size={36} className="text-white" />
              </div>
              <div>
                <span className="text-4xl font-black uppercase tracking-tighter text-white block leading-none mb-1">REPAIR OS</span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">100% PROPRIETARY KERNEL</span>
              </div>
           </div>
           
           <div className="space-y-12 relative z-10 flex-1">
              {points.map((p, i) => (
                <div key={i} className="group/item">
                  <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] mb-4 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    {p.label}
                  </div>
                  <div className="text-2xl font-black uppercase tracking-tighter text-white flex items-center gap-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      {React.cloneElement(p.icon as any, { size: 24, className: "text-blue-400" })}
                    </div>
                    {p.ros}
                  </div>
                </div>
              ))}
           </div>

           <div className="mt-24 p-10 min-h-[140px] flex items-center bg-blue-600 text-white rounded-[40px] shadow-[0_20px_50px_rgba(37,99,235,0.5)] border-t border-white/30 group-hover:scale-[1.02] transition-transform duration-500 relative cursor-pointer overflow-hidden" onClick={() => window.open(LEMON_SQUEEZY_LINK)}>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="flex items-center justify-between gap-4 w-full">
                 <div className="text-left">
                    <span className="block text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">NATIVE DEPLOYMENT ACTIVE</span>
                    <span className="block text-xl font-black uppercase tracking-tighter">CLAIM YOUR PROPRIETARY BENCH</span>
                 </div>
                 <ArrowRight size={32} />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const StressTestModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setPhase('scanning');
      setProgress(0);
      setLogs([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (phase === 'scanning') {
      const logOptions = [
        "CALIBRATING NEURAL ENGINE...",
        "VERIFYING BROWSER KERNEL...",
        "CHECKING WEBGPU ACCELERATION...",
        "MAPPING MEMORY HEAP...",
        "TESTING WASM LATENCY...",
        "STRESS TESTING IO PIPELINE...",
        "ENCRYPTING LOCAL STORAGE VAULT...",
        "VALIDATING F11 IMMERSION PATH..."
      ];
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setPhase('complete');
            return 100;
          }
          const next = prev + Math.random() * 15;
          if (Math.random() > 0.5 && logs.length < 8) {
            setLogs(l => [...l, logOptions[l.length]]);
          }
          return next;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [phase]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={onClose}></div>
      <div className="relative max-w-2xl w-full glass rounded-[48px] border border-white/20 shadow-[0_0_150px_rgba(59,130,246,0.3)] p-12 overflow-hidden flex flex-col items-center text-center animate-in zoom-in duration-700">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
           <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

        {phase === 'scanning' ? (
          <>
            <div className="w-24 h-24 rounded-full border-4 border-t-blue-500 border-white/5 animate-spin mb-10"></div>
            <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">BENCH STRESS TEST</h3>
            <p className="text-white/40 font-bold uppercase tracking-widest text-xs mb-10">Verifying Hardware Compatibility...</p>
            <div className="w-full space-y-3 font-mono text-[10px] text-blue-400 text-left bg-black/50 p-6 rounded-2xl border border-white/5 min-h-[160px]">
               {logs.map((l, i) => <div key={i} className="flex gap-4"><span>[OK]</span> {l}</div>)}
            </div>
          </>
        ) : (
          <div className="animate-in fade-in zoom-in duration-1000 flex flex-col items-center">
            <div className="w-32 h-32 rounded-[40px] bg-emerald-500 flex items-center justify-center mb-10 shadow-[0_0_60px_rgba(16,185,129,0.5)]">
               <ShieldCheck size={64} className="text-white animate-pulse" />
            </div>
            <h3 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">HARDWARE<br/><span className="text-emerald-400">VERIFIED</span></h3>
            <p className="text-xl text-white/40 font-medium mb-12 uppercase tracking-tighter leading-relaxed">Your machine is optimized for <span className="text-white font-black italic">Repair OS native kernel.</span> No installation required.</p>
            <div className="grid grid-cols-2 gap-6 w-full mb-12">
               <div className="glass p-6 rounded-3xl border-emerald-500/20 bg-emerald-500/5">
                  <div className="text-2xl font-black text-emerald-400 mb-1 leading-none">100%</div>
                  <div className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em]">Efficiency Rating</div>
               </div>
               <div className="glass p-6 rounded-3xl border-blue-500/20 bg-blue-500/5">
                  <div className="text-2xl font-black text-blue-400 mb-1 leading-none">ULTRA</div>
                  <div className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em]">Tier Compatibility</div>
               </div>
            </div>
            <button onClick={onClose} className="w-full bg-white text-black py-8 rounded-[30px] font-black uppercase text-2xl tracking-[0.2em] hover:bg-emerald-500 hover:text-white transition-all shadow-2xl active:scale-95 border-b-8 border-gray-300">ENGAGE SYSTEM</button>
          </div>
        )}
      </div>
    </div>
  );
};

const ClaimSpotModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [ticker, setTicker] = useState<string[]>(["[AUTH] Initializing node monitoring..."]);
  
  useEffect(() => {
    if (!isOpen) return;
    const cities = ["London, UK", "Austin, TX", "Berlin, DE", "Tokyo, JP", "Paris, FR", "New York, NY", "Dubai, UAE", "Sydney, AU"];
    const interval = setInterval(() => {
      const city = cities[Math.floor(Math.random() * cities.length)];
      setTicker(prev => [`[AUTH] Node Provisioned: ${city}`, ...prev].slice(0, 4));
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-700 backdrop-blur-2xl">
      <div className="absolute inset-0 bg-red-950/20" onClick={onClose}></div>
      <div className="relative max-w-2xl w-full glass rounded-[50px] border-2 border-red-500/30 shadow-[0_0_100px_rgba(239,68,68,0.3)] p-10 md:p-16 flex flex-col items-center text-center animate-in zoom-in slide-in-from-bottom-20 duration-1000 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 animate-pulse"></div>
        <button onClick={onClose} className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-2xl text-white/30 hover:text-white transition-all"><X size={24} /></button>
        
        <div className="w-24 h-24 rounded-[36px] bg-red-600/20 flex items-center justify-center mb-10 shadow-2xl border border-red-500/40 animate-bounce" style={{ animationDuration: '3s' }}>
          <AlertTriangle size={48} className="text-red-500" />
        </div>

        <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-none">SYSTEM CAPACITY<br/><span className="text-red-500">912 / 1000 NODES</span></h3>
        <p className="text-xl text-white/50 font-medium mb-12 uppercase tracking-tighter leading-relaxed">To maintain 99.9% uptime, we strictly cap new shop intake. <span className="text-white font-black italic">DaemonCore server resources are reaching peak allocation.</span></p>
        
        <div className="w-full bg-white/5 rounded-full h-4 mb-8 overflow-hidden border border-white/10 relative p-1">
           <div className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.6)]" style={{ width: '91.2%' }}></div>
        </div>

        <div className="w-full bg-black/40 rounded-2xl p-4 mb-10 border border-white/5 text-left font-mono text-[10px] text-red-400 h-24 overflow-hidden relative">
           <div className="absolute top-0 right-4 px-2 py-1 bg-red-600/20 text-red-500 text-[8px] font-black uppercase tracking-widest rounded-b-md">Live Activity</div>
           {ticker.map((line, i) => (
             <div key={i} className="animate-in slide-in-from-bottom-2 duration-500 mb-1 opacity-80">{line}</div>
           ))}
        </div>

        <div className="grid grid-cols-2 gap-6 w-full mb-12">
           <div className="glass p-6 rounded-3xl border-red-500/20 bg-red-500/5">
              <div className="text-3xl font-black text-red-400 mb-1 leading-none">88</div>
              <div className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em]">Slots Remaining</div>
           </div>
           <div className="glass p-6 rounded-3xl border-orange-500/20 bg-orange-500/5">
              <div className="text-3xl font-black text-orange-400 mb-1 leading-none">14</div>
              <div className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em]">Active Requests</div>
           </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
           <a href={LEMON_SQUEEZY_LINK} target="_blank" className="w-full bg-red-600 text-white py-8 rounded-[30px] font-black uppercase text-2xl tracking-[0.2em] hover:bg-red-500 transition-all shadow-[0_20px_50px_rgba(220,38,38,0.5)] active:scale-95 border-b-8 border-red-800 flex items-center justify-center gap-4">
             SECURE MY BENCH <Flame size={28} />
           </a>
           <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.3em] flex items-center justify-center gap-2">
             <Timer size={12} /> ONCE 1000 NODES ARE ALLOCATED, ACCESS WILL LOCK
           </p>
        </div>
      </div>
    </div>
  );
};

const HowItWorksModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-700">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" onClick={onClose}></div>
      <div className="relative max-w-6xl w-full glass rounded-[60px] border border-white/10 shadow-[0_0_150px_rgba(37,99,235,0.4)] overflow-hidden flex flex-col lg:flex-row animate-in zoom-in slide-in-from-bottom-10 duration-1000">
        <button onClick={onClose} className="absolute top-8 right-8 z-[1001] p-4 bg-white/5 hover:bg-red-500 rounded-2xl text-white transition-all border border-white/10"><X size={24} /></button>
        
        {/* Visual Showcase Side */}
        <div className="w-full lg:w-1/2 p-12 bg-gradient-to-br from-blue-900/30 to-black flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
          
          <div className="relative w-full aspect-[4/3] max-w-md mx-auto group">
             {/* Stylized Browser Frame */}
             <div className="absolute inset-0 bg-[#121212] rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col transition-all duration-1000 group-hover:scale-105">
                <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                   <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                   </div>
                   <div className="flex-1 mx-4 bg-white/5 h-6 rounded-lg border border-white/10 flex items-center px-3">
                      <div className="text-[10px] text-white/30 font-bold tracking-widest uppercase">https://repairos.app</div>
                   </div>
                </div>
                <div className="flex-1 relative flex items-center justify-center bg-black">
                   <img src={IMAGES.desktopNew} className="w-[85%] h-auto rounded-xl shadow-2xl" alt="" />
                   {/* Fullscreen Overlay Animation */}
                   <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-all duration-1000 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white rounded-3xl flex flex-col items-center justify-center text-black font-black text-3xl opacity-0 group-hover:opacity-100 group-hover:translate-y-[-20px] transition-all duration-500 shadow-2xl scale-0 group-hover:scale-100">
                         <span className="text-xs uppercase tracking-widest mb-1">Press</span>
                         F11
                      </div>
                   </div>
                </div>
             </div>
             {/* Full Screen Burst Lines */}
             <div className="absolute -inset-10 border-2 border-blue-500/0 group-hover:border-blue-500/20 rounded-[40px] animate-pulse transition-all duration-1000"></div>
          </div>
          
          <div className="mt-12 text-center relative z-10">
             <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                IMMERSE YOUR WORKSHOP
             </div>
             <p className="text-white/40 text-sm font-medium uppercase tracking-[0.2em]">Open Browser → Press F11 → Full System Control</p>
          </div>
        </div>

        {/* Info Side */}
        <div className="flex-1 p-12 lg:p-20 flex flex-col justify-center">
           <h3 className="text-5xl lg:text-6xl font-black uppercase mb-8 leading-tight tracking-tighter">ZERO INSTALL.<br/><span className="text-blue-500">MAXIMUM PIXELS.</span></h3>
           <p className="text-xl text-white/50 font-medium mb-12 uppercase tracking-tighter leading-relaxed">Repair OS is a native browser-based kernel. We've eliminated the need for executable files, drivers, and local bloatware.</p>
           
           <div className="space-y-8">
              {[
                { i: <DownloadCloud className="text-blue-400" />, iClass: "text-blue-400", t: "NO DOWNLOADS REQUIRED", d: "Accessed 100% via your secure shop login. No local footprint." },
                { i: <MonitorSmartphone className="text-indigo-400" />, iClass: "text-indigo-400", t: "99% HARDWARE COMPATIBILITY", d: "Runs on any modern device: Tablets, Laptops, Desktops, & All-in-ones." },
                { i: <Maximize2 className="text-emerald-400" />, iClass: "text-emerald-400", t: "F11 IMMERSIVE MODE", d: "Hit F11 to replace your local OS environment with a high-fidelity workshop cockpit." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                   <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-blue-500/50 transition-all shadow-xl">{item.i}</div>
                   <div>
                      <h4 className="text-lg font-black uppercase tracking-tighter group-hover:text-blue-200 transition-colors">{item.t}</h4>
                      <p className="text-sm text-white/30 font-bold uppercase tracking-widest">{item.d}</p>
                   </div>
                </div>
              ))}
           </div>

           <button onClick={onClose} className="mt-16 bg-white text-black px-12 py-5 rounded-[24px] font-black uppercase text-sm tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95 border-b-4 border-gray-300 hover:border-blue-700 w-fit">
              I UNDERSTAND
           </button>
        </div>
      </div>
    </div>
  );
};

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
    <img src={src} className="max-w-[90vw] max-h-[85vh] object-contain rounded-3xl shadow-[0_0_100px_rgba(37,99,235,0.4)] animate-in zoom-in duration-500" alt="Preview" />
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
        {app.imageIcon ? <img src={app.imageIcon} className="w-full h-full object-cover" alt="" /> : React.cloneElement(app.icon as any, { size: 24 })}
      </div>
      <span className="text-[10px] font-bold text-white/90 text-center drop-shadow-md line-clamp-2 leading-tight drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]">{app.name}</span>
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
      <div className="h-12 bg-black/60 border-b border-white/5 flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-white ${app.imageIcon ? 'bg-black' : `bg-gradient-to-br ${app.color}`}`}>
            {app.imageIcon ? <img src={app.imageIcon} className="w-full h-full object-cover" alt="" /> : React.cloneElement(app.icon as any, { size: 12 })}
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
            {React.cloneElement(icon as any, { size: 32, className: "text-white" })}
          </div>
          <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">{title}</h2>
          <div className="text-white/50 leading-relaxed mb-10">{children}</div>
          <div className="pt-8 border-t border-white/5 space-y-3">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-bold text-white/40">
                <CheckCircle2 size={16} className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" /> {h}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-8 overflow-y-auto bg-black/50 space-y-10">
          {screenshots.map((s, i) => (
            <button key={i} onClick={() => setLb(s)} className="w-full rounded-2xl border border-white/10 overflow-hidden hover:scale-[1.01] transition-transform shadow-2xl group relative">
               <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-500"></div>
              <img src={s} className="w-full h-auto" alt="" />
            </button>
          ))}
        </div>
      </div>
      {lb && <Lightbox src={lb} onClose={() => setLb(null)} />}
    </>
  );
};

// --- Application Modules ---

const Dashboard = () => (
  <FeatureSplitView 
    title="Dashboard" 
    icon={<LayoutDashboard />} 
    colorClass="from-blue-500 via-indigo-600 to-indigo-700" 
    screenshots={[IMAGES.multitask]} 
    highlights={["Real-time Telemetry", "Bench Pressure Matrix", "Cashflow Signals"]}
  >
    <p>Command your shop from a unified cockpit. Track every metric in real-time. The dashboard serves as the central nervous system for your entire operations.</p>
    <p className="mt-4 text-white/30 text-sm italic">Engineered for 24/7 reliability and instant shop floor visibility.</p>
  </FeatureSplitView>
);

const Tickets = () => (
  <FeatureSplitView 
    title="Tickets" 
    icon={<Ticket />} 
    colorClass="from-pink-500 via-rose-600 to-rose-700" 
    screenshots={[IMAGES.tickets1, IMAGES.tickets2, IMAGES.tickets4]} 
    highlights={["Kanban Matrix", "Automated SMS", "L1-L4 Tech Flow"]}
  >
    <p>Advanced device intake and workflow management system. Repair OS pioneered the L1-L4 technician workflow model, ensuring the right hands touch the right devices.</p>
    <p className="mt-4 text-white/30 text-sm italic">Automate customer updates via SMS and maintain a surgical bench queue.</p>
  </FeatureSplitView>
);

const Inventory = () => (
  <FeatureSplitView 
    title="Inventory" 
    icon={<Package />} 
    colorClass="from-emerald-500 via-teal-600 to-teal-700" 
    screenshots={[IMAGES.inventory]} 
    highlights={["Vault Storage", "Low Stock Triggers", "Supplier Sync"]}
  >
    <p>The ultimate part repository. Manage thousands of SKUs with ease. Integration with major suppliers allows for real-time price monitoring and automated restock triggers.</p>
    <p className="mt-4 text-white/30 text-sm italic">Precision stock counting and warehouse-level encryption for mission-critical parts.</p>
  </FeatureSplitView>
);

const Payroll = () => (
  <FeatureSplitView 
    title="Payroll" 
    icon={<Coins />} 
    colorClass="from-green-500 via-emerald-600 to-emerald-800" 
    screenshots={[IMAGES.payroll1, IMAGES.payroll2, IMAGES.payroll3]} 
    highlights={["Tax Logic", "Commission Tracking", "Direct Deposit"]}
  >
    <p>Precision accounting for your technicians and staff. Calculate complex commission structures based on labor vs parts splits automatically.</p>
    <p className="mt-4 text-white/30 text-sm italic">GAAP-compliant reporting and direct CSV/PDF exports for your accounting suite.</p>
  </FeatureSplitView>
);

const POS = () => (
  <FeatureSplitView 
    title="Terminal POS" 
    icon={<ShoppingCart />} 
    colorClass="from-amber-400 via-orange-500 to-orange-600" 
    screenshots={[IMAGES.pos]} 
    highlights={["Split Pay", "Integrated Readers", "Offline Buffer"]}
  >
    <p>High-velocity retail environment terminal. Designed for zero-lag performance on the shop floor. Integrated split payments and thermal receipt generation.</p>
  </FeatureSplitView>
);

const Estimates = () => (
  <FeatureSplitView 
    title="Estimates" 
    icon={<FileText />} 
    colorClass="from-amber-500 via-orange-600 to-orange-800" 
    screenshots={[IMAGES.estimates]} 
    highlights={["Instant Quoting", "PDF Pipeline", "Approval Matrix"]}
  >
    <p>Professional quotes delivered in seconds. Convert estimates to active work orders with a single tap after customer approval.</p>
  </FeatureSplitView>
);

const BuyBack = () => (
  <FeatureSplitView 
    title="Buy Back" 
    icon={<DollarSign />} 
    colorClass="from-teal-500 via-cyan-600 to-cyan-800" 
    screenshots={[IMAGES.buyback1, IMAGES.buyback2]} 
    highlights={["Grading Algorithm", "Instant Offers", "Contract Automation"]}
  >
    <p>Scale your pre-owned inventory with surgical pricing. Pair market data with actual shop margins. Protect your business from over-valuing used tech.</p>
  </FeatureSplitView>
);

const Analytics = () => (
  <FeatureSplitView 
    title="Analytics" 
    icon={<BarChart3 />} 
    colorClass="from-emerald-400 via-cyan-500 to-blue-600" 
    screenshots={[IMAGES.analytics]} 
    highlights={["Profitability Maps", "Labor Efficiency", "Weekly Signals"]}
  >
    <p>Deep data insights for growth-focused shops. Identify your most profitable repair categories and technicians with a few clicks.</p>
  </FeatureSplitView>
);

const Personnel = () => (
  <FeatureSplitView 
    title="Personnel" 
    icon={<Users />} 
    colorClass="from-slate-500 via-indigo-700 to-indigo-900" 
    screenshots={[IMAGES.employeesMain, IMAGES.employeesLog]} 
    highlights={["Security Clearance", "Performance Logs", "Uptime Tracking"]}
  >
    <p>Manage your recruits from intake to retirement. Detailed performance logs ensure complete audit transparency for your shop manager.</p>
  </FeatureSplitView>
);

const Nexus = () => (
  <FeatureSplitView 
    title="Nexus Store" 
    icon={<Store />} 
    colorClass="from-cyan-500 via-blue-600 to-indigo-700" 
    screenshots={[IMAGES.nexus]} 
    highlights={["Module Hub", "One-Tap Install", "Verified Toolkits"]}
  >
    <p>The only App Store designed exclusively for repair shops. Expand your OS with powerful native modules built by the DaemonCore engineering team.</p>
  </FeatureSplitView>
);

const Guide = () => (
  <FeatureSplitView 
    title="RepairOS Guide" 
    icon={<Library />} 
    colorClass="from-blue-600 via-blue-800 to-blue-950" 
    screenshots={[IMAGES.guide]} 
    highlights={["SOP Database", "Tech Training", "Hardware Config"]}
  >
    <p>The master documentation for every Repair OS module. Features SOPs for everything from screen swaps to logic board rework.</p>
  </FeatureSplitView>
);

const DaemonAI = () => {
  const [msgs, setMsgs] = useState<ChatMessage[]>([{ role: 'ai', content: 'DAEMON ONLINE. State your directive, Administrator.' }]);
  const [inp, setInp] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSend = async () => {
    if (!inp.trim() || loading) return;
    const uMsg: ChatMessage = { role: 'user', content: inp };
    setMsgs(prev => [...prev, uMsg]);
    setInp('');
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const resp = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [...msgs, uMsg].map(m => ({ role: m.role === 'ai' ? 'model' : 'user', parts: [{ text: m.content }] })),
        config: { systemInstruction: `You are DAEMON AI. An elite, punchy, and concise system core. Never use fluff. Max 2 short sentences per response. Repair OS: Browser-based, no install, F11 for immersion. Includes 2 carrier unlock apps. Membership $199/mo. Support: ${SUPPORT_EMAIL}.` }
      });
      setMsgs(prev => [...prev, { role: 'ai', content: resp.text || "Neural link failure." }]);
    } catch (err) { 
      setMsgs(prev => [...prev, { role: 'ai', content: "Neural core timeout. Connection unstable." }]); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0e12] font-poppins">
      <div className="flex-1 p-8 overflow-y-auto space-y-6 text-sm">
        {msgs.map((m, i) => (
          <div key={i} className={`p-5 rounded-2xl max-w-2xl ${m.role === 'ai' ? 'bg-purple-600/10 border border-purple-500/20 text-white' : 'bg-white/5 border border-white/10 ml-auto text-white'}`}>
            <div className="text-[9px] font-black uppercase text-purple-400 mb-2 tracking-widest">{m.role}</div>
            <p className="font-medium">{m.content}</p>
          </div>
        ))}
        {loading && <div className="text-purple-400 text-[10px] font-black animate-pulse uppercase tracking-widest">Processing...</div>}
      </div>
      <div className="p-6 border-t border-white/5 flex gap-4">
        <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-purple-500/50" placeholder="Command DAEMON..." />
        <button onClick={handleSend} className="p-4 bg-purple-600 rounded-2xl text-white hover:bg-purple-500 transition-colors shadow-[0_0_20px_rgba(147,51,234,0.3)]">
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

/**
 * LIVE SUPPORT CHAT WIDGET
 */
const SupportAgentChat: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [msgs, setMsgs] = useState<ChatMessage[]>([{ role: 'ai', content: "Hi! I'm here to help. What's on your mind today?" }]);
  const [inp, setInp] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs]);

  const handleSend = async () => {
    if (!inp.trim() || loading) return;
    const uMsg: ChatMessage = { role: 'user', content: inp };
    setMsgs(prev => [...prev, uMsg]);
    setInp('');
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const resp = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...msgs, uMsg].map(m => ({ role: m.role === 'ai' ? 'model' : 'user', parts: [{ text: m.content }] })),
        config: { systemInstruction: `You are a friendly human support agent for Repair OS. Be extremely concise and personable. 1 short sentence per response is ideal. Sound like a real person, not a manual. Repair OS: Browser-only (no install), hit F11 for full mode. $199/mo flat. Includes carrier unlock apps. Direct people to ${SUPPORT_EMAIL} for tech help.` }
      });
      setMsgs(prev => [...prev, { role: 'ai', content: resp.text || "I apologize, I'm having trouble connecting." }]);
    } catch { 
      setMsgs(prev => [...prev, { role: 'ai', content: "My neural link is momentarily unstable. Please try again." }]); 
    } finally { 
      setLoading(false); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-8 w-[400px] h-[600px] glass rounded-[40px] border border-white/20 shadow-[0_50px_150px_rgba(0,0,0,0.9)] z-[200] flex flex-col overflow-hidden animate-in slide-in-from-bottom-20 fade-in duration-700">
      <div className="bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 p-8 flex items-center justify-between shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_70%)]"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-3xl bg-white/10 backdrop-blur-2xl flex items-center justify-center text-white border border-white/20 shadow-inner">
            <Headphones size={28} className="animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          <div>
            <div className="text-lg font-black text-white uppercase tracking-tighter leading-none mb-1">OS Support</div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_100px_rgba(52,211,153,0.8)]"></div>
              <span className="text-[11px] font-black text-white/70 uppercase tracking-widest">Live Specialist</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl text-white/60 hover:text-white transition-all relative z-10 border border-transparent hover:border-white/20">
          <X size={24} />
        </button>
      </div>
      
      <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-6 bg-[#080808] text-sm">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
            <div className={`p-6 rounded-[28px] max-w-[90%] shadow-xl leading-relaxed ${m.role === 'ai' ? 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none' : 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-blue-900/40 rounded-tr-none'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/5 p-5 rounded-[28px] rounded-tl-none animate-pulse flex gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-white/5 bg-[#0a0a0a] flex gap-3">
        <input 
          value={inp} 
          onChange={e => setInp(e.target.value)} 
          onKeyDown={e => e.key === 'Enter' && handleSend()} 
          placeholder="Command center query..." 
          className="flex-1 bg-white/5 border border-white/10 rounded-3xl px-6 py-4 text-white text-base outline-none focus:border-blue-500/50 transition-all focus:bg-white/[0.08]"
        />
        <button onClick={handleSend} className="w-14 h-14 bg-white text-black hover:bg-blue-500 hover:text-white rounded-3xl flex items-center justify-center transition-all shadow-xl active:scale-90 group border-b-4 border-gray-300 hover:border-blue-700">
          <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

// --- System Application Registry ---

const APPS: AppDefinition[] = [
  { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard />, color: 'from-blue-500 to-indigo-600', component: Dashboard },
  { id: 'tickets', name: 'Tickets', icon: <Ticket />, color: 'from-pink-500 to-rose-600', component: Tickets },
  { id: 'inventory', name: 'Inventory', icon: <Package />, color: 'from-emerald-500 to-teal-600', component: Inventory },
  { id: 'pos', name: 'Terminal POS', icon: <ShoppingCart />, color: 'from-amber-400 to-orange-500', component: POS },
  { id: 'payroll', name: 'Payroll', icon: <Coins />, color: 'from-green-500 to-emerald-700', component: Payroll },
  { id: 'marketing', name: 'Marketing', icon: <Megaphone />, color: 'from-indigo-500 to-purple-600', component: () => <FeatureSplitView title="Marketing" icon={<Megaphone />} colorClass="from-indigo-500 to-purple-600" screenshots={[IMAGES.emailBlaster]} highlights={["Automated Reviews", "SMS Campaigns", "Loyalty Hub"]}><p>Automate your business growth engine. Retention is the key to recurring revenue.</p></FeatureSplitView> },
  { id: 'analytics', name: 'Analytics', icon: <BarChart3 />, color: 'from-emerald-400 to-cyan-500', component: Analytics },
  { id: 'personnel', name: 'Personnel', icon: <Users />, color: 'from-slate-500 to-indigo-800', component: Personnel },
  { id: 'estimates', name: 'Estimates', icon: <FileText />, color: 'from-amber-500 to-orange-700', component: Estimates },
  { id: 'buyback', name: 'Buy Back', icon: <DollarSign />, color: 'from-teal-500 to-cyan-700', component: BuyBack },
  { id: 'wiki', name: 'Wiki', icon: <BookOpen />, color: 'from-slate-500 to-slate-800', component: () => <FeatureSplitView title="Wiki" icon={<BookOpen />} colorClass="from-slate-500 to-slate-800" screenshots={[IMAGES.nexus]} highlights={["Schematic Library", "SOP Storage", "Internal Training"]}><p>Knowledge is power. Centralize your shop intelligence and onboarding SOPs.</p></FeatureSplitView> },
  { id: 'guide', name: 'Guide', icon: <Library />, color: 'from-blue-600 to-blue-900', component: Guide },
  { id: 'suppliers', name: 'Suppliers', icon: <Truck />, color: 'from-rose-500 to-pink-600', component: () => <FeatureSplitView title="Suppliers" icon={<Truck />} colorClass="from-rose-500 to-pink-600" screenshots={[IMAGES.nexus]} highlights={["Global Hub", "Instant Orders", "Return Tracking"]}><p>Direct parts procurement pipeline integrated with top vendors.</p></FeatureSplitView> },
  { id: 'daemon', name: 'Daemon AI', icon: <Bot />, color: 'from-purple-500 to-fuchsia-600', component: DaemonAI },
  { id: 'nexus', name: 'Nexus', icon: <Store />, color: 'from-cyan-500 to-blue-600', component: Nexus },
  { id: 'settings', name: 'Setup', icon: <Settings />, color: 'from-gray-500 to-slate-600', component: () => <FeatureSplitView title="Setup" icon={<Settings />} colorClass="from-gray-500 to-slate-600" screenshots={[IMAGES.settings]} highlights={["Global Config", "User Management", "Theme Overrides"]}><p>Configure your shop environment settings and hardware drivers.</p></FeatureSplitView> },
];

/**
 * LANDING PAGE / SHOWCASE COMPONENT
 */
const ShowCase: React.FC<{ onLaunch: () => void }> = ({ onLaunch }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [claimSpotOpen, setClaimSpotOpen] = useState(false);
  const [stressTestOpen, setStressTestOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [exitIntentOpen, setExitIntentOpen] = useState(false);
  const [hasTriggeredExit, setHasTriggeredExit] = useState(false);
  const [lbImage, setLbImage] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !hasTriggeredExit) {
        setExitIntentOpen(true);
        setHasTriggeredExit(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasTriggeredExit]);

  const awards = [
    { icon: <Globe size={18} />, label: "FEATURED IN WIRED" },
    { icon: <Zap size={18} />, label: "MAXIMUM PC: KICK-ASS AWARD" },
    { icon: <MonitorCheck size={18} />, label: "PCWORLD: EDITOR'S CHOICE" },
    { icon: <ShieldCheck size={18} />, label: "ISO 27001 ENCRYPTED VAULT" },
    { icon: <Trophy size={18} />, label: "THE VERGE: INNOVATION '25" },
    { icon: <Activity size={18} />, label: "TECHCRUNCH: SYSTEM OF THE YEAR" },
    { icon: <Scale size={18} />, label: "NIST 800-53 COMPLIANT" },
    { icon: <Power size={18} />, label: "CNET: BEST OF SHOW REPAIR" }
  ];

  const featureIndex: FeatureItem[] = [
    { t: "Omnichannel Ticketing", d: "Unified sync across bench, floor, and field terminals." },
    { t: "Real-time Vault", d: "Precision stock level monitoring with serial tracking." },
    { t: "Terminal POS", d: "Integrated high-speed checkout with local buffer support." },
    { t: "Carrier Unlock Suite", d: "Proprietary L1-L4 firmware and bypass network tools." },
    { t: "L1-L4 Tech Flow", d: "Surgical technician workflow matrix with skill routing." },
    { t: "Review Collection", d: "Automated reputation management and feedback engine." },
    { t: "AI Follow-up SMS", d: "Autonomous retention messaging via neural core logic." },
    { t: "Commission Core", d: "Live technician performance tracking and labor splits." },
    { t: "Bulk Intake Suite", d: "High-volume device processing for fleet accounts." },
    { t: "Dynamic Quote Gen", d: "Instant PDF estimate delivery with custom branding." },
    { t: "Shop Credit Engine", d: "Internal trade-in valuation and gift card logic." },
    { t: "Multi-Location Sync", d: "Centralized data management for multi-store empires." },
    { t: "Pentester Suite", d: "Hardware security and logic board auditing protocols." },
    { t: "Shop Wiki & SOP", d: "Centralized internal knowledge base and tech training." },
    { t: "Parts Return Pipeline", d: "Seamless supplier defect tracking and automated RMAs." },
    { t: "P&L Analytics", d: "Deep financial health telemetry and margin reporting." },
    { t: "Personnel Logs", d: "Full employee audit transparency and terminal clocking." },
    { t: "Nexus App Store", d: "Instant native module deployment for custom workflows." },
    { t: "256-bit Crypto", d: "Military grade encryption for customer and shop data." },
    { t: "Zero-Latency Stream", d: "WASM-based browser performance for desktop speeds." },
    { t: "Approval Portal", d: "Remote customer approval gateway for service costs." },
    { t: "Digital Contracts", d: "Paperless signature workflows for legal protections." },
    { t: "Repair AI Estimator", d: "Duration & pricing neural logic based market data." },
    { t: "Low Stock Alerts", d: "Predictive triggers for proactive parts procurement." },
    { t: "Parts Audit Engine", d: "Cycle counting and inventory discrepancy logging." },
    { t: "Supplier Sync", d: "Direct API ordering from verified global vendors." },
    { t: "Staff Ranking", d: "Gamified efficiency logs for tech team motivation." },
    { t: "Internal Chat", d: "Encrypted bench-to-bench communication with files." },
    { t: "Campaign Blaster", d: "AI-driven promo marketing for seasonal repair specials." },
    { t: "Wholesale Manager", d: "Corporate account pricing matrix and dedicated portals." },
    { t: "Driver Vault", d: "Central repository for specialized bench software tools." },
    { t: "Kiosk Mode", d: "Customer self-service terminals for automated intake." },
    { t: "Barcode Engine", d: "Custom SKU and Ticket label generation and scanning." },
    { t: "Custom Domain Mapping", d: "White-labeled portals hosted on your company URL." },
    { t: "2FA Protection", d: "Mandatory multi-factor authentication for admin roles." },
    { t: "Automated Tax Calc", d: "Region-specific tax logic for diverse jurisdictions." },
    { t: "Gift Card Pipeline", d: "Issue and redeem branded gift cards at the terminal." },
    { t: "ZPL Label Support", d: "Direct thermal printing for industry-standard labels." },
    { t: "IMEI Blacklist Check", d: "GSMA blacklist verification integrated for buybacks." },
    { t: "Revenue Heatmaps", d: "Visual volume mapping across shop operational hours." }
  ];

  return (
    <div className="w-full bg-[#050505] text-white selection:bg-blue-500/30 overflow-y-auto h-screen scroll-smooth font-poppins relative">
      {/* Dynamic Flair Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/30 blur-[150px] rounded-full animate-pulse"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/30 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      </div>

      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-black/60 backdrop-blur-3xl px-8 md:px-16 py-8 flex items-center justify-between transition-all duration-500">
        <div className="flex flex-col group cursor-pointer">
          <span className="text-4xl font-black tracking-tighter uppercase leading-none text-white drop-shadow-[0_0_15px_rgba(37,99,235,0.6)] group-hover:scale-105 transition-transform">REPAIR<span className="text-blue-500">OS</span></span>
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-blue-400/60 mt-1">DAEMONCORE® SYSTEMS</span>
        </div>
        <div className="hidden lg:flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.4em] text-white/50">
          <a href="#everything" className="hover:text-blue-400 hover:tracking-[0.5em] transition-all">Membership</a>
          <a href="#hijack" className="hover:text-blue-400 hover:tracking-[0.5em] transition-all">The Hijack</a>
          <a href="#unlock" className="hover:text-indigo-400 hover:tracking-[0.5em] transition-all">Proprietary</a>
          <a href="#nexus" className="hover:text-cyan-400 hover:tracking-[0.5em] transition-all">Nexus Store</a>
          <a href="#pricing" className="hover:text-white hover:tracking-[0.5em] transition-all">Pricing</a>
        </div>
        <button onClick={onLaunch} className="bg-white text-black px-12 py-4 rounded-[20px] text-[12px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-[0_15px_35px_rgba(255,255,255,0.1)] active:scale-95 border-b-4 border-gray-300 hover:border-blue-700">LAUNCH SYSTEM DEMO</button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-10 text-center pt-48 pb-60 overflow-hidden">
        <div className="relative z-10 animate-in fade-in slide-in-from-bottom-20 duration-1000 w-full max-w-7xl">
          <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full glass border border-blue-500/20 text-blue-400 text-[11px] font-black uppercase tracking-[0.4em] mb-12 shadow-[0_0_20px_rgba(59,130,246,0.2)] mx-auto">
            <ShieldCheck size={14} className="text-blue-500" /> SYSTEM STATUS: NODE 912/1000 - EARLY ACCESS PHASE
          </div>
          
          <div className="flex flex-col items-center mb-24 space-y-4">
            <h1 className="text-[8rem] md:text-[14rem] font-black leading-[0.7] tracking-tighter uppercase drop-shadow-[0_0_120px_rgba(37,99,235,0.5)]">
              REPAIR<span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 animate-gradient-x">OS</span>
            </h1>
            <div className="text-[14px] md:text-[18px] font-black tracking-[1.5em] text-white/20 uppercase mt-12 flex items-center gap-10">
              <div className="h-0.5 w-24 bg-gradient-to-r from-transparent to-white/20"></div>
              DAEMONCORE® ALPHA
              <div className="h-0.5 w-24 bg-gradient-to-l from-transparent to-white/20"></div>
            </div>
          </div>

          <h2 className="text-4xl md:text-7xl font-black mb-24 max-w-7xl mx-auto leading-[0.95] uppercase tracking-tighter text-white/95">
            THE WORLD'S ONLY <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">COMPLETE OPERATING SYSTEM</span> <br/>
            FOR THE REPAIR INDUSTRY.
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="flex flex-col items-center lg:items-end gap-12">
               <button onClick={onLaunch} className="w-full max-w-lg bg-blue-600 hover:bg-blue-500 text-white px-10 py-12 rounded-[50px] font-black text-4xl transition-all flex items-center justify-center gap-8 uppercase group shadow-[0_30px_70px_rgba(37,99,235,0.5)] active:scale-95 border-t-2 border-white/20">
                LAUNCH <ArrowRight className="group-hover:translate-x-5 transition-transform" size={40} />
              </button>
              <div className="flex flex-col gap-4 w-full max-w-lg">
                <button onClick={() => setHowItWorksOpen(true)} className="glass text-white px-10 py-6 rounded-[50px] font-black text-xl transition-all flex items-center justify-center gap-6 uppercase group hover:bg-white/10 active:scale-95 border border-white/10">
                  HOW IT WORKS <Globe className="group-hover:rotate-180 transition-transform duration-1000" size={28} />
                </button>
                <button onClick={() => setStressTestOpen(true)} className="bg-white/[0.05] hover:bg-white/[0.1] text-blue-400 px-10 py-4 rounded-[50px] font-black text-sm transition-all flex items-center justify-center gap-4 uppercase border border-blue-500/20 shadow-2xl active:scale-95">
                  <Scan size={18} /> HARDWARE STRESS TEST
                </button>
              </div>
            </div>
            
            {/* PC Mockup Section */}
            <div className="relative group perspective-1000 hidden md:block">
               <div className="absolute -inset-10 bg-blue-600/10 blur-[100px] rounded-full animate-pulse"></div>
               <div className="relative rounded-[40px] p-2 bg-gradient-to-br from-white/10 via-transparent to-white/10 border border-white/20 overflow-hidden shadow-[0_60px_100px_rgba(0,0,0,0.8)] transition-all duration-700 group-hover:rotate-y-6">
                  <div className="relative aspect-video rounded-[32px] overflow-hidden bg-black border border-white/10">
                    <img src={IMAGES.heroScreen} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000" alt="Repair OS Desktop Preview" />
                    <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-transparent transition-all"></div>
                  </div>
               </div>
               {/* PC Stand Hook */}
               <div className="w-40 h-8 bg-white/5 mx-auto rounded-b-[20px] border-x border-b border-white/10"></div>
               <div className="w-64 h-2 bg-white/10 mx-auto rounded-full blur-sm"></div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-6xl mx-auto">
            {awards.map((award, idx) => (
              <div key={idx} className="flex items-center gap-4 px-6 py-4 glass rounded-[20px] border border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white hover:border-blue-500/50 hover:scale-[1.03] transition-all cursor-default shadow-xl group">
                <div className="text-blue-500/50 group-hover:text-blue-500 transition-colors drop-shadow-[0_0_10px_rgba(37,99,235,0.4)]">{award.icon}</div>
                {award.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware Hijack Section */}
      <section id="hijack" className="py-60 bg-black relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-8 shadow-2xl">
                <MonitorSmartphone size={14} /> TOTAL SYSTEM OVERRIDE
              </div>
              <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 leading-[0.85]">THE <br/><span className="text-blue-500">HARDWARE HIJACK.</span></h3>
              <p className="text-2xl text-white/40 font-medium mb-12 uppercase tracking-tighter leading-tight">
                Stop treating your bench like a web-browser tab. <span className="text-white italic">Repair OS seizes your hardware's full potential.</span>
              </p>
              <div className="space-y-12">
                 <div className="group">
                    <h4 className="text-xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-4">
                       <Zap className="text-blue-500" /> NATIVE PIXEL DENSITY
                    </h4>
                    <p className="text-white/30 text-sm font-bold uppercase tracking-widest leading-relaxed">
                       This isn't a website. It's a high-fidelity desktop environment. Every pixel is calculated by our native kernel, utilizing WebGL and WASM for hardware-accelerated performance.
                    </p>
                 </div>
                 <div className="group">
                    <h4 className="text-xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-4">
                       <Command className="text-indigo-500" /> BEYOND THE BROWSER
                    </h4>
                    <p className="text-white/30 text-sm font-bold uppercase tracking-widest leading-relaxed">
                       Press F11 and watch your generic OS vanish. Repair OS replaces your desktop, creating an airtight, immersive cockpit where distractions are terminated and surgery begins.
                    </p>
                 </div>
              </div>
            </div>
            <div className="relative group perspective-1000">
               <div className="absolute -inset-20 bg-blue-600/20 blur-[150px] rounded-full animate-pulse"></div>
               <div className="relative rounded-[60px] p-2 bg-gradient-to-br from-white/10 via-transparent to-white/10 border border-white/20 overflow-hidden shadow-[0_60px_100px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:rotate-y-6">
                  <div className="absolute inset-0 bg-[url('https://hlelnadzajmnxryzteww.supabase.co/storage/v1/object/public/RepairOS/desktopROS.png')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000"></div>
                  <div className="relative h-[500px] flex items-center justify-center bg-black/60 backdrop-blur-sm group-hover:backdrop-blur-none transition-all duration-700">
                     <div className="flex flex-col items-center">
                        <Monitor size={120} className="text-white/20 mb-8 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-500" />
                        <span className="text-[12px] font-black uppercase tracking-[0.8em] text-white/40 group-hover:text-white transition-colors">FULL COCKPIT IMMERSION</span>
                     </div>
                  </div>
               </div>
               <div className="absolute -bottom-10 -right-10 glass p-8 rounded-[32px] border-blue-500/40 animate-bounce" style={{ animationDuration: '4s' }}>
                  <div className="text-3xl font-black text-white">F11</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-blue-400">HIJACK ACTIVE</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profit Leak Diagnostic Section */}
      <section id="diagnostic" className="py-60 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.05),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-10">
          <ProfitLeakDiagnostic />
        </div>
      </section>

      {/* Migration Visualizer */}
      <MigrationVisualizer />

      {/* Floating Chat Widget */}
      <div className="fixed bottom-12 right-12 z-[500] flex flex-col items-end gap-6">
        {!chatOpen && (
          <button 
            onClick={() => setChatOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center text-white shadow-[0_15px_45px_rgba(37,99,235,0.5)] hover:scale-110 active:scale-90 transition-all border border-white/20 group relative overflow-visible"
          >
            <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 rounded-full border-2 border-[#050505] flex items-center justify-center text-[10px] font-black shadow-lg z-10 animate-pulse">1</div>
            <MessageCircle size={30} className="group-hover:rotate-12 transition-transform drop-shadow-md" />
          </button>
        )}
        <SupportAgentChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </div>

      <ClaimSpotModal isOpen={claimSpotOpen} onClose={() => setClaimSpotOpen(false)} />
      <HowItWorksModal isOpen={howItWorksOpen} onClose={() => setHowItWorksOpen(false)} />
      <StressTestModal isOpen={stressTestOpen} onClose={() => setStressTestOpen(false)} />
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <ExitIntentModal isOpen={exitIntentOpen} onClose={() => setExitIntentOpen(false)} />

      {/* Membership Section */}
      <section id="everything" className="py-60 bg-white/[0.01] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-10 grid lg:grid-cols-2 gap-40 items-center">
           <div className="relative z-20 col-span-1 animate-in slide-in-from-left-20 duration-1000">
              <h3 className="text-7xl md:text-9xl font-black uppercase mb-12 leading-[0.85] tracking-tighter">THE <br/><span className="text-blue-500 drop-shadow-[0_0_30px_rgba(37,99,235,0.4)]">ALL-IN</span> PASS.</h3>
              <p className="text-2xl text-white/40 font-medium mb-16 max-w-lg leading-relaxed uppercase tracking-tighter">Infinite growth. Zero compromises. One flat-line cost for the elite workshop owner.</p>
              <div className="space-y-6 max-w-lg">
                 {[
                   { t: "30+ Proprietary Modules", i: <Layers className="text-blue-400" />, d: "Full-stack repair ecosystem built on custom native kernels." },
                   { t: "100% Browser Architecture", i: <Globe className="text-indigo-400" />, d: "Zero installation. Accessible globally. F11 for full desktop immersion." },
                   { t: "No-Limit Expansion", i: <Infinity className="text-emerald-400" />, d: "Unlimited technicians. Unlimited devices. Unlimited profit potential." }
                 ].map((item, idx) => (
                   <div key={idx} className="flex items-start gap-8 p-8 glass rounded-[40px] border border-white/5 group hover:border-blue-500/50 hover:bg-white/[0.02] transition-all shadow-2xl">
                      <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner border border-white/10">{item.i}</div>
                      <div>
                        <span className="text-xl font-black uppercase tracking-tighter group-hover:text-white transition-colors block mb-2">{item.t}</span>
                        <p className="text-xs text-white/30 font-bold uppercase tracking-widest">{item.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           <div className="flex flex-col gap-12 relative z-10 col-span-1 justify-self-end w-full group">
              <div className="relative cursor-pointer w-full transition-transform duration-700 group-hover:scale-[1.03]" onClick={() => setLbImage(IMAGES.desktopNew)}>
                 <div className="absolute -inset-20 bg-blue-600/10 blur-[180px] rounded-full animate-pulse"></div>
                 <div className="relative rounded-[60px] p-1 bg-gradient-to-br from-blue-500/40 via-purple-600/20 to-transparent overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.9)] border border-white/10">
                   <img src={IMAGES.desktopNew} className="relative rounded-[59px] w-full h-auto opacity-80 group-hover:opacity-100 transition-all duration-1000 grayscale group-hover:grayscale-0" alt="Repair OS Desktop Environment" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                 </div>
                 <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between">
                    <div className="bg-blue-600 text-white text-[11px] font-black uppercase px-8 py-3 rounded-2xl tracking-[0.2em] backdrop-blur-xl border border-white/20 shadow-2xl">BEYOND SOFTWARE</div>
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                       <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                       <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Proprietary Section */}
      <section id="unlock" className="py-60 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-10 grid lg:grid-cols-2 gap-32 items-center">
           <div className="relative group cursor-pointer animate-in fade-in zoom-in duration-1000" onClick={() => setLbImage(IMAGES.unlockSoftware)}>
              <div className="absolute -inset-32 bg-indigo-600/15 blur-[200px] rounded-full"></div>
              <div className="relative rounded-[72px] p-1 bg-gradient-to-br from-indigo-500/50 via-blue-400/20 to-transparent border border-white/10 overflow-hidden">
                <img src={IMAGES.unlockSoftware} className="relative rounded-[71px] shadow-[0_0_150px_rgba(0,0,0,0.95)] group-hover:scale-[1.05] transition-all duration-1000" alt="Proprietary Tech" />
              </div>
              <div className="absolute -top-10 -right-10 bg-indigo-600 text-white text-[12px] font-black uppercase px-10 py-4 rounded-[30px] tracking-[0.4em] animate-pulse border border-indigo-400/40 shadow-[0_0_40px_rgba(79,70,229,0.7)] rotate-6">EXCLUSIVE SUITE</div>
           </div>
           <div>
              <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-400 text-[11px] font-black uppercase tracking-[0.5em] mb-12 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                 <LockKeyhole size={18} className="text-indigo-400" /> PROPRIETARY CORE
              </div>
              <h3 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-12 leading-[0.8] text-white">THE <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]">UNLOCK EDGE.</span></h3>
              <p className="text-3xl text-white/40 font-light leading-tight mb-16 italic tracking-tighter">"We don't just manage your shop. We give you the keys to the kingdom with software nobody else possesses."</p>
              <div className="grid grid-cols-1 gap-10">
                 <div className="glass p-12 rounded-[56px] border border-white/10 group hover:border-indigo-500/50 hover:bg-indigo-600/[0.03] transition-all shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-[60px] rounded-full"></div>
                    <h4 className="text-3xl font-black uppercase tracking-tighter mb-6 text-indigo-100 flex items-center gap-4"><Zap className="text-indigo-400" /> DUAL UNLOCK MODULES</h4>
                    <p className="text-white/40 leading-relaxed font-bold text-lg uppercase tracking-tight">Access 2 dedicated carrier-bypass applications built exclusively into Repair OS. Global network unlocking and firmware auditing protocols available nowhere else.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Legacy Comparison */}
      <section id="comparison" className="bg-white/[0.01] border-y border-white/5 relative">
        <LegacyComparison />
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-60 bg-[#020202] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(37,99,235,0.1),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-10 relative z-10">
          <div className="mb-32">
            <div className="flex items-baseline gap-4 mb-8">
              <h2 className="text-[10rem] md:text-[18rem] font-black leading-none tracking-tighter text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]">$199</h2>
              <span className="text-6xl text-white/30 font-black tracking-tighter">/MO</span>
            </div>
            <p className="text-4xl font-black text-white tracking-tighter uppercase leading-none mb-4">UNLIMITED TECHS. ALL APPS. ZERO COMPROMISE.</p>
            <p className="text-2xl font-black uppercase tracking-[0.3em] text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">NO PER-TECHNICIAN FEES. WE SCALE WITH YOU.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-40">
            <div className="glass p-16 rounded-[64px] border border-white/10 bg-white/[0.01] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 group-hover:w-4 transition-all"></div>
              <h3 className="text-2xl font-black uppercase tracking-widest mb-12 inline-block border-b-8 border-blue-500 pb-4">CORE POLICIES:</h3>
              <ul className="space-y-8">
                {[
                  "Proprietary Carrier Unlocking Software",
                  "Elite Level L1-L4 Workflows",
                  "24/7 Mission-Critical Support",
                  "Weekly Kernel & Module Updates",
                  "Encrypted High-Volume Data Vault"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-6 text-white/90 font-black uppercase text-[12px] tracking-[0.2em] group">
                    <Check size={24} className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)] group-hover:scale-125 transition-transform" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass p-16 rounded-[64px] border border-white/10 bg-white/[0.01] flex flex-col justify-between shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-2 h-full bg-indigo-600 group-hover:w-4 transition-all"></div>
              <div>
                <h3 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-[0.85] text-white">UPGRADE <br/><span className="text-indigo-400">EVERYTHING.</span></h3>
                <p className="text-white/40 text-xl leading-relaxed font-bold uppercase tracking-tight">Stop using fragmented tools. Enter the world of Repair OS today.</p>
              </div>
              <a href={LEMON_SQUEEZY_LINK} target="_blank" className="block w-full bg-white text-black py-10 rounded-[30px] font-black uppercase text-xl tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl text-center mt-16 border-b-8 border-gray-300 hover:border-blue-700 active:scale-95">
                START FREE TRIAL
              </a>
            </div>
          </div>

          <div className="mb-60">
             <h3 className="text-4xl font-black uppercase tracking-[0.3em] mb-20 text-center text-white/10 border-y border-white/5 py-12">THE SYSTEM INDEX</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {featureIndex.map((feat, i) => (
                  <div key={i} className="flex flex-col gap-4 p-10 glass rounded-[40px] border border-white/5 hover:border-blue-500/50 hover:bg-white/[0.03] transition-all group shadow-2xl">
                     <span className="text-[12px] font-black uppercase text-blue-500 tracking-widest flex items-center gap-4 group-hover:text-blue-300 transition-colors">
                        <Check size={18} className="text-emerald-400" /> {feat.t}
                     </span>
                     <p className="text-[11px] text-white/20 font-bold uppercase tracking-widest leading-relaxed">{feat.d}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-black border-t border-white/10 pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-[0_0_30px_rgba(37,99,235,0.4)]">R</div>
                  <span className="text-3xl font-black tracking-tighter uppercase leading-none text-white">REPAIR<span className="text-blue-500">OS</span></span>
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 mt-6 leading-relaxed">
                  {PATENT_NOTICE} <br/> DAEMONCORE® ALPHA SYSTEMS
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.5em] mb-4">SYSTEM ACCESS</h4>
              <nav className="flex flex-col gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-white/40">
                <a href="#everything" className="hover:text-blue-400 transition-colors">OS Membership</a>
                <a href="#hijack" className="hover:text-blue-400 transition-colors">Hardware Hijack</a>
                <a href="#unlock" className="hover:text-blue-400 transition-colors">Proprietary Core</a>
                <a href="#nexus" className="hover:text-blue-400 transition-colors">Nexus Ecosystem</a>
              </nav>
            </div>

            <div className="flex flex-col gap-8">
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.5em] mb-4">LEGAL PROTOCOL</h4>
              <nav className="flex flex-col gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-white/40">
                <button onClick={() => setPrivacyOpen(true)} className="text-left hover:text-blue-400 transition-colors">Privacy Framework</button>
                <a href={LEGAL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Terms of Engagement</a>
                <a href="#comparison" className="hover:text-blue-400 transition-colors">Benchmark Audit</a>
              </nav>
            </div>

            <div className="flex flex-col gap-8">
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.5em] mb-4">COMMAND SUPPORT</h4>
              <div className="flex flex-col gap-6">
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[11px] font-black text-blue-400 uppercase tracking-[0.3em] hover:text-white transition-colors flex items-center gap-3">
                  <Mail size={16} /> {SUPPORT_EMAIL}
                </a>
                <div className="pt-8 border-t border-white/5">
                   <div className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em]">© 2023 ALL RIGHTS RESERVED</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-20 border-t border-white/5 gap-10">
             <div className="flex gap-10">
                <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-white/5"></div>
                <div className="w-3 h-3 rounded-full bg-white/5"></div>
             </div>
             <div className="text-[9px] font-black text-white/5 uppercase tracking-[1em]">SYSTEM STABLE // NO ERRORS DETECTED</div>
          </div>
        </div>
      </footer>
      
      {lbImage && <Lightbox src={lbImage} onClose={() => setLbImage(null)} />}
    </div>
  );
};

/**
 * Virtual Desktop Environment
 */
const VirtualDesktop: React.FC<{ 
  windows: WindowState[]; 
  positions: IconPos[]; 
  currentTime: Date;
  nextZ: number;
  showImmersiveModal: boolean;
  onOpenApp: (id: string) => void;
  onCloseWindow: (id: string) => void;
  onMinWindow: (id: string) => void;
  onFocusWindow: (id: string) => void;
  onDragIcon: (id: string, col: number, row: number) => void;
  onTerminate: () => void;
  onDismissModal: () => void;
}> = (props) => {
  return (
    <div className="h-screen w-screen relative overflow-hidden bg-[#050505] font-poppins">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-black to-purple-950/40"></div>
      
      {props.showImmersiveModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-3xl animate-in fade-in duration-700 p-6">
           <div className="max-w-2xl w-full glass p-16 rounded-[64px] border border-white/20 shadow-[0_0_150px_rgba(59,130,246,0.3)] flex flex-col items-center text-center animate-in zoom-in slide-in-from-bottom-20 duration-1000">
              <div className="w-32 h-32 rounded-[48px] bg-blue-600 flex items-center justify-center mb-12 shadow-[0_0_60px_rgba(37,99,235,0.6)] border border-blue-400/30"><Monitor size={64} className="text-white" /></div>
              <h3 className="text-5xl font-black text-white uppercase tracking-tighter mb-8 leading-none">NATIVE DESKTOP<br/><span className="text-blue-400">ENGAGED</span></h3>
              <p className="text-2xl text-white/40 font-light leading-relaxed mb-12 uppercase tracking-tighter">Enter <span className="text-white font-black italic">Immersive Mode</span> to replace your local windows environment.</p>
              <div className="flex flex-col items-center gap-6 mb-16">
                 <div className="bg-white text-black px-16 py-8 rounded-[40px] font-black text-7xl shadow-2xl border-b-[12px] border-gray-300">F11</div>
                 <p className="text-[14px] font-black uppercase tracking-[0.8em] text-blue-500 mt-6 animate-pulse">COMMAND FULL PIXEL DENSITY</p>
              </div>
              <button onClick={props.onDismissModal} className="w-full bg-white text-black py-8 rounded-[40px] font-black uppercase text-2xl tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95 border-b-8 border-gray-300 hover:border-blue-700">ENGAGE SYSTEM</button>
           </div>
        </div>
      )}

      <div className="absolute top-16 right-16 z-10 text-right select-none opacity-90 pointer-events-none drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <div className="text-[140px] md:text-[200px] font-black leading-none tracking-tighter text-white uppercase tabular-nums">{props.currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</div>
        <div className="text-2xl font-black tracking-[0.8em] text-white/40 uppercase mt-4 mb-10">{props.currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</div>
      </div>

      <div className="absolute inset-0 z-10">
        {props.positions.map(p => {
          const app = APPS.find(a => a.id === p.id);
          return app && (
            <DesktopIcon 
              key={p.id} app={app} pos={p} 
              onDragEnd={props.onDragIcon} 
              onClick={() => props.onOpenApp(p.id)} 
            />
          );
        })}
      </div>

      <div className="absolute bottom-12 right-12 z-[500]">
        <button onClick={props.onTerminate} className="flex flex-col items-center gap-4 group transition-all">
          <div className="w-20 h-20 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-3xl flex items-center justify-center border border-red-500/30 shadow-2xl transition-all group-hover:scale-110 active:scale-90">
            <Power size={36} />
          </div>
          <span className="text-[11px] font-black text-white/30 uppercase tracking-[0.5em] group-hover:text-red-400 transition-colors">Terminate OS</span>
        </button>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        {props.windows.map(w => {
          const app = APPS.find(a => a.id === w.id);
          if (!app) return null;
          return (
            <div key={w.id} className="pointer-events-auto h-full w-full">
              <Window window={w} app={app} onClose={() => props.onCloseWindow(w.id)} onMinimize={() => props.onMinWindow(w.id)} onFocus={() => props.onFocusWindow(w.id)}>
                <app.component onClose={() => props.onCloseWindow(w.id)} />
              </Window>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[500]">
        <div className="glass px-6 py-4 rounded-[40px] flex items-center gap-4 border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.95)]">
          {APPS.map(app => (
            <button key={app.id} onClick={() => props.onOpenApp(app.id)} className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all relative group ${props.windows.some(w => w.id === app.id) ? 'bg-white/20 text-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'text-white/40 hover:bg-white/10 hover:text-white hover:scale-105'}`}>
              <div className="shrink-0">{React.cloneElement(app.icon as any, { size: 28 })}</div>
              {props.windows.some(w => w.id === app.id) && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_12px_rgba(59,130,246,1)]"></div>}
            </button>
          ))}
          <div className="w-px h-10 bg-white/15 mx-2"></div>
          <button onClick={props.onTerminate} className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-[0_0_25px_rgba(37,99,235,0.5)] hover:bg-blue-500 transition-all hover:scale-110 active:scale-95 border border-white/20">
            <LayoutDashboard size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Entry ---

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
  }, [viewMode, positions.length]);

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
      const app = APPS.find(a => a.id === id);
      return [...prev, { id, title: app?.name || id, isOpen: true, isMinimized: false, zIndex: nextZ, icon: app?.icon || <Package /> }];
    });
    setNextZ(z => z + 1);
  };

  const closeWindow = (id: string) => setWindows(prev => prev.filter(w => w.id !== id));
  const minWindow = (id: string) => setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: nextZ } : w));
    setNextZ(z => z + 1);
  };

  const dragIcon = (id: string, col: number, row: number) => {
    setPositions(v => v.map(o => o.id === id ? { ...o, col, row } : o));
  };

  if (isBooting) return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center font-poppins relative overflow-hidden text-white">
      <div className="relative">
        <div className="absolute -inset-20 bg-blue-500/20 blur-[100px] rounded-full animate-pulse"></div>
        <Cpu className="text-blue-500 animate-spin mb-10 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)] relative z-10" size={80} />
      </div>
      <span className="text-sm tracking-[0.8em] font-black uppercase animate-pulse text-white/50">INITIALIZING REPAIR OS CORE...</span>
      <div className="w-80 h-1.5 bg-white/5 rounded-full mt-10 overflow-hidden border border-white/5 relative">
        <div className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 animate-[load_2s_ease-in-out]"></div>
      </div>
      <style>{`@keyframes load { 0% { width: 0%; } 100% { width: 100%; } }`}</style>
    </div>
  );

  return viewMode === 'showcase' ? (
    <ShowCase onLaunch={launch} />
  ) : (
    <VirtualDesktop 
      windows={windows} 
      positions={positions} 
      currentTime={currentTime}
      nextZ={nextZ}
      showImmersiveModal={showImmersiveModal}
      onOpenApp={openApp}
      onCloseWindow={closeWindow}
      onMinWindow={minWindow}
      onFocusWindow={focusWindow}
      onDragIcon={dragIcon}
      onTerminate={() => setViewMode('showcase')}
      onDismissModal={() => setShowImmersiveModal(false)}
    />
  );
};

export default App;