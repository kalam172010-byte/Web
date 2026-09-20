import React from 'react';
import { Send, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';

export const FloatingSupport: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5">
      {/* Telegram VIP Channel Button */}
      <a
        href="https://t.me/FFPanelStoreOfficial"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 rounded-full bg-[#229ED9] hover:bg-[#1e8bc0] text-white flex items-center justify-center shadow-xl shadow-cyan-500/20 hover:scale-110 transition-transform group relative"
        title="Join Telegram VIP Channel"
      >
        <Send className="w-5 h-5 -rotate-12 group-hover:rotate-0 transition-transform" />
        <span className="absolute right-14 bg-[#111726] border border-[#232f49] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Join Telegram VIP
        </span>
      </a>

      {/* WhatsApp 24/7 Helpline */}
      <a
        href="https://wa.me/8801720108899?text=Hello%20FF%20Panel%20Store,%20I%20need%20VIP%20Key%20Help"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-xl shadow-emerald-500/20 hover:scale-110 transition-transform group relative"
        title="WhatsApp 24/7 Support"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute right-14 bg-[#111726] border border-[#232f49] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          24/7 WhatsApp Support
        </span>
      </a>
    </div>
  );
};
