import { PanelItem, LicenseKey, PaymentGateway, Announcement, ReviewItem, CurrencyConfig, UserProfile, TopUpOrder } from '../types';

export const CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rateAgainstUSD: 1 },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', rateAgainstUSD: 118 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateAgainstUSD: 84 },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', rateAgainstUSD: 278 },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', rateAgainstUSD: 5.5 },
  { code: 'EUR', symbol: '€', name: 'Euro', rateAgainstUSD: 0.92 }
];

export const INITIAL_PANELS: PanelItem[] = [
  {
    id: 'apex-vip-aimlock',
    name: 'Apex VIP Aimlock v9.8',
    tagline: '100% Anti-Blacklist Auto-Headshot & Drag Sensi for Main ID',
    version: 'v9.8.2 (OB46.2)',
    gameVersion: 'Free Fire & FF MAX OB46',
    category: 'aimlock',
    safetyStatus: 'safe',
    platform: ['android', 'pc'],
    rootRequired: false,
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    iconImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    features: [
      'AimLock 100% Headshot (FOV 120° / 360°)',
      'OB46 Anti-Ban Bypass Kernel v6',
      'White Body & Night Sky Mode',
      'Fast Weapon Switch & Auto Drag 99%',
      'No Recoil & High Damage Multiplier (CS/BR Rank Safe)',
      '1-Click Floating Menu Overlay',
      'Supports Android 10 to 15 (No Root / Root)'
    ],
    plans: [
      { duration: '1day', label: '1 Day Trial', priceUSD: 1.5 },
      { duration: '7days', label: '7 Days VIP', priceUSD: 4.99 },
      { duration: '30days', label: '30 Days Pro', priceUSD: 11.99, popular: true },
      { duration: 'lifetime', label: 'Lifetime VIP', priceUSD: 29.99 }
    ],
    downloadUrl: 'https://cdn.ffpanelstore.com/downloads/ApexVIP_v9.8_OB46.apk',
    videoTutorialUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    rating: 4.9,
    totalSales: 1420,
    inStock: true,
    description: 'The premier Free Fire VIP Panel trusted by competitive tournament players and grandmasters. Built with an ultra-low detection bypass engine that protects your account while providing unmatched aimlock accuracy and customizable sensitivity.',
    developer: 'Apex Team International',
    lastUpdated: 'Today'
  },
  {
    id: 'shadow-esp-injector',
    name: 'Shadow ESP & Radar Mod Menu',
    tagline: 'See Enemies Through Walls, Distance, Health & Weapon Radar',
    version: 'v4.5 (OB46)',
    gameVersion: 'FF Normal & MAX OB46',
    category: 'esp',
    safetyStatus: 'safe',
    platform: ['android'],
    rootRequired: false,
    bannerImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    iconImage: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=200&q=80',
    features: [
      'ESP Box 2D / 3D Grid & Skeleton Lines',
      'ESP Name, Distance (Meters), and HP Bar',
      'Loot & Airdrop Radar Scanner',
      'Ghost Invisible In CS Rank (Visual Safe)',
      'Custom Crosshair & FPS Optimizer (90/120 FPS)',
      'Safe Injected Floating Bubble with Hide Button'
    ],
    plans: [
      { duration: '1day', label: '1 Day Pass', priceUSD: 1.2 },
      { duration: '7days', label: '7 Days VIP', priceUSD: 3.99 },
      { duration: '30days', label: '30 Days Pro', priceUSD: 8.99, popular: true },
      { duration: 'lifetime', label: 'Lifetime VIP', priceUSD: 22.5 }
    ],
    downloadUrl: 'https://cdn.ffpanelstore.com/downloads/ShadowESP_v4.5.apk',
    rating: 4.8,
    totalSales: 980,
    inStock: true,
    description: 'Dominate every match with real-time tactical awareness. Shadow ESP renders smooth skeleton tracking and distance measurements with zero FPS drop even on budget 3GB RAM devices.',
    developer: 'Shadow Labs Studio',
    lastUpdated: 'Yesterday'
  },
  {
    id: 'ghost-regedit-ios',
    name: 'Ghost Regedit iOS VIP (No JB)',
    tagline: 'Exclusive iPhone / iPad DNS Profile & Config Injector',
    version: 'v3.2 iOS 18',
    gameVersion: 'iOS App Store Global OB46',
    category: 'ios',
    safetyStatus: 'safe',
    platform: ['ios'],
    rootRequired: false,
    bannerImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    iconImage: 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?auto=format&fit=crop&w=200&q=80',
    features: [
      'No Computer & No Jailbreak Required',
      'Direct Safari Mobile Config / DNS Install',
      '99.9% Red Numbers Auto-Drag Correction',
      'iPhone 11 to 16 Pro Max 120Hz ProMotion Ready',
      'Official Apple Signed Enterprise Certificate',
      'Anti-Revoke Protection v2'
    ],
    plans: [
      { duration: '7days', label: '7 Days iOS VIP', priceUSD: 6.99 },
      { duration: '30days', label: '30 Days Pro', priceUSD: 14.99, popular: true },
      { duration: 'lifetime', label: 'Lifetime VIP', priceUSD: 34.99 }
    ],
    downloadUrl: 'https://cdn.ffpanelstore.com/downloads/GhostRegedit_iOS_OB46.mobileconfig',
    rating: 4.95,
    totalSales: 830,
    inStock: true,
    description: 'Designed exclusively for iOS players seeking high precision headshot mechanics without needing a computer or risking Apple developer certificate revokes.',
    developer: 'Ghost Apple Elite',
    lastUpdated: '2 days ago'
  },
  {
    id: 'msi-bluestacks-panel',
    name: 'MSI & BlueStacks Bypass Master Pro',
    tagline: 'Full PC Emulator Matchmaking Bypass & Zero Recoil Script',
    version: 'v7.1 PC',
    gameVersion: 'Bluestacks 5 / MSI App Player 5.12',
    category: 'emulator',
    safetyStatus: 'safe',
    platform: ['pc'],
    rootRequired: false,
    bannerImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    iconImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=200&q=80',
    features: [
      'Emulator Matchmaking Bypass (Play in Mobile Lobbies)',
      '100% Fix Smart Keybinds Sticking Issue',
      'Custom X/Y DPI Precision Calibrator',
      'Anti-Blacklist 24-Hour Rank Grind Shield',
      'One-tap Fast Gloo Wall Macro & Emote Dance Loop',
      'Memory Injection with Virtual Guard 2026'
    ],
    plans: [
      { duration: '1day', label: '1 Day Pass', priceUSD: 2.0 },
      { duration: '7days', label: '7 Days VIP', priceUSD: 5.99 },
      { duration: '30days', label: '30 Days Pro', priceUSD: 13.99, popular: true },
      { duration: 'lifetime', label: 'Lifetime VIP', priceUSD: 32.0 }
    ],
    downloadUrl: 'https://cdn.ffpanelstore.com/downloads/MSI_Bypass_v7.1_Setup.exe',
    rating: 4.88,
    totalSales: 1150,
    inStock: true,
    description: 'The ultimate PC emulator tool to bypass emulator detection and match with mobile phone players. Features instant Gloo Wall macros and pixel-perfect drag sensitivity.',
    developer: 'Team BlueMSI Core',
    lastUpdated: 'Today'
  },
  {
    id: 'sensi-booster-ultra',
    name: 'Sensi Booster & DPI Overclock v4',
    tagline: 'Ultra Smooth 120FPS Touch Response & Micro Sensi Regedit',
    version: 'v4.0.1',
    gameVersion: 'All FF Versions',
    category: 'regedit',
    safetyStatus: 'safe',
    platform: ['android', 'ios'],
    rootRequired: false,
    bannerImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    iconImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=200&q=80',
    features: [
      'Touch Screen Sampling Rate Overclock (360Hz response)',
      'Device Specific Custom DPI Calculations',
      'Zero-Delay Weapon Firing Trigger',
      'Game Cache Booster & Thermal Lag Reducer',
      '100% Tournament Legal & Streamer Friendly'
    ],
    plans: [
      { duration: '7days', label: '7 Days VIP', priceUSD: 2.5 },
      { duration: '30days', label: '30 Days Pro', priceUSD: 5.99, popular: true },
      { duration: 'lifetime', label: 'Lifetime VIP', priceUSD: 14.99 }
    ],
    downloadUrl: 'https://cdn.ffpanelstore.com/downloads/SensiBooster_v4.apk',
    rating: 4.75,
    totalSales: 2100,
    inStock: true,
    description: 'Hardware optimization utility that fine-tunes touch sensitivity, stabilizes framerates, and eliminates micro-stutters during intense clutch battles.',
    developer: 'SensiCore Lab',
    lastUpdated: '3 days ago'
  },
  {
    id: 'streamer-ghost-vip',
    name: 'Streamer Ghost Mode VIP',
    tagline: 'Hidden Overlay For Live Streaming on YouTube & TikTok',
    version: 'v2.8 StreamSafe',
    gameVersion: 'OB46 FF & FF MAX',
    category: 'streamer',
    safetyStatus: 'safe',
    platform: ['android', 'pc'],
    rootRequired: false,
    bannerImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
    iconImage: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=200&q=80',
    features: [
      'Ghost Overlay (Invisible to Screen Recorder / OBS / Streamlabs)',
      'Only Visible to Player Glasses or Custom Layer',
      'Subtle Soft-Aim (Looks 100% Natural on Camera)',
      'Custom Watermark Blocker',
      'Quick Panic Button (Instantly wipe menu in 1 tap)'
    ],
    plans: [
      { duration: '7days', label: '7 Days VIP', priceUSD: 7.99 },
      { duration: '30days', label: '30 Days Pro', priceUSD: 17.99, popular: true },
      { duration: 'lifetime', label: 'Lifetime VIP', priceUSD: 44.99 }
    ],
    downloadUrl: 'https://cdn.ffpanelstore.com/downloads/StreamerGhost_v2.8.apk',
    rating: 4.96,
    totalSales: 620,
    inStock: true,
    description: 'Built specifically for content creators and live streamers. The overlay remains totally invisible to streaming software while giving the player full ESP and smooth soft-aim assistance.',
    developer: 'GhostStream Systems',
    lastUpdated: 'Yesterday'
  }
];

