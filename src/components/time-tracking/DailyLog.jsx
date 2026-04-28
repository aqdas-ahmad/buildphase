import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { FileCheck, Pencil, Trash2, Loader2, Inbox } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

const LogItem = ({ date, jobName, hours, status, description }) => (
  <tr className="border-b border-[#2C2C2E] last:border-0 group hover:bg-[#2C2C2E] transition-colors">
    <td className="py-4 px-6">
      <p className="text-xs font-bold text-[#E5E5EA]">{date}</p>
      <p className="text-[10px] text-[#636366] mt-0.5">ID: #ZE-{Math.floor(1000 + Math.random() * 9000)}</p>
    </td>
    <td className="py-4 px-4">
      <p className="text-xs font-bold text-[#E5E5EA]">{jobName}</p>
      <p className="text-[10px] text-[#8E8E93] line-clamp-1">{description}</p>
    </td>
    <td className="py-4 px-4">
      <Badge variant="primary">{hours}h</Badge>
    </td>
    <td className="py-4 px-4">
      <Badge variant={status === 'Genehmigt' ? 'success' : 'warning'}>{status}</Badge>
    </td>
    <td className="py-4 px-6 text-right">
      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#8E8E93] hover:text-[#A81932] hover:bg-[#2C2C2E] border border-transparent hover:border-[#3A3A3C]">
          <Pencil size={14} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#F87171] hover:bg-[#3D0A0A] border border-transparent hover:border-[#991B1B]">
          <Trash2 size={14} />
        </Button>
      </div>
    </td>
  </tr>
);

const DailyLog = ({ logs, loading }) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('recentLogs')}</CardTitle>
        <Button variant="outline" size="sm" className="h-8 text-[10px] uppercase tracking-wider font-bold">
           <FileCheck size={14} className="mr-2" />
           {t('export')}
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#2C2C2E] border-y border-[#3A3A3C]">
                <th className="py-2.5 px-6 text-[9px] font-bold uppercase tracking-widest text-[#8E8E93]">{t('date')}</th>
                <th className="py-2.5 px-4 text-[9px] font-bold uppercase tracking-widest text-[#8E8E93]">{t('projects')} & {t('tasks')}</th>
                <th className="py-2.5 px-4 text-[9px] font-bold uppercase tracking-widest text-[#8E8E93]">{t('duration')}</th>
                <th className="py-2.5 px-4 text-[9px] font-bold uppercase tracking-widest text-[#8E8E93]">{t('status')}</th>
                <th className="py-2.5 px-6 text-[9px] font-bold uppercase tracking-widest text-[#8E8E93] text-right">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="animate-spin text-[#A81932]" size={32} />
                      <p className="text-[10px] text-[#8E8E93] uppercase font-bold tracking-widest">{t('loadingLogs')}</p>
                    </div>
                  </td>
                </tr>
              ) : logs.length > 0 ? (
                logs.map((entry, idx) => (
                  <LogItem 
                    key={idx} 
                    {...entry} 
                    status={entry.status === 'Genehmigt' ? t('approved') : t('pending')}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-[#636366]">
                      <Inbox size={48} strokeWidth={1} />
                      <p className="text-sm">{t('noLogs')}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export { DailyLog };
