import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CheckCircle2, Circle, Clock, Plus, Trash2, Loader2, X } from 'lucide-react';
import api from '../utils/api';

const priorityColor = { 'Hoch': '#F87171', 'Mittel': '#FACC15', 'Niedrig': '#4ADE80' };
const columns = ['Offen', 'In Arbeit', 'Erledigt'];

const emptyForm = { title: '', description: '', project: '', priority: 'Mittel', status: 'Offen', dueDate: '', assignee: '' };

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const fetch = async () => {
    try { const { data } = await api.get('/tasks'); setTasks(data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try { await api.post('/tasks', form); setShowForm(false); setForm(emptyForm); fetch(); }
    catch (e) { console.error(e); }
  };

  const toggleStatus = async (task) => {
    const next = task.status === 'Erledigt' ? 'Offen' : task.status === 'Offen' ? 'In Arbeit' : 'Erledigt';
    try { await api.put(`/tasks/${task._id}`, { status: next }); fetch(); }
    catch (e) { console.error(e); }
  };

  const handleDelete = async (id) => {
    try { await api.delete(`/tasks/${id}`); fetch(); }
    catch (e) { console.error(e); }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-[#A81932]" size={36} /></div>;

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-[#2C2C2E] pb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#E5E5EA] tracking-tight">Aufgaben</h2>
          <p className="text-[#8E8E93] mt-1 text-sm">{tasks.filter(t => t.status !== 'Erledigt').length} offene Aufgaben</p>
        </div>
        <Button onClick={() => setShowForm(true)}><Plus size={14} className="mr-2" />Neue Aufgabe</Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#E5E5EA] uppercase tracking-widest">Neue Aufgabe</h3>
              <button onClick={() => setShowForm(false)}><X size={16} className="text-[#636366] hover:text-[#E5E5EA]" /></button>
            </div>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">Titel *</label>
                <input required value={form.title} onChange={e => setForm(p => ({...p,title:e.target.value}))}
                  className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]" />
              </div>
              {[['project','Projekt'],['assignee','Zuständig'],['dueDate','Fällig am']].map(([key,label]) => (
                <div key={key}>
                  <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">{label}</label>
                  <input type={key==='dueDate'?'date':'text'} value={form[key]} onChange={e => setForm(p => ({...p,[key]:e.target.value}))}
                    className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]" />
                </div>
              ))}
              <div>
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">Priorität</label>
                <select value={form.priority} onChange={e => setForm(p => ({...p,priority:e.target.value}))}
                  className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]">
                  {['Hoch','Mittel','Niedrig'].map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest block mb-1">Status</label>
                <select value={form.status} onChange={e => setForm(p => ({...p,status:e.target.value}))}
                  className="w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]">
                  {columns.map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
              <div className="md:col-span-2"><Button type="submit">Aufgabe speichern</Button></div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12">
        {columns.map(col => (
          <div key={col}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E93]">{col}</span>
              <span className="text-[10px] font-bold bg-[#2C2C2E] text-[#636366] px-2 py-0.5 rounded-full">{tasks.filter(t => t.status === col).length}</span>
            </div>
            <div className="space-y-3">
              {tasks.filter(t => t.status === col).map(task => (
                <Card key={task._id} className="hover:border-[#3A3A3C] transition-all group">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <button onClick={() => toggleStatus(task)} className="mt-0.5 flex-shrink-0">
                        {task.status === 'Erledigt' ? <CheckCircle2 size={16} className="text-[#4ADE80]" /> : <Circle size={16} className="text-[#636366] hover:text-[#A81932] transition-colors" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold leading-tight ${task.status === 'Erledigt' ? 'text-[#636366] line-through' : 'text-[#E5E5EA]'}`}>{task.title}</p>
                        {task.project && <p className="text-[10px] text-[#636366] mt-1">{task.project}</p>}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ color: priorityColor[task.priority], backgroundColor: (priorityColor[task.priority] || '#8E8E93') + '20' }}>{task.priority}</span>
                          <div className="flex items-center gap-2">
                            {task.dueDate && <span className="flex items-center gap-1 text-[9px] text-[#636366]"><Clock size={9} />{task.dueDate}</span>}
                            <button onClick={() => handleDelete(task._id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#636366] hover:text-[#F87171]"><Trash2 size={11} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {tasks.filter(t => t.status === col).length === 0 && (
                <div className="border border-dashed border-[#2C2C2E] rounded-sm p-6 text-center text-[#636366] text-xs">Keine Aufgaben</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
