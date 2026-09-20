import React from 'react';
import { ShieldCheck, Zap, Lock, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-[#1a2336] bg-[#07090e] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-black font-black text-base shadow-md">
                ⚡
              </div>
              <span className="font-extrabold text-lg text-white font-gaming tracking-wide">
                FF PANEL <span className="text-amber-400">STORE</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              The premier Free Fire & FF MAX VIP Panel Marketplace. Delivering automated instant license keys, cloud anti-ban bypasses, high precision aimlock, and sensitivity tools for competitive mobile and emulator gamers.
            </p>
            <div className="flex items-center gap-3 text-slate-400 text-[11px]">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Virus & Malware Free
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <Zap className="w-3.5 h-3.5" /> 0-Sec Instant Key Delivery
              </span>
            </div>
          </div>

          {/* Col 2: Supported Payment Methods */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs font-gaming">
              Payment Methods
            </h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div>🇧🇩 bKash & Nagad (Personal / Send Money)</div>
              <div>🇮🇳 UPI / PhonePe / Paytm / GPay</div>
              <div>🇵🇰 JazzCash & Easypaisa</div>
              <div>🌐 Crypto USDT (TRC-20 & BEP-20)</div>
              <div>💳 Visa / Mastercard / Debit Card</div>
            </div>
          </div>

          {/* Col 3: Safe Gaming Policy */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs font-gaming">
              Security Guarantee
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              All tools are tested 24/7 on live OB46.2 server patches. Free monthly HWID resets included with every VIP subscription.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-[#151c2c] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} FF Panel Store. All rights reserved. Dedicated to the Free Fire Gaming Community.
          </div>
          <div className="flex items-center gap-4">
            <span>Server Time: OB46.2 Live</span>
            <span>•</span>
            <span className="text-emerald-400">Status: All Panels Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
