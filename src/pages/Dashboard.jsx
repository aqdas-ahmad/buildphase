import React, { useState, useEffect } from 'react';
import { Greeting } from '../components/dashboard/Greeting';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { QuickActions } from '../components/dashboard/QuickActions';
import { NewsFeed } from '../components/dashboard/NewsFeed';
import { Shortcuts } from '../components/dashboard/Shortcuts';
import api from '../utils/api';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Dashboard = ({ onTabChange }) => {
  const { t } = useLanguage();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/user/profile');
        setUser(data);
      } catch (err) {
        // Use demo data when backend is unavailable
        setUser({ name: 'David', role: 'Senior Architect', location: 'Berlin, DE' });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-[#A81932]" size={40} />
        <p className="text-[#8E8E93] font-bold uppercase tracking-widest text-xs">{t('loading')}</p>
      </div>
    );
  }


  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500 min-h-screen">
      <Greeting {...user} />
      <DashboardStats onTabChange={onTabChange} />
      <QuickActions onTabChange={onTabChange} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        <div className="lg:col-span-2">
          <NewsFeed onTabChange={onTabChange} />
        </div>
        <div>
          <Shortcuts onTabChange={onTabChange} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
