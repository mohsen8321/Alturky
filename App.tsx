import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import HomePage from './pages/HomePage';
import OnboardingPage from './pages/OnboardingPage';
import JourneyPage from './pages/JourneyPage';
import ServicesPage from './pages/ServicesPage';
import ProgramsPage from './pages/ProgramsPage';
import MyDocumentsPage from './pages/MyDocumentsPage';
import AboutUsPage from './pages/AboutUsPage';
import AppLayout from './components/AppLayout';
import OnboardingLayout from './components/OnboardingLayout';
import InsightsPage from './pages/InsightsPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';


interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <OnboardingLayout>
                    <OnboardingPage />
                  </OnboardingLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/journey" 
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <JourneyPage />
                  </AppLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/services" 
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <ServicesPage />
                  </AppLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/programs" 
              element={
                <AppLayout>
                  <ProgramsPage />
                </AppLayout>
              } 
            />
            <Route 
              path="/documents" 
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <MyDocumentsPage />
                  </AppLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/about" 
              element={
                <AppLayout>
                  <AboutUsPage />
                </AppLayout>
              } 
            />
            <Route 
              path="/insights" 
              element={
                <AppLayout>
                  <InsightsPage />
                </AppLayout>
              } 
            />
            <Route 
              path="/careers" 
              element={
                <AppLayout>
                  <CareersPage />
                </AppLayout>
              } 
            />
             <Route 
              path="/contact" 
              element={
                <AppLayout>
                  <ContactPage />
                </AppLayout>
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;