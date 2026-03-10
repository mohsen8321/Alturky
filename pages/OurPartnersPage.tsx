import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Partner } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import enLocale from '../locales/en';
import arLocale from '../locales/ar';

const PartnerCard: React.FC<{ partner: Partner }> = ({ partner }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const closeTooltip = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setShowTooltip(false);
  };

  const scheduleCloseTooltip = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = window.setTimeout(() => {
      setShowTooltip(false);
      closeTimeoutRef.current = null;
    }, 120);
  };

  const updateTooltipPosition = () => {
    if (!cardRef.current) {
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    const tooltipWidth = 288;
    const tooltipHeight = 220;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const horizontalMargin = 16;
    const verticalOffset = 12;

    const centeredLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
    const left = Math.min(
      Math.max(centeredLeft, horizontalMargin),
      viewportWidth - tooltipWidth - horizontalMargin
    );

    const spaceBelow = viewportHeight - rect.bottom;
    const top = spaceBelow < tooltipHeight + verticalOffset
      ? Math.max(rect.top - tooltipHeight - verticalOffset, 16)
      : Math.min(rect.bottom + verticalOffset, viewportHeight - tooltipHeight - 16);

    setTooltipStyle({ top, left });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedTooltip = tooltipRef.current?.contains(target);
      const clickedCard = cardRef.current?.contains(target);

      if (!clickedTooltip && !clickedCard) {
        closeTooltip();
      }
    };

    const handleViewportChange = () => {
      updateTooltipPosition();
    };

    if (showTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleViewportChange, true);
      window.addEventListener('resize', handleViewportChange);
      updateTooltipPosition();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleViewportChange, true);
      window.removeEventListener('resize', handleViewportChange);
    };
  }, [showTooltip]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    updateTooltipPosition();
    setShowTooltip(true);
  };

  return (
    <>
    <div
      ref={cardRef}
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={scheduleCloseTooltip}
    >
      <div className="client-card client-card-interactive glass-card text-center py-6 px-4 cursor-pointer hover:border-amber-400 transition-colors">
        <p className="text-slate-200 font-semibold text-sm sm:text-base">{partner.name}</p>
        <p className="text-amber-400 text-xs mt-2">{partner.industry}</p>
      </div>
    </div>

      {showTooltip && createPortal(
        <div
          ref={tooltipRef}
          className="fixed z-[120] w-72 rounded-lg border-2 border-amber-400/50 bg-slate-900 p-4 shadow-2xl animate-fade-in-down"
          style={{ top: tooltipStyle.top, left: tooltipStyle.left }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={scheduleCloseTooltip}
        >
          <div className="flex items-start justify-between mb-2">
            <p className="text-amber-400 font-semibold text-sm">Work Done</p>
            <button
              onClick={closeTooltip}
              className="text-slate-400 hover:text-slate-200 text-lg leading-none"
            >
              ×
            </button>
          </div>
          <p className="text-slate-200 text-sm leading-relaxed">{partner.workDone}</p>
          <div className="mt-2 text-xs text-slate-400">
            <p><strong>Industry:</strong> {partner.industry}</p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

const OurPartnersPage: React.FC = () => {
  const { t, language } = useLanguage();
  const partnersSectionRef = useRef<HTMLDivElement>(null);

  // Get partners based on current language
  const partners: Partner[] = useMemo(() => {
    const locale = language === 'ar' ? arLocale : enLocale;
    return (locale.aboutUs.clients as Partner[]) || [];
  }, [language]);

  useEffect(() => {
    const section = partnersSectionRef.current;
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
    <div className="space-y-16 text-slate-200">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100">{t('aboutUs.successPartners')}</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300 leading-relaxed">
          {t('aboutUs.successPartnersSubtitle')}
        </p>
      </section>

      {/* Partners Grid */}
      <section ref={partnersSectionRef}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, index) => (
            <PartnerCard key={index} partner={partner} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default OurPartnersPage;
