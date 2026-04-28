import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { cn } from '../../utils/cn';

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', label: 'English', flag: '🇺🇸' }
  ];

  const currentLang = languages.find(l => l.code === language);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm hover:border-[#A81932] transition-all text-[#E5E5EA] text-xs font-bold uppercase tracking-wider"
      >
        <span className="text-sm">{currentLang.flag}</span>
        <span>{currentLang.code}</span>
        <ChevronDown size={14} className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-32 bg-[#1C1C1E] border border-[#2C2C2E] rounded-sm shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-left hover:bg-[#2C2C2E] transition-colors",
                  language === lang.code ? "text-[#A81932]" : "text-[#8E8E93]"
                )}
              >
                <span>{lang.flag}</span>
                <span className="uppercase tracking-widest">{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export { LanguageSelector };
