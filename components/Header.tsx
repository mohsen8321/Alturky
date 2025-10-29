import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AlTurkiLawLogo } from './AlTurkiLawLogo';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../hooks/useLanguage';

interface HeaderProps {
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const aboutMenuRef = useRef<HTMLDivElement>(null);

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsScrolled(window.scrollY > 50);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (aboutMenuRef.current && !aboutMenuRef.current.contains(event.target as Node)) {
        setIsAboutMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Close all menus on route change
    setIsUserMenuOpen(false);
    setIsAboutMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const headerClasses = `sticky top-0 z-50 text-white transition-all duration-300 ${
    isHomePage && !isScrolled
      ? 'bg-transparent'
      : 'bg-slate-900/80 backdrop-blur-sm shadow-lg'
  }`;
  
  const aboutSubLinks = [
    { to: '/about#team', labelKey: 'header.people' },
    { to: '/about#practices', labelKey: 'header.practices' },
  ];

  const mainNavLinks = [
    { to: '/insights', labelKey: 'header.insights' },
    { to: '/careers', labelKey: 'header.careers' },
    { to: '/contact', labelKey: 'header.contactUs' },
  ];

  const NavLinks: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => (
    <>
      <div className={isMobile ? 'w-full' : 'relative'} ref={isMobile ? null : aboutMenuRef}>
        <Link
          to="/about"
          onMouseEnter={!isMobile ? () => setIsAboutMenuOpen(true) : undefined}
          onMouseLeave={!isMobile ? () => setIsAboutMenuOpen(false) : undefined}
          className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors flex items-center justify-between ${
            location.pathname === '/about' ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
          } ${isMobile ? 'w-full text-lg' : ''}`}
        >
          {t('header.aboutUs')}
          {!isMobile && <svg className={`w-4 h-4 ml-1 transition-transform ${isAboutMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>}
        </Link>
        {!isMobile && isAboutMenuOpen && (
          <div 
            onMouseEnter={() => setIsAboutMenuOpen(true)}
            onMouseLeave={() => setIsAboutMenuOpen(false)}
            className="header-dropdown absolute end-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg z-20 border border-slate-600"
          >
            <ul className="py-1">
              {aboutSubLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-700">{t(link.labelKey)}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {mainNavLinks.map(link => (
        <Link 
          to={link.to} 
          key={link.to} 
          className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
            location.pathname === link.to ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
          } ${isMobile ? 'w-full text-lg' : ''}`}
        >
          {t(link.labelKey)}
        </Link>
      ))}
    </>
  );

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <Link to={isAuthenticated ? "/journey" : "/"} className="flex-shrink-0 flex items-center space-x-4 rtl:space-x-reverse">
                <AlTurkiLawLogo className="h-24 w-auto" />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            <NavLinks />
          </nav>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageSwitcher />
            <div className="hidden md:flex items-center">
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 border border-slate-600 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    <span className="hidden sm:block truncate max-w-[120px]">{user?.email}</span>
                    <svg className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  {isUserMenuOpen && (
                    <div className="header-dropdown absolute end-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg z-20 border border-slate-600">
                      <ul className="py-1">
                        <li><Link to="/journey" className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-700">{t('header.myJourney')}</Link></li>
                        <li><Link to="/documents" className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-700">{t('header.myDocuments')}</Link></li>
                        <li><hr className="border-slate-600 my-1"/></li>
                        <li><button onClick={logout} className="w-full text-left rtl:text-right block px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300">{t('header.logout')}</button></li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={onLoginClick} className="px-5 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300 font-bold">{t('header.login')}</button>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`hamburger-icon z-50 relative w-6 h-6 ${isMobileMenuOpen ? 'open' : ''}`} aria-label="Open menu">
                <span className="line line-1 absolute block h-0.5 w-full bg-white rounded-full top-1"></span>
                <span className="line line-2 absolute block h-0.5 w-full bg-white rounded-full top-1/2 -translate-y-1/2"></span>
                <span className="line line-3 absolute block h-0.5 w-full bg-white rounded-full bottom-1"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Panel */}
      <div className={`fixed inset-0 z-40 md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="mobile-menu-overlay fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`mobile-menu fixed top-0 bottom-0 ${t('dir') === 'rtl' ? 'left-0' : 'right-0'} w-72 bg-slate-900 shadow-lg p-6 pt-28 flex flex-col ${isMobileMenuOpen ? 'open' : ''}`}>
          <nav className="flex flex-col space-y-4">
            <NavLinks isMobile />
          </nav>
          <div className="mt-auto pt-6 border-t border-slate-700">
            {isAuthenticated ? (
                <div className="space-y-3">
                  <p className="text-sm text-slate-400 truncate">{user?.email}</p>
                  <Link to="/journey" className="block w-full text-center px-4 py-2 border border-slate-600 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">{t('header.myJourney')}</Link>
                  <Link to="/documents" className="block w-full text-center px-4 py-2 border border-slate-600 text-sm font-medium rounded-md text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">{t('header.myDocuments')}</Link>
                  <button onClick={logout} className="w-full text-center block px-4 py-2 text-sm text-red-400 bg-red-500/10 rounded-md hover:text-red-300">{t('header.logout')}</button>
                </div>
            ) : (
              <button onClick={onLoginClick} className="w-full px-5 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300 font-bold">{t('header.login')}</button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;