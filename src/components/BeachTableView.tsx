import React from 'react';
import { Beach, Activity } from '../types/beach';
import { Anchor, ChevronRight, Bookmark, Layers } from 'lucide-react';
import {
  milesToKm,
  ftToMeters,
  fahrenheitToCelsius,
  knotsToKmh,
} from '../utils/geo';

interface BeachTableViewProps {
  beaches: Beach[];
  selectedActivity: Activity | 'all';
  isMetric: boolean;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  compareIds: string[];
  onToggleCompare: (id: string) => void;
  onSelectBeach: (beach: Beach) => void;
  onBookCharter?: (beach: Beach) => void;
}

export const BeachTableView: React.FC<BeachTableViewProps> = ({
  beaches,
  selectedActivity,
  isMetric,
  savedIds,
  onToggleSave,
  compareIds,
  onToggleCompare,
  onSelectBeach,
  onBookCharter,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Beach & Region</th>
              <th className="py-3 px-4 text-right">Distance</th>
              <th className="py-3 px-4 text-right">Swell</th>
              <th className="py-3 px-4 text-right">Wind</th>
              <th className="py-3 px-4">Tide</th>
              <th className="py-3 px-4 text-right">Water</th>
              <th className="py-3 px-4">Boat Ramp</th>
              <th className="py-3 px-4 text-center">Charters</th>
              <th className="py-3 px-4 text-center">Suitability</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {beaches.map((beach) => {
              const suitability =
                selectedActivity !== 'all'
                  ? beach.suitability[selectedActivity]
                  : Object.values(beach.suitability)[0];

              const isSaved = savedIds.includes(beach.id);
              const isCompared = compareIds.includes(beach.id);

              return (
                <tr
                  key={beach.id}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  onClick={() => onSelectBeach(beach)}
                >
                  {/* Beach Name & Region */}
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {beach.name}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <span>{beach.region}</span>
                      <span aria-hidden="true">·</span>
                      <span>{beach.breakType}</span>
                    </div>
                  </td>

                  {/* Distance */}
                  <td className="py-3 px-4 text-right font-mono tabular-nums font-semibold text-slate-800">
                    {beach.distanceMiles !== undefined
                      ? isMetric
                        ? `${milesToKm(beach.distanceMiles)} km`
                        : `${beach.distanceMiles} mi`
                      : '—'}
                  </td>

                  {/* Swell */}
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono tabular-nums font-bold text-slate-900 block">
                      {isMetric
                        ? `${ftToMeters(beach.conditions.waveHeightFt)}m`
                        : `${beach.conditions.waveHeightFt}ft`}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono tabular-nums">
                      {beach.conditions.wavePeriodSec}s
                    </span>
                  </td>

                  {/* Wind */}
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono tabular-nums font-bold text-slate-900 block">
                      {isMetric
                        ? `${knotsToKmh(beach.conditions.windSpeedKts)}km/h`
                        : `${beach.conditions.windSpeedKts}kts`}
                    </span>
                    <span className="text-[11px] text-slate-500 truncate block">
                      {beach.conditions.windDirection}
                    </span>
                  </td>

                  {/* Tide */}
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800 block text-xs">
                      {beach.conditions.tideStatus}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono tabular-nums">
                      {beach.conditions.tideHeightFt}ft
                    </span>
                  </td>

                  {/* Water */}
                  <td className="py-3 px-4 text-right font-mono tabular-nums font-semibold text-slate-800">
                    {isMetric
                      ? `${fahrenheitToCelsius(beach.conditions.waterTempF)}°C`
                      : `${beach.conditions.waterTempF}°F`}
                  </td>

                  {/* Boat Ramp */}
                  <td className="py-3 px-4">
                    {beach.fishingData.boatRampAvailable ? (
                      <div>
                        <div className="flex items-center gap-1 text-xs font-semibold text-slate-900">
                          <Anchor className="w-3.5 h-3.5 text-sky-600" />
                          <span>{beach.fishingData.lanes} Lanes</span>
                        </div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[140px]">
                          {beach.fishingData.rampFee}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">No public ramp</span>
                    )}
                  </td>

                  {/* Charters */}
                  <td className="py-3 px-4 text-center">
                    {beach.fishingData.activeCharters.length > 0 ? (
                      <span className="font-mono tabular-nums font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs">
                        {beach.fishingData.activeCharters.length} boats
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>

                  {/* Suitability */}
                  <td className="py-3 px-4 text-center">
                    {suitability ? (
                      <div>
                        <span className="font-mono tabular-nums font-bold text-xs text-sky-800">
                          {suitability.score}/100
                        </span>
                        <div className="text-[10px] text-slate-500 font-medium capitalize">
                          {suitability.level}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td
                    className="py-3 px-4 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onToggleCompare(beach.id)}
                        title={isCompared ? 'Remove compare' : 'Add to compare'}
                        className={`p-1.5 rounded transition-colors ${
                          isCompared
                            ? 'text-sky-600 bg-sky-50'
                            : 'text-slate-400 hover:text-slate-700'
                        }`}
                      >
                        <Layers className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onToggleSave(beach.id)}
                        title={isSaved ? 'Remove from saved' : 'Save'}
                        className={`p-1.5 rounded transition-colors ${
                          isSaved
                            ? 'text-amber-500 bg-amber-50'
                            : 'text-slate-400 hover:text-slate-700'
                        }`}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`}
                        />
                      </button>
                      <button
                        onClick={() => onSelectBeach(beach)}
                        className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