export const INITIAL_KEYS: LicenseKey[] = [
  {
    id: 'key-1',
    key: 'APEX-VIP-OB46-9921-X9K2',
    panelId: 'apex-vip-aimlock',
    panelName: 'Apex VIP Aimlock v9.8',
    duration: '30days',
    durationDays: 30,
    status: 'active',
    createdAt: '2026-09-10T10:30:00Z',
    activatedAt: '2026-09-10T11:00:00Z',
    expiresAt: '2026-10-10T11:00:00Z',
    hwid: 'HWID-98A7-B12C-44E9',
    hwidResetsLeft: 3,
    maxDevices: 1,
    boundUserEmail: 'kalam172010@gmail.com',
    customNote: 'Personal VIP Key'
  },
  {
    id: 'key-2',
    key: 'SHAD-ESP-PRO-4421-M8L1',
    panelId: 'shadow-esp-injector',
    panelName: 'Shadow ESP & Radar Mod Menu',
    duration: '7days',
    durationDays: 7,
    status: 'active',
    createdAt: '2026-09-15T08:20:00Z',
    activatedAt: '2026-09-15T09:00:00Z',
    expiresAt: '2026-09-22T09:00:00Z',
    hwid: 'HWID-77C1-D42E-99F2',
    hwidResetsLeft: 2,
    maxDevices: 1,
    boundUserEmail: 'kalam172010@gmail.com',
    customNote: '7-Day Tournament Pass'
  },
  {
    id: 'key-3',
    key: 'MSI-PC-LIFETIME-0081-V1X9',
    panelId: 'msi-bluestacks-panel',
    panelName: 'MSI & BlueStacks Bypass Master Pro',
    duration: 'lifetime',
    durationDays: 9999,
    status: 'active',
    createdAt: '2026-08-01T14:00:00Z',
    activatedAt: '2026-08-01T14:15:00Z',
    expiresAt: '2036-08-01T14:15:00Z',
    hwid: 'HWID-PC-55A1-9988-MSI5',
    hwidResetsLeft: 5,
    maxDevices: 1,
    boundUserEmail: 'kalam172010@gmail.com',
    customNote: 'Lifetime PC Pass'
  },
  {
    id: 'key-4',
    key: 'APEX-STOCK-0012-K7N2',
    panelId: 'apex-vip-aimlock',
    panelName: 'Apex VIP Aimlock v9.8',
    duration: '30days',
    durationDays: 30,
    status: 'unused',
    createdAt: '2026-09-18T12:00:00Z',
    hwidResetsLeft: 3,
    maxDevices: 1,
    customNote: 'Unsold Reseller Stock'
  },
  {
    id: 'key-5',
    key: 'GHOST-IOS-STOCK-5512-T9W4',
    panelId: 'ghost-regedit-ios',
    panelName: 'Ghost Regedit iOS VIP (No JB)',
    duration: '7days',
    durationDays: 7,
    status: 'unused',
    createdAt: '2026-09-18T15:00:00Z',
    hwidResetsLeft: 3,
    maxDevices: 1,
    customNote: 'Unsold iOS Stock'
  }
];

