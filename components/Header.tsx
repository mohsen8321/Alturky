import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AlTurkiLawLogo } from './AlTurkiLawLogo';

interface HeaderProps {
  onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
      isActive
        ? 'bg-gray-700 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;
    
  return (
    <header className="sticky top-0 z-50 bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <Link to={isAuthenticated ? "/journey" : "/"} className="flex-shrink-0 flex items-center space-i-4">
                <AlTurkiLawLogo className="h-20 w-auto" />
            </Link>
          </div>

          <div className="flex items-center flex-grow justify-center">
            <nav className="hidden md:flex items-center space-i-2">
              {isAuthenticated && user?.profile.hasOnboarded ? (
                <>
                  <NavLink to="/journey" className={navLinkClass}>رحلتي</NavLink>
                  <NavLink to="/services" className={navLinkClass}>الخدمات</NavLink>
                  <NavLink to="/programs" className={navLinkClass}>البرامج</NavLink>
                  <NavLink to="/documents" className={navLinkClass}>مستنداتي</NavLink>
                  <NavLink to="/about" className={navLinkClass}>من نحن</NavLink>
                </>
              ) : (
                 <>
                  {location.pathname !== '/' && <NavLink to="/" className={navLinkClass}>الرئيسية</NavLink>}
                  <NavLink to="/about" className={navLinkClass}>من نحن</NavLink>
                  <NavLink to="/programs" className={navLinkClass}>البرامج</NavLink>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-i-4">
                <span className="text-sm text-gray-400 hidden sm:block">{user?.email}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-300 font-bold"
              >
                تسجيل الدخول
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;