import React from 'react';
import { ShieldAlert, Cpu, Radio, Zap, RefreshCw, Bot, FileText, Lock, ShieldCheck } from 'lucide-react';
import { TelemetryData } from '../types';

interface NavbarProps {
  telemetry: TelemetryData | null;
  onKillSession: () => void;
  onReconnectSession: () => void;
  onOpenAI: () => void;
  onOpenGrantModal: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  telemetry,
  onKillSession,
  onReconnectSession,
  onOpenAI,
  onOpenGrantModal,
  activeTab,
  setActiveTab
}) => {
  const sessionActive = telemetry?.sessionActive ?? true;
  const activeSat = telemetry?.satellites.find(s => s.status === 'ACTIVE_LINK');

  return (
    <header className="bg-slate-950 border-b border-slate-800 text-slate-100 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 via-red-600 to-amber-400 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/10">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500 text-lg tracking-tighter">
                  D9
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base font-bold tracking-tight text-white font-mono">
                  DRAGON 9
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                  ICP / ISP
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans hidden sm:block">
                Sovereign Cloud-Native Mobile Infrastructure
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'simulator'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Thin-Client Simulator
            </button>

            <button
              onClick={() => setActiveTab('backhaul')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'backhaul'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              LEO Backhaul Topology
            </button>

            <button
              onClick={() => setActiveTab('containers')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'containers'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Cloud OS / Waydroid
            </button>

            <button
              onClick={() => setActiveTab('vault')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'vault'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Sovereign Vault
            </button>

            <button
              onClick={() => setActiveTab('sip')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'sip'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              SIP Telephony
            </button>

            <button
              onClick={() => setActiveTab('pillars')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'pillars'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Architectural Pillars
            </button>
          </nav>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center space-x-3">
            {/* Satellite Live Meter */}
            <div className="hidden md:flex items-center space-x-2 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-xs font-mono">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <div className="text-right">
                <div className="text-[10px] text-slate-400 leading-none">SAT LINK</div>
                <div className="text-emerald-400 font-bold text-[11px] leading-tight">
                  {activeSat ? `${activeSat.latencyMs}ms LEO` : '<40ms'}
                </div>
              </div>
            </div>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAI}
              className="flex items-center space-x-1.5 bg-indigo-950/80 hover:bg-indigo-900 text-indigo-200 border border-indigo-700/50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm"
            >
              <Bot className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">AI Diagnostics</span>
            </button>

            {/* Grant / Trial Request Modal */}
            <button
              onClick={onOpenGrantModal}
              className="hidden sm:flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Grants & Trials</span>
            </button>

            {/* Session Kill-Switch / Reconnect */}
            {sessionActive ? (
              <button
                onClick={onKillSession}
                className="flex items-center space-x-1.5 bg-red-950/90 hover:bg-red-900 text-red-200 border border-red-700/60 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-red-900/30 font-mono"
                title="Revoke session instantly - zero trace on phone endpoint"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden sm:inline">REVOKE SESSION</span>
                <span className="sm:hidden">KILL</span>
              </button>
            ) : (
              <button
                onClick={onReconnectSession}
                className="flex items-center space-x-1.5 bg-emerald-950/90 hover:bg-emerald-900 text-emerald-200 border border-emerald-700/60 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md font-mono"
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                <span>RESTORE</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex overflow-x-auto space-x-2 py-2 border-t border-slate-800/60 no-scrollbar text-xs">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`whitespace-nowrap px-3 py-1 rounded-md ${
              activeTab === 'simulator' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Thin Client
          </button>
          <button
            onClick={() => setActiveTab('backhaul')}
            className={`whitespace-nowrap px-3 py-1 rounded-md ${
              activeTab === 'backhaul' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            LEO Backhaul
          </button>
          <button
            onClick={() => setActiveTab('containers')}
            className={`whitespace-nowrap px-3 py-1 rounded-md ${
              activeTab === 'containers' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Cloud OS
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`whitespace-nowrap px-3 py-1 rounded-md ${
              activeTab === 'vault' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Vault
          </button>
          <button
            onClick={() => setActiveTab('sip')}
            className={`whitespace-nowrap px-3 py-1 rounded-md ${
              activeTab === 'sip' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            SIP Phone
          </button>
          <button
            onClick={() => setActiveTab('pillars')}
            className={`whitespace-nowrap px-3 py-1 rounded-md ${
              activeTab === 'pillars' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Pillars
          </button>
        </div>

      </div>
    </header>
  );
};
