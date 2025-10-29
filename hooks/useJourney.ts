import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getJourneySteps, getExistingInvestorJourneySteps } from '../services/data';
import { JourneyStep } from '../types';
import { useLanguage } from './useLanguage';

export const useJourney = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const journey: JourneyStep[] = useMemo(() => {
    if (!user?.profile.hasOnboarded) {
      return [];
    }
    
    // For existing investors, return their specific journey
    if (user.profile.investorStatus === 'existing') {
        return getExistingInvestorJourneySteps(t);
    }
    
    const { investmentType, businessModel } = user.profile;

    const allSteps = getJourneySteps(t);

    return allSteps.filter(step => {
      // Step is applicable to all types if applicableTo is not defined
      const typeMatch = !step.applicableTo || step.applicableTo.includes(investmentType);
      
      // Step is applicable to all business models if businessModel is not defined
      const businessModelMatch = !step.businessModel || step.businessModel === businessModel;

      return typeMatch && businessModelMatch;
    });

  }, [user, t]);

  return { journey };
};