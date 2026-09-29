import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  Download, 
  BarChart3, 
  PieChart as PieIcon, 
  MapPin, 
  ShieldCheck, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { Language } from '../types/index.ts';
import { ANALYTICS_DATA } from '../data/bisData.ts';
import { useToast } from '../context/ToastContext.tsx';

interface AnalyticsTabProps {
  lang: Language;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ lang }) => {
  const isHi = lang === 'hi';
  const { showToast } = useToast();
  const [timeRange, setTimeRange] = useState<'6m' | '12m'>('12m');
  const [downloadReportSuccess, setDownloadReportSuccess] = useState(false);

  const displayMonthlyData = timeRange === '6m' 
    ? ANALYTICS_DATA.monthlyApplications.slice(6) 
    : ANALYTICS_DATA.monthlyApplications;

  const handleExport = () => {
    setDownloadReportSuccess(true);
    showToast('Analytics & Compliance Dossier PDF generated!', 'success');
    setTimeout(() => setDownloadReportSuccess(false), 2500);
  };

  const handleRangeChange = (range: '6m' | '12m') => {
    setTimeRange(range);
    showToast(`Displaying trends for ${range === '6m' ? 'Last 6 Months' : 'Full Fiscal Year'}`, 'info');
  };

  return (
    <div className="space-y-6 pb-12 animate-slide-up">
      {/* Top Header & Range Controls */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-blue-700" />
            <span>National Standards & Compliance Intelligence</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950 font-serif">
            {isHi ? 'BIS एनालिटिक्स एवं अनुपालन रुझान' : 'BIS Operations & Compliance Analytics'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time analytics on certification requests, popular standards adoption, and consumer grievance metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs">
            <button
              onClick={() => handleRangeChange('6m')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                timeRange === '6m' ? 'bg-blue-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Last 6 Months
            </button>
            <button
              onClick={() => handleRangeChange('12m')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                timeRange === '12m' ? 'bg-blue-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Last 12 Months
            </button>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>{downloadReportSuccess ? 'Exported PDF Report' : 'Export Analytics'}</span>
          </button>
        </div>
      </div>

      {/* Main Trends Chart */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2 font-serif">
              <TrendingUp className="w-5 h-5 text-blue-700" />
              <span>Certification Applications vs. License Grants vs. Inquiries</span>
            </h3>
            <p className="text-xs text-slate-500">
              Growth trend post-launch of automated digital standards guidance
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-blue-950">
              <span className="w-3 h-3 rounded-full bg-blue-900" /> Applications
            </span>
            <span className="flex items-center gap-1.5 text-emerald-800">
              <span className="w-3 h-3 rounded-full bg-emerald-600" /> Grants
            </span>
            <span className="flex items-center gap-1.5 text-amber-800">
              <span className="w-3 h-3 rounded-full bg-amber-500" /> AI Queries
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={displayMonthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis yAxisId="left" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#d97706" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  borderColor: '#cbd5e1', 
                  borderRadius: '1rem', 
                  fontSize: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
                }} 
              />
              <Line yAxisId="left" type="monotone" dataKey="applications" stroke="#1e3a8a" strokeWidth={3} name="Applications" dot={{ r: 4 }} />
              <Line yAxisId="left" type="monotone" dataKey="grants" stroke="#059669" strokeWidth={3} name="Licenses Granted" dot={{ r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="queries" stroke="#f59e0b" strokeWidth={2.5} strokeDasharray="4 4" name="Consumer Queries" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Top Standards & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Standards Queried */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
          <h3 className="text-base font-bold text-slate-950 mb-1 flex items-center gap-2 font-serif">
            <BarChart3 className="w-5 h-5 text-indigo-700" />
            <span>Most Queried Indian Standards (Monthly Volume)</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            High consumer safety and industrial infrastructure benchmarks
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ANALYTICS_DATA.topStandards} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} width={90} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    borderColor: '#cbd5e1', 
                    borderRadius: '1rem', 
                    fontSize: '12px' 
                  }} 
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {ANALYTICS_DATA.topStandards.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Donut */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
          <h3 className="text-base font-bold text-slate-950 mb-1 flex items-center gap-2 font-serif">
            <PieIcon className="w-5 h-5 text-emerald-700" />
            <span>Certification Applications by Product Category</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Percentage share across key national manufacturing verticals
          </p>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ANALYTICS_DATA.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {ANALYTICS_DATA.categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`${value}% Share`, 'Volume']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    borderColor: '#cbd5e1', 
                    borderRadius: '1rem', 
                    fontSize: '12px' 
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Certification Requests by State (Requested by SIH) */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2 font-serif">
              <MapPin className="w-5 h-5 text-blue-700" />
              <span>Certification Requests by State</span>
            </h3>
            <p className="text-xs text-slate-500">
              State-wise distribution of new manufacturing ISI and CRS certification filings
            </p>
          </div>
          <span className="text-xs font-bold text-blue-900 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
            Total State Requests: 1,770
          </span>
        </div>

        {/* State Bar Chart & Metric Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ANALYTICS_DATA.stateRequests} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="state" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip 
                  formatter={(val: any) => [`${val} Applications`, 'Requests']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    borderColor: '#cbd5e1', 
                    borderRadius: '1rem', 
                    fontSize: '12px' 
                  }} 
                />
                <Bar dataKey="requests" radius={[8, 8, 0, 0]}>
                  {ANALYTICS_DATA.stateRequests.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 gap-2.5">
            {ANALYTICS_DATA.stateRequests.map((st) => (
              <div key={st.state} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: st.fill }} />
                  <span className="text-xs font-bold text-slate-900">{st.state}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-black text-slate-950">{st.requests}</span>
                  <span className="text-[10px] text-slate-400 font-semibold">requests</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Regional Distribution of Licenses */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
        <h3 className="text-base font-bold text-slate-950 mb-1 flex items-center gap-2 font-serif">
          <MapPin className="w-5 h-5 text-rose-600" />
          <span>Regional License Distribution Across BIS Zones</span>
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Empirical coverage of CML licenses across Northern, Western, Southern, Eastern, and Central Zonal Offices
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {ANALYTICS_DATA.zoneDistribution.map((zone, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
              <span className="text-xs text-slate-500 font-medium block mb-1">{zone.zone}</span>
              <div className="text-xl font-black text-slate-900">{zone.licenses.toLocaleString('en-IN')}</div>
              <div className="text-xs font-bold text-blue-700 mt-1">{zone.share} National Share</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
