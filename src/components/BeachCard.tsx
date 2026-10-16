import React from 'react';
import {
  Compass,
  Wind,
  Waves,
  Anchor,
  Droplets,
  ExternalLink,
  Bookmark,
  Layers,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { Beach, Activity } from '../types/beach';
import {
  milesToKm,
  ftToMeters,
  fahrenheitToCelsius,
  knotsToKmh,
  getWindRotationDeg,
} from '../utils/geo';

interface BeachCardProps {
  beach: Beach;
  selectedActivity: Activity | 'all';
  isMetric: boolean;
  isSaved: boolean;
  onToggleSave: (beachId: string) => void;
  isCompared: boolean;
  onToggleCompare: (beachId: string) => void;
  onOpenDetails: (beach: Beach) => void;
  onOpenCharterBooking?: (beach: Beach) => void;
}

export const BeachCard: React.FC<BeachCardProps> = ({
  beach,
  selectedActivity,
  isMetric,
  isSaved,
  onToggleSave,
  isCompared,
  onToggleCompare,
  onOpenDetails,
  onOpenCharterBooking,
}) => {
  // Determine relevant suitability
  let currentSuitability = selectedActivity !== 'all' ? beach.suitability[selectedActivity] : null;
  if (!currentSuitability) {
    // Pick the highest scoring activity
    const entries = Object.entries(beach.suitability);
    if (entries.length > 0) {
      entries.sort((a, b) => (b[1]?.score ?? 0) - (a[1]?.score ?? 0));
      currentSuitability = entries[0][1];
    }
  }

  const waveHeight = isMetric
    ? `${ftToMeters(beach.conditions.waveHeightFt)} m`
    : `${beach.conditions.waveHeightFt} ft`;

  const windSpeed = isMetric
    ? `${knotsToKmh(beach.conditions.windSpeedKts)} km/h`
    : `${beach.conditions.windSpeedKts} kts`;

  const waterTemp = isMetric
    ? `${fahrenheitToCelsius(beach.conditions.waterTempF)}°C`
    : `${beach.conditions.waterTempF}°F`;

  const distance =
    beach.distanceMiles !== undefined
      ? isMetric
        ? `${milesToKm(beach.distanceMiles)} km`
        : `${beach.distanceMiles} mi`
      : null;

  const windDeg = getWindRotationDeg(beach.conditions.windDirection);

  const getSuitabilityColor = (level?: string) => {
    switch (level) {
      case 'Optimal':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Good':
        return 'text-sky-800 bg-sky-50 border-sky-200';
      case 'Fair':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      default:
        return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
      {/* Top Media & Header */}
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-slate-800">
          <img
            src={beach.image}
            alt={beach.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            onError={(e) => {
              // Resilient fallback container
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Subtle contrast gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

          {/* Top Right Quick Action Buttons */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(beach.id);
              }}
              title={isCompared ? 'Remove from comparison' : 'Add to compare'}
              className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
                isCompared
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'bg-slate-900/60 hover:bg-slate-900/80 text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(beach.id);
              }}
              title={isSaved ? 'Remove from saved' : 'Save beach'}
              className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
                isSaved
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-slate-900/60 hover:bg-slate-900/80 text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Bottom Overlay on Image: Break type & distance */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
            <span className="font-medium bg-slate-950/70 px-2 py-0.5 rounded backdrop-blur-xs">
              {beach.breakType}
            </span>
            {distance && (
              <span className="font-mono tabular-nums font-bold bg-sky-950/80 text-sky-300 px-2 py-0.5 rounded backdrop-blur-xs">
                {distance} away
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          {/* Unboxed Metadata Header */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 font-medium">
            <span>{beach.region}</span>
            <span aria-hidden="true">·</span>
            <span>{beach.stateCountry}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-600">{beach.conditions.windType}</span>
          </div>

          {/* Beach Title */}
          <h3
            onClick={() => onOpenDetails(beach)}
            className="text-lg font-bold text-slate-900 hover:text-sky-600 transition-colors cursor-pointer mb-2.5"
          >
            {beach.name}
          </h3>

          {/* Suitability Statement Box */}
          {currentSuitability && (
            <div
              className={`mb-4 p-2.5 rounded-lg border text-xs leading-relaxed ${getSuitabilityColor(
                currentSuitability.level
              )}`}
            >
              <div className="flex items-center justify-between font-semibold mb-1">
                <span>
                  Condition Rating:{' '}
                  <span className="capitalize">{currentSuitability.level}</span>
                </span>
                <span className="font-mono tabular-nums font-bold">
                  {currentSuitability.score}/100
                </span>
              </div>
              <p className="text-slate-600 text-xs">{currentSuitability.reason}</p>
            </div>
          )}

          {/* Telemetry Metric Strip */}
          <div className="grid grid-cols-4 gap-2 py-3 border-y border-slate-100 text-center mb-3">
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Swell</div>
              <div className="font-mono tabular-nums font-bold text-slate-800 text-sm">
                {waveHeight}
              </div>
              <div className="text-[10px] text-slate-500 font-mono tabular-nums">
                {beach.conditions.wavePeriodSec}s
              </div>
            </div>

            <div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Wind</div>
              <div className="font-mono tabular-nums font-bold text-slate-800 text-sm flex items-center justify-center gap-0.5">
                <span>{windSpeed}</span>
                <span
                  style={{ transform: `rotate(${windDeg}deg)` }}
                  className="inline-block text-sky-600 text-xs transition-transform"
                  title={`${beach.conditions.windDirection}`}
                >
                  ↑
                </span>
              </div>
              <div className="text-[10px] text-slate-500 truncate">
                {beach.conditions.windDirection}
              </div>
            </div>

            <div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Tide</div>
              <div className="font-semibold text-slate-800 text-xs truncate">
                {beach.conditions.tideStatus}
              </div>
              <div className="text-[10px] text-slate-500 font-mono tabular-nums">
                {beach.conditions.tideHeightFt} ft
              </div>
            </div>

            <div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Water</div>
              <div className="font-mono tabular-nums font-bold text-slate-800 text-sm">
                {waterTemp}
              </div>
              <div className="text-[10px] text-slate-500 font-mono tabular-nums">
                {beach.conditions.waterVisibilityFt}ft vis
              </div>
            </div>
          </div>

          {/* Fishing Charter / Boat Ramp Highlight */}
          {beach.fishingData.boatRampAvailable && (
            <div className="flex items-center justify-between text-xs text-slate-700 bg-slate-50 rounded-lg p-2 mb-3">
              <div className="flex items-center gap-1.5 font-medium truncate">
                <Anchor className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span className="truncate">
                  {beach.fishingData.lanes}-Lane Ramp · Max {beach.fishingData.maxVesselLengthFt}ft
                </span>
              </div>
              {beach.fishingData.activeCharters.length > 0 && (
                <span className="text-[11px] text-emerald-700 font-semibold shrink-0">
                  {beach.fishingData.activeCharters.length} Charters
                </span>
              )}
            </div>
          )}

          {/* Hazards callout if present */}
          {beach.conditions.hazards.length > 0 && beach.conditions.hazards[0].type !== 'none' && (
            <div className="flex items-center gap-1.5 text-[11px] text-amber-800 mb-2 font-medium">
              <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
              <span className="truncate">{beach.conditions.hazards[0].label}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
        <button
          onClick={() => onOpenDetails(beach)}
          className="text-xs font-semibold text-sky-700 hover:text-sky-900 transition-colors flex items-center gap-1 py-1"
        >
          Forecast & Details
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2">
          {beach.fishingData.activeCharters.length > 0 && onOpenCharterBooking && (
            <button
              onClick={() => onOpenCharterBooking(beach)}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              Book Charter
            </button>
          )}

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${beach.coordinates.lat},${beach.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Directions in Google Maps"
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
