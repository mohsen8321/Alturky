import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import ServiceAssistantModal from '../components/ServiceAssistantModal';
import InteractiveBackground from '../components/InteractiveBackground';

const HomePage: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAssistantModalOpen, setIsAssistantModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header onLoginClick={() => setIsAuthModalOpen(true)} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section 
          className="relative text-center py-20 sm:py-24 lg:py-32"
          style={{
            backgroundImage: `url('https://s7g10.scene7.com/is/image/misagovsa/shutterstock_2168796041-2-1?$hero-featured-large-desk$&fit=constrain&fmt=webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight" style={{ textShadow: '1px 1px 8px rgba(0,0,0,0.7)' }}>
              بوابتك للاستثمار في المملكة العربية السعودية
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-slate-200" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
              يقدم مكتب محمد التركي للمحاماة خارطة طريق واضحة ومخصصة لبدء وتنمية أعمالك بكل سهولة وثقة.
            </p>
            <div className="mt-8">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-300 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                ابدأ رحلتك الآن
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-gray-900">
          <InteractiveBackground className="absolute inset-0 z-0" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>لماذا تختار مكتب محمد التركي للمحاماة؟</h2>
              <p className="mt-3 text-slate-300 max-w-xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                نحن نبسط الإجراءات الحكومية ونقدم لك الدعم القانوني اللازم لتحقيق النجاح.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="feature-card text-center p-8 rounded-xl">
                <div className="flex items-center justify-center h-16 w-16 mx-auto mb-5">
                  <div className="w-10 h-10 text-emerald-500">
                    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" strokeWidth="3">
                      <circle cx="32" cy="32" r="28" className="opacity-20" />
                      <path d="M32 6V14M32 58V50M6 32H14M58 32H50" strokeLinecap="round" className="opacity-40"/>
                      <g className="compass-needle">
                          <polygon points="32,10 38,32 32,54 26,32" fill="currentColor" stroke="none"/>
                      </g>
                      <circle cx="32" cy="32" r="4" fill="#111827" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-100">رحلة مخصصة</h3>
                <p className="mt-2 text-slate-300">
                  احصل على خارطة طريق تفاعلية بناءً على نوع استثمارك وقطاعك وحجم رأس مالك.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="feature-card text-center p-8 rounded-xl">
                <div className="flex items-center justify-center h-16 w-16 mx-auto mb-5">
                   <div className="w-10 h-10 text-emerald-500">
                    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" strokeWidth="3" strokeLinecap="round">
                        <path d="M32 58V12" className="opacity-50"></path>
                        <path d="M12 58H52" className="opacity-50"></path>
                        <g className="scale-beam-group">
                            <path d="M4 12H60"></path>
                            <path d="M14 16L24 40"></path>
                            <path d="M50 16L40 40"></path>
                            <circle cx="21" cy="40" r="10" strokeWidth="3" fill="currentColor" className="opacity-20" />
                            <circle cx="43" cy="40" r="10" strokeWidth="3" fill="currentColor" className="opacity-20" />
                        </g>
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-100">إرشادات واضحة</h3>
                <p className="mt-2 text-slate-300">
                  معلومات مفصلة عن كل خطوة، بما في ذلك المستندات المطلوبة والرسوم والمدة الزمنية المتوقعة.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="feature-card text-center p-8 rounded-xl">
                <div className="flex items-center justify-center h-16 w-16 mx-auto mb-5">
                  <div className="w-10 h-10 text-emerald-500 bar-chart-continuous">
                    <svg viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <rect className="bar bar-1" x="12" y="6" width="10" height="52" rx="2"></rect>
                        <rect className="bar bar-2" x="27" y="6" width="10" height="52" rx="2"></rect>
                        <rect className="bar bar-3" x="42" y="6" width="10" height="52" rx="2"></rect>
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-100">تتبع التقدم</h3>
                <p className="mt-2 text-slate-300">
                  تابع إنجازك للخطوات بسهولة واعرف دائمًا ما هي خطوتك التالية في رحلتك الاستثمارية.
                </p>
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
            className="bg-emerald-600 text-white rounded-full p-4 shadow-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            aria-label="اسأل المساعد"
        >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
        </button>
      </div>

    </div>
  );
};

export default HomePage;