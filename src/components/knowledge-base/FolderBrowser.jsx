import React from 'react';
import { ChevronRight, HardHat, ShieldCheck, FileText, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';

const FolderItem = ({ icon: Icon, label, files, color }) => (
  <button className="w-full flex items-center justify-between p-4 bg-[#F3F2F1] rounded-sm hover:bg-white hover:border-[#4B53BC] border border-transparent transition-all duration-200 group">
    <div className="flex items-center gap-4">
      <div className={cn("p-2.5 rounded-sm transition-transform group-hover:scale-105 duration-200", color)}>
        <Icon size={18} />
      </div>
      <div className="text-left">
        <p className="text-sm font-bold text-[#323130]">{label}</p>
        <p className="text-[10px] text-[#A19F9D] font-bold uppercase tracking-widest">{files} Dokumente</p>
      </div>
    </div>
    <ChevronRight size={14} className="text-[#A19F9D] group-hover:text-[#4B53BC] group-hover:translate-x-0.5 transition-all" />
  </button>
);

const FolderBrowser = () => {
  const folders = [
    { icon: ShieldCheck, label: "Sicherheit & Compliance", files: 12, color: "bg-[#DFF6DD] text-[#107C10]" },
    { icon: HardHat, label: "Arbeitsabläufe (SOP)", files: 24, color: "bg-[#E6E7F4] text-[#4B53BC]" },
    { icon: FileText, label: "Vorlagen & Formulare", files: 8, color: "bg-[#FFF4CE] text-[#797775]" },
    { icon: Settings, label: "Technische Leitfäden", files: 15, color: "bg-[#E6E7F4] text-[#4B53BC]" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
         <h3 className="text-[10px] font-bold text-[#605E5C] uppercase tracking-widest ml-1">Dokumentenbibliotheken</h3>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {folders.map((folder, idx) => (
          <FolderItem key={idx} {...folder} />
        ))}
      </div>
    </div>
  );
};

export { FolderBrowser };
