import React, { useState, useEffect, useRef } from 'react';
import { Beach, Coordinates, Activity } from '../types/beach';
import {
  Compass,
  Waves,
  Wind,
  Anchor,
  MapPin,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Map as MapIcon,
  Radar
} from 'lucide-react';
import { milesToKm, ftToMeters, knotsToKmh } from '../utils/geo';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  const [mapMode, setMapMode] = useState<'onemap' | 'radar'>('onemap');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeHoverBeach, setActiveHoverBeach] = useState<Beach | null>(null);

  const leafletContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);

  // Initialize or update Leaflet with OneMap tiles
  useEffect(() => {
    if (mapMode !== 'onemap' || !leafletContainerRef.current) return;

    if (!leafletMapRef.current) {
      const map = L.map(leafletContainerRef.current, {
        center: [center.lat, center.lng],
        zoom: 12,
        minZoom: 10,
        maxZoom: 18,
      });

      // OneMap Tiles as basemap (GET https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png)
      L.tileLayer('https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 10,
        attribution:
          '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:14px;width:14px;display:inline-block;vertical-align:middle;margin-right:4px;"/> OneMap | Singapore Land Authority',
      }).addTo(map);

      leafletMapRef.current = map;
    } else {
      leafletMapRef.current.setView([center.lat, center.lng]);
    }

    const map = leafletMapRef.current;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        map.removeLayer(layer);
      }
    });

    // Add Center location pulse marker
    const centerMarker = L.circleMarker([center.lat, center.lng], {
      radius: 8,
      fillColor: '#0284c7',
      color: '#ffffff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9,
    }).addTo(map);
    centerMarker.bindPopup(`<b>${centerName}</b><br><small>Current Coastal Center</small>`);

    // Add beach markers
    beaches.forEach((beach) => {
      const suitability = selectedActivity !== 'all' ? beach.suitability[selectedActivity] : null;
      const level = suitability?.level ?? 'Good';
      const markerColor =
        level === 'Optimal' ? '#0284c7' : level === 'Good' ? '#0ea5e9' : '#d97706';

      const customIcon = L.divIcon({
        className: 'custom-coastal-pin',
        html: `
          <div style="background-color: ${markerColor}; width: 26px; height: 26px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.3); color: white; font-weight: bold; font-size: 11px;">
            ⚓
          </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });

      const marker = L.marker([beach.coordinates.lat, beach.coordinates.lng], {
        icon: customIcon,
      }).addTo(map);

      const distanceText =
        beach.distanceMiles !== undefined
          ? isMetric
            ? `${milesToKm(beach.distanceMiles)} km away`
            : `${beach.distanceMiles} mi away`
          : '';

      marker.bindPopup(`
        <div style="min-width: 180px; font-family: 'Plus Jakarta Sans', sans-serif;">
          <h4 style="margin: 0 0 4px 0; font-size: 13px; font-weight: bold; color: #0f172a;">${beach.name}</h4>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 6px;">${beach.region} · ${distanceText}</div>
          <div style="font-size: 11px; font-weight: 600; color: #0284c7; margin-bottom: 8px;">
            Swell: ${beach.conditions.waveHeightFt}ft · Wind: ${beach.conditions.windSpeedKts}kts
          </div>
          <button id="btn-${beach.id}" style="width: 100%; background: #0f172a; color: white; border: none; border-radius: 6px; padding: 5px 8px; font-size: 11px; cursor: pointer; font-weight: 600;">
            Inspect Beach
          </button>
        </div>
      `);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-${beach.id}`);
        if (btn) {
          btn.onclick = () => onSelectBeach(beach);
        }
      });
    });

    return () => {
      // Cleanup on unmount or mode switch
    };
  }, [mapMode, center, beaches, selectedActivity, isMetric, centerName, onSelectBeach]);

  // Clean destroy on component unmount
  useEffect(() => {
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // Radar size parameters
  const svgWidth = 800;
  const svgHeight = 520;
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;
  const scale = 320 * zoomLevel;

  const getCoordinatesPosition = (coord: Coordinates) => {
    const dLng = (coord.lng - center.lng) * Math.cos((center.lat * Math.PI) / 180);
    const dLat = coord.lat - center.lat;
    const x = centerX + dLng * scale;
    const y = centerY - dLat * scale;
    return { x, y };
  };

  const getMarkerColor = (level?: string) => {
    switch (level) {
      case 'Optimal':
        return '#0284c7';
      case 'Good':
        return '#0ea5e9';
      case 'Fair':
        return '#d97706';
      default:
        return '#64748b';
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 text-white overflow-hidden shadow-xl">
      {/* Top Map Header Controls */}
      <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between flex-wrap gap-4 bg-slate-950/70">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
          <span className="font-semibold text-white">
            {mapMode === 'onemap' ? 'OneMap Basemap (Singapore SLA)' : 'Coastal Marine Radar'}
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">Centered on {centerName}</span>
        </div>

        {/* View Mode Toggle: OneMap vs Radar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setMapMode('onemap')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 font-medium ${
                mapMode === 'onemap'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              OneMap Basemap
            </button>
            <button
              onClick={() => setMapMode('radar')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 font-medium ${
                mapMode === 'radar'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Radar className="w-3.5 h-3.5" />
              Radar Rings
            </button>
          </div>

          {mapMode === 'radar' && (
            <div className="flex items-center gap-1">
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
          )}
        </div>
      </div>

      {/* Main Viewport */}
      {mapMode === 'onemap' ? (
        <div className="relative w-full h-[520px] bg-slate-950">
          <div ref={leafletContainerRef} className="w-full h-full z-10" />
        </div>
      ) : (
        <div className="relative w-full overflow-hidden bg-slate-950 flex items-center justify-center p-2 min-h-[460px]">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto select-none"
            style={{ maxHeight: '540px' }}
          >
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

            <line x1={0} y1={centerY} x2={svgWidth} y2={centerY} stroke="#1e293b" strokeWidth="1" strokeDasharray="2 4" />
            <line x1={centerX} y1={0} x2={centerX} y2={svgHeight} stroke="#1e293b" strokeWidth="1" strokeDasharray="2 4" />

            <text x={centerX} y={20} fill="#64748b" fontSize="11" textAnchor="middle" fontWeight="bold">N</text>
            <text x={svgWidth - 20} y={centerY + 4} fill="#64748b" fontSize="11" textAnchor="end" fontWeight="bold">E</text>
            <text x={centerX} y={svgHeight - 10} fill="#64748b" fontSize="11" textAnchor="middle" fontWeight="bold">S</text>
            <text x={20} y={centerY + 4} fill="#64748b" fontSize="11" textAnchor="start" fontWeight="bold">W</text>

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

            {beaches.map((beach) => {
              const { x, y } = getCoordinatesPosition(beach.coordinates);
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
      )}

      {/* Map Legend & OneMap Attribution */}
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
        <div className="text-[11px] text-slate-500 flex items-center gap-2">
          <span>Official OneMap SLA basemap & NEA live coastal stream</span>
        </div>
      </div>
    </div>
  );
};
