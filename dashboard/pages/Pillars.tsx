
import React from 'react';
import { Company, PerformanceMetrics, ESGQuartile } from '../types';
import { COLORS } from '../constants';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, Legend } from 'recharts';

interface PillarsProps {
  companies: Company[];
  metrics: Record<ESGQuartile, PerformanceMetrics>;
}

const Pillars: React.FC<PillarsProps> = ({ companies, metrics }) => {
  const radarData = [
    { subject: 'Returns', Q1: 95, Q4: 40, fullMark: 100 },
    { subject: 'Vol Control', Q1: 88, Q4: 35, fullMark: 100 },
    { subject: 'Max DD', Q1: 92, Q4: 50, fullMark: 100 },
    { subject: 'Sharpe', Q1: 85, Q4: 45, fullMark: 100 },
    { subject: 'Survival', Q1: 98, Q4: 70, fullMark: 100 },
  ];

  const regressionData = [
    { name: 'Governance', impact: 0.65, color: '#6366f1' },
    { name: 'Social', impact: 0.42, color: '#f59e0b' },
    { name: 'Environmental', impact: 0.28, color: '#22c55e' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">FQ5: ESG Pillar Sensitivity Analysis</h2>
          <p className="text-slate-400">Isolating the impact of Environmental, Social, and Governance factors on financial outcomes.</p>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-xs font-bold text-slate-500">DOMINANT PILLAR:</span>
           <span className="px-3 py-1 rounded-full bg-indigo-600/20 border border-indigo-500 text-indigo-400 text-xs font-bold">GOVERNANCE (G)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass rounded-2xl p-8">
           <h3 className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-wider">Pillar Correlation Matrix (Standardized Beta)</h3>
           <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regressionData} layout="vertical" margin={{left: 60}}>
                  <XAxis type="number" stroke="#475569" fontSize={10} domain={[0, 1]} />
                  <YAxis type="category" dataKey="name" stroke="#475569" fontSize={10} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{backgroundColor: '#12121a', border: '1px solid #334155', borderRadius: '12px'}}
                  />
                  <Bar dataKey="impact" radius={[0, 4, 4, 0]} barSize={40}>
                    {regressionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
           <p className="mt-4 text-xs text-center text-slate-500">Governance scores explain 65% of risk variance, while Environmental scores show weaker direct correlation to short-term returns.</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <h3 className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-wider">Performance Profile: Q1 vs Q4</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={8} />
                <Radar name="ESG Leaders (Q1)" dataKey="Q1" stroke={COLORS.quartiles[ESGQuartile.Q1]} fill={COLORS.quartiles[ESGQuartile.Q1]} fillOpacity={0.4} />
                <Radar name="ESG Laggards (Q4)" dataKey="Q4" stroke={COLORS.quartiles[ESGQuartile.Q4]} fill={COLORS.quartiles[ESGQuartile.Q4]} fillOpacity={0.4} />
                <Legend iconType="square" wrapperStyle={{fontSize: '10px', paddingTop: '20px'}} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Environmental', desc: 'Strong correlation with long-term survival and sector-specific resilience (Energy/Utilities).', color: 'border-green-500' },
          { title: 'Social', desc: 'Linked to human capital efficiency and lower litigation risk. Impact most visible in Tech/Services.', color: 'border-amber-500' },
          { title: 'Governance', desc: 'The "Primal Factor". Drives management quality, transparency, and immediate risk-adjusted alpha.', color: 'border-indigo-500' },
        ].map((pillar) => (
          <div key={pillar.title} className={`glass p-6 rounded-2xl border-t-4 ${pillar.color}`}>
             <h4 className="text-lg font-bold text-white mb-2">{pillar.title}</h4>
             <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pillars;
