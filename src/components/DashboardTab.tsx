import React, { useState } from 'react';
import { 
  Building2, 
  BookOpen, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  BellRing, 
  ExternalLink,
  Zap,
  TrendingUp,
  FileCheck,
  Search,
  CheckCircle,
  XCircle,
  RefreshCw,
  Award,
  FileText
} from 'lucide-react';
import { ActiveTab, UserRole, Language } from '../types/index.ts';
import { LATEST_NOTIFICATIONS, ANALYTICS_DATA } from '../data/bisData.ts';
import { useToast } from '../context/ToastContext.tsx';

interface DashboardTabProps {
  setActiveTab: (tab: ActiveTab) => void;
  userRole: UserRole;
  lang: Language;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({ setActiveTab, userRole, lang }) => {
  const isHi = lang === 'hi';
  const isTa = lang === 'ta';
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const roleBanners = {
    manufacturer: {
      badge: isTa ? 'உற்பத்தியாளர் போர்டல்' : isHi ? 'विनिर्माता अनुपालन केंद्र' : 'Manufacturer & Industry Gateway',
      title: isTa ? 'BIS இணக்கம் மற்றும் சான்றிதழை விரைவுபடுத்துங்கள்' : isHi ? 'BIS प्रमाणन और अनुपालन को गति दें' : 'Accelerate BIS Compliance & Certification',
      desc: isTa
        ? 'உங்கள் தயாரிப்புக்கான கட்டாய QCO உத்தரவுகளைக் கண்டறிந்து, சோதனை சரிபார்ப்புப் பட்டியலை உருவாக்கி, சான்றிதழ் நேரத்தை 80% குறைக்கவும்.'
        : isHi 
        ? 'अपने औद्योगिक उत्पाद के लिए अनिवार्य QCO आदेश जांचें, इन-हाउस परीक्षण चेकलिस्ट बनाएं और सीक्रेटरी अप्रूवल समय 80% घटाएं।'
        : 'Identify mandatory QCOs for your industrial line, generate testing checklists, and prepare CML licensing in 80% less time.'
    },
    consumer: {
      badge: isTa ? 'நுகர்வோர் பாதுகாப்பு மையம்' : isHi ? 'उपभोक्ता अधिकार व सुरक्षा' : 'Consumer Protection & Verification',
      title: isTa ? 'உண்மையான ISI முத்திரை & தங்க HUID சரிபார்க்கவும்' : isHi ? 'असली ISI मार्क और 6-अंकीय स्वर्ण HUID जांचें' : 'Verify Genuine ISI Marks & 6-Digit Gold HUID',
      desc: isTa
        ? 'தயாரிப்புகளில் உள்ள CML உரிம எண்ணை உடனே சரிபார்த்து, போலி ISI முத்திரைகளை நேரடியாக BIS க்கு தெரிவிக்கவும்.'
        : isHi
        ? 'बाजार से खरीदे गए उत्पादों का लाइसेंस नंबर तुरंत सत्यापित करें और नकली ISI चिह्नों की सीधे BIS को रिपोर्ट करें।'
        : 'Instant verification of licensed products, drinking water purity norms, helmet safety standards, and anti-counterfeit reporting.'
    },
    officer: {
      badge: isTa ? 'BIS அதிகாரி பணியிடம்' : isHi ? 'BIS अधिकारी वर्कस्पेस' : 'BIS Officer Workspace',
      title: isTa ? 'தரநிலைகள் ஒழுங்குமுறை மற்றும் தணிக்கை' : isHi ? 'मानक विनियमन और निरीक्षण सहायक' : 'Standards Intelligence & Scrutiny Assistant',
      desc: isTa
        ? 'அரசிதழ் திருத்தங்களைக் கண்காணித்து, NABL ஆய்வக சோதனை நேரங்களைக் கவனித்து, பொதுமக்கள் குறைகளை விரைவாகத் தீர்க்கவும்.'
        : isHi
        ? 'नवीनतम गजट संशोधन देखें, NABL लैब परीक्षण समय-सीमा ट्रैक करें और नागरिक शिकायतों का त्वरित निवारण करें।'
        : 'Automate surveillance review, monitor QCO enforcement across zones, and track grievance resolution metrics.'
    }
  };

  const currentRoleInfo = roleBanners[userRole];

  const handleRefreshData = () => {
    setIsLoading(true);
    showToast('Syncing latest gazette and compliance feeds...', 'info');
    setTimeout(() => {
      setIsLoading(false);
      showToast('Live standards registry updated successfully!', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-12 animate-slide-up">
      {/* Hero Role Banner with Glassmorphism highlights */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white p-7 sm:p-9 shadow-xl border border-blue-800/80">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-blue-400/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentRoleInfo.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-serif mb-3 leading-tight text-white drop-shadow-xs">
            {currentRoleInfo.title}
          </h2>
          <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            {currentRoleInfo.desc}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('assistant');
                showToast('Welcome to BIS Saara AI Assistant!', 'info');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/25 transition-all duration-200 cursor-pointer hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 text-white" />
              <span>{isHi ? 'BIS Saara AI से पूछें' : 'Ask BIS Saara AI'}</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              onClick={() => setActiveTab('verify')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/20 backdrop-blur-md transition-all duration-200 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isHi ? 'ISI लाइसेंस सत्यापित करें' : 'Verify ISI License'}</span>
            </button>

            <button
              onClick={handleRefreshData}
              disabled={isLoading}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition cursor-pointer ml-auto hidden sm:flex items-center gap-1.5 text-xs"
              title="Refresh Gazette & Feeds"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
              <span className="text-[11px] font-medium">{isLoading ? 'Syncing...' : 'Sync Registry'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Glassmorphism KPI Cards (or Skeletons if loading) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          // Loading Skeletons for KPIs
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card p-5 rounded-2xl border border-slate-200/60 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <div className="w-24 h-3 rounded-md shimmer" />
                <div className="w-8 h-8 rounded-xl shimmer" />
              </div>
              <div className="w-20 h-7 rounded-md shimmer" />
              <div className="w-28 h-3 rounded-md shimmer" />
            </div>
          ))
        ) : (
          <>
            <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between text-blue-600 mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {isHi ? 'भारतीय मानक' : isTa ? 'இந்திய தரநிலைகள்' : 'Indian Standards'}
                </span>
                <div className="p-2.5 bg-blue-50 text-blue-800 rounded-xl shadow-2xs">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">24,860</div>
              <p className="text-[11px] text-emerald-700 font-bold mt-1.5 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Active Standards Registry
              </p>
            </div>

            <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between text-indigo-600 mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {isHi ? 'सक्रिय प्रमाणन' : isTa ? 'செயலில் உள்ள சான்றிதழ்கள்' : 'Active Certifications'}
                </span>
                <div className="p-2.5 bg-indigo-50 text-indigo-800 rounded-xl shadow-2xs">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">8,420</div>
              <p className="text-[11px] text-emerald-700 font-bold mt-1.5 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Granted CML Licences
              </p>
            </div>

            <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between text-emerald-600 mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {isHi ? 'ISI सत्यापन' : isTa ? 'ISI சரிபார்ப்புகள்' : 'ISI Verifications'}
                </span>
                <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">15,780</div>
              <p className="text-[11px] text-slate-500 font-semibold mt-1.5">
                Authenticity Checks Completed
              </p>
            </div>

            <div className="glass-card glass-card-hover p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between text-orange-600 mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {isHi ? 'आज के AI प्रश्न' : isTa ? 'இன்றைய AI கேள்விகள்' : 'AI Queries Today'}
                </span>
                <div className="p-2.5 bg-orange-50 text-orange-800 rounded-xl shadow-2xs">
                  <HelpCircle className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">1,245</div>
              <p className="text-[11px] text-orange-700 font-bold mt-1.5 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" /> Assistant Resolved
              </p>
            </div>
          </>
        )}
      </div>

      {/* Quick Action Matrix */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-950 font-serif">
              {isHi ? 'त्वरित सेवाएं और उपकरण' : 'Key BIS Services & Interactive Tools'}
            </h3>
            <p className="text-xs text-slate-500">Accelerate certification, audit compliance, or verify consumer goods</p>
          </div>
          <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            Smart Automation
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div 
            onClick={() => {
              setActiveTab('verify');
              showToast('Opening ISI & HUID Verification portal', 'info');
            }}
            className="group p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-950/5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-950 text-sm mb-1 group-hover:text-emerald-700 transition">
                {isTa ? 'ISI & HUID சரிபார்ப்பு' : isHi ? 'ISI व HUID सत्यापन' : 'Verify ISI & Gold HUID'}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isTa ? 'உரிம எண்ணை உள்ளிட்டு தொழிற்சாலை விவரங்களை சரிபார்க்கவும்.' : isHi ? 'लाइसेंस नंबर डालें और वास्तविक फैक्ट्री विवरण व वैधता देखें।' : 'Check authentic factory details, validity dates & counterfeit warnings.'}
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>{isTa ? 'சரிபார்க்கவும்' : isHi ? 'सत्यापित करें' : 'Verify Now'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          <div 
            onClick={() => {
              setActiveTab('summarizer');
              showToast('Opening PDF Gazette & Standards Summarizer', 'info');
            }}
            className="group p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-950/5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="font-bold text-slate-950 text-sm mb-1 group-hover:text-amber-700 transition">
                {isTa ? 'PDF சுருக்கி' : isHi ? 'PDF संक्षेपक' : 'PDF Summarizer'}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isTa ? 'அரசிதழ் QCO ஆவணங்களை பதிவேற்றி AI சுருக்கம் பெறவும்.' : isHi ? 'गजट QCO व IS तकनीकी PDF अपलोड कर तुरंत AI सारांश निकालें।' : 'Upload or pick Gazette PDFs to extract key clauses & SIT parameters.'}
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform">
              <span>{isTa ? 'சுருக்கம் பார்க்க' : isHi ? 'सारांश देखें' : 'Summarize PDF'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          <div 
            onClick={() => {
              setActiveTab('standards');
              showToast('Browsing 21,000+ Indian Standards catalog', 'info');
            }}
            className="group p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-950/5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-950 text-sm mb-1 group-hover:text-blue-700 transition">
                {isTa ? 'தரநிலைகள் தேடல்' : isHi ? 'भारतीय मानक खोज' : 'Indian Standards Search'}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isTa ? 'IS குறியீடு மற்றும் தயாரிப்பு பெயர் மூலம் தேடவும்.' : isHi ? 'IS संख्या, उत्पाद नाम या अनिवार्य QCO आदेश द्वारा खोजें।' : 'Search 21,000+ standards by IS code, testing parameters & mandatory status.'}
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
              <span>{isTa ? 'தேடவும்' : isHi ? 'मानक देखें' : 'Search Standards'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          <div 
            onClick={() => {
              setActiveTab('certification');
              showToast('Opening 6-Stage Certification Roadmap', 'info');
            }}
            className="group p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-950/5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FileCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-950 text-sm mb-1 group-hover:text-orange-700 transition">
                {isTa ? 'சான்றிதழ் வழிகாட்டி' : isHi ? 'प्रमाणन मार्गदर्शिका' : 'Certification Roadmap'}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isTa ? 'படிநிலைகள், ஆவணங்கள் மற்றும் கட்டண கால்குலேட்டர்.' : isHi ? 'चरण-दर-चरण प्रक्रिया, अनिवार्य दस्तावेज और एमएसएमई शुल्क कैलकुलेटर।' : 'Interactive 6-step workflow, lab preparation checklist & fee calculator.'}
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-orange-700 group-hover:translate-x-1 transition-transform">
              <span>{isTa ? 'வழிகாட்டி' : isHi ? 'गाइड शुरू करें' : 'Explore Steps'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          <div 
            onClick={() => {
              setActiveTab('assistant');
              showToast('BIS Saara AI Assistant is ready to chat', 'info');
            }}
            className="group p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-950/5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-950 text-sm mb-1 group-hover:text-purple-700 transition">
                {isTa ? 'BIS AI உரையாடல்' : isHi ? 'BIS Saara AI चैट' : 'BIS Saara AI Chat'}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isTa ? 'குரல் அல்லது தட்டச்சு மூலம் உங்கள் மொழியில் கேளுங்கள்.' : isHi ? 'अपनी भाषा में प्रश्न पूछें और मानक विशिष्टता व दिशानिर्देश प्राप्त करें।' : 'Ask questions in English, Hindi, or Tamil with Voice input.'}
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-purple-700 group-hover:translate-x-1 transition-transform">
              <span>{isTa ? 'உரையாடு' : isHi ? 'बातचीत करें' : 'Start Chat'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Latest Notifications / Gazette Updates */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 text-amber-800 rounded-xl border border-amber-200/60 shadow-2xs">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-950 text-base font-serif">
                {isHi ? 'नवीनतम BIS गजट सूचनाएं एवं आदेश' : 'Latest BIS Gazette Notifications & QCO Updates'}
              </h3>
              <p className="text-xs text-slate-500">Official statutory notices issued under the Bureau of Indian Standards Act, 2016</p>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('standards')}
            className="text-xs font-bold text-blue-800 hover:text-blue-950 flex items-center gap-1 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200/70"
          >
            <span>{isHi ? 'सभी देखें' : 'View All'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LATEST_NOTIFICATIONS.map((item) => (
            <div 
              key={item.id}
              className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-amber-400/80 hover:bg-amber-50/20 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-slate-400">{item.date}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200/70">
                    {item.tag}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1 leading-snug">
                  {item.title}
                </h4>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">{item.category}</span>
                <button 
                  onClick={() => {
                    setActiveTab('assistant');
                    showToast(`Inquiring about ${item.category}`, 'info');
                  }}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer flex items-center gap-1"
                >
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Section: Before vs After with Enhanced Typography & Contrast */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Smart India Hackathon SIH26107 Measurable Impact Matrix</span>
          </div>
          <h3 className="text-xl font-bold text-slate-950 font-serif">
            {isHi ? 'पारंपरिक प्रणाली बनाम BIS Saara का प्रभाव' : 'Traditional BIS Process vs. BIS Saara AI Transformation'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Real data from pilot trials demonstrating automation, transparent tracking, and citizen empowerment.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider">
                <th className="py-3.5 px-4">Metric / Regulatory Workflow</th>
                <th className="py-3.5 px-4 text-rose-800 bg-rose-50/50">
                  <div className="flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500" />
                    <span>Before (Traditional / Manual)</span>
                  </div>
                </th>
                <th className="py-3.5 px-4 text-emerald-900 bg-emerald-50/60">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>After (With BIS Saara AI)</span>
                  </div>
                </th>
                <th className="py-3.5 px-4 text-blue-900 text-right">Quantified Gain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ANALYTICS_DATA.impactMetrics.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900 text-xs sm:text-sm">
                    {row.metric}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-rose-900 bg-rose-50/20 font-medium">
                    {row.before}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-semibold text-emerald-950 bg-emerald-50/30">
                    {row.after}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-extrabold bg-blue-100 text-blue-900 border border-blue-300">
                      {row.improvement}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
