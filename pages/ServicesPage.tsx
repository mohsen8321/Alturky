import React, { useState, useMemo, useRef, useEffect } from 'react';
import { getServices } from '../services/data';
import { Service } from '../types';
import AgencyLogo from '../components/AgencyLogo';
import { useLanguage } from '../hooks/useLanguage';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const { t } = useLanguage();
  return (
    <div className="glass-card p-6 rounded-xl flex flex-col h-full">
      <div className="flex items-start mb-4">
        <AgencyLogo agency={service.agency} className="w-10 h-10 text-slate-300 flex-shrink-0" />
        <div className="flex-1 ms-4 rtl:ms-0 rtl:me-4">
          <h3 className="text-lg font-bold text-slate-100">{service.name}</h3>
          <p className="text-sm text-slate-400">{service.agency}</p>
        </div>
      </div>
      <p className="text-slate-300 text-sm mb-4 flex-grow">{service.shortDescription}</p>
      <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-700/50 pt-4">
        <span>
          <span className="font-semibold text-slate-200">{t('journey.fees')}:</span> {service.fees}
        </span>
        <span className="font-semibold text-amber-400">{service.time}</span>
      </div>
    </div>
  );
};

const CustomSelect: React.FC<{
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const { dir } = useLanguage();

  const selectedLabel = options.find(opt => opt.value === value)?.label;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (newValue: string) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative w-full">
      <button
        type="button"
        className={`dark-input w-full px-4 py-2.5 rounded-lg flex justify-between items-center ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-slate-200">{selectedLabel}</span>
        <svg
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <ul
          className="custom-select-panel absolute z-10 mt-2 w-full glass-card p-2 rounded-lg shadow-2xl max-h-60 overflow-y-auto"
          role="listbox"
        >
          {options.map(option => (
            <li
              key={option.value}
              className={`custom-select-option px-4 py-2 rounded-md cursor-pointer text-slate-200 ${value === option.value ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


const ServicesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgency, setSelectedAgency] = useState('all');
  const { t } = useLanguage();

  const services = useMemo(() => getServices(t), [t]);

  const agencies = useMemo(() => {
    const uniqueAgencies = ['all', ...Array.from(new Set(services.map(s => s.agency)))];
    return uniqueAgencies.map(agency => ({
      value: agency,
      label: agency === 'all' ? t('services.allAgencies') : agency,
    }));
  }, [services, t]);
  
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const matchesSearch = service.name.toLowerCase().includes(lowerSearchTerm) || service.agency.toLowerCase().includes(lowerSearchTerm);
      const matchesAgency = selectedAgency === 'all' || service.agency === selectedAgency;
      return matchesSearch && matchesAgency;
    });
  }, [searchTerm, selectedAgency, services]);

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-100">{t('services.title')}</h1>
        <p className="text-slate-300 mt-2">{t('services.subtitle')}</p>
      </div>

      <div className="glass-card p-4 rounded-xl mb-10 sticky top-[112px] z-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder={t('services.searchPlaceholder')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="md:col-span-2 w-full px-4 py-2.5 rounded-lg dark-input"
          />
          <CustomSelect
            options={agencies}
            value={selectedAgency}
            onChange={setSelectedAgency}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.length > 0 ? (
          filteredServices.map(service => <ServiceCard key={service.id} service={service} />)
        ) : (
          <div className="col-span-full text-center glass-card py-16 rounded-xl">
            <p className="text-lg text-slate-300">
              {t('services.noServicesFound')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;