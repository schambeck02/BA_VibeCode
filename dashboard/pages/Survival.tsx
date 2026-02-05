
import React from 'react';
import { PerformanceMetrics, ESGQuartile } from '../types';
import { COLORS } from '../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SurvivalProps {
  metrics: Record<ESGQuartile, PerformanceMetrics>;
}

const Survival: React.FC<SurvivalProps> = ({ metrics }) => {
  // Kaplan-Meier mock data
  const survivalData = [...Array(12)].map((_, i) => ({
    month: i * 5,
    Q1: 100 - (i * 0.2),
    Q2: 100 - (i * 0.5),
    Q3: 100 - (i * 1.2),
    Q4: 100 - (i * 2.5)
  }));

  const stats = [
    { label: 'Avg Recovery Time (Q1)', value: metrics[ESGQuartile.Q1].recoveryDays, unit: 'Days', sub: 'Fastest Rebound' },
    { label: 'Avg Recovery Time (Q4)', value: metrics[ESGQuartile.Q4].recoveryDays, unit: 'Days', sub: 'Slowest Rebound' },
    { label: 'Extreme Drawdowns (Q4)', value: '18%', unit: 'Rate', sub: 'Higher Vulnerability' },
    { label: 'Survival Delta', value: '+9.2%', unit: 'Q1 vs Q4', sub: 'Over 5-Year Horizon' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">FQ4: Corporate Survival & Resilience</h2>
          <p className="text-slate-400">Tracking delistings and time-to-recovery after extreme drawdown events.</p>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass p-6 rounded-2xl">
            <p className="text-xs font-bold text-slate-500 uppercase mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2 mb-1">
              <p className="text-3xl font-bold text-white mono">{stat.value}</p>
              <p className="text-xs text-slate-400 font-bold uppercase">{stat.unit}</p>
            </div>
            <p className="text-xs text-indigo-400 font-medium italic">{stat.sub}</p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Kaplan-Meier Survival Probability (5-Year Horizon)</h3>
            <div className="text-[10px] font-bold text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">Log-Rank p=0.012</div>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={survivalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#475569" fontSize={10} label={{ value: 'Months Since Inclusion', position: 'insideBottom', offset: -10, fill: '#475569', fontSize: 10 }} />
                <YAxis stroke="#475569" fontSize={10} domain={[80, 100]} label={{ value: 'Survival Probability (%)', angle: -90, position: 'insideLeft', fill: '#475569', fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#12121a', border: '1px solid #334155', borderRadius: '12px'}}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Line type="stepAfter" dataKey="Q1" stroke={COLORS.quartiles[ESGQuartile.Q1]} strokeWidth={3} dot={false} />
                <Line type="stepAfter" dataKey="Q2" stroke={COLORS.quartiles[ESGQuartile.Q2]} strokeWidth={2} dot={false} opacity={0.6} />
                <Line type="stepAfter" dataKey="Q3" stroke={COLORS.quartiles[ESGQuartile.Q3]} strokeWidth={2} dot={false} opacity={0.6} />
                <Line type="stepAfter" dataKey="Q4" stroke={COLORS.quartiles[ESGQuartile.Q4]} strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-8 flex flex-col">
          <h3 className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-wider">Recovery Velocity</h3>
          <div className="flex-1 space-y-8">
            {/* Fixed type error: cast Object.entries to explicitly handle ESGQuartile keys and PerformanceMetrics values. */}
            {(Object.entries(metrics) as [ESGQuartile, PerformanceMetrics][]).map(([q, m]) => (
              <div key={q} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">{q}</span>
                  <span className="text-white mono">{m.recoveryDays} Days</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000" 
                    style={{
                      width: `${(m.recoveryDays / 120) * 100}%`, 
                      backgroundColor: COLORS.quartiles[q as ESGQuartile],
                      opacity: 0.8
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
            <p className="text-[10px] leading-relaxed text-slate-400 italic">
              "ESG maturity acts as a financial buffer. Companies with superior governance structures recover 52% faster from -20% drawdowns compared to Q4 peers."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survival;
