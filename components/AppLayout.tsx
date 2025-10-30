import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import InteractiveBackground from './InteractiveBackground';
import AuthModal from './AuthModal';
import { useScrollToHash } from '../hooks/useScrollToHash';

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const location = useLocation();
    useScrollToHash();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    
    const darkThemeRoutes = ['/journey', '/services', '/programs', '/documents', '/about', '/practice-areas', '/contact'];
    const useDarkTheme = darkThemeRoutes.some(path => location.pathname.startsWith(path));

    const handleLoginClick = () => {
        setIsAuthModalOpen(true);
    };

    const mainBgClass = useDarkTheme ? 'bg-slate-900 min-h-screen' : 'bg-slate-50 min-h-screen';

    return (
        <div className={`flex flex-col min-h-screen ${mainBgClass}`}>
            <div className="relative flex flex-col min-h-screen">
                {useDarkTheme && (
                    <div className="fixed inset-0 overflow-hidden">
                        <InteractiveBackground className="w-full h-full" />
                    </div>
                )}
                <Header onLoginClick={handleLoginClick} className="relative z-30" />
                <div className="flex-grow relative z-10">
                    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
                        {children}
                    </main>
                </div>
                <Footer className="relative z-30 mt-auto" />
            </div>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
};

export default AppLayout;