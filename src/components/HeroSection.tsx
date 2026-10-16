import React from 'react';
import { MapPin, Navigation, Compass, Wind, Anchor } from 'lucide-react';
import heroBg from '../assets/images/waveready_coastal_hero_1792134899158.jpg';
import { LOCATION_PRESETS } from '../utils/geo';
import { LocationPreset, Activity } from '../types/beach';

interface HeroSectionProps {
  currentPreset: LocationPreset | null;
  onSelectPreset: (preset: LocationPreset) => void;
  onUseGps: () => void;
  isLocating: boolean;
  searchRadiusMiles: number;
  onRadiusChange: (radius: number) => void;
  selectedActivity: Activity | 'all';
  onActivityChange: (act: Activity | 'all') => void;
  totalBeachesCount: number;
  rampsCount: number;
  averageSwellFt: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentPreset,
  onSelectPreset,
  onUseGps,
  isLocating,
  searchRadiusMiles,
  onRadiusChange,
  selectedActivity,
  onActivityChange,
  totalBeachesCount,
  rampsCount,
  averageSwellFt,
}) => {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Coastal shoreline with turquoise surf"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14">
        {/* Headline & Value Proposition */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-medium text-sky-400 mb-3 tracking-wide">
            <span>Coastline Marine Intelligence</span>
            <span aria-hidden="true">·</span>
            <span>NOAA & Coastal Buoy Grounded</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Find the nearest beach with prime conditions for water sports & fishing charters.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Real-time wave period, offshore wind vectors, live boat ramp draft limits, and vetted charter captains ready for your next trip.
          </p>
        </div>

        {/* Location & Radius Control Strip */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 sm:p-5 shadow-2xl backdrop-blur-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Location Selector */}
            <div className="md:col-span-5">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Current Coastal Hub
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400 pointer-events-none" />
                  <select
                    value={currentPreset?.id ?? 'custom'}
                    onChange={(e) => {
                      const found = LOCATION_PRESETS.find((p) => p.id === e.target.value);
                      if (found) onSelectPreset(found);
                    }}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent font-medium"
                  >
                    {LOCATION_PRESETS.map((p) => (
                      <option key={p.id} value={p.id} className="bg-slate-800 text-white">
                        {p.name} ({p.region})
                      </option>
                    ))}
                    {!currentPreset && (
                      <option value="custom" className="bg-slate-800 text-white">
                        Current GPS Location
                      </option>
                    )}
                  </select>
                </div>
                <button
                  onClick={onUseGps}
                  disabled={isLocating}
                  title="Detect my current coordinates"
                  className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sky-400 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isLocating ? 'Locating...' : 'GPS'}</span>
                </button>
              </div>
            </div>

            {/* Radius Segmented Controls */}
            <div className="md:col-span-4">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Distance Radius
              </label>
              <div className="flex items-center bg-slate-800/90 border border-slate-700 rounded-lg p-1">
                {[15, 30, 60, 150].map((radius) => (
                  <button
                    key={radius}
                    onClick={() => onRadiusChange(radius)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                      searchRadiusMiles === radius
                        ? 'bg-sky-500 text-slate-950 shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {radius} mi
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4">
              <div className="text-xs text-slate-400 mb-1">Coverage Scope</div>
              <div className="flex items-center gap-3 text-xs font-medium text-slate-200">
                <span className="font-mono tabular-nums text-sky-400 font-bold">
                  {totalBeachesCount}
                </span>
                <span>spots</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="font-mono tabular-nums text-emerald-400 font-bold">
                  {rampsCount}
                </span>
                <span>boat ramps</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="font-mono tabular-nums text-slate-300">
                  ~{averageSwellFt}ft swell
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Quick Filter Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Focus:
          </span>
          {[
            { id: 'all', label: 'All Activities' },
            { id: 'surfing', label: 'Surfing' },
            { id: 'fishing_charter', label: 'Fishing Charters & Guides' },
            { id: 'kitesurfing', label: 'Kite & Wing Foiling' },
            { id: 'kayak_sup', label: 'Kayak & Paddleboard' },
            { id: 'snorkeling_diving', label: 'Snorkeling & Diving' },
            { id: 'boat_launch', label: 'Boat Ramp Launches' },
          ].map((act) => {
            const isActive = selectedActivity === act.id;
            return (
              <button
                key={act.id}
                onClick={() => onActivityChange(act.id as Activity | 'all')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 border ${
                  isActive
                    ? 'bg-sky-500 border-sky-400 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600'
                }`}
              >
                {act.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
