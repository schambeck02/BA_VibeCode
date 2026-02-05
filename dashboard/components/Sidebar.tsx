
import React from 'react';
import { Icons, COLORS } from '../constants';

interface NavItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: (id: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ id, label, icon, active, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />}
  </button>
);

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Executive Summary', icon: <Icons.Overview /> },
    { id: 'returns', label: 'FQ1: Raw Returns', icon: <Icons.Returns /> },
    { id: 'risk', label: 'FQ2: Risk-Adjusted', icon: <Icons.Risk /> },
    { id: 'downside', label: 'FQ3: Downside Risk', icon: <Icons.Downside /> },
    { id: 'survival', label: 'FQ4: Survival', icon: <Icons.Survival /> },
    { id: 'pillars', label: 'FQ5: Pillar Analysis', icon: <Icons.Pillars /> },
  ];

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col glass border-r border-slate-800/50 h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white italic">ESG</div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Insight Pro</h1>
        </div>

        <nav className="space-y-2">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-4">Analysis Modules</div>
          {menuItems.map((item) => (
            <NavItem
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              active={activeTab === item.id}
              onClick={setActiveTab}
            />
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-800/50">
        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-300">Market Data Live</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            S&P 500 ESG Data Universe<br />
            Last Updated: Feb 05, 2026
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
