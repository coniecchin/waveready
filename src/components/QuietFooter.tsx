import React from 'react';
import { Compass, Waves, ShieldCheck } from 'lucide-react';

export const QuietFooter: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 text-white font-bold text-base mb-3">
              <span className="w-6 h-6 rounded-md bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
                <Compass className="w-3.5 h-3.5" />
              </span>
              WaveReady
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mb-4">
              Real-time coastal intelligence helping water sports enthusiasts, anglers, and fishing charters locate nearest beaches with optimal conditions.
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Marine safety first: verify on-site beach flags & tidal warnings before entering the water.</span>
            </div>
          </div>

          <div className="md:col-span-3">
            <span className="text-slate-200 font-semibold uppercase tracking-wider text-[11px] block mb-3">
              Coastal Disciplines
            </span>
            <ul className="space-y-2 text-slate-400">
              <li>Surfing & Ocean Swells</li>
              <li>Fishing Charters & Guides</li>
              <li>Kiteboarding & Wing Foiling</li>
              <li>Kayaking & Paddleboarding</li>
              <li>Public Boat Launch Ramps</li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <span className="text-slate-200 font-semibold uppercase tracking-wider text-[11px] block mb-3">
              Marine Data Sources
            </span>
            <p className="text-slate-400 text-xs leading-relaxed mb-3">
              Wave predictions, wind vectors, and water temperature modeled from NOAA National Data Buoy Center (NDBC), Coastal Ocean Observation Systems, and local harbor master advisories.
            </p>
            <div className="text-[11px] text-slate-500">
              Ready for serverless backend API integrations (`/api/beaches`, `/api/charters`).
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} WaveReady. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Marine Weather Disclaimer</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Charter Verification Standards</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
