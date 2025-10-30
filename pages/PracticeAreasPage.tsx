import React, { useEffect, useMemo } from 'react';
import { getAboutData } from '../services/about_data';
import { useLanguage } from '../hooks/useLanguage';

const PracticeAreasPage: React.FC = () => {
  const { t, dir } = useLanguage();
  const { practiceAreas } = useMemo(() => getAboutData(t), [t]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 } // Trigger when 15% of the element is visible
    );

    const sections = document.querySelectorAll('.practice-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [practiceAreas]); // Rerun if practiceAreas change

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100">{t('practiceAreasPage.title')}</h1>
        <p className="text-slate-300 mt-2 max-w-2xl mx-auto text-base md:text-lg">{t('practiceAreasPage.subtitle')}</p>
      </div>

      <div className="mt-12 space-y-16">
        {practiceAreas.map((area, index) => (
          <section
            key={area.name}
            className="practice-section grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
          >
            {/* Image Column */}
            <div
              className={`practice-image-container glass-card p-2 max-w-lg mx-auto ${
                index % 2 === 0 ? 'md:order-2' : 'md:order-1'
              }`}
            >
              <img
                src={area.imageUrl}
                alt={area.name}
                className="practice-image rounded-lg object-cover w-full h-56 md:h-72 lg:h-80"
              />
            </div>

            {/* Text Column */}
            <div
              className={`glass-card p-6 rounded-xl flex flex-col justify-center ${
                index % 2 === 0 ? 'md:order-1' : 'md:order-2'
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-3">{area.name}</h3>
              <p className="text-slate-300 leading-relaxed mb-4 text-sm md:text-base">{area.description}</p>
              <div className="mt-2">
                 <button className="inline-flex items-center font-semibold text-amber-400 bg-amber-900/50 hover:bg-amber-900/80 transition-colors group px-4 py-2 rounded-lg">
                    {t('practiceAreasPage.requestConsultation')}
                    <svg className={`w-5 h-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${dir === 'rtl' ? 'mr-3' : 'ml-3'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default PracticeAreasPage;