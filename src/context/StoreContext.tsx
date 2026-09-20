import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  PanelItem,
  LicenseKey,
  TopUpOrder,
  UserProfile,
  Announcement,
  ReviewItem,
  CurrencyCode,
  CurrencyConfig,
  PlanDuration,
  PanelCategory,
  PanelSafetyStatus,
  PaymentMethodType
} from '../types';
import {
  INITIAL_PANELS,
  INITIAL_KEYS,
  INITIAL_ORDERS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_REVIEWS,
  INITIAL_USER,
  CURRENCIES
} from '../data/mockData';

interface StoreContextType {
  // Role & View state
  currentRole: 'user' | 'admin';
  setCurrentRole: (role: 'user' | 'admin') => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  
  // Currency
  selectedCurrency: CurrencyCode;
  setSelectedCurrency: (currency: CurrencyCode) => void;
  currencies: CurrencyConfig[];
  formatPrice: (amountUSD: number) => string;
  convertUSDToLocal: (amountUSD: number) => number;
  
  // User Data & Wallet
  user: UserProfile;
  topUpWallet: (amountUSD: number, method: PaymentMethodType, trxId: string, senderInfo: string) => Promise<TopUpOrder>;
  deductWalletBalance: (amountUSD: number) => boolean;
  addWalletBalance: (amountUSD: number) => void;
  
