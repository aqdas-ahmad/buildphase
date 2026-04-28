import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/Card';
import { LayoutGrid, CheckSquare, Clock, TrendingUp } from 'lucide-react';
import api from '../../utils/api';
import { useLanguage } from '../../context/LanguageContext';

const StatCard = ({ icon: Icon, label, value, trend, color, onClick }) => (
  <Card 
    className="border-l-4 cursor-pointer hover:bg-[#2C2C2E] transition-colors" 
    style={{ borderLeftColor: color }}
    onClick={onClick}
  >
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-sm ${color.replace('#', '%23')} bg-opacity-10`}>
          <Icon size={20} style={{ color }} />
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold text-[#4ADE80]">
          <TrendingUp size={10} />
          <span>{trend}</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-[#E5E5EA]">{value}</h3>
        <p className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest mt-1">{label}</p>
      </div>
    </CardContent>
  </Card>
);

const DashboardStats = ({ onTabChange }) => {
  const { t } = useLanguage();
  const [stats, setStats] = useState({ projects: 0, tasks: 0, hours: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/dashboard/stats');
        setStats(data);
      } catch (err) {
        setStats({ projects: 0, tasks: 0, hours: '0.0' });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      <StatCard 
        icon={LayoutGrid} 
        label={t('activeProjects')} 
        value={loading ? "..." : stats.projects} 
        trend="+2" 
        color="#A81932" 
        onClick={() => onTabChange('projects')}
      />
      <StatCard 
        icon={CheckSquare} 
        label={t('openTasks')} 
        value={loading ? "..." : stats.tasks} 
        trend="+12" 
        color="#FACC15" 
        onClick={() => onTabChange('tasks')}
      />
      <StatCard 
        icon={Clock} 
        label={t('totalHours')} 
        value={loading ? "..." : `${stats.hours}h`} 
        trend="+8.5" 
        color="#4ADE80" 
        onClick={() => onTabChange('time-tracking')}
      />
    </div>
  );
};

export { DashboardStats };
