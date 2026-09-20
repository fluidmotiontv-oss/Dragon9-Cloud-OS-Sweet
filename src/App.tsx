import React, { useState, useEffect, Suspense, lazy, useCallback, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { TelemetryData } from './types';
import { Terminal } from 'lucide-react';
import { ToastContainer, ToastMessage } from './components/ToastContainer';

const ThinClientSimulator = lazy(() => import('./components/ThinClientSimulator').then(m => ({ default: m.ThinClientSimulator })));
const SatelliteBackhaulMap = lazy(() => import('./components/SatelliteBackhaulMap').then(m => ({ default: m.SatelliteBackhaulMap })));
const CloudOSContainerManager = lazy(() => import('./components/CloudOSContainerManager').then(m => ({ default: m.CloudOSContainerManager })));
const SovereignVault = lazy(() => import('./components/SovereignVault').then(m => ({ default: m.SovereignVault })));
const SipTelephonyDialer = lazy(() => import('./components/SipTelephonyDialer').then(m => ({ default: m.SipTelephonyDialer })));
const PillarComparison = lazy(() => import('./components/PillarComparison').then(m => ({ default: m.PillarComparison })));
const AIAssistantModal = lazy(() => import('./components/AIAssistantModal').then(m => ({ default: m.AIAssistantModal })));
const PartnershipGrantModal = lazy(() => import('./components/PartnershipGrantModal').then(m => ({ default: m.PartnershipGrantModal })));

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('simulator');
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isGrantModalOpen, setIsGrantModalOpen] = useState<boolean>(false);
  
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const lastProcessedTimeRef = useRef<number | null>(null);

  const addToast = useCallback((level: 'CRITICAL' | 'SECURITY', message: string, source: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, level, message, source }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const fetchTelemetry = useCallback(async () => {
    try {
      const res = await fetch('/api/dragon9/telemetry');
      if (res.ok) {
        const data = await res.json();
        setTelemetry(data);
      }
    } catch (err) {
      console.error('Error fetching Dragon 9 telemetry:', err);
    }
  }, []);

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 3000);
    return () => clearInterval(interval);
  }, [fetchTelemetry]);

  // Toast Notification Logic
  useEffect(() => {
    if (telemetry?.systemLogs) {
      if (lastProcessedTimeRef.current === null) {
        // Initial load: don't trigger toasts, just set the baseline timestamp
        const maxTime = telemetry.systemLogs.reduce((max, log) => {
          const t = new Date(log.timestamp).getTime();
          return t > max ? t : max;
        }, 0);
        lastProcessedTimeRef.current = maxTime;
        return;
      }

      let maxTime = lastProcessedTimeRef.current;
      telemetry.systemLogs.forEach(log => {
        const logTime = new Date(log.timestamp).getTime();
        if (logTime > lastProcessedTimeRef.current!) {
          if (log.level === 'CRITICAL' || log.level === 'SECURITY') {
            addToast(log.level, log.message, log.source);
          }
          if (logTime > maxTime) {
            maxTime = logTime;
          }
        }
      });
      lastProcessedTimeRef.current = maxTime;
    }
  }, [telemetry, addToast]);

  const handleKillSession = useCallback(async () => {
    try {
      await fetch('/api/dragon9/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'kill_session' })
      });
      fetchTelemetry();
    } catch (err) {
      console.error('Kill session failed:', err);
    }
  }, [fetchTelemetry]);

  const handleReconnectSession = useCallback(async () => {
    try {
      await fetch('/api/dragon9/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reconnect_session' })
      });
      fetchTelemetry();
    } catch (err) {
      console.error('Reconnect session failed:', err);
    }
  }, [fetchTelemetry]);

  const handleFailoverSatellite = useCallback(async (nodeName: string) => {
    try {
      await fetch('/api/dragon9/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'failover_satellite', payload: { node: nodeName } })
      });
      fetchTelemetry();
    } catch (err) {
      console.error('Failover satellite failed:', err);
    }
  }, [fetchTelemetry]);

  const handleWipeVault = useCallback(async () => {
    try {
      await fetch('/api/dragon9/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'wipe_vault' })
      });
      fetchTelemetry();
    } catch (err) {
      console.error('Wipe vault failed:', err);
    }
  }, [fetchTelemetry]);

  const handleRestartWaydroid = useCallback(async (instanceId: string) => {
    try {
      await fetch('/api/dragon9/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'restart_waydroid', payload: { instanceId } })
      });
      fetchTelemetry();
    } catch (err) {
      console.error('Restart container failed:', err);
    }
  }, [fetchTelemetry]);

  // Keyboard shortcut for AI Diagnostics
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsAiModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Header / Navigation Bar */}
      <Navbar
        telemetry={telemetry}
        onKillSession={handleKillSession}
        onReconnectSession={handleReconnectSession}
        onOpenAI={() => setIsAiModalOpen(true)}
        onOpenGrantModal={() => setIsGrantModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        <ToastContainer toasts={toasts} removeToast={removeToast} />

        <Suspense fallback={<div className="p-8 text-center text-slate-400 font-mono text-xs">Loading module...</div>}>
          {activeTab === 'simulator' && (
            <ThinClientSimulator
              telemetry={telemetry}
              onKillSession={handleKillSession}
              onReconnectSession={handleReconnectSession}
            />
          )}

          {activeTab === 'backhaul' && (
            <SatelliteBackhaulMap
              telemetry={telemetry}
              onFailoverSatellite={handleFailoverSatellite}
            />
          )}

          {activeTab === 'containers' && (
            <CloudOSContainerManager
              telemetry={telemetry}
              onRestartWaydroid={handleRestartWaydroid}
            />
          )}

          {activeTab === 'vault' && (
            <SovereignVault
              telemetry={telemetry}
              onWipeVault={handleWipeVault}
            />
          )}

          {activeTab === 'sip' && (
            <SipTelephonyDialer />
          )}

          {activeTab === 'pillars' && (
            <PillarComparison />
          )}
        </Suspense>

        {/* Live System Logs Feed Banner */}
        <section className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-white text-xs">Dragon 9 Sovereign Infrastructure Log Feed</h3>
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              LIVE TELEMETRY
            </span>
          </div>

          <div className="max-h-36 overflow-y-auto space-y-1.5 pr-2 font-mono text-[11px] text-slate-400">
            {telemetry?.systemLogs?.map((log, index) => (
              <div key={index} className="flex space-x-2 items-start">
                <span className="text-slate-600 shrink-0">
                  [{new Date(log.timestamp).toLocaleTimeString()}]
                </span>
                <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold shrink-0 ${
                  log.level === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  log.level === 'SECURITY' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' :
                  log.level === 'NETWORK' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  'bg-slate-800 text-slate-300'
                }`}>
                  {log.level}
                </span>
                <span className="text-amber-400 font-bold shrink-0">[{log.source}]:</span>
                <span className="text-slate-300 flex-1 truncate">{log.message}</span>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-slate-500 font-mono text-xs mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-slate-300 font-bold">DRAGON 9 / FLUID MOTION TV</span> • Proprietary & Confidential
            <div className="text-[10px] text-slate-600 mt-0.5">
              Sovereign Cloud-Native Mobile Infrastructure & Thin-Client Suite
            </div>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <button onClick={() => setIsAiModalOpen(true)} className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5">
              <span>AI Diagnostics</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[9px] font-sans text-slate-500">⌘K</kbd>
            </button>
            <span>•</span>
            <button onClick={() => setIsGrantModalOpen(true)} className="text-slate-400 hover:text-amber-400 transition-colors">
              Partnership Grants
            </button>
            <span>•</span>
            <span className="text-emerald-400 font-bold">PTP Clock &lt;0.14µs</span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <Suspense fallback={null}>
        <AIAssistantModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          telemetry={telemetry}
        />

        <PartnershipGrantModal
          isOpen={isGrantModalOpen}
          onClose={() => setIsGrantModalOpen(false)}
        />
      </Suspense>

    </div>
  );
}