  // Panels
  panels: PanelItem[];
  selectedCategory: PanelCategory;
  setSelectedCategory: (cat: PanelCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addPanel: (panel: Omit<PanelItem, 'id' | 'totalSales' | 'rating' | 'lastUpdated'>) => void;
  updatePanel: (id: string, updates: Partial<PanelItem>) => void;
  deletePanel: (id: string) => void;
  
  // Keys Management
  licenseKeys: LicenseKey[];
  generateKey: (params: {
    panelId: string;
    duration: PlanDuration;
    count?: number;
    prefix?: string;
    customNote?: string;
    maxDevices?: number;
  }) => LicenseKey[];
  purchaseKey: (panelId: string, duration: PlanDuration, payWithWallet?: boolean) => Promise<{ success: boolean; key?: LicenseKey; error?: string }>;
  resetHWID: (keyId: string) => { success: boolean; message: string };
  extendKeyDuration: (keyId: string, additionalDays: number) => void;
  toggleKeyStatus: (keyId: string, newStatus: 'active' | 'banned' | 'unused' | 'expired') => void;
  deleteKey: (keyId: string) => void;
  validateKey: (keyString: string) => { found: boolean; key?: LicenseKey; panel?: PanelItem; error?: string };
  
  // Orders & Top-Ups (Admin)
  orders: TopUpOrder[];
  approveOrder: (orderId: string) => void;
  rejectOrder: (orderId: string, reason: string) => void;
  
  // Announcements
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  deleteAnnouncement: (id: string) => void;
  toggleAnnouncement: (id: string) => void;
  
  // Reviews
  reviews: ReviewItem[];
  addReview: (panelId: string, rating: number, comment: string) => void;

  // Reseller Upstream API
  callResellerApi: (params: { productId: string; duration: string; androidId?: string }) => Promise<any>;
  
  // Toast notifications
  toastMessage: { text: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (text: string, type?: 'success' | 'error' | 'info') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Local storage hydrations
  const [currentRole, setCurrentRole] = useState<'user' | 'admin'>('user');
  const [activeNav, setActiveNav] = useState<string>('store');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('BDT');
  const [selectedCategory, setSelectedCategory] = useState<PanelCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('ff_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [panels, setPanels] = useState<PanelItem[]>(() => {
    const saved = localStorage.getItem('ff_panels');
    return saved ? JSON.parse(saved) : INITIAL_PANELS;
  });

  const [licenseKeys, setLicenseKeys] = useState<LicenseKey[]>(() => {
    const saved = localStorage.getItem('ff_keys');
    return saved ? JSON.parse(saved) : INITIAL_KEYS;
  });

  const [orders, setOrders] = useState<TopUpOrder[]>(() => {
    const saved = localStorage.getItem('ff_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('ff_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem('ff_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ff_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ff_panels', JSON.stringify(panels));
  }, [panels]);

  useEffect(() => {
    localStorage.setItem('ff_keys', JSON.stringify(licenseKeys));
  }, [licenseKeys]);

  useEffect(() => {
    localStorage.setItem('ff_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ff_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('ff_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Currency helper
  const formatPrice = (amountUSD: number): string => {
    const curr = CURRENCIES.find(c => c.code === selectedCurrency) || CURRENCIES[0];
    const converted = amountUSD * curr.rateAgainstUSD;
    
    if (curr.code === 'USD' || curr.code === 'EUR') {
      return `${curr.symbol}${converted.toFixed(2)}`;
    }
    // For INR, BDT, PKR round cleanly
    return `${curr.symbol} ${Math.round(converted).toLocaleString()}`;
  };

  const convertUSDToLocal = (amountUSD: number): number => {
    const curr = CURRENCIES.find(c => c.code === selectedCurrency) || CURRENCIES[0];
    return Math.round(amountUSD * curr.rateAgainstUSD);
  };

  // Wallet Actions
  const deductWalletBalance = (amountUSD: number): boolean => {
    if (user.walletBalanceUSD >= amountUSD) {
      setUser(prev => ({
        ...prev,
        walletBalanceUSD: Number((prev.walletBalanceUSD - amountUSD).toFixed(2)),
        totalPurchases: prev.totalPurchases + 1
      }));
      return true;
    }
    return false;
  };

  const addWalletBalance = (amountUSD: number) => {
    setUser(prev => ({
      ...prev,
      walletBalanceUSD: Number((prev.walletBalanceUSD + amountUSD).toFixed(2))
    }));
  };

  const topUpWallet = async (
    amountUSD: number,
    method: PaymentMethodType,
    trxId: string,
    senderInfo: string
  ): Promise<TopUpOrder> => {
    const curr = CURRENCIES.find(c => c.code === selectedCurrency) || CURRENCIES[0];
    const newOrder: TopUpOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      userEmail: user.email,
      amountUSD,
      amountLocal: convertUSDToLocal(amountUSD),
      currency: curr.code,
      paymentMethod: method,
      transactionId: trxId,
      senderNumberOrAddress: senderInfo,
      createdAt: new Date().toISOString(),
      status: method === 'card' ? 'approved' : 'pending'
    };

    setOrders(prev => [newOrder, ...prev]);

    // Instant credit for card or direct test deposits
    if (method === 'card') {
      addWalletBalance(amountUSD);
      showToast(`Payment successful! $${amountUSD.toFixed(2)} added to your wallet.`, 'success');
    } else {
      showToast(`Deposit request submitted! Transaction ${trxId} queued for approval.`, 'info');
    }

    return newOrder;
  };

  // Panels CRUD
  const addPanel = (panelData: Omit<PanelItem, 'id' | 'totalSales' | 'rating' | 'lastUpdated'>) => {
    const newPanel: PanelItem = {
      ...panelData,
      id: `panel-${Date.now()}`,
      totalSales: 0,
      rating: 5.0,
      lastUpdated: 'Just now'
    };
    setPanels(prev => [newPanel, ...prev]);
    showToast(`New panel "${newPanel.name}" added successfully!`, 'success');
  };

  const updatePanel = (id: string, updates: Partial<PanelItem>) => {
    setPanels(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates, lastUpdated: 'Just now' } : p))
    );
    showToast(`Panel updated successfully!`, 'success');
  };

  const deletePanel = (id: string) => {
    setPanels(prev => prev.filter(p => p.id !== id));
    showToast(`Panel removed from inventory.`, 'info');
  };

  // Keys Engine
  const generateRandomKeyString = (prefix = 'FFVIP') => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const segment = (len: number) =>
      Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `${prefix}-${segment(4)}-${segment(4)}-${segment(4)}`;
  };

