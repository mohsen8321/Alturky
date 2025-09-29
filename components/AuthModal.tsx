import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSwitchMode = (mode: 'register' | 'login') => {
    setAuthMode(mode);
    setError('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('الرجاء إدخال البريد الإلكتروني وكلمة المرور.');
      return;
    }
    setError('');
    
    login(email);
    handleClose(); // Close after successful login/register
    navigate('/onboarding');
  };

  const handleClose = () => {
    setTimeout(() => {
      setAuthMode('register');
      setEmail('');
      setPassword('');
      setError('');
    }, 300);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={handleClose}
    >
      <div
        className="auth-modal-panel w-full max-w-sm rounded-2xl shadow-2xl text-slate-200 p-6 sm:p-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {authMode === 'register' ? 'ابدأ رحلتك' : 'مرحباً بعودتك'}
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-700" aria-label="إغلاق">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <p className="text-slate-400 mb-5 text-sm">
          {authMode === 'register' ? 'أنشئ حسابك لبدء رحلتك الاستثمارية.' : 'سجل الدخول لمتابعة رحلتك.'}
        </p>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor={`${authMode}-email`} className="block text-sm font-medium text-slate-400 mb-2">البريد الإلكتروني</label>
            <input type="email" id={`${authMode}-email`} value={email} onChange={(e) => setEmail(e.target.value)} className="auth-modal-input w-full px-4 py-2.5 rounded-lg shadow-sm" required />
          </div>
          <div>
            <label htmlFor={`${authMode}-password`} className="block text-sm font-medium text-slate-400 mb-2">كلمة المرور</label>
            <input type="password" id={`${authMode}-password`} value={password} onChange={(e) => setPassword(e.target.value)} className="auth-modal-input w-full px-4 py-2.5 rounded-lg shadow-sm" required />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
          
          <div className="pt-2">
            {authMode === 'register' && (
              <div className="flex items-center mb-4">
                <input id="register-terms" type="checkbox" required className="custom-checkbox h-4 w-4" />
                <label htmlFor="register-terms" className="ms-2 text-sm text-slate-400">أوافق على <a href="#" className="text-emerald-500 hover:underline font-semibold">شروط الاستخدام</a>.</label>
              </div>
            )}
            
            <button type="submit" className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-all duration-300 font-bold shadow-lg shadow-emerald-900/40 hover:shadow-emerald-700/50 transform hover:scale-105">
              {authMode === 'register' ? 'إنشاء حساب' : 'تسجيل الدخول'}
            </button>
          </div>
        </form>
        
        <div className="mt-5 pt-4 border-t border-slate-700/50">
          <div className="auth-toggle-container" data-mode={authMode}>
            <div className="auth-toggle-slider"></div>
            <button
              onClick={() => handleSwitchMode('register')}
              className={`auth-toggle-button ${authMode === 'register' ? 'active' : ''}`}
            >
              حساب جديد
            </button>
            <button
              onClick={() => handleSwitchMode('login')}
              className={`auth-toggle-button ${authMode === 'login' ? 'active' : ''}`}
            >
              تسجيل الدخول
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;