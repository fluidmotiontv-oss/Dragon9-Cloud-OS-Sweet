import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, Radio, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { TelemetryData } from '../types';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  telemetry: TelemetryData | null;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  source?: string;
  timestamp: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  telemetry
}) => {
  const [prompt, setPrompt] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: 'Greetings. I am the Dragon 9 Sovereign AI Infrastructure Inspector. I monitor LEO satellite backhaul telemetry, Waydroid cloud OS containers, PTP timing sync, and zero-trust security parameters. How may I assist your engineering trial today?',
      source: 'gemini-3.6-flash',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSendPrompt = async (queryText?: string) => {
    const textToSend = queryText || prompt;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setPrompt('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/dragon9/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          context: telemetry
        })
      });

      const data = await res.json();
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.answer || 'No response generated.',
        source: data.source || 'gemini-3.6-flash',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Failed to contact Dragon 9 AI Engine. Please check server logs.',
          source: 'error',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white font-mono text-sm">Dragon 9 AI Inspector</h3>
              <p className="text-[10px] text-slate-400 font-mono">Gemini 3.6 Flash Server Assistant</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="p-3 bg-slate-950/80 border-b border-slate-800/80 overflow-x-auto flex space-x-2 no-scrollbar">
          <button
            onClick={() => handleSendPrompt("Analyze LEO Satellite backhaul latency vs target <40ms benchmark.")}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-mono text-slate-300"
          >
            🛰️ Satellite Latency Analysis
          </button>
          <button
            onClick={() => handleSendPrompt("Evaluate Waydroid Android 14 container performance & Wayland graphics.")}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-mono text-slate-300"
          >
            📱 Waydroid OS Status
          </button>
          <button
            onClick={() => handleSendPrompt("Review zero-trust remote session revocation and lost phone security.")}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-mono text-slate-300"
          >
            🔒 Zero-Trust Revocation Audit
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center space-x-1.5 mb-1 text-[10px] font-mono text-slate-500">
                <span>{msg.sender === 'user' ? 'Operator' : 'Dragon 9 AI'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
                {msg.source && (
                  <span className="text-amber-400 font-bold bg-amber-500/10 px-1 rounded border border-amber-500/20">
                    {msg.source}
                  </span>
                )}
              </div>

              <div
                className={`p-3.5 rounded-2xl max-w-[90%] leading-relaxed whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-semibold rounded-tr-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 font-mono rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-indigo-400 font-mono text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Dragon 9 AI is analyzing telemetry & running reasoning pipeline...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-800 bg-slate-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask AI Inspector about backhaul, Waydroid, or SIP..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
