/**
 * Client service to fetch live coastal data through serverless endpoints:
 * - /api/tides (NEA Tides)
 * - /api/uv (NEA UV)
 * - /api/heat-stress (NEA Heat Stress)
 * - /api/wind (data.gov.sg Wind Speed & Direction)
 * - /api/onemap (OneMap Basemap Configuration)
 */

export interface LiveTideItem {
  id: number;
  date: string;
  tide_time: string;
  height_metres: string;
  tide_type: 'high' | 'low';
}

export interface LiveTideResponse {
  today?: LiveTideItem[];
  source?: string;
}

export interface LiveUvResponse {
  current?: {
    id: number;
    uv_value: number;
    category: string;
    timestamp: string;
  };
  source?: string;
}

export interface LiveHeatStressResponse {
  current?: {
    id: number;
    wbgt_value: string;
    category: string;
    timestamp: string;
  };
  source?: string;
}

export interface LiveWindResponse {
  direction?: any;
  speed?: any;
  timestamp?: string;
}

export interface LiveCoastalData {
  tides: LiveTideResponse | null;
  uv: LiveUvResponse | null;
  heatStress: LiveHeatStressResponse | null;
  wind: LiveWindResponse | null;
  lastUpdated: string;
  isLoading: boolean;
  error: string | null;
}

export async function fetchLiveTides(): Promise<LiveTideResponse> {
  const res = await fetch('/api/tides');
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching /api/tides`);
  return res.json();
}

export async function fetchLiveUv(): Promise<LiveUvResponse> {
  const res = await fetch('/api/uv');
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching /api/uv`);
  return res.json();
}

export async function fetchLiveHeatStress(): Promise<LiveHeatStressResponse> {
  const res = await fetch('/api/heat-stress');
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching /api/heat-stress`);
  return res.json();
}

export async function fetchLiveWind(): Promise<LiveWindResponse> {
  const res = await fetch('/api/wind');
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching /api/wind`);
  return res.json();
}

export async function fetchAllLiveCoastalData(): Promise<{
  tides: LiveTideResponse;
  uv: LiveUvResponse;
  heatStress: LiveHeatStressResponse;
  wind: LiveWindResponse;
}> {
  const [tides, uv, heatStress, wind] = await Promise.all([
    fetchLiveTides(),
    fetchLiveUv(),
    fetchLiveHeatStress(),
    fetchLiveWind(),
  ]);
  return { tides, uv, heatStress, wind };
}
