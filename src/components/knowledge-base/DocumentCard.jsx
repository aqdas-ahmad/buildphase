import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { FileText, Download, Eye, MoreVertical } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

const DocumentCard = ({ title, type, date, size, version }) => (
  <Card className="group overflow-hidden">
    <div className="h-1 bg-[#F3F2F1] w-full">
       <div className="h-full bg-[#4B53BC] w-1/4 transition-all group-hover:w-full duration-500" />
    </div>
    <CardContent className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-[#F3F2F1] rounded-sm text-[#605E5C] group-hover:text-[#4B53BC] transition-colors">
          <FileText size={20} />
        </div>
        <Badge variant="primary">v{version}</Badge>
      </div>
      
      <h4 className="text-sm font-bold text-[#323130] mb-1 group-hover:text-[#4B53BC] transition-colors line-clamp-1">
        {title}
      </h4>
      <p className="text-[10px] text-[#A19F9D] font-bold uppercase tracking-widest mb-6">
        {type} • {size}
      </p>

      <div className="flex items-center gap-2 pt-4 border-t border-[#EDEBE9]">
        <Button variant="outline" size="sm" className="flex-1 h-8 text-[9px] uppercase tracking-widest font-bold">
          <Eye size={12} className="mr-2" />
          Vorschau
        </Button>
        <Button size="sm" className="h-8 w-8 p-0">
          <Download size={12} />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#A19F9D]">
          <MoreVertical size={12} />
        </Button>
      </div>
    </CardContent>
  </Card>
);

const DocumentGrid = () => {
  const documents = [
    { title: "Gefährdungsbeurteilung - Bauabschnitt A", type: "PDF", date: "Vorletzte Woche", size: "2,4 MB", version: "1.2" },
    { title: "Lageplan Final - Tiefbau", type: "CAD", date: "Vor 2 Tagen", size: "15,8 MB", version: "2.4" },
    { title: "Sicherheitshandbuch 2024", type: "PDF", date: "Jan 2024", size: "4,1 MB", version: "4.0" },
    { title: "Notfallplan Standort Ost", type: "PDF", date: "Letzter Monat", size: "1,2 MB", version: "1.1" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {documents.map((doc, idx) => (
        <DocumentCard key={idx} {...doc} />
      ))}
    </div>
  );
};

export { DocumentGrid };
