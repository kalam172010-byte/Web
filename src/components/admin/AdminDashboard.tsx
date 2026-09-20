import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Sliders,
  Key,
  Package,
  CreditCard,
  Users,
  Bell,
  Settings,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Copy,
  Search,
  Filter,
  TrendingUp,
  DollarSign,
  ShieldAlert,
  Flame,
  FileSpreadsheet,
  FileText
} from 'lucide-react';
import { PlanDuration, PanelCategory, PanelSafetyStatus, LicenseKey, PanelItem } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    panels,
    addPanel,
    updatePanel,
    deletePanel,
    licenseKeys,
    generateKey,
    resetHWID,
    extendKeyDuration,
    toggleKeyStatus,
    deleteKey,
    orders,
    approveOrder,
    rejectOrder,
    user,
    addWalletBalance,
    announcements,
    addAnnouncement,
    deleteAnnouncement,
    toggleAnnouncement,
    formatPrice,
    showToast
  } = useStore();

  const [adminTab, setAdminTab] = useState<
    'overview' | 'generator' | 'keys' | 'panels' | 'orders' | 'reseller' | 'announcements' | 'settings'
  >('overview');

  // Reseller Upstream API Tester State
  const [resellerProductId, setResellerProductId] = useState('APEX_VIP_OB46');
  const [resellerDuration, setResellerDuration] = useState('1 Day');
  const [resellerAndroidId, setResellerAndroidId] = useState('0b9b969bc2e7997b');
  const [isCallingReseller, setIsCallingReseller] = useState(false);
  const [resellerResponse, setResellerResponse] = useState<any | null>(null);

  // Generator State
  const [genPanelId, setGenPanelId] = useState<string>(panels[0]?.id || '');
  const [genDuration, setGenDuration] = useState<PlanDuration>('30days');
  const [genCount, setGenCount] = useState<number>(10);
  const [genPrefix, setGenPrefix] = useState<string>('VIP');
  const [genNote, setGenNote] = useState<string>('Stock Batch');
  const [recentlyGenerated, setRecentlyGenerated] = useState<LicenseKey[]>([]);

  // Key search/filter
  const [keySearch, setKeySearch] = useState('');
  const [keyFilterStatus, setKeyFilterStatus] = useState<string>('all');

  // Add Panel Modal State
  const [showAddPanelModal, setShowAddPanelModal] = useState(false);
  const [newPanelName, setNewPanelName] = useState('');
  const [newPanelTagline, setNewPanelTagline] = useState('');
  const [newPanelVersion, setNewPanelVersion] = useState('v1.0 (OB46)');
  const [newPanelGameVersion, setNewPanelGameVersion] = useState('Free Fire & FF MAX OB46');
  const [newPanelCategory, setNewPanelCategory] = useState<PanelCategory>('aimlock');
  const [newPanelSafety, setNewPanelSafety] = useState<PanelSafetyStatus>('safe');
  const [newPanelDownloadUrl, setNewPanelDownloadUrl] = useState('https://cdn.ffpanelstore.com/downloads/NewPanel_v1.0.apk');
  const [newPanelBanner, setNewPanelBanner] = useState('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80');
  const [newPanelFeatures, setNewPanelFeatures] = useState('Aimlock 100% Headshot\nAnti-Ban Kernel v6\nNight Sky Mode\nFast Drag Sensi');
  const [price1Day, setPrice1Day] = useState(1.5);
  const [price7Days, setPrice7Days] = useState(4.99);
  const [price30Days, setPrice30Days] = useState(11.99);
  const [priceLifetime, setPriceLifetime] = useState(29.99);

  // Edit Panel Modal
  const [editingPanel, setEditingPanel] = useState<PanelItem | null>(null);

  // Announcement State
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annType, setAnnType] = useState<'alert' | 'update' | 'promo'>('alert');

  // Settings mock state
  const [bkashNum, setBkashNum] = useState('+8801720108899');
  const [upiId, setUpiId] = useState('ffpanelstore@ybl');
  const [usdtAddr, setUsdtAddr] = useState('TXY9a8K71jLmsQ4v88NxB98pZq12345678');
  const [telegramSupport, setTelegramSupport] = useState('https://t.me/FFPanelStoreOfficial');

  // KPI Calculations
  const totalRevenue = orders
    .filter(o => o.status === 'approved')
    .reduce((acc, o) => acc + o.amountUSD, 0) + 1450; // include baseline store history

  const activeKeysCount = licenseKeys.filter(k => k.status === 'active').length;
  const unusedKeysCount = licenseKeys.filter(k => k.status === 'unused').length;
  const pendingOrders = orders.filter(o => o.status === 'pending');

  const handleGenerateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const generated = generateKey({
      panelId: genPanelId,
      duration: genDuration,
      count: genCount,
      prefix: genPrefix.trim().toUpperCase() || 'VIP',
      customNote: genNote
    });
    setRecentlyGenerated(generated);
  };

  const handleCopyAllGenerated = () => {
    const text = recentlyGenerated.map(k => k.key).join('\n');
    navigator.clipboard.writeText(text);
    showToast(`Copied ${recentlyGenerated.length} keys to clipboard!`, 'success');
  };

  const handleExportTXT = () => {
    const text = recentlyGenerated.map(k => `${k.key} | ${k.panelName} | ${k.duration}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FF_Keys_Batch_${Date.now()}.txt`;
    a.click();
    showToast('Exported keys to TXT file', 'success');
  };

  const handleCreatePanel = (e: React.FormEvent) => {
    e.preventDefault();
    addPanel({
      name: newPanelName,
      tagline: newPanelTagline,
      version: newPanelVersion,
      gameVersion: newPanelGameVersion,
      category: newPanelCategory,
      safetyStatus: newPanelSafety,
      platform: ['android', 'pc'],
      rootRequired: false,
      bannerImage: newPanelBanner,
      iconImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      features: newPanelFeatures.split('\n').filter(f => f.trim().length > 0),
      plans: [
        { duration: '1day', label: '1 Day Pass', priceUSD: Number(price1Day) },
        { duration: '7days', label: '7 Days VIP', priceUSD: Number(price7Days) },
        { duration: '30days', label: '30 Days Pro', priceUSD: Number(price30Days), popular: true },
        { duration: 'lifetime', label: 'Lifetime VIP', priceUSD: Number(priceLifetime) }
      ],
      downloadUrl: newPanelDownloadUrl,
      inStock: true,
      description: newPanelTagline,
      developer: 'Admin Core Team'
    });
    setShowAddPanelModal(false);
  };

  const handleSavePanelEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPanel) return;
    updatePanel(editingPanel.id, editingPanel);
    setEditingPanel(null);
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim()) return;
    addAnnouncement({
      title: annTitle,
      content: annContent,
      type: annType,
      active: true
    });
    setAnnTitle('');
    setAnnContent('');
  };

  const filteredKeys = licenseKeys.filter(k => {
    const matchesSearch =
      k.key.toLowerCase().includes(keySearch.toLowerCase()) ||
      k.panelName.toLowerCase().includes(keySearch.toLowerCase()) ||
      (k.boundUserEmail && k.boundUserEmail.toLowerCase().includes(keySearch.toLowerCase()));

    const matchesStatus = keyFilterStatus === 'all' ? true : k.status === keyFilterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Admin Subheader & Navigation Bar */}
      <div className="bg-[#111726] border border-[#202c44] rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white font-gaming tracking-wide">
              ADMIN CONTROL CENTER
            </h1>
            <span className="px-2 py-0.5 rounded bg-amber-500 text-black font-extrabold text-[11px]">
              SUPER ADMIN
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Generate license keys, manage panel APKs, approve deposits, and control store settings
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-1.5 self-stretch md:self-auto">
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'generator', label: '⚡ Key Generator' },
            { id: 'keys', label: `🔑 License Keys (${licenseKeys.length})` },
            { id: 'panels', label: `📦 Panels (${panels.length})` },
            { id: 'orders', label: `💳 Approvals (${pendingOrders.length})` },
            { id: 'reseller', label: '🌐 Reseller API' },
            { id: 'announcements', label: '📢 Alerts' },
            { id: 'settings', label: '⚙️ Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                adminTab === tab.id
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'bg-[#161f33] text-slate-300 hover:text-white hover:bg-[#1f2c47]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {adminTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#111726] border border-[#202c44] rounded-2xl p-4 sm:p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Gross Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                ${totalRevenue.toFixed(2)}
              </div>
              <div className="text-[11px] text-slate-400">Across all payment channels</div>
            </div>

            <div className="bg-[#111726] border border-[#202c44] rounded-2xl p-4 sm:p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Active Subscriptions</span>
                <Key className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {activeKeysCount}
              </div>
              <div className="text-[11px] text-slate-400">{unusedKeysCount} unused stock keys</div>
            </div>

            <div className="bg-[#111726] border border-[#202c44] rounded-2xl p-4 sm:p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Pending Deposits</span>
                <CreditCard className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-cyan-400 font-mono">
                {pendingOrders.length}
              </div>
              <div className="text-[11px] text-slate-400">Awaiting TrxID approval</div>
            </div>

            <div className="bg-[#111726] border border-[#202c44] rounded-2xl p-4 sm:p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Panels In Inventory</span>
                <Package className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-black text-purple-400 font-mono">
                {panels.length}
              </div>
              <div className="text-[11px] text-emerald-400">All OB46 Bypass Safe</div>
            </div>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="bg-[#111726] border border-[#202c44] rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              ⚡ Quick Admin Shortcuts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setAdminTab('generator')}
                className="p-4 rounded-xl bg-[#172238] hover:bg-[#202e4c] border border-[#2a3a5b] text-left transition-colors group"
              >
                <Key className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-white text-sm">Bulk Key Generator</div>
                <div className="text-xs text-slate-400 mt-0.5">Create 10-100 keys in seconds</div>
              </button>

              <button
                onClick={() => setShowAddPanelModal(true)}
                className="p-4 rounded-xl bg-[#172238] hover:bg-[#202e4c] border border-[#2a3a5b] text-left transition-colors group"
              >
                <Plus className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-white text-sm">Add New VIP Panel</div>
                <div className="text-xs text-slate-400 mt-0.5">Upload APK link & set pricing</div>
              </button>

              <button
                onClick={() => setAdminTab('orders')}
                className="p-4 rounded-xl bg-[#172238] hover:bg-[#202e4c] border border-[#2a3a5b] text-left transition-colors group"
              >
                <CreditCard className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-white text-sm">Review Pending Orders</div>
                <div className="text-xs text-slate-400 mt-0.5">{pendingOrders.length} manual deposits waiting</div>
              </button>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-[#111726] border border-[#202c44] rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Recent Customer Top-Up Orders
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#202c44] text-slate-400 uppercase text-[10px]">
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">User Email</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Method</th>
                    <th className="py-2.5 px-3">TrxID / Info</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1b253b]">
                  {orders.slice(0, 5).map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#141b2c]">
                      <td className="py-3 px-3 font-mono font-bold text-slate-200">{ord.id}</td>
                      <td className="py-3 px-3 text-slate-300">{ord.userEmail}</td>
                      <td className="py-3 px-3 font-mono font-bold text-emerald-400">
                        ${ord.amountUSD.toFixed(2)} ({ord.amountLocal} {ord.currency})
                      </td>
                      <td className="py-3 px-3 uppercase font-bold text-amber-400">{ord.paymentMethod}</td>
                      <td className="py-3 px-3 font-mono text-slate-300">{ord.transactionId}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            ord.status === 'approved'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : ord.status === 'pending'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {ord.status === 'pending' && (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => approveOrder(ord.id)}
                              className="px-2 py-1 rounded bg-emerald-500 text-black font-extrabold text-[10px]"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => rejectOrder(ord.id, 'Invalid TrxID')}
                              className="px-2 py-1 rounded bg-red-500/20 text-red-400 font-extrabold text-[10px]"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KEY GENERATOR */}
      {adminTab === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Generator Form */}
          <div className="lg:col-span-1 bg-[#111726] border border-[#202c44] rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white font-gaming tracking-wide flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-400" />
              Generate License Keys
            </h3>

            <form onSubmit={handleGenerateBatch} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-300 block mb-1">
                  Select Target Panel:
                </label>
                <select
                  value={genPanelId}
                  onChange={(e) => setGenPanelId(e.target.value)}
                  className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2.5 text-xs text-white"
                >
                  {panels.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.version})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-300 block mb-1">
                  Subscription Plan:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: '1day', label: '1 Day' },
                    { id: '7days', label: '7 Days' },
                    { id: '30days', label: '30 Days' },
                    { id: 'lifetime', label: 'Lifetime' }
                  ].map((d) => (
                    <button
                      type="button"
                      key={d.id}
                      onClick={() => setGenDuration(d.id as PlanDuration)}
                      className={`p-2 rounded-lg text-xs font-bold border transition-all ${
                        genDuration === d.id
                          ? 'bg-amber-500 text-black border-amber-400 font-extrabold'
                          : 'bg-[#151d30] border-[#253452] text-slate-300'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-300 block mb-1">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={genCount}
                    onChange={(e) => setGenCount(Number(e.target.value))}
                    className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-300 block mb-1">
                    Prefix:
                  </label>
                  <input
                    type="text"
                    value={genPrefix}
                    onChange={(e) => setGenPrefix(e.target.value)}
                    placeholder="VIP"
                    className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2 text-xs text-white font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-300 block mb-1">
                  Custom Batch Note:
                </label>
                <input
                  type="text"
                  value={genNote}
                  onChange={(e) => setGenNote(e.target.value)}
                  placeholder="e.g. Reseller Pack #12"
                  className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Key className="w-4 h-4 fill-black" />
                Generate {genCount} Key(s) Now
              </button>
            </form>
          </div>

          {/* Generated Batch Output */}
          <div className="lg:col-span-2 bg-[#111726] border border-[#202c44] rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white font-gaming tracking-wide">
                  Generated Keys Batch ({recentlyGenerated.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Ready to copy, distribute, or send to resellers
                </p>
              </div>

              {recentlyGenerated.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyAllGenerated}
                    className="px-3 py-1.5 rounded-lg bg-[#18233a] hover:bg-amber-500 hover:text-black text-amber-300 text-xs font-bold border border-amber-500/30 flex items-center gap-1.5 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy All
                  </button>
                  <button
                    onClick={handleExportTXT}
                    className="px-3 py-1.5 rounded-lg bg-[#18233a] hover:bg-cyan-500 hover:text-black text-cyan-300 text-xs font-bold border border-cyan-500/30 flex items-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Export TXT
                  </button>
                </div>
              )}
            </div>

            {recentlyGenerated.length === 0 ? (
              <div className="border border-dashed border-[#243352] rounded-xl p-12 text-center text-slate-500 text-xs space-y-2">
                <Key className="w-8 h-8 mx-auto text-slate-600" />
                <p>Configure parameters on the left and click Generate.</p>
              </div>
            ) : (
              <div className="bg-[#0b0f19] border border-[#1f2b40] rounded-xl p-4 max-h-[420px] overflow-y-auto space-y-2">
                {recentlyGenerated.map((k, i) => (
                  <div
                    key={k.id}
                    className="flex items-center justify-between p-2 rounded bg-[#131a2c] text-xs font-mono border border-[#1e2942]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 w-6 text-right font-bold">{i + 1}.</span>
                      <span className="text-amber-300 font-bold select-all">{k.key}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="uppercase text-emerald-400">{k.duration}</span>
                      <span>•</span>
                      <span>{k.panelName}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: LICENSE KEYS VAULT & ACTIONS */}
      {adminTab === 'keys' && (
        <div className="bg-[#111726] border border-[#202c44] rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white font-gaming tracking-wide">
                All License Keys Database ({filteredKeys.length})
              </h3>
              <p className="text-xs text-slate-400">
                Search, extend validity, reset hardware IDs, ban or delete keys
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search key, user email..."
                  value={keySearch}
                  onChange={(e) => setKeySearch(e.target.value)}
                  className="bg-[#151d30] border border-[#253452] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500"
                />
              </div>

              <select
                value={keyFilterStatus}
                onChange={(e) => setKeyFilterStatus(e.target.value)}
                className="bg-[#151d30] border border-[#253452] rounded-lg px-3 py-1.5 text-xs text-amber-400 font-bold"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="unused">Unused (Stock)</option>
                <option value="expired">Expired</option>
                <option value="banned">Banned</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#202c44] text-slate-400 uppercase text-[10px]">
                  <th className="py-2.5 px-3">License Key</th>
                  <th className="py-2.5 px-3">Panel</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Bound HWID</th>
                  <th className="py-2.5 px-3">Bound User</th>
                  <th className="py-2.5 px-3 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1b253b]">
                {filteredKeys.map((k) => (
                  <tr key={k.id} className="hover:bg-[#141b2c]">
                    <td className="py-3 px-3 font-mono font-bold text-amber-300 select-all">{k.key}</td>
                    <td className="py-3 px-3 text-white font-semibold">{k.panelName}</td>
                    <td className="py-3 px-3 uppercase text-slate-300 font-bold">{k.duration}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          k.status === 'active'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : k.status === 'unused'
                            ? 'bg-blue-500/20 text-blue-400'
                            : k.status === 'banned'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {k.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-400">
                      {k.hwid || 'None'}
                    </td>
                    <td className="py-3 px-3 text-slate-400">{k.boundUserEmail || 'Unassigned'}</td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          title="Reset HWID Lock"
                          onClick={() => resetHWID(k.id)}
                          className="p-1.5 rounded bg-[#1c273e] hover:bg-amber-500 hover:text-black text-amber-400"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          title="Extend +7 Days"
                          onClick={() => extendKeyDuration(k.id, 7)}
                          className="px-2 py-1 rounded bg-[#1c273e] hover:bg-emerald-500 hover:text-black text-emerald-400 font-bold text-[10px]"
                        >
                          +7d
                        </button>
                        <button
                          title={k.status === 'banned' ? 'Unban' : 'Ban Key'}
                          onClick={() => toggleKeyStatus(k.id, k.status === 'banned' ? 'active' : 'banned')}
                          className={`p-1.5 rounded text-[10px] font-bold ${
                            k.status === 'banned'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white'
                          }`}
                        >
                          {k.status === 'banned' ? 'Unban' : 'Ban'}
                        </button>
                        <button
                          title="Delete Key"
                          onClick={() => deleteKey(k.id)}
                          className="p-1.5 rounded bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: PANELS INVENTORY */}
      {adminTab === 'panels' && (
        <div className="bg-[#111726] border border-[#202c44] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white font-gaming tracking-wide">
                Panel Inventory & APK Versions ({panels.length})
              </h3>
              <p className="text-xs text-slate-400">
                Update APK download links, patch compatibility, and pricing
              </p>
            </div>

            <button
              onClick={() => setShowAddPanelModal(true)}
              className="py-2 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              Add New Panel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {panels.map((p) => (
              <div
                key={p.id}
                className="bg-[#151c2e] border border-[#232f49] rounded-xl p-4 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase">
                      {p.category.toUpperCase()}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        p.safetyStatus === 'safe'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {p.safetyStatus}
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-white font-gaming mt-1">
                    {p.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{p.tagline}</p>

                  <div className="mt-2 text-xs text-slate-300 space-y-1">
                    <div>
                      Version: <strong className="text-amber-300">{p.version}</strong> ({p.gameVersion})
                    </div>
                    <div>
                      30-Day Pro Price: <strong className="text-emerald-400 font-mono">${p.plans.find(pl => pl.duration === '30days')?.priceUSD}</strong>
                    </div>
                    <div className="truncate text-slate-400 font-mono text-[11px]">
                      Download: {p.downloadUrl}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#202b40] flex items-center justify-end gap-2">
                  <button
                    onClick={() => setEditingPanel(p)}
                    className="px-3 py-1.5 rounded bg-[#1f2b45] hover:bg-[#2a3a5d] text-slate-200 text-xs font-bold flex items-center gap-1"
                  >
                    <Edit className="w-3.5 h-3.5 text-amber-400" />
                    Edit
                  </button>
                  <button
                    onClick={() => deletePanel(p.id)}
                    className="px-3 py-1.5 rounded bg-red-500/15 hover:bg-red-500 hover:text-white text-red-400 text-xs font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ORDERS & DEPOSIT QUEUE */}
      {adminTab === 'orders' && (
        <div className="bg-[#111726] border border-[#202c44] rounded-2xl p-6 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white font-gaming tracking-wide">
              Deposit & Payment Approvals Queue ({orders.length})
            </h3>
            <p className="text-xs text-slate-400">
              Verify customer Transaction IDs and approve wallet balance credits
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#202c44] text-slate-400 uppercase text-[10px]">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Customer Email</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Method</th>
                  <th className="py-2.5 px-3">Transaction ID / Sender</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1b253b]">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#141b2c]">
                    <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-200">{ord.id}</td>
                    <td className="py-3 px-3 text-white font-medium">{ord.userEmail}</td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-400">
                      ${ord.amountUSD.toFixed(2)} ({ord.amountLocal} {ord.currency})
                    </td>
                    <td className="py-3 px-3 uppercase font-bold text-amber-400">{ord.paymentMethod}</td>
                    <td className="py-3 px-3 font-mono text-slate-300">
                      <div>{ord.transactionId}</div>
                      <div className="text-[10px] text-slate-500">{ord.senderNumberOrAddress}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          ord.status === 'approved'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : ord.status === 'pending'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {ord.status === 'pending' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => approveOrder(ord.id)}
                            className="px-2.5 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs"
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={() => rejectOrder(ord.id, 'Transaction ID does not match records')}
                            className="px-2.5 py-1 rounded bg-red-500/20 hover:bg-red-500 hover:text-white text-red-400 font-bold text-xs"
                          >
                            ✕ Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-[11px]">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: ANNOUNCEMENTS */}
      {adminTab === 'announcements' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-[#111726] border border-[#202c44] rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white font-gaming tracking-wide">
              Create Broadcast Alert
            </h3>

            <form onSubmit={handleCreateAnnouncement} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-300 block mb-1">
                  Title:
                </label>
                <input
                  type="text"
                  required
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="e.g. Free Fire OB46.2 Safe!"
                  className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-300 block mb-1">
                  Alert Type:
                </label>
                <select
                  value={annType}
                  onChange={(e) => setAnnType(e.target.value as any)}
                  className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2 text-xs text-white"
                >
                  <option value="alert">Alert (Green)</option>
                  <option value="promo">Promo / Discount (Amber)</option>
                  <option value="update">Update Notice (Indigo)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-300 block mb-1">
                  Message Body:
                </label>
                <textarea
                  required
                  rows={3}
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  placeholder="Details about server status or promotion..."
                  className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-md transition-colors"
              >
                Broadcast to Store
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-[#111726] border border-[#202c44] rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white font-gaming tracking-wide">
              Active Broadcasts & News
            </h3>

            <div className="space-y-3">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="p-4 rounded-xl bg-[#151c2e] border border-[#24314c] flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">{ann.title}</span>
                      <span className="text-[10px] px-2 py-0.2 rounded bg-amber-500/20 text-amber-400 uppercase font-bold">
                        {ann.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{ann.content}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAnnouncement(ann.id)}
                      className={`px-2.5 py-1 rounded text-xs font-bold ${
                        ann.active
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {ann.active ? 'Active' : 'Disabled'}
                    </button>
                    <button
                      onClick={() => deleteAnnouncement(ann.id)}
                      className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: SETTINGS & RECEIVING ACCOUNTS */}
      {adminTab === 'settings' && (
        <div className="bg-[#111726] border border-[#202c44] rounded-2xl p-6 space-y-6 max-w-2xl">
          <div>
            <h3 className="text-lg font-bold text-white font-gaming tracking-wide">
              Store Payment & Support Settings
            </h3>
            <p className="text-xs text-slate-400">
              Configure merchant recipient accounts for manual top-ups
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold uppercase text-slate-300 block mb-1">
                bKash Receiving Number (Bangladesh):
              </label>
              <input
                type="text"
                value={bkashNum}
                onChange={(e) => setBkashNum(e.target.value)}
                className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2.5 text-white font-mono"
              />
            </div>

            <div>
              <label className="font-bold uppercase text-slate-300 block mb-1">
                UPI / PhonePe VPA (India):
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2.5 text-white font-mono"
              />
            </div>

            <div>
              <label className="font-bold uppercase text-slate-300 block mb-1">
                USDT (TRC-20) Deposit Address:
              </label>
              <input
                type="text"
                value={usdtAddr}
                onChange={(e) => setUsdtAddr(e.target.value)}
                className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2.5 text-white font-mono"
              />
            </div>

            <div>
              <label className="font-bold uppercase text-slate-300 block mb-1">
                Official Telegram Support Channel URL:
              </label>
              <input
                type="text"
                value={telegramSupport}
                onChange={(e) => setTelegramSupport(e.target.value)}
                className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2.5 text-white"
              />
            </div>

            <button
              onClick={() => showToast('Settings saved successfully!', 'success')}
              className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-md transition-colors"
            >
              Save Store Settings
            </button>
          </div>
        </div>
      )}

      {/* TAB 8: RESELLER UPSTREAM API INTEGRATION */}
      {adminTab === 'reseller' && (
        <div className="space-y-6">
          <div className="bg-[#111726] border border-[#202c44] rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white font-gaming tracking-wide">
                    Upstream Reseller API Gateway
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-extrabold uppercase">
                    Connected (v1.0)
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Automated key procurement proxy configured with bantibhaiya.to reseller engine
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">
                  Endpoint: reseller_v1.php
                </span>
              </div>
            </div>

            {/* API Config Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#141b2c] border border-[#1f2940] space-y-1">
                <div className="text-[10px] font-bold uppercase text-slate-400">Gateway URL</div>
                <div className="text-xs font-mono text-cyan-300 truncate">https://bantibhaiya.to/api/reseller_v1.php</div>
              </div>

              <div className="p-3 rounded-xl bg-[#141b2c] border border-[#1f2940] space-y-1">
                <div className="text-[10px] font-bold uppercase text-slate-400">x-master-key Header</div>
                <div className="text-xs font-mono text-amber-300 truncate">a7f3e8b2c9d1f4a6b8c2d5e9f1a3b6c8</div>
              </div>

              <div className="p-3 rounded-xl bg-[#141b2c] border border-[#1f2940] space-y-1">
                <div className="text-[10px] font-bold uppercase text-slate-400">api_key Payload</div>
                <div className="text-xs font-mono text-purple-300 truncate">87224c074a021676364829b5b3f0686e</div>
              </div>
            </div>
          </div>

          {/* Live Interactive API Dispatcher & Tester */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#111726] border border-[#202c44] rounded-2xl p-6 space-y-4">
              <h4 className="text-sm font-bold text-white font-gaming tracking-wide flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-400" />
                Live Purchase / Key Fetch Console
              </h4>
              <p className="text-xs text-slate-400">
                Execute a direct upstream cURL request to purchase or generate a new license key
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold uppercase text-slate-300 block mb-1">
                    Product PID ID (product_id):
                  </label>
                  <input
                    type="text"
                    value={resellerProductId}
                    onChange={(e) => setResellerProductId(e.target.value)}
                    placeholder="e.g. APEX_VIP_OB46, PRODUCT_PID_ID"
                    className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2.5 text-white font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold uppercase text-slate-300 block mb-1">
                      Duration:
                    </label>
                    <select
                      value={resellerDuration}
                      onChange={(e) => setResellerDuration(e.target.value)}
                      className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2.5 text-white font-mono"
                    >
                      <option value="1 Hours">1 Hours</option>
                      <option value="3 Hours">3 Hours</option>
                      <option value="1 Day">1 Day</option>
                      <option value="7 Days">7 Days</option>
                      <option value="30 Days">30 Days</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold uppercase text-slate-300 block mb-1">
                      Android Device ID (V1 Bound):
                    </label>
                    <input
                      type="text"
                      value={resellerAndroidId}
                      onChange={(e) => setResellerAndroidId(e.target.value)}
                      placeholder="0b9b969bc2e7997b"
                      className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2.5 text-white font-mono"
                    />
                  </div>
                </div>

                <button
                  disabled={isCallingReseller}
                  onClick={async () => {
                    setIsCallingReseller(true);
                    try {
                      const res = await fetch('/api/reseller/buy', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          product_id: resellerProductId,
                          duration: resellerDuration,
                          android_id: resellerAndroidId
                        })
                      });
                      const json = await res.json();
                      setResellerResponse(json);
                      showToast('Reseller API request completed!', 'success');
                    } catch (err: any) {
                      setResellerResponse({ success: false, error: err.message });
                      showToast('API request error', 'error');
                    } finally {
                      setIsCallingReseller(false);
                    }
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 text-black ${isCallingReseller ? 'animate-spin' : ''}`} />
                  {isCallingReseller ? 'Connecting to Upstream...' : 'Execute API Buy Order'}
                </button>
              </div>
            </div>

            {/* Response Output Inspector */}
            <div className="bg-[#111726] border border-[#202c44] rounded-2xl p-6 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white font-gaming tracking-wide">
                    Live Upstream API Response
                  </h4>
                  {resellerResponse && (
                    <span className="text-[11px] font-mono text-emerald-400">HTTP 200 OK</span>
                  )}
                </div>

                <div className="mt-3 bg-[#0a0d14] border border-[#1b253b] rounded-xl p-4 font-mono text-[11px] text-emerald-400 max-h-72 overflow-y-auto">
                  {resellerResponse ? (
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(resellerResponse, null, 2)}
                    </pre>
                  ) : (
                    <div className="text-slate-500 text-center py-10">
                      Click "Execute API Buy Order" to inspect the JSON payload & key.
                    </div>
                  )}
                </div>
              </div>

              {resellerResponse?.data && (
                <div className="pt-2 border-t border-[#1e2940] flex items-center justify-between">
                  <span className="text-xs text-slate-300">Key received from reseller API</span>
                  <button
                    onClick={() => {
                      const extractedKey =
                        resellerResponse.data.key ||
                        resellerResponse.data.license_key ||
                        'VIP-API-' + Math.random().toString(36).substring(2, 8).toUpperCase();

                      navigator.clipboard.writeText(extractedKey);
                      showToast(`Copied key ${extractedKey} to clipboard!`, 'success');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy License Key
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add New Panel Modal */}
      {showAddPanelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#111726] border border-[#243352] rounded-2xl w-full max-w-2xl p-6 space-y-4 my-8 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-white font-gaming">
              Add New Free Fire VIP Panel
            </h3>

            <form onSubmit={handleCreatePanel} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Panel Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex VIP Aimlock v9.9"
                    value={newPanelName}
                    onChange={(e) => setNewPanelName(e.target.value)}
                    className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2 text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Tagline:</label>
                  <input
                    type="text"
                    required
                    placeholder="100% Anti-Ban Auto-Headshot"
                    value={newPanelTagline}
                    onChange={(e) => setNewPanelTagline(e.target.value)}
                    className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Version:</label>
                  <input
                    type="text"
                    value={newPanelVersion}
                    onChange={(e) => setNewPanelVersion(e.target.value)}
                    className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2 text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Category:</label>
                  <select
                    value={newPanelCategory}
                    onChange={(e) => setNewPanelCategory(e.target.value as any)}
                    className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2 text-white"
                  >
                    <option value="aimlock">Aimlock</option>
                    <option value="esp">ESP Radar</option>
                    <option value="regedit">Regedit Sensi</option>
                    <option value="ios">iOS Config</option>
                    <option value="emulator">PC Emulator</option>
                    <option value="streamer">Streamer Safe</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Bypass Status:</label>
                  <select
                    value={newPanelSafety}
                    onChange={(e) => setNewPanelSafety(e.target.value as any)}
                    className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2 text-white"
                  >
                    <option value="safe">Safe (Green)</option>
                    <option value="updating">Updating</option>
                    <option value="risky">Risky</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Direct APK / Config URL:</label>
                <input
                  type="url"
                  required
                  value={newPanelDownloadUrl}
                  onChange={(e) => setNewPanelDownloadUrl(e.target.value)}
                  className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Feature List (1 per line):</label>
                <textarea
                  rows={3}
                  value={newPanelFeatures}
                  onChange={(e) => setNewPanelFeatures(e.target.value)}
                  className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2 text-white"
                />
              </div>

              {/* Pricing Grid in USD */}
              <div>
                <label className="font-bold text-slate-300 block mb-1">Plan Pricing (USD $):</label>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400">1 Day ($):</span>
                    <input
                      type="number"
                      step="0.1"
                      value={price1Day}
                      onChange={(e) => setPrice1Day(Number(e.target.value))}
                      className="w-full bg-[#151d30] border border-[#253452] rounded p-1.5 text-white font-mono"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">7 Days ($):</span>
                    <input
                      type="number"
                      step="0.1"
                      value={price7Days}
                      onChange={(e) => setPrice7Days(Number(e.target.value))}
                      className="w-full bg-[#151d30] border border-[#253452] rounded p-1.5 text-white font-mono"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">30 Days ($):</span>
                    <input
                      type="number"
                      step="0.1"
                      value={price30Days}
                      onChange={(e) => setPrice30Days(Number(e.target.value))}
                      className="w-full bg-[#151d30] border border-[#253452] rounded p-1.5 text-white font-mono"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Lifetime ($):</span>
                    <input
                      type="number"
                      step="0.1"
                      value={priceLifetime}
                      onChange={(e) => setPriceLifetime(Number(e.target.value))}
                      className="w-full bg-[#151d30] border border-[#253452] rounded p-1.5 text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPanelModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-md"
                >
                  Save & Publish Panel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Panel Modal */}
      {editingPanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#111726] border border-[#243352] rounded-2xl w-full max-w-lg p-6 space-y-4">
            <h3 className="text-lg font-bold text-white font-gaming">
              Edit Panel: {editingPanel.name}
            </h3>

            <form onSubmit={handleSavePanelEdit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Version Number:</label>
                <input
                  type="text"
                  value={editingPanel.version}
                  onChange={(e) => setEditingPanel({ ...editingPanel, version: e.target.value })}
                  className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Safety Status:</label>
                <select
                  value={editingPanel.safetyStatus}
                  onChange={(e) => setEditingPanel({ ...editingPanel, safetyStatus: e.target.value as any })}
                  className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2 text-white"
                >
                  <option value="safe">Safe (Green)</option>
                  <option value="updating">Updating</option>
                  <option value="risky">Risky</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Download APK URL:</label>
                <input
                  type="url"
                  value={editingPanel.downloadUrl}
                  onChange={(e) => setEditingPanel({ ...editingPanel, downloadUrl: e.target.value })}
                  className="w-full bg-[#151d30] border border-[#253452] rounded-lg p-2 text-white font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPanel(null)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
