import React from 'react';
import { Clock, CalendarPlus, FileText, AlertCircle, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../context/LanguageContext';

const ActionButton = ({ icon: Icon, label, description, color, onClick, executeLabel }) => (
  <button
    onClick={onClick}
    className="group flex flex-col items-start p-6 bg-[#1C1C1E] border border-[#2C2C2E] rounded-sm hover:border-[#A81932] transition-all duration-200 text-left w-full"
  >
    <div className={cn("p-3 rounded-sm mb-4 transition-transform group-hover:scale-105 duration-300", color)}>
      <Icon size={20} />
    </div>
    <h4 className="text-sm font-bold text-[#E5E5EA] group-hover:text-[#A81932] transition-colors">
      {label}
    </h4>
    <p className="text-[11px] text-[#8E8E93] mt-2 line-clamp-2">
      {description}
    </p>
    <div className="mt-6 flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#636366] group-hover:text-[#A81932] transition-colors">
      <span>{executeLabel || 'Execute'}</span>
      <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
    </div>
  </button>
);

const QuickActions = ({ onTabChange }) => {
  const { t } = useLanguage();

  const actions = [
    {
      icon: Clock,
      label: t('timeLog'),
      description: t('timeLogDesc'),
      color: "bg-[#2D0A14] text-[#A81932]",
      tab: 'time-tracking'
    },
    {
      icon: CalendarPlus,
      label: t('requestLeave'),
      description: t('leaveDesc'),
      color: "bg-[#0A3D0A] text-[#4ADE80]",
      tab: 'leave'
    },
    {
      icon: FileText,
      label: t('docs'),
      description: t('docsDesc'),
      color: "bg-[#3D2E00] text-[#FACC15]",
      tab: 'documents'
    },
    {
      icon: AlertCircle,
      label: t('report'),
      description: t('reportDesc'),
      color: "bg-[#3D0A0A] text-[#F87171]",
      tab: 'tickets'
    }
  ];

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest">{t('quickAccess')}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, idx) => (
          <ActionButton 
            key={idx} 
            {...action} 
            onClick={() => onTabChange(action.tab)}
            executeLabel={t('execute')}
          />
        ))}
      </div>
    </section>
  );
};

export { QuickActions };
