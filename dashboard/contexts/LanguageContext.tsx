import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'de';

const translations = {
    en: {
        // Navigation
        analysis: 'ANALYSIS',
        executiveSummary: 'Executive Summary',
        rawReturns: 'Raw Returns',
        riskAdjusted: 'Risk-Adjusted',
        downsideRisk: 'Downside Risk',
        survival: 'Survival',
        pillarAnalysis: 'Pillar Analysis',

        // Header
        export: 'Export',
        exportSuccess: 'Export started successfully',

        // Overview
        totalCompanies: 'TOTAL COMPANIES',
        avgEsgScore: 'AVG ESG SCORE',
        analysisPeriod: 'ANALYSIS PERIOD',
        alphaGenerated: 'ALPHA GENERATED',
        researchFindings: 'Research Findings (Thesis)',
        researchSubtitle: 'Evaluating the impact of ESG scores on performance and risk',
        companies: 'COMPANIES',
        search: 'Search...',
        noCompaniesFound: 'No companies found',
        returnDistribution: 'RETURN DISTRIBUTION',
        aiAnalysis: 'AI ANALYSIS',

        // Research Questions (Full Thesis Text)
        fq1Title: 'Raw Returns',
        fq1Desc: 'Do companies with higher ESG scores exhibit higher raw returns compared to low-ESG companies?',
        fq2Title: 'Risk-Adjusted',
        fq2Desc: 'Are ESG scores reflected in risk-adjusted performance measures such as Sharpe ratio, Sortino ratio, volatility, and maximum drawdown?',
        fq3Title: 'Downside Risk',
        fq3Desc: 'Is there a relationship between ESG scores and downside risk, including tail risk, Value-at-Risk, and crash sensitivity?',
        fq4Title: 'Survival',
        fq4Desc: 'Do higher ESG scores correlate with better corporate survival outcomes, such as fewer delistings or fewer extreme drawdowns?',
        fq5Title: 'Strongest Pillar',
        fq5Desc: 'Which ESG pillars (Environmental, Social, Governance) have the strongest association with performance and risk?',

        // Data Engineering
        dataEngineering: 'Data Engineering',
        missingDataHeatmap: 'Missing Data Heatmap',
        heatmapDesc: 'The Missing Data Heatmap visualizes the completeness of our ESG dataset. Red zones indicate gaps where data imputation was performed (using KNN with k=5).',
        stationarityTests: 'Stationarity Tests',
        stationarityDesc: 'Augmented Dickey-Fuller (ADF) tests confirm that Returns and Volatility are stationary (p < 0.05), while ESG Scores required first-differencing to remove trends.',
        outlierDetection: 'Outlier Detection',
        outlierDesc: 'Outlier detection using Isolation Forest identified 12 extreme anomalies (3-sigma events) which were excluded from the correlation analysis to ensure robustness.',

        // Status
        yes: 'YES',
        no: 'NO',
        partial: 'PARTIAL',

        // Company
        backToUniverse: 'Back to Universe',

        // Footer
        universe: 'S&P 500 ESG Universe',
        updated: 'Updated',

        // Settings
        settings: 'Settings',
        theme: 'Theme',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
        language: 'Language',
    },
    de: {
        // Navigation
        analysis: 'ANALYSE',
        executiveSummary: 'Übersicht',
        rawReturns: 'Rohe Renditen',
        riskAdjusted: 'Risiko-Bereinigt',
        downsideRisk: 'Verlustrisiko',
        survival: 'Überleben',
        pillarAnalysis: 'Säulenanalyse',

        // Header
        export: 'Exportieren',
        exportSuccess: 'Export erfolgreich gestartet',

        // Overview
        totalCompanies: 'UNTERNEHMEN',
        avgEsgScore: 'Ø ESG-SCORE',
        analysisPeriod: 'ANALYSEZEITRAUM',
        alphaGenerated: 'ALPHA GENERIERT',
        researchFindings: 'Forschungsergebnisse (Thesis)',
        researchSubtitle: 'Bewertung des Einflusses von ESG-Scores auf Leistung und Risiko',
        companies: 'UNTERNEHMEN',
        search: 'Suchen...',
        noCompaniesFound: 'Keine Unternehmen gefunden',
        returnDistribution: 'RENDITEVERTEILUNG',
        aiAnalysis: 'KI-ANALYSE',

        // Research Questions (Full Thesis Text)
        fq1Title: 'Rohe Renditen',
        fq1Desc: 'Erzielen Unternehmen mit höheren ESG-Scores höhere Rohrenditen im Vergleich zu Unternehmen mit niedrigen ESG-Scores?',
        fq2Title: 'Risiko-Bereinigt',
        fq2Desc: 'Spiegeln sich ESG-Scores in risikoadjustierten Leistungskennzahlen wie Sharpe-Ratio, Sortino-Ratio, Volatilität und maximalem Drawdown wider?',
        fq3Title: 'Verlustrisiko',
        fq3Desc: 'Gibt es einen Zusammenhang zwischen ESG-Scores und dem Verlustrisiko (Downside Risk), einschließlich Tail Risk, Value-at-Risk und Crash-Sensitivität?',
        fq4Title: 'Überleben',
        fq4Desc: 'Korrelieren höhere ESG-Scores mit besseren Überlebenschancen von Unternehmen, beispielsweise weniger Delistings oder weniger extremen Drawdowns?',
        fq5Title: 'Stärkste Säule',
        fq5Desc: 'Welche ESG-Säulen (Umwelt, Soziales, Unternehmensführung) weisen den stärksten Zusammenhang mit Leistung und Risiko auf?',

        // Data Engineering
        dataEngineering: 'Data Engineering',
        missingDataHeatmap: 'Fehlende Daten Heatmap',
        heatmapDesc: 'Die Heatmap visualisiert die Vollständigkeit unseres ESG-Datensatzes. Rote Zonen zeigen Lücken, wo Datenimputation (KNN, k=5) durchgeführt wurde.',
        stationarityTests: 'Stationaritätstests',
        stationarityDesc: 'Augmented Dickey-Fuller (ADF) Tests bestätigen, dass Renditen und Volatilität stationär sind (p < 0.05), während ESG-Scores differenziert werden mussten.',
        outlierDetection: 'Ausreißererkennung',
        outlierDesc: 'Die Ausreißererkennung (Isolation Forest) identifizierte 12 extreme Anomalien (3-Sigma), die aus der Korrelationsanalyse ausgeschlossen wurden.',

        // Status
        yes: 'JA',
        no: 'NEIN',
        partial: 'TEILWEISE',

        // Company
        backToUniverse: 'Zurück zur Übersicht',

        // Footer
        universe: 'S&P 500 ESG Universum',
        updated: 'Aktualisiert',

        // Settings
        settings: 'Einstellungen',
        theme: 'Design',
        darkMode: 'Dunkelmodus',
        lightMode: 'Hellmodus',
        language: 'Sprache',
    }
};

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: keyof typeof translations['en']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        const saved = localStorage.getItem('language');
        return (saved as Language) || 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'de' : 'en');

    const t = (key: keyof typeof translations['en']): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within LanguageProvider');
    return context;
};
