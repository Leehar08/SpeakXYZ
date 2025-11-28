
import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div 
          key={toast.id}
          className={`
            pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md transition-all animate-fade-in-up min-w-[300px]
            ${toast.type === 'success' ? 'bg-white/90 border-emerald-200 text-slate-800' : ''}
            ${toast.type === 'error' ? 'bg-white/90 border-red-200 text-slate-800' : ''}
            ${toast.type === 'info' ? 'bg-slate-900/90 border-slate-700 text-white' : ''}
          `}
        >
          <div className={`
            p-1 rounded-full 
            ${toast.type === 'success' ? 'bg-emerald-100 text-emerald-600' : ''}
            ${toast.type === 'error' ? 'bg-red-100 text-red-600' : ''}
            ${toast.type === 'info' ? 'bg-slate-700 text-slate-300' : ''}
          `}>
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4" />}
            {toast.type === 'info' && <Info className="w-4 h-4" />}
          </div>
          
          <p className="text-sm font-medium flex-1">{toast.message}</p>
          
          <button 
            onClick={() => onDismiss(toast.id)}
            className="p-1 hover:bg-black/5 rounded-full transition-colors opacity-60 hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
