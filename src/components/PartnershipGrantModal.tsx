import React, { useState } from 'react';
import { FileText, X, Check, Download, Send, Globe, Server, Radio, ShieldCheck } from 'lucide-react';

interface PartnershipGrantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnershipGrantModal: React.FC<PartnershipGrantModalProps> = ({
  isOpen,
  onClose
}) => {
  const [targetPartner, setTargetPartner] = useState<'gcp' | 'starlink' | 'vps'>('gcp');
  const [contactEmail, setContactEmail] = useState<string>('fluidmotiontv@gmail.com');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const exportDossierJSON = () => {
    const data = {
      project: "DRAGON 9 ICP / ISP",
      title: "Sovereign Cloud-Native Mobile Infrastructure & Thin-Client Suite",
      targetPartner,
      contactEmail,
      telemetryBenchmark: {
        latency: "<40ms Target LEO Satellite RTT",
        codecs: ["AV1 Hardware Decode", "H.265 Ultra-Low Latency"],
        framerate: "120 FPS Wayland Stream",
        powerSavings: "3.5x Extended Battery Lifetime (1.4W Display Receiver)"
      },
      submissionDraft: "Confidential Submission Draft for global deployment testing."
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Dragon9_Partnership_Grant_Dossier_${targetPartner.toUpperCase()}.json`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 relative overflow-hidden font-sans">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-white font-mono text-base">
              Partnership & Infrastructure Trial Configurator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            <p className="text-slate-300 font-sans leading-relaxed">
              Generate a formal Grant & Trial Access Dossier for Google Cloud Platform compute grants or Starlink Enterprise LEO satellite backhaul trial access.
            </p>

            <div>
              <label className="text-slate-400 block mb-2 font-bold">Select Trial / Grant Target:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTargetPartner('gcp')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    targetPartner === 'gcp'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <Server className="w-4 h-4 mb-1 text-amber-400" />
                  <div>GCP Compute Grant</div>
                  <div className="text-[10px] text-slate-500 font-normal">Cloud VPS Nodes</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTargetPartner('starlink')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    targetPartner === 'starlink'
                      ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <Radio className="w-4 h-4 mb-1 text-indigo-400" />
                  <div>Starlink Enterprise</div>
                  <div className="text-[10px] text-slate-500 font-normal">Cellular Backhaul</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTargetPartner('vps')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    targetPartner === 'vps'
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <Globe className="w-4 h-4 mb-1 text-emerald-400" />
                  <div>Sovereign Nodes</div>
                  <div className="text-[10px] text-slate-500 font-normal">Decentralized Mesh</div>
                </button>
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-bold">Contact Representative Email:</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                required
              />
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="text-amber-400 font-bold">ATTACHED BENCHMARKS IN DOSSIER:</div>
              <div>• Low-Latency Satellite Backhaul Benchmark: &lt;40ms</div>
              <div>• AV1 / H.265 120Hz Wayland Stream Receiver Specs</div>
              <div>• Zero-Storage Phone Terminal Security Profile</div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={exportDossierJSON}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Export Dossier (JSON)</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Generate Application</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 text-center space-y-4 font-mono">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Application Dossier Generated</h4>
            <p className="text-xs text-slate-300 font-sans">
              Dragon 9 ICP / ISP partnership request compiled for <strong className="text-amber-400 uppercase">{targetPartner}</strong>. Contact email: {contactEmail}.
            </p>
            <div className="pt-2 flex justify-center space-x-2">
              <button
                onClick={exportDossierJSON}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Download Technical Spec
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
