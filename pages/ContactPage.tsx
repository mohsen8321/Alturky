import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-100">{t('contactPage.title')}</h1>
        <p className="text-slate-300 mt-2 max-w-2xl mx-auto">{t('contactPage.subtitle')}</p>
      </div>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        <div className="glass-card p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-slate-100 mb-4 border-b-2 border-amber-500/50 pb-3">{t('footer.riyadh')}</h2>
           <ul className="space-y-4 text-slate-300">
              <li className="flex items-start">
                 <svg className="w-6 h-6 mt-1 me-3 rtl:me-3 ltr:mr-3 flex-shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                 <div>
                  <span className="font-semibold text-slate-100 block text-lg">{t('contactPage.phone')}</span>
                  <a href="tel:+966114612733" className="hover:text-amber-400 transition block text-lg" dir="ltr">+966 11 461 2733</a>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mt-1 me-3 rtl:me-3 ltr:mr-3 flex-shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <div>
                  <span className="font-semibold text-slate-100 block text-lg">{t('footer.email')}</span>
                  <a href="mailto:info@alturkilaw.com" className="hover:text-amber-400 transition text-lg">info@alturkilaw.com</a>
                </div>
              </li>
            </ul>
        </div>
        <div className="glass-card p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-slate-100 mb-4 border-b-2 border-amber-500/50 pb-3">{t('footer.beirut')}</h2>
          <ul className="space-y-4 text-slate-300">
             <li className="flex items-start">
                <svg className="w-6 h-6 mt-1 me-3 rtl:me-3 ltr:mr-3 flex-shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                 <div>
                  <span className="font-semibold text-slate-100 block text-lg">{t('contactPage.phone')}</span>
                  <a href="tel:+9613161119" className="hover:text-amber-400 transition block text-lg" dir="ltr">+961 3 161119</a>
                </div>
              </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
