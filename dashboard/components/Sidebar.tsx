
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Icons } from '../constants';

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
    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${active
        ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border-l-2 border-[var(--text-muted)]'
        : 'text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
      }`}
  >
    <span className={active ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}>{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();

  const menuItems = [
    { id: 'data-eng', label: t('dataEngineering'), icon: <Icons.Pillars /> }, // Placeholder icon for now
    { id: 'overview', label: t('executiveSummary'), icon: <Icons.Overview /> },
    { id: 'returns', label: t('fq1Title'), icon: <Icons.Returns /> },
    { id: 'risk', label: t('fq2Title'), icon: <Icons.Risk /> },
    { id: 'downside', label: t('fq3Title'), icon: <Icons.Downside /> },
    { id: 'survival', label: t('fq4Title'), icon: <Icons.Survival /> },
    { id: 'pillars', label: t('pillarAnalysis'), icon: <Icons.Pillars /> },
  ];

  return (
    <aside className="w-60 flex-shrink-0 flex flex-col bg-[var(--bg-secondary)] border-r border-[var(--border-color)] h-screen overflow-y-auto transition-colors duration-300">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-md bg-[var(--bg-tertiary)] flex items-center justify-center text-xs font-semibold text-[var(--text-primary)]">ESG</div>
          <h1 className="text-sm font-semibold text-[var(--text-muted)] tracking-tight">Insight Pro</h1>
        </div>

        <nav className="space-y-1">
          <div className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3 px-4">{t('analysis')}</div>
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

      <div className="mt-auto p-5 border-t border-[var(--border-color)]">
        <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
          {t('universe')}<br />
          {t('updated')}: Feb 05, 2026
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
