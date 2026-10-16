import React from 'react';
import {
  X,
  MapPin,
  Waves,
  Wind,
  Droplets,
  Anchor,
  Clock,
  ShieldAlert,
  Car,
  Compass,
  CheckCircle2,
  Phone,
  Mail,
  ExternalLink,
  Bookmark,
  Layers,
  Star
} from 'lucide-react';
import { Beach, Activity } from '../types/beach';
import {
  milesToKm,
  ftToMeters,
  fahrenheitToCelsius,
  knotsToKmh,
  getWindRotationDeg,
} from '../utils/geo';

interface BeachDetailModalProps {
  beach: Beach;
  onClose: () => void;
  isMetric: boolean;
  isSaved: boolean;
  onToggleSave: (beachId: string) => void;
  isCompared: boolean;
  onToggleCompare: (beachId: string) => void;
  onBookCharter: (beach: Beach) => void;
}

export const BeachDetailModal: React.FC<BeachDetailModalProps> = ({
  beach,
  onClose,
  isMetric,
  isSaved,
  onToggleSave,
  isCompared,
  onToggleCompare,
  onBookCharter,
}) => {
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

  // Close modal on escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Controls */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium truncate">
            <span className="font-bold text-slate-900 truncate">{beach.name}</span>
            <span aria-hidden="true">·</span>
            <span>{beach.region}</span>
            {distance && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums text-sky-700 font-semibold">{distance}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(beach.id)}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isCompared
                  ? 'bg-sky-50 text-sky-700 border border-sky-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isCompared ? 'Compared' : 'Compare'}</span>
            </button>

            <button
              onClick={() => onToggleSave(beach.id)}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isSaved
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Banner Section */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={beach.image}
            alt={beach.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-medium text-sky-300 mb-1">
              <span>{beach.breakType}</span>
              <span aria-hidden="true">·</span>
              <span>GPS: {beach.coordinates.lat.toFixed(4)}°, {beach.coordinates.lng.toFixed(4)}°</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {beach.name}
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              {beach.description}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-8">
          {/* Key Oceanographic Conditions Live Summary */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Live Coastal Conditions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 border border-slate-200/80 rounded-xl p-4">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Swell & Waves</span>
                <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                  {waveHeight}
                </div>
                <div className="text-xs text-slate-500 font-mono tabular-nums">
                  {beach.conditions.wavePeriodSec}s period · {beach.conditions.swellDirection}
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 block font-medium">Wind Vector</span>
                <div className="text-lg font-bold text-slate-900 font-mono tabular-nums flex items-center gap-1">
                  <span>{windSpeed}</span>
                  <span
                    style={{ transform: `rotate(${windDeg}deg)` }}
                    className="inline-block text-sky-600 font-bold"
                  >
                    ↑
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  {beach.conditions.windType} ({beach.conditions.windDirection})
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 block font-medium">Tide Dynamics</span>
                <div className="text-lg font-bold text-slate-900">
                  {beach.conditions.tideStatus}
                </div>
                <div className="text-xs text-slate-500 font-mono tabular-nums">
                  {beach.conditions.nextTide}
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 block font-medium">Water Quality</span>
                <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                  {waterTemp}
                </div>
                <div className="text-xs text-slate-500 font-mono tabular-nums">
                  {beach.conditions.waterVisibilityFt} ft clarity
                </div>
              </div>
            </div>
          </div>

          {/* Hourly Forecast Timeline Strip */}
          {beach.conditions.hourlyForecast.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-500" />
                  Hourly Marine Timeline (Today)
                </h3>
                <span className="text-xs text-slate-400">NOAA Marine Observation Model</span>
              </div>

              <div className="grid grid-cols-5 gap-2 border border-slate-200 rounded-xl p-3 bg-white">
                {beach.conditions.hourlyForecast.map((hour, idx) => (
                  <div
                    key={idx}
                    className="text-center p-2 rounded-lg bg-slate-50/70 border border-slate-100 flex flex-col items-center justify-between gap-1"
                  >
                    <span className="text-xs font-semibold text-slate-500 font-mono tabular-nums">
                      {hour.time}
                    </span>
                    <span className="font-bold text-sm text-slate-900 font-mono tabular-nums">
                      {isMetric ? `${ftToMeters(hour.waveFt)}m` : `${hour.waveFt}ft`}
                    </span>
                    <span className="text-[11px] text-slate-600 font-mono tabular-nums">
                      {isMetric ? `${knotsToKmh(hour.windKts)}kph` : `${hour.windKts}kts`}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate w-full">
                      {hour.condition}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Suitability Breakdown */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Suitability Breakdown by Activity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(beach.suitability).map(([activityKey, detail]) => {
                if (!detail) return null;
                const activityTitles: Record<string, string> = {
                  surfing: 'Surfing & Wave Riding',
                  fishing_charter: 'Fishing Charters & Offshore Access',
                  kitesurfing: 'Kiteboarding & Wing Foiling',
                  kayak_sup: 'Kayak & Stand-Up Paddleboard',
                  snorkeling_diving: 'Snorkeling & Scuba Diving',
                  boat_launch: 'Private Boat Ramp Launch',
                  windsurfing: 'Windsurfing',
                };

                return (
                  <div
                    key={activityKey}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-slate-900 text-sm">
                        {activityTitles[activityKey] || activityKey}
                      </span>
                      <span className="font-mono tabular-nums font-bold text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                        {detail.score}/100 · {detail.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {detail.reason}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fishing Charter & Boat Ramp Dossier */}
          <div className="border border-sky-100 bg-sky-50/40 rounded-2xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-sky-100">
              <div className="flex items-center gap-2">
                <Anchor className="w-5 h-5 text-sky-700" />
                <h3 className="text-base font-bold text-slate-900">
                  Fishing Charters & Boat Launch Dossier
                </h3>
              </div>
              {beach.fishingData.activeCharters.length > 0 && (
                <button
                  onClick={() => onBookCharter(beach)}
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto shadow-xs"
                >
                  Book / Inquire Charter
                </button>
              )}
            </div>

            {/* Ramp specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs">
              <div className="bg-white p-3 rounded-xl border border-sky-100">
                <span className="text-slate-400 block font-medium">Launch Ramp Type</span>
                <span className="font-bold text-slate-800 text-sm block mt-0.5">
                  {beach.fishingData.rampType}
                </span>
                <span className="text-slate-500 font-mono tabular-nums">
                  {beach.fishingData.lanes} lanes · Max {beach.fishingData.maxVesselLengthFt}ft vessel
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-sky-100">
                <span className="text-slate-400 block font-medium">Marina Facility</span>
                <span className="font-bold text-slate-800 text-sm block mt-0.5">
                  {beach.fishingData.marinaName || 'Public Shore Launch'}
                </span>
                <span className="text-slate-500">
                  {beach.fishingData.slipsCount ? `${beach.fishingData.slipsCount} slips` : 'Direct ocean access'}
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-sky-100">
                <span className="text-slate-400 block font-medium">Dock Amenities & Fee</span>
                <span className="font-bold text-slate-800 text-sm block mt-0.5">
                  {beach.fishingData.rampFee}
                </span>
                <div className="flex items-center gap-2 text-slate-500 mt-1">
                  <span>{beach.fishingData.fuelDock ? 'Fuel dock ✓' : 'No fuel'}</span>
                  <span>·</span>
                  <span>{beach.fishingData.liveBaitShop ? 'Live bait ✓' : 'No bait'}</span>
                </div>
              </div>
            </div>

            {/* Seasonal target species */}
            {beach.fishingData.seasonalTargetSpecies.length > 0 && (
              <div className="mb-5">
                <span className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Seasonal Target Species in Area:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {beach.fishingData.seasonalTargetSpecies.map((species, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md font-medium"
                    >
                      {species}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Available Charter Vessels */}
            {beach.fishingData.activeCharters.length > 0 && (
              <div>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-3">
                  Verified Local Charter Vessels & Captains:
                </span>
                <div className="space-y-3">
                  {beach.fishingData.activeCharters.map((charter) => (
                    <div
                      key={charter.id}
                      className="bg-white rounded-xl border border-slate-200 p-4 hover:border-sky-300 transition-colors shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-base">
                              {charter.name}
                            </h4>
                            <span className="text-xs font-mono tabular-nums text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              {charter.rating} ({charter.reviewCount})
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {charter.captain} · {charter.boatName} ({charter.boatLengthFt}ft {charter.boatType})
                          </div>
                        </div>

                        <div className="text-right sm:text-right">
                          <div className="text-xs text-slate-400 font-medium">Rates from</div>
                          <div className="font-mono tabular-nums font-bold text-slate-900 text-sm">
                            ${charter.halfDayRate} <span className="text-xs font-normal text-slate-500">4hr</span> · ${charter.fullDayRate} <span className="text-xs font-normal text-slate-500">8hr</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                        {charter.description}
                      </p>

                      <div className="flex items-center justify-between flex-wrap gap-2 pt-2.5 border-t border-slate-100 text-xs">
                        <div className="flex items-center gap-4 text-slate-500">
                          <span className="flex items-center gap-1 font-mono">
                            <Phone className="w-3 h-3 text-slate-400" />
                            {charter.phone}
                          </span>
                          <span className="flex items-center gap-1 font-mono">
                            <Mail className="w-3 h-3 text-slate-400" />
                            {charter.email}
                          </span>
                        </div>
                        <button
                          onClick={() => onBookCharter(beach)}
                          className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg text-xs transition-colors"
                        >
                          Send Booking Inquiry
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Amenities & Parking info */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Beach Amenities & Access
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-slate-400 block font-medium">Parking</span>
                <span className="font-bold text-slate-800 text-sm block mt-0.5">
                  {beach.amenities.parkingSpots} spots
                </span>
                <span className="text-slate-500">{beach.amenities.parkingFee}</span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-slate-400 block font-medium">Access Way</span>
                <span className="font-bold text-slate-800 text-sm block mt-0.5">
                  {beach.amenities.accessType}
                </span>
                <span className="text-slate-500">
                  {beach.amenities.dogFriendly ? 'Dog-friendly' : 'No pets'}
                </span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-slate-400 block font-medium">Safety Crew</span>
                <span className="font-bold text-slate-800 text-sm block mt-0.5">
                  {beach.amenities.lifeguardOnDuty ? 'Lifeguard Stationed' : 'Unsupervised'}
                </span>
                <span className="text-slate-500">
                  {beach.amenities.restroomsShowers ? 'Restrooms & Showers' : 'Primitive'}
                </span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-slate-400 block font-medium">Equipment</span>
                <span className="font-bold text-slate-800 text-sm block mt-0.5">
                  {beach.amenities.rentalGearShop ? 'Rental Shop On-Site' : 'Bring Your Own'}
                </span>
                <span className="text-slate-500">Board & Kayak Rentals</span>
              </div>
            </div>
          </div>

          {/* Insider Tip & Safety Notice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 text-xs text-amber-900 leading-relaxed">
              <div className="font-bold mb-1 flex items-center gap-1.5 text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Hazards & Safety Advisory
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                {beach.conditions.hazards.map((h, i) => (
                  <li key={i}>{h.label}</li>
                ))}
                <li>Always monitor current tide changes before launching vessels or paddling outside the reef line.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 leading-relaxed">
              <div className="font-bold mb-1 text-slate-900 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-sky-600" />
                Local Captain & Waterman Insider Tip
              </div>
              <p>{beach.insiderTip}</p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="sticky bottom-0 z-20 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${beach.coordinates.lat},${beach.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1.5"
          >
            <ExternalLink className="w-4 h-4 text-slate-400" />
            Open Directions in Google Maps
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200/80 rounded-lg transition-colors"
            >
              Close Dossier
            </button>
            {beach.fishingData.activeCharters.length > 0 && (
              <button
                onClick={() => onBookCharter(beach)}
                className="px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors shadow-sm"
              >
                Inquire Charter Trip
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
