export type PanelCategory = 'aimlock' | 'esp' | 'regedit' | 'streamer' | 'emulator' | 'ios' | 'all';

export type PlanDuration = '1day' | '7days' | '30days' | 'lifetime';

export type PanelSafetyStatus = 'safe' | 'updating' | 'maintenance' | 'risky';

export interface PanelPlanPrice {
  duration: PlanDuration;
  label: string;
  priceUSD: number;
  popular?: boolean;
}

export interface PanelItem {
  id: string;
  name: string;
  tagline: string;
  version: string;
  gameVersion: string; // e.g. "OB46 / FF MAX"
  category: PanelCategory;
  safetyStatus: PanelSafetyStatus;
  platform: ('android' | 'ios' | 'pc')[];
  rootRequired: boolean;
  bannerImage: string;
  iconImage: string;
  features: string[];
  plans: PanelPlanPrice[];
  downloadUrl: string;
  videoTutorialUrl?: string;
  rating: number;
  totalSales: number;
  inStock: boolean;
  description: string;
  developer: string;
  lastUpdated: string;
}

export type KeyStatus = 'active' | 'unused' | 'expired' | 'banned';

export interface LicenseKey {
  id: string;
  key: string;
  panelId: string;
  panelName: string;
  duration: PlanDuration;
  durationDays: number;
  status: KeyStatus;
  createdAt: string;
  activatedAt?: string;
  expiresAt?: string;
  hwid?: string;
  hwidResetsLeft: number;
  maxDevices: number;
  boundUserEmail?: string;
  customNote?: string;
}

export type PaymentMethodType = 'bkash' | 'nagad' | 'upi' | 'jazzcash' | 'easypaisa' | 'usdt' | 'card' | 'wallet';

export interface PaymentGateway {
  id: PaymentMethodType;
  name: string;
  logo: string;
  category: 'mobile_banking' | 'crypto' | 'card' | 'wallet';
  instructions: string;
  accountNumber?: string;
  qrCodeUrl?: string;
  feePercent: number;
}

export type OrderStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export interface TopUpOrder {
  id: string;
  userEmail: string;
  amountUSD: number;
  amountLocal: number;
  currency: string;
  paymentMethod: PaymentMethodType;
  transactionId: string;
  senderNumberOrAddress: string;
  createdAt: string;
  status: OrderStatus;
  rejectionReason?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  walletBalanceUSD: number;
  isReseller: boolean;
  totalPurchases: number;
  joinedDate: string;
  keysCount: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'alert' | 'update' | 'promo' | 'maintenance';
  active: boolean;
  date: string;
  actionUrl?: string;
}

export interface ReviewItem {
  id: string;
  userName: string;
  userAvatar: string;
  panelId: string;
  panelName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export type CurrencyCode = 'USD' | 'INR' | 'BDT' | 'PKR' | 'BRL' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateAgainstUSD: number;
}
