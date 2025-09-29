import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { journeySteps } from '../services/data';
import { JourneyStep } from '../types';

export const useJourney = () => {
  const { user } = useAuth();

  const journey: JourneyStep[] = useMemo(() => {
    if (!user?.profile.hasOnboarded) {
      return [];
    }
    
    const { investmentType, businessModel } = user.profile;

    return journeySteps.filter(step => {
      // Step is applicable to all types if applicableTo is not defined
      const typeMatch = !step.applicableTo || step.applicableTo.includes(investmentType);
      
      // Step is applicable to all business models if businessModel is not defined
      const businessModelMatch = !step.businessModel || step.businessModel === businessModel;

      return typeMatch && businessModelMatch;
    });

  }, [user]);

  return { journey };
};