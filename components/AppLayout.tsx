import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import InteractiveBackground from './InteractiveBackground';
import AuthModal from './AuthModal';

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const location = useLocation();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    
    const darkThemeRoutes = ['/journey', '/services', '/programs', '/documents', '/about', '/insights', '/careers', '/contact'];
    const useDarkTheme = darkThemeRoutes.some(path => location.pathname.startsWith(path));

    const handleLoginClick = () => {
        setIsAuthModalOpen(true);
    };

    const mainBgClass = useDarkTheme ? 'bg-slate-900' : 'bg-slate-50';

    return (
        <div className={`flex flex-col min-h-screen ${mainBgClass}`}>
            <Header onLoginClick={handleLoginClick} />
            <div className="flex-grow relative">
                 {useDarkTheme && <InteractiveBackground className="absolute inset-0 z-0" />}
                <main className="relative z-10 flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
                    {children}
                </main>
            </div>
            <Footer />
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
};

export default AppLayout;