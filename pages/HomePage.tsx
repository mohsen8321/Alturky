import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import ServiceAssistantModal from '../components/ServiceAssistantModal';
import { useLanguage } from '../hooks/useLanguage';
import { getAboutData } from '../services/about_data';
import { PracticeArea } from '../types';

const recognitionLogos = [
  // Using placeholder URLs for demonstration
  { name: 'Legal 500', url: 'https://images.seeklogo.com/logo-png/30/2/the-legal-500-logo-png_seeklogo-301361.png' },
  { name: 'Chambers and Partners', url: 'https://assets.chambers.com/logo/chambers_blue_nopadding.svg' },
  { name: 'IFLR1000', url: 'https://www.iflr1000.com/Content/images/IFLR1000_logo_k.png' },
  { name: 'Saudi Center for Commercial Arbitration', url: 'https://sadr.org/public/assets/images/sadr-logo-official.png' },
  { name: 'MISA', url: 'https://misa.gov.sa/app/uploads/2023/11/Ministry_of_Investment_Logo-white.svg' }
];

const PracticeAreaDisplay: React.FC<{ area: PracticeArea }> = ({ area }) => (
    <div className="practice-area-details-container glass-card p-8 h-full flex flex-col justify-center items-center text-center" key={area.name}>
        <div className="practice-area-details-bg"></div>
        <div className="practice-area-icon flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-full bg-slate-900 border-2 border-slate-700 mb-6">
            <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={area.iconPath}></path>
            </svg>
        </div>
        <div className="practice-area-content">
            <h4 className="font-bold text-slate-100 text-2xl mb-3">{area.name}</h4>
            <p className="text-slate-300 text-md leading-relaxed max-w-md mx-auto">{area.description}</p>
        </div>
    </div>
);

const HomePage: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAssistantModalOpen, setIsAssistantModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t, dir } = useLanguage();
  
  const { practiceAreas } = useMemo(() => getAboutData(t), [t]);
  const [activeArea, setActiveArea] = useState<PracticeArea | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const values = useMemo(() => [
    {
      title: t('homePage.values.history.title'),
      description: t('homePage.values.history.description'),
      imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: t('homePage.values.prompt.title'),
      description: t('homePage.values.prompt.description'),
      imageUrl: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: t('homePage.values.expertise.title'),
      description: t('homePage.values.expertise.description'),
      imageUrl: 'https://images.pexels.com/photos/1578332/pexels-photo-1578332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: t('homePage.values.future.title'),
      description: t('homePage.values.future.description'),
      imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ], [t]);


  useEffect(() => {
    if (practiceAreas.length > 0 && !activeArea) {
      setActiveArea(practiceAreas[0]);
    }
  }, [practiceAreas, activeArea]);

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    if (video.currentTime >= 27) {
        video.currentTime = 0;
        video.play().catch(error => {
            console.error("Video loop play failed:", error);
        });
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // In React Strict Mode, the component mounts, unmounts, and mounts again.
          // The unmount can interrupt the play() promise, causing a non-critical AbortError.
          // We can safely ignore this error.
          if (error.name !== 'AbortError') {
            console.error("Initial video play failed:", error);
          }
        });
      }
    }

    return () => {
      if (videoElement) {
        videoElement.pause();
      }
    };
  }, []);


  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white">
      <Header onLoginClick={() => setIsAuthModalOpen(true)} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[75vh] overflow-hidden">
          {/* Background Layer */}
          <div className="absolute inset-0 z-0">
            <div className="hero-video-container">
               <video
                ref={videoRef}
                src="https://dc23.dcserp.com/files/turky-vid.mp4"
                autoPlay
                muted
                playsInline
                onTimeUpdate={handleTimeUpdate}
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-20 sm:py-24 lg:py-32 bg-slate-900">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div className="max-w-md">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t('homePage.whoWeAre')}</h2>
                    <p className="text-slate-300 leading-relaxed mb-6">
                        {t('homePage.whoWeAreText')}
                    </p>
                    <Link to="/about" className="inline-flex items-center font-semibold text-amber-400 hover:text-amber-300 transition-colors group">
                        {t('homePage.learnMore')}
                        <svg className={`w-4 h-4 transition-transform group-hover:translate-x-[-4px] ${dir === 'rtl' ? 'mr-2' : 'ml-2'} ${dir === 'rtl' ? 'transform scale-x-[-1]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </Link>
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop" alt="Al-Turki Law Firm Team" className="rounded-lg shadow-2xl" />
                </div>
            </div>
        </section>
        
        {/* Core Values Section */}
        <section className="py-20 sm:py-24 bg-slate-800/20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">{t('homePage.ourValues')}</h2>
                    <p className="mt-3 text-slate-300 max-w-xl mx-auto">
                        {t('homePage.ourValuesText')}
                    </p>
                </div>
                <div 
                    className="values-container h-[600px]"
                    onMouseLeave={() => setHoveredValue(null)}
                >
                    {values.map((value, index) => (
                        <div 
                            key={index}
                            className={`value-panel ${hoveredValue === index ? 'expanded' : ''} ${hoveredValue !== null && hoveredValue !== index ? 'collapsed' : ''}`}
                            onMouseEnter={() => setHoveredValue(index)}
                            style={{ backgroundImage: `url(${value.imageUrl})` }}
                        >
                            <div className="value-panel-content">
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>


        {/* Practice Areas Section */}
        <section className="py-20 sm:py-24 lg:py-32 bg-slate-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">{t('homePage.whatWeDo')}</h2>
              <p className="mt-3 text-slate-300 max-w-xl mx-auto">
                {t('homePage.whatWeDoSubtitle')}
              </p>
            </div>
            <div className="max-w-6xl mx-auto glass-card p-6 sm:p-8 rounded-xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 max-h-[450px] overflow-y-auto space-y-2 lg:pr-4 rtl:lg:pr-0 rtl:lg:pl-4">
                        {practiceAreas.map(area => (
                            <button
                                key={area.name}
                                onMouseEnter={() => setActiveArea(area)}
                                className={`w-full p-4 rounded-lg transition-all duration-300 border-l-4 rtl:border-l-0 rtl:border-r-4 ${
                                    activeArea?.name === area.name 
                                    ? 'bg-amber-500/10 border-amber-500 text-slate-100' 
                                    : 'border-transparent text-slate-300 hover:bg-slate-800/50 hover:border-slate-600'
                                } ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
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
          </div>
        </section>

        {/* Recognition Section */}
        <section className="py-20 sm:py-24 bg-slate-800/20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">{t('homePage.recognition')}</h2>
                    <p className="mt-3 text-slate-300">
                        {t('homePage.recognitionText')}
                    </p>
                </div>
                <div className="recognition-marquee bg-slate-800 p-8 rounded-lg">
                    <div className="recognition-track">
                        {[...recognitionLogos, ...recognitionLogos].map((logo, index) => (
                            <img key={index} src={logo.url} alt={logo.name} className="recognition-logo" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
      </main>

      <Footer />
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <ServiceAssistantModal 
        isOpen={isAssistantModalOpen} 
        onClose={() => setIsAssistantModalOpen(false)} 
      />

      <div className="fixed bottom-8 end-8 z-50">
        <button
            onClick={() => setIsAssistantModalOpen(true)}
            className="bg-amber-500 text-white rounded-full p-4 shadow-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            aria-label={t('homePage.askAssistant')}
        >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default HomePage;