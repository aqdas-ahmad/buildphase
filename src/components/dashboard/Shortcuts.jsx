import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { 
  ShieldAlert, 
  HardHat, 
  Truck, 
  Map, 
  Users, 
  BarChart3,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ShortcutTile = ({ icon: Icon, label, color, onClick }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 bg-[#2C2C2E] rounded-sm border border-[#3A3A3C] hover:border-[#A81932] hover:bg-[#1C1C1E] transition-all duration-200 group"
  >
    <div className={`p-2.5 rounded-sm mb-3 group-hover:scale-105 transition-transform duration-200 ${color}`}>
      <Icon size={18} />
    </div>
    <span className="text-[10px] font-bold text-[#8E8E93] group-hover:text-[#E5E5EA] transition-colors uppercase tracking-widest text-center">
      {label}
    </span>
  </button>
);

const Shortcuts = ({ onTabChange }) => {
  const { t } = useLanguage();

  const links = [
    { icon: ShieldAlert, label: t('safety'), color: "bg-[#3D0A0A] text-[#F87171]", tab: 'tickets' },
    { icon: Truck, label: t('logistics'), color: "bg-[#2D0A14] text-[#A81932]", tab: 'projects' },
    { icon: Map, label: t('plan'), color: "bg-[#0A3D0A] text-[#4ADE80]", tab: 'dashboard' },
    { icon: Users, label: t('contacts'), color: "bg-[#3D2E00] text-[#FACC15]", tab: 'team' },
    { icon: BarChart3, label: t('reports_link'), color: "bg-[#2D0A14] text-[#A81932]", tab: 'reports' },
    { icon: HardHat, label: t('tech'), color: "bg-[#2C2C2E] text-[#E5E5EA]", tab: 'tickets' },
  ];

  return (
    <Card className="h-full">
       <CardHeader>
        <CardTitle>{t('importantLinks')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {links.map((link, idx) => (
            <ShortcutTile 
              key={idx} 
              {...link} 
              onClick={() => onTabChange(link.tab)}
            />
          ))}
        </div>
        <div 
          onClick={() => onTabChange('sop')}
          className="mt-8 p-4 bg-[#A81932] rounded-sm relative overflow-hidden group cursor-pointer"
        >
          <div className="relative z-10">
            <p className="text-white font-bold text-sm">{t('employeePortal')}</p>
            <p className="text-[#F9E6EA] text-[10px] mt-1">{t('allInfo')}</p>
            <div className="mt-4 flex items-center gap-2 text-white font-bold text-[9px] uppercase tracking-widest">
              <span>{t('openNow')}</span>
              <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 bg-white/5 w-24 h-24 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
        </div>
      </CardContent>
    </Card>
  );
};

export { Shortcuts };
