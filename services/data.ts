import { Service, Program, JourneyStep } from '../types';

type TFunction = (key: string, options?: any) => string;

export const getServices = (t: TFunction): Service[] => [
  {
    id: 'misa-license',
    name: t('services.misa_license.name'),
    agency: t('services.misa_license.agency'),
    shortDescription: t('services.misa_license.shortDescription'),
    documents: [
      t('services.misa_license.documents.0'),
      t('services.misa_license.documents.1'),
      t('services.misa_license.documents.2'),
    ],
    conditions: [
      t('services.misa_license.conditions.0'),
      t('services.misa_license.conditions.1'),
    ],
    fees: t('services.misa_license.fees'),
    time: t('services.misa_license.time'),
  },
  {
    id: 'cr-issue',
    name: t('services.cr_issue.name'),
    agency: t('services.cr_issue.agency'),
    shortDescription: t('services.cr_issue.shortDescription'),
    documents: [
      t('services.cr_issue.documents.0'),
      t('services.cr_issue.documents.1'),
      t('services.cr_issue.documents.2'),
    ],
    conditions: [
      t('services.cr_issue.conditions.0'),
      t('services.cr_issue.conditions.1'),
    ],
    fees: t('services.cr_issue.fees'),
    time: t('services.cr_issue.time'),
  },
  {
    id: 'franchise-register',
    name: t('services.franchise_register.name'),
    agency: t('services.franchise_register.agency'),
    shortDescription: t('services.franchise_register.shortDescription'),
    documents: [
      t('services.franchise_register.documents.0'),
      t('services.franchise_register.documents.1'),
      t('services.franchise_register.documents.2'),
      t('services.franchise_register.documents.3'),
    ],
    conditions: [
      t('services.franchise_register.conditions.0'),
      t('services.franchise_register.conditions.1'),
    ],
    fees: t('services.franchise_register.fees'),
    time: t('services.franchise_register.time'),
  },
  {
    id: 'gosi-register',
    name: t('services.gosi_register.name'),
    agency: t('services.gosi_register.agency'),
    shortDescription: t('services.gosi_register.shortDescription'),
    documents: [
      t('services.gosi_register.documents.0'),
      t('services.gosi_register.documents.1'),
      t('services.gosi_register.documents.2'),
    ],
    conditions: [
      t('services.gosi_register.conditions.0'),
      t('services.gosi_register.conditions.1'),
    ],
    fees: t('services.gosi_register.fees'),
    time: t('services.gosi_register.time'),
  },
  {
    id: 'hrsd-register',
    name: t('services.hrsd_register.name'),
    agency: t('services.hrsd_register.agency'),
    shortDescription: t('services.hrsd_register.shortDescription'),
    documents: [
      t('services.hrsd_register.documents.0'),
      t('services.hrsd_register.documents.1'),
      t('services.hrsd_register.documents.2'),
    ],
    conditions: [
      t('services.hrsd_register.conditions.0'),
    ],
    fees: t('services.hrsd_register.fees'),
    time: t('services.hrsd_register.time'),
  },
  {
    id: 'zatca-register',
    name: t('services.zatca_register.name'),
    agency: t('services.zatca_register.agency'),
    shortDescription: t('services.zatca_register.shortDescription'),
    documents: [
      t('services.zatca_register.documents.0'),
      t('services.zatca_register.documents.1'),
    ],
    conditions: [
      t('services.zatca_register.conditions.0'),
    ],
    fees: t('services.zatca_register.fees'),
    time: t('services.zatca_register.time'),
  },
   {
    id: 'doc-auth',
    name: t('services.doc_auth.name'),
    agency: t('services.doc_auth.agency'),
    shortDescription: t('services.doc_auth.shortDescription'),
    documents: [
        t('services.doc_auth.documents.0'),
        t('services.doc_auth.documents.1'),
    ],
    conditions: [
        t('services.doc_auth.conditions.0'),
    ],
    fees: t('services.doc_auth.fees'),
    time: t('services.doc_auth.time'),
  },
  {
    id: 'renew-cr',
    name: t('services.renew_cr.name'),
    agency: t('services.renew_cr.agency'),
    shortDescription: t('services.renew_cr.shortDescription'),
    documents: [
        t('services.renew_cr.documents.0'),
        t('services.renew_cr.documents.1'),
    ],
    conditions: [
        t('services.renew_cr.conditions.0'),
    ],
    fees: t('services.renew_cr.fees'),
    time: t('services.renew_cr.time'),
  },
  {
    id: 'trademark-register',
    name: t('services.trademark_register.name'),
    agency: t('services.trademark_register.agency'),
    shortDescription: t('services.trademark_register.shortDescription'),
    documents: [
        t('services.trademark_register.documents.0'),
        t('services.trademark_register.documents.1'),
        t('services.trademark_register.documents.2'),
    ],
    conditions: [
        t('services.trademark_register.conditions.0'),
        t('services.trademark_register.conditions.1'),
    ],
    fees: t('services.trademark_register.fees'),
    time: t('services.trademark_register.time'),
  },
  {
    id: 'renew-misa',
    name: t('services.renew_misa.name'),
    agency: t('services.renew_misa.agency'),
    shortDescription: t('services.renew_misa.shortDescription'),
    documents: [
        t('services.renew_misa.documents.0'),
        t('services.renew_misa.documents.1'),
        t('services.renew_misa.documents.2'),
    ],
    conditions: [
        t('services.renew_misa.conditions.0'),
        t('services.renew_misa.conditions.1'),
    ],
    fees: t('services.renew_misa.fees'),
    time: t('services.renew_misa.time'),
  },
  {
    id: 'investor-visa',
    name: t('services.investor_visa.name'),
    agency: t('services.investor_visa.agency'),
    shortDescription: t('services.investor_visa.shortDescription'),
    documents: [
        t('services.investor_visa.documents.0'),
        t('services.investor_visa.documents.1'),
        t('services.investor_visa.documents.2'),
    ],
    conditions: [
        t('services.investor_visa.conditions.0'),
    ],
    fees: t('services.investor_visa.fees'),
    time: t('services.investor_visa.time'),
  },
  {
    id: 'work-visa',
    name: t('services.work_visa.name'),
    agency: t('services.work_visa.agency'),
    shortDescription: t('services.work_visa.shortDescription'),
    documents: [
        t('services.work_visa.documents.0'),
        t('services.work_visa.documents.1'),
        t('services.work_visa.documents.2'),
    ],
    conditions: [
        t('services.work_visa.conditions.0'),
        t('services.work_visa.conditions.1'),
    ],
    fees: t('services.work_visa.fees'),
    time: t('services.work_visa.time'),
  },
  {
    id: 'saudization-cert',
    name: t('services.saudization_cert.name'),
    agency: t('services.saudization_cert.agency'),
    shortDescription: t('services.saudization_cert.shortDescription'),
    documents: [
        t('services.saudization_cert.documents.0'),
        t('services.saudization_cert.documents.1'),
    ],
    conditions: [
        t('services.saudization_cert.conditions.0'),
    ],
    fees: t('services.saudization_cert.fees'),
    time: t('services.saudization_cert.time'),
  },
  {
    id: 'gosi-compliance',
    name: t('services.gosi_compliance.name'),
    agency: t('services.gosi_compliance.agency'),
    shortDescription: t('services.gosi_compliance.shortDescription'),
    documents: [
        t('services.gosi_compliance.documents.0'),
    ],
    conditions: [
        t('services.gosi_compliance.conditions.0'),
    ],
    fees: t('services.gosi_compliance.fees'),
    time: t('services.gosi_compliance.time'),
  },
  {
    id: 'tax-return',
    name: t('services.tax_return.name'),
    agency: t('services.tax_return.agency'),
    shortDescription: t('services.tax_return.shortDescription'),
    documents: [
        t('services.tax_return.documents.0'),
        t('services.tax_return.documents.1'),
    ],
    conditions: [
        t('services.tax_return.conditions.0'),
    ],
    fees: t('services.tax_return.fees'),
    time: t('services.tax_return.time'),
  },
  {
    id: 'municipal-license',
    name: t('services.municipal_license.name'),
    agency: t('services.municipal_license.agency'),
    shortDescription: t('services.municipal_license.shortDescription'),
    documents: [
        t('services.municipal_license.documents.0'),
        t('services.municipal_license.documents.1'),
        t('services.municipal_license.documents.2'),
    ],
    conditions: [
        t('services.municipal_license.conditions.0'),
    ],
    fees: t('services.municipal_license.fees'),
    time: t('services.municipal_license.time'),
  },
  {
    id: 'civil-defense-cert',
    name: t('services.civil_defense_cert.name'),
    agency: t('services.civil_defense_cert.agency'),
    shortDescription: t('services.civil_defense_cert.shortDescription'),
    documents: [
        t('services.civil_defense_cert.documents.0'),
        t('services.civil_defense_cert.documents.1'),
    ],
    conditions: [
        t('services.civil_defense_cert.conditions.0'),
    ],
    fees: t('services.civil_defense_cert.fees'),
    time: t('services.civil_defense_cert.time'),
  },
  {
    id: 'contract-review',
    name: t('services.contract_review.name'),
    agency: t('services.contract_review.agency'),
    shortDescription: t('services.contract_review.shortDescription'),
    documents: [
        t('services.contract_review.documents.0'),
        t('services.contract_review.documents.1'),
        t('services.contract_review.documents.2'),
    ],
    conditions: [
        t('services.contract_review.conditions.0'),
    ],
    fees: t('services.contract_review.fees'),
    time: t('services.contract_review.time'),
  },
  {
    id: 'articles-amendment',
    name: t('services.articles_amendment.name'),
    agency: t('services.articles_amendment.agency'),
    shortDescription: t('services.articles_amendment.shortDescription'),
    documents: [
        t('services.articles_amendment.documents.0'),
        t('services.articles_amendment.documents.1'),
        t('services.articles_amendment.documents.2'),
    ],
    conditions: [
        t('services.articles_amendment.conditions.0'),
    ],
    fees: t('services.articles_amendment.fees'),
    time: t('services.articles_amendment.time'),
  },
  {
    id: 'advanced-tax-consulting',
    name: t('services.advanced_tax_consulting.name'),
    agency: t('services.advanced_tax_consulting.agency'),
    shortDescription: t('services.advanced_tax_consulting.shortDescription'),
    documents: [
        t('services.advanced_tax_consulting.documents.0'),
        t('services.advanced_tax_consulting.documents.1'),
    ],
    conditions: [
        t('services.advanced_tax_consulting.conditions.0'),
    ],
    fees: t('services.advanced_tax_consulting.fees'),
    time: t('services.advanced_tax_consulting.time'),
  },
  {
    id: 'dispute-resolution',
    name: t('services.dispute_resolution.name'),
    agency: t('services.dispute_resolution.agency'),
    shortDescription: t('services.dispute_resolution.shortDescription'),
    documents: [
        t('services.dispute_resolution.documents.0'),
        t('services.dispute_resolution.documents.1'),
        t('services.dispute_resolution.documents.2'),
    ],
    conditions: [
        t('services.dispute_resolution.conditions.0'),
    ],
    fees: t('services.dispute_resolution.fees'),
    time: t('services.dispute_resolution.time'),
  },
];

