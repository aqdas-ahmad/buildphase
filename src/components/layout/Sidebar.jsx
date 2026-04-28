import React from 'react';
import { 
  Home, 
  Clock, 
  Folder, 
  ListTodo, 
  Calendar, 
  Umbrella, 
  FileText, 
  Ticket, 
  Users, 
  PieChart, 
  Settings
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../context/LanguageContext';

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    title={label}
    className={cn(
      "w-full flex items-center justify-center h-12 transition-colors duration-200 group border-l-4",
      active 
        ? "border-[#A81932] bg-[#A81932] text-white" 
        : "border-transparent text-[#8E8E93] hover:text-white hover:bg-[#2C2C2E]"
    )}
  >
    <Icon size={20} className={cn("transition-transform duration-200 group-hover:scale-110", active ? "text-white" : "text-[#8E8E93] group-hover:text-white")} />
  </button>
);

const Sidebar = ({ activeTab, onTabChange }) => {
  const { t } = useLanguage();

  const menuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: Home },
    { id: 'time-tracking', label: t('timeTracking'), icon: Clock },
    { id: 'projects', label: t('projects'), icon: Folder },
    { id: 'tasks', label: t('tasks'), icon: ListTodo },
    { id: 'calendar', label: t('calendar'), icon: Calendar },
    { id: 'leave', label: t('leave'), icon: Umbrella },
    { id: 'documents', label: t('documents'), icon: FileText },
    { id: 'tickets', label: t('tickets'), icon: Ticket },
    { id: 'team', label: t('team'), icon: Users },
    { id: 'reports', label: t('reports'), icon: PieChart },
  ];

  return (
    <aside className="w-16 h-screen fixed top-0 left-0 flex flex-col bg-[#1C1C1E] py-4 z-40 transition-colors duration-300 border-r border-[#2C2C2E]">
      <div className="flex items-center justify-center mb-6">
        <div className="w-8 h-8 rounded bg-[#A81932] flex items-center justify-center text-white font-bold text-sm">
          DLC
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-1">
        {menuItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeTab === item.id}
            onClick={() => onTabChange(item.id)}
          />
        ))}
      </div>

      <div className="mt-auto pt-4 flex flex-col gap-1">
        <NavItem
          icon={Settings}
          label={t('settings')}
          active={activeTab === 'settings'}
          onClick={() => onTabChange('settings')}
        />
      </div>
    </aside>
  );
};

export { Sidebar };
