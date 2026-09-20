import React, { useState } from 'react';
import { PanelItem, PlanDuration, PaymentMethodType } from '../../types';
import { useStore } from '../../context/StoreContext';
import {
  X,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Download,
  Play,
  Wallet,
  Tag,
  Smartphone,
  Laptop,
  Apple,
  Star,
  Copy,
  AlertCircle
} from 'lucide-react';

interface PanelDetailsModalProps {
  panel: PanelItem | null;
  initialDuration?: PlanDuration;
  onClose: () => void;
  onPurchaseSuccess: (keyData: any) => void;
  onOpenTopUp: () => void;
}

export const PanelDetailsModal: React.FC<PanelDetailsModalProps> = ({
  panel,
  initialDuration = '30days',
  onClose,
  onPurchaseSuccess,
  onOpenTopUp
}) => {
  const { formatPrice, user, purchaseKey, showToast } = useStore();
  const [selectedDuration, setSelectedDuration] = useState<PlanDuration>(initialDuration);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!panel) return null;

  const currentPlan = panel.plans.find(p => p.duration === selectedDuration) || panel.plans[0];
  const finalPriceUSD = currentPlan.priceUSD * (1 - discountPercent / 100);
  const hasEnoughBalance = user.walletBalanceUSD >= finalPriceUSD;

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'FFVIP20') {
      setDiscountPercent(20);
      setCouponApplied(true);
      showToast('20% Flash Promo discount applied!', 'success');
    } else {
      showToast('Invalid promo code. Try "FFVIP20"', 'error');
    }
  };

  const handleBuy = async () => {
    setIsProcessing(true);
    try {
      const res = await purchaseKey(panel.id, selectedDuration, true);
      if (res.success && res.key) {
        onPurchaseSuccess({
          key: res.key,
          panel,
          plan: currentPlan
        });
        onClose();
      } else {
        showToast(res.error || 'Purchase failed', 'error');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#111726] border border-[#222f49] rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Banner */}
        <div className="relative h-48 sm:h-56 bg-slate-900">
          <img
            src={panel.bannerImage}
            alt={panel.name}
            className="w-full h-full object-cover opacity-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111726] via-[#111726]/60 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded bg-amber-500 text-black font-extrabold text-xs">
                  {panel.version}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 font-bold text-xs border border-emerald-500/40">
                  {panel.gameVersion}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white font-gaming tracking-wide">
                {panel.name}
              </h2>
            </div>

            <div className="flex items-center gap-1.5 bg-[#0a0e17]/90 px-3 py-1.5 rounded-lg border border-slate-700/60 text-amber-400 font-bold text-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{panel.rating}</span>
              <span className="text-slate-400 font-normal text-xs">({panel.totalSales} VIP Users)</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Description & Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-1.5">
                  About this Panel
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {panel.description}
                </p>
              </div>

              {/* Complete Features List */}
              <div>
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-amber-400 mb-2.5 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Key Features & Bypass Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {panel.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-200 bg-[#161f33] p-2 rounded-lg border border-[#23314e]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar info */}
            <div className="bg-[#151d30] border border-[#243352] rounded-xl p-4 space-y-3.5">
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-300">
                System Compatibility
              </h4>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300 pb-1.5 border-b border-[#243352]">
                  <span className="text-slate-400">Target Devices:</span>
                  <span className="font-bold text-amber-400">
                    {panel.platform.map(p => p.toUpperCase()).join(' & ')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300 pb-1.5 border-b border-[#243352]">
                  <span className="text-slate-400">Root / Jailbreak:</span>
                  <span className="font-bold text-emerald-400">Not Required (100% Safe)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300 pb-1.5 border-b border-[#243352]">
                  <span className="text-slate-400">Anti-Ban Status:</span>
                  <span className="font-bold text-emerald-400">OB46 Bypass Safe</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Developer:</span>
                  <span className="font-bold text-slate-200">{panel.developer}</span>
                </div>
              </div>

              {/* Direct APK Link preview */}
              <div className="pt-2">
                <a
                  href={panel.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-[#1f2b45] hover:bg-[#28385b] text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#31436b] transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  Pre-Download APK / Config
                </a>
              </div>
            </div>
          </div>

          {/* Duration Selector */}
          <div className="bg-[#151c2e] border border-[#232f49] rounded-xl p-4 space-y-4">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-300 flex items-center justify-between">
              <span>1. Choose Subscription Duration</span>
              <span className="text-emerald-400 text-[11px] font-semibold">0-Sec Auto Key Delivery</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {panel.plans.map((p) => {
                const isSelected = selectedDuration === p.duration;
                return (
                  <button
                    key={p.duration}
                    onClick={() => setSelectedDuration(p.duration)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md'
                        : 'bg-[#1a233a] border-[#293755] text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{p.label}</span>
                      {p.popular && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-red-500 text-white font-extrabold">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <div className="text-base font-extrabold font-mono text-white">
                      {formatPrice(p.priceUSD)}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Coupon Code Input */}
            <div className="flex items-center gap-2 pt-1">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Enter Promo Code (Try FFVIP20)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponApplied}
                  className="w-full bg-[#101624] border border-[#24314c] rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 uppercase focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                onClick={handleApplyCoupon}
                disabled={couponApplied || !couponCode}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  couponApplied
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                    : 'bg-[#222e47] hover:bg-amber-500 hover:text-black text-slate-200'
                }`}
              >
                {couponApplied ? 'Applied (-20%)' : 'Apply'}
              </button>
            </div>

            {/* Price Summary & Payment Check */}
            <div className="pt-3 border-t border-[#23314e] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="text-xs text-slate-400">Total Due Amount:</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-amber-400 font-mono">
                    {formatPrice(finalPriceUSD)}
                  </span>
                  {discountPercent > 0 && (
                    <span className="text-xs line-through text-slate-500 font-mono">
                      {formatPrice(currentPlan.priceUSD)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {!hasEnoughBalance ? (
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenTopUp();
                      }}
                      className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg flex items-center justify-center gap-1.5"
                    >
                      <Wallet className="w-4 h-4 text-black" />
                      Top-Up Wallet ({formatPrice(user.walletBalanceUSD)} available)
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleBuy}
                    disabled={isProcessing}
                    className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-sm transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 fill-black text-black" />
                    {isProcessing ? 'Generating Key...' : 'Unlock Key with Wallet'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
