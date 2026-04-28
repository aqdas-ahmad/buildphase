import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Clock, CheckCircle2, XCircle, FileText } from 'lucide-react';

const RequestRow = ({ type, dates, status, submittedOn }) => {
  const getIcon = () => {
    switch (status) {
      case 'Genehmigt': return <CheckCircle2 size={16} className="text-[#4ADE80]" />;
      case 'Abgelehnt': return <XCircle size={16} className="text-[#F87171]" />;
      default: return <Clock size={16} className="text-[#FACC15]" />;
    }
  };
  const getVariant = () => {
    switch (status) {
      case 'Genehmigt': return 'success';
      case 'Abgelehnt': return 'danger';
      default: return 'warning';
    }
  };
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#2C2C2E] last:border-0 group">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-[#2C2C2E] rounded-sm group-hover:scale-105 transition-transform">
          <FileText size={18} className="text-[#8E8E93]" />
        </div>
        <div>
          <p className="text-sm font-bold text-[#E5E5EA]">{type}</p>
          <p className="text-[10px] text-[#636366] mt-0.5">{dates} • Eingereicht am {submittedOn}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant={getVariant()} className="flex items-center gap-1.5 py-1 px-3">{getIcon()}{status}</Badge>
      </div>
    </div>
  );
};

const StatusDashboard = () => {
  const requests = [
    { type: "Jahresurlaub", dates: "12. Jun - 18. Jun", status: "Ausstehend", submittedOn: "14. Mai" },
    { type: "Sonderurlaub", dates: "02. Mai - 02. Mai", status: "Genehmigt", submittedOn: "28. Apr" },
    { type: "Jahresurlaub", dates: "10. Apr - 15. Apr", status: "Genehmigt", submittedOn: "01. Apr" },
    { type: "Jahresurlaub", dates: "01. Mär - 05. Mär", status: "Abgelehnt", submittedOn: "20. Feb" },
  ];
  return (
    <Card>
      <CardHeader><CardTitle>Antragshistorie</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-1">{requests.map((req, idx) => <RequestRow key={idx} {...req} />)}</div>
        <button className="w-full mt-6 py-3 text-[10px] font-bold text-[#636366] hover:text-[#A81932] transition-colors uppercase tracking-widest border-t border-[#2C2C2E]">Vollständige Historie ansehen</button>
      </CardContent>
    </Card>
  );
};

export { StatusDashboard };
