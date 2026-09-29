import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  FileText, 
  Building, 
  FlaskConical, 
  DollarSign, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { ActiveTab, Language } from '../types/index.ts';
import { INDIAN_STANDARDS, IndianStandard } from '../data/bisData.ts';
import { useToast } from '../context/ToastContext.tsx';

interface StandardsSearchTabProps {
  setActiveTab: (tab: ActiveTab) => void;
  lang: Language;
}

export const StandardsSearchTab: React.FC<StandardsSearchTabProps> = ({ setActiveTab, lang }) => {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeModalStandard, setActiveModalStandard] = useState<IndianStandard | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const categories = useMemo(() => {
    const list = Array.from(new Set(INDIAN_STANDARDS.map((s) => s.category)));
    return ['All', ...list];
  }, []);

  const filteredStandards = useMemo(() => {
    return INDIAN_STANDARDS.filter((std) => {
      const matchesSearch = 
        std.isNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        std.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        std.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        std.tamilTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        std.applicableProducts.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
        std.scope.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'All' || std.category === selectedCategory;
      const matchesStatus = 
        selectedStatus === 'All' || 
        std.status === selectedStatus || 
        std.status.toLowerCase().includes(selectedStatus.toLowerCase());

      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 250);
  };

  const handleStatusSelect = (st: string) => {
    setSelectedStatus(st);
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 250);
  };

  const getStandardTitle = (std: IndianStandard) => {
    if (lang === 'ta') return std.tamilTitle;
    if (lang === 'hi') return std.hindiTitle;
    return std.title;
  };

  return (
    <div className="space-y-6 pb-12 animate-slide-up">
      {/* Header & Search Bar */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
        <div className="max-w-2xl mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-blue-700" />
            <span>Official Bureau of Indian Standards Catalog</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950 font-serif">
            {lang === 'hi' 
              ? 'भारतीय मानक निर्देशिका (Indian Standards Directory)' 
              : lang === 'ta'
              ? 'இந்திய தரநிலைகள் அடைவு (Indian Standards Directory)'
              : 'Indian Standards (IS) Directory'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {lang === 'hi' 
              ? '21,000+ मानकों में से खोजें। IS कोड, उत्पाद नाम या परीक्षण मापदंड द्वारा तुरंत विवरण प्राप्त करें।'
              : lang === 'ta'
              ? '21,000+ தேசிய தரநிலைகளில் தேடுங்கள். நோக்கம், NABL ஆய்வகங்கள் மற்றும் கட்டாய QCO விவரங்களை உடனடியாகப் பெறுங்கள்.'
              : 'Search across 21,000+ national standards. Instant access to scope, testing labs, SIT norms, and QCO mandates.'}
          </p>
        </div>

        {/* Search Input Box */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === 'ta'
                ? 'IS எண் (उदा. IS 10500, IS 14543), தயாரிப்பு பெயர் அல்லது சொல்லைத் தேடுங்கள்...'
                : lang === 'hi' 
                ? 'IS संख्या (उदा. IS 10500, IS 14543), उत्पाद नाम या कीवर्ड खोजें...'
                : 'Search by IS number (e.g. IS 10500, IS 14543), product name, or keyword...'
            }
            className="w-full pl-12 pr-10 py-3 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-slate-50/70 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                showToast('Search query cleared', 'info');
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 mr-1">
            <Filter className="w-3.5 h-3.5 text-blue-700" />
            <span>Category:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
          <span className="font-bold text-slate-600">Legal Status:</span>
          {['All', 'Active', 'Mandatory (QCO)', 'Voluntary'].map((st) => (
            <button
              key={st}
              onClick={() => handleStatusSelect(st)}
              className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                selectedStatus === st
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 text-xs text-slate-500 font-medium px-1">
          <span>Showing {filteredStandards.length} standards matching filters</span>
          <span>Validated against Gazette Notifications</span>
        </div>

        {isSearching ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card p-5 rounded-2xl border border-slate-200/70 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="w-24 h-4 rounded shimmer" />
                  <div className="w-20 h-4 rounded-full shimmer" />
                </div>
                <div className="w-full h-5 rounded shimmer" />
                <div className="w-4/5 h-3 rounded shimmer" />
                <div className="w-full h-16 rounded-xl shimmer" />
              </div>
            ))}
          </div>
        ) : filteredStandards.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">No Indian Standards Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              We couldn't find any standard matching "{searchQuery}". Try searching by IS code like "IS 10500" or generic terms like "Water" or "Helmet".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedStatus('All');
                showToast('All search filters reset', 'info');
              }}
              className="px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-bold hover:bg-blue-800 transition cursor-pointer shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStandards.map((std) => (
              <div
                key={std.id}
                className="glass-card glass-card-hover rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <span className="font-mono font-bold text-blue-950 text-xs sm:text-sm bg-blue-50/80 px-2.5 py-0.5 rounded-lg border border-blue-200 shadow-2xs">
                      {std.isNumber}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        std.status.includes('QCO')
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : std.status.includes('CRS')
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {std.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-950 text-sm mb-1.5 leading-snug line-clamp-2">
                    {getStandardTitle(std)}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 mb-3.5 leading-relaxed font-normal">
                    {std.scope}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-slate-50/90 p-3 rounded-xl border border-slate-200/70 font-medium">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Scheme:</span>
                      <span className="font-semibold text-slate-800">{std.scheme}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Testing Labs:</span>
                      <span className="font-bold text-emerald-700">{std.testingLabsCount} Recognized</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Sample Turnaround:</span>
                      <span className="font-semibold text-slate-800">~{std.sampleTestingTimeDays} Days</span>
                    </div>
                  </div>

                  {/* Smart Related Standards Tags */}
                  {std.relatedStandards && (
                    <div className="mb-3 flex flex-wrap gap-1">
                      <span className="text-[10px] font-bold text-slate-400">Related:</span>
                      {std.relatedStandards.slice(0, 2).map((rel, rIdx) => (
                        <span key={rIdx} className="text-[10px] bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200 font-mono">
                          {rel.isNumber.split(' ')[1]}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">
                    ₹{std.applicationFee.toLocaleString('en-IN')} App Fee
                  </span>
                  <button
                    onClick={() => {
                      setActiveModalStandard(std);
                      showToast(`Inspecting ${std.isNumber} details`, 'info');
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Standard Detail Modal with Smart Recommendations */}
      {activeModalStandard && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-slide-up">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50/80 rounded-t-3xl">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-base font-black text-blue-950 bg-blue-100 px-3 py-0.5 rounded-lg border border-blue-300">
                    {activeModalStandard.isNumber}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                    {activeModalStandard.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-950 font-serif">
                  {getStandardTitle(activeModalStandard)}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalStandard(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-sm">
              {/* Scope */}
              <div>
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-1.5 text-xs uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Scope & Regulatory Framework</span>
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  {activeModalStandard.scope}
                </p>
                {activeModalStandard.gazetteOrderRef && (
                  <p className="mt-1.5 text-[11px] text-amber-800 font-bold">
                    Legal Reference: {activeModalStandard.gazetteOrderRef}
                  </p>
                )}
              </div>

              {/* Key Parameters */}
              <div>
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-2 text-xs uppercase tracking-wider">
                  <FlaskConical className="w-4 h-4 text-purple-600" />
                  <span>Key Testing & Quality Parameters (SIT)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalStandard.keyParameters.map((param, i) => (
                    <div key={i} className="flex items-start gap-2 bg-purple-50/50 p-2.5 rounded-xl border border-purple-100 text-xs text-slate-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>{param}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Smart Recommendations: Related Standards */}
              {activeModalStandard.relatedStandards && (
                <div>
                  <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-2 text-xs uppercase tracking-wider">
                    <Layers className="w-4 h-4 text-orange-600" />
                    <span>Smart Recommendations: Related Indian Standards</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeModalStandard.relatedStandards.map((rel, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-orange-50/40 border border-orange-200/80">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs font-bold text-blue-900">{rel.isNumber}</span>
                          <span className="text-[10px] font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full">
                            {rel.similarity}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-slate-800">{rel.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{rel.reason}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fee & Lab Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-blue-50/60 p-4 rounded-2xl border border-blue-100 text-xs">
                <div>
                  <span className="text-slate-500 block">Application Fee</span>
                  <span className="font-black text-slate-900 text-sm">₹{activeModalStandard.applicationFee.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Annual Marking Fee</span>
                  <span className="font-black text-slate-900 text-sm">₹{activeModalStandard.annualMarkingFee.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Testing Turnaround</span>
                  <span className="font-black text-slate-900 text-sm">{activeModalStandard.sampleTestingTimeDays} Days</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 border-t border-slate-200 bg-slate-50 rounded-b-3xl flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  setActiveModalStandard(null);
                  setActiveTab('summarizer');
                  showToast('Opened PDF Summarizer for this standard', 'info');
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-800 hover:text-orange-950 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>Summarize Gazette in PDF Tool</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveModalStandard(null);
                    setActiveTab('assistant');
                    showToast(`Asking AI about ${activeModalStandard.isNumber}`, 'info');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition cursor-pointer"
                >
                  Ask AI About This Standard
                </button>
                <button
                  onClick={() => {
                    setActiveModalStandard(null);
                    setActiveTab('certification');
                    showToast(`Loaded certification steps for ${activeModalStandard.isNumber}`, 'success');
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition cursor-pointer shadow-xs"
                >
                  Start Certification Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
