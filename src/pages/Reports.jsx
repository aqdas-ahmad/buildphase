import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Folder, CheckSquare, Clock, Users, TrendingUp, Loader2 } from 'lucide-react';
import api from '../utils/api';

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <Card>
    <CardContent className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-[#2C2C2E] rounded-sm"><Icon size={18} style={{ color }} /></div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#636366]">{sub}</span>
      </div>
      <p className="text-2xl font-bold text-[#E5E5EA] mb-1">{value}</p>
      <p className="text-[11px] text-[#8E8E93]">{label}</p>
    </CardContent>
  </Card>
);

export default function Reports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/reports')
      .then(r => setData(r.data))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-[#A81932]" size={36} /></div>;
  if (!data) return <div className="text-center text-[#636366] py-20">Daten konnten nicht geladen werden.</div>;

  const completionRate = data.totalTasks > 0 ? Math.round((data.completedTasks / data.totalTasks) * 100) : 0;
  const hoursByProject = Object.entries(data.hoursByProject || {}).sort((a, b) => b[1] - a[1]);

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">
      <div className="mb-8 border-b border-[#2C2C2E] pb-8">
        <h2 className="text-3xl font-bold text-[#E5E5EA] tracking-tight">Berichte</h2>
        <p className="text-[#8E8E93] mt-1 text-sm">Übersicht aller Kennzahlen</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Folder} label="Projekte gesamt" value={data.totalProjects} sub={`${data.activeProjects} aktiv`} color="#A81932" />
        <StatCard icon={CheckSquare} label="Aufgaben gesamt" value={data.totalTasks} sub={`${data.completedTasks} erledigt`} color="#4ADE80" />
        <StatCard icon={Clock} label="Stunden erfasst" value={data.totalHours} sub="Gesamt" color="#60A5FA" />
        <StatCard icon={Users} label="Teammitglieder" value={data.teamSize} sub="Aktiv" color="#FACC15" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        <Card>
          <CardContent className="p-5">
            <h3 className="text-sm font-bold text-[#E5E5EA] mb-1 uppercase tracking-widest">Aufgaben-Completion</h3>
            <p className="text-[11px] text-[#636366] mb-6">{data.completedTasks} von {data.totalTasks} Aufgaben erledigt</p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-[#E5E5EA]">{completionRate}%</span>
              <span className="text-[#8E8E93] text-sm mb-1">Abschlussrate</span>
            </div>
            <div className="w-full bg-[#2C2C2E] rounded-full h-2 mt-4">
              <div className="h-2 rounded-full bg-[#A81932] transition-all duration-700" style={{ width: `${completionRate}%` }} />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[9px] text-[#636366]">0%</span>
              <span className="text-[9px] text-[#636366]">100%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h3 className="text-sm font-bold text-[#E5E5EA] mb-1 uppercase tracking-widest">Stunden nach Projekt</h3>
            <p className="text-[11px] text-[#636366] mb-6">{data.totalHours}h insgesamt erfasst</p>
            {hoursByProject.length === 0 ? (
              <p className="text-[#636366] text-xs text-center py-8">Noch keine Zeiterfassung</p>
            ) : (
              <div className="space-y-4">
                {hoursByProject.slice(0, 6).map(([name, hours]) => {
                  const pct = data.totalHours > 0 ? Math.round((hours / parseFloat(data.totalHours)) * 100) : 0;
                  return (
                    <div key={name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[11px] text-[#E5E5EA] truncate max-w-[200px]">{name}</span>
                        <span className="text-[11px] text-[#8E8E93] ml-2 flex-shrink-0">{hours.toFixed(1)}h · {pct}%</span>
                      </div>
                      <div className="w-full bg-[#2C2C2E] rounded-full h-1.5">
                        <div className="h-1.5 rounded-full bg-[#A81932]" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardContent className="p-5">
            <h3 className="text-sm font-bold text-[#E5E5EA] mb-6 uppercase tracking-widest">Zusammenfassung</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Aktive Projekte', value: data.activeProjects, total: data.totalProjects, color: '#A81932' },
                { label: 'Offene Aufgaben', value: data.totalTasks - data.completedTasks, total: data.totalTasks, color: '#FACC15' },
                { label: 'Erledigte Aufgaben', value: data.completedTasks, total: data.totalTasks, color: '#4ADE80' },
                { label: 'Ø Stunden/Projekt', value: data.totalProjects > 0 ? (parseFloat(data.totalHours) / data.totalProjects).toFixed(1) : '0', total: null, color: '#60A5FA' },
              ].map(({ label, value, total, color }) => (
                <div key={label} className="text-center">
                  <div className="text-3xl font-bold mb-1" style={{ color }}>{value}</div>
                  {total !== null && <div className="text-[9px] text-[#636366] mb-1">von {total}</div>}
                  <div className="text-[10px] text-[#8E8E93] uppercase tracking-widest">{label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
