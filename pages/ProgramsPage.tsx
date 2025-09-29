import React from 'react';
import { programs } from '../services/data';
import { Program } from '../types';

const ProgramCard: React.FC<{ program: Program }> = ({ program }) => {
  let icon;

  switch (program.id) {
    case 'strategic-investor':
      icon = <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
      break;
    case 'monshaat-sme-support':
      icon = <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
      break;
    case 'local-content-initiative':
      icon = <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
      break;
    default: // miza-program
      icon = <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 12l4.293 4.293a1 1 0 010 1.414L13 20m5-15l2.293 2.293a1 1 0 000 1.414L17 12l4.293 4.293a1 1 0 000 1.414L19 20M3 9h4m11 0h4" /></svg>;
      break;
  }


  return (
    <div className="glass-card p-8 rounded-xl flex flex-col h-full">
      <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-slate-800 mb-6 border border-slate-700">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-slate-100 mb-3">{program.name}</h2>
      <p className="text-slate-300 text-sm flex-grow leading-relaxed">{program.description}</p>
      <div className="mt-6 pt-6 border-t border-slate-700/50">
        <a href="#" className="inline-flex items-center font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group">
          اعرف المزيد
          <svg className="w-4 h-4 ms-2 transition-transform group-hover:translate-x-[-4px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
        </a>
      </div>
    </div>
  );
};


const ProgramsPage: React.FC = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-100">البرامج الداعمة</h1>
        <p className="text-slate-300 mt-2 max-w-2xl mx-auto">تعرف على البرامج والمبادرات المصممة لتمكين ودعم المستثمرين في المملكة.</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {programs.map(program => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </div>
  );
};

export default ProgramsPage;