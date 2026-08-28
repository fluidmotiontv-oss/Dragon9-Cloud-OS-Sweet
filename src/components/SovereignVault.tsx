import React, { useState } from 'react';
import { Lock, Shield, FileText, Trash2, Key, AlertTriangle, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { TelemetryData, VaultFile } from '../types';

interface SovereignVaultProps {
  telemetry: TelemetryData | null;
  onWipeVault: () => void;
}

export const SovereignVault: React.FC<SovereignVaultProps> = ({
  telemetry,
  onWipeVault
}) => {
  const [showWipeConfirm, setShowWipeConfirm] = useState<boolean>(false);

  const files = telemetry?.vaultEncryptedFiles || [
    { id: "f-101", name: "Sovereign_Identity_Key_v9.pem", size: "4.2 KB", encrypted: true, location: "Dragon 9 Sovereign Cloud Vault (Zero Local Copy)" },
    { id: "f-102", name: "Kite_Rider_LEO_Backhaul_Cert.crt", size: "12.8 KB", encrypted: true, location: "Dragon 9 Sovereign Cloud Vault (Zero Local Copy)" },
    { id: "f-103", name: "SIP_Trunk_Direct_Dial_Config.json", size: "8.1 KB", encrypted: true, location: "Dragon 9 Sovereign Cloud Vault (Zero Local Copy)" },
    { id: "f-104", name: "Fluid_Motion_Media_Stream_Cache.raw", size: "1.2 GB", encrypted: true, location: "Dragon 9 Sovereign Cloud Vault (Zero Local Copy)" }
  ];

  const handleWipe = () => {
    onWipeVault();
    setShowWipeConfirm(false);
  };

  return (
    <div className="space-y-6 py-6 text-slate-100 font-sans">
      
      {/* Vault Title Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-semibold mb-3">
              <Lock className="w-3.5 h-3.5" />
              <span>SOVEREIGN STORAGE & CRYPTOGRAPHIC VAULT</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white font-mono tracking-tight">
              Zero-Knowledge Cloud Vault
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              100% Data Sovereignty. User keys and files remain strictly hosted inside the encrypted sovereign cloud cluster. Zero data or cryptographic keys are written to the thin-client phone terminal.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-right font-mono">
            <div className="text-xs text-slate-400">PHONE ENDPOINT FOOTPRINT</div>
            <div className="text-2xl font-black text-emerald-400">0.00 Bytes</div>
            <div className="text-[11px] text-slate-500">Zero-Storage Verified</div>
          </div>
        </div>
      </div>

      {/* Security Verification & Emergency Wipe Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* File Browser Area */}
        <div className="md:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white font-mono text-sm flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" />
              Encrypted Cloud Storage Items ({files.length})
            </h3>
            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
              AES-256-GCM / Zero-Knowledge
            </span>
          </div>

          {files.length > 0 ? (
            <div className="space-y-3 font-mono text-xs">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-200 text-xs">{file.name}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{file.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-right">
                    <span className="text-slate-400 text-[11px]">{file.size}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" />
                      ENCRYPTED
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-400">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              Vault purged. Cryptographic keys shredded. Zero data stored anywhere.
            </div>
          )}
        </div>

        {/* Emergency Cryptographic Wipe Panel */}
        <div className="md:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between font-mono text-xs">
          <div>
            <div className="flex items-center space-x-2 text-red-400 font-bold text-sm mb-3">
              <AlertTriangle className="w-5 h-5" />
              <span>Emergency Key Shredder</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              If a thin terminal phone is lost, stolen, or physically compromised, trigger instant cryptographic key revocation. Because zero data exists on the phone, data leakage risk is literally zero.
            </p>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-[11px] mb-4">
              <div className="flex justify-between text-slate-400">
                <span>Phone Memory:</span>
                <span className="text-emerald-400 font-bold">Unmodified</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Revocation Delay:</span>
                <span className="text-amber-400 font-bold">&lt; 1 Millisecond</span>
              </div>
            </div>
          </div>

          <div>
            {!showWipeConfirm ? (
              <button
                onClick={() => setShowWipeConfirm(true)}
                className="w-full py-2.5 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-700/60 text-red-200 font-bold transition-all shadow-lg shadow-red-950/30 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
                <span>CRYPTOGRAPHIC VAULT SHRED</span>
              </button>
            ) : (
              <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-red-800">
                <div className="text-red-400 font-bold text-[11px]">Confirm Key Purge?</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleWipe}
                    className="py-1.5 rounded-lg bg-red-600 text-white font-bold hover:bg-red-500 transition-colors"
                  >
                    PURGE NOW
                  </button>
                  <button
                    onClick={() => setShowWipeConfirm(false)}
                    className="py-1.5 rounded-lg bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition-colors"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
