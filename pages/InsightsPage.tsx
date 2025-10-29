import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const InsightsPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-slate-100">{t('insightsPage.title')}</h1>
      <p className="text-slate-300 mt-4 max-w-xl mx-auto">{t('insightsPage.subtitle')}</p>
    </div>
  );
};

export default InsightsPage;
