
import React, { useState, useEffect } from 'react';
import { Company, PerformanceMetrics, ESGQuartile } from '../types';
import { COLORS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { geminiService } from '../services/geminiService';

interface OverviewProps {
  companies: Company[];
  metrics: Record<ESGQuartile, PerformanceMetrics>;
  setActiveTab: (tab: string) => void;
  onCompanyClick: (ticker: string) => void;
}

const Overview: React.FC<OverviewProps> = ({ companies, metrics, setActiveTab, onCompanyClick }) => {
  const [aiInsight, setAiInsight] = useState("Analyzing correlations...");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const runAnalysis = async () => {
      const summaryText = `Q1 Returns: ${(metrics[ESGQuartile.Q1].annualizedReturn * 100).toFixed(1)}%, Q4: ${(metrics[ESGQuartile.Q4].annualizedReturn * 100).toFixed(1)}%. Sharpe ratio delta: ${metrics[ESGQuartile.Q1].sharpeRatio - metrics[ESGQuartile.Q4].sharpeRatio}.`;
      const result = await geminiService.analyzeESGResults(summaryText);
      setAiInsight(result || "Analysis complete.");
    };
    runAnalysis();
  }, [metrics]);

  const kpis = [
    { label: 'Total Companies', value: '500', sub: 'S&P 500 Components' },
    { label: 'Avg ESG Score', value: '62.4', sub: '+4.2% YoY Improvement' },
    { label: 'Analysis Period', value: '5Y', sub: 'Feb 2021 - Feb 2026' },
    { label: 'Alpha Generated', value: '+6.3%', sub: 'Q1 vs Market Benchmark' },
  ];

  const researchQuestions = [
    { id: 'returns', fq: 'FQ1: Raw Returns', answer: 'YES', evidence: 3, text: 'High ESG scores show strong return correlation.' },
    { id: 'risk', fq: 'FQ2: Risk-Adjusted', answer: 'YES', evidence: 3, text: 'Lower volatility and higher Sharpe ratios in Q1.' },
    { id: 'downside', fq: 'FQ3: Downside Risk', answer: 'PARTIAL', evidence: 2, text: 'VaR is reduced, but tail events persist globally.' },
    { id: 'survival', fq: 'FQ4: Survival', answer: 'YES', evidence: 3, text: 'Lower delisting rates among ESG leaders.' },
    { id: 'pillars', fq: 'FQ5: Strongest Pillar', answer: 'G', evidence: 3, text: 'Governance shows most consistent risk reduction.' },
  ];

  const filteredCompanies = companies.filter(c => 
    c.ticker.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 10);

  /* Fixed type error: cast Object.entries to explicitly handle ESGQuartile keys and PerformanceMetrics values. */
  const chartData = (Object.entries(metrics) as [ESGQuartile, PerformanceMetrics][]).map(([q, m]) => ({
    quartile: q.split(' ')[0],
    return: +(m.annualizedReturn * 100).toFixed(2),
    color: COLORS.quartiles[q]
  })).reverse();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="glass p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="M2 12h20"/><path d="m5 7 3 5-3 5"/><path d="m19 7-3 5 3 5"/></svg>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{kpi.label}</p>
            <p className="text-3xl font-bold text-white mono mb-1">{kpi.value}</p>
            <p className="text-xs text-slate-400 font-medium">{kpi.sub}</p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 glass rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-white">Research Question Summary</h2>
              <p className="text-sm text-slate-400">Analysis of ESG correlation across performance pillars.</p>
            </div>
          </div>

          <div className="space-y-4">
            {researchQuestions.map((q) => (
              <div 
                key={q.id} 
                onClick={() => setActiveTab(q.id)}
                className="group flex items-center justify-between p-4 rounded-xl border border-slate-800/50 hover:border-indigo-500/50 hover:bg-slate-800/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xs ${
                    q.answer === 'YES' ? 'bg-green-600/20 text-green-400 border border-green-500/20' : 
                    q.answer === 'NO' ? 'bg-red-600/20 text-red-400 border border-red-500/20' : 
                    'bg-amber-600/20 text-amber-400 border border-amber-500/20'
                  }`}>
                    {q.answer}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{q.fq}</h3>
                    <p className="text-xs text-slate-500">{q.text}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex">
                    {[...Array(3)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < q.evidence ? 'text-amber-500' : 'text-slate-700'}`}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Company Universe</h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none w-32"
              />
            </div>
          </div>
          <div className="space-y-3">
            {filteredCompanies.map((c) => (
              <div 
                key={c.ticker} 
                onClick={() => onCompanyClick(c.ticker)}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-800/20 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white group-hover:text-indigo-400">{c.ticker}</span>
                    <span className="text-[10px] text-slate-500">{c.sector}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate w-32">{c.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold mono" style={{color: COLORS.quartiles[c.quartile]}}>{c.esg.total.toFixed(1)}</div>
                  <div className="text-[8px] text-slate-600 uppercase font-bold">{c.quartile.split(' ')[0]}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="glass rounded-2xl p-8">
           <h3 className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-wider">ESG Alpha Distribution</h3>
           <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="quartile" stroke="#475569" fontSize={10} />
                  <YAxis stroke="#475569" fontSize={10} unit="%" />
                  <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#1a1a25', border: '1px solid #334155', borderRadius: '8px'}} />
                  <Bar dataKey="return" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
        </section>

        <section className="glass rounded-2xl p-8 flex flex-col justify-center bg-gradient-to-br from-indigo-900/10 to-transparent">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m4.93 4.93 14.14 14.14"/><path d="m4.93 19.07 14.14-14.14"/></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Gemini Intelligence Layer</h3>
              <p className="text-xs text-indigo-400 font-medium">Real-time Qualitative Analysis</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
            "{aiInsight}"
          </p>
          <div className="grid grid-cols-3 gap-4">
             <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block mb-1">Sector Bias</span>
                <span className="text-xs font-bold text-white">Neutral</span>
             </div>
             <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block mb-1">Sentiment</span>
                <span className="text-xs font-bold text-green-400">Bullish</span>
             </div>
             <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block mb-1">Risk Mode</span>
                <span className="text-xs font-bold text-amber-400">Moderate</span>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Overview;
