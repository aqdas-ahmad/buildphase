import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { User, Bell, Globe, Shield, Loader2, CheckCircle2 } from 'lucide-react';
import api from '../utils/api';

const Section = ({ icon: Icon, title, children }) => (
  <Card className="mb-4">
    <CardContent className="p-6">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#2C2C2E]">
        <div className="p-2 bg-[#2C2C2E] rounded-sm"><Icon size={15} className="text-[#A81932]" /></div>
        <h3 className="text-sm font-bold text-[#E5E5EA] uppercase tracking-widest">{title}</h3>
      </div>
      {children}
    </CardContent>
  </Card>
);

const Field = ({ label, children }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center py-3 border-b border-[#1C1C1E] last:border-0">
    <label className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-widest">{label}</label>
    <div className="md:col-span-2">{children}</div>
  </div>
);

const inputClass = "w-full bg-[#2C2C2E] border border-[#3A3A3C] rounded-sm py-2 px-3 text-sm text-[#E5E5EA] outline-none focus:border-[#A81932]";

export default function Settings() {
  const [profile, setProfile] = useState({ name: '', role: '', location: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, push: false, weekly: true });
  const [language, setLanguage] = useState('de');

  useEffect(() => {
    api.get('/user/profile')
      .then(r => setProfile({ name: r.data.name || '', role: r.data.role || '', location: r.data.location || '' }))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/user/profile', profile);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-[#A81932]" size={36} /></div>;

  return (
    <div className="max-w-[900px] mx-auto animate-in fade-in duration-500">
      <div className="mb-8 border-b border-[#2C2C2E] pb-8">
        <h2 className="text-3xl font-bold text-[#E5E5EA] tracking-tight">Einstellungen</h2>
        <p className="text-[#8E8E93] mt-1 text-sm">Konto und Systemeinstellungen verwalten</p>
      </div>

      <form onSubmit={handleSave}>
        <Section icon={User} title="Profil">
          <Field label="Name">
            <input value={profile.name} onChange={e => setProfile(p => ({...p, name: e.target.value}))} className={inputClass} />
          </Field>
          <Field label="Position">
            <input value={profile.role} onChange={e => setProfile(p => ({...p, role: e.target.value}))} className={inputClass} />
          </Field>
          <Field label="Standort">
            <input value={profile.location} onChange={e => setProfile(p => ({...p, location: e.target.value}))} className={inputClass} />
          </Field>
          <div className="pt-4">
            <Button type="submit" disabled={saving}>
              {saving ? <Loader2 className="animate-spin" size={14} /> : saved ? <><CheckCircle2 size={14} className="mr-2" />Gespeichert</> : 'Profil speichern'}
            </Button>
          </div>
        </Section>
      </form>

      <Section icon={Bell} title="Benachrichtigungen">
        {[
          ['email', 'E-Mail Benachrichtigungen', 'Erhalte Updates per E-Mail'],
          ['push', 'Push Benachrichtigungen', 'Browser-Benachrichtigungen aktivieren'],
          ['weekly', 'Wochenbericht', 'Automatischer Wochenbericht per E-Mail'],
        ].map(([key, label, desc]) => (
          <Field key={key} label={label}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#636366]">{desc}</span>
              <button type="button" onClick={() => setNotifications(p => ({...p, [key]: !p[key]}))}
                className={`relative w-10 h-5 rounded-full transition-colors ${notifications[key] ? 'bg-[#A81932]' : 'bg-[#3A3A3C]'}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${notifications[key] ? 'left-5.5 translate-x-0.5' : 'left-0.5'}`} style={{ left: notifications[key] ? '22px' : '2px' }} />
              </button>
            </div>
          </Field>
        ))}
      </Section>

      <Section icon={Globe} title="Sprache & Region">
        <Field label="Sprache">
          <select value={language} onChange={e => setLanguage(e.target.value)} className={inputClass}>
            <option value="de">Deutsch</option>
            <option value="en">English</option>
          </select>
        </Field>
        <Field label="Zeitzone">
          <select className={inputClass} defaultValue="europe-berlin">
            <option value="europe-berlin">Europe/Berlin (UTC+1)</option>
            <option value="europe-london">Europe/London (UTC+0)</option>
            <option value="america-new_york">America/New_York (UTC-5)</option>
          </select>
        </Field>
      </Section>

      <Section icon={Shield} title="Sicherheit">
        <Field label="Passwort">
          <Button type="button" onClick={() => alert('Passwort-Reset-E-Mail gesendet.')}>Passwort zurücksetzen</Button>
        </Field>
        <Field label="2-Faktor-Auth">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-[#636366] bg-[#2C2C2E] px-2 py-1 rounded-sm uppercase tracking-widest">Deaktiviert</span>
            <Button type="button" onClick={() => alert('2FA-Konfiguration kommt bald.')}>Aktivieren</Button>
          </div>
        </Field>
      </Section>
    </div>
  );
}
