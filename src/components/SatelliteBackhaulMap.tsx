import React, { useState } from 'react';
import { Radio, Wifi, Globe, Server, Zap, ArrowRightLeft, ShieldCheck, Activity, BarChart2, CheckCircle2 } from 'lucide-react';
import { TelemetryData } from '../types';

interface SatelliteBackhaulMapProps {
  telemetry: TelemetryData | null;
  onFailoverSatellite: (targetNode: string) => void;
}

export const SatelliteBackhaulMap: React.FC<SatelliteBackhaulMapProps> = ({
  telemetry,
  onFailoverSatellite
}) => {
  const [selectedNode, setSelectedNode] = useState<string>('STARLINK-ENT-LEO-8422');
  const [isHandoverLoading, setIsHandoverLoading] = useState<boolean>(false);

  const satellites = telemetry?.satellites || [
    { name: "STARLINK-ENT-LEO-8422", elevation: "78°", latencyMs: 22.4, rssiDbm: -68, bandwidthMbps: 340, status: "ACTIVE_LINK" },
    { name: "STARLINK-ENT-LEO-9104", elevation: "62°", latencyMs: 28.1, rssiDbm: -72, bandwidthMbps: 310, status: "STANDBY" },
    { name: "KITE-RIDER-BALLOON-003", elevation: "88°", latencyMs: 14.8, rssiDbm: -54, bandwidthMbps: 450, status: "STANDBY" },
    { name: "GCP-SOVEREIGN-RELAY-01", elevation: "Ground VPS", latencyMs: 8.2, rssiDbm: -42, bandwidthMbps: 1000, status: "STANDBY" }
  ];

  const activeSatNode = telemetry?.activeSatNode || "STARLINK-ENT-LEO-8422";

  const handleTriggerHandover = (nodeName: string) => {
    setIsHandoverLoading(true);
    onFailoverSatellite(nodeName);
    setTimeout(() => {
      setIsHandoverLoading(false);
    }, 600);
  };

  return (
    <div className="space-y-6 py-6 text-slate-100 font-sans">
      
      {/* Title & Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold mb-3">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>DECENTRALIZED BACKHAUL TOPOLOGY</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white font-mono tracking-tight">
              Kite Rider & LEO Satellite Backhaul Network
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Real-time packet streaming synchronization between thin terminals, LEO satellite constellations (Starlink Enterprise / Direct-to-Cellular), Kite Rider high-altitude relays, and Sovereign Linux Cloud nodes.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-right font-mono">
            <div className="text-xs text-slate-400">LATENCY BENCHMARK</div>
            <div className="text-2xl font-black text-emerald-400">&lt; 40ms Target</div>
            <div className="text-[11px] text-slate-500">Live active RTT: 22.4ms</div>
          </div>
        </div>
      </div>

      {/* Network Topology Visual Diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
        <h3 className="text-sm font-bold text-white font-mono mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4 text-amber-400" />
          Live Sovereign Backhaul Topology Map
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          
          {/* Node 1: Thin Terminal */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between relative group hover:border-amber-500/50 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                ENDPOINT
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="my-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 mb-2">
                <Radio className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-white font-mono">Thin Client Terminal</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Zero Storage Display Receiver</div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-400 flex justify-between">
              <span>Upstream: 1.2 Mbps</span>
              <span>Downstream: 18.5 Mbps</span>
            </div>
          </div>

          {/* Node 2: Kite Rider Relay */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between relative group hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                ATMOSPHERIC RELAY
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">14.8ms</span>
            </div>

            <div className="my-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 mb-2">
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-white font-mono">Kite Rider High-Altitude</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Meshed Air-to-Air Node</div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-400 flex justify-between">
              <span>Elevation: 88°</span>
              <span>RSSI: -54 dBm</span>
            </div>
          </div>

          {/* Node 3: Starlink LEO Satellite */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between relative group hover:border-indigo-500/50 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/50">
                LEO SATELLITE
              </span>
              <span className="text-[10px] text-indigo-400 font-mono">22.4ms</span>
            </div>

            <div className="my-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400 mb-2">
                <Globe className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-white font-mono">Starlink Enterprise LEO</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Direct-to-Cellular Backhaul</div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-400 flex justify-between">
              <span>Doppler Track: -1.2kHz</span>
              <span>Bandwidth: 340 Mbps</span>
            </div>
          </div>

          {/* Node 4: Sovereign Linux Cloud VPS */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between relative group hover:border-red-500/50 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/50">
                SOVEREIGN VPS
              </span>
              <span className="text-[10px] text-red-400 font-mono">8.2ms</span>
            </div>

            <div className="my-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400 mb-2">
                <Server className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-white font-mono">Dragon 9 Sovereign Server</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Waydroid & SIP Container Host</div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-400 flex justify-between">
              <span>Zero-Trust Vault</span>
              <span>PTP Sync Locked</span>
            </div>
          </div>

        </div>
      </div>

      {/* Satellite Node Selection & Handover Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Active Node Cards */}
        <div className="lg:col-span-8 space-y-3">
          <h3 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider">
            Available Satellite & Atmospheric Nodes:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {satellites.map((sat) => {
              const isActive = activeSatNode === sat.name;
              return (
                <div
                  key={sat.name}
                  onClick={() => setSelectedNode(sat.name)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-500/5'
                      : selectedNode === sat.name
                      ? 'bg-slate-900 border-amber-500/50'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono font-bold text-xs text-white">
                      {sat.name}
                    </span>
                    {isActive ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>ACTIVE LINK</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        STANDBY
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-slate-400 mt-3 bg-slate-950 p-2 rounded-lg">
                    <div>
                      <div className="text-[9px] text-slate-500">LATENCY</div>
                      <div className="text-emerald-400 font-bold">{sat.latencyMs} ms</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-500">ELEVATION</div>
                      <div className="text-slate-200">{sat.elevation}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-500">BANDWIDTH</div>
                      <div className="text-slate-200">{sat.bandwidthMbps} Mbps</div>
                    </div>
                  </div>

                  {!isActive && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTriggerHandover(sat.name);
                      }}
                      disabled={isHandoverLoading}
                      className="mt-3 w-full py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      <span>Trigger Handover to Node</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Detailed Telemetry */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 font-mono text-xs space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h4 className="font-bold text-white text-sm">Node Telemetry Inspector</h4>
            <p className="text-[11px] text-slate-400">{selectedNode}</p>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 text-[10px]">PTP GRANDMASTER TIMING ACCURACY</div>
              <div className="text-amber-400 font-bold text-sm mt-0.5">0.14 µs Sub-Microsecond Sync</div>
              <p className="text-[10px] text-slate-500 mt-1">Prevents display frame tearing on thin terminal.</p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 text-[10px]">DOPPLER SHIFT COMPENSATION</div>
              <div className="text-emerald-400 font-bold text-sm mt-0.5">Active Carrier Phase Locked</div>
              <p className="text-[10px] text-slate-500 mt-1">Sustains link stability at satellite speed of ~7.8 km/s.</p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 text-[10px]">ZERO-TRUST ENCRYPTION</div>
              <div className="text-indigo-400 font-bold text-sm mt-0.5">ChaCha20-Poly1305 Stream</div>
              <p className="text-[10px] text-slate-500 mt-1">End-to-end payload protection over LEO link.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
