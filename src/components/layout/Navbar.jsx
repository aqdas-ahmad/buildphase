import React from 'react';
import { Search, Bell, Menu, LayoutGrid } from 'lucide-react';
import { Button } from '../ui/Button';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = ({ toggleSidebar }) => {
  const { t } = useLanguage();

  return (
    <header className="h-16 bg-[#1C1C1E] border-b border-[#2C2C2E] sticky top-0 z-30 transition-colors duration-300 flex items-center px-6 justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden hover:bg-[#2C2C2E] text-[#E5E5EA]" onClick={toggleSidebar}>
          <Menu size={20} />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#A81932] flex items-center justify-center text-white">
            <LayoutGrid size={16} />
          </div>
          <h1 className="text-xl font-semibold text-[#E5E5EA] tracking-tight">
            DLC Portal
          </h1>
        </div>
      </div>

      <div className="flex-1 max-w-2xl px-8 hidden md:block">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#636366]" size={16} />
          <input 
            type="text" 
            placeholder={t('searchPlaceholder')}
            className="w-full bg-[#2C2C2E] border border-transparent hover:border-[#3A3A3C] rounded-sm py-2 pl-10 pr-4 text-sm focus:bg-[#3A3A3C] focus:border-[#A81932] focus:ring-0 transition-all outline-none placeholder-[#636366] text-[#E5E5EA]"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 justify-end">
        <LanguageSelector />
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative hover:bg-[#2C2C2E] text-[#8E8E93] hover:text-[#E5E5EA]">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#A81932] rounded-full border border-[#1C1C1E]" />
          </Button>
          <div className="flex items-center gap-3 ml-2 cursor-pointer group hover:bg-[#2C2C2E] p-1.5 rounded-sm transition-colors">
            <div className="h-8 w-8 rounded-full overflow-hidden border border-[#3A3A3C] flex items-center justify-center bg-[#2C2C2E]">
              <img src="https://ui-avatars.com/api/?name=David+Ma&background=2C2C2E&color=E5E5EA" alt="David Ma" className="w-full h-full object-cover" />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-semibold text-[#E5E5EA] leading-tight group-hover:text-[#A81932] transition-colors">David Ma</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Navbar };
