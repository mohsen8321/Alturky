export type StepStatusKey = 'completed' | 'in_progress' | 'in_review' | 'not_started';

export interface Service {
  id: string;
  name: string;
  agency: string;
  shortDescription: string;
  documents: string[];
  conditions: string[];
  fees: string;
  time: string;
}

export interface JourneyStep {
  id: string;
  service: Service;
  applicableTo?: ('foreign' | 'local' | 'gulf')[];
  businessModel?: 'Standard' | 'Franchise';
}

export interface Program {
  id: string;
  name: string;
  description: string;
}

export interface UserDocument {
  file: File;
  serviceName: string;
  serviceId: string;
  uploadedAt: string;
}

export interface UserProfile {
  investorStatus: 'new' | 'existing';
  investmentType: 'foreign' | 'local' | 'gulf';
  legalEntityType: string;
  sector: string;
  capital: string;
  hasOnboarded: boolean;
  businessModel: 'Standard' | 'Franchise';
  hasSaudiPartner?: boolean;
}


export interface User {
  email: string;
  profile: UserProfile;
  documents: UserDocument[];
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
}

export interface PracticeArea {
  name: string;
  description: string;
  iconPath: string;
  imageUrl: string;
}