import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Download, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  BookOpen, 
  Check, 
  ExternalLink,
  Bot
} from 'lucide-react';
import { ActiveTab, Language } from '../types/index.ts';
import { MOCK_PDF_DOCUMENTS, MockPDFDocument, INDIAN_STANDARDS } from '../data/bisData.ts';
import { useToast } from '../context/ToastContext.tsx';

interface PDFSummarizerTabProps {
  setActiveTab: (tab: ActiveTab) => void;
  lang: Language;
}

export const PDFSummarizerTab: React.FC<PDFSummarizerTabProps> = ({ setActiveTab, lang }) => {
  const { showToast } = useToast();
  const [selectedDoc, setSelectedDoc] = useState<MockPDFDocument>(MOCK_PDF_DOCUMENTS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [uploadedCustomName, setUploadedCustomName] = useState<string | null>(null);
  const [downloadDone, setDownloadDone] = useState(false);

  const triggerSummarization = (doc: MockPDFDocument, customName?: string) => {
    setIsProcessing(true);
    setUploadedCustomName(customName || null);
    setSelectedDoc(doc);

    setProcessingStage('Reading document layout and Gazette OCR streams...');
    setTimeout(() => {
      setProcessingStage('Identifying Bureau of Indian Standards Clauses & SIT tables...');
      setTimeout(() => {
        setProcessingStage('Synthesizing executive summary, testing parameters & MSME concessions...');
        setTimeout(() => {
          setIsProcessing(false);
          showToast(`AI Summary generated for ${customName || doc.fileName}`, 'success');
        }, 600);
      }, 600);
    }, 600);
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      showToast(`Uploaded ${file.name}. Commencing AI analysis...`, 'info');
      // Pick a rich template and customize title
      const template = { ...MOCK_PDF_DOCUMENTS[0] };
      template.fileName = file.name;
      template.title = file.name.replace('.pdf', '') + ' (User Uploaded Standard)';
      triggerSummarization(template, file.name);
    }
  };

  const handleExportSummary = () => {
    setDownloadDone(true);
    showToast(`Exported AI Summary dossier for ${selectedDoc.fileName}`, 'success');
    setTimeout(() => setDownloadDone(false), 2500);
  };

  // Find related standard if any
  const matchedStandard = INDIAN_STANDARDS.find(s => s.isNumber.includes(selectedDoc.applicableIS.split(' ')[1] || 'XYZ'));

  const executiveSummary = lang === 'ta' 
    ? selectedDoc.executiveSummaryTa 
    : lang === 'hi' 
    ? selectedDoc.executiveSummaryHi 
    : selectedDoc.executiveSummary;

  return (
    <div className="space-y-6 pb-12 animate-slide-up">
      {/* Top Banner */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold mb-2 border border-orange-200">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>AI-Powered Gazette & Standard Document Parser</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 font-serif">
              {lang === 'hi' 
                ? 'BIS मानक एवं गजट PDF संक्षेपक (PDF Summarizer)' 
                : lang === 'ta'
                ? 'BIS தரநிலைகள் மற்றும் அரசிதழ் PDF சுருக்கி'
                : 'Indian Standards & Gazette PDF AI Summarizer'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {lang === 'hi'
                ? 'जटिल 50+ पृष्ठों के गजट आदेशों और IS तकनीकी विशिष्टताओं का 3 सेकंड में स्पष्ट सारांश, परीक्षण मापदंड और एमएसएमई छूट प्राप्त करें।'
                : lang === 'ta'
                ? 'நீண்ட இந்திய தரநிலை ஆவணங்களை பதிவேற்றி முக்கிய விதிகள், ஆய்வக சோதனை அளவுருக்கள் மற்றும் தண்டனை விதிகளை உடனடியாக அறியவும்.'
                : 'Upload or select official Quality Control Orders (QCOs) and Indian Standards to extract key clauses, testing parameters, and MSME concessions in seconds.'}
            </p>
          </div>

          <button
            onClick={handleExportSummary}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>{downloadDone ? 'Dossier Downloaded!' : 'Export AI Summary'}</span>
          </button>
        </div>
      </div>

      {/* Upload Zone & Pre-loaded Samples */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Box */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-5 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Upload Standard or QCO PDF
            </h3>

            <label className="border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-blue-50/40 hover:bg-blue-50/70 transition-all group">
              <UploadCloud className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform mb-2" />
              <span className="text-xs font-bold text-slate-800">
                Click or Drop Gazette / IS PDF
              </span>
              <span className="text-[11px] text-slate-400 mt-1">
                Supports BIS specifications up to 50MB
              </span>
              <input
                type="file"
                accept=".pdf"
                onChange={handleCustomUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Pre-Loaded Official Gazette Samples */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Try Sample BIS Gazette PDFs:
            </h3>

            <div className="space-y-2">
              {MOCK_PDF_DOCUMENTS.map((doc) => {
                const isSelected = selectedDoc.id === doc.id && !uploadedCustomName;
                return (
                  <div
                    key={doc.id}
                    onClick={() => triggerSummarization(doc)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-blue-900 text-white border-blue-900 shadow-md shadow-blue-950/20'
                        : 'bg-slate-50/80 hover:bg-white text-slate-800 border-slate-200/80 hover:border-blue-300'
                    }`}
                  >
                    <FileText className={`w-5 h-5 shrink-0 mt-0.5 ${isSelected ? 'text-amber-400' : 'text-blue-600'}`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold truncate leading-tight">
                        {doc.fileName}
                      </h4>
                      <p className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                        {doc.gazetteRef} • {doc.pages} Pages
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Output Panel: Structured AI Summary */}
        <div className="lg:col-span-2 space-y-6">
          {isProcessing ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4 shadow-sm">
              <div className="relative w-16 h-16 mx-auto">
                <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-800 animate-spin" />
                <Sparkles className="w-6 h-6 text-amber-500 absolute inset-0 m-auto animate-pulse" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                BIS Saara AI Parsing Engine
              </h3>
              <p className="text-xs font-mono text-blue-700 font-bold bg-blue-50 py-1.5 px-3 rounded-full inline-block border border-blue-200">
                {processingStage}
              </p>
            </div>
          ) : (
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-6">
              {/* Document Identity Banner */}
              <div className="pb-4 border-b border-slate-200/80">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-lg border border-blue-200">
                    {selectedDoc.applicableIS}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {selectedDoc.effectiveDate}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-950 font-serif leading-snug">
                  {selectedDoc.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Issued by: <span className="font-semibold text-slate-700">{selectedDoc.notifyingMinistry}</span> ({selectedDoc.gazetteRef})
                </p>
              </div>

              {/* Section 1: Executive Digest */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>AI Executive Digest ({lang.toUpperCase()})</span>
                </h4>
                <div className="bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-4 rounded-2xl border border-blue-100/80 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {executiveSummary}
                </div>
              </div>

              {/* Section 2: Key Extracted Clauses */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>Extracted Statutory Clauses</span>
                </h4>
                <div className="space-y-2.5">
                  {selectedDoc.keyClauses.map((clause, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-blue-900 bg-blue-100/70 px-2 py-0.5 rounded font-mono text-[11px]">
                          {clause.clause}
                        </span>
                        <span className="font-bold text-slate-900">{clause.title}</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed pl-1">{clause.requirement}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Scheme of Inspection & Testing (SIT) Parameters */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                  <span>Mandatory In-House & NABL Testing Parameters</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDoc.testingParameters.map((param, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-100 text-xs text-slate-800 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{param}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: MSME Relief & Penalty Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <span className="font-bold text-emerald-900 block mb-1">MSME & Startup Exemptions</span>
                  <p className="text-emerald-800 leading-relaxed font-medium">{selectedDoc.msmeExemptions}</p>
                </div>
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
                  <span className="font-bold text-rose-900 block mb-1">Statutory Penalties (Section 29)</span>
                  <p className="text-rose-800 leading-relaxed font-medium">{selectedDoc.penaltyProvisions}</p>
                </div>
              </div>

              {/* Section 5: Smart Recommendation for Related Standards */}
              {matchedStandard?.relatedStandards && (
                <div className="pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2.5">
                    <Layers className="w-3.5 h-3.5 text-orange-600" />
                    <span>Cross-Referenced Indian Standards</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchedStandard.relatedStandards.map((rel, i) => (
                      <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="font-mono text-xs font-bold text-blue-900">{rel.isNumber}</div>
                          <div className="text-[11px] text-slate-600 truncate">{rel.title}</div>
                        </div>
                        <span className="text-[10px] font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full">
                          {rel.similarity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setActiveTab('assistant');
                    showToast(`Inquiring about ${selectedDoc.applicableIS}`, 'info');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition cursor-pointer shadow-xs"
                >
                  <Bot className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ask BIS Saara AI about this Document</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('standards');
                    showToast('Browsing Standards Catalog', 'info');
                  }}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore in Full Directory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
