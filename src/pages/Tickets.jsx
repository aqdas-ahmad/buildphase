import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AlertCircle, CheckCircle2, Clock, Plus, Trash2, Loader2, X } from 'lucide-react';
import api from '../utils/api';

const priorityColor = { 'Kritisch': '#F87171', 'Hoch': '#FB923C', 'Mittel': '#FACC15', 'Niedrig': '#4ADE80' };
const statusIcon = { 'Offen': AlertCircle, 'In Bearbeitung': Clock, 'Gelöst': CheckCircle2 };
const statusColor = { 'Offen': '#F87171', 'In Bearbeitung': '#FACC15', 'Gelöst': '#4ADE80' };

const emptyForm = { title: '', description: '', category: 'Technik', priority: 'Mittel', status: 'Offen', assignee: '' };

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState('Alle');

  const fetchTickets = async () => {
    try { const { data } = await api.get('/tickets'); setTickets(data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTickets(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try { await api.post('/tickets', form); setShowForm(false); setForm(emptyForm); fetchTickets(); }
    catch (e) { console.error(e); }
  };

  const handleStatus = async (ticket) => {
    const next = ticket.status === 'Offen' ? 'In Bearbeitung' : ticket.status === 'In Bearbeitung' ? 'Gelöst' : 'Offen';
    try { await api.put(`/tickets/${ticket._id}`, { status: next }); fetchTickets(); }
    catch (e) { console.error(e); }
  };

  const handleDelete = async (id) => {
    try { await api.delete(`/tickets/${id}`); fetchTickets(); }
    catch (e) { console.error(e); }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-[#A81932]" size={36} /></div>;

  const filters = ['Alle', 'Offen', 'In Bearbeitung', 'Gelöst'];
  const filtered = filter === 'Alle' ? tickets : tickets.filter(t => t.status === filter);

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-[#2C2C2E] pb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#E5E5EA] tracking-tight">Tickets</h2>
          <p className="text-[#8E8E93] mt-1 text-sm">{tickets.filter(t => t.status !== 'Gelöst').length} offene Tickets</p>
        </div>
        <Button onClick={() => setShowForm(true)}><Plus size={14} className="mr-2" />Neues Ticket</Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#E5E5EA] uppercase tracking-widest">Neues Ticket</h3>
              <button onClick={() => setShowForm(false)}><X size={16} className="text-[#636366] hover:text-[#E5E5EA]" /></button>
            </div>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">Titel *</label>
                <input required value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))}
                  className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]" />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">Beschreibung</label>
                <textarea value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))}
                  className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932] h-20 resize-none" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">Kategorie</label>
                <select value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))}
                  className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]">
                  {['Technik', 'Sicherheit', 'Personal', 'Verwaltung', 'Sonstiges'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">Priorität</label>
                <select value={form.priority} onChange={e => setForm(p => ({...p, priority: e.target.value}))}
                  className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]">
                  {Object.keys(priorityColor).map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">Zuständig</label>
                <input value={form.assignee} onChange={e => setForm(p => ({...p, assignee: e.target.value}))}
                  className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]" />
              </div>
              <div className="md:col-span-2"><Button type="submit">Ticket erstellen</Button></div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-2 mb-6">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm transition-colors ${filter === f ? 'bg-[#A81932] text-white' : 'bg-[#2C2C2E] text-[#8E8E93] hover:text-[#E5E5EA]'}`}>
            {f} {f !== 'Alle' && `(${tickets.filter(t => t.status === f).length})`}
          </button>
        ))}
      </div>

      <div className="space-y-3 pb-12">
        {filtered.map(ticket => {
          const Icon = statusIcon[ticket.status] || AlertCircle;
          return (
            <Card key={ticket._id} className="hover:border-[#3A3A3C] transition-all group">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <button onClick={() => handleStatus(ticket)} className="mt-0.5 flex-shrink-0">
                    <Icon size={16} style={{ color: statusColor[ticket.status] || '#636366' }} />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className={`text-sm font-semibold ${ticket.status === 'Gelöst' ? 'text-[#636366] line-through' : 'text-[#E5E5EA]'}`}>{ticket.title}</p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ color: priorityColor[ticket.priority], backgroundColor: (priorityColor[ticket.priority] || '#8E8E93') + '20' }}>{ticket.priority}</span>
                        <button onClick={() => handleDelete(ticket._id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#636366] hover:text-[#F87171]"><Trash2 size={12} /></button>
                      </div>
                    </div>
                    {ticket.description && <p className="text-[11px] text-[#636366] mb-2 line-clamp-2">{ticket.description}</p>}
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#636366] bg-[#2C2C2E] px-2 py-0.5 rounded-sm">{ticket.category}</span>
                      {ticket.assignee && <span className="text-[10px] text-[#636366]">→ {ticket.assignee}</span>}
                      <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded" style={{ color: statusColor[ticket.status], backgroundColor: (statusColor[ticket.status] || '#8E8E93') + '20' }}>{ticket.status}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <div className="border border-dashed border-[#2C2C2E] rounded-sm p-12 text-center text-[#636366] text-xs">
            <AlertCircle size={32} className="mx-auto mb-3 opacity-30" />
            {filter === 'Alle' ? 'Noch keine Tickets' : `Keine Tickets mit Status "${filter}"`}
          </div>
        )}
      </div>
    </div>
  );
}
