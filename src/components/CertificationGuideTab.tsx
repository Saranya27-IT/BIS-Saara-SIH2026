import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  FileText, 
  HelpCircle, 
  Building, 
  ChevronRight, 
  Download, 
  Calculator, 
  Sparkles, 
  CheckSquare, 
  Square,
  AlertCircle
} from 'lucide-react';
import { ActiveTab, Language } from '../types/index.ts';
import { CERTIFICATION_STEPS } from '../data/bisData.ts';
import { useToast } from '../context/ToastContext.tsx';

interface CertificationGuideTabProps {
  setActiveTab: (tab: ActiveTab) => void;
  lang: Language;
}

export const CertificationGuideTab: React.FC<CertificationGuideTabProps> = ({ setActiveTab, lang }) => {
  const isHi = lang === 'hi';
  const { showToast } = useToast();
  const [selectedScheme, setSelectedScheme] = useState<'scheme-1' | 'crs' | 'fmcs' | 'hallmark'>('scheme-1');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [enterpriseType, setEnterpriseType] = useState<'micro' | 'small' | 'medium' | 'large'>('small');
  
  // Interactive checklist state
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    'doc-0-0': true,
    'doc-0-1': true,
    'doc-1-0': true,
  });

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const toggleDoc = (docId: string, docName: string) => {
    const nextState = !checkedDocs[docId];
    setCheckedDocs(prev => ({
      ...prev,
      [docId]: nextState
    }));
    if (nextState) {
      showToast(`Document verified: ${docName}`, 'success');
    } else {
      showToast(`Document unmarked: ${docName}`, 'info');
    }
  };

  // Calculate total docs and progress
  let totalDocs = 0;
  let completedDocs = 0;
  CERTIFICATION_STEPS.forEach((step, sIdx) => {
    step.requiredDocs.forEach((_, dIdx) => {
      totalDocs++;
      if (checkedDocs[`doc-${sIdx}-${dIdx}`]) {
        completedDocs++;
      }
    });
  });

  const progressPercent = Math.round((completedDocs / totalDocs) * 100);

  // Fee calculation
  const getFeeEstimate = () => {
    let baseAppFee = 1000;
    let baseInspFee = 7000;
    let baseMarkingFee = 84000;
    let discount = 0;
    let discountLabel = '0% (Standard)';

    if (enterpriseType === 'micro') {
      discount = 0.5;
      discountLabel = '50% MSME Concession';
    } else if (enterpriseType === 'small') {
      discount = 0.2;
      discountLabel = '20% MSME Concession';
    }

    const appFee = baseAppFee * (1 - discount);
    const inspFee = baseInspFee;
    const markingFee = baseMarkingFee * (1 - discount);
    const total = appFee + inspFee + markingFee;

    return {
      appFee,
      inspFee,
      markingFee,
      total,
      discountLabel,
      estDays: enterpriseType === 'micro' ? '30-45 Days' : '45-60 Days'
    };
  };

  const feeData = getFeeEstimate();

  const handleDownload = () => {
    setDownloadSuccess(true);
    showToast('Factory Audit Checklist & Fee Summary Exported!', 'success');
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleSchemeChange = (scheme: 'scheme-1' | 'crs' | 'fmcs' | 'hallmark', label: string) => {
    setSelectedScheme(scheme);
    showToast(`Switched roadmap to ${label}`, 'info');
  };

  const activeStep = CERTIFICATION_STEPS[activeStepIndex];

  return (
    <div className="space-y-8 pb-12 animate-slide-up">
      {/* Top Scheme Selector */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 font-serif">
              {isHi ? 'BIS प्रमाणन चरण-दर-चरण मार्गदर्शिका' : 'Step-by-Step BIS Certification Roadmap'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {isHi 
                ? 'प्रमाणन योजना चुनें, प्रक्रिया को समझें और इन-हाउस तैयारी चेकलिस्ट पूरी करें।'
                : 'Choose your compliance scheme, track mandatory stages, and verify document readiness.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => handleSchemeChange('scheme-1', 'Scheme-I (ISI Mark)')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedScheme === 'scheme-1' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Scheme-I (ISI Mark)
            </button>
            <button
              onClick={() => handleSchemeChange('crs', 'Scheme-II (CRS IT Goods)')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedScheme === 'crs' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Scheme-II (CRS IT)
            </button>
            <button
              onClick={() => handleSchemeChange('hallmark', 'Gold Hallmarking HUID')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedScheme === 'hallmark' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Gold Hallmarking
            </button>
            <button
              onClick={() => handleSchemeChange('fmcs', 'Foreign Manufacturers FMCS')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedScheme === 'fmcs' ? 'bg-blue-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              FMCS (Foreign)
            </button>
          </div>
        </div>

        {/* Readiness Checklist Progress Bar */}
        <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2.5">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Overall Factory Readiness: {completedDocs} of {totalDocs} Items Verified</span>
            </span>
            <span className="text-blue-900 font-extrabold text-sm">{progressPercent}% Ready</span>
          </div>
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5">
            <div 
              className="bg-gradient-to-r from-blue-700 via-indigo-600 to-emerald-500 h-full rounded-full transition-all duration-500 shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Workflow: Step Navigator & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Step Navigation Column */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            6-Stage Certification Stages
          </h3>

          <div className="space-y-2.5">
            {CERTIFICATION_STEPS.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              return (
                <div
                  key={step.stepNumber}
                  onClick={() => {
                    setActiveStepIndex(idx);
                    showToast(`Step ${step.stepNumber}: ${step.title}`, 'info');
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-900 to-indigo-900 text-white border-blue-900 shadow-md shadow-blue-950/20'
                      : 'bg-white/90 text-slate-800 border-slate-200/80 hover:border-blue-400 hover:shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shadow-2xs ${
                        isSelected ? 'bg-amber-400 text-blue-950' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold leading-tight">
                        {isHi ? step.titleHi : step.title}
                      </h4>
                      <span className={`text-[11px] font-medium ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                        Duration: {step.duration}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Step Details & Checklist */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
            <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  Stage {activeStep.stepNumber} of 6
                </span>
                <h3 className="text-xl font-bold text-slate-950 font-serif mt-0.5">
                  {isHi ? activeStep.titleHi : activeStep.title}
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>{activeStep.duration}</span>
              </span>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
              {activeStep.description}
            </p>

            {/* Practical Advice Alert */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-amber-900">Pro-Tip from BIS Auditors:</h5>
                <p className="text-xs text-amber-800 mt-0.5 font-medium leading-relaxed">{activeStep.tips}</p>
              </div>
            </div>

            {/* Interactive Document Checklist */}
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center justify-between">
                <span>Required Documents & Verification Checklist:</span>
                <span className="text-xs text-slate-400 font-normal">Click to toggle verified state</span>
              </h4>

              <div className="space-y-2.5">
                {activeStep.requiredDocs.map((doc, dIdx) => {
                  const docKey = `doc-${activeStepIndex}-${dIdx}`;
                  const isChecked = !!checkedDocs[docKey];

                  return (
                    <div
                      key={dIdx}
                      onClick={() => toggleDoc(docKey, doc)}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all duration-200 cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400 shrink-0" />
                        )}
                        <span className={`text-xs sm:text-sm font-medium ${isChecked ? 'line-through opacity-80' : ''}`}>
                          {doc}
                        </span>
                      </div>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        isChecked ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {isChecked ? 'Ready' : 'Pending'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex(p => Math.max(0, p - 1))}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
              >
                Previous Step
              </button>

              <button
                disabled={activeStepIndex === CERTIFICATION_STEPS.length - 1}
                onClick={() => setActiveStepIndex(p => Math.min(CERTIFICATION_STEPS.length - 1, p + 1))}
                className="px-5 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 shadow-xs transition"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Statutory Fee & Timeline Calculator */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl shadow-2xs">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm font-serif">
                    {isHi ? 'BIS शुल्क एवं समय-सीमा कैलकुलेटर' : 'Statutory Fee & Timeline Estimator'}
                  </h3>
                  <p className="text-xs text-slate-500">Based on MSME classification & BIS Fee Schedule 2026</p>
                </div>
              </div>

              {/* Enterprise Selector */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                {(['micro', 'small', 'medium', 'large'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => {
                      setEnterpriseType(type);
                      showToast(`Calculated rates for ${type.toUpperCase()} enterprise`, 'info');
                    }}
                    className={`px-2.5 py-1 rounded-lg capitalize font-bold transition cursor-pointer ${
                      enterpriseType === type ? 'bg-white text-blue-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-center">
              <div>
                <span className="text-[11px] text-slate-500 block font-medium">Application Fee</span>
                <span className="font-black text-slate-900 text-sm">₹{feeData.appFee.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block font-medium">Audit & Inspection</span>
                <span className="font-black text-slate-900 text-sm">₹{feeData.inspFee.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block font-medium">Annual Marking Fee</span>
                <span className="font-black text-slate-900 text-sm">₹{feeData.markingFee.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block font-medium">Estimated Turnaround</span>
                <span className="font-black text-blue-900 text-sm">{feeData.estDays}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                ✓ Concession Applied: {feeData.discountLabel}
              </span>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer transition shadow-xs text-xs"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>{downloadSuccess ? 'Checklist Downloaded!' : 'Export Prepared Checklist'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
