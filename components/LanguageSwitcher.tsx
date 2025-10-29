import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };
  
  const nextLang = language === 'ar' ? 'EN' : 'AR';

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-2 border border-slate-600 text-sm font-bold rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
      aria-label={`Switch to ${nextLang}`}
    >
      {nextLang}
    </button>
  );
};

export default LanguageSwitcher;