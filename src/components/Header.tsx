import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  Globe, 
  UserCheck, 
  LayoutDashboard, 
  Bot, 
  Search, 
  FileCheck2, 
  CheckCircle2, 
  BarChart3,
  Award,
  Sparkles,
  FileText
} from 'lucide-react';
import { ActiveTab, UserRole, Language } from '../types/index.ts';
import { useToast } from '../context/ToastContext.tsx';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  lang,
  setLang
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { showToast } = useToast();

  const navItems: { id: ActiveTab; labelEn: string; labelHi: string; labelTa: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', labelEn: 'Dashboard', labelHi: 'डैशबोर्ड', labelTa: 'முகப்பு', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'assistant', labelEn: 'AI Assistant', labelHi: 'एआई सहायक', labelTa: 'AI உதவியாளர்', icon: <Bot className="w-4 h-4" /> },
    { id: 'summarizer', labelEn: 'PDF Summarizer', labelHi: 'PDF संक्षेपक', labelTa: 'PDF சுருக்கி', icon: <FileText className="w-4 h-4" /> },
    { id: 'standards', labelEn: 'Standards Search', labelHi: 'मानक खोजें', labelTa: 'தரநிலைகள்', icon: <Search className="w-4 h-4" /> },
    { id: 'certification', labelEn: 'Certification Guide', labelHi: 'प्रमाणन मार्गदर्शिका', labelTa: 'சான்றிதழ் வழிகாட்டி', icon: <FileCheck2 className="w-4 h-4" /> },
    { id: 'verify', labelEn: 'Verify ISI', labelHi: 'ISI सत्यापन', labelTa: 'ISI சரிபார்ப்பு', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'analytics', labelEn: 'Analytics', labelHi: 'एनालिटिक्स', labelTa: 'புள்ளிவிவரங்கள்', icon: <BarChart3 className="w-4 h-4" /> }
  ];

  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    const roleLabels = {
      manufacturer: 'Manufacturer & Industry compliance view active',
      consumer: 'Consumer Protection & Verification view active',
      officer: 'BIS Officer & Auditor intelligence view active'
    };
    showToast(roleLabels[newRole], 'info');
  };

  const handleLangToggle = (nextLang: Language) => {
    setLang(nextLang);
    const labels = {
      en: 'Switched language to English',
      hi: 'भाषा बदलकर हिन्दी कर दी गई है',
      ta: 'மொழி தமிழுக்கு மாற்றப்பட்டது'
    };
    showToast(labels[nextLang], 'info');
  };

  const getLabel = (item: { labelEn: string; labelHi: string; labelTa: string }) => {
    if (lang === 'ta') return item.labelTa;
    if (lang === 'hi') return item.labelHi;
    return item.labelEn;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Gov / SIH Strip */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white text-xs py-1.5 px-4 sm:px-6 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-bold text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full text-[11px] border border-amber-400/30 shadow-2xs">
              <Award className="w-3.5 h-3.5 text-amber-400" /> SIH 2026: PS-SIH26107
            </span>
            <span className="text-slate-300 hidden sm:inline text-[11px] tracking-wide font-medium">
              Ministry of Consumer Affairs, Food & Public Distribution | Government of India
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-xs">
            {/* Role Switcher Pill */}
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/15 text-[11px]">
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300 hidden md:inline font-medium">Role:</span>
              <select
                aria-label="User Role"
                value={userRole}
                onChange={(e) => handleRoleChange(e.target.value as UserRole)}
                className="bg-transparent text-white font-semibold focus:outline-hidden cursor-pointer"
              >
                <option value="manufacturer" className="text-slate-900">🏭 Manufacturer / Industry</option>
                <option value="consumer" className="text-slate-900">🛍️ Consumer / Citizen</option>
                <option value="officer" className="text-slate-900">🏛️ BIS Officer / Auditor</option>
              </select>
            </div>

            {/* Trilingual Switcher (EN, HI, TA) */}
            <div className="flex items-center bg-white/10 backdrop-blur-sm p-0.5 rounded-full border border-white/15 text-[11px]">
              <button
                onClick={() => handleLangToggle('en')}
                className={`px-2 py-0.5 rounded-full font-bold transition cursor-pointer ${
                  lang === 'en' ? 'bg-amber-400 text-blue-950 shadow-2xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLangToggle('hi')}
                className={`px-2 py-0.5 rounded-full font-bold transition cursor-pointer ${
                  lang === 'hi' ? 'bg-amber-400 text-blue-950 shadow-2xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => handleLangToggle('ta')}
                className={`px-2 py-0.5 rounded-full font-bold transition cursor-pointer ${
                  lang === 'ta' ? 'bg-amber-400 text-blue-950 shadow-2xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                தமிழ்
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between">
          {/* Logo & Emblem Branding */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-950 flex items-center justify-center text-white shadow-md shadow-blue-950/20 group-hover:scale-105 transition-transform duration-300 border border-blue-700/50">
                <ShieldCheck className="w-6 h-6 text-amber-400 drop-shadow-xs" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center" title="BIS Live Mirror">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 font-serif">
                  BIS Saara
                </h1>
                <span className="bg-gradient-to-r from-orange-500/10 to-amber-500/15 text-orange-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-orange-400/30 tracking-wider">
                  AI ASSISTANT
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Intelligent BIS Assistant for Industries & Consumers
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/90 shadow-2xs backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-sm shadow-blue-950/25'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/80'
                  }`}
                >
                  <span className={isActive ? 'text-amber-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{getLabel(item)}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 animate-slide-up">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition ${
                    isActive
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span className={isActive ? 'text-amber-400' : 'text-slate-500'}>{item.icon}</span>
                  <span>{getLabel(item)}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
