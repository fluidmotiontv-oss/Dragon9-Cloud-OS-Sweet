import React from 'react';
import { AlertTriangle, ShieldAlert, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  level: 'CRITICAL' | 'SECURITY';
  message: string;
  source: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border w-80 shadow-2xl transition-all duration-300 font-mono text-xs ${
            toast.level === 'CRITICAL'
              ? 'bg-slate-900 border-red-500/50 shadow-red-900/20 text-slate-200'
              : 'bg-slate-900 border-indigo-500/50 shadow-indigo-900/20 text-slate-200'
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {toast.level === 'CRITICAL' ? (
              <AlertTriangle className="w-5 h-5 text-red-500" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-indigo-400" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className={`font-bold ${toast.level === 'CRITICAL' ? 'text-red-400' : 'text-indigo-400'}`}>
                {toast.level} EVENT
              </span>
              <span className="text-[9px] text-slate-500">{toast.source}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
