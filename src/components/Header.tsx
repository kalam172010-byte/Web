import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldAlert,
  Wallet,
  Key,
  Download,
  Search,
  CheckCircle2,
  Sparkles,
  User,
  ShieldCheck,
  Globe,
  Menu,
  X,
  CreditCard,
  MessageSquare,
  Sliders
} from 'lucide-react';
import { CurrencyCode } from '../types';

interface HeaderProps {
  onOpenMyKeys: () => void;
  onOpenTopUp: () => void;
  onOpenChecker: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMyKeys,
  onOpenTopUp,
  onOpenChecker
}) => {
  const {
    currentRole,
    setCurrentRole,
    activeNav,
    setActiveNav,
    selectedCurrency,
    setSelectedCurrency,
    currencies,
    formatPrice,
    user,
    searchQuery,
    setSearchQuery,
    licenseKeys
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const myActiveKeysCount = licenseKeys.filter(
    k => k.boundUserEmail === user.email && k.status === 'active'
  ).length;

  return (
    <header className="sticky top-0 z-40 bg-[#090b10]/95 backdrop-blur-md border-b border-[#1e2638]">
      {/* Top micro bar for quick status */}
      <div className="bg-[#0f1422] border-b border-[#192132] px-4 py-1.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              OB46 Anti-Ban Bypass: ONLINE
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">
              ⚡ Instant Key Delivery & Auto HWID Lock
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency selector */}
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <select
                id="currency-select"
                aria-label="Select Currency"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value as CurrencyCode)}
                className="bg-[#161c2d] border border-[#232d45] text-amber-400 text-xs rounded px-2 py-0.5 focus:outline-none focus:border-amber-500 cursor-pointer font-semibold"
              >
                {currencies.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Role Switcher */}
            <button
              id="role-switch-btn"
              onClick={() => setCurrentRole(currentRole === 'user' ? 'admin' : 'user')}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold transition-all ${
                currentRole === 'admin'
                  ? 'bg-amber-500 text-black shadow-sm font-bold'
                  : 'bg-[#1b2337] text-slate-300 hover:text-white border border-[#2d3a56]'
              }`}
            >
              {currentRole === 'admin' ? (
                <>
                  <Sliders className="w-3 h-3 text-black" />
                  Admin Mode Active
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  Switch to Admin View
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveNav('store')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 flex items-center justify-center text-black font-black text-xl shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/30">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white font-gaming">
                FF PANEL <span className="text-amber-400">STORE</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                VIP
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Official Free Fire VIP Mods & License Key Center
            </p>
          </div>
        </div>

        {/* Search Input (Customer store mode) */}
        {currentRole === 'user' && (
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm relative items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              id="header-search-input"
              type="text"
              placeholder="Search Aimlock, ESP, iOS, PC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121724] border border-[#222c42] rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-slate-500 hover:text-slate-300 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* User Navigation Links & Action Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          {currentRole === 'user' ? (
            <>
              <button
                id="nav-store-btn"
                onClick={() => setActiveNav('store')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeNav === 'store'
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-[#141b2c]'
                }`}
              >
                🛍️ Store Catalog
              </button>

              <button
                id="nav-downloads-btn"
                onClick={() => setActiveNav('downloads')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  activeNav === 'downloads'
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-[#141b2c]'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                Downloads & Tools
              </button>

              <button
                id="nav-checker-btn"
                onClick={onOpenChecker}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 text-slate-300 hover:text-white hover:bg-[#141b2c] transition-colors border border-transparent hover:border-[#26334d]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Key / HWID Check
              </button>

              <button
                id="nav-reviews-btn"
                onClick={() => setActiveNav('reviews')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  activeNav === 'reviews'
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-[#141b2c]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Reviews
              </button>

              {/* My Keys Button */}
              <button
                id="my-keys-top-btn"
                onClick={onOpenMyKeys}
                className="relative px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 bg-[#172033] hover:bg-[#1f2b45] text-amber-300 border border-amber-500/30 transition-colors shadow-sm"
              >
                <Key className="w-3.5 h-3.5 text-amber-400" />
                My Keys
                {myActiveKeysCount > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[10px] font-extrabold">
                    {myActiveKeysCount}
                  </span>
                )}
              </button>

              {/* Wallet Badge & TopUp */}
              <button
                id="wallet-topup-btn"
                onClick={onOpenTopUp}
                className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-500/30 hover:border-emerald-500/60 transition-all text-xs group"
              >
                <div className="flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-300 text-[11px]">Wallet:</span>
                  <span className="font-bold text-emerald-400 font-mono">
                    {formatPrice(user.walletBalanceUSD)}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-black font-extrabold text-[10px] hover:bg-emerald-400 transition-colors">
                  + Add
                </span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Administrator Control Center
              </span>
            </div>
          )}
        </div>

        {/* Mobile Hamburger & Quick icons */}
        <div className="flex items-center gap-2 lg:hidden">
          {currentRole === 'user' && (
            <button
              id="mobile-wallet-btn"
              onClick={onOpenTopUp}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>{formatPrice(user.walletBalanceUSD)}</span>
            </button>
          )}

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#141b2c] border border-[#232d45] text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d121e] border-b border-[#1f293d] px-4 py-3 space-y-2">
          {currentRole === 'user' ? (
            <>
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Search VIP Panels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#161c2d] border border-[#26334d] rounded-lg px-3 py-2 text-xs text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setActiveNav('store'); setMobileMenuOpen(false); }}
                  className="px-3 py-2 rounded bg-[#161c2d] text-xs font-semibold text-left text-slate-200 hover:bg-[#202940]"
                >
                  🛍️ Store Catalog
                </button>
                <button
                  onClick={() => { setActiveNav('downloads'); setMobileMenuOpen(false); }}
                  className="px-3 py-2 rounded bg-[#161c2d] text-xs font-semibold text-left text-slate-200 hover:bg-[#202940]"
                >
                  📥 Downloads & Tools
                </button>
                <button
                  onClick={() => { onOpenMyKeys(); setMobileMenuOpen(false); }}
                  className="px-3 py-2 rounded bg-[#1b2438] text-xs font-semibold text-left text-amber-300 border border-amber-500/20"
                >
                  🔑 My Active Keys ({myActiveKeysCount})
                </button>
                <button
                  onClick={() => { onOpenChecker(); setMobileMenuOpen(false); }}
                  className="px-3 py-2 rounded bg-[#161c2d] text-xs font-semibold text-left text-slate-200 hover:bg-[#202940]"
                >
                  🔍 Key Checker
                </button>
                <button
                  onClick={() => { setActiveNav('reviews'); setMobileMenuOpen(false); }}
                  className="px-3 py-2 rounded bg-[#161c2d] text-xs font-semibold text-left text-slate-200 hover:bg-[#202940]"
                >
                  💬 User Reviews
                </button>
                <button
                  onClick={() => { onOpenTopUp(); setMobileMenuOpen(false); }}
                  className="px-3 py-2 rounded bg-emerald-950 text-xs font-bold text-left text-emerald-400 border border-emerald-500/30"
                >
                  💳 Deposit Funds
                </button>
              </div>
            </>
          ) : (
            <div className="p-2 text-xs text-amber-400 font-semibold text-center">
              Admin Mode Activated. Use Dashboard Tabs below.
            </div>
          )}
        </div>
      )}
    </header>
  );
};
