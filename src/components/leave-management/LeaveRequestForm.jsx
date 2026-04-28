import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Info, Calendar } from 'lucide-react';

const LeaveRequestForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Urlaubsantrag stellen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
           <div className="p-4 bg-[#2D0A14] rounded-sm border border-[#6D1020]">
              <p className="text-[9px] uppercase tracking-widest font-bold text-[#A81932] mb-1">Jahresurlaub</p>
              <h4 className="text-xl font-bold text-[#E5E5EA]">14 Tage <span className="text-xs font-normal text-[#8E8E93]">verfügbar</span></h4>
           </div>
           <div className="p-4 bg-[#0A3D0A] rounded-sm border border-[#166534]">
              <p className="text-[9px] uppercase tracking-widest font-bold text-[#4ADE80] mb-1">Kranktage</p>
              <h4 className="text-xl font-bold text-[#E5E5EA]">Unbegrenzt</h4>
           </div>
           <div className="p-4 bg-[#3D2E00] rounded-sm border border-[#854D0E]">
              <p className="text-[9px] uppercase tracking-widest font-bold text-[#FACC15] mb-1">Sonderurlaub</p>
              <h4 className="text-xl font-bold text-[#E5E5EA]">3 Tage <span className="text-xs font-normal text-[#8E8E93]">genutzt</span></h4>
           </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest ml-1">Art des Urlaubs</label>
                <select className="w-full bg-[#2C2C2E] border border-transparent hover:border-[#3A3A3C] rounded-sm py-2.5 px-4 text-sm focus:bg-[#3A3A3C] focus:border-[#A81932] focus:ring-0 outline-none transition-all text-[#E5E5EA]">
                   <option>Jahresurlaub</option>
                   <option>Sonderurlaub</option>
                   <option>Elternzeit</option>
                   <option>Unbezahlter Urlaub</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest ml-1">Zuständiger Manager</label>
                <select className="w-full bg-[#2C2C2E] border border-transparent hover:border-[#3A3A3C] rounded-sm py-2.5 px-4 text-sm focus:bg-[#3A3A3C] focus:border-[#A81932] focus:ring-0 outline-none transition-all text-[#E5E5EA]">
                   <option>Sarah Connor (Standortleitung)</option>
                   <option>Robert Smith (PM)</option>
                </select>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest ml-1">Beginn</label>
                <input type="date" className="w-full bg-[#2C2C2E] border border-transparent hover:border-[#3A3A3C] rounded-sm py-2.5 px-4 text-sm focus:bg-[#3A3A3C] focus:border-[#A81932] focus:ring-0 outline-none transition-all text-[#E5E5EA]" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest ml-1">Ende</label>
                <input type="date" className="w-full bg-[#2C2C2E] border border-transparent hover:border-[#3A3A3C] rounded-sm py-2.5 px-4 text-sm focus:bg-[#3A3A3C] focus:border-[#A81932] focus:ring-0 outline-none transition-all text-[#E5E5EA]" />
             </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest ml-1">Begründung (Optional)</label>
            <textarea placeholder="Geben Sie hier ggf. weitere Details an..." className="w-full bg-[#2C2C2E] border border-transparent hover:border-[#3A3A3C] rounded-sm py-3 px-4 text-sm focus:bg-[#3A3A3C] focus:border-[#A81932] focus:ring-0 outline-none transition-all text-[#E5E5EA] h-24 resize-none placeholder-[#636366]" />
          </div>

          <div className="bg-[#2D0A14] p-4 rounded-sm border border-[#6D1020] flex gap-3">
             <Info className="text-[#A81932] shrink-0" size={16} />
             <p className="text-[11px] text-[#E08999] leading-relaxed">
                Ihr Antrag wird zur Prüfung an den gewählten Manager weitergeleitet. Sie erhalten eine Benachrichtigung, sobald Ihr Antrag bearbeitet wurde.
             </p>
          </div>

          <Button className="w-full h-11 text-[11px] uppercase tracking-wider font-bold">Antrag absenden</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { LeaveRequestForm };
