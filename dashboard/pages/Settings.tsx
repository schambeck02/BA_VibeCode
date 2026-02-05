
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white">Platform Settings</h2>
        <p className="text-slate-400">Configure your analysis parameters and AI integration.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="glass rounded-2xl p-8 space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Data Integration
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Primary Data Source</label>
              <div className="flex gap-2">
                <div className="flex-1 p-3 rounded-lg bg-indigo-600/10 border border-indigo-500/30 text-xs font-bold text-indigo-400">
                  S&P 500 Core Dataset (CSV)
                </div>
                <button className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-bold text-slate-400">Change</button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Analysis Confidence Interval</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs outline-none">
                <option>95% Confidence (Standard)</option>
                <option>99% Confidence (Conservative)</option>
                <option>90% Confidence (Aggressive)</option>
              </select>
            </div>
          </div>
        </section>

        <section className="glass rounded-2xl p-8 space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
            AI Orchestration (Gemini)
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Model Selection</label>
              <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300">
                gemini-3-flash-preview (Standard)
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Analysis Style</label>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-2 rounded-lg bg-indigo-600/20 border border-indigo-500/50 text-[10px] font-bold text-indigo-400 uppercase">Executive</button>
                <button className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-[10px] font-bold text-slate-500 uppercase">Technical</button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="glass rounded-2xl p-8">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">User Permissions & RBAC</h3>
        <div className="space-y-4">
           {[
             { role: 'Administrator', access: 'Full platform access, data export, key management', active: true },
             { role: 'Financial Analyst', access: 'Visualizations, company deep-dives, reporting', active: false },
             { role: 'ESG Consultant', access: 'Pillar analysis and qualitative insights only', active: false },
           ].map((role) => (
             <div key={role.role} className="flex items-center justify-between p-4 rounded-xl border border-slate-800 hover:bg-slate-800/20 transition-all">
                <div>
                  <h4 className="text-sm font-bold text-white">{role.role}</h4>
                  <p className="text-xs text-slate-500">{role.access}</p>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${role.active ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${role.active ? 'right-1' : 'left-1'}`} />
                </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default Settings;
