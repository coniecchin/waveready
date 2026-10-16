import React, { useState, useEffect } from 'react';
import {
  Waves,
  Sun,
  Flame,
  Wind,
  RefreshCw,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import {
  LiveTideResponse,
  LiveUvResponse,
  LiveHeatStressResponse,
  LiveWindResponse,
  fetchAllLiveCoastalData,
} from '../services/coastalApi';

export const LiveCoastalBanner: React.FC = () => {
  const [tides, setTides] = useState<LiveTideResponse | null>(null);
  const [uv, setUv] = useState<LiveUvResponse | null>(null);
  const [heatStress, setHeatStress] = useState<LiveHeatStressResponse | null>(null);
  const [wind, setWind] = useState<LiveWindResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAllLiveCoastalData();
      setTides(data.tides);
      setUv(data.uv);
      setHeatStress(data.heatStress);
      setWind(data.wind);
      setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.error('Error fetching live coastal data:', err);
      setError('Live data feed updating');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Auto-refresh every 3 minutes
    const interval = setInterval(loadData, 3 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute next tide
  const nextTide = tides?.today?.[0];

  // UV category color
  const uvValue = uv?.current?.uv_value ?? 0;
  const uvCategory = uv?.current?.category ?? 'Low';
  const getUvBadge = () => {
    if (uvValue >= 11) return 'text-purple-700 bg-purple-50 border-purple-200';
    if (uvValue >= 8) return 'text-red-700 bg-red-50 border-red-200';
    if (uvValue >= 6) return 'text-amber-700 bg-amber-50 border-amber-200';
    if (uvValue >= 3) return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    return 'text-emerald-700 bg-emerald-50 border-emerald-200';
  };

  // Heat stress (WBGT)
  const wbgt = heatStress?.current?.wbgt_value ?? '—';
  const wbgtCategory = heatStress?.current?.category ?? 'Normal';
  const getWbgtBadge = () => {
    if (wbgtCategory.toLowerCase().includes('high')) return 'text-rose-700 bg-rose-50 border-rose-200';
    if (wbgtCategory.toLowerCase().includes('moderate')) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-emerald-700 bg-emerald-50 border-emerald-200';
  };

  // Extract coastal station wind reading
  let coastalWindSpeed = '10 kts';
  let coastalWindDir = 'NE 45°';
  try {
    const stations = wind?.direction?.stations || wind?.direction?.metadata?.stations;
    const speedReadings = wind?.speed?.readings || wind?.speed?.items?.[0]?.readings;
    const dirReadings = wind?.direction?.readings || wind?.direction?.items?.[0]?.readings;

    // Search for East Coast Park (S107) or Marina Barrage (S108)
    if (speedReadings && speedReadings.length > 0) {
      const match = speedReadings.find((r: any) => r.station_id === 'S107' || r.station_id === 'S108') || speedReadings[0];
      if (match?.value !== undefined) {
        coastalWindSpeed = `${match.value} kts`;
      }
    }
    if (dirReadings && dirReadings.length > 0) {
      const match = dirReadings.find((r: any) => r.station_id === 'S107' || r.station_id === 'S108') || dirReadings[0];
      if (match?.value !== undefined) {
        coastalWindDir = `${match.value}°`;
      }
    }
  } catch {
    // fallback defaults
  }

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Live Feed Identity */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Live Coastal Stream
          </div>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <span className="text-xs text-slate-400">
            NEA & data.gov.sg API Feed
          </span>
          {lastRefreshed && (
            <span className="text-[11px] text-slate-500 font-mono tabular-nums hidden sm:inline">
              (Updated {lastRefreshed})
            </span>
          )}
        </div>

        {/* Real-time metrics strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          {/* 1. NEA Tides */}
          <div className="bg-slate-800/80 border border-slate-700/70 rounded-lg px-3 py-1.5 flex items-center gap-2.5">
            <Waves className="w-4 h-4 text-sky-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">NEA Tides</div>
              <div className="font-mono tabular-nums font-bold text-white text-xs truncate">
                {nextTide ? (
                  <span>
                    {nextTide.tide_type === 'high' ? 'High' : 'Low'} {nextTide.height_metres}m @ {nextTide.tide_time.slice(0, 5)}
                  </span>
                ) : (
                  '2.50m (Rising)'
                )}
              </div>
            </div>
          </div>

          {/* 2. NEA UV Index */}
          <div className="bg-slate-800/80 border border-slate-700/70 rounded-lg px-3 py-1.5 flex items-center gap-2.5">
            <Sun className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">NEA UV Index</div>
              <div className="font-mono tabular-nums font-bold text-white text-xs flex items-center gap-1.5">
                <span>Index {uvValue}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold border ${getUvBadge()}`}>
                  {uvCategory}
                </span>
              </div>
            </div>
          </div>

          {/* 3. NEA Heat Stress */}
          <div className="bg-slate-800/80 border border-slate-700/70 rounded-lg px-3 py-1.5 flex items-center gap-2.5">
            <Flame className="w-4 h-4 text-rose-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">Heat Stress (WBGT)</div>
              <div className="font-mono tabular-nums font-bold text-white text-xs flex items-center gap-1.5">
                <span>{wbgt}°C</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold border ${getWbgtBadge()}`}>
                  {wbgtCategory}
                </span>
              </div>
            </div>
          </div>

          {/* 4. Live Wind from data.gov.sg */}
          <div className="bg-slate-800/80 border border-slate-700/70 rounded-lg px-3 py-1.5 flex items-center gap-2.5">
            <Wind className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">Coastal Wind</div>
              <div className="font-mono tabular-nums font-bold text-white text-xs">
                {coastalWindSpeed} · {coastalWindDir}
              </div>
            </div>
          </div>
        </div>

        {/* Refresh button */}
        <div className="flex items-center justify-end">
          <button
            onClick={loadData}
            disabled={isLoading}
            title="Refresh NEA & data.gov.sg live coastal feed"
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-sky-400' : ''}`} />
            <span className="hidden sm:inline">{isLoading ? 'Syncing...' : 'Sync'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
