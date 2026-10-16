import React from 'react';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  Map,
  TableProperties,
  ArrowUpDown,
  Check,
  X
} from 'lucide-react';
import { Activity } from '../types/beach';

export type SortOption =
  | 'nearest'
  | 'suitability'
  | 'wave_desc'
  | 'wind_asc'
  | 'ramp_lanes';

export type ViewMode = 'grid' | 'map' | 'table';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  rampRequired: boolean;
  onToggleRamp: () => void;
  lifeguardRequired: boolean;
  onToggleLifeguard: () => void;
  rentalRequired: boolean;
  onToggleRental: () => void;
  freeParkingOnly: boolean;
  onToggleFreeParking: () => void;
  isMetric: boolean;
  onToggleUnits: () => void;
  activeFilterCount: number;
  onResetFilters: () => void;
  resultsCount: number;
  totalCount: number;
  selectedActivity: Activity | 'all';
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  rampRequired,
  onToggleRamp,
  lifeguardRequired,
  onToggleLifeguard,
  rentalRequired,
  onToggleRental,
  freeParkingOnly,
  onToggleFreeParking,
  isMetric,
  onToggleUnits,
  activeFilterCount,
  onResetFilters,
  resultsCount,
  totalCount,
  selectedActivity,
}) => {
  return (
    <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search bar & quick text filter */}
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search beach name, city, inlet, or fish species (e.g. Tarpon, Snapper)..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Results count text indicator */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 whitespace-nowrap">
              <span className="font-semibold text-slate-800 font-mono tabular-nums">
                {resultsCount}
              </span>
              <span>of</span>
              <span className="font-mono tabular-nums">{totalCount}</span>
              <span>spots</span>
            </div>
          </div>

          {/* Controls: Sorting, View toggle, Units */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                aria-label="Sort beaches"
                className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none cursor-pointer pr-1"
              >
                <option value="nearest">Nearest Beach First</option>
                <option value="suitability">Highest Conditions Match</option>
                <option value="wave_desc">Highest Swell Height</option>
                <option value="wind_asc">Calmest Wind First</option>
                <option value="ramp_lanes">Most Boat Launch Lanes</option>
              </select>
            </div>

            {/* Unit System Toggle */}
            <button
              onClick={onToggleUnits}
              title="Toggle measurement units"
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg transition-colors whitespace-nowrap"
            >
              {isMetric ? 'Metric (m, km/h)' : 'Imperial (ft, kts)'}
            </button>

            {/* View Mode Segmented Switch */}
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('map')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'map'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Coastal Radar Map"
              >
                <Map className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('table')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'table'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Data Table View"
              >
                <TableProperties className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Filter Chips Row */}
        <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-slate-100 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" />
            Filters:
          </span>

          <button
            onClick={onToggleRamp}
            className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap border font-medium flex items-center gap-1.5 ${
              rampRequired
                ? 'bg-sky-50 border-sky-300 text-sky-800 font-semibold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {rampRequired && <Check className="w-3 h-3 text-sky-700" />}
            Boat Ramp Required
          </button>

          <button
            onClick={onToggleLifeguard}
            className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap border font-medium flex items-center gap-1.5 ${
              lifeguardRequired
                ? 'bg-sky-50 border-sky-300 text-sky-800 font-semibold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {lifeguardRequired && <Check className="w-3 h-3 text-sky-700" />}
            Lifeguard On Duty
          </button>

          <button
            onClick={onToggleRental}
            className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap border font-medium flex items-center gap-1.5 ${
              rentalRequired
                ? 'bg-sky-50 border-sky-300 text-sky-800 font-semibold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {rentalRequired && <Check className="w-3 h-3 text-sky-700" />}
            Gear Rental Shop
          </button>

          <button
            onClick={onToggleFreeParking}
            className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap border font-medium flex items-center gap-1.5 ${
              freeParkingOnly
                ? 'bg-sky-50 border-sky-300 text-sky-800 font-semibold'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {freeParkingOnly && <Check className="w-3 h-3 text-sky-700" />}
            Free Parking
          </button>

          {activeFilterCount > 0 && (
            <button
              onClick={onResetFilters}
              className="text-xs text-sky-700 hover:text-sky-900 underline font-medium ml-2 whitespace-nowrap"
            >
              Reset filters ({activeFilterCount})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
