
import React, { useState, useEffect } from 'react';
import { Company, PerformanceMetrics, ESGQuartile } from '../types';
import { COLORS, Icons } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { geminiService } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

interface OverviewProps {
  companies: Company[];
  metrics: Record<ESGQuartile, PerformanceMetrics>;
  setActiveTab: (tab: string) => void;
  onCompanyClick: (ticker: string) => void;
}

const Overview: React.FC<OverviewProps> = ({ companies, metrics, setActiveTab, onCompanyClick }) => {
  const { t } = useLanguage();
  const [aiInsight, setAiInsight] = useState("Analyzing correlations...");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!metrics) return;
    const runAnalysis = async () => {
      const summaryText = `Q1 Returns: ${(metrics[ESGQuartile.Q1].annualizedReturn * 100).toFixed(1)}%, Q4: ${(metrics[ESGQuartile.Q4].annualizedReturn * 100).toFixed(1)}%. Sharpe ratio delta: ${metrics[ESGQuartile.Q1].sharpeRatio - metrics[ESGQuartile.Q4].sharpeRatio}.`;
      const result = await geminiService.analyzeESGResults(summaryText);
      setAiInsight(result || "Analysis complete.");
    };
    runAnalysis();
  }, [metrics]);

  const kpis = [
    { label: t('totalCompanies'), value: companies.length.toString(), sub: 'S&P 500+ Components', icon: <Icons.Overview />, highlight: false },
    { label: t('avgEsgScore'), value: '62.4', sub: '+4.2% YoY Improvement', icon: <Icons.Pillars />, highlight: true },
    { label: t('analysisPeriod'), value: '5Y', sub: 'Feb 2021 - Feb 2026', icon: <Icons.Returns />, highlight: false },
    { label: t('alphaGenerated'), value: '+6.3%', sub: 'Q1 vs Market Benchmark', icon: <Icons.Risk />, highlight: true },
  ];

  const researchQuestions = [
    { id: 'returns', fq: 'FQ1: Raw Returns', answer: t('yes'), evidence: 3, text: t('fq1Desc') },
    { id: 'risk', fq: 'FQ2: Risk-Adjusted', answer: t('yes'), evidence: 3, text: t('fq2Desc') },
    { id: 'downside', fq: 'FQ3: Downside Risk', answer: t('partial'), evidence: 2, text: t('fq3Desc') },
    { id: 'survival', fq: 'FQ4: Survival', answer: t('yes'), evidence: 3, text: t('fq4Desc') },
    { id: 'pillars', fq: 'FQ5: Strongest Pillar', answer: 'G', evidence: 3, text: t('fq5Desc') },
  ];

  const filteredCompanies = companies.filter(c =>
    c.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 10);

  const chartData = metrics ? (Object.entries(metrics) as [ESGQuartile, PerformanceMetrics][]).map(([q, m]) => ({
    quartile: q.split(' ')[0],
    return: +(m.annualizedReturn * 100).toFixed(2),
    color: COLORS.quartiles[q]
  })).reverse() : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="glass p-4 rounded-xl border border-[var(--border-color)] flex items-center gap-4">
            <div className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-muted)]">
              {kpi.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">{kpi.label}</p>
              <p className={`text-xl font-bold font-mono ${kpi.highlight ? 'text-[var(--accent-green)]' : 'text-[var(--text-primary)]'}`}>{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-3 glass rounded-2xl p-8 border border-[var(--border-color)]">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{t('researchFindings')}</h2>
            <p className="text-[var(--text-muted)]">{t('researchSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {researchQuestions.map((q) => (
              <div
                key={q.id}
                onClick={() => setActiveTab(q.id)}
                className="group p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--text-muted)] hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-[var(--accent-primary)] mb-1">{q.fq.split(':')[0]}</h3>
                    <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${q.answer === 'YES' || q.answer === 'JA' ? 'bg-green-900/30 text-green-400 border border-green-800' :
                      q.answer === 'NO' || q.answer === 'NEIN' ? 'bg-red-900/30 text-red-400 border border-red-800' :
                        'bg-amber-900/30 text-amber-400 border border-amber-800'
                      }`}>
                      {q.answer}
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed italic border-l-2 border-[var(--border-color)] pl-3 mb-4">
                    "{q.text}"
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-auto pt-3 border-t border-[var(--border-color)]">
                  <span className="text-[10px] text-[var(--text-muted)]">Evidence Level:</span>
                  <div className="flex">
                    {[...Array(3)].map((_, i) => (
                      <span key={i} className={`text-xs ${i < q.evidence ? 'text-[var(--accent-primary)]' : 'text-[var(--bg-tertiary)]'}`}>●</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:col-span-3">
          <section className="glass rounded-xl p-6 border border-[var(--border-color)]">
            <h3 className="text-xs text-[var(--text-muted)] mb-4 uppercase tracking-wide">{t('returnDistribution')}</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                  <XAxis dataKey="quartile" stroke="var(--text-muted)" fontSize={10} />
                  <YAxis stroke="var(--text-muted)" fontSize={10} unit="%" />
                  <Tooltip cursor={{ fill: 'var(--bg-tertiary)' }} contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '11px', color: 'var(--text-primary)' }} />
                  <Bar dataKey="return" radius={[3, 3, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.7} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="glass rounded-xl p-6 border border-[var(--border-color)]">
            <h3 className="text-xs text-[var(--text-muted)] mb-4 uppercase tracking-wide">{t('aiAnalysis')}</h3>
            <p className="text-sm text-[var(--text-primary)] leading-relaxed mb-4">
              {aiInsight}
            </p>
            <div className="flex gap-4 text-[10px]">
              <div><span className="text-[var(--text-muted)]">Bias:</span> <span className="text-[var(--text-primary)]">Neutral</span></div>
              <div><span className="text-[var(--text-muted)]">Sentiment:</span> <span className="text-[var(--accent-green)]">Bullish</span></div>
              <div><span className="text-[var(--text-muted)]">Risk:</span> <span className="text-[var(--accent-amber)]">Moderate</span></div>
            </div>
          </section>

          <section className="glass rounded-xl p-6 border border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs text-[var(--text-muted)] uppercase tracking-wide">{t('companies')}</h3>
              <input
                type="text"
                placeholder={t('search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded px-2 py-1 text-[10px] focus:outline-none focus:border-[var(--text-muted)] w-24 text-[var(--text-primary)] placeholder-[var(--text-muted)]"
              />
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.slice(0, 6).map((c) => (
                  <div
                    key={c.ticker}
                    onClick={() => onCompanyClick(c.ticker)}
                    className="flex items-center justify-between py-2 px-2 rounded hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[var(--text-primary)]">{c.ticker}</span>
                      <span className="text-[10px] text-[var(--text-muted)]">{c.sector}</span>
                    </div>
                    <span className="font-mono" style={{ color: COLORS.quartiles[c.quartile] }}>{c.esg.total.toFixed(0)}</span>
                  </div>
                ))
              ) : (
                <div className="text-center text-[var(--text-muted)] text-xs py-4">
                  {t('noCompaniesFound')}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Overview;
