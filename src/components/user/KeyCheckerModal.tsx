import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Search,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Clock,
  Smartphone,
  Key,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { LicenseKey, PanelItem } from '../../types';

interface KeyCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyCheckerModal: React.FC<KeyCheckerModalProps> = ({ isOpen, onClose }) => {
  const { validateKey, resetHWID } = useStore();
  const [inputKey, setInputKey] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [result, setResult] = useState<{
    found: boolean;
    key?: LicenseKey;
    panel?: PanelItem;
    error?: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) return;

    const res = validateKey(inputKey);
    setResult(res);
    setHasSearched(true);
  };

  const handleResetHWIDFromChecker = (keyId: string) => {
    resetHWID(keyId);
    // Refresh check view
    const res = validateKey(inputKey);
    setResult(res);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#101625] border border-[#243352] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl relative my-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#141d30] to-[#111726] border-b border-[#243352] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-gaming tracking-wide">
                License Key & HWID Validator
              </h2>
              <p className="text-xs text-slate-400">
                Check subscription validity, expiration date, and bound device status
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#18233a] hover:bg-[#23314f] text-slate-300 flex items-center justify-center border border-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input Form */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleCheck} className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              Enter License Key:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="e.g. APEX-VIP-OB46-9921-X9K2"
                  value={inputKey}
                  onChange={(e) => {
                    setInputKey(e.target.value);
                    setHasSearched(false);
                  }}
                  className="w-full bg-[#0c101b] border border-[#243352] rounded-xl px-4 py-2.5 text-sm text-amber-300 font-mono focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 uppercase placeholder:text-slate-600"
                />
              </div>
              <button
                type="submit"
                disabled={!inputKey.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 disabled:opacity-50"
              >
                <Search className="w-4 h-4" />
                Check Key
              </button>
            </div>
          </form>

          {/* Result Card */}
          {hasSearched && result && (
            <div className="animate-in fade-in duration-200">
              {result.found && result.key ? (
                <div className="bg-[#151c2e] border border-emerald-500/40 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span className="font-extrabold text-white text-base font-gaming">
                        Valid VIP License
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
                        result.key.status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : result.key.status === 'unused'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                          : 'bg-red-500/20 text-red-400 border border-red-500/40'
                      }`}
                    >
                      {result.key.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs border-t border-[#232f49] pt-3">
                    <div className="flex justify-between py-1 border-b border-[#1c263d]">
                      <span className="text-slate-400">Target Panel:</span>
                      <strong className="text-white">{result.key.panelName}</strong>
                    </div>

                    <div className="flex justify-between py-1 border-b border-[#1c263d]">
                      <span className="text-slate-400">Plan Duration:</span>
                      <span className="text-amber-400 font-bold uppercase">{result.key.duration}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-[#1c263d]">
                      <span className="text-slate-400">Expires At:</span>
                      <span className="text-slate-200 font-mono">
                        {result.key.expiresAt ? new Date(result.key.expiresAt).toLocaleString() : 'Lifetime (Permanent)'}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-[#1c263d]">
                      <span className="text-slate-400">Locked Device HWID:</span>
                      <span className="text-slate-200 font-mono">
                        {result.key.hwid || 'None (Locks on 1st login)'}
                      </span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">HWID Resets Remaining:</span>
                      <strong className="text-amber-400">{result.key.hwidResetsLeft}/3</strong>
                    </div>
                  </div>

                  {result.key.hwid && (
                    <button
                      onClick={() => handleResetHWIDFromChecker(result.key!.id)}
                      disabled={result.key.hwidResetsLeft <= 0}
                      className="w-full py-2 px-3 rounded-lg bg-[#1f2b45] hover:bg-[#28385b] text-amber-400 text-xs font-bold border border-amber-500/30 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Reset HWID Binding for this Key
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-[#18151e] border border-red-500/40 rounded-xl p-5 text-center space-y-2">
                  <XCircle className="w-8 h-8 text-red-400 mx-auto" />
                  <h4 className="font-bold text-white text-sm">Key Not Found or Invalid</h4>
                  <p className="text-xs text-slate-400">
                    {result.error || 'The entered license key does not exist or has expired.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
