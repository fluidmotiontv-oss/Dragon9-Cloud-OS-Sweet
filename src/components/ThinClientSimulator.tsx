import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Zap, Shield, Play, Pause, RefreshCw, Volume2, Wifi, BatteryCharging, ArrowUpRight, Cpu, Lock, AlertTriangle, Layers, Radio } from 'lucide-react';
import { TelemetryData } from '../types';

interface ThinClientSimulatorProps {
  telemetry: TelemetryData | null;
  onKillSession: () => void;
  onReconnectSession: () => void;
}

export const ThinClientSimulator: React.FC<ThinClientSimulatorProps> = ({
  telemetry,
  onKillSession,
  onReconnectSession
}) => {
  const [activeContainerApp, setActiveContainerApp] = useState<'waydroid' | 'workspace' | 'media'>('waydroid');
  const [selectedCodec, setSelectedCodec] = useState<'AV1 Hardware' | 'H.265 ULL'>('AV1 Hardware');
  const [targetFps, setTargetFps] = useState<120 | 60>(120);
  const [simulatedStreamFps, setSimulatedStreamFps] = useState<number>(118);
  const [simulatedLatency, setSimulatedLatency] = useState<number>(22.4);
  const [simulatedInputCount, setSimulatedInputCount] = useState<number>(1420);
  const [isSimulatingTouch, setIsSimulatingTouch] = useState<boolean>(false);
  const [touchCoordinates, setTouchCoordinates] = useState<{ x: number; y: number } | null>(null);

  const sessionActive = telemetry?.sessionActive ?? true;

  // Stream jitter and input streamer simulation
  useEffect(() => {
    if (!sessionActive) return;
    const interval = setInterval(() => {
      const fpsJitter = (Math.random() * 4 - 2);
      setSimulatedStreamFps(Math.round(targetFps + fpsJitter));

      const latencyJitter = (Math.random() * 2 - 1);
      setSimulatedLatency(Number((21.5 + latencyJitter).toFixed(1)));

      setSimulatedInputCount(prev => prev + Math.floor(Math.random() * 5));
    }, 800);
    return () => clearInterval(interval);
  }, [sessionActive, targetFps]);

  const handlePhoneTouch = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sessionActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setTouchCoordinates({ x, y });
    setIsSimulatingTouch(true);
    setSimulatedInputCount(prev => prev + 1);
    setTimeout(() => setIsSimulatingTouch(false), 300);
  };

  return (
    <div className="space-[#0f172a] text-slate-100 py-6">
      {/* Top Banner / System Architecture Context */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>SOVEREIGN THIN-CLIENT TERMINAL SIMULATOR</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
              Zero-Storage Phone Terminal
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
              The phone hardware executes zero application logic and stores zero data locally. It functions purely as a low-power <strong className="text-slate-200">Display Receiver</strong> & <strong className="text-slate-200">Input Streamer</strong> connected via LEO satellite backhaul to the Sovereign Linux Cloud OS.
            </p>
          </div>

          {/* Quick Terminal Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 text-xs font-mono">
            <div>
              <div className="text-slate-400 text-[11px]">Storage Footprint</div>
              <div className="text-emerald-400 font-bold text-sm flex items-center gap-1 mt-0.5">
                <Shield className="w-3.5 h-3.5" /> 0.00 KB (Zero)
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Target Latency</div>
              <div className="text-amber-400 font-bold text-sm mt-0.5">
                {simulatedLatency} ms (&lt;40ms)
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Battery Runtime</div>
              <div className="text-indigo-400 font-bold text-sm mt-0.5">
                3.5x Extended
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Phone Frame & Interactive Display Stream */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl relative">
            
            {/* Phone Hardware Border */}
            <div className="relative mx-auto w-full max-w-[340px] aspect-[9/19.5] bg-slate-950 rounded-[44px] p-3 border-4 border-slate-800 shadow-2xl overflow-hidden flex flex-col justify-between select-none">
              
              {/* Phone Notch / Camera Hole */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-900 rounded-full z-30 flex items-center justify-center space-x-2 border border-slate-800">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
              </div>

              {/* Status Bar */}
              <div className="pt-2 px-6 flex justify-between items-center text-[11px] font-mono text-slate-300 z-20">
                <span>04:56</span>
                <div className="flex items-center space-x-2">
                  <span className="text-[9px] text-amber-400 font-bold px-1 bg-amber-500/10 rounded border border-amber-500/20">
                    DRAGON 9
                  </span>
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>

              {/* Phone Display Screen Area */}
              <div 
                onClick={handlePhoneTouch}
                className={`relative flex-1 my-3 rounded-[32px] overflow-hidden bg-slate-900 border border-slate-800 cursor-crosshair transition-all ${
                  !sessionActive ? 'bg-slate-950 opacity-90' : ''
                }`}
              >
                {/* Active Session Content */}
                {sessionActive ? (
                  <div className="w-full h-full relative flex flex-col justify-between p-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
                    
                    {/* Stream Latency HUD Overlay */}
                    <div className="flex justify-between items-center bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 text-[10px] font-mono text-slate-300 z-10">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-emerald-400 font-bold">{selectedCodec}</span>
                      </div>
                      <div className="text-amber-400 font-bold">
                        {simulatedStreamFps} FPS • {simulatedLatency}ms
                      </div>
                    </div>

                    {/* Touch Ripple Visual Indicator */}
                    {touchCoordinates && (
                      <div 
                        className="absolute w-12 h-12 rounded-full border-2 border-amber-400 bg-amber-400/20 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-ping z-20"
                        style={{ left: touchCoordinates.x, top: touchCoordinates.y }}
                      />
                    )}

                    {/* Container App Viewport */}
                    <div className="flex-1 my-4 bg-slate-950/90 rounded-2xl border border-slate-800/80 p-3 flex flex-col justify-between relative overflow-hidden group">
                      
                      {activeContainerApp === 'waydroid' && (
                        <div className="h-full flex flex-col justify-between">
                          <div className="flex justify-between items-center text-xs font-mono border-b border-slate-800/80 pb-2">
                            <span className="text-slate-300 font-bold flex items-center gap-1.5">
                              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                              Waydroid Android 14 OS
                            </span>
                            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                              Cloud Instance
                            </span>
                          </div>

                          <div className="my-auto space-y-2">
                            <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-xs">
                              <div className="text-amber-400 font-mono font-bold text-[11px]">Sovereign App Execution</div>
                              <p className="text-slate-400 text-[11px] mt-0.5">
                                App code executes in cloud container. Only video frames returned.
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-slate-900/80 p-2 rounded-lg text-[10px] font-mono">
                                <span className="text-slate-400">RAM Allocation:</span>
                                <div className="text-slate-200 font-bold">1,840 MB (Cloud)</div>
                              </div>
                              <div className="bg-slate-900/80 p-2 rounded-lg text-[10px] font-mono">
                                <span className="text-slate-400">Local Flash Use:</span>
                                <div className="text-emerald-400 font-bold">0.00 Bytes</div>
                              </div>
                            </div>
                          </div>

                          <div className="text-[10px] font-mono text-center text-slate-500">
                            Tap anywhere to stream input events upstream
                          </div>
                        </div>
                      )}

                      {activeContainerApp === 'workspace' && (
                        <div className="h-full flex flex-col justify-between">
                          <div className="flex justify-between items-center text-xs font-mono border-b border-slate-800/80 pb-2">
                            <span className="text-slate-300 font-bold flex items-center gap-1.5">
                              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                              Linux Desktop Workspace
                            </span>
                            <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                              Wayland
                            </span>
                          </div>

                          <div className="my-auto p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1.5">
                            <div className="text-emerald-400">$ dragon9-cloud-os --status</div>
                            <div className="text-slate-300 text-[10px]">[OK] Zero-Trust session active</div>
                            <div className="text-slate-300 text-[10px]">[OK] LEO satellite backhaul &lt;24ms</div>
                            <div className="text-slate-300 text-[10px]">[OK] PTP timing sync locked</div>
                          </div>

                          <div className="text-[10px] font-mono text-center text-slate-500">
                            Fluid Motion Wayland Desktop Streamer
                          </div>
                        </div>
                      )}

                      {activeContainerApp === 'media' && (
                        <div className="h-full flex flex-col justify-between">
                          <div className="flex justify-between items-center text-xs font-mono border-b border-slate-800/80 pb-2">
                            <span className="text-slate-300 font-bold flex items-center gap-1.5">
                              <Play className="w-3.5 h-3.5 text-red-400" />
                              Fluid Motion Engine
                            </span>
                            <span className="text-[10px] text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">
                              4K 120Hz AV1
                            </span>
                          </div>

                          <div className="my-auto flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-amber-500/10 to-red-500/10 rounded-xl border border-amber-500/20">
                            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mb-2 border border-amber-500/30">
                              <Volume2 className="w-6 h-6" />
                            </div>
                            <div className="text-xs font-bold text-white font-mono">Zero-Latency Media Sync</div>
                            <p className="text-[10px] text-slate-400 text-center mt-1">
                              Hardware AV1 video decoder active on thin terminal
                            </p>
                          </div>

                          <div className="text-[10px] font-mono text-center text-slate-500">
                            Power usage: 1.4W (Hardware decode only)
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Navigation Control Bar inside Phone */}
                    <div className="flex justify-around items-center bg-slate-950/90 py-2 rounded-2xl border border-slate-800 text-[11px] font-mono">
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveContainerApp('waydroid'); }}
                        className={`px-2 py-1 rounded-lg ${activeContainerApp === 'waydroid' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400'}`}
                      >
                        Waydroid
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveContainerApp('workspace'); }}
                        className={`px-2 py-1 rounded-lg ${activeContainerApp === 'workspace' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-400'}`}
                      >
                        Linux
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveContainerApp('media'); }}
                        className={`px-2 py-1 rounded-lg ${activeContainerApp === 'media' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-slate-400'}`}
                      >
                        Media
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Revoked Session Display */
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-950">
                    <div className="w-14 h-14 rounded-full bg-red-950/80 border border-red-800 flex items-center justify-center mb-3">
                      <Lock className="w-7 h-7 text-red-400" />
                    </div>
                    <h3 className="text-base font-bold text-red-400 font-mono">SESSION REVOKED</h3>
                    <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
                      Zero data remains on this terminal. All memory buffers purged. Re-authenticate via Dragon 9 Sovereign Handshake.
                    </p>
                    <button
                      onClick={onReconnectSession}
                      className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs font-mono transition-colors"
                    >
                      RESTORE SOVEREIGN LINK
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Phone Speaker / Mic Bar */}
              <div className="pb-1 text-center text-[10px] font-mono text-slate-600 tracking-widest">
                DRAGON 9 THIN TERMINAL
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Display Receiver & Input Streamer Performance Dash */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Display Receiver Configuration */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Monitor className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white font-mono text-sm">Display Receiver Controls</h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Hardware Decoder Active
              </span>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1.5">Stream Video Codec Pipeline:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedCodec('AV1 Hardware')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedCodec === 'AV1 Hardware'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>AV1 Hardware</div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">Ultra compression • Low power</div>
                  </button>

                  <button
                    onClick={() => setSelectedCodec('H.265 ULL')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedCodec === 'H.265 ULL'
                        ? 'bg-amber-500/10 border-amber-500 text-amber-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>H.265 Ultra-Low Latency</div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">&lt;15ms frame decode time</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1.5">Target Frame Rate & Sync:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTargetFps(120)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      targetFps === 120
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    120 FPS Fluid Motion
                  </button>
                  <button
                    onClick={() => setTargetFps(60)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      targetFps === 60
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    60 FPS Eco Sync
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Upstream Input Streamer Telemetry */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white font-mono text-sm">Upstream Input Streamer</h3>
              </div>
              <span className="text-[11px] font-mono text-indigo-400">
                1000Hz Polling Rate
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[11px]">Streamed Input Events</div>
                <div className="text-lg font-bold text-indigo-300 mt-1">
                  {simulatedInputCount.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Touch, Gyro, Mic, Keys</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[11px]">Input Event Status</div>
                <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1">
                  {isSimulatingTouch ? (
                    <span className="text-amber-400 animate-bounce">STREAMING TOUCH...</span>
                  ) : (
                    <span>ACTIVE POLLING</span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">&lt;2.1ms Touch-to-Cloud</div>
              </div>
            </div>
          </div>

          {/* Power Efficiency Comparison Gauge */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <BatteryCharging className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white font-mono text-sm">Power Efficiency Pillar</h3>
              </div>
              <span className="text-xs font-bold text-emerald-400 font-mono">3.5x Battery Boost</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Dragon 9 Thin Terminal:</span>
                  <span className="text-emerald-400 font-bold">1.4 Watts</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[17%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Traditional Flagship ($1,000+ local SoC):</span>
                  <span className="text-red-400 font-bold">8.2 Watts</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full w-[100%]" />
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-2 font-sans leading-relaxed bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                Heavy CPU/GPU drain is offloaded entirely to the sovereign cloud server node. Thin-client hardware only decodes incoming video stream.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
