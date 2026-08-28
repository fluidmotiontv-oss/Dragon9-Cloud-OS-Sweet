import React from 'react';
import { Shield, Smartphone, DollarSign, Zap, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { ComparisonPillar } from '../types';

export const PillarComparison: React.FC = () => {
  const pillars: ComparisonPillar[] = [
    {
      title: "Data Sovereignty",
      traditional: "Data stored locally & synced to commercial third-party clouds",
      dragon9: "100% Private; zero data on phone endpoint",
      iconName: "Shield",
      advantage: "Complete ownership & zero local footprint"
    },
    {
      title: "Hardware Cost",
      traditional: "Requires $1,000+ flagship local silicon processors",
      dragon9: "Low-Cost Terminals; all processing handled in sovereign cloud",
      iconName: "DollarSign",
      advantage: "Radically reduced endpoint hardware expenses"
    },
    {
      title: "Security Profile",
      traditional: "High vulnerability & physical extraction risks if lost/stolen",
      dragon9: "Zero Compromise; instant session revocation & remote wipe",
      iconName: "Smartphone",
      advantage: "Zero-Knowledge loss protection"
    },
    {
      title: "Power Efficiency",
      traditional: "Heavy CPU/GPU battery drain from demanding local applications",
      dragon9: "Extended Battery Life; hardware decodes video stream only",
      iconName: "Zap",
      advantage: "3.5x extended operational battery life"
    }
  ];

  return (
    <div className="space-y-6 py-6 text-slate-100 font-sans">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>ARCHITECTURAL ADVANTAGE MATRIX</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white font-mono tracking-tight">
            Traditional Mobile vs Dragon 9 Sovereign Model
          </h2>
          <p className="text-slate-400 text-sm mt-1 leading-relaxed">
            Comparing legacy edge-heavy smartphones against Dragon 9's decentralized thin-client cloud architecture.
          </p>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="space-y-4">
        {pillars.map((pillar, idx) => (
          <div
            key={pillar.title}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-slate-700 transition-all"
          >
            <div className="flex items-center space-x-3 mb-4">
              <span className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold text-xs flex items-center justify-center">
                0{idx + 1}
              </span>
              <h3 className="text-base font-bold text-white font-mono">{pillar.title}</h3>
              <span className="ml-auto text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                {pillar.advantage}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              {/* Traditional Mobile */}
              <div className="bg-slate-950 p-4 rounded-xl border border-red-950/60 relative">
                <div className="flex items-center space-x-2 text-red-400 font-bold mb-2">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>TRADITIONAL MOBILE ARCHITECTURE</span>
                </div>
                <p className="text-slate-400 leading-relaxed font-sans text-xs">
                  {pillar.traditional}
                </p>
              </div>

              {/* Dragon 9 Sovereign Model */}
              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/60 relative">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold mb-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>DRAGON 9 SOVEREIGN MODEL</span>
                </div>
                <p className="text-slate-200 font-semibold leading-relaxed font-sans text-xs">
                  {pillar.dragon9}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
