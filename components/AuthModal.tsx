import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../hooks/useLanguage';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<'selection' | 'form'>('selection');
  const [investorStatus, setInvestorStatus] = useState<'new' | 'existing'>('new');
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  
  const handleSelectInvestorType = (status: 'new' | 'existing') => {
    setInvestorStatus(status);
    if (status === 'existing') {
        setAuthMode('login'); // Default existing investors to login view
    } else {
        setAuthMode('register');
    }
    setView('form');
  };

  const handleSwitchMode = (mode: 'register' | 'login') => {
    setAuthMode(mode);
    setError('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t('authModal.errorEmailPass'));
      return;
    }
    setError('');
    
    login(email, investorStatus);
    handleClose(); // Close after successful login/register
    
    if (investorStatus === 'new') {
      navigate('/onboarding');
    } else {
      navigate('/journey');
    }
  };

  const handleClose = () => {
    setTimeout(() => {
      setView('selection');
      setInvestorStatus('new');
      setAuthMode('register');
      setEmail('');
      setPassword('');
      setError('');
    }, 300);
    onClose();
  };
  
  const SelectionView = () => (
    <>
      <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {t('authModal.welcome')}
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-700" aria-label={t('authModal.close')}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <p className="text-slate-400 mb-8 text-sm">
          {t('authModal.choosePath')}
        </p>

        <div className="space-y-4">
            <button onClick={() => handleSelectInvestorType('new')} className={`w-full ${dir === 'rtl' ? 'text-right' : 'text-left'} p-6 rounded-lg border transition-all duration-300 flex items-center ${dir === 'rtl' ? 'space-x-reverse space-x-4' : 'space-x-4'} bg-slate-800/50 border-slate-700 hover:border-amber-500 hover:bg-amber-900/20 hover:scale-105`}>
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <svg className="w-7 h-7 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                </div>
                <div>
                    <h3 className="font-bold text-slate-100 text-lg">{t('authModal.newInvestor')}</h3>
                    <p className="text-slate-300 text-sm">{t('authModal.newInvestorDesc')}</p>
                </div>
            </button>
            <button onClick={() => handleSelectInvestorType('existing')} className={`w-full ${dir === 'rtl' ? 'text-right' : 'text-left'} p-6 rounded-lg border transition-all duration-300 flex items-center ${dir === 'rtl' ? 'space-x-reverse space-x-4' : 'space-x-4'} bg-slate-800/50 border-slate-700 hover:border-amber-500 hover:bg-amber-900/20 hover:scale-105`}>
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <svg className="w-7 h-7 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 21V7L12 3 2 7v14h5v-7h10v7z"></path><path d="M9 21v-5a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v5"></path></svg>
                </div>
                <div>
                    <h3 className="font-bold text-slate-100 text-lg">{t('authModal.existingInvestor')}</h3>
                    <p className="text-slate-300 text-sm">{t('authModal.existingInvestorDesc')}</p>
                </div>
            </button>
        </div>
    </>
  );

  const FormView = () => (
     <>
        <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
                <button onClick={() => setView('selection')} className={`text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-700 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} aria-label={t('authModal.back')}>
                    <svg className={`w-5 h-5 ${dir === 'rtl' ? 'transform -scale-x-100' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    {investorStatus === 'new' 
                        ? (authMode === 'register' ? t('authModal.startJourney') : t('authModal.welcomeBack'))
                        : t('authModal.welcomeBackExisting')
                    }
                </h2>
            </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-700" aria-label={t('authModal.close')}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <p className="text-slate-400 mb-5 text-sm">
          {investorStatus === 'new'
            ? (authMode === 'register' ? t('authModal.startJourneyDesc') : t('authModal.continueJourneyDesc'))
            : t('authModal.loginToDashboardDesc')
          }
        </p>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor={`${authMode}-email`} className="block text-sm font-medium text-slate-400 mb-2">{t('authModal.email')}</label>
            <input type="email" id={`${authMode}-email`} value={email} onChange={(e) => setEmail(e.target.value)} className="auth-modal-input w-full px-4 py-3 rounded-lg shadow-sm text-sm" required />
          </div>
          <div>
            <label htmlFor={`${authMode}-password`} className="block text-sm font-medium text-slate-400 mb-2">{t('authModal.password')}</label>
            <input type="password" id={`${authMode}-password`} value={password} onChange={(e) => setPassword(e.target.value)} className="auth-modal-input w-full px-4 py-3 rounded-lg shadow-sm text-sm" required />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          
          <div className="pt-2">
            {authMode === 'register' && investorStatus === 'new' && (
              <div className="flex items-center mb-4">
                <input id="register-terms" type="checkbox" required className="custom-checkbox h-4 w-4" />
                <label htmlFor="register-terms" className={`text-sm text-slate-400 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`}>{t('authModal.agreeTo')} <a href="#" className="text-amber-500 hover:underline font-semibold">{t('authModal.terms')}</a>.</label>
              </div>
            )}
            
            <button type="submit" className="w-full bg-amber-600 text-white py-3.5 px-4 rounded-lg hover:bg-amber-700 transition-all duration-300 font-bold text-base shadow-lg shadow-amber-900/40 hover:shadow-amber-700/50 transform hover:scale-105">
              {authMode === 'register' ? t('authModal.createAccount') : t('authModal.login')}
            </button>
          </div>
        </form>
        
        {investorStatus === 'new' && (
            <div className="mt-5 pt-4 border-t border-slate-700/50">
                <div className="auth-toggle-container" data-mode={authMode}>
                    <div className="auth-toggle-slider"></div>
                    <button
                    onClick={() => handleSwitchMode('register')}
                    className={`auth-toggle-button ${authMode === 'register' ? 'active' : ''}`}
                    >
                    {t('authModal.newAccount')}
                    </button>
                    <button
                    onClick={() => handleSwitchMode('login')}
                    className={`auth-toggle-button ${authMode === 'login' ? 'active' : ''}`}
                    >
                    {t('authModal.login')}
                    </button>
                </div>
            </div>
        )}
     </>
  );


  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={handleClose}
    >
      <div
        className="auth-modal-panel w-full max-w-lg sm:max-w-2xl rounded-2xl shadow-2xl text-slate-200 p-6 sm:p-10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {view === 'selection' ? <SelectionView /> : <FormView />}
      </div>
    </div>
  );
};

export default AuthModal;