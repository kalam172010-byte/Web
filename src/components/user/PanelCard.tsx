import React, { useState } from 'react';
import { PanelItem, PlanDuration } from '../../types';
import { useStore } from '../../context/StoreContext';
import {
  ShieldCheck,
  Zap,
  Smartphone,
  Laptop,
  Apple,
  Star,
  Download,
  Flame,
  Clock,
  Eye,
  Check,
  ArrowRight
} from 'lucide-react';

interface PanelCardProps {
  panel: PanelItem;
  onSelectPanel: (panel: PanelItem, defaultDuration?: PlanDuration) => void;
  onQuickBuy: (panel: PanelItem, duration: PlanDuration) => void;
}

export const PanelCard: React.FC<PanelCardProps> = ({
  panel,
  onSelectPanel,
  onQuickBuy
}) => {
  const { formatPrice } = useStore();
  const [selectedDuration, setSelectedDuration] = useState<PlanDuration>(
    panel.plans.find(p => p.popular)?.duration || panel.plans[0].duration
  );

  const currentPlan = panel.plans.find(p => p.duration === selectedDuration) || panel.plans[0];

  return (
    <div className="bg-[#111726] border border-[#202b42] hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col group relative">
      {/* Top Media Header */}
      <div className="relative h-44 overflow-hidden bg-slate-900">
        <img
          src={panel.bannerImage}
          alt={panel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111726] via-[#111726]/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-amber-400 font-extrabold text-[11px] border border-amber-500/40 flex items-center gap-1 shadow-md">
            <Flame className="w-3 h-3 text-amber-400" />
            {panel.version}
          </span>

          {panel.safetyStatus === 'safe' && (
            <span className="px-2 py-1 rounded-md bg-emerald-950/80 backdrop-blur-md text-emerald-400 font-bold text-[10px] border border-emerald-500/40 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Main ID Safe
            </span>
          )}
        </div>

        {/* Platform compatibility icons */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-1 rounded-md border border-slate-700/60 z-10">
          {panel.platform.includes('android') && (
            <span title="Android APK">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            </span>
          )}
          {panel.platform.includes('ios') && (
            <span title="iOS IPA / DNS">
              <Apple className="w-3.5 h-3.5 text-slate-200" />
            </span>
          )}
          {panel.platform.includes('pc') && (
            <span title="PC Emulator">
              <Laptop className="w-3.5 h-3.5 text-cyan-400" />
            </span>
          )}
        </div>

        {/* Floating Developer & Version pill */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="text-[11px] text-slate-300 font-semibold bg-[#090d16]/80 px-2 py-0.5 rounded border border-slate-700/50">
            {panel.gameVersion}
          </span>
          <div className="flex items-center gap-1 bg-[#090d16]/80 px-2 py-0.5 rounded border border-slate-700/50 text-amber-400 text-xs font-bold">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{panel.rating}</span>
            <span className="text-slate-400 font-normal text-[10px]">({panel.totalSales}+ sold)</span>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-extrabold text-lg text-white group-hover:text-amber-400 transition-colors font-gaming tracking-wide">
            {panel.name}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {panel.tagline}
          </p>

          {/* Key Feature highlights */}
          <div className="mt-3.5 space-y-1.5">
            {panel.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                <div className="w-4 h-4 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Duration selection & Pricing */}
        <div className="pt-3 border-t border-[#1e273d] space-y-3">
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
              <span>Select VIP Duration:</span>
              <span className="text-emerald-400 font-semibold">Instant Key Delivery</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {panel.plans.map(p => (
                <button
                  key={p.duration}
                  onClick={() => setSelectedDuration(p.duration)}
                  className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all text-center border ${
                    selectedDuration === p.duration
                      ? 'bg-amber-500 text-black border-amber-400 font-extrabold shadow-sm'
                      : 'bg-[#161e31] hover:bg-[#1f2a45] text-slate-300 border-[#263450]'
                  }`}
                >
                  <div className="text-[10px] leading-tight opacity-90">{p.label.split(' ')[0]} {p.label.split(' ')[1]}</div>
                  <div className="text-[11px] font-mono leading-tight">{formatPrice(p.priceUSD)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => onSelectPanel(panel, selectedDuration)}
              className="flex-1 py-2 px-3 rounded-xl bg-[#172238] hover:bg-[#202f4e] text-slate-200 text-xs font-semibold border border-[#2b3a5b] transition-colors flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              Details & Tutorial
            </button>

            <button
              onClick={() => onQuickBuy(panel, selectedDuration)}
              className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-black text-black" />
              Get Key Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
