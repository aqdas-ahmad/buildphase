import React from 'react';
import { MainLayout } from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import TimeTracking from './pages/TimeTracking';
import LeaveManagement from './pages/LeaveManagement';
import KnowledgeBase from './pages/KnowledgeBase';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import CalendarPage from './pages/Calendar';
import Team from './pages/Team';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Tickets from './pages/Tickets';

function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':     return <Dashboard onTabChange={setActiveTab} />;
      case 'time-tracking': return <TimeTracking />;
      case 'leave':         return <LeaveManagement />;
      case 'documents':     return <KnowledgeBase />;
      case 'projects':      return <Projects />;
      case 'tasks':         return <Tasks />;
      case 'calendar':      return <CalendarPage />;
      case 'tickets':       return <Tickets />;
      case 'team':          return <Team />;
      case 'reports':       return <Reports />;
      case 'settings':      return <Settings />;
      default:              return <Dashboard onTabChange={setActiveTab} />;
    }
  };

  return (
    <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </MainLayout>
  );
}

export default App;
