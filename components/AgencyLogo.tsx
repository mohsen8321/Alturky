import React from 'react';

interface AgencyLogoProps {
  agency: string;
  className?: string;
}

const AgencyLogo: React.FC<AgencyLogoProps> = ({ agency, className = 'w-10 h-10 text-gray-500' }) => {
  const getLogo = () => {
    if (agency.includes('وزارة الاستثمار')) {
      // MISA: Building with growth arrow
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18"></path>
            <path d="M5 21V7l7-4 7 4v14"></path>
            <path d="M9 13h6"></path>
            <path d="M12 17L12 7"></path>
            <path d="M10 9L12 7L14 9"></path>
        </svg>
      );
    }
    if (agency.includes('وزارة التجارة')) {
      // MOC: Scales of justice
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v18"></path><path d="M3 7h18"></path>
            <path d="M5 7l-2 5h18l-2-5"></path>
            <path d="M5.5 12l-1.5 7h16l-1.5-7"></path>
        </svg>
      );
    }
    if (agency.includes('وزارة الموارد البشرية')) {
      // HRSD: People group
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
            <path d="M16 3.13a4 4 0 010 7.75"></path>
        </svg>
      );
    }
    if (agency.includes('التأمينات الاجتماعية')) {
      // GOSI: Shield with checkmark
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path d="M9 12l2 2 4-4"></path>
        </svg>
      );
    }
    if (agency.includes('الزكاة والضريبة والجمارك')) {
      // ZATCA: Percentage symbol
      return (
         <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 5L5 19"></path>
            <circle cx="6.5" cy="6.5" r="2.5"></circle>
            <circle cx="17.5" cy="17.5" r="2.5"></circle>
        </svg>
      );
    }
    if (agency.includes('الدفاع المدني')) {
      // Civil Defense: Firefighter helmet
      return (
         <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 13.1a1 1 0 01.9-1.1L5 11.5a1 1 0 011 .9v1.2a1 1 0 001 1h10a1 1 0 001-1V12.4a1 1 0 011-.9l2.1-.5a1 1 0 01.9 1.1v2.8a2 2 0 01-2 2H4a2 2 0 01-2-2v-2.8z"></path>
            <path d="M18.4 11.6A5 5 0 0012 5a5 5 0 00-6.4 6.6"></path>
            <circle cx="12" cy="5" r="1"></circle>
        </svg>
      );
    }
     if (agency.includes('وزارة الخارجية')) {
        // MOFA: Globe
        return (
            <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"></path>
            </svg>
        );
    }
     if (agency.includes('الملكية الفكرية')) {
        // SAIP: Lightbulb
        return (
            <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18h6M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
        );
    }
    
    // Default Logo (Government Building)
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22h20"></path>
        <path d="M4 22V7L12 3l8 4v15"></path>
        <path d="M8 11h8"></path>
        <path d="M8 15h8"></path>
        <path d="M8 19h8"></path>
        <path d="M14 7h4"></path>
      </svg>
    );
  };

  return getLogo();
};

export default AgencyLogo;