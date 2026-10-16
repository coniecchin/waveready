import React, { useState } from 'react';
import { Beach, Coordinates, Activity } from '../types/beach';
import { Compass, Waves, Wind, Anchor, MapPin, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { milesToKm, ftToMeters, knotsToKmh } from '../utils/geo';

interface CoastalRadarMapProps {
  center: Coordinates;
  centerName: string;
  beaches: Beach[];
  selectedActivity: Activity | 'all';
  isMetric: boolean;
  onSelectBeach: (beach: Beach) => void;
  onBookCharter?: (beach: Beach) => void;
}

export const CoastalRadarMap: React.FC<CoastalRadarMapProps> = ({
  center,
  centerName,
  beaches,
  selectedActivity,
  isMetric,
  onSelectBeach,
  onBookCharter,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeHoverBeach, setActiveHoverBeach] = useState<Beach | null>(null);

  // Radar size parameters
  const svgWidth = 800;
  const svgHeight = 520;
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;

  // Scaling factor: degrees of lat/lng to pixels
  // Roughly 1 deg lat ~ 69 miles.
  // Base scale at zoom=1 covers ~60 miles radius
  const scale = 320 * zoomLevel;

  // Project lat/lng relative to center
  const getCoordinatesPosition = (coord: Coordinates) => {
    // Mercator-like local flat projection
    const dLng = (coord.lng - center.lng) * Math.cos((center.lat * Math.PI) / 180);
    const dLat = coord.lat - center.lat;

    const x = centerX + dLng * scale;
    const y = centerY - dLat * scale; // inverted Y in SVG
    return { x, y };
  };

  const getMarkerColor = (level?: string) => {
    switch (level) {
      case 'Optimal':
        return '#0284c7'; // ocean blue
      case 'Good':
        return '#0ea5e9'; // sky blue
      case 'Fair':
        return '#d97706'; // amber
      default:
        return '#64748b'; // slate
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 text-white overflow-hidden shadow-xl">
      {/* Top Map Header Controls */}
      <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-950/70">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
          <span className="font-semibold text-white">Coastal Marine Radar</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">Centered on {centerName}</span>
        </div>

        {/* Zoom & Reset Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.3, 3))}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.3, 0.6))}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
            title="Reset zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Radar Display Viewport */}
      <div className="relative w-full overflow-hidden bg-slate-950 flex items-center justify-center p-2 min-h-[460px]">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto select-none"
          style={{ maxHeight: '540px' }}
        >
          {/* Subtle Radar grid background */}
          <defs>
            <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.12" />
              <stop offset="85%" stopColor="#0f172a" stopOpacity="0.0" />
            </radialGradient>
            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeOpacity="0.4" />
            </pattern>
          </defs>

          <rect width={svgWidth} height={svgHeight} fill="#090d16" />
          <rect width={svgWidth} height={svgHeight} fill="url(#gridPattern)" />
          <circle cx={centerX} cy={centerY} r={240 * zoomLevel} fill="url(#radarGlow)" />

          {/* Range rings (10mi, 25mi, 50mi roughly) */}
          {[60, 130, 210].map((radius, idx) => {
            const adjustedR = radius * zoomLevel;
            const distanceLabel = idx === 0 ? '10 mi' : idx === 1 ? '25 mi' : '50 mi';
            return (
              <g key={radius}>
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={adjustedR}
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={centerX + 6}
                  y={centerY - adjustedR + 12}
                  fill="#475569"
                  fontSize="10"
                  fontFamily="JetBrains Mono"
                >
                  {distanceLabel}
                </text>
              </g>
            );
          })}

          {/* Crosshair axes */}
          <line x1={0} y1={centerY} x2={svgWidth} y2={centerY} stroke="#1e293b" strokeWidth="1" strokeDasharray="2 4" />
          <line x1={centerX} y1={0} x2={centerX} y2={svgHeight} stroke="#1e293b" strokeWidth="1" strokeDasharray="2 4" />

          {/* Compass labels */}
          <text x={centerX} y={20} fill="#64748b" fontSize="11" textAnchor="middle" fontWeight="bold">N</text>
          <text x={svgWidth - 20} y={centerY + 4} fill="#64748b" fontSize="11" textAnchor="end" fontWeight="bold">E</text>
          <text x={centerX} y={svgHeight - 10} fill="#64748b" fontSize="11" textAnchor="middle" fontWeight="bold">S</text>
          <text x={20} y={centerY + 4} fill="#64748b" fontSize="11" textAnchor="start" fontWeight="bold">W</text>

          {/* Center User / Anchor pin */}
          <circle cx={centerX} cy={centerY} r={6} fill="#38bdf8" />
          <circle cx={centerX} cy={centerY} r={12} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.6" />
          <text
            x={centerX}
            y={centerY + 22}
            fill="#e2e8f0"
            fontSize="10"
            fontFamily="Plus Jakarta Sans"
            fontWeight="bold"
            textAnchor="middle"
          >
            {centerName}
          </text>

          {/* Beach Markers */}
          {beaches.map((beach) => {
            const { x, y } = getCoordinatesPosition(beach.coordinates);
            // Check if within visible bounds
            const isInside = x >= 20 && x <= svgWidth - 20 && y >= 20 && y <= svgHeight - 20;
            if (!isInside) return null;

            const suitability = selectedActivity !== 'all' ? beach.suitability[selectedActivity] : null;
            const level = suitability?.level ?? 'Good';
            const markerColor = getMarkerColor(level);
            const isHovered = activeHoverBeach?.id === beach.id;

            return (
              <g
                key={beach.id}
                className="cursor-pointer transition-all"
                onClick={() => onSelectBeach(beach)}
                onMouseEnter={() => setActiveHoverBeach(beach)}
                onMouseLeave={() => setActiveHoverBeach(null)}
              >
                {/* Ping circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 16 : 10}
                  fill={markerColor}
                  fillOpacity={isHovered ? 0.35 : 0.2}
                  stroke={markerColor}
                  strokeWidth={isHovered ? 2 : 1}
                />
                <circle cx={x} cy={y} r={isHovered ? 5 : 4} fill={markerColor} />

                {/* Spot Title Label */}
                <text
                  x={x}
                  y={y - 12}
                  fill={isHovered ? '#38bdf8' : '#cbd5e1'}
                  fontSize={isHovered ? '11' : '10'}
                  fontFamily="Plus Jakarta Sans"
                  fontWeight={isHovered ? '700' : '500'}
                  textAnchor="middle"
                  className="pointer-events-none drop-shadow"
                >
                  {beach.name.length > 20 ? `${beach.name.slice(0, 18)}...` : beach.name}
                </text>

                {/* Distance tag under marker */}
                {beach.distanceMiles !== undefined && (
                  <text
                    x={x}
                    y={y + 16}
                    fill="#94a3b8"
                    fontSize="9"
                    fontFamily="JetBrains Mono"
                    textAnchor="middle"
                    className="pointer-events-none"
                  >
                    {isMetric ? `${milesToKm(beach.distanceMiles)}km` : `${beach.distanceMiles}mi`}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover / Selected Spot Quick Floating Dossier */}
        {activeHoverBeach && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-slate-900/95 border border-slate-700/80 rounded-xl p-4 shadow-2xl backdrop-blur-md z-20">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="text-[11px] text-sky-400 font-medium">
                  {activeHoverBeach.region} · {activeHoverBeach.breakType}
                </div>
                <h4 className="text-sm font-bold text-white">{activeHoverBeach.name}</h4>
              </div>
              {activeHoverBeach.distanceMiles !== undefined && (
                <span className="text-xs font-mono tabular-nums text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                  {isMetric ? `${milesToKm(activeHoverBeach.distanceMiles)} km` : `${activeHoverBeach.distanceMiles} mi`}
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800 text-center text-xs mb-3">
              <div>
                <span className="text-[10px] text-slate-400 block">Swell</span>
                <span className="font-mono tabular-nums font-bold text-sky-300">
                  {isMetric ? `${ftToMeters(activeHoverBeach.conditions.waveHeightFt)}m` : `${activeHoverBeach.conditions.waveHeightFt}ft`}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Wind</span>
                <span className="font-mono tabular-nums font-bold text-slate-200">
                  {isMetric ? `${knotsToKmh(activeHoverBeach.conditions.windSpeedKts)}km/h` : `${activeHoverBeach.conditions.windSpeedKts}kts`}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Tide</span>
                <span className="text-slate-200 font-semibold truncate block">
                  {activeHoverBeach.conditions.tideStatus}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectBeach(activeHoverBeach)}
                className="flex-1 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors text-center"
              >
                Inspect Spot
              </button>
              {activeHoverBeach.fishingData.activeCharters.length > 0 && onBookCharter && (
                <button
                  onClick={() => onBookCharter(activeHoverBeach)}
                  className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg transition-colors border border-slate-700 whitespace-nowrap"
                >
                  Charters ({activeHoverBeach.fishingData.activeCharters.length})
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Radar Map Legend */}
      <div className="px-5 py-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
            Optimal Match
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0ea5e9]" />
            Good Condition
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d97706]" />
            Fair / Caution
          </span>
        </div>
        <div className="text-[11px] text-slate-500">
          Click any radar pin to view marine forecast and charter docks
        </div>
      </div>
    </div>
  );
};
