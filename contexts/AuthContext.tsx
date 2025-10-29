import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { User, UserProfile, Service, UserDocument } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, investorStatus: 'new' | 'existing') => void;
  logout: () => void;
  completeOnboarding: (profileData: Omit<UserProfile, 'hasOnboarded' | 'investorStatus'>) => void;
  addDocuments: (files: File[], service: Service) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const savedUserRaw = localStorage.getItem('user');
      if (savedUserRaw) {
        const savedUser = JSON.parse(savedUserRaw);
        const rehydratedUser: User = {
          ...savedUser,
          documents: (savedUser.documents || []).map((doc: any) => ({
            ...doc,
            // Create a dummy File object as it cannot be stored in localStorage
            file: new File([], doc.file.name, { type: doc.file.type }),
          })),
        };
        setUser(rehydratedUser);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('user');
    }
  }, []);

  const login = (email: string, investorStatus: 'new' | 'existing') => {
    const newUser: User = {
      email,
      profile: {
        investorStatus,
        investmentType: 'foreign',
        legalEntityType: '',
        sector: '',
        capital: '500000',
        businessModel: 'Standard',
        hasOnboarded: investorStatus === 'existing',
      },
      documents: [],
    };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  
  const completeOnboarding = useCallback((profileData: Omit<UserProfile, 'hasOnboarded' | 'investorStatus'>) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      const updatedUser = {
        ...currentUser,
        profile: {
          ...currentUser.profile,
          ...profileData,
          hasOnboarded: true,
        },
      };
      const serializableUser = {
        ...updatedUser,
        documents: updatedUser.documents.map(doc => ({
          serviceName: doc.serviceName,
          serviceId: doc.serviceId,
          uploadedAt: doc.uploadedAt,
          file: { name: doc.file.name, size: doc.file.size, type: doc.file.type },
        })),
      };
      localStorage.setItem('user', JSON.stringify(serializableUser));
      return updatedUser;
    });
  }, []);

  const addDocuments = useCallback((files: File[], service: Service) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      
      const newDocuments: UserDocument[] = files.map(file => ({
        file: file,
        serviceName: service.name,
        serviceId: service.id,
        uploadedAt: new Date().toISOString(),
      }));
      
      const updatedUser = {
        ...currentUser,
        documents: [...currentUser.documents, ...newDocuments],
      };
      
      const serializableUser = {
        ...updatedUser,
        documents: updatedUser.documents.map(doc => ({
          serviceName: doc.serviceName,
          serviceId: doc.serviceId,
          uploadedAt: doc.uploadedAt,
          file: { name: doc.file.name, size: doc.file.size, type: doc.file.type },
        })),
      };
      localStorage.setItem('user', JSON.stringify(serializableUser));
      
      return updatedUser;
    });
  }, []);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, completeOnboarding, addDocuments }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};