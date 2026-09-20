import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Wallet,
  CheckCircle2,
  Copy,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  QrCode,
  Sparkles,
  Info
} from 'lucide-react';
import { PaymentMethodType } from '../../types';
import { PAYMENT_GATEWAYS } from '../../data/mockData';

interface WalletTopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletTopUpModal: React.FC<WalletTopUpModalProps> = ({ isOpen, onClose }) => {
  const {
    user,
    selectedCurrency,
    currencies,
    formatPrice,
    convertUSDToLocal,
    topUpWallet,
    showToast
  } = useStore();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('bkash');
  const [depositAmountUSD, setDepositAmountUSD] = useState<number>(15);
  const [transactionId, setTransactionId] = useState('');
  const [senderInfo, setSenderInfo] = useState('');
  const [copiedText, setCopiedText] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentGateway = PAYMENT_GATEWAYS.find(g => g.id === selectedMethod) || PAYMENT_GATEWAYS[0];
  const localAmount = convertUSDToLocal(depositAmountUSD);
  const currentCurr = currencies.find(c => c.code === selectedCurrency) || currencies[0];

  const presetAmounts = [5, 10, 15, 25, 50, 100];

  const handleCopyAccount = (text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    showToast('Payment address/number copied!', 'success');
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId.trim() && selectedMethod !== 'card') {
      showToast('Please enter the Transaction ID / UTR number', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await topUpWallet(
        depositAmountUSD,
        selectedMethod,
        transactionId || `CARD-AUTO-${Date.now()}`,
        senderInfo || user.email
      );
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#101625] border border-[#243352] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative my-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950/60 via-[#131d2e] to-[#101625] border-b border-[#243352] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-gaming tracking-wide">
                Top-Up Wallet Balance
              </h2>
              <p className="text-xs text-slate-400">
                Current Balance:{' '}
                <strong className="text-emerald-400 font-mono">
                  {formatPrice(user.walletBalanceUSD)}
                </strong>
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

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Step 1: Select Amount */}
          <div className="space-y-2.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span>1. Select Deposit Amount</span>
              <span className="text-emerald-400 text-[11px]">
                ≈ {currentCurr.symbol} {localAmount.toLocaleString()} {currentCurr.code}
              </span>
            </label>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {presetAmounts.map((amt) => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => setDepositAmountUSD(amt)}
                  className={`py-2 px-3 rounded-xl border font-mono text-xs font-bold transition-all ${
                    depositAmountUSD === amt
                      ? 'bg-emerald-500 text-black border-emerald-400 shadow-md font-extrabold'
                      : 'bg-[#161f33] border-[#253350] text-slate-300 hover:border-slate-500'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Gateway */}
          <div className="space-y-2.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300 block">
              2. Select Payment Method
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PAYMENT_GATEWAYS.map((gw) => (
                <button
                  type="button"
                  key={gw.id}
                  onClick={() => setSelectedMethod(gw.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                    selectedMethod === gw.id
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-sm'
                      : 'bg-[#151d2f] border-[#24314c] text-slate-300 hover:bg-[#1c273e]'
                  }`}
                >
                  <span className="text-xl">{gw.logo}</span>
                  <div className="truncate">
                    <div className="text-xs font-bold truncate">{gw.name.split('(')[0]}</div>
                    <div className="text-[10px] text-slate-400">
                      {gw.id === 'usdt' ? 'Crypto' : gw.id === 'card' ? 'Visa/Master' : 'Mobile Pay'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Payment Instructions & Details */}
          <div className="bg-[#141c2e] border border-[#243352] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-200">
              <span className="flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-400" />
                Payment Instructions:
              </span>
              <span className="text-amber-400 font-mono">
                Send Exact: {currentCurr.symbol} {localAmount.toLocaleString()} ({depositAmountUSD} USD)
              </span>
            </div>

            <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed bg-[#0c101a] p-3 rounded-lg border border-[#1e283d] font-mono">
              {currentGateway.instructions}
            </p>

            {currentGateway.accountNumber && (
              <div className="flex items-center justify-between bg-[#0e1422] p-2.5 rounded-lg border border-[#212d46]">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Target Number / Address:</div>
                  <div className="text-xs font-mono font-bold text-amber-300">
                    {currentGateway.accountNumber}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyAccount(currentGateway.accountNumber)}
                  className="px-3 py-1.5 rounded-md bg-[#1f2b45] hover:bg-amber-500 hover:text-black text-slate-200 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedText ? 'Copied' : 'Copy'}
                </button>
              </div>
            )}
          </div>

          {/* Step 4: Transaction ID Verification Inputs */}
          {selectedMethod !== 'card' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                  Transaction ID / UTR / TxHash *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 9G7K2L8X19 or 4259881..."
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full bg-[#0c101b] border border-[#243352] rounded-lg px-3 py-2 text-xs text-white font-mono uppercase focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">
                  Sender Number / Wallet Address
                </label>
                <input
                  type="text"
                  placeholder="Your bKash/Nagad number or wallet"
                  value={senderInfo}
                  onChange={(e) => setSenderInfo(e.target.value)}
                  className="w-full bg-[#0c101b] border border-[#243352] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
              🔒 Instant Card Sandbox: Clicking Submit will immediately approve and credit ${depositAmountUSD} to your wallet.
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-black" />
            {isSubmitting ? 'Submitting Deposit...' : `Confirm Deposit & Credit $${depositAmountUSD}`}
          </button>
        </form>
      </div>
    </div>
  );
};
