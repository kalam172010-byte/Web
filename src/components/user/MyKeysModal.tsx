import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Key,
  Copy,
  CheckCircle,
  RefreshCw,
  Download,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { LicenseKey } from '../../types';

interface MyKeysModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MyKeysModal: React.FC<MyKeysModalProps> = ({ isOpen, onClose }) => {
  const { user, licenseKeys, resetHWID, panels, showToast } = useStore();
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'all'>('active');

  if (!isOpen) return null;

  // Filter keys bound to current user or all active purchased
  const myKeys = licenseKeys.filter(
    k => k.boundUserEmail === user.email || k.customNote?.includes(user.username)
  );

  const displayKeys = activeTab === 'active' 
    ? myKeys.filter(k => k.status === 'active')
    : myKeys;

  const handleCopy = (key: LicenseKey) => {
    navigator.clipboard.writeText(key.key);
    setCopiedKeyId(key.id);
    setTimeout(() => setCopiedKeyId(null), 2500);
  };

  const calculateTimeRemaining = (expiresAt?: string) => {
    if (!expiresAt) return 'Lifetime VIP';
    const diff = new Date(expiresAt).getTime() - Date.now();
    if (diff <= 0) return 'Expired';
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h left`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#101625] border border-[#243352] rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#141d30] to-[#111726] border-b border-[#243352] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-gaming tracking-wide">
                My License Key Vault
              </h2>
              <p className="text-xs text-slate-400">
                Manage your active VIP subscriptions, HWID device binds & direct APK downloads
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

        {/* Filter Sub-nav */}
        <div className="px-6 pt-4 flex items-center justify-between gap-3 border-b border-[#1c263d] pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'active'
                  ? 'bg-amber-500 text-black'
                  : 'bg-[#182238] text-slate-300 hover:text-white'
              }`}
            >
              Active Subscriptions ({myKeys.filter(k => k.status === 'active').length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-amber-500 text-black'
                  : 'bg-[#182238] text-slate-300 hover:text-white'
              }`}
            >
              All Keys History ({myKeys.length})
            </button>
          </div>

          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Logged in as: <strong className="text-slate-200">{user.email}</strong>
          </span>
        </div>

        {/* Key Cards list */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {displayKeys.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#172033] flex items-center justify-center mx-auto text-slate-500">
                <Key className="w-6 h-6" />
              </div>
              <p className="text-slate-300 font-semibold text-sm">No license keys found</p>
              <p className="text-slate-500 text-xs">
                Unlock your first Free Fire VIP Panel key from the Store Catalog.
              </p>
            </div>
          ) : (
            displayKeys.map((key) => {
              const panel = panels.find(p => p.id === key.panelId);
              const timeLeft = calculateTimeRemaining(key.expiresAt);
              const isExpired = timeLeft === 'Expired';

              return (
                <div
                  key={key.id}
                  className="bg-[#151c2e] border border-[#24314c] rounded-xl p-4 space-y-3.5 hover:border-amber-500/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-base text-white font-gaming">
                          {key.panelName}
                        </h4>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            key.status === 'active' && !isExpired
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}
                        >
                          {key.status === 'active' && !isExpired ? 'Active' : 'Expired'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span>Duration: <strong className="text-amber-400">{key.duration.toUpperCase()}</strong></span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-300">
                          <Clock className="w-3 h-3 text-amber-400" />
                          {timeLeft}
                        </span>
                      </div>
                    </div>

                    {/* Direct APK Download button */}
                    {panel && (
                      <a
                        href={panel.downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="py-1.5 px-3 rounded-lg bg-[#1e2a42] hover:bg-[#283858] text-cyan-300 text-xs font-bold flex items-center gap-1.5 border border-[#31446a] self-start sm:self-auto transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download APK
                      </a>
                    )}
                  </div>

                  {/* Key Display & Copy */}
                  <div className="bg-[#0b0f19] border border-[#1f2a40] rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="font-mono text-sm font-bold text-amber-300 select-all break-all">
                      {key.key}
                    </div>

                    <button
                      onClick={() => handleCopy(key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 transition-colors ${
                        copiedKeyId === key.id
                          ? 'bg-emerald-500 text-black'
                          : 'bg-[#22304c] hover:bg-amber-500 hover:text-black text-slate-200'
                      }`}
                    >
                      {copiedKeyId === key.id ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Key
                        </>
                      )}
                    </button>
                  </div>

                  {/* Hardware ID (HWID) Bind details & Reset */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-400 border-t border-[#1e283d]">
                    <div className="flex items-center gap-2">
                      <span>Bound Device HWID:</span>
                      <code className="text-slate-300 font-mono bg-[#0e1422] px-2 py-0.5 rounded border border-slate-700/50">
                        {key.hwid || 'Auto-locks on first login'}
                      </code>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px]">
                        Resets remaining: <strong className="text-amber-400">{key.hwidResetsLeft}/3</strong>
                      </span>
                      <button
                        onClick={() => resetHWID(key.id)}
                        disabled={key.hwidResetsLeft <= 0}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                          key.hwidResetsLeft > 0
                            ? 'bg-[#1b253b] hover:bg-[#253350] text-amber-400 border border-amber-500/30'
                            : 'bg-[#131926] text-slate-600 cursor-not-allowed'
                        }`}
                      >
                        <RefreshCw className="w-3 h-3" />
                        Reset HWID
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
