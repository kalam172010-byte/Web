import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Download,
  Smartphone,
  Laptop,
  Apple,
  FileCode,
  ShieldCheck,
  ExternalLink,
  PackageCheck,
  Sparkles
} from 'lucide-react';

export const DownloadCenter: React.FC = () => {
  const { panels } = useStore();

  const additionalTools = [
    {
      id: 'tool-zarchiver',
      name: 'ZArchiver Pro (No Ads)',
      category: 'Utility',
      version: 'v1.0.8',
      size: '5.2 MB',
      description: 'Essential file extractor for copying OBB and injecting custom configs into /Android/obb/com.dts.freefireth/',
      url: 'https://cdn.ffpanelstore.com/tools/ZArchiver_Pro_v1.0.8.apk'
    },
    {
      id: 'tool-virtual-space',
      name: 'Virtual Android Space Pro 64-Bit',
      category: 'Sandbox Bypass',
      version: 'v3.4.1',
      size: '18.4 MB',
      description: 'Clones Free Fire in a secure virtual environment to prevent IMEI device bans and hardware flags.',
      url: 'https://cdn.ffpanelstore.com/tools/Virtual_Space_64bit.apk'
    },
    {
      id: 'tool-dns-regedit',
      name: 'iOS DNS Headshot Profile Config',
      category: 'iOS DNS',
      version: 'v2.1',
      size: '120 KB',
      description: 'Direct MobileConfig profile for iPhone/iPad. Install via Safari Settings with zero jailbreak.',
      url: 'https://cdn.ffpanelstore.com/tools/FF_DNS_Headshot_iOS.mobileconfig'
    },
    {
      id: 'tool-obb-cleaner',
      name: 'OB46 Cache & Log Cleaner',
      category: 'Anti-Blacklist',
      version: 'v4.0',
      size: '2.1 MB',
      description: '1-tap memory cache wiper to clear crash logs before tournament and rank push sessions.',
      url: 'https://cdn.ffpanelstore.com/tools/FF_Cache_Cleaner.apk'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#131b2e] via-[#17223b] to-[#131b2e] border border-[#23314e] rounded-2xl p-6 sm:p-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
          <Download className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-gaming tracking-wide">
          OFFICIAL FREE FIRE <span className="text-cyan-400">DOWNLOAD CENTER</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
          Download the latest OB46.2 tested APKs, iOS profiles, PC emulator wrappers, and helper tools.
          All files are scanned with VirusTotal and verified 100% clean.
        </p>
      </div>

      {/* VIP Panel APKs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white font-gaming tracking-wide flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-amber-400" />
            VIP Mod Panels & Injectors (Latest Builds)
          </h2>
          <span className="text-xs text-emerald-400 font-semibold">🟢 All Mirrors Live</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {panels.map((panel) => (
            <div
              key={panel.id}
              className="bg-[#111726] border border-[#202c44] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <img
                  src={panel.iconImage}
                  alt={panel.name}
                  className="w-12 h-12 rounded-xl object-cover border border-[#273654] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-white font-gaming">
                      {panel.name}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                      {panel.version}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {panel.tagline}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                    <span>Target: {panel.gameVersion}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-medium">Safe Bypass</span>
                  </div>
                </div>
              </div>

              <a
                href={panel.downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-4 rounded-xl bg-[#1d273e] hover:bg-amber-500 hover:text-black text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shrink-0 border border-[#2e3e60]"
              >
                <Download className="w-3.5 h-3.5" />
                Download Direct
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Helper & Extraction Tools */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white font-gaming tracking-wide flex items-center gap-2">
          <FileCode className="w-5 h-5 text-cyan-400" />
          Essential Setup & Anti-Ban Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {additionalTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-[#111726] border border-[#202c44] rounded-xl p-4 flex flex-col justify-between gap-3 hover:border-cyan-500/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">
                    {tool.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {tool.version} • {tool.size}
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-white font-gaming mt-1">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#1c263c] flex items-center justify-end">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noreferrer"
                  className="py-1.5 px-3 rounded-lg bg-[#182338] hover:bg-cyan-500 hover:text-black text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-colors border border-cyan-500/30"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Tool ({tool.size})
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
