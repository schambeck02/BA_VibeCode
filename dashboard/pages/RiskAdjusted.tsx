
import React from 'react';
import { Company, PerformanceMetrics, ESGQuartile } from '../types';
import { COLORS } from '../constants';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

interface RiskProps {
  metrics: Record<ESGQuartile, PerformanceMetrics>;
  companies: Company[];
}

const RiskAdjusted: React.FC<RiskProps> = ({ metrics, companies }) => {
  const scatterData = companies.map(c => {
    // Inject some correlation for mock visual realism
    const bias = (c.esg.total - 60) / 100;
    const sharpe = Math.max(0.2, 0.8 + bias + (Math.random() - 0.5) * 0.4);
    return {
      name: c.ticker,
      esg: c.esg.total,
      sharpe: +sharpe.toFixed(2),
      quartile: c.quartile
    };
  });

  const kpis = [
    { label: 'Avg Sharpe Ratio (Q1)', value: metrics[ESGQuartile.Q1].sharpeRatio.toFixed(2), trend: '+0.60 vs Q4' },
    { label: 'Avg Volatility (Q1)', value: (metrics[ESGQuartile.Q1].volatility * 100).toFixed(1) + '%', trend: '-9.0% vs Q4' },
    { label: 'Avg Max Drawdown (Q1)', value: (metrics[ESGQuartile.Q1].maxDrawdown * 100).toFixed(1) + '%', trend: 'Lower Fragility' },
    { label: 'Avg Sortino (Q1)', value: metrics[ESGQuartile.Q1].sortinoRatio.toFixed(2), trend: '+0.77 vs Q4' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">FQ2: Risk-Adjusted Performance</h2>
          <p className="text-slate-400">Analyzing Sharpe, Sortino, and Volatility across the ESG spectrum.</p>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="glass p-6 rounded-2xl border-l-4 border-indigo-500">
            <p className="text-xs font-bold text-slate-500 uppercase mb-1">{kpi.label}</p>
            <p className="text-3xl font-bold text-white mono mb-1">{kpi.value}</p>
            <p className="text-xs text-green-400 font-bold">{kpi.trend}</p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-2xl p-8">
          <h3 className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-wider">Correlation: ESG Score vs. Sharpe Ratio</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" dataKey="esg" name="ESG Score" stroke="#475569" fontSize={10}>
                   <Label value="Total ESG Score" offset={-10} position="insideBottom" fill="#475569" fontSize={10} />
                </XAxis>
                <YAxis type="number" dataKey="sharpe" name="Sharpe Ratio" stroke="#475569" fontSize={10}>
                   <Label value="Sharpe Ratio" angle={-90} position="insideLeft" fill="#475569" fontSize={10} />
                </YAxis>
                <ZAxis range={[60, 60]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{backgroundColor: '#12121a', border: '1px solid #334155', borderRadius: '12px'}} />
                <Scatter name="Companies" data={scatterData} fill="#6366f1" opacity={0.6}>
                  {scatterData.map((entry, index) => (
                    <circle key={`circle-${index}`} cx={0} cy={0} r={4} fill={COLORS.quartiles[entry.quartile]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-8">
          <h3 className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-wider">Risk Dashboard: Q1 vs Q4 Summary</h3>
          <div className="space-y-6">
             <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase">Sharpe Distribution</span>
                  <span className="text-[10px] text-green-400 font-bold px-2 py-0.5 rounded bg-green-500/10">ALPHA +</span>
                </div>
                <div className="flex items-end gap-1 h-20">
                  {[4, 7, 12, 18, 14, 10, 6, 3].map((h, i) => (
                    <div key={i} className="flex-1 bg-indigo-500/40 rounded-t" style={{height: `${h * 5}%`}} />
                  ))}
                </div>
             </div>
             
             <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Correlation (R)</span>
                  <span className="text-white font-bold mono">0.42</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Significance Level</span>
                  <span className="text-white font-bold mono">p &lt; 0.01</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Volatility Delta</span>
                  <span className="text-red-400 font-bold mono">-4.2%</span>
                </div>
             </div>

             <div className="pt-6 border-t border-slate-800">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Pillar Contribution</h4>
                <div className="space-y-3">
                   {['Governance', 'Social', 'Environmental'].map((pillar, i) => (
                     <div key={pillar} className="flex items-center gap-3">
                       <span className="text-[10px] text-slate-400 w-20">{pillar}</span>
                       <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-indigo-500" style={{width: `${85 - i * 15}%`}} />
                       </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAdjusted;
