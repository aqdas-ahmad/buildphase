import React from 'react';
import { FolderBrowser } from '../components/knowledge-base/FolderBrowser';
import { DocumentGrid } from '../components/knowledge-base/DocumentCard';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';

const KnowledgeBase = () => {
  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-[#EDEBE9] pb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#323130] tracking-tight">Wissensdatenbank</h2>
          <p className="text-[#605E5C] mt-2 text-sm">Technische Dokumentationen, SOPs und Vorlagen.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="gap-2 h-9 text-[11px] uppercase tracking-wider">
              <Filter size={14} />
              Filter
           </Button>
           <Button variant="outline" className="gap-2 h-9 text-[11px] uppercase tracking-wider">
              <SlidersHorizontal size={14} />
              Sortieren
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-12">
        <div className="lg:col-span-1">
          <FolderBrowser />
        </div>
        <div className="lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
             <h3 className="text-[10px] font-bold text-[#605E5C] uppercase tracking-widest">Empfohlene Dokumente</h3>
             <p className="text-[9px] text-[#A19F9D] font-bold uppercase tracking-widest">4 von 59 Dokumenten</p>
          </div>
          <DocumentGrid />
          
          <div className="mt-12 p-8 bg-[#323130] rounded-sm relative overflow-hidden group">
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                   <h4 className="text-lg font-bold text-white mb-2">Dokument nicht gefunden?</h4>
                   <p className="text-[#A19F9D] text-sm">Fordern Sie neue Dokumente direkt bei der Standortleitung an.</p>
                </div>
                <Button className="bg-white text-[#323130] hover:bg-[#F3F2F1] whitespace-nowrap px-8 rounded-sm h-11 font-bold text-[11px] uppercase tracking-wider">Anfrage stellen</Button>
             </div>
             <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#4B53BC]/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
