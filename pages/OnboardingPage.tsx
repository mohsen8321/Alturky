import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserProfile } from '../types';
import { useLanguage } from '../hooks/useLanguage';

const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Omit<UserProfile, 'hasOnboarded' | 'investorStatus'>>({
    investmentType: 'foreign',
    legalEntityType: 'llc',
    sector: '',
    capital: '500000',
    businessModel: 'Standard',
    hasSaudiPartner: undefined,
  });
  
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({...prev, [field]: value}));
  };
  
  const isTradeInternational = formData.investmentType === 'foreign' && formData.sector === 'trade';

  const getMinCapital = useCallback(() => {
    if (isTradeInternational) {
      return formData.hasSaudiPartner ? 25_000_000 : 30_000_000;
    }
    return 500_000;
  }, [isTradeInternational, formData.hasSaudiPartner]);

  useEffect(() => {
    const minCapital = getMinCapital();
    if (Number(formData.capital) < minCapital) {
        setFormData(prev => ({...prev, capital: minCapital.toString()}));
    }
  }, [getMinCapital, formData.capital]);


  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(step < 2) {
      setStep(step + 1);
      return;
    }
    completeOnboarding(formData);
    navigate('/journey');
  };

  const progressPercentage = ((step - 1) / 1) * 100;
  
  const legalEntityOptions: { [key: string]: {value: string; labelKey: string; types: ('foreign' | 'local' | 'gulf')[]} } = {
    llc: { value: 'llc', labelKey: 'onboarding.legalEntities.llc', types: ['foreign', 'local', 'gulf'] },
    branch: { value: 'branch', labelKey: 'onboarding.legalEntities.branch', types: ['foreign'] },
    sole: { value: 'sole', labelKey: 'onboarding.legalEntities.sole', types: ['local', 'gulf'] },
    jsc: { value: 'jsc', labelKey: 'onboarding.legalEntities.jsc', types: ['foreign', 'local', 'gulf'] },
    sjsc: { value: 'sjsc', labelKey: 'onboarding.legalEntities.sjsc', types: ['foreign', 'local', 'gulf'] },
  };

  const filteredLegalEntities = Object.values(legalEntityOptions).filter(opt => opt.types.includes(formData.investmentType));
  
  const sectorOptions = ['technology', 'industrial', 'tourism', 'real_estate', 'health', 'trade'] as const;

  const Stepper = ({ currentStep }: { currentStep: number }) => (
    <div className="onboarding-stepper">
      <div className="onboarding-stepper-progress" style={{ width: `${progressPercentage}%` }}></div>
      <div className={`onboarding-step ${currentStep >= 1 ? 'completed' : ''} ${currentStep === 1 ? 'active' : ''}`}>1</div>
      <div className={`onboarding-step ${currentStep === 2 ? 'active' : ''}`}>2</div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto onboarding-panel p-6 sm:p-10 rounded-2xl shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{t('onboarding.title')}</h1>
        <p className="text-slate-300 mt-2">{t('onboarding.subtitle')}</p>
      </div>

      <Stepper currentStep={step} />
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="onboarding-step-content space-y-6">
            <h2 className="text-xl font-semibold text-slate-100 border-b border-slate-600 pb-3">{t('onboarding.step1')}</h2>
            <div>
              <label className="block text-md font-semibold text-slate-200 mb-3">{t('onboarding.businessModel')}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 <button type="button" onClick={() => handleChange('businessModel', 'Standard')} className={`onboarding-choice-btn p-4 rounded-lg text-center font-medium ${formData.businessModel === 'Standard' ? 'selected' : ''}`}>
                    {t('onboarding.establishCompany')}
                </button>
                <button type="button" onClick={() => handleChange('businessModel', 'Franchise')} className={`onboarding-choice-btn p-4 rounded-lg text-center font-medium ${formData.businessModel === 'Franchise' ? 'selected' : ''}`}>
                    {t('onboarding.franchise')}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-md font-semibold text-slate-200 mb-3">{t('onboarding.legalEntityType')}</label>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredLegalEntities.map(entity => (
                  <button type="button" key={entity.value} onClick={() => handleChange('legalEntityType', entity.value)}
                    className={`onboarding-choice-btn p-4 rounded-lg text-center font-medium ${formData.legalEntityType === entity.value ? 'selected' : ''}`}>
                    {t(entity.labelKey)}
                  </button>
                ))}
              </div>
            </div>
             <div>
              <label className="block text-md font-semibold text-slate-200 mb-3">{t('onboarding.investmentSector')}</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {sectorOptions.map(sector => (
                  <button type="button" key={sector} onClick={() => handleChange('sector', sector)}
                    className={`onboarding-choice-btn p-4 rounded-lg text-center font-medium ${formData.sector === sector ? 'selected' : ''}`}>
                    {t(`onboarding.sectors.${sector}`)}
                  </button>
                ))}
              </div>
            </div>

            {isTradeInternational && (
                 <div className="onboarding-step-content p-4 bg-slate-800/50 rounded-lg">
                    <label className="block text-md font-semibold text-slate-200 mb-3">{t('onboarding.hasSaudiPartner')}</label>
                    <div className="flex gap-4">
                        <button type="button" onClick={() => handleChange('hasSaudiPartner', true)} className={`onboarding-choice-btn flex-1 p-3 rounded-lg text-center font-medium ${formData.hasSaudiPartner === true ? 'selected' : ''}`}>{t('onboarding.yes')}</button>
                        <button type="button" onClick={() => handleChange('hasSaudiPartner', false)} className={`onboarding-choice-btn flex-1 p-3 rounded-lg text-center font-medium ${formData.hasSaudiPartner === false ? 'selected' : ''}`}>{t('onboarding.no')}</button>
                    </div>
                 </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-step-content space-y-6">
            <h2 className="text-xl font-semibold text-slate-100 border-b border-slate-600 pb-3">{t('onboarding.step2')}</h2>
            <div>
              <label htmlFor="capital" className="block text-md font-semibold text-slate-200 mb-2">{t('onboarding.initialCapital')}</label>
              <input
                type="range"
                id="capital"
                min={getMinCapital()}
                max="50000000"
                step="500000"
                value={Number(formData.capital)}
                onChange={e => handleChange('capital', e.target.value)}
                className="custom-range w-full"
              />
              <div className="flex justify-between text-sm text-slate-400 mt-2">
                <span>{formatCurrency(getMinCapital())}</span>
                <span>{formatCurrency(50_000_000)}</span>
              </div>
              <div className="text-center mt-4 text-xl font-bold text-amber-300 bg-amber-900/50 p-3 rounded-lg">
                {formatCurrency(Number(formData.capital))}
              </div>
              {isTradeInternational && (
                 <p className="text-sm text-center mt-2 text-slate-400">{t('onboarding.minCapitalNote', { amount: formatCurrency(getMinCapital()) })}</p>
              )}
            </div>
          </div>
        )}

        <div className="pt-4 flex justify-between items-center">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="bg-slate-700/50 border border-slate-600 text-slate-200 py-2 px-6 rounded-lg hover:bg-slate-700 transition-colors font-semibold"
            >
              {t('onboarding.previous')}
            </button>
          ) : <div></div>}
          <button
            type="submit"
            className="ms-auto bg-amber-600 text-white py-2 px-6 rounded-lg hover:bg-amber-700 transition-all duration-300 font-bold shadow-lg shadow-amber-900/40 hover:shadow-amber-700/50 transform hover:scale-105"
          >
            {step < 2 ? t('onboarding.next') : t('onboarding.createRoadmap')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OnboardingPage;