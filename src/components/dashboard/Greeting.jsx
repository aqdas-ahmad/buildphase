import React from 'react';
import { Sun, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Greeting = ({ name, role, location }) => {
  const { t, language } = useLanguage();
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    if (language === 'de') {
      if (hour < 12) return 'Guten Morgen';
      if (hour < 18) return 'Guten Tag';
      return 'Guten Abend';
    } else {
      if (hour < 12) return 'Good Morning';
      if (hour < 18) return 'Good Afternoon';
      return 'Good Evening';
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-[#2C2C2E] pb-8">
      <div>
        <h2 className="text-3xl font-bold text-[#E5E5EA] tracking-tight">
          {getGreeting()}, <span className="text-[#A81932]">{name}</span>
        </h2>
        <p className="text-[#8E8E93] mt-2 flex items-center gap-2 text-sm">
          {t('welcomeBack')} <b>DLC Enterprise Portal</b>. {role && <span className="text-[#636366]">| {role}</span>}
        </p>
      </div>

      <div className="flex items-center gap-6 bg-[#1C1C1E] px-6 py-3 rounded-sm border border-[#2C2C2E]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#3D2E00] text-[#FACC15] rounded-sm">
            <Sun size={18} />
          </div>
          <div className="text-sm">
            <p className="font-bold text-[#E5E5EA]">24°C</p>
            <p className="text-[10px] text-[#8E8E93] uppercase tracking-tighter font-semibold">{t('sunny')}</p>
          </div>
        </div>
        <div className="w-px h-8 bg-[#2C2C2E]" />
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#2D0A14] text-[#A81932] rounded-sm">
            <MapPin size={18} />
          </div>
          <div className="text-sm">
            <p className="font-bold text-[#E5E5EA]">{location || "Berlin, DE"}</p>
            <p className="text-[10px] text-[#8E8E93] uppercase tracking-tighter font-semibold">{t('central')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Greeting };
