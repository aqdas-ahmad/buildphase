import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { Button } from '../ui/Button';

const TeamCalendar = () => {
  const days = ['S', 'M', 'D', 'M', 'D', 'F', 'S'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const awayPersonnel = [
    { date: 15, name: "Alice M.", type: "Jahresurlaub" },
    { date: 18, name: "Tom H.", type: "Krank" },
    { date: 22, name: "Sarah C.", type: "Jahresurlaub" },
    { date: 23, name: "Sarah C.", type: "Jahresurlaub" },
  ];
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
           <Users size={16} className="text-[#A81932]" />
           <CardTitle>Team-Verfügbarkeit</CardTitle>
        </div>
        <div className="flex gap-1">
           <Button variant="ghost" size="icon" className="h-7 w-7 text-[#8E8E93]"><ChevronLeft size={14} /></Button>
           <Button variant="ghost" size="icon" className="h-7 w-7 text-[#8E8E93]"><ChevronRight size={14} /></Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-[10px] text-[#636366] font-bold uppercase tracking-widest mb-6">Mai 2024</p>
        <div className="grid grid-cols-7 gap-y-3 text-center">
          {days.map((day, i) => (
            <span key={i} className="text-[10px] font-bold text-[#636366]">{day}</span>
          ))}
          {dates.map((date) => {
             const away = awayPersonnel.find(p => p.date === date);
             return (
               <div key={date} className="relative group flex justify-center">
                 <span className={`text-[11px] font-medium w-8 h-8 flex items-center justify-center rounded-sm cursor-default transition-all ${
                   date === 15 ? 'bg-[#A81932] text-white shadow-sm shadow-[#A81932]/20 font-bold' : 
                   away ? 'bg-[#3D0A0A] text-[#F87171]' : 'text-[#E5E5EA] hover:bg-[#2C2C2E]'
                 }`}>
                   {date}
                 </span>
                 {away && (
                    <div className="absolute bottom-full mb-2 hidden group-hover:block z-20">
                       <div className="bg-[#3A3A3C] text-white text-[10px] py-1 px-2 rounded-sm shadow-xl whitespace-nowrap">
                          {away.name} ({away.type})
                       </div>
                    </div>
                 )}
               </div>
             );
          })}
        </div>
        <div className="mt-8 space-y-3 border-t border-[#2C2C2E] pt-6">
           <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#2C2C2E] border border-[#3A3A3C] flex items-center justify-center text-[10px] font-bold text-[#E5E5EA]">AM</div>
              <div className="flex-1">
                 <p className="text-[11px] font-bold text-[#E5E5EA]">Alice Morgan</p>
                 <p className="text-[9px] text-[#F87171] font-bold uppercase tracking-tight">Abwesend bis 20. Mai</p>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#2C2C2E] border border-[#3A3A3C] flex items-center justify-center text-[10px] font-bold text-[#E5E5EA]">TH</div>
              <div className="flex-1">
                 <p className="text-[11px] font-bold text-[#E5E5EA]">Tom Harrison</p>
                 <p className="text-[9px] text-[#FACC15] font-bold uppercase tracking-tight">Krankmeldung</p>
              </div>
           </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { TeamCalendar };
