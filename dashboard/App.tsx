
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import Returns from './pages/Returns';
import RiskAdjusted from './pages/RiskAdjusted';
import DownsideRisk from './pages/DownsideRisk';
import Survival from './pages/Survival';
import Pillars from './pages/Pillars';
import CompanyDeepDive from './pages/CompanyDeepDive';
import Settings from './pages/Settings';
import DataEngineering from './pages/DataEngineering';
import { generateMockCompanies, calculateQuartileMetrics } from './mockData';
import { Company, PerformanceMetrics, ESGQuartile } from './types';
import { useTheme } from './contexts/ThemeContext';
import { useLanguage } from './contexts/LanguageContext';

// Toast component for feedback
const Toast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-slide-up">
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-accent-primary text-white shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [metrics, setMetrics] = useState<Record<ESGQuartile, PerformanceMetrics> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockCompanies = generateMockCompanies();
      setCompanies(mockCompanies);
      setMetrics(calculateQuartileMetrics(mockCompanies));
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleCompanySelect = (ticker: string) => {
    setSelectedTicker(ticker);
    setActiveTab('company');
  };

  const handleExport = () => {
    setToast(t('exportSuccess'));
  };

  const renderContent = () => {
    if (isLoading || !metrics) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-accent-primary/30 border-t-accent-primary rounded-full animate-spin" />
            <p className="text-muted font-medium animate-pulse">Initializing Financial Engine...</p>
          </div>
        </div>
      );
    }

    if (activeTab === 'company' && selectedTicker) {
      const company = companies.find(c => c.ticker === selectedTicker);
      if (company) return <CompanyDeepDive company={company} onBack={() => setActiveTab('overview')} />;
    }

    switch (activeTab) {
      case 'data-eng': return <DataEngineering />;
      case 'overview': return <Overview companies={companies} metrics={metrics} setActiveTab={setActiveTab} onCompanyClick={handleCompanySelect} />;
      case 'returns': return <Returns metrics={metrics} />;
      case 'risk': return <RiskAdjusted metrics={metrics} companies={companies} />;
      case 'downside': return <DownsideRisk metrics={metrics} />;
      case 'survival': return <Survival metrics={metrics} />;
      case 'pillars': return <Pillars companies={companies} metrics={metrics} />;
      case 'settings': return <Settings />;
      default: return <Overview companies={companies} metrics={metrics} setActiveTab={setActiveTab} onCompanyClick={handleCompanySelect} />;
    }
  };

  return (
    <div className="flex h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden transition-colors duration-300">
      {/* Centered Desktop Container */}
      <div className="flex w-full max-w-[1920px] mx-auto h-full shadow-2xl border-x border-[var(--border-color)]">
        <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'company') setSelectedTicker(null);
        }} />
        <main className="flex-1 flex flex-col overflow-y-auto relative">
          <header className="h-14 flex-shrink-0 border-b border-[var(--border-color)] flex items-center px-8 justify-between bg-[var(--bg-primary)]/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <span className="text-xs text-[var(--text-muted)]">S&P 500</span>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="text-sm font-medium text-[var(--text-primary)]">
                {activeTab === 'company' ? `${selectedTicker}` : activeTab.replace('-', ' ')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Language toggle */}
              <button
                onClick={toggleLanguage}
                className="px-2 py-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                title={language === 'en' ? 'Switch to German' : 'Zu Englisch wechseln'}
              >
                {language.toUpperCase()}
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                )}
              </button>

              {/* Settings */}
              <button
                onClick={() => setActiveTab('settings')}
                className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
              </button>

              {/* Export with feedback */}
              <button
                onClick={handleExport}
                className="px-3 py-1.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--text-muted)] text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                {t('export')}
              </button>
            </div>
          </header>

          <div className="p-8 pb-16">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Toast notification */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default App;
