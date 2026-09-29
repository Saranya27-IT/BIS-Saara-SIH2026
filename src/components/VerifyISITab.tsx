import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  QrCode, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  Calendar, 
  Building, 
  FileCheck, 
  UploadCloud, 
  X, 
  Camera, 
  AlertOctagon,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { ActiveTab, Language } from '../types/index.ts';
import { MOCK_LICENSES, ISILicense } from '../data/bisData.ts';
import { useToast } from '../context/ToastContext.tsx';

interface VerifyISITabProps {
  setActiveTab: (tab: ActiveTab) => void;
  lang: Language;
}

export const VerifyISITab: React.FC<VerifyISITabProps> = ({ setActiveTab, lang }) => {
  const isHi = lang === 'hi';
  const { showToast } = useToast();
  const [inputCode, setInputCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<ISILicense | null>(MOCK_LICENSES[0]);
  const [notFoundQuery, setNotFoundQuery] = useState<string | null>(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportSuccessCode, setReportSuccessCode] = useState<string | null>(null);

  // Form states for reporting fake ISI mark
  const [reportForm, setReportForm] = useState({
    shopName: '',
    city: '',
    productName: '',
    reason: 'Counterfeit ISI Mark without CML Number',
    comments: ''
  });

  const handleVerify = (codeToTest?: string) => {
    const code = (codeToTest || inputCode).trim().toUpperCase();
    if (!code) {
      showToast('Please enter a CML Number or Hallmark HUID', 'error');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      // Search in mock licenses by CML or HUID
      const found = MOCK_LICENSES.find(
        lic => lic.cmlNumber.toUpperCase() === code || 
               (lic.huid && lic.huid.toUpperCase() === code) ||
               code.includes(lic.cmlNumber.split('-')[1] || 'XYZ')
      );

      if (found) {
        setResult(found);
        setNotFoundQuery(null);
        if (found.status === 'Genuine' || found.status === 'Certified' || found.status === 'VALID') {
          showToast(`License ${found.cmlNumber} verified: ${found.status.toUpperCase()}!`, 'success');
        } else if (found.status === 'EXPIRED') {
          showToast(`Warning: License ${found.cmlNumber} has EXPIRED!`, 'error');
        } else {
          showToast(`Alert: License ${found.cmlNumber} is SUSPENDED or INVALID!`, 'error');
        }
      } else {
        setResult(null);
        setNotFoundQuery(code);
        showToast(`CRITICAL: License ${code} is NOT REGISTERED with BIS!`, 'error');
      }
    }, 450);
  };

  const handleScanSimulation = () => {
    setIsScanning(true);
    showToast('Camera active: Align product QR code or ISI badge...', 'info');
    setTimeout(() => {
      setIsScanning(false);
      const randomLic = MOCK_LICENSES[Math.floor(Math.random() * MOCK_LICENSES.length)];
      setInputCode(randomLic.cmlNumber);
      setResult(randomLic);
      setNotFoundQuery(null);
      showToast(`Scanned product barcode: ${randomLic.cmlNumber}`, 'success');
    }, 1800);
  };

  const submitReport = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedTicket = `BIS-GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setReportSuccessCode(generatedTicket);
    showToast(`Grievance ${generatedTicket} submitted to BIS Enforcement!`, 'success');
    setTimeout(() => {
      setReportModalOpen(false);
      setReportSuccessCode(null);
      setReportForm({
        shopName: '',
        city: '',
        productName: '',
        reason: 'Counterfeit ISI Mark without CML Number',
        comments: ''
      });
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-slide-up">
      {/* Top Verification Card */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
        <div className="max-w-2xl mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>National ISI & Gold HUID Verification Portal</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950 font-serif">
            {isHi ? 'ISI मार्क और स्वर्ण HUID प्रामाणिकता जांच' : 'Verify ISI Mark & Gold HUID Authenticity'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {isHi 
              ? 'उत्पाद पर मुद्रित 7-अंकीय CML नंबर (CM/L-XXXXXXX) या 6-अंकीय आभूषण HUID दर्ज करें।'
              : 'Enter the 7-digit Certification Marks Licence (CM/L-XXXXXXX) or 6-digit Hallmark HUID from any product.'}
          </p>
        </div>

        {/* Input & Scanner Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="e.g. CM/L-7824912, CM/L-9128374, or HUID: A7B2K9"
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-300 text-xs sm:text-sm font-mono uppercase focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-slate-50/80 font-bold"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => handleVerify()}
              className="flex-1 sm:flex-none px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-all duration-200 cursor-pointer"
            >
              Verify License
            </button>

            <button
              onClick={handleScanSimulation}
              disabled={isScanning}
              className="px-4 py-3 rounded-2xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2 shadow-2xs"
              title="Simulate Camera Scanner"
            >
              <QrCode className="w-5 h-5 text-blue-700" />
              <span className="hidden sm:inline">Scan QR</span>
            </button>
          </div>
        </div>

        {/* QR Scan Simulator overlay */}
        {isScanning && (
          <div className="p-6 bg-slate-950 rounded-2xl text-white text-center space-y-3 mb-4 border border-blue-900/60 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
            {/* Moving laser beam */}
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent absolute top-1/2 -translate-y-1/2 animate-pulse" />
            <Camera className="w-9 h-9 text-amber-400 mx-auto" />
            <div className="text-sm font-mono text-emerald-400 font-bold">
              Camera Optical Recognition Active...
            </div>
            <p className="text-xs text-slate-400">
              Decoding 2D Datamatrix and BIS Security Mark
            </p>
          </div>
        )}

        {/* Sample presets */}
        <div className="pt-3.5 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 block mb-2">
            Try Demo License Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {MOCK_LICENSES.map((lic) => {
              const isGood = lic.status === 'Genuine' || lic.status === 'Certified' || lic.status === 'VALID';
              const isExp = lic.status === 'EXPIRED';

              return (
                <button
                  key={lic.cmlNumber}
                  onClick={() => {
                    setInputCode(lic.cmlNumber);
                    handleVerify(lic.cmlNumber);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-xl border font-mono transition-all cursor-pointer font-bold ${
                    isGood
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                      : isExp
                      ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                      : 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100'
                  }`}
                >
                  {lic.cmlNumber} → {lic.status}
                </button>
              );
            })}
            <button
              onClick={() => {
                setInputCode('ISI00000000');
                handleVerify('ISI00000000');
              }}
              className="text-xs px-3 py-1.5 rounded-xl border bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100 font-mono transition-all cursor-pointer font-bold"
            >
              ISI00000000 → Unregistered Fake
            </button>
          </div>
        </div>
      </div>

      {/* Loading Skeleton during verification */}
      {isVerifying && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl shimmer" />
            <div className="space-y-2">
              <div className="w-48 h-5 rounded shimmer" />
              <div className="w-32 h-3 rounded shimmer" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-28 rounded-2xl shimmer" />
            <div className="h-28 rounded-2xl shimmer" />
          </div>
        </div>
      )}

      {/* Verification Result Display */}
      {!isVerifying && result && (() => {
        const isAuthentic = result.status === 'Genuine' || result.status === 'Certified' || result.status === 'VALID';
        const isExpired = result.status === 'EXPIRED';

        return (
          <div className={`bg-white rounded-3xl border p-6 sm:p-7 shadow-md transition-all ${
            isAuthentic
              ? 'border-emerald-300 ring-4 ring-emerald-500/10'
              : isExpired
              ? 'border-amber-300 ring-4 ring-amber-500/10'
              : 'border-rose-300 ring-4 ring-rose-500/10'
          }`}>
            {/* Status Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className={`w-13 h-13 rounded-2xl flex items-center justify-center text-white shadow-md ${
                  isAuthentic
                    ? 'bg-emerald-600 shadow-emerald-600/20'
                    : isExpired
                    ? 'bg-amber-500 shadow-amber-500/20'
                    : 'bg-rose-600 shadow-rose-600/20'
                }`}>
                  {isAuthentic ? (
                    <CheckCircle2 className="w-7 h-7" />
                  ) : isExpired ? (
                    <AlertTriangle className="w-7 h-7" />
                  ) : (
                    <XCircle className="w-7 h-7" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950 font-serif">{result.brandName}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                      isAuthentic
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : isExpired
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      {result.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Licence Identifier: <span className="font-bold text-slate-800">{result.cmlNumber}</span>
                  </p>
                </div>
              </div>

              {!isAuthentic && (
                <button
                  onClick={() => setReportModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md shadow-rose-600/20"
                >
                  <AlertOctagon className="w-4 h-4" />
                  <span>Report Counterfeit / Non-Compliance</span>
                </button>
              )}
            </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5 text-xs sm:text-sm">
            <div className="space-y-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
              <div>
                <span className="text-slate-400 block text-xs font-medium">Manufacturer Name:</span>
                <span className="font-bold text-slate-900">{result.manufacturerName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs font-medium">Standard Conformance:</span>
                <span className="font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  {result.isNumber}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs font-medium">Certified Product Description:</span>
                <span className="font-semibold text-slate-700">{result.productName}</span>
              </div>
            </div>

            <div className="space-y-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-xs font-medium">Factory Premises:</span>
                  <span className="font-semibold text-slate-800">
                    {result.factoryAddress}, {result.district}, {result.state}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-xs font-medium">License Validity Window:</span>
                  <span className="font-bold text-slate-800">
                    {result.validFrom} to {result.validUpto}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-xs font-medium">Surveillance Test Audit:</span>
                  <span className="font-semibold text-slate-700">
                    {result.inspectionRating} (Tested {result.lastTestedDate})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Remarks & Warning Note */}
          <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
            isAuthentic
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 font-medium'
              : 'bg-rose-50/70 border-rose-200 text-rose-950 font-medium'
          }`}>
            <span className="font-bold">Official Note: </span>
            <span>{result.remarks}</span>
          </div>
        </div>
        );
      })()}

      {/* Unregistered / Counterfeit Alert if not found */}
      {!isVerifying && notFoundQuery && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-7 shadow-sm text-center space-y-4 animate-slide-up">
          <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center shadow-inner">
            <AlertOctagon className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-rose-950 font-serif">
              License "{notFoundQuery}" NOT Found in BIS Database!
            </h3>
            <p className="text-xs sm:text-sm text-rose-800 max-w-lg mx-auto mt-1 leading-relaxed">
              Warning: This product is not registered under the Bureau of Indian Standards. Using an uncertified ISI mark or invalid HUID is an unlawful cognizable offense under Section 29 of the BIS Act 2016.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setReportModalOpen(true)}
              className="px-6 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Report Fake Product to BIS Enforcement</span>
            </button>
            <button
              onClick={() => setNotFoundQuery(null)}
              className="px-4 py-2.5 rounded-xl bg-white border border-rose-300 text-rose-800 text-xs font-bold hover:bg-rose-100/50 transition cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-slide-up">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setReportModalOpen(false)}
              className="absolute right-5 top-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {reportSuccessCode ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  Grievance Registered Successfully!
                </h3>
                <p className="text-xs text-slate-500">
                  Your counterfeit report has been dispatched to the BIS Regional Enforcement Cell.
                </p>
                <div className="bg-slate-100 p-3 rounded-2xl border border-slate-200 font-mono text-sm font-bold text-blue-900">
                  Tracking ID: {reportSuccessCode}
                </div>
              </div>
            ) : (
              <form onSubmit={submitReport} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-950 font-serif flex items-center gap-2">
                    <AlertOctagon className="w-5 h-5 text-rose-600" />
                    <span>Report Fake or Counterfeit ISI Product</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Complaints are addressed under Section 29 of the BIS Act 2016.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Suspect Brand / Product Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={reportForm.productName}
                    onChange={(e) => setReportForm({ ...reportForm, productName: e.target.value })}
                    placeholder="e.g. PureWater packaged jar, Rider Helmet"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Shop or Vendor Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={reportForm.shopName}
                      onChange={(e) => setReportForm({ ...reportForm, shopName: e.target.value })}
                      placeholder="e.g. Verma General Store"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City / District:
                    </label>
                    <input
                      type="text"
                      required
                      value={reportForm.city}
                      onChange={(e) => setReportForm({ ...reportForm, city: e.target.value })}
                      placeholder="e.g. Pune, Jaipur, Lucknow"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Violation Nature:
                  </label>
                  <select
                    value={reportForm.reason}
                    onChange={(e) => setReportForm({ ...reportForm, reason: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 font-medium"
                  >
                    <option>Counterfeit ISI Mark without CML Number</option>
                    <option>Expired or Suspended License being sold</option>
                    <option>Sub-standard quality / hazardous product</option>
                    <option>Missing 6-digit Gold HUID number</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Upload Photo of Product / Label (Simulated):
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center text-xs text-slate-500 hover:bg-slate-50 cursor-pointer">
                    <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <span>Click or drag product image to attach</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Submit Grievance to BIS
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
