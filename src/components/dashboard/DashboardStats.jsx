import React, { useState, useEffect } from 'react';
import { LayoutGrid, CheckSquare, Clock, ArrowRight } from 'lucide-react';
import api from '../../utils/api';
import { useLanguage } from '../../context/LanguageContext';

const StatCard = ({ icon: Icon, label, value, sub, color, onClick, loading }) => (
  <button
    onClick={onClick}
    className="group relative w-full text-left bg-[#1C1C1E] border border-[#2C2C2E] rounded-sm p-5 hover:border-[#3A3A3C] hover:bg-[#232323] transition-all duration-200 overflow-hidden"
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ background: `radial-gradient(ellipse at top left, ${color}08 0%, transparent 70%)` }} />

    <div className="flex items-start justify-between mb-4">
      <div className="p-2 rounded-sm" style={{ backgroundColor: color + '18' }}>
        <Icon size={16} style={{ color }} />
      </div>
      <ArrowRight size={12} className="text-[#3A3A3C] group-hover:text-[#636366] group-hover:translate-x-0.5 transition-all" />
    </div>

    {loading ? (
      <div className="space-y-2">
        <div className="h-7 w-16 bg-[#2C2C2E] rounded animate-pulse" />
        <div className="h-3 w-24 bg-[#2C2C2E] rounded animate-pulse" />
      </div>
    ) : (
      <>
        <p className="text-2xl font-bold text-[#E5E5EA] mb-0.5 tabular-nums">{value}</p>
        <p className="text-[10px] font-bold text-[#636366] uppercase tracking-widest">{label}</p>
        {sub && <p className="text-[10px] text-[#4ADE80] mt-1.5 font-semibold">{sub}</p>}
      </>
    )}
  </button>
);

const DashboardStats = ({ onTabChange }) => {
  const { t } = useLanguage();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/stats')
      .then(r => setStats(r.data))
      .catch(() => setStats({ projects: 0, tasks: 0, hours: '0.0' }))
      .finally(() => setLoading(false));
  }, []);

  const isEmpty = !loading && stats && stats.projects === 0 && stats.tasks === 0 && parseFloat(stats.hours) === 0;

  if (isEmpty) {
    return (
      <div className="flex items-center justify-between bg-[#1C1C1E] border border-[#2C2C2E] border-dashed rounded-sm px-6 py-5 mb-10">
        <div>
          <p className="text-sm font-bold text-[#E5E5EA] mb-0.5">Bereit loszulegen?</p>
          <p className="text-[11px] text-[#636366]">Erstelle dein erstes Projekt oder trage Stunden ein — deine Kennzahlen erscheinen hier.</p>
        </div>
        <div className="flex gap-2 flex-shrink-0 ml-6">
          <button onClick={() => onTabChange('projects')}
            className="text-[10px] font-bold uppercase tracking-widest px-3 py-2 bg-[#A81932] text-white rounded-sm hover:bg-[#8a1428] transition-colors">
            Projekt anlegen
          </button>
          <button onClick={() => onTabChange('time-tracking')}
            className="text-[10px] font-bold uppercase tracking-widest px-3 py-2 bg-[#2C2C2E] text-[#8E8E93] rounded-sm hover:text-[#E5E5EA] transition-colors">
            Zeit erfassen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
      <StatCard
        icon={LayoutGrid}
        label={t('activeProjects')}
        value={loading ? '' : stats.projects}
        sub={!loading && stats.projects > 0 ? `${stats.projects} im Portfolio` : null}
        color="#A81932"
        onClick={() => onTabChange('projects')}
        loading={loading}
      />
      <StatCard
        icon={CheckSquare}
        label={t('openTasks')}
        value={loading ? '' : stats.tasks}
        sub={!loading && stats.tasks > 0 ? `${stats.tasks} offen` : null}
        color="#FACC15"
        onClick={() => onTabChange('tasks')}
        loading={loading}
      />
      <StatCard
        icon={Clock}
        label={t('totalHours')}
        value={loading ? '' : `${stats.hours}h`}
        sub={!loading && parseFloat(stats.hours) > 0 ? 'Gesamt erfasst' : null}
        color="#60A5FA"
        onClick={() => onTabChange('time-tracking')}
        loading={loading}
      />
    </div>
  );
};

export { DashboardStats };