export const getPrograms = (t: TFunction): Program[] => [
  {
    id: 'strategic-investor',
    name: t('programs.strategic_investor.name'),
    description: t('programs.strategic_investor.description'),
  },
  {
    id: 'miza-program',
    name: t('programs.miza_program.name'),
    description: t('programs.miza_program.description'),
  },
  {
    id: 'monshaat-sme-support',
    name: t('programs.monshaat_sme_support.name'),
    description: t('programs.monshaat_sme_support.description'),
  },
  {
    id: 'local-content-initiative',
    name: t('programs.local_content_initiative.name'),
    description: t('programs.local_content_initiative.description'),
  },
  {
    id: 'rhq-program',
    name: t('programs.rhq_program.name'),
    description: t('programs.rhq_program.description'),
  },
  {
    id: 'nidlp-program',
    name: t('programs.nidlp_program.name'),
    description: t('programs.nidlp_program.description'),
  },
  {
    id: 'tourism-fund',
    name: t('programs.tourism_fund.name'),
    description: t('programs.tourism_fund.description'),
  },
  {
    id: 'rd-initiative',
    name: t('programs.rd_initiative.name'),
    description: t('programs.rd_initiative.description'),
  },
];


export const getJourneySteps = (t: TFunction): JourneyStep[] => {
  const services = getServices(t);
  return [
    {
      id: 'misa-license',
      service: services.find(s => s.id === 'misa-license')!,
      applicableTo: ['foreign', 'gulf'],
    },
    {
      id: 'doc-auth',
      service: services.find(s => s.id === 'doc-auth')!,
      applicableTo: ['foreign'],
    },
    {
      id: 'cr-issue',
      service: services.find(s => s.id === 'cr-issue')!,
    },
    {
      id: 'franchise-register',
      service: services.find(s => s.id === 'franchise-register')!,
      businessModel: 'Franchise',
    },
      {
      id: 'municipal-license',
      service: services.find(s => s.id === 'municipal-license')!,
    },
    {
      id: 'hrsd-register',
      service: services.find(s => s.id === 'hrsd-register')!,
    },
    {
      id: 'gosi-register',
      service: services.find(s => s.id === 'gosi-register')!,
    },
    {
      id: 'zatca-register',
      service: services.find(s => s.id === 'zatca-register')!,
    },
    {
      id: 'investor-visa',
      service: services.find(s => s.id === 'investor-visa')!,
      applicableTo: ['foreign', 'gulf'],
    },
    {
      id: 'work-visa',
      service: services.find(s => s.id === 'work-visa')!,
    },
    {
      id: 'civil-defense-cert',
      service: services.find(s => s.id === 'civil-defense-cert')!,
    },
  ];
}

export const getExistingInvestorJourneySteps = (t: TFunction): JourneyStep[] => {
  const services = getServices(t);
  return [
    {
      id: 'contract-review',
      service: services.find(s => s.id === 'contract-review')!,
    },
    {
      id: 'articles-amendment',
      service: services.find(s => s.id === 'articles-amendment')!,
    },
    {
      id: 'advanced-tax-consulting',
      service: services.find(s => s.id === 'advanced-tax-consulting')!,
    },
    {
      id: 'dispute-resolution',
      service: services.find(s => s.id === 'dispute-resolution')!,
    },
    {
      id: 'trademark-register',
      service: services.find(s => s.id === 'trademark-register')!,
    },
    {
      id: 'work-visa',
      service: services.find(s => s.id === 'work-visa')!,
    }
  ];
};