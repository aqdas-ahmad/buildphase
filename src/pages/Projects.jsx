import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Folder, Users, Clock, Plus, Trash2, Loader2, X } from 'lucide-react';
import api from '../utils/api';

const statusColor = { 'Aktiv': '#4ADE80', 'Planung': '#FACC15', 'Abgeschlossen': '#60A5FA', 'Pausiert': '#F87171' };

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', client: '', status: 'Aktiv', phase: 'LPH 1', progress: 0, teamSize: 1, hours: 0 });

  const fetchProjects = async () => {
    try { const { data } = await api.get('/projects'); setProjects(data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try { await api.post('/projects', form); setShowForm(false); setForm({ name: '', client: '', status: 'Aktiv', phase: 'LPH 1', progress: 0, teamSize: 1, hours: 0 }); fetchProjects(); }
    catch (e) { console.error(e); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Projekt löschen?')) return;
    try { await api.delete(`/projects/${id}`); fetchProjects(); }
    catch (e) { console.error(e); }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-[#A81932]" size={36} /></div>;

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-[#2C2C2E] pb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#E5E5EA] tracking-tight">Projekte</h2>
          <p className="text-[#8E8E93] mt-1 text-sm">{projects.length} Projekte im Portfolio</p>
        </div>
        <Button onClick={() => setShowForm(true)}><Plus size={14} className="mr-2" />Neues Projekt</Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#E5E5EA] uppercase tracking-widest">Neues Projekt</h3>
              <button onClick={() => setShowForm(false)}><X size={16} className="text-[#636366] hover:text-[#E5E5EA]" /></button>
            </div>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[['name','Projektname','text',true],['client','Auftraggeber','text',true],['phase','Phase','text',false]].map(([key,label,type,req]) => (
                <div key={key}>
                  <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">{label}</label>
                  <input required={req} type={type} value={form[key]} onChange={e => setForm(p => ({...p,[key]:e.target.value}))}
                    className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]" />
                </div>
              ))}
              <div>
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">Status</label>
                <select value={form.status} onChange={e => setForm(p => ({...p,status:e.target.value}))}
                  className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]">
                  {['Aktiv','Planung','Pausiert','Abgeschlossen'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">Fortschritt (%)</label>
                <input type="number" min="0" max="100" value={form.progress} onChange={e => setForm(p => ({...p,progress:+e.target.value}))}
                  className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]" />
              </div>
              <div className="md:col-span-3">
                <Button type="submit">Speichern</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-12">
        {projects.map(p => (
          <Card key={p._id} className="hover:border-[#3A3A3C] transition-all group">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-[#2C2C2E] rounded-sm"><Folder size={18} className="text-[#A81932]" /></div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm" style={{ color: statusColor[p.status] || '#8E8E93', backgroundColor: (statusColor[p.status] || '#8E8E93') + '20' }}>{p.status}</span>
                  <button onClick={() => handleDelete(p._id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#636366] hover:text-[#F87171]"><Trash2 size={13} /></button>
                </div>
              </div>
              <h3 className="text-sm font-bold text-[#E5E5EA] mb-1">{p.name}</h3>
              <p className="text-[11px] text-[#636366] mb-4">{p.client}{p.phase ? ` · ${p.phase}` : ''}</p>
              <div className="w-full bg-[#2C2C2E] rounded-full h-1 mb-4">
                <div className="h-1 rounded-full bg-[#A81932]" style={{ width: `${p.progress || 0}%` }} />
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#636366] font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1"><Users size={10} />{p.teamSize || 0} Mitarbeiter</span>
                <span className="flex items-center gap-1"><Clock size={10} />{p.hours || 0}h</span>
                <span>{p.progress || 0}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
