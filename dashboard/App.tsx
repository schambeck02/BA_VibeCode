
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
import { generateMockCompanies, calculateQuartileMetrics } from './mockData';
import { Company, PerformanceMetrics, ESGQuartile } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [metrics, setMetrics] = useState<Record<ESGQuartile, PerformanceMetrics> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const renderContent = () => {
    if (isLoading || !metrics) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
            <p className="text-slate-400 font-medium animate-pulse">Initializing Financial Engine...</p>
          </div>
        </div>
      );
    }

    if (activeTab === 'company' && selectedTicker) {
      const company = companies.find(c => c.ticker === selectedTicker);
      if (company) return <CompanyDeepDive company={company} onBack={() => setActiveTab('overview')} />;
    }

    switch (activeTab) {
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
    <div className="flex h-screen bg-[#0a0a0f] text-slate-200 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
        if (tab !== 'company') setSelectedTicker(null);
      }} />
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 flex-shrink-0 border-b border-slate-800/50 flex items-center px-8 justify-between glass sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs font-medium text-slate-400">
              S&P 500 Index Universe
            </div>
            <div className="text-slate-600">/</div>
            <div className="text-sm font-semibold text-slate-200 uppercase tracking-tight">
              {activeTab === 'company' ? `Deep Dive: ${selectedTicker}` : activeTab.replace('-', ' ')}
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Confidence:</span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('settings')}
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <button className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold transition-colors shadow-lg shadow-indigo-600/20">
              Export Analysis
            </button>
          </div>
        </header>
        
        <div className="p-8 pb-16">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