  const generateKey = (params: {
    panelId: string;
    duration: PlanDuration;
    count?: number;
    prefix?: string;
    customNote?: string;
    maxDevices?: number;
  }): LicenseKey[] => {
    const count = params.count || 1;
    const panel = panels.find(p => p.id === params.panelId) || panels[0];
    const prefix = params.prefix || panel.name.substring(0, 4).toUpperCase();
    
    const daysMap: Record<PlanDuration, number> = {
      '1day': 1,
      '7days': 7,
      '30days': 30,
      'lifetime': 9999
    };

    const newKeys: LicenseKey[] = [];
    for (let i = 0; i < count; i++) {
      const generated: LicenseKey = {
        id: `key-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
        key: generateRandomKeyString(prefix),
        panelId: panel.id,
        panelName: panel.name,
        duration: params.duration,
        durationDays: daysMap[params.duration],
        status: 'unused',
        createdAt: new Date().toISOString(),
        hwidResetsLeft: 3,
        maxDevices: params.maxDevices || 1,
        customNote: params.customNote || `Generated on ${new Date().toLocaleDateString()}`
      };
      newKeys.push(generated);
    }

    setLicenseKeys(prev => [...newKeys, ...prev]);
    showToast(`Generated ${count} new VIP license key(s)!`, 'success');
    return newKeys;
  };

  const purchaseKey = async (
    panelId: string,
    duration: PlanDuration,
    payWithWallet: boolean = true
  ): Promise<{ success: boolean; key?: LicenseKey; error?: string }> => {
    const panel = panels.find(p => p.id === panelId);
    if (!panel) return { success: false, error: 'Panel not found' };

    const plan = panel.plans.find(p => p.duration === duration);
    if (!plan) return { success: false, error: 'Plan duration invalid' };

    if (payWithWallet) {
      if (user.walletBalanceUSD < plan.priceUSD) {
        return {
          success: false,
          error: `Insufficient wallet balance ($${user.walletBalanceUSD.toFixed(2)}). Need $${plan.priceUSD.toFixed(2)}.`
        };
      }
      deductWalletBalance(plan.priceUSD);
    }

    // Generate immediate activated key for user
    const daysMap: Record<PlanDuration, number> = {
      '1day': 1,
      '7days': 7,
      '30days': 30,
      'lifetime': 9999
    };
    const days = daysMap[duration];
    const now = new Date();
    const expiresAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000).toISOString();

    // Attempt upstream Reseller API sync
    let upstreamKeyString: string | null = null;
    try {
      const durationLabelMap: Record<PlanDuration, string> = {
        '1day': '1 Day',
        '7days': '7 Days',
        '30days': '30 Days',
        'lifetime': 'Lifetime'
      };

      const res = await fetch('/api/reseller/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: panel.id.toUpperCase().replace('-', '_'),
          duration: durationLabelMap[duration],
          android_id: '0b9b969bc2e7997b'
        })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data && (json.data.key || json.data.license_key || json.data.serial)) {
          upstreamKeyString = json.data.key || json.data.license_key || json.data.serial;
        }
      }
    } catch {
      // Continue with standard local key generation if upstream is offline
    }

    const newKey: LicenseKey = {
      id: `key-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      key: upstreamKeyString || generateRandomKeyString(panel.name.substring(0, 4).toUpperCase()),
      panelId: panel.id,
      panelName: panel.name,
      duration,
      durationDays: days,
      status: 'active',
      createdAt: now.toISOString(),
      activatedAt: now.toISOString(),
      expiresAt: duration === 'lifetime' ? undefined : expiresAt,
      hwid: `HWID-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      hwidResetsLeft: 3,
      maxDevices: 1,
      boundUserEmail: user.email,
      customNote: `Purchased by ${user.username}`
    };

    setLicenseKeys(prev => [newKey, ...prev]);
    
    // Update panel total sales
    setPanels(prev =>
      prev.map(p => (p.id === panelId ? { ...p, totalSales: p.totalSales + 1 } : p))
    );

    setUser(prev => ({
      ...prev,
      keysCount: prev.keysCount + 1
    }));

    showToast(`🎉 Congratulations! ${panel.name} (${plan.label}) key unlocked.`, 'success');
    return { success: true, key: newKey };
  };

  const resetHWID = (keyId: string): { success: boolean; message: string } => {
    let success = false;
    let message = '';

    setLicenseKeys(prev =>
      prev.map(k => {
        if (k.id === keyId) {
          if (k.hwidResetsLeft > 0) {
            success = true;
            message = `HWID reset successful! ${k.hwidResetsLeft - 1} resets remaining this month.`;
            return {
              ...k,
              hwid: undefined,
              hwidResetsLeft: k.hwidResetsLeft - 1
            };
          } else {
            message = 'No HWID resets left for this key. Please contact admin.';
            return k;
          }
        }
        return k;
      })
    );

    showToast(message, success ? 'success' : 'error');
    return { success, message };
  };

  const extendKeyDuration = (keyId: string, additionalDays: number) => {
    setLicenseKeys(prev =>
      prev.map(k => {
        if (k.id === keyId) {
          const currentExpiry = k.expiresAt ? new Date(k.expiresAt) : new Date();
          const baseTime = currentExpiry > new Date() ? currentExpiry.getTime() : Date.now();
          const newExpiry = new Date(baseTime + additionalDays * 24 * 60 * 60 * 1000).toISOString();
          return {
            ...k,
            status: 'active',
            expiresAt: newExpiry
          };
        }
        return k;
      })
    );
    showToast(`Key extended by +${additionalDays} days.`, 'success');
  };

  const toggleKeyStatus = (keyId: string, newStatus: 'active' | 'banned' | 'unused' | 'expired') => {
    setLicenseKeys(prev =>
      prev.map(k => (k.id === keyId ? { ...k, status: newStatus } : k))
    );
    showToast(`Key status changed to ${newStatus.toUpperCase()}`, 'info');
  };

  const deleteKey = (keyId: string) => {
    setLicenseKeys(prev => prev.filter(k => k.id !== keyId));
    showToast(`Key deleted from database.`, 'info');
  };

  const validateKey = (keyString: string) => {
    const cleaned = keyString.trim().toUpperCase();
    const foundKey = licenseKeys.find(k => k.key.toUpperCase() === cleaned);
    if (!foundKey) {
      return { found: false, error: 'License key does not exist or has been removed.' };
    }
    const panel = panels.find(p => p.id === foundKey.panelId);
    return { found: true, key: foundKey, panel };
  };

  // Admin Order Approvals
  const approveOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: 'approved' } : o))
    );

    // If order matches user email, credit wallet
    if (order.userEmail === user.email) {
      addWalletBalance(order.amountUSD);
    }
    showToast(`Order ${orderId} approved! $${order.amountUSD} credited to customer.`, 'success');
  };

  const rejectOrder = (orderId: string, reason: string) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: 'rejected', rejectionReason: reason } : o))
    );
    showToast(`Order ${orderId} rejected.`, 'info');
  };

  // Announcements
  const addAnnouncement = (data: Omit<Announcement, 'id' | 'date'>) => {
    const newAnn: Announcement = {
      ...data,
      id: `ann-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    showToast('Announcement broadcasted to all users.', 'success');
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const toggleAnnouncement = (id: string) => {
    setAnnouncements(prev =>
      prev.map(a => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  // Reviews
  const addReview = (panelId: string, rating: number, comment: string) => {
    const panel = panels.find(p => p.id === panelId);
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      userName: user.username,
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      panelId,
      panelName: panel?.name || 'VIP Panel',
      rating,
      comment,
      date: 'Just now',
      verifiedPurchase: true
    };
    setReviews(prev => [newRev, ...prev]);
    showToast('Thank you! Your feedback has been published.', 'success');
  };

  const callResellerApi = async (params: {
    productId: string;
    duration: string;
    androidId?: string;
  }) => {
    try {
      const res = await fetch('/api/reseller/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: params.productId,
          duration: params.duration,
          android_id: params.androidId || '0b9b969bc2e7997b'
        })
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  return (
    <StoreContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        activeNav,
        setActiveNav,
        selectedCurrency,
        setSelectedCurrency,
        currencies: CURRENCIES,
        formatPrice,
        convertUSDToLocal,
        user,
        topUpWallet,
        deductWalletBalance,
        addWalletBalance,
        panels,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        addPanel,
        updatePanel,
        deletePanel,
        licenseKeys,
        generateKey,
        purchaseKey,
        resetHWID,
        extendKeyDuration,
        toggleKeyStatus,
        deleteKey,
        validateKey,
        orders,
        approveOrder,
        rejectOrder,
        announcements,
        addAnnouncement,
        deleteAnnouncement,
        toggleAnnouncement,
        reviews,
        addReview,
        callResellerApi,
        toastMessage,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
