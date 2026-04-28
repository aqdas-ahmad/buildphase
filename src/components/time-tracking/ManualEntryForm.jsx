import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Calendar, Clock, ChevronDown, Loader2, CheckCircle2 } from 'lucide-react';
import api from '../../utils/api';
import { useLanguage } from '../../context/LanguageContext';

const InputGroup = ({ label, icon: Icon, placeholder, type = "text", value, onChange, name }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#636366] group-focus-within:text-[#A81932] transition-colors">
        <Icon size={14} />
      </div>
      <input 
        type={type} 
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="w-full bg-[#2C2C2E] border border-transparent hover:border-[#3A3A3C] rounded-sm py-2.5 pl-10 pr-4 text-sm focus:bg-[#3A3A3C] focus:border-[#A81932] focus:ring-0 outline-none transition-all text-[#E5E5EA] placeholder-[#636366]"
      />
    </div>
  </div>
);

const ManualEntryForm = ({ onEntryAdded }) => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    hours: '',
    description: '',
    jobName: ''
  });

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/projects');
        setProjects(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, jobName: data[0].name }));
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/time-logs', formData);
      setSuccess(true);
      setFormData({
        date: '',
        hours: '',
        description: '',
        jobName: projects[0]?.name || ''
      });
      if (onEntryAdded) onEntryAdded();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving time log:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('manualEntry')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputGroup 
              label={t('date')} 
              icon={Calendar} 
              placeholder="TT.MM.JJJJ" 
              type="date" 
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            <InputGroup 
              label={t('duration')} 
              icon={Clock} 
              placeholder="z.B. 8,5" 
              type="text" 
              name="hours"
              value={formData.hours}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest ml-1">{t('description')}</label>
            <textarea 
              name="description"
              placeholder={t('whatDidYouDo')}
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full bg-[#2C2C2E] border border-transparent hover:border-[#3A3A3C] rounded-sm py-3 px-4 text-sm focus:bg-[#3A3A3C] focus:border-[#A81932] focus:ring-0 outline-none transition-all text-[#E5E5EA] h-24 resize-none placeholder-[#636366]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-widest ml-1">{t('projectCostCenter')}</label>
            <div className="relative group">
              <select 
                name="jobName"
                value={formData.jobName}
                onChange={handleChange}
                required
                className="w-full bg-[#2C2C2E] border border-transparent hover:border-[#3A3A3C] rounded-sm py-2.5 px-4 text-sm focus:bg-[#3A3A3C] focus:border-[#A81932] focus:ring-0 outline-none appearance-none transition-all text-[#E5E5EA]"
              >
                {loading ? (
                  <option>{t('loading')}</option>
                ) : (
                  projects.map((p, idx) => (
                    <option key={idx} value={p.name}>{p.name}</option>
                  ))
                )}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#636366] pointer-events-none">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          <Button 
            type="submit"
            disabled={submitting}
            className="w-full h-11 text-[11px] uppercase tracking-wider font-bold"
          >
            {submitting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : success ? (
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>{t('saved')}</span>
              </div>
            ) : (
              t('saveEntry')
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { ManualEntryForm };
