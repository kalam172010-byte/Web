import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Flame, Bell, Sparkles, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

export const GameStatusBanner: React.FC = () => {
  const { announcements } = useStore();
  const activeAnnouncements = announcements.filter(a => a.active);

  return (
    <div className="space-y-3 mb-6">
      {/* Live Server Compatibility Grid */}
      <div className="bg-gradient-to-r from-[#121826] via-[#161f33] to-[#121826] border border-[#232e47] rounded-xl p-3 sm:p-4 shadow-lg shadow-black/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-white tracking-wide font-gaming">
                  FREE FIRE & FF MAX <span className="text-emerald-400">OB46.2 BYPASS STATUS</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase border border-emerald-500/40">
                  100% Safe (Main ID)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Global, BD, India, Brazil, Indonesia, MENA, and LATAM servers fully tested & undetected in CS / BR Ranked.
              </p>
            </div>
          </div>

          {/* Quick stats pills */}
          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end text-xs">
            <div className="px-2.5 py-1.5 rounded-lg bg-[#0b0f19] border border-[#1f283d] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400 text-[11px]">Delivery:</span>
              <span className="font-bold text-amber-400">0-Sec Auto</span>
            </div>
            <div className="px-2.5 py-1.5 rounded-lg bg-[#0b0f19] border border-[#1f283d] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400 text-[11px]">Headshot Rate:</span>
              <span className="font-bold text-cyan-400">99.8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Broadcast Announcements ticker */}
      {activeAnnouncements.length > 0 && (
        <div className="space-y-2">
          {activeAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className={`px-3.5 py-2 rounded-lg text-xs flex items-center justify-between gap-3 border ${
                ann.type === 'promo'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                  : ann.type === 'alert'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                  : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-200'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                {ann.type === 'promo' ? (
                  <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                ) : ann.type === 'alert' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Bell className="w-4 h-4 text-indigo-400 shrink-0" />
                )}
                <span className="font-bold truncate">{ann.title}:</span>
                <span className="text-slate-300 text-[11px] truncate hidden sm:inline">
                  {ann.content}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0">{ann.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