export const PAYMENT_GATEWAYS: PaymentGateway[] = [
  {
    id: 'bkash',
    name: 'bKash (Send Money / Merchant)',
    logo: '🇧🇩',
    category: 'mobile_banking',
    accountNumber: '+8801720108899 (Personal/Send Money)',
    instructions: '1. Open bKash app → Send Money\n2. Enter our number: 01720108899\n3. Put reference: FFSTORE\n4. Copy Transaction ID (TrxID) and paste below.',
    feePercent: 0
  },
  {
    id: 'nagad',
    name: 'Nagad (Send Money)',
    logo: '🇧🇩',
    category: 'mobile_banking',
    accountNumber: '+8801820107766 (Personal)',
    instructions: '1. Open Nagad app → Send Money\n2. Enter number: 01820107766\n3. Copy the 8-digit TxnID from confirmation SMS.',
    feePercent: 0
  },
  {
    id: 'upi',
    name: 'UPI / PhonePe / GPay / Paytm',
    logo: '🇮🇳',
    category: 'mobile_banking',
    accountNumber: 'ffpanelstore@ybl / 9876543210@paytm',
    instructions: '1. Scan QR code or pay to UPI ID: ffpanelstore@ybl\n2. Enter amount in INR\n3. Enter 12-digit UTR / Reference Number below.',
    feePercent: 0
  },
  {
    id: 'jazzcash',
    name: 'JazzCash / Easypaisa (PKR)',
    logo: '🇵🇰',
    category: 'mobile_banking',
    accountNumber: '+923001234567 (JazzCash / Easypaisa)',
    instructions: '1. Send payment via JazzCash or Easypaisa app\n2. Enter recipient: 03001234567\n3. Paste Transaction ID from SMS receipt.',
    feePercent: 0
  },
  {
    id: 'usdt',
    name: 'Crypto USDT (TRC-20 / BEP-20)',
    logo: '🌐',
    category: 'crypto',
    accountNumber: 'TXY9a8K71jLmsQ4v88NxB98pZq12345678 (TRC20)',
    instructions: '1. Send exact USDT amount on TRC-20 or Binance Pay\n2. Copy Transaction Hash (TxID) and submit below.',
    feePercent: 0
  },
  {
    id: 'card',
    name: 'Credit / Debit Card (Visa / Mastercard)',
    logo: '💳',
    category: 'card',
    instructions: 'Instant automated checkout. Keys are unlocked immediately upon payment verification.',
    feePercent: 2.5
  }
];

