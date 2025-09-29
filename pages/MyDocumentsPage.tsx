import React, { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserDocument } from '../types';

const MyDocumentsPage: React.FC = () => {
  const { user } = useAuth();
  const documents = user?.documents || [];

  const groupedDocuments = useMemo(() => {
    return documents.reduce<Record<string, UserDocument[]>>((acc, doc) => {
      (acc[doc.serviceName] = acc[doc.serviceName] || []).push(doc);
      return acc;
    }, {});
  }, [documents]);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const FileIcon: React.FC<{ fileType: string }> = ({ fileType }) => {
    let icon;
    if (fileType.includes('pdf')) {
      icon = <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m5 5l-3-3m0 0l3-3m-3 3h5" /></svg>;
    } else if (fileType.includes('image')) {
      icon = <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" /></svg>;
    } else {
      icon = <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
    }
    return <div className="flex-shrink-0 p-2 bg-slate-800 rounded-lg border border-slate-700">{icon}</div>;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-100 mb-2">مستنداتي</h1>
      <p className="text-slate-300 mb-8">هنا يمكنك العثور على جميع المستندات التي قمت برفعها لكل خدمة.</p>

      {documents.length === 0 ? (
        <div className="text-center p-12 glass-card rounded-xl mt-10">
          <svg className="mx-auto h-16 w-16 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-slate-200">لا توجد مستندات مرفوعة</h2>
          <p className="mt-2 text-slate-400">
            عند تقديمك للمستندات في صفحة "رحلتي"، ستظهر هنا.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedDocuments).map(([serviceName, docs]) => (
            <div key={serviceName} className="glass-card rounded-xl overflow-hidden">
              <h2 className="px-6 py-4 text-xl font-bold text-slate-100 border-b border-slate-700/50 bg-slate-800/40">{serviceName}</h2>
              <ul className="divide-y divide-slate-700/50">
                {/* FIX: Cast `docs` to `UserDocument[]` to resolve TypeScript error where `docs` was inferred as `unknown`. */}
                {(docs as UserDocument[]).map(doc => (
                  <li key={doc.file.name + doc.uploadedAt} className="px-6 py-4 flex items-center justify-between hover:bg-slate-800/40 transition-colors">
                    <div className="flex items-center space-i-4">
                      <FileIcon fileType={doc.file.type} />
                      <div className="flex-grow">
                        <p className="font-semibold text-slate-200 truncate">{doc.file.name}</p>
                        <p className="text-sm text-slate-400">
                          {formatBytes(doc.file.size)} &bull; تاريخ الرفع: {new Date(doc.uploadedAt).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDocumentsPage;