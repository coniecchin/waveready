import React from 'react';
import { Beach, Activity } from '../types/beach';
import { X, Layers, ExternalLink, Anchor, ChevronRight } from 'lucide-react';
import {
  milesToKm,
  ftToMeters,
  fahrenheitToCelsius,
  knotsToKmh,
} from '../utils/geo';

interface ComparisonDrawerProps {
  beaches: Beach[];
  onClose: () => void;
  onRemove: (beachId: string) => void;
  onSelectBeach: (beach: Beach) => void;
  selectedActivity: Activity | 'all';
  isMetric: boolean;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({
  beaches,
  onClose,
  onRemove,
  onSelectBeach,
  selectedActivity,
  isMetric,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-600" />
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Beach & Marina Side-by-Side Comparison
              </h3>
              <p className="text-xs text-slate-500">
                Comparing {beaches.length} candidate spots for marine suitability
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-x-auto">
          <div className="min-w-[640px]">
            {/* Top row: Spot cards */}
            <div className={`grid gap-4 mb-6 ${beaches.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {beaches.map((beach) => (
                <div
                  key={beach.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 relative flex flex-col justify-between"
                >
                  <button
                    onClick={() => onRemove(beach.id)}
                    title="Remove from comparison"
                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-700 bg-white rounded-md shadow-2xs"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-1">
                      {beach.region} · {beach.breakType}
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-1">
                      {beach.name}
                    </h4>
                    {beach.distanceMiles !== undefined && (
                      <span className="font-mono tabular-nums text-xs text-sky-700 font-bold">
                        {isMetric ? `${milesToKm(beach.distanceMiles)} km` : `${beach.distanceMiles} mi`} away
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectBeach(beach);
                    }}
                    className="mt-3 py-1.5 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    Inspect Full Spot
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Comparison Metrics Matrix */}
            <div className="space-y-4 text-xs">
              {/* Swell & Waves */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-100/70 px-4 py-2 font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  Swell & Waves
                </div>
                <div className={`grid px-4 py-3 gap-4 ${beaches.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {beaches.map((b) => (
                    <div key={b.id}>
                      <span className="font-mono tabular-nums font-bold text-sm text-slate-900 block">
                        {isMetric ? `${ftToMeters(b.conditions.waveHeightFt)}m` : `${b.conditions.waveHeightFt}ft`}
                      </span>
                      <span className="text-slate-500 font-mono tabular-nums text-[11px]">
                        {b.conditions.wavePeriodSec}s · {b.conditions.swellDirection}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wind Vector */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-100/70 px-4 py-2 font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  Wind Conditions
                </div>
                <div className={`grid px-4 py-3 gap-4 ${beaches.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {beaches.map((b) => (
                    <div key={b.id}>
                      <span className="font-mono tabular-nums font-bold text-sm text-slate-900 block">
                        {isMetric ? `${knotsToKmh(b.conditions.windSpeedKts)}km/h` : `${b.conditions.windSpeedKts}kts`}
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        {b.conditions.windType} ({b.conditions.windDirection})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Water & Tide */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-100/70 px-4 py-2 font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  Water & Tide
                </div>
                <div className={`grid px-4 py-3 gap-4 ${beaches.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {beaches.map((b) => (
                    <div key={b.id}>
                      <span className="font-mono tabular-nums font-semibold text-slate-900 block">
                        {isMetric ? `${fahrenheitToCelsius(b.conditions.waterTempF)}°C` : `${b.conditions.waterTempF}°F`} · {b.conditions.waterVisibilityFt}ft vis
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        Tide: {b.conditions.tideStatus} ({b.conditions.tideHeightFt}ft)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boat Ramp & Charters */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-100/70 px-4 py-2 font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  Boat Launch & Fishing Charters
                </div>
                <div className={`grid px-4 py-3 gap-4 ${beaches.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {beaches.map((b) => (
                    <div key={b.id}>
                      {b.fishingData.boatRampAvailable ? (
                        <>
                          <span className="font-bold text-slate-900 text-xs block">
                            {b.fishingData.lanes}-Lane Ramp (Max {b.fishingData.maxVesselLengthFt}ft)
                          </span>
                          <span className="text-slate-500 text-[11px] block">
                            Fee: {b.fishingData.rampFee}
                          </span>
                          <span className="text-emerald-700 font-semibold text-[11px] block mt-1">
                            {b.fishingData.activeCharters.length} Active Charters
                          </span>
                        </>
                      ) : (
                        <span className="text-slate-400">No public ramp / charters</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities & Parking */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-100/70 px-4 py-2 font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  Parking & Facilities
                </div>
                <div className={`grid px-4 py-3 gap-4 ${beaches.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {beaches.map((b) => (
                    <div key={b.id} className="space-y-1 text-slate-600">
                      <div>Parking: <span className="font-medium text-slate-900">{b.amenities.parkingSpots} spots</span> ({b.amenities.parkingFee})</div>
                      <div>Lifeguards: <span className="font-medium text-slate-900">{b.amenities.lifeguardOnDuty ? 'Yes' : 'No'}</span></div>
                      <div>Rental Shop: <span className="font-medium text-slate-900">{b.amenities.rentalGearShop ? 'Available' : 'None'}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Tip: You can compare up to 3 spots at once.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
