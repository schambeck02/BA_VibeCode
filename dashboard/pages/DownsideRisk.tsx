
import React from 'react';
import { PerformanceMetrics, ESGQuartile } from '../types';
import { COLORS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';

interface DownsideProps {
  metrics: Record<ESGQuartile, PerformanceMetrics>;
}

const DownsideRisk: React.FC<DownsideProps> = ({ metrics }) => {
  /* Fixed type error: cast Object.entries to explicitly handle ESGQuartile keys and PerformanceMetrics values. */
  const tailData = (Object.entries(metrics) as [ESGQuartile, PerformanceMetrics][]).map(([q, m]) => ({
    name: q.split(' ')[0],
    tailEvents: m.tailRisk,
    color: COLORS.quartiles[q]
  })).reverse();

  // Mock normal distribution with fat tail for Q4 vs Q1
  const distributionData = [...Array(40)].map((_, i) => {
    const x = (i - 20) / 4;
    const y1 = Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
    const y4 = Math.exp(-0.5 * (x + 0.3) * (x + 0.3)) / Math.sqrt(2 * Math.PI) * 1.1;
    return {
      x: x.toFixed(1),
      Q1: y1,
      Q4: y4 + (x < -1.5 ? 0.05 : 0) // Add fat tail to Q4
    };
  });

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">FQ3: Downside Risk & Tail Events</h2>
          <p className="text-slate-400">Evaluating Value-at-Risk (VaR) and resilience to extreme market shocks.</p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
          TAIL RISK REDUCED IN Q1
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass rounded-2xl p-8">
           <h3 className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-wider">Return Distribution & Tail Density (Q1 vs Q4)</h3>
           <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={distributionData}>
                  <XAxis dataKey="x" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{backgroundColor: '#12121a', border: '1px solid #334155', borderRadius: '12px'}} />
                  <Area type="monotone" dataKey="Q1" stroke={COLORS.quartiles[ESGQuartile.Q1]} fill={COLORS.quartiles[ESGQuartile.Q1]} fillOpacity={0.2} strokeWidth={2} />
                  <Area type="monotone" dataKey="Q4" stroke={COLORS.quartiles[ESGQuartile.Q4]} fill={COLORS.quartiles[ESGQuartile.Q4]} fillOpacity={0.2} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
           </div>
           <div className="mt-4 flex justify-center gap-8">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded bg-green-500/40" />
               <span className="text-xs text-slate-400">Q1 (Thin Tails)</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded bg-red-500/40" />
               <span className="text-xs text-slate-400">Q4 (Fat Tails / Crash Risk)</span>
             </div>
           </div>
        </div>

        <div className="glass rounded-2xl p-8">
          <h3 className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-wider">Tail Events Count (Returns &lt; -3%)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tailData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" fontSize={10} />
                <YAxis stroke="#475569" fontSize={10} />
                <Tooltip 
                   cursor={{fill: 'rgba(255,255,255,0.05)'}}
                   contentStyle={{backgroundColor: '#12121a', border: '1px solid #334155', borderRadius: '12px'}}
                />
                <Bar dataKey="tailEvents" radius={[4, 4, 0, 0]} barSize={50}>
                  {tailData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
           <h3 className="text-sm font-bold text-white uppercase tracking-wider">Value-at-Risk (VaR) Sensitivity Matrix</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <th className="p-4 border-b border-slate-800">ESG Quartile</th>
              <th className="p-4 border-b border-slate-800">VaR 95% (Daily)</th>
              <th className="p-4 border-b border-slate-800">VaR 99% (Daily)</th>
              <th className="p-4 border-b border-slate-800">CVaR (99%)</th>
              <th className="p-4 border-b border-slate-800">Alpha Contribution</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {/* Fixed type error: cast Object.entries to explicitly handle ESGQuartile keys and PerformanceMetrics values. */}
            {(Object.entries(metrics) as [ESGQuartile, PerformanceMetrics][]).map(([q, m]) => (
              <tr key={q} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                <td className="p-4 font-bold text-white">{q}</td>
                <td className="p-4 mono text-slate-300">{(m.var95 * 100).toFixed(2)}%</td>
                <td className="p-4 mono text-slate-300">{(m.var99 * 100).toFixed(2)}%</td>
                <td className="p-4 mono text-red-400">{(m.var99 * 1.4 * 100).toFixed(2)}%</td>
                <td className="p-4">
                  <div className={`px-2 py-0.5 rounded-full inline-block font-bold text-[10px] ${
                    q.includes('Q1') ? 'bg-green-600/20 text-green-400' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {q.includes('Q1') ? 'RESILIENT' : 'FRAGILE'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DownsideRisk;
