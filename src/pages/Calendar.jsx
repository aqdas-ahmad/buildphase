import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ChevronLeft, ChevronRight, Plus, Trash2, Loader2, X } from 'lucide-react';
import api from '../utils/api';

const typeColor = { 'Meeting': '#60A5FA', 'Begehung': '#A81932', 'Abgabe': '#F87171', 'Intern': '#4ADE80', 'Sonstiges': '#FACC15' };
const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const MONTHS = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];

const emptyForm = { title: '', date: '', time: '', type: 'Meeting', project: '', description: '' };

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [current, setCurrent] = useState(new Date());

  const fetch = async () => {
    try { const { data } = await api.get('/events'); setEvents(data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try { await api.post('/events', form); setShowForm(false); setForm(emptyForm); fetch(); }
    catch (e) { console.error(e); }
  };

  const handleDelete = async (id) => {
    try { await api.delete(`/events/${id}`); fetch(); }
    catch (e) { console.error(e); }
  };

  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const days = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let i = 1; i <= lastDay.getDate(); i++) days.push(i);

  const eventsForDay = (day) => {
    if (!day) return [];
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date && e.date.startsWith(dateStr));
  };

  const upcomingEvents = events
    .filter(e => e.date >= new Date().toISOString().split('T')[0])
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 8);

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-[#A81932]" size={36} /></div>;

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-[#2C2C2E] pb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#E5E5EA] tracking-tight">Kalender</h2>
          <p className="text-[#8E8E93] mt-1 text-sm">{events.length} Termine gesamt</p>
        </div>
        <Button onClick={() => setShowForm(true)}><Plus size={14} className="mr-2" />Neuer Termin</Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#E5E5EA] uppercase tracking-widest">Neuer Termin</h3>
              <button onClick={() => setShowForm(false)}><X size={16} className="text-[#636366] hover:text-[#E5E5EA]" /></button>
            </div>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">Titel *</label>
                <input required value={form.title} onChange={e => setForm(p => ({...p,title:e.target.value}))}
                  className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">Datum *</label>
                <input required type="date" value={form.date} onChange={e => setForm(p => ({...p,date:e.target.value}))}
                  className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">Uhrzeit</label>
                <input type="time" value={form.time} onChange={e => setForm(p => ({...p,time:e.target.value}))}
                  className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">Typ</label>
                <select value={form.type} onChange={e => setForm(p => ({...p,type:e.target.value}))}
                  className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]">
                  {Object.keys(typeColor).map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">Projekt</label>
                <input value={form.project} onChange={e => setForm(p => ({...p,project:e.target.value}))}
                  className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]" />
              </div>
              <div className="md:col-span-2"><Button type="submit">Speichern</Button></div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#E5E5EA]">{MONTHS[month]} {year}</h3>
                <div className="flex gap-1">
                  <button onClick={() => setCurrent(new Date(year, month - 1, 1))} className="p-1.5 hover:bg-[#2C2C2E] rounded-sm text-[#8E8E93] hover:text-[#E5E5EA] transition-colors"><ChevronLeft size={16} /></button>
                  <button onClick={() => setCurrent(new Date(year, month + 1, 1))} className="p-1.5 hover:bg-[#2C2C2E] rounded-sm text-[#8E8E93] hover:text-[#E5E5EA] transition-colors"><ChevronRight size={16} /></button>
                </div>
              </div>
              <div className="grid grid-cols-7 mb-2">
                {DAYS.map(d => <div key={d} className="text-center text-[9px] font-bold text-[#636366] uppercase tracking-widest py-1">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-0.5">
                {days.map((day, i) => {
                  const dayEvents = eventsForDay(day);
                  const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
                  return (
                    <div key={i} className={`min-h-[52px] p-1 rounded-sm ${day ? 'hover:bg-[#2C2C2E]' : ''} ${isToday ? 'bg-[#2D0A14] border border-[#A81932]' : ''}`}>
                      {day && <span className={`text-[11px] font-bold block mb-1 ${isToday ? 'text-[#A81932]' : 'text-[#8E8E93]'}`}>{day}</span>}
                      {dayEvents.slice(0, 2).map(ev => (
                        <div key={ev._id} className="text-[8px] font-bold truncate px-1 rounded mb-0.5" style={{ backgroundColor: (typeColor[ev.type] || '#8E8E93') + '30', color: typeColor[ev.type] || '#8E8E93' }}>{ev.title}</div>
                      ))}
                      {dayEvents.length > 2 && <div className="text-[8px] text-[#636366]">+{dayEvents.length - 2}</div>}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-bold text-[#E5E5EA] mb-4 uppercase tracking-widest">Bevorstehende Termine</h3>
              {upcomingEvents.length === 0 ? (
                <p className="text-[#636366] text-xs text-center py-6">Keine bevorstehenden Termine</p>
              ) : (
                <div className="space-y-3">
                  {upcomingEvents.map(ev => (
                    <div key={ev._id} className="flex items-start gap-3 group">
                      <div className="w-1 h-full min-h-[40px] rounded-full flex-shrink-0" style={{ backgroundColor: typeColor[ev.type] || '#8E8E93' }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#E5E5EA] truncate">{ev.title}</p>
                        <p className="text-[10px] text-[#636366]">{ev.date}{ev.time ? ` · ${ev.time}` : ''}</p>
                        {ev.project && <p className="text-[10px] text-[#636366] truncate">{ev.project}</p>}
                      </div>
                      <button onClick={() => handleDelete(ev._id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#636366] hover:text-[#F87171] flex-shrink-0"><Trash2 size={12} /></button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
