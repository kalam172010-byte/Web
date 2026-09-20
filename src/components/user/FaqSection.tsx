import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Zap, Lock, RefreshCw } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is this Free Fire VIP Panel safe for my Main ID?',
      a: 'Yes! Our panels use an advanced OB46 kernel memory bypass that does not modify original game OBB files or trigger signature checks. We maintain a 100% undetected track record across BR and CS Ranked matches.'
    },
    {
      q: 'How fast do I receive my license key after payment?',
      a: 'Instantly (0 seconds). When purchasing with your Store Wallet balance or Credit Card, your key is immediately generated on-screen and saved to your Key Vault.'
    },
    {
      q: 'How does the Hardware ID (HWID) device lock work?',
      a: 'When you enter your license key into the panel on your phone, tablet, or emulator, it automatically binds to that device. You have 3 free HWID resets every month in your Key Vault if you switch phones.'
    },
    {
      q: 'Does it support iOS / iPhone without Jailbreak?',
      a: 'Yes! Our Ghost Regedit iOS VIP edition uses direct Apple Signed DNS MobileConfig profiles that install through Safari Settings with no computer and zero jailbreak needed.'
    },
    {
      q: 'How do I top up my wallet using bKash, Nagad, or UPI?',
      a: 'Click "Wallet + Add" in the top bar, select your payment method (bKash/Nagad/UPI/JazzCash/USDT), copy the merchant number, send the amount, and submit your Transaction ID (TrxID) for instant approval.'
    },
    {
      q: 'What happens when Garena releases a new Free Fire game update?',
      a: 'Our developer team deploys automatic cloud bypass updates within 15-30 minutes of any Free Fire server maintenance. Your active license keys continue working without having to repurchase.'
    }
  ];

  return (
    <div className="bg-[#111726] border border-[#202c44] rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white font-gaming tracking-wide">
            FREQUENTLY ASKED QUESTIONS (FAQ)
          </h2>
          <p className="text-xs text-slate-400">
            Everything you need to know about key activation, anti-ban safety & device binding
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-[#151d2f] border border-[#222e47] rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 text-left text-xs sm:text-sm font-bold text-slate-200 hover:text-white flex items-center justify-between gap-3"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-amber-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-[#1c263c] pt-3 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
