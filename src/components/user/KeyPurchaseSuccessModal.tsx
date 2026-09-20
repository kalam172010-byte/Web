import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle,
  Copy,
  Download,
  Key,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { LicenseKey, PanelItem, PanelPlanPrice } from '../../types';

interface KeyPurchaseSuccessModalProps {
  data: {
    key: LicenseKey;
    panel: PanelItem;
    plan: PanelPlanPrice;
  } | null;
  onClose: () => void;
  onOpenMyKeys: () => void;
}

export const KeyPurchaseSuccessModal: React.FC<KeyPurchaseSuccessModalProps> = ({
  data,
  onClose,
  onOpenMyKeys
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (data) {
      // Trigger festive confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [data]);

  if (!data) return null;

  const { key, panel, plan } = data;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(key.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#101625] border border-amber-500/40 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl relative my-8 animate-in zoom-in-95 duration-200">
        {/* Glow Header */}
        <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 p-6 text-center border-b border-[#243352] relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-slate-300 flex items-center justify-center border border-slate-700"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-black flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/30">
            <Sparkles className="w-7 h-7" />
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-extrabold uppercase tracking-wider border border-emerald-500/30 inline-block mb-1.5">
            Key Generated & Activated
          </span>
          <h2 className="text-2xl font-black text-white font-gaming tracking-wide">
            {panel.name}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Subscription: <strong className="text-amber-400">{plan.label}</strong> (HWID Auto-Bound)
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Key Display Box */}
          <div className="bg-[#0b0f19] border border-amber-500/50 rounded-xl p-4 text-center space-y-2 relative group">
            <div className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
              Your Exclusive VIP License Key
            </div>
            
            <div className="font-mono text-base sm:text-lg font-bold text-amber-300 tracking-wider select-all break-all py-1">
              {key.key}
            </div>

            <button
              onClick={handleCopyKey}
              className={`w-full py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                copied
                  ? 'bg-emerald-500 text-black'
                  : 'bg-amber-500 hover:bg-amber-400 text-black shadow-md'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Key Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy License Key
                </>
              )}
            </button>
          </div>

          {/* Download & Guide links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href={panel.downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-[#172238] hover:bg-[#202f4e] border border-[#2c3d61] text-slate-200 text-xs font-bold flex items-center justify-between transition-colors group"
            >
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Download Panel APK</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenMyKeys();
              }}
              className="p-3 rounded-xl bg-[#172238] hover:bg-[#202f4e] border border-[#2c3d61] text-amber-300 text-xs font-bold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-400" />
                <span>View My Key Vault</span>
              </div>
              <span>→</span>
            </button>
          </div>

          {/* 3-Step Quick Activation Instructions */}
          <div className="bg-[#141b2c] border border-[#222d45] rounded-xl p-4 space-y-2.5">
            <h4 className="text-xs uppercase font-extrabold text-slate-300 tracking-wider">
              ⚡ 3-Step Setup Instructions
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-amber-500 text-black font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>Download & install the Panel APK above. Allow "Draw over other apps" permission.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-amber-500 text-black font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>Launch Free Fire / FF Max, open the Floating Injector menu, and paste your key.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-amber-500 text-black font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>Toggle Aimlock, Sensi, and ESP skeleton to start dominating!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
