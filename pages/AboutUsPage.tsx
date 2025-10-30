import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getAboutData } from '../services/about_data';
import { TeamMember, PracticeArea } from '../types';
import { useLanguage } from '../hooks/useLanguage';

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="glass-card rounded-xl overflow-hidden text-center h-full">
    <img src={member.imageUrl} alt={member.name} className="w-full h-80 object-contain object-center bg-slate-800/50" />
    <div className="p-6">
      <h3 className="text-xl font-bold text-slate-100">{member.name}</h3>
      <p className="text-amber-400 font-semibold mt-1">{member.title}</p>
      <p className="text-slate-300 mt-4 text-sm leading-relaxed">{member.bio}</p>
    </div>
  </div>
);

const PracticeAreaDisplay: React.FC<{ area: PracticeArea }> = ({ area }) => {
    const { dir } = useLanguage();
    return (
        <div className="practice-area-details-container glass-card p-8 h-full flex items-center">
            <img src={area.imageUrl} alt={area.name} className="practice-area-bg-image" />
            <div className={`practice-area-icon flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-full bg-slate-900 border-2 border-slate-700 ${dir === 'rtl' ? 'ml-8' : 'mr-8'}`}>
                <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={area.iconPath}></path>
                </svg>
            </div>
            <div className={`practice-area-content flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <h4 className="font-bold text-slate-100 text-2xl mb-3">{area.name}</h4>
                <p className="text-slate-300 text-md leading-relaxed">{area.description}</p>
            </div>
        </div>
    );
};


const AboutUsPage: React.FC = () => {
  const { t, dir } = useLanguage();
  const { introductionStatement, missionStatement, teamMembers, practiceAreas, clients } = useMemo(() => getAboutData(t), [t]);
  const location = useLocation();
  
  const [activeArea, setActiveArea] = useState<PracticeArea | null>(null);
  const clientsSectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (practiceAreas.length > 0 && !activeArea) {
      setActiveArea(practiceAreas[0]);
    }
  }, [practiceAreas, activeArea]);
  
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); // remove #
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure elements are rendered
    }
  }, [location]);

  useEffect(() => {
    const section = clientsSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const cards = section.querySelectorAll('.client-card');
          cards.forEach((card, index) => {
            (card as HTMLElement).style.animationDelay = `${index * 80}ms`;
            card.classList.add('animate-fade-in-up');
          });
          observer.unobserve(section); // Animate only once
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);


  return (
    <div className="space-y-20 sm:space-y-24 text-slate-200">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100">{t('aboutUs.heroTitle')}</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300 leading-relaxed">
          {t('aboutUs.heroSubtitle')}
        </p>
      </section>

      {/* Intro & Vision Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="glass-card p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-slate-100 mb-4 border-b-2 border-amber-500/50 pb-3">{t('aboutUs.ourPrinciple')}</h2>
          <p className="text-slate-300 leading-loose">{introductionStatement}</p>
        </div>
        <div className="glass-card p-8 rounded-xl">
           <h2 className="text-2xl font-bold text-slate-100 mb-4 border-b-2 border-amber-500/50 pb-3">{t('aboutUs.ourVision')}</h2>
          <p className="text-slate-300 leading-loose">{missionStatement}</p>
        </div>
      </section>


      {/* Team Section */}
      <section id="team">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">{t('aboutUs.ourTeam')}</h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">
            {t('aboutUs.ourTeamSubtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {teamMembers.map(member => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      {/* Clients Section */}
      <section ref={clientsSectionRef}>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">{t('aboutUs.successPartners')}</h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">
            {t('aboutUs.successPartnersSubtitle')}
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {clients.map((client, index) => (
                <div key={index} className="client-card client-card-interactive glass-card text-center py-6 px-4">
                    <p className="text-slate-200 font-semibold text-lg">{client}</p>
                </div>
            ))}
        </div>
      </section>

    </div>
  );
};

export default AboutUsPage;