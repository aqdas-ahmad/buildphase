import React, { useState, useEffect } from 'react';
import { TimerWidget } from '../components/time-tracking/TimerWidget';
import { ManualEntryForm } from '../components/time-tracking/ManualEntryForm';
import { DailyLog } from '../components/time-tracking/DailyLog';
import api from '../utils/api';
import { useLanguage } from '../context/LanguageContext';

const TimeTracking = () => {
  const { t } = useLanguage();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const { data } = await api.get('/time-logs');
      setLogs(data);
    } catch (err) {
      console.error('Error fetching logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500 min-h-screen">
      <div className="mb-10 border-b border-[#2C2C2E] pb-8">
        <h2 className="text-3xl font-bold text-[#E5E5EA] tracking-tight">{t('timeTracking')}</h2>
        <p className="text-[#8E8E93] mt-2 text-sm">Verwalten Sie Ihre Arbeitszeiten und Projektbuchungen.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div>
          <TimerWidget />
        </div>
        <div className="lg:col-span-2">
          <ManualEntryForm onEntryAdded={fetchLogs} />
        </div>
      </div>

      <div className="pb-12">
        <DailyLog logs={logs} loading={loading} />
      </div>
    </div>
  );
};

export default TimeTracking;
