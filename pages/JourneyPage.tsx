import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useJourney } from '../hooks/useJourney';
import AgencyLogo from '../components/AgencyLogo';
import { Service, StepStatus } from '../types';
import ServiceAssistantModal from '../components/ServiceAssistantModal';
import FileUploadModal from '../components/FileUploadModal';
import JourneyBackground from '../components/JourneyBackground';

const statusOptions: StepStatus[] = ['طور العمل', 'طور التدقيق', 'مكتملة', 'لم تبدأ'];

const JourneyPage: React.FC = () => {
  const { journey } = useJourney();
  const [stepStatuses, setStepStatuses] = useState<Record<string, StepStatus>>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const [isAssistantModalOpen, setIsAssistantModalOpen] = useState(false);
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedStatusesRaw = localStorage.getItem('journeyStatuses');
    if (savedStatusesRaw) {
      setStepStatuses(JSON.parse(savedStatusesRaw));
    } else if (journey.length > 2) {
      const defaultStatuses: Record<string, StepStatus> = {
        [journey[0].id]: 'مكتملة',
        [journey[1].id]: 'مكتملة',
        [journey[2].id]: 'طور العمل',
      };
      setStepStatuses(defaultStatuses);
    }
  }, [journey]);
  
  const progressStats = useMemo(() => {
    const totalCount = journey.length;
    if (totalCount === 0) {
      return { completedCount: 0, progressCount: 0, totalCount: 0, percentage: 0, lastProgressedIndex: -1 };
    }

    let completedCount = 0;
    let progressCount = 0;
    let lastProgressedIndex = -1;

    journey.forEach((step, index) => {
      const status = stepStatuses[step.id];
      if (status === 'مكتملة') {
        completedCount++;
        progressCount++;
        lastProgressedIndex = index;
      } else if (status === 'طور العمل' || status === 'طور التدقيق') {
        progressCount++;
        lastProgressedIndex = index;
      }
    });
    
    const percentage = totalCount > 0 ? Math.round((progressCount / totalCount) * 100) : 0;
    
    return { completedCount, progressCount, totalCount, percentage, lastProgressedIndex };
  }, [journey, stepStatuses]);

  const timelineProgressHeight = useMemo(() => {
    if (progressStats.lastProgressedIndex < 0 || progressStats.totalCount <= 1) {
      return '0px';
    }
    const progressPercent = progressStats.lastProgressedIndex / (progressStats.totalCount - 1);
    return `calc(${progressPercent * 100}% + 12px)`; // 12px is half the marker height (24px)
  }, [progressStats]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStatusChange = (stepId: string, status: StepStatus) => {
    const newStatuses = { ...stepStatuses };
    if (status === 'لم تبدأ') {
      delete newStatuses[stepId];
    } else {
      newStatuses[stepId] = status;
    }
    setStepStatuses(newStatuses);
    localStorage.setItem('journeyStatuses', JSON.stringify(newStatuses));
    setOpenDropdown(null);
  };
  
  const getStatusInfo = (status: StepStatus | undefined): { mainColor: string; textColor: string; bgColor: string; text: StepStatus, borderColor: string } => {
    switch (status) {
      case 'مكتملة':
        return { mainColor: 'bg-emerald-500', textColor: 'text-emerald-300', bgColor: 'bg-emerald-500/10', text: 'مكتملة', borderColor: 'border-emerald-500/50' };
      case 'طور التدقيق':
        return { mainColor: 'bg-amber-500', textColor: 'text-amber-300', bgColor: 'bg-amber-500/10', text: 'طور التدقيق', borderColor: 'border-amber-500/50' };
      case 'طور العمل':
        return { mainColor: 'bg-blue-500', textColor: 'text-blue-300', bgColor: 'bg-blue-500/10', text: 'طور العمل', borderColor: 'border-blue-500/50' };
      default:
        return { mainColor: 'bg-slate-600', textColor: 'text-slate-300', bgColor: 'bg-slate-500/10', text: 'لم تبدأ', borderColor: 'border-slate-600/50' };
    }
  };

  const handleOpenAssistant = (service: Service) => {
    setSelectedService(service);
    setIsAssistantModalOpen(true);
  };
  
  const handleOpenUploadModal = (service: Service) => {
    setSelectedService(service);
    setIsFileUploadModalOpen(true);
  };

  if (journey.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">جاري إعداد رحلتك...</h1>
        <p className="text-gray-600 mt-2">يبدو أنك لم تكمل بيانات مشروعك. الرجاء العودة لصفحة الإعداد.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <JourneyBackground className="absolute inset-0 -z-10" />
      <h1 className="text-3xl font-bold text-slate-100 mb-2">رحلتك الاستثمارية المخصصة</h1>
      <p className="text-slate-300 mb-8">
        اكتملت {progressStats.completedCount} من {progressStats.totalCount} خطوات. واصل التقدم!
      </p>

      <div className="mb-10 journey-card p-4 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-slate-200">التقدم الإجمالي</span>
            <span className="text-lg font-bold text-emerald-400">{progressStats.percentage}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div 
                className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progressStats.percentage}%` }}
            ></div>
        </div>
      </div>

      <div className="relative ps-6">
        <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-slate-700" style={{ transform: 'translateX(23px)' }}></div>
        <div 
            className="absolute top-0 left-0 w-0.5 bg-emerald-500 transition-all duration-500 ease-in-out" 
            style={{ transform: 'translateX(23px)', height: timelineProgressHeight }}
        ></div>

        <div className="space-y-12">
          {journey.map((step) => {
            const status = stepStatuses[step.id];
            const { mainColor, textColor, bgColor, text, borderColor } = getStatusInfo(status);
            
            return (
              <div key={step.id} className="relative flex items-start">
                <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-slate-900 ${mainColor} transition-colors duration-300`} style={{ transform: 'translateX(-50%)' }}>
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg>
                </div>
                
                <div className={`flex-1 ms-12 journey-card rounded-xl shadow-lg border-l-4 ${borderColor}`}>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                       <div className="flex items-center">
                        <AgencyLogo agency={step.service.agency} className="w-12 h-12 text-slate-400 flex-shrink-0" />
                        <div className="ms-4">
                            <h2 className="text-xl font-bold text-slate-100">{step.service.name}</h2>
                            <p className="text-sm text-slate-400">{step.service.agency}</p>
                        </div>
                      </div>
                      <div className="relative" ref={openDropdown === step.id ? dropdownRef : null}>
                        <button 
                          onClick={() => setOpenDropdown(openDropdown === step.id ? null : step.id)} 
                          className={`flex-shrink-0 flex items-center text-sm px-3 py-1 rounded-full font-semibold transition-colors ${textColor} ${bgColor} border border-transparent hover:border-current`}
                        >
                           {text}
                           <svg className="w-4 h-4 ms-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                         {openDropdown === step.id && (
                          <div className="absolute left-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg z-10 border border-slate-600">
                            <ul className="py-1">
                              {statusOptions.map(option => (
                                <li key={option}>
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleStatusChange(step.id, option);
                                    }}
                                    className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-700"
                                  >
                                    {option === 'لم تبدأ' ? 'إعادة تعيين' : `تحديد كـ "${option}"`}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-slate-300 mt-4">{step.service.shortDescription}</p>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                      <div>
                        <h4 className="font-semibold text-slate-200 mb-2">المستندات المطلوبة</h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-300">
                          {step.service.documents.map(doc => <li key={doc}>{doc}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-200 mb-2">الشروط والقيود</h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-300">
                          {step.service.conditions.map(cond => <li key={cond}>{cond}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-200 mb-2">معلومات إضافية</h4>
                        <div className="space-y-2 text-slate-300">
                          <p><span className="font-medium text-slate-100">الرسوم:</span> {step.service.fees}</p>
                          <p><span className="font-medium text-slate-100">الوقت المتوقع:</span> {step.service.time}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 border-t border-slate-700/50 pt-5 flex items-center space-i-4">
                       <button onClick={() => handleOpenUploadModal(step.service)} className="inline-flex items-center bg-emerald-600 text-white py-2 px-5 rounded-md hover:bg-emerald-700 transition-colors font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                         <svg className="w-5 h-5 me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                         تقديم المستندات
                       </button>
                       <button onClick={() => handleOpenAssistant(step.service)} className="inline-flex items-center bg-slate-700 text-slate-200 py-2 px-5 rounded-md hover:bg-slate-600 transition-colors font-semibold">
                         <svg className="w-5 h-5 me-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                         اسأل المساعد
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
       </div>
       {selectedService && (
        <ServiceAssistantModal
          isOpen={isAssistantModalOpen}
          onClose={() => setIsAssistantModalOpen(false)}
          service={selectedService}
        />
      )}
      {selectedService && (
        <FileUploadModal
          isOpen={isFileUploadModalOpen}
          onClose={() => setIsFileUploadModalOpen(false)}
          service={selectedService}
        />
      )}
    </div>
  );
};

export default JourneyPage;