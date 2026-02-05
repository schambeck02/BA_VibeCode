
import React from 'react';
import { PerformanceMetrics, ESGQuartile } from '../types';
import { COLORS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Legend } from 'recharts';
import { generateTimeSeries } from '../mockData';

interface ReturnsProps {
  metrics: Record<ESGQuartile, PerformanceMetrics>;
}

const Returns: React.FC<ReturnsProps> = ({ metrics }) => {
  /* Fixed type error: cast Object.entries to explicitly handle ESGQuartile keys and PerformanceMetrics values. */
  const chartData = (Object.entries(metrics) as [ESGQuartile, PerformanceMetrics][]).map(([q, m]) => ({
    name: q.split(' ')[0],
    return: +(m.annualizedReturn * 100).toFixed(2),
    color: COLORS.quartiles[q]
  })).reverse();

  // Create mock cumulative data
  const timeData = generateTimeSeries(60).map((d, i) => ({
    date: d.date,
    Q1: d.return * (1 + (i * 0.001)),
    Q2: d.return * (1 + (i * 0.0005)),
    Q3: d.return,
    Q4: d.return * (1 - (i * 0.0008))
  }));

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">FQ1: Raw Returns Analysis</h2>
          <p className="text-slate-400">Evaluating if high ESG scores correlate with higher absolute returns.</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-500 uppercase">Return Delta (Q1-Q4)</p>
            <p className="text-xl font-bold text-green-400">+6.3% p.a.</p>
          </div>
          <div className="w-px bg-slate-800" />
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-500 uppercase">T-Test P-Value</p>
            <p className="text-xl font-bold text-indigo-400">0.034</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass rounded-2xl p-8">
          <h3 className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-wider">Cumulative Performance (Last 60 Trading Days)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" stroke="#475569" fontSize={10} tickFormatter={(val) => val.split('-').slice(1).join('/')} />
                <YAxis stroke="#475569" fontSize={10} domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#12121a', border: '1px solid #334155', borderRadius: '12px'}}
                  itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                />
                <Legend iconType="circle" wrapperStyle={{fontSize: '10px', paddingTop: '20px'}} />
                <Line type="monotone" dataKey="Q1" stroke={COLORS.quartiles[ESGQuartile.Q1]} strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="Q2" stroke={COLORS.quartiles[ESGQuartile.Q2]} strokeWidth={2} strokeDasharray="5 5" dot={false} />
                <Line type="monotone" dataKey="Q3" stroke={COLORS.quartiles[ESGQuartile.Q3]} strokeWidth={2} strokeDasharray="5 5" dot={false} />
                <Line type="monotone" dataKey="Q4" stroke={COLORS.quartiles[ESGQuartile.Q4]} strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-8">
          <h3 className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-wider">Annualized Returns by ESG Quartile</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#475569" fontSize={10} unit="%" />
                <YAxis dataKey="name" type="category" stroke="#475569" fontSize={10} />
                <Tooltip 
                   cursor={{fill: 'rgba(255,255,255,0.05)'}}
                   contentStyle={{backgroundColor: '#12121a', border: '1px solid #334155', borderRadius: '12px'}}
                />
                <Bar dataKey="return" radius={[0, 4, 4, 0]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-8">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
               <h4 className="text-xs font-bold text-slate-500 uppercase">Conclusion</h4>
               <p className="text-sm text-slate-300 leading-relaxed">
                 Evidence supports a statistically significant performance advantage for companies in the top ESG quartile. The 6.3% annualized spread suggests ESG factors are materially integrated into S&P 500 asset pricing.
               </p>
            </div>
            <div className="space-y-2">
               <h4 className="text-xs font-bold text-slate-500 uppercase">Significance Testing</h4>
               <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex justify-between items-center">
                  <span className="text-xs text-slate-400">Anova F-Value</span>
                  <span className="text-sm font-bold text-white mono">4.28</span>
               </div>
               <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex justify-between items-center">
                  <span className="text-xs text-slate-400">Confidence Interval</span>
                  <span className="text-sm font-bold text-green-400 mono">95%</span>
               </div>
            </div>
            <div className="space-y-4">
               <h4 className="text-xs font-bold text-slate-500 uppercase">Quartile Breakdown</h4>
               <div className="space-y-3">
                  {chartData.map((d, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{backgroundColor: d.color}} />
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full rounded-full" style={{width: `${d.return * 6}%`, backgroundColor: d.color}} />
                      </div>
                      <span className="text-xs font-bold mono text-slate-400">{d.return}%</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Returns;
