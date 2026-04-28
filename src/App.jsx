import React from 'react';
import { MainLayout } from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import TimeTracking from './pages/TimeTracking';
import LeaveManagement from './pages/LeaveManagement';
import KnowledgeBase from './pages/KnowledgeBase';
import { useLanguage } from './context/LanguageContext';

function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onTabChange={setActiveTab} />;
      case 'time-tracking':
        return <TimeTracking />;
      case 'leave':
        return <LeaveManagement />;
      case 'documents':
        return <KnowledgeBase />;
      case 'projects':
      case 'tasks':
      case 'calendar':
      case 'tickets':
      case 'team':
      case 'reports':
      case 'settings':
        return <PlaceholderPage title={activeTab} />;
      default:
        return <Dashboard onTabChange={setActiveTab} />;
    }
  };

  const PlaceholderPage = ({ title }) => {
    const { t } = useLanguage();
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-20 h-20 bg-[#2C2C2E] rounded-full flex items-center justify-center mb-6 border border-[#3A3A3C]">
          <div className="w-10 h-10 bg-[#A81932] rounded-full animate-pulse" />
        </div>
        <h2 className="text-3xl font-bold text-[#E5E5EA] mb-2 uppercase tracking-tighter">
          {t(title)}
        </h2>
        <p className="text-[#8E8E93] max-w-md mx-auto text-sm">
          {t('featureOptimizing')} <b>{t('comingSoon')}</b>
        </p>
      </div>
    );
  };

  return (
    <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </MainLayout>
  );
}

export default App;
