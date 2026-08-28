import React, { useState } from 'react';
import { Phone, PhoneCall, PhoneOff, Mic, MicOff, Shield, Radio, Volume2, UserCheck, CheckCircle2 } from 'lucide-react';

export const SipTelephonyDialer: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected'>('idle');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);

  const handleKeyPress = (digit: string) => {
    if (callState === 'connected') return;
    setPhoneNumber(prev => prev + digit);
  };

  const handleStartCall = () => {
    if (!phoneNumber) setPhoneNumber('+1 (800) 372-4669');
    setCallState('calling');
    setTimeout(() => {
      setCallState('connected');
    }, 1500);
  };

  const handleEndCall = () => {
    setCallState('idle');
    setPhoneNumber('');
    setCallDuration(0);
  };

  return (
    <div className="space-y-6 py-6 text-slate-100 font-sans">
      
      {/* Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold mb-3">
              <Phone className="w-3.5 h-3.5" />
              <span>DIRECT SIP CLOUD TELEPHONY</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white font-mono tracking-tight">
              Sovereign Cloud Baseband & SIP Dialer
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Voice communications run on the Sovereign Linux Server SIP daemon using OPUS codecs over encrypted TLS/SRTP. The thin phone terminal only receives decoded voice audio stream.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-right font-mono">
            <div className="text-xs text-slate-400">SIP TRUNK STATUS</div>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 justify-end">
              <CheckCircle2 className="w-4 h-4" />
              REGISTERED TLS/SRTP
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Dragon 9 SIP Daemon v4.1</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* SIP Dialer Interface */}
        <div className="md:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl mx-auto w-full max-w-sm">
          
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center mb-6 font-mono">
            <div className="text-[10px] text-slate-500 tracking-widest uppercase mb-1">
              {callState === 'idle' ? 'ENTER SIP NUMBER' : callState === 'calling' ? 'CONNECTING CLOUD SIP...' : 'ACTIVE ENCRYPTED SIP CALL'}
            </div>
            <div className="text-xl font-bold text-amber-400 min-h-[32px] flex items-center justify-center">
              {phoneNumber || <span className="text-slate-700">Dial Phone or SIP URI</span>}
            </div>
            {callState === 'connected' && (
              <div className="text-xs text-emerald-400 font-bold mt-1 flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>00:14 • OPUS 16kHz SRTP</span>
              </div>
            )}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-3 mb-6 font-mono">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
              <button
                key={digit}
                onClick={() => handleKeyPress(digit)}
                disabled={callState !== 'idle'}
                className="h-12 rounded-2xl bg-slate-950 hover:bg-slate-800/80 active:bg-amber-500/20 border border-slate-800/80 text-white font-bold text-lg transition-all flex items-center justify-center disabled:opacity-50"
              >
                {digit}
              </button>
            ))}
          </div>

          {/* Call Controls */}
          <div className="flex justify-center space-x-4 font-mono">
            {callState === 'idle' ? (
              <button
                onClick={handleStartCall}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-5 h-5" />
                <span>INITIATE SIP CALL</span>
              </button>
            ) : (
              <div className="w-full grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`py-3 rounded-2xl border font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                    isMuted ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-slate-950 text-slate-300 border-slate-800'
                  }`}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span>{isMuted ? 'MUTED' : 'MUTE MIC'}</span>
                </button>

                <button
                  onClick={handleEndCall}
                  className="py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/20"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>DISCONNECT</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* SIP Technical Details */}
        <div className="md:col-span-7 space-y-4 font-mono text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              Sovereign Baseband Architecture
            </h3>
            <p className="text-slate-400 leading-relaxed mb-4">
              Traditional smartphones contain proprietary closed-source baseband modem processors vulnerable to rogue cell-towers (IMSI catchers). Dragon 9 routes telephony through encrypted cloud SIP proxies, isolating the thin client from baseband exploit vectors.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px]">VOICE ENCRYPTION</div>
                <div className="text-emerald-400 font-bold mt-0.5">SRTP (AES-128 Counter)</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px]">SIGNALING PROTOCOL</div>
                <div className="text-indigo-400 font-bold mt-0.5">SIP Over TLS v1.3</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h4 className="font-bold text-white mb-2">Cloud Audio Buffer Metrics</h4>
            <div className="grid grid-cols-3 gap-2 text-[11px] bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500">Audio Codec:</span>
                <div className="text-slate-200 font-bold">OPUS High-Def</div>
              </div>
              <div>
                <span className="text-slate-500">Packet Jitter:</span>
                <div className="text-emerald-400 font-bold">0.8 ms</div>
              </div>
              <div>
                <span className="text-slate-500">MOS Score:</span>
                <div className="text-amber-400 font-bold">4.85 / 5.0</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
