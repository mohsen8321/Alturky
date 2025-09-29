import React, { useState, useCallback } from 'react';
import { Service } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, onClose, service }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const { addDocuments } = useAuth();

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (selectedFiles) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(selectedFiles)]);
    }
  };

  const removeFile = (fileName: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileChange(e.dataTransfer.files);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;

    setIsUploading(true);
    setTimeout(() => {
      addDocuments(files, service);
      setIsUploading(false);
      setFiles([]);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setFiles([]);
    setIsUploading(false);
    setIsDragOver(false);
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={handleClose}
    >
      <div
        className="auth-modal-panel w-full max-w-2xl rounded-2xl shadow-2xl text-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-700/50 flex justify-between items-center flex-shrink-0">
          <h3 className="text-lg font-bold text-white">{`تقديم المستندات: ${service.name}`}</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-700"
            aria-label="إغلاق"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h4 className="font-semibold text-slate-200 mb-3">المستندات المطلوبة</h4>
            <ul className="list-disc list-inside space-y-2 text-slate-300 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              {service.documents.map(doc => <li key={doc}>{doc}</li>)}
            </ul>
          </div>

          <form onSubmit={handleSubmit}>
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${isDragOver ? 'border-emerald-500 bg-emerald-500/10 scale-105' : 'border-slate-600 bg-slate-800/30 hover:border-emerald-500/50'}`}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => document.getElementById('file-upload-input')?.click()}
            >
              <input 
                type="file" 
                id="file-upload-input"
                multiple 
                className="hidden" 
                onChange={(e) => handleFileChange(e.target.files)} 
                aria-label="File upload"
              />
              <svg className="mx-auto h-12 w-12 text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-2 text-sm text-slate-400">
                <span className="font-semibold text-emerald-400">اسحب وأفلت ملفاتك هنا</span> أو انقر للاختيار.
              </p>
            </div>

            {files.length > 0 && (
              <div className="mt-4">
                <h5 className="font-semibold text-sm text-slate-300 mb-2">الملفات المحددة:</h5>
                <ul className="space-y-2 max-h-40 overflow-y-auto p-2 bg-slate-800/30 rounded-lg">
                  {files.map(file => (
                    <li key={file.name} className="flex items-center justify-between bg-slate-700/50 p-2 rounded-md text-sm border border-slate-600/50">
                      <span className="text-slate-200 truncate font-medium">{file.name}</span>
                      <button 
                        type="button" 
                        onClick={() => removeFile(file.name)} 
                        className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-500/10"
                        aria-label={`Remove ${file.name}`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                disabled={isUploading || files.length === 0}
                className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 disabled:bg-slate-600 disabled:cursor-not-allowed font-bold shadow-lg shadow-emerald-900/40 hover:shadow-emerald-700/50 transform hover:scale-105 transition-all"
              >
                {isUploading ? 'جاري الرفع...' : `رفع ${files.length} ملفات`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;