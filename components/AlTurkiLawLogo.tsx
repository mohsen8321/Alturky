import React from 'react';

export const AlTurkiLawLogo: React.FC<{ className?: string }> = ({ className }) => (
  <img 
    src="https://dc23.dcserp.com/files/logoaltorky.png"
    alt="Al-Turki Law Firm Logo"
    className={className}
    style={{ objectFit: 'contain' }}
  />
);
