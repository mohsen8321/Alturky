import { TeamMember, PracticeArea } from '../types';

type TFunction = (key: string, options?: any) => string;

export const getAboutData = (t: TFunction) => {
  const introductionStatement: string = t('aboutUs.introductionStatement');
  
  const missionStatement: string = t('aboutUs.missionStatement');

  const teamMembers: TeamMember[] = [
    {
      name: t('aboutUs.team.turki.name'),
      title: t('aboutUs.team.turki.title'),
      bio: t('aboutUs.team.turki.bio'),
      imageUrl: 'https://dc23.dcserp.com/files/altorkyPIC.png'
    },
    {
      name: t('aboutUs.team.naffah.name'),
      title: t('aboutUs.team.naffah.title'),
      bio: t('aboutUs.team.naffah.bio'),
      imageUrl: 'https://dc23.dcserp.com/files/SNPIC.png'
    }
  ];

  const practiceAreas: PracticeArea[] = [
    {
        name: t('aboutUs.practiceAreas.banking.name'),
        description: t('aboutUs.practiceAreas.banking.description'),
        iconPath: 'M3 6l3 6h12l3-6H3zm18 11V9M12 17V9',
        imageUrl: 'https://images.pexels.com/photos/210574/pexels-photo-210574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        name: t('aboutUs.practiceAreas.litigation.name'),
        description: t('aboutUs.practiceAreas.litigation.description'),
        iconPath: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
        imageUrl: 'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        name: t('aboutUs.practiceAreas.arbitration.name'),
        description: t('aboutUs.practiceAreas.arbitration.description'),
        iconPath: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8zm0 0l-4 4m4-4l4 4',
        imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        name: t('aboutUs.practiceAreas.labor.name'),
        description: t('aboutUs.practiceAreas.labor.description'),
        iconPath: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m16-13a4 4 0 11-8 0 4 4 0 018 0z',
        imageUrl: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        name: t('aboutUs.practiceAreas.procurement.name'),
        description: t('aboutUs.practiceAreas.procurement.description'),
        iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        imageUrl: 'https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        name: t('aboutUs.practiceAreas.energy.name'),
        description: t('aboutUs.practiceAreas.energy.description'),
        iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
        imageUrl: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        name: t('aboutUs.practiceAreas.environment.name'),
        description: t('aboutUs.practiceAreas.environment.description'),
        iconPath: 'M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z',
        imageUrl: 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        name: t('aboutUs.practiceAreas.media.name'),
        description: t('aboutUs.practiceAreas.media.description'),
        iconPath: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-.707.293h-1.172a1 1 0 01-.707-.293L10 9.414a1 1 0 00-.707-.293H7m12 11v-5m-5.022 5.022L17 17m-5.022-5.022L12 12',
        imageUrl: 'https://images.pexels.com/photos/7234321/pexels-photo-7234321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        name: t('aboutUs.practiceAreas.healthcare.name'),
        description: t('aboutUs.practiceAreas.healthcare.description'),
        iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        imageUrl: 'https://images.pexels.com/photos/3992933/pexels-photo-3992933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        name: t('aboutUs.practiceAreas.insurance.name'),
        description: t('aboutUs.practiceAreas.insurance.description'),
        iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
        imageUrl: 'https://images.pexels.com/photos/5905473/pexels-photo-5905473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        name: t('aboutUs.practiceAreas.it.name'),
        description: t('aboutUs.practiceAreas.it.description'),
        iconPath: 'M5 12h14M12 5l7 7-7 7',
        imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        name: t('aboutUs.practiceAreas.realEstate.name'),
        description: t('aboutUs.practiceAreas.realEstate.description'),
        iconPath: 'M8 20H3V10H2L12 2l10 8h-1v10h-5',
        imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        name: t('aboutUs.practiceAreas.aviation.name'),
        description: t('aboutUs.practiceAreas.aviation.description'),
        iconPath: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
        imageUrl: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        name: t('aboutUs.practiceAreas.ip.name'),
        description: t('aboutUs.practiceAreas.ip.description'),
        iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
        imageUrl: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        name: t('aboutUs.practiceAreas.inheritance.name'),
        description: t('aboutUs.practiceAreas.inheritance.description'),
        iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M12 14a4 4 0 100-8 4 4 0 000 8zm0 0c1.306 0 2.516.484 3.464 1.258',
        imageUrl: 'https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];

  const clients: string[] = Array.from({ length: 12 }, (_, i) => t(`aboutUs.clients.${i}`));

  return { introductionStatement, missionStatement, teamMembers, practiceAreas, clients };
};