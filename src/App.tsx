/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Beach, Coordinates, LocationPreset, Activity } from './types/beach';
import { INITIAL_BEACHES } from './data/mockBeaches';
import { LOCATION_PRESETS, calculateDistanceMiles } from './utils/geo';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { FilterBar, SortOption, ViewMode } from './components/FilterBar';
import { BeachCard } from './components/BeachCard';
import { CoastalRadarMap } from './components/CoastalRadarMap';
import { BeachTableView } from './components/BeachTableView';
import { BeachDetailModal } from './components/BeachDetailModal';
import { CharterBookingDrawer } from './components/CharterBookingDrawer';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { QuietFooter } from './components/QuietFooter';
import {
  Compass,
  MapPin,
  Waves,
  Anchor,
  Wind,
  Layers,
  Bookmark,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const SAVED_STORAGE_KEY = 'waveready_saved_spots';

export default function App() {
  // 1. Location state
  const [currentPreset, setCurrentPreset] = useState<LocationPreset | null>(LOCATION_PRESETS[0]);
  const [userCoords, setUserCoords] = useState<Coordinates>(LOCATION_PRESETS[0].coordinates);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // 2. Navigation Tab state
  const [activeNavTab, setActiveNavTab] = useState<'find' | 'watersports' | 'fishing' | 'radar' | 'saved'>('find');

  // 3. Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchRadiusMiles, setSearchRadiusMiles] = useState<number>(60);
  const [selectedActivity, setSelectedActivity] = useState<Activity | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('nearest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Secondary filter toggles
  const [rampRequired, setRampRequired] = useState<boolean>(false);
  const [lifeguardRequired, setLifeguardRequired] = useState<boolean>(false);
  const [rentalRequired, setRentalRequired] = useState<boolean>(false);
  const [freeParkingOnly, setFreeParkingOnly] = useState<boolean>(false);
  const [isMetric, setIsMetric] = useState<boolean>(false);

  // 4. Modals & Drawers state
  const [selectedBeachForDetail, setSelectedBeachForDetail] = useState<Beach | null>(null);
  const [selectedBeachForCharter, setSelectedBeachForCharter] = useState<Beach | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedIds));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }, [savedIds]);

  // Handle GPS location detection
  const handleDetectGps = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const newCoords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserCoords(newCoords);
        setCurrentPreset(null); // Custom GPS coordinates
      },
      (err) => {
        setIsLocating(false);
        setLocationError(`Location request failed (${err.message}). Using preset hub.`);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, []);

  // Handle location preset selection
  const handleSelectPreset = (preset: LocationPreset) => {
    setCurrentPreset(preset);
    setUserCoords(preset.coordinates);
    setLocationError(null);
  };

  // Nav tab switching handlers
  const handleNavTabChange = (tab: 'find' | 'watersports' | 'fishing' | 'radar' | 'saved') => {
    setActiveNavTab(tab);
    if (tab === 'watersports') {
      setSelectedActivity('surfing');
      setViewMode('grid');
    } else if (tab === 'fishing') {
      setSelectedActivity('fishing_charter');
      setRampRequired(true);
      setViewMode('grid');
    } else if (tab === 'radar') {
      setViewMode('map');
    } else if (tab === 'saved') {
      setViewMode('grid');
    } else {
      setSelectedActivity('all');
      setRampRequired(false);
      setViewMode('grid');
    }
  };

  // Saved bookmark toggle
  const handleToggleSave = (beachId: string) => {
    setSavedIds((prev) =>
      prev.includes(beachId) ? prev.filter((id) => id !== beachId) : [...prev, beachId]
    );
  };

  // Compare toggle
  const handleToggleCompare = (beachId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(beachId)) {
        return prev.filter((id) => id !== beachId);
      }
      if (prev.length >= 3) {
        // limit to 3
        return [...prev.slice(1), beachId];
      }
      return [...prev, beachId];
    });
  };

  // Count active secondary filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (rampRequired) count++;
    if (lifeguardRequired) count++;
    if (rentalRequired) count++;
    if (freeParkingOnly) count++;
    return count;
  }, [rampRequired, lifeguardRequired, rentalRequired, freeParkingOnly]);

  const handleResetFilters = () => {
    setRampRequired(false);
    setLifeguardRequired(false);
    setRentalRequired(false);
    setFreeParkingOnly(false);
    setSearchQuery('');
  };

  // Compute beaches with dynamic distances relative to userCoords
  const processedBeaches = useMemo(() => {
    return INITIAL_BEACHES.map((beach) => {
      const distance = calculateDistanceMiles(userCoords, beach.coordinates);
      return {
        ...beach,
        distanceMiles: distance,
      };
    });
  }, [userCoords]);

  // Filter and sort beaches
  const filteredBeaches = useMemo(() => {
    let list = [...processedBeaches];

    // Filter by saved tab
    if (activeNavTab === 'saved') {
      list = list.filter((b) => savedIds.includes(b.id));
    }

    // Filter by radius
    if (searchRadiusMiles > 0) {
      list = list.filter((b) => (b.distanceMiles ?? 0) <= searchRadiusMiles);
    }

    // Filter by selected activity
    if (selectedActivity !== 'all') {
      list = list.filter((b) => b.activities.includes(selectedActivity));
    }

    // Filter by secondary toggles
    if (rampRequired) {
      list = list.filter((b) => b.fishingData.boatRampAvailable);
    }
    if (lifeguardRequired) {
      list = list.filter((b) => b.amenities.lifeguardOnDuty);
    }
    if (rentalRequired) {
      list = list.filter((b) => b.amenities.rentalGearShop);
    }
    if (freeParkingOnly) {
      list = list.filter((b) => b.amenities.parkingFee.toLowerCase().includes('free'));
    }

    // Search query filter (matches beach name, region, breakType, fish species, captain)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((b) => {
        const matchName = b.name.toLowerCase().includes(q);
        const matchRegion = b.region.toLowerCase().includes(q);
        const matchBreak = b.breakType.toLowerCase().includes(q);
        const matchSpecies = b.fishingData.seasonalTargetSpecies.some((s) =>
          s.toLowerCase().includes(q)
        );
        const matchCharters = b.fishingData.activeCharters.some(
          (c) => c.name.toLowerCase().includes(q) || c.captain.toLowerCase().includes(q)
        );
        return matchName || matchRegion || matchBreak || matchSpecies || matchCharters;
      });
    }

    // Sort order
    list.sort((a, b) => {
      switch (sortBy) {
        case 'nearest':
          return (a.distanceMiles ?? 0) - (b.distanceMiles ?? 0);
        case 'suitability': {
          const scoreA =
            selectedActivity !== 'all'
              ? a.suitability[selectedActivity]?.score ?? 0
              : Math.max(...Object.values(a.suitability).map((s) => s?.score ?? 0));
          const scoreB =
            selectedActivity !== 'all'
              ? b.suitability[selectedActivity]?.score ?? 0
              : Math.max(...Object.values(b.suitability).map((s) => s?.score ?? 0));
          return scoreB - scoreA;
        }
        case 'wave_desc':
          return b.conditions.waveHeightFt - a.conditions.waveHeightFt;
        case 'wind_asc':
          return a.conditions.windSpeedKts - b.conditions.windSpeedKts;
        case 'ramp_lanes':
          return b.fishingData.lanes - a.fishingData.lanes;
        default:
          return 0;
      }
    });

    return list;
  }, [
    processedBeaches,
    activeNavTab,
    savedIds,
    searchRadiusMiles,
    selectedActivity,
    rampRequired,
    lifeguardRequired,
    rentalRequired,
    freeParkingOnly,
    searchQuery,
    sortBy,
  ]);

  // Aggregate stats for hero strip
  const totalSpotsInRadius = filteredBeaches.length;
  const rampsCount = filteredBeaches.filter((b) => b.fishingData.boatRampAvailable).length;
  const averageSwell =
    filteredBeaches.length > 0
      ? Math.round(
          (filteredBeaches.reduce((acc, b) => acc + b.conditions.waveHeightFt, 0) /
            filteredBeaches.length) *
            10
        ) / 10
      : 0;

  // Comparison spots list
  const comparedBeaches = useMemo(() => {
    return processedBeaches.filter((b) => compareIds.includes(b.id));
  }, [processedBeaches, compareIds]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* 1. Header (Adhering strictly to Top Bar Contract) */}
      <TopBar
        currentLocationName={currentPreset?.name ?? 'GPS Location'}
        isLocating={isLocating}
        onDetectLocation={handleDetectGps}
        activeTab={activeNavTab}
        onTabChange={handleNavTabChange}
        savedCount={savedIds.length}
        compareCount={compareIds.length}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Geolocation feedback notification banner if any */}
      {locationError && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-7xl mx-auto">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{locationError}</span>
          </div>
          <button
            onClick={() => setLocationError(null)}
            className="text-amber-700 hover:text-amber-900 font-bold ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* 2. Hero Section (with High-impact imagery and quick radius/activity picker) */}
      <HeroSection
        currentPreset={currentPreset}
        onSelectPreset={handleSelectPreset}
        onUseGps={handleDetectGps}
        isLocating={isLocating}
        searchRadiusMiles={searchRadiusMiles}
        onRadiusChange={setSearchRadiusMiles}
        selectedActivity={selectedActivity}
        onActivityChange={setSelectedActivity}
        totalBeachesCount={totalSpotsInRadius}
        rampsCount={rampsCount}
        averageSwellFt={averageSwell}
      />

      {/* 3. Sticky Filter & Sorting Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        rampRequired={rampRequired}
        onToggleRamp={() => setRampRequired(!rampRequired)}
        lifeguardRequired={lifeguardRequired}
        onToggleLifeguard={() => setLifeguardRequired(!lifeguardRequired)}
        rentalRequired={rentalRequired}
        onToggleRental={() => setRentalRequired(!rentalRequired)}
        freeParkingOnly={freeParkingOnly}
        onToggleFreeParking={() => setFreeParkingOnly(!freeParkingOnly)}
        isMetric={isMetric}
        onToggleUnits={() => setIsMetric(!isMetric)}
        activeFilterCount={activeFilterCount}
        onResetFilters={handleResetFilters}
        resultsCount={filteredBeaches.length}
        totalCount={processedBeaches.length}
        selectedActivity={selectedActivity}
      />

      {/* 4. Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active view title banner */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Nearest Coastal Beaches</span>
              <span aria-hidden="true">·</span>
              <span>
                Within {searchRadiusMiles} miles of {currentPreset?.name ?? 'your GPS coordinates'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {activeNavTab === 'saved'
                ? 'Your Saved Coastal Spots'
                : selectedActivity === 'fishing_charter'
                ? 'Prime Beaches for Fishing Charters & Boat Launching'
                : selectedActivity === 'surfing'
                ? 'Top Swell & Surfing Point Breaks'
                : selectedActivity === 'kitesurfing'
                ? 'Best Wind & Kitesurfing Bays'
                : 'Recommended Beaches & Coastal Marinas'}
            </h2>
          </div>

          {/* Quick Clear Filter if empty */}
          {filteredBeaches.length === 0 && (
            <button
              onClick={() => {
                setSearchRadiusMiles(150);
                setSelectedActivity('all');
                handleResetFilters();
              }}
              className="text-xs font-semibold text-sky-700 hover:text-sky-900 underline"
            >
              Expand Search Radius
            </button>
          )}
        </div>

        {/* View Switcher Output */}
        {filteredBeaches.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No Beaches Found in Range</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              No spots matched your current search radius ({searchRadiusMiles} miles) or specific activity filters. Try broadening the radius or resetting filters.
            </p>
            <button
              onClick={() => {
                setSearchRadiusMiles(150);
                setSelectedActivity('all');
                handleResetFilters();
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Reset Filters & Expand Radius
            </button>
          </div>
        ) : viewMode === 'map' ? (
          <CoastalRadarMap
            center={userCoords}
            centerName={currentPreset?.name ?? 'GPS Location'}
            beaches={filteredBeaches}
            selectedActivity={selectedActivity}
            isMetric={isMetric}
            onSelectBeach={(b) => setSelectedBeachForDetail(b)}
            onBookCharter={(b) => setSelectedBeachForCharter(b)}
          />
        ) : viewMode === 'table' ? (
          <BeachTableView
            beaches={filteredBeaches}
            selectedActivity={selectedActivity}
            isMetric={isMetric}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            compareIds={compareIds}
            onToggleCompare={handleToggleCompare}
            onSelectBeach={(b) => setSelectedBeachForDetail(b)}
            onBookCharter={(b) => setSelectedBeachForCharter(b)}
          />
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBeaches.map((beach) => (
              <BeachCard
                key={beach.id}
                beach={beach}
                selectedActivity={selectedActivity}
                isMetric={isMetric}
                isSaved={savedIds.includes(beach.id)}
                onToggleSave={handleToggleSave}
                isCompared={compareIds.includes(beach.id)}
                onToggleCompare={handleToggleCompare}
                onOpenDetails={(b) => setSelectedBeachForDetail(b)}
                onOpenCharterBooking={(b) => setSelectedBeachForCharter(b)}
              />
            ))}
          </div>
        )}
      </main>

      {/* 5. Modals & Drawers */}
      {selectedBeachForDetail && (
        <BeachDetailModal
          beach={selectedBeachForDetail}
          onClose={() => setSelectedBeachForDetail(null)}
          isMetric={isMetric}
          isSaved={savedIds.includes(selectedBeachForDetail.id)}
          onToggleSave={handleToggleSave}
          isCompared={compareIds.includes(selectedBeachForDetail.id)}
          onToggleCompare={handleToggleCompare}
          onBookCharter={(b) => {
            setSelectedBeachForDetail(null);
            setSelectedBeachForCharter(b);
          }}
        />
      )}

      {selectedBeachForCharter && (
        <CharterBookingDrawer
          beach={selectedBeachForCharter}
          onClose={() => setSelectedBeachForCharter(null)}
        />
      )}

      {isCompareOpen && (
        <ComparisonDrawer
          beaches={comparedBeaches}
          onClose={() => setIsCompareOpen(false)}
          onRemove={(id) => handleToggleCompare(id)}
          onSelectBeach={(b) => setSelectedBeachForDetail(b)}
          selectedActivity={selectedActivity}
          isMetric={isMetric}
        />
      )}

      {/* 6. Quiet Footer */}
      <QuietFooter />
    </div>
  );
}