export const INITIAL_ORDERS: TopUpOrder[] = [
  {
    id: 'ORD-98214',
    userEmail: 'kalam172010@gmail.com',
    amountUSD: 20.0,
    amountLocal: 2360,
    currency: 'BDT',
    paymentMethod: 'bkash',
    transactionId: '9G7K2L8X19',
    senderNumberOrAddress: '01711223344',
    createdAt: '2026-09-18T18:45:00Z',
    status: 'approved'
  },
  {
    id: 'ORD-98215',
    userEmail: 'kalam172010@gmail.com',
    amountUSD: 15.0,
    amountLocal: 1260,
    currency: 'INR',
    paymentMethod: 'upi',
    transactionId: '425988172901',
    senderNumberOrAddress: 'rahul99@upi',
    createdAt: '2026-09-19T06:10:00Z',
    status: 'pending'
  },
  {
    id: 'ORD-98216',
    userEmail: 'gamer_pro_ff@gmail.com',
    amountUSD: 30.0,
    amountLocal: 30.0,
    currency: 'USDT',
    paymentMethod: 'usdt',
    transactionId: '0x8f7a9921b3304a9198cf',
    senderNumberOrAddress: 'TXY...789',
    createdAt: '2026-09-19T07:25:00Z',
    status: 'pending'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: '🟢 Free Fire OB46.2 Update Status: 100% Anti-Ban Safe!',
    content: 'All panels including Apex VIP v9.8, Shadow ESP, and Ghost Regedit have been updated for OB46 patch. All bypass engines are green and safe for Main IDs in BR and CS Rank.',
    type: 'alert',
    active: true,
    date: '2026-09-19'
  },
  {
    id: 'ann-2',
    title: '🔥 Flash Promo: Use Code "FFVIP20" for 20% Instant Discount',
    content: 'Get 20% off on all 30-Day and Lifetime license keys. Instant automatic key delivery right to your dashboard!',
    type: 'promo',
    active: true,
    date: '2026-09-18'
  },
  {
    id: 'ann-3',
    title: '⚡ Auto Key Delivery is Now 100% Instant via Wallet Balance',
    content: 'Top up your wallet via bKash, Nagad, UPI, or USDT for 0-second instant key generation and automatic HWID binding.',
    type: 'update',
    active: true,
    date: '2026-09-17'
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    userName: 'Tanvir_Gamer_FF',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
    panelId: 'apex-vip-aimlock',
    panelName: 'Apex VIP Aimlock v9.8',
    rating: 5,
    comment: 'Bro I pushed to Grandmaster 4 Stars in CS Rank with 0 ban! Sensi is so smooth like iPhone, drag headshot is crazy 99%.',
    date: '2 hours ago',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    userName: 'Rohit_Sharma_Sniper',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
    panelId: 'shadow-esp-injector',
    panelName: 'Shadow ESP & Radar Mod Menu',
    rating: 5,
    comment: 'Instant bKash payment verification, got key in 10 seconds. ESP location and skeleton line work smoothly without any lag on my Redmi Note 12.',
    date: 'Yesterday',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    userName: 'Alves_BR_Esports',
    userAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&q=80',
    panelId: 'ghost-regedit-ios',
    panelName: 'Ghost Regedit iOS VIP',
    rating: 5,
    comment: 'Best iOS panel without jailbreak! Safari mobileconfig profile setup was super easy with their video guide. 10/10 recommend.',
    date: '3 days ago',
    verifiedPurchase: true
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'usr-kalam',
  email: 'kalam172010@gmail.com',
  username: 'Kalam VIP',
  walletBalanceUSD: 24.50,
  isReseller: true,
  totalPurchases: 6,
  joinedDate: '2026-08-15',
  keysCount: 3
};
