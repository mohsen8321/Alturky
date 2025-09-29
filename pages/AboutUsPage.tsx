import React, { useState, useEffect, useRef } from 'react';
import { teamMembers, practiceAreas, clients, missionStatement, introductionStatement } from '../services/about_data';
import { TeamMember, PracticeArea } from '../types';

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="glass-card rounded-xl overflow-hidden text-center h-full">
    <img src={member.imageUrl} alt={`صورة ${member.name}`} className="w-full h-80 object-contain object-center bg-slate-800/50" />
    <div className="p-6">
      <h3 className="text-xl font-bold text-slate-100">{member.name}</h3>
      <p className="text-emerald-400 font-semibold mt-1">{member.title}</p>
      <p className="text-slate-300 mt-4 text-sm leading-relaxed">{member.bio}</p>
    </div>
  </div>
);

const PracticeAreaDisplay: React.FC<{ area: PracticeArea }> = ({ area }) => (
    <div className="practice-area-details-container glass-card p-8 h-full flex flex-col justify-center items-center text-center" key={area.name}>
        <div className="practice-area-details-bg"></div>
        <div className="practice-area-icon flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-full bg-slate-900 border-2 border-slate-700 mb-6">
            <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={area.iconPath}></path>
            </svg>
        </div>
        <div className="practice-area-content">
            <h4 className="font-bold text-slate-100 text-2xl mb-3">{area.name}</h4>
            <p className="text-slate-300 text-md leading-relaxed max-w-md mx-auto">{area.description}</p>
        </div>
    </div>
);


const AboutUsPage: React.FC = () => {
  const [activeArea, setActiveArea] = useState<PracticeArea>(practiceAreas[0]);
  const clientsSectionRef = useRef<HTMLDivElement>(null);

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
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100">من نحن</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300 leading-relaxed">
          شريكك القانوني الموثوق لتحقيق النجاح في بيئة الاستثمار السعودية.
        </p>
      </section>

      {/* Intro & Vision Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="glass-card p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-slate-100 mb-4 border-b-2 border-emerald-500/50 pb-3">مبدأنا الأساسي</h2>
          <p className="text-slate-300 leading-loose">{introductionStatement}</p>
        </div>
        <div className="glass-card p-8 rounded-xl">
           <h2 className="text-2xl font-bold text-slate-100 mb-4 border-b-2 border-emerald-500/50 pb-3">رؤيتنا للمستقبل</h2>
          <p className="text-slate-300 leading-loose">{missionStatement}</p>
        </div>
      </section>


      {/* Team Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">فريقنا من الخبراء</h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">
            نخبة من المحامين والمستشارين الذين يتمتعون بخبرات مهنية طويلة وكفاءات عالية لخدمتكم.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {teamMembers.map(member => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      {/* Practice Areas Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">خبراتنا القانونية</h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">
            نقدم حلولاً متكاملة في مختلف مجالات القانون والاستشارات بما يتوافق مع الأنظمة السعودية والدولية.
          </p>
        </div>
        <div className="max-w-6xl mx-auto glass-card p-6 sm:p-8 rounded-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 max-h-[450px] overflow-y-auto space-y-2 lg:pl-4">
                    {practiceAreas.map(area => (
                        <button
                            key={area.name}
                            onMouseEnter={() => setActiveArea(area)}
                            className={`w-full text-right p-4 rounded-lg transition-all duration-300 border-r-4 ${
                                activeArea.name === area.name 
                                ? 'bg-emerald-500/10 border-emerald-500 text-slate-100' 
                                : 'border-transparent text-slate-300 hover:bg-slate-800/50 hover:border-slate-600'
                            }`}
                        >
                           <span className="font-semibold">{area.name}</span>
                        </button>
                    ))}
                </div>
                <div className="lg:col-span-2">
                    {activeArea && <PracticeAreaDisplay area={activeArea} />}
                </div>
            </div>
        </div>
      </section>

      {/* Clients Section */}
      <section ref={clientsSectionRef}>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">شركاء النجاح</h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto">
            نفخر بثقة نخبة من الشركات والمؤسسات الرائدة التي تشهد على تميز خدماتنا.
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