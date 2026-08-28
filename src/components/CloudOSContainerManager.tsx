import React, { useState } from 'react';
import { Cpu, Smartphone, Play, RefreshCw, Server, Layers, Zap, Terminal, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { TelemetryData, WaydroidInstance } from '../types';

interface CloudOSContainerManagerProps {
  telemetry: TelemetryData | null;
  onRestartWaydroid: (instanceId: string) => void;
}

export const CloudOSContainerManager: React.FC<CloudOSContainerManagerProps> = ({
  telemetry,
  onRestartWaydroid
}) => {
  const [selectedInstanceId, setSelectedInstanceId] = useState<string>('wd-01');

  const instances = telemetry?.waydroidInstances || [
    { id: "wd-01", name: "Fluid Motion Phone OS (Android 14 Waydroid)", status: "running", fps: 120, codec: "AV1 Hardware Decode", bitrateMbps: 18.5, latencyMs: 22, memoryMb: 1840 },
    { id: "wd-02", name: "Sovereign Linux Workspace Container", status: "running", fps: 60, codec: "H.265 Ultra Low Latency", bitrateMbps: 12.2, latencyMs: 24, memoryMb: 1210 },
    { id: "wd-03", name: "SIP Telephony / Encrypted Baseband Daemon", status: "running", fps: 0, codec: "OPUS Direct SIP", bitrateMbps: 0.12, latencyMs: 14, memoryMb: 240 }
  ];

  const selectedInst = instances.find(i => i.id === selectedInstanceId) || instances[0];

  return (
    <div className="space-y-6 py-6 text-slate-100 font-sans">
      
      {/* Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-semibold mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>SOVEREIGN CLOUD OS ENGINE</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white font-mono tracking-tight">
              Linux Server & Waydroid Container Suite
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              All applications execute inside LXC / Waydroid isolated container namespaces on the sovereign Linux cloud server. Zero application binaries or binary state are pushed to thin client devices.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-right">
            <div className="text-xs text-slate-400">HOST KERNEL</div>
            <div className="text-sm font-bold text-indigo-300">Linux 6.8.0-Sovereign-D9</div>
            <div className="text-[11px] text-emerald-400 font-bold mt-1">3 Containers Running</div>
          </div>
        </div>
      </div>

      {/* Container Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {instances.map((inst) => (
          <div
            key={inst.id}
            onClick={() => setSelectedInstanceId(inst.id)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              selectedInstanceId === inst.id
                ? 'bg-indigo-950/40 border-indigo-500 shadow-xl shadow-indigo-500/5'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white font-mono text-xs leading-snug">
                    {inst.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">{inst.id}</span>
                </div>
              </div>

              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                inst.status === 'running'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
              }`}>
                {inst.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 mt-2">
              <div>
                <span className="text-slate-500 text-[10px]">FPS / CODEC</span>
                <div className="text-slate-200 font-bold text-[11px]">{inst.fps} FPS</div>
              </div>
              <div>
                <span className="text-slate-500 text-[10px]">MEMORY</span>
                <div className="text-slate-200 font-bold text-[11px]">{inst.memoryMb} MB</div>
              </div>
              <div className="col-span-2 pt-1 border-t border-slate-900 flex justify-between text-[10px] text-slate-400">
                <span>Bitrate: {inst.bitrateMbps} Mbps</span>
                <span>Latency: {inst.latencyMs} ms</span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onRestartWaydroid(inst.id);
              }}
              className="mt-3 w-full py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-mono text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Restart Container Instance</span>
            </button>
          </div>
        ))}
      </div>

      {/* Selected Container Inspector & Wayland Graphics Pipeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-4">
          <div>
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              Container Process Inspector & Wayland Compositor
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Active Target: {selectedInst.name} ({selectedInst.id})
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
              Renderer: <strong className="text-amber-400">Mesa Vulkan Waydroid</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-slate-400 text-[11px] mb-1">STREAMING ENCODER PIPELINE</div>
            <div className="text-emerald-400 font-bold text-sm">{selectedInst.codec}</div>
            <p className="text-slate-500 text-[10px] mt-2 leading-relaxed">
              Real-time hardware encoding offloaded to GPU encoder blocks. Frames pushed via PTP-synchronized timestamps directly to Satellite Backhaul buffer.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-slate-400 text-[11px] mb-1">MEMORY & CONTAINER ISOLATION</div>
            <div className="text-indigo-400 font-bold text-sm">{selectedInst.memoryMb} MB Allocated</div>
            <p className="text-slate-500 text-[10px] mt-2 leading-relaxed">
              Strict cgroups & namespaces prevent inter-container leakage. Zero-knowledge cryptographic storage mounts.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-slate-400 text-[11px] mb-1">WAYLAND FRAME TIMING</div>
            <div className="text-amber-400 font-bold text-sm">Target {selectedInst.fps} FPS Sync</div>
            <p className="text-slate-500 text-[10px] mt-2 leading-relaxed">
              Sub-millisecond compositor frame intervals ensure fluid touch interaction on thin-client endpoints.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
