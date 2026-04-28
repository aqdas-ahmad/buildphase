import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ExternalLink, Clock, Loader2 } from 'lucide-react';
import api from '../../utils/api';
import { useLanguage } from '../../context/LanguageContext';

const NewsItem = ({ tag, title, date, excerpt, variant = 'primary' }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-3 py-5 border-b border-[#2C2C2E] last:border-0 group cursor-pointer">
      <div className="flex items-center gap-3">
        <Badge variant={variant}>{tag}</Badge>
        <span className="text-[9px] text-[#636366] font-bold uppercase tracking-widest flex items-center gap-1">
          <Clock size={10} /> {date}
        </span>
      </div>
      <h4 className="text-sm font-bold text-[#E5E5EA] group-hover:text-[#A81932] transition-colors leading-tight">
        {title}
      </h4>
      <p className="text-[11px] text-[#8E8E93] line-clamp-2 leading-relaxed">
        {excerpt}
      </p>
      <div className="flex items-center gap-1 text-[9px] font-bold text-[#A81932] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
        <span>{t('readMore')}</span>
        <ExternalLink size={10} />
      </div>
    </div>
  );
};

const NewsFeed = ({ onTabChange }) => {
  const { t } = useLanguage();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await api.get('/activities');
        setNews(data);
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('news')}</CardTitle>
        <button 
          onClick={() => onTabChange('dashboard')}
          className="text-[9px] font-bold uppercase tracking-widest text-[#636366] hover:text-[#A81932] transition-colors"
        >
          {t('viewAll')}
        </button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-[#A81932]" size={24} />
          </div>
        ) : news.length > 0 ? (
          news.map((item, idx) => (
            <NewsItem key={idx} {...item} />
          ))
        ) : (
          <p className="text-center py-12 text-[#636366] text-sm">{t('noNews')}</p>
        )}
      </CardContent>
    </Card>
  );
};

export { NewsFeed };
