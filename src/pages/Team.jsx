import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Users, Mail, MapPin, Plus, Trash2, Loader2, X } from 'lucide-react';
import api from '../utils/api';

const statusColor = { 'Aktiv': '#4ADE80', 'Urlaub': '#FACC15', 'Krank': '#F87171', 'Remote': '#60A5FA' };
const departments = ['Projektleitung', 'Bauleitung', 'Technik', 'Verwaltung', 'Planung'];

const emptyForm = { name: '', role: '', email: '', department: 'Projektleitung', location: '', status: 'Aktiv' };

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const fetchMembers = async () => {
    try { const { data } = await api.get('/team'); setMembers(data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try { await api.post('/team', form); setShowForm(false); setForm(emptyForm); fetchMembers(); }
    catch (e) { console.error(e); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Mitglied entfernen?')) return;
    try { await api.delete(`/team/${id}`); fetchMembers(); }
    catch (e) { console.error(e); }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-[#A81932]" size={36} /></div>;

  const byDept = departments.reduce((acc, d) => {
    acc[d] = members.filter(m => m.department === d);
    return acc;
  }, {});
  const other = members.filter(m => !departments.includes(m.department));
  if (other.length) byDept['Sonstige'] = other;

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-[#2C2C2E] pb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#E5E5EA] tracking-tight">Team</h2>
          <p className="text-[#8E8E93] mt-1 text-sm">{members.length} Mitarbeiter</p>
        </div>
        <Button onClick={() => setShowForm(true)}><Plus size={14} className="mr-2" />Mitglied hinzufügen</Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#E5E5EA] uppercase tracking-widest">Neues Mitglied</h3>
              <button onClick={() => setShowForm(false)}><X size={16} className="text-[#636366] hover:text-[#E5E5EA]" /></button>
            </div>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[['name','Name',true],['role','Position',true],['email','E-Mail',false],['location','Standort',false]].map(([key,label,req]) => (
                <div key={key}>
                  <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">{label}{req ? ' *' : ''}</label>
                  <input required={req} value={form[key]} onChange={e => setForm(p => ({...p,[key]:e.target.value}))}
                    className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]" />
                </div>
              ))}
              <div>
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">Abteilung</label>
                <select value={form.department} onChange={e => setForm(p => ({...p,department:e.target.value}))}
                  className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]">
                  {departments.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">Status</label>
                <select value={form.status} onChange={e => setForm(p => ({...p,status:e.target.value}))}
                  className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]">
                  {Object.keys(statusColor).map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="md:col-span-3"><Button type="submit">Speichern</Button></div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-8 pb-12">
        {Object.entries(byDept).filter(([,arr]) => arr.length > 0).map(([dept, arr]) => (
          <div key={dept}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E93]">{dept}</span>
              <span className="text-[10px] font-bold bg-[#2C2C2E] text-[#636366] px-2 py-0.5 rounded-full">{arr.length}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {arr.map(m => (
                <Card key={m._id} className="hover:border-[#3A3A3C] transition-all group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#2C2C2E] border border-[#3A3A3C] flex items-center justify-center text-sm font-bold text-[#A81932]">
                        {m.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm" style={{ color: statusColor[m.status] || '#8E8E93', backgroundColor: (statusColor[m.status] || '#8E8E93') + '20' }}>{m.status}</span>
                        <button onClick={() => handleDelete(m._id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#636366] hover:text-[#F87171]"><Trash2 size={13} /></button>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-[#E5E5EA] mb-0.5">{m.name}</p>
                    <p className="text-[11px] text-[#8E8E93] mb-3">{m.role}</p>
                    <div className="space-y-1">
                      {m.email && <p className="text-[10px] text-[#636366] flex items-center gap-1.5"><Mail size={9} />{m.email}</p>}
                      {m.location && <p className="text-[10px] text-[#636366] flex items-center gap-1.5"><MapPin size={9} />{m.location}</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
        {members.length === 0 && (
          <div className="border border-dashed border-[#2C2C2E] rounded-sm p-12 text-center text-[#636366] text-xs">
            <Users size={32} className="mx-auto mb-3 opacity-30" />
            Noch keine Teammitglieder
          </div>
        )}
      </div>
    </div>
  );
}
