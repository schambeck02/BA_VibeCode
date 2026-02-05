
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ScatterChart, Scatter, AreaChart, Area } from 'recharts';

const DataEngineering: React.FC = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'heatmap' | 'stationarity' | 'outliers'>('heatmap');
    const [showMethodology, setShowMethodology] = useState(true);

    // Mock data for Missing Data Heatmap (Enhanced)
    const heatmapData = Array.from({ length: 12 }, (_, month) =>
        Array.from({ length: 5 }, (_, year) => ({
            year: 2021 + year,
            month: month + 1,
            // Simulate missing data clusters
            completeness: (year === 0 && month < 4) ? 65 + Math.random() * 20 : 98 + Math.random() * 2
        }))
    ).flat();

    // Mock data for Stationarity Tests (Enhanced)
    const adfData = [
        { metric: 'Raw Returns', tStat: -4.8, critical: -2.8, stationary: true, pValue: 0.001 },
        { metric: 'Log Volatility', tStat: -3.5, critical: -2.8, stationary: true, pValue: 0.012 },
        { metric: 'ESG Score (Level)', tStat: -1.2, critical: -2.8, stationary: false, pValue: 0.45 },
        { metric: 'ESG Score (Diff)', tStat: -5.2, critical: -2.8, stationary: true, pValue: 0.0001 },
    ];

    // Mock data for Outliers (Enhanced distribution)
    const outlierData = Array.from({ length: 80 }, (_, i) => {
        const isOutlier = Math.random() > 0.95;
        return {
            id: i,
            x: Math.random() * 100,
            y: isOutlier ? Math.random() * 100 + 150 : Math.random() * 100, // Explicit outliers
            z: Math.random() * 1000,
            type: isOutlier ? 'Anomaly' : 'Normal'
        };
    });

    const renderMethodology = () => {
        let content = '';
        switch (activeTab) {
            case 'heatmap': content = t('heatmapDesc'); break;
            case 'stationarity': content = t('stationarityDesc'); break;
            case 'outliers': content = t('outlierDesc'); break;
        }
        return (
            <div className={`overflow-hidden transition-all duration-300 ${showMethodology ? 'max-h-40 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                <div className="bg-[var(--bg-secondary)] border-l-4 border-[var(--accent-primary)] p-4 rounded-r-lg">
                    <h4 className="text-xs font-bold text-[var(--accent-primary)] uppercase mb-2">Methodology Note</h4>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed font-mono">
                        {content}
                    </p>
                </div>
            </div>
        );
    };

    const renderVisualization = () => {
        switch (activeTab) {
            case 'heatmap':
                return (
                    <div className="h-[400px] w-full">
                        <div className="grid grid-cols-12 gap-1 h-full">
                            {heatmapData.map((d, i) => (
                                <div
                                    key={i}
                                    className={`rounded-sm transition-all hover:scale-110 cursor-help relative group`}
                                    style={{
                                        backgroundColor: d.completeness === 100 ? 'var(--accent-green)' :
                                            d.completeness > 80 ? 'var(--accent-amber)' : 'var(--accent-red)',
                                        opacity: 0.6 + (d.completeness / 250) // Subtle opacity variation
                                    }}
                                >
                                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-[10px] rounded whitespace-nowrap z-10 pointer-events-none shadow-xl">
                                        {d.month}/20{d.year}: {d.completeness.toFixed(1)}%
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-xs font-mono text-[var(--text-muted)]">
                            <span>Jan 2021 (Start)</span>
                            <span>Dec 2025 (End)</span>
                        </div>
                    </div>
                );
            case 'stationarity':
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={adfData} layout="vertical" margin={{ left: 40 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
                            <XAxis type="number" stroke="var(--text-muted)" domain={[-6, 0]} hide />
                            <YAxis dataKey="metric" type="category" stroke="var(--text-primary)" width={120} tick={{ fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                                cursor={{ fill: 'var(--bg-tertiary)' }}
                                formatter={(value: number, name: string, props: any) => [
                                    value,
                                    props.payload.stationary ? "Stationary (Rejection)" : "Non-Stationary"
                                ]}
                            />
                            <Bar dataKey="tStat" name="t-Statistic" radius={[0, 4, 4, 0]} barSize={40}>
                                {adfData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.stationary ? 'var(--accent-green)' : 'var(--accent-red)'} />
                                ))}
                            </Bar>
                            {/* Critical Value Line */}
                            <Scatter data={[{ x: -2.8, y: 'Returns' }]} shape={() => null} />
                        </BarChart>
                    </ResponsiveContainer>
                );
            case 'outliers':
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                            <XAxis type="number" dataKey="x" name="Metric A" stroke="var(--text-muted)" tick={{ fontSize: 10 }} />
                            <YAxis type="number" dataKey="y" name="Metric B" stroke="var(--text-muted)" tick={{ fontSize: 10 }} />
                            <Tooltip
                                cursor={{ strokeDasharray: '3 3' }}
                                contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                            />
                            <Scatter name="Normal" data={outlierData.filter(d => d.type === 'Normal')} fill="var(--accent-primary)" fillOpacity={0.6} />
                            <Scatter name="Anomalies" data={outlierData.filter(d => d.type === 'Anomaly')} fill="var(--accent-red)" shape="cross" />
                        </ScatterChart>
                    </ResponsiveContainer>
                );
        }
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2 tracking-tight">{t('dataEngineering')}</h1>
                    <p className="text-[var(--text-muted)] text-sm">ETL Pipeline verification & Quality Assurance</p>
                </div>

                <div className="flex bg-[var(--bg-tertiary)] p-1 rounded-lg">
                    {(['heatmap', 'stationarity', 'outliers'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${activeTab === tab
                                    ? 'bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-sm'
                                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                }`}
                        >
                            {tab === 'heatmap' && t('missingDataHeatmap')}
                            {tab === 'stationarity' && t('stationarityTests')}
                            {tab === 'outliers' && t('outlierDetection')}
                        </button>
                    ))}
                </div>
            </header>

            <div className="glass rounded-3xl p-8 border border-[var(--border-color)] relative overflow-hidden">
                {/* Visual Background Element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-primary)] opacity-5 blur-[100px] rounded-full pointer-events-none" />

                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setShowMethodology(!showMethodology)}
                        className="text-[10px] uppercase font-bold text-[var(--accent-secondary)] hover:underline flex items-center gap-1"
                    >
                        {showMethodology ? 'Hide Methodology' : 'Show Methodology'}
                        <span className={`transition-transform duration-300 ${showMethodology ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                </div>

                {renderMethodology()}
                {renderVisualization()}
            </div>

            {/* Stats Footer */}
            <div className="grid grid-cols-3 gap-6">
                <div className="glass p-6 rounded-2xl border border-[var(--border-color)]">
                    <h5 className="text-[var(--text-muted)] text-[10px] uppercase font-bold mb-2">Total Data Points</h5>
                    <p className="text-2xl font-mono text-[var(--text-primary)]">2.4M</p>
                </div>
                <div className="glass p-6 rounded-2xl border border-[var(--border-color)]">
                    <h5 className="text-[var(--text-muted)] text-[10px] uppercase font-bold mb-2">Imputation Rate</h5>
                    <p className="text-2xl font-mono text-[var(--accent-green)]">1.2%</p>
                </div>
                <div className="glass p-6 rounded-2xl border border-[var(--border-color)]">
                    <h5 className="text-[var(--text-muted)] text-[10px] uppercase font-bold mb-2">ADF Rejection Rate</h5>
                    <p className="text-2xl font-mono text-[var(--text-primary)]">94%</p>
                </div>
            </div>
        </div>
    );
};

export default DataEngineering;
