import React from 'react';
import Header from './Header';
import Footer from './Footer';
import InteractiveBackground from './InteractiveBackground';

interface OnboardingLayoutProps {
    children: React.ReactNode;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900">
            <Header onLoginClick={() => {}} />
            <main className="flex-grow relative flex items-center justify-center py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
                <InteractiveBackground className="absolute inset-0 z-0" />
                <div className="relative z-10 w-full">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OnboardingLayout;
