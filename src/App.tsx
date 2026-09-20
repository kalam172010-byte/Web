/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { GameStatusBanner } from './components/GameStatusBanner';
import { PanelCard } from './components/user/PanelCard';
import { PanelDetailsModal } from './components/user/PanelDetailsModal';
import { KeyPurchaseSuccessModal } from './components/user/KeyPurchaseSuccessModal';
import { MyKeysModal } from './components/user/MyKeysModal';
import { KeyCheckerModal } from './components/user/KeyCheckerModal';
import { WalletTopUpModal } from './components/user/WalletTopUpModal';
import { DownloadCenter } from './components/user/DownloadCenter';
import { UserReviews } from './components/user/UserReviews';
import { FaqSection } from './components/user/FaqSection';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { FloatingSupport } from './components/FloatingSupport';
import { Footer } from './components/Footer';
import { PanelItem, PlanDuration, PanelCategory } from './types';
import {
  Flame,
  Zap,
  ShieldCheck,
  Smartphone,
  Laptop,
  Apple,
  Search,
  CheckCircle2,
  AlertCircle,
  Key,
  Download,
  Wallet
} from 'lucide-react';

const MainApp: React.FC = () => {
  const {
    currentRole,
    activeNav,
    setActiveNav,
    panels,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    toastMessage,
    user,
    formatPrice
  } = useStore();

  // Modals state
  const [selectedPanelForDetails, setSelectedPanelForDetails] = useState<PanelItem | null>(null);
  const [initialDurationForDetails, setInitialDurationForDetails] = useState<PlanDuration>('30days');
  const [purchasedKeyData, setPurchasedKeyData] = useState<any | null>(null);
  const [isMyKeysOpen, setIsMyKeysOpen] = useState(false);
  const [isCheckerOpen, setIsCheckerOpen] = useState(false);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);

  // Category filter items
  const categories: { id: PanelCategory; label: string; icon: string }[] = [
    { id: 'all', label: 'All Panels', icon: '🔥' },
    { id: 'aimlock', label: 'Aimlock & Headshot', icon: '🎯' },
    { id: 'esp', label: 'ESP & Radar Lines', icon: '👁️' },
    { id: 'ios', label: 'iOS Regedit (No JB)', icon: '🍎' },
    { id: 'emulator', label: 'PC & Emulator Bypass', icon: '💻' },
    { id: 'regedit', label: 'Sensi & DPI Boost', icon: '⚡' },
    { id: 'streamer', label: 'Streamer Safe Ghost', icon: '🎥' }
  ];

  // Filter panels
  const filteredPanels = panels.filter((panel) => {
    const matchesCategory = selectedCategory === 'all' ? true : panel.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      panel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      panel.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      panel.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleOpenDetails = (panel: PanelItem, defaultDuration: PlanDuration = '30days') => {
    setSelectedPanelForDetails(panel);
    setInitialDurationForDetails(defaultDuration);
  };

  const handleQuickBuy = (panel: PanelItem, duration: PlanDuration) => {
    setSelectedPanelForDetails(panel);
    setInitialDurationForDetails(duration);
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-[#e2e8f0] flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-5 z-50 animate-in slide-in-from-top-4 duration-300">
          <div
            className={`px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border ${
              toastMessage.type === 'success'
                ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50 shadow-emerald-500/20'
                : toastMessage.type === 'error'
                ? 'bg-red-950/90 text-red-300 border-red-500/50 shadow-red-500/20'
                : 'bg-indigo-950/90 text-indigo-300 border-indigo-500/50 shadow-indigo-500/20'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        onOpenMyKeys={() => setIsMyKeysOpen(true)}
        onOpenTopUp={() => setIsTopUpOpen(true)}
        onOpenChecker={() => setIsCheckerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {currentRole === 'admin' ? (
          /* ADMIN MODE VIEW */
          <AdminDashboard />
        ) : (
          /* USER STOREFRONT VIEW */
          <>
            {/* Live Patch & Safe Bypass Status Banner */}
            <GameStatusBanner />

            {/* Navigation Tabs (Store / Downloads / Reviews) */}
            {activeNav === 'store' && (
              <div className="space-y-6">
                {/* Hero Feature Banner */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#141d31] via-[#1b253d] to-[#121827] border border-[#273656] p-6 sm:p-10 shadow-2xl">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative z-10 max-w-2xl space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/30">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      Free Fire OB46.2 VIP Tournament Series
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-gaming tracking-tight leading-none">
                      UNLEASH <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-500">100% HEADSHOT</span> PRECISION
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Instant VIP license keys, auto anti-ban kernel bypasses, and extreme touch drag sensitivity configs. 
                      Compatible with Android, iOS (No Jailbreak), and PC BlueStacks / MSI emulators.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          const firstPanel = panels[0];
                          if (firstPanel) handleOpenDetails(firstPanel, '30days');
                        }}
                        className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/25 flex items-center gap-2"
                      >
                        <Zap className="w-4 h-4 fill-black text-black" />
                        Explore Top VIP Panel
                      </button>

                      <button
                        onClick={() => setIsTopUpOpen(true)}
                        className="py-3 px-5 rounded-xl bg-[#1a253c] hover:bg-[#23314f] text-slate-200 font-bold text-xs sm:text-sm border border-[#2d3e62] transition-colors flex items-center gap-2"
                      >
                        <Wallet className="w-4 h-4 text-emerald-400" />
                        Top Up Wallet ({formatPrice(user.walletBalanceUSD)})
                      </button>
                    </div>
                  </div>
                </div>

                {/* Category Pills Bar */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border shrink-0 ${
                        selectedCategory === cat.id
                          ? 'bg-amber-500 text-black border-amber-400 shadow-md font-extrabold'
                          : 'bg-[#121827] hover:bg-[#182136] text-slate-300 border-[#202c44]'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>

                {/* Panels Grid */}
                {filteredPanels.length === 0 ? (
                  <div className="bg-[#111726] border border-[#202c44] rounded-2xl p-12 text-center space-y-3">
                    <Search className="w-10 h-10 text-slate-500 mx-auto" />
                    <h3 className="text-base font-bold text-white font-gaming">No Panels Found</h3>
                    <p className="text-xs text-slate-400">
                      No tools match your query "{searchQuery}". Try selecting another category.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                      }}
                      className="px-4 py-2 rounded-lg bg-amber-500 text-black text-xs font-bold"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPanels.map((panel) => (
                      <PanelCard
                        key={panel.id}
                        panel={panel}
                        onSelectPanel={handleOpenDetails}
                        onQuickBuy={handleQuickBuy}
                      />
                    ))}
                  </div>
                )}

                {/* FAQ Section */}
                <FaqSection />
              </div>
            )}

            {/* Downloads Tab View */}
            {activeNav === 'downloads' && <DownloadCenter />}

            {/* Reviews Tab View */}
            {activeNav === 'reviews' && <UserReviews />}
          </>
        )}
      </main>

      {/* Floating WhatsApp & Telegram Support */}
      <FloatingSupport />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {selectedPanelForDetails && (
        <PanelDetailsModal
          panel={selectedPanelForDetails}
          initialDuration={initialDurationForDetails}
          onClose={() => setSelectedPanelForDetails(null)}
          onPurchaseSuccess={(keyData) => setPurchasedKeyData(keyData)}
          onOpenTopUp={() => setIsTopUpOpen(true)}
        />
      )}

      {purchasedKeyData && (
        <KeyPurchaseSuccessModal
          data={purchasedKeyData}
          onClose={() => setPurchasedKeyData(null)}
          onOpenMyKeys={() => setIsMyKeysOpen(true)}
        />
      )}

      <MyKeysModal
        isOpen={isMyKeysOpen}
        onClose={() => setIsMyKeysOpen(false)}
      />

      <KeyCheckerModal
        isOpen={isCheckerOpen}
        onClose={() => setIsCheckerOpen(false)}
      />

      <WalletTopUpModal
        isOpen={isTopUpOpen}
        onClose={() => setIsTopUpOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
