import React from 'react';
import { Compass, MapPin, Layers } from 'lucide-react';

interface TopBarProps {
  currentLocationName: string;
  isLocating: boolean;
  onDetectLocation: () => void;
  activeTab: 'find' | 'watersports' | 'fishing' | 'radar' | 'saved';
  onTabChange: (tab: 'find' | 'watersports' | 'fishing' | 'radar' | 'saved') => void;
  savedCount: number;
  compareCount: number;
  onOpenCompare: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentLocationName,
  isLocating,
  onDetectLocation,
  activeTab,
  onTabChange,
  savedCount,
  compareCount,
  onOpenCompare,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark in display face */}
        <button
          onClick={() => onTabChange('find')}
          className="text-xl font-bold tracking-tight text-white hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
            <Compass className="w-5 h-5" />
          </span>
          WaveReady
        </button>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onTabChange('find')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeTab === 'find'
                ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Find Beaches
          </button>
          <button
            onClick={() => onTabChange('watersports')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeTab === 'watersports'
                ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Water Sports
          </button>
          <button
            onClick={() => onTabChange('fishing')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeTab === 'fishing'
                ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Fishing Charters
          </button>
          <button
            onClick={() => onTabChange('radar')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeTab === 'radar'
                ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Coastal Radar
          </button>
          <button
            onClick={() => onTabChange('saved')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'text-sky-400 border-b-2 border-sky-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Saved Spots
            {savedCount > 0 && (
              <span className="text-xs font-mono tabular-nums text-slate-400">
                ({savedCount})
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {compareCount > 0 ? (
            <button
              onClick={onOpenCompare}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <Layers className="w-3.5 h-3.5" />
              Compare ({compareCount})
            </button>
          ) : (
            <button
              onClick={onDetectLocation}
              disabled={isLocating}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm disabled:opacity-60"
            >
              <MapPin className="w-3.5 h-3.5" />
              {isLocating ? 'Locating...' : 'Use My GPS'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
