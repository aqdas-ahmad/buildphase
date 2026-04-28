import React, { useState, useEffect } from 'react';
import { Greeting } from '../components/dashboard/Greeting';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { QuickActions } from '../components/dashboard/QuickActions';
import { NewsFeed } from '../components/dashboard/NewsFeed';
import { Shortcuts } from '../components/dashboard/Shortcuts';
import api from '../utils/api';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Dashboard = ({ onTabChange }) => {
  const { t } = useLanguage();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/user/profile');
        setUser(data);
        setError(null);
      } catch (err) {
        setError(t('serverOffline'));
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [t]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-[#A81932]" size={40} />
        <p className="text-[#8E8E93] font-bold uppercase tracking-widest text-xs">{t('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
        <div className="p-4 bg-[#3D0A0A] rounded-full text-[#F87171]">
          <AlertCircle size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[#E5E5EA]">{t('connectionError')}</h2>
          <p className="text-[#8E8E93] max-w-md">{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-[#A81932] text-white font-bold uppercase tracking-widest text-[10px] rounded-sm hover:bg-[#8A1429] transition-colors"
        >
          {t('retry')}
        </button>
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
