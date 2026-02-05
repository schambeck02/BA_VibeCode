
import React from 'react';
import { Company, DailyReturn } from '../types';
import { COLORS } from '../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';
import { generateTimeSeries } from '../mockData';

interface CompanyDeepDiveProps {
  company: Company;
  onBack: () => void;
}

const CompanyDeepDive: React.FC<CompanyDeepDiveProps> = ({ company, onBack }) => {
  const timeData = generateTimeSeries(100);
  
  const esgProfile = [
    { subject: 'Environmental', value: company.esg.environmental, full: 100 },
    { subject: 'Social', value: company.esg.social, full: 100 },
    { subject: 'Governance', value: company.esg.governance, full: 100 },
    { subject: 'Sector Avg', value: 65, full: 100 },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to Universe
      </button>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-2xl font-black text-white italic">
               {company.ticker[0]}
             </div>
             <div>
               <h2 className="text-3xl font-bold text-white">{company.name}</h2>
               <div className="flex gap-3 text-sm">
                 <span className="text-slate-400 font-medium">{company.sector}</span>
                 <span className="text-slate-600">•</span>
                 <span className="font-bold uppercase tracking-widest text-[10px] px-2 py-0.5 rounded bg-slate-800" style={{color: COLORS.quartiles[company.quartile]}}>
                   {company.quartile}
                 </span>
               </div>
             </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
             {[
               { label: 'Total Score', value: company.esg.total.toFixed(1) },
               { label: 'YTD Return', value: '+14.2%', color: 'text-green-400' },
               { label: 'Volatility', value: '18.4%', color: 'text-amber-400' },
               { label: 'Market Cap', value: '$1.4T' },
             ].map((kpi, idx) => (
               <div key={idx} className="glass p-4 rounded-xl border border-slate-800">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{kpi.label}</p>
                 <p className={`text-xl font-bold ${kpi.color || 'text-white'} mono`}>{kpi.value}</p>
               </div>
             ))}
          </div>
        </div>

        <div className="w-full md:w-80 glass rounded-2xl p-6">
           <h3 className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-wider text-center">ESG Pillar Breakdown</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <RadarChart cx="50%" cy="50%" outerRadius="80%" data={esgProfile}>
                 <PolarGrid stroke="#334155" />
                 <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                 <Radar 
                    name={company.ticker} 
                    dataKey="value" 
                    stroke={COLORS.quartiles[company.quartile]} 
                    fill={COLORS.quartiles[company.quartile]} 
                    fillOpacity={0.4} 
                 />
               </RadarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-2xl p-8">
           <h3 className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-wider">Historical Performance (Indexed)</h3>
           <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="date" stroke="#475569" fontSize={10} hide />
                  <YAxis stroke="#475569" fontSize={10} domain={['auto', 'auto']} />
                  <Tooltip 
                     contentStyle={{backgroundColor: '#12121a', border: '1px solid #334155', borderRadius: '12px'}}
                  />
                  <Area type="monotone" dataKey="return" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="glass rounded-2xl p-8 space-y-6">
           <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Analysis Benchmarks</h3>
           <div className="space-y-4">
              {[
                { label: 'Sector Performance', value: 'Outperforming', sub: '+2.4% vs Avg' },
                { label: 'Risk Sensitivity', value: 'Defensive', sub: 'Beta 0.88' },
                { label: 'Governance Rank', value: 'Top 5%', sub: 'Within Sector' },
              ].map((b, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                   <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">{b.label}</p>
                   <p className="text-sm font-bold text-white mb-0.5">{b.value}</p>
                   <p className="text-[10px] text-indigo-400 font-medium">{b.sub}</p>
                </div>
              ))}
           </div>
           <div className="pt-4 border-t border-slate-800">
             <div className="flex items-center gap-2 mb-2 text-amber-400">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
               <span className="text-[10px] font-bold uppercase tracking-widest">Tail Risk Alert</span>
             </div>
             <p className="text-[10px] text-slate-500 leading-relaxed">
               Despite high G-Score, recent carbon emission disclosure delays in Q4 2025 might impact near-term E-Score stability.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDeepDive;
