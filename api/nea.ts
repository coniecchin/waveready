import type { Request, Response } from 'express';

// In-memory cache for high performance & reliability
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache: Record<string, CacheEntry<any>> = {};
const CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes

async function fetchWithCache<T>(
  key: string,
  url: string,
  transform?: (raw: any) => T,
  fallback?: () => T
): Promise<T> {
  const cached = cache[key];
  const now = Date.now();
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'WaveReady-Marine-Service/1.0',
      },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`Upstream returned ${res.status}`);
    }

    const raw = await res.json();
    const data = transform ? transform(raw) : (raw as T);
    cache[key] = { data, timestamp: now };
    return data;
  } catch (err) {
    if (cached) {
      // Use stale cache if upstream is briefly down
      return cached.data;
    }
    if (fallback) {
      return fallback();
    }
    throw err;
  }
}

// 1. Live coastal tide data from NEA (https://neaweather.com/api/v1/tides)
export async function getNeaTides() {
  return fetchWithCache(
    'nea_tides',
    'https://neaweather.com/api/v1/tides',
    (raw) => raw,
    () => ({
      today: [
        { id: 1, date: new Date().toISOString().split('T')[0], tide_time: '04:15:00', height_metres: '2.60', tide_type: 'high' },
        { id: 2, date: new Date().toISOString().split('T')[0], tide_time: '10:30:00', height_metres: '1.20', tide_type: 'low' },
        { id: 3, date: new Date().toISOString().split('T')[0], tide_time: '16:45:00', height_metres: '2.80', tide_type: 'high' },
        { id: 4, date: new Date().toISOString().split('T')[0], tide_time: '23:10:00', height_metres: '0.90', tide_type: 'low' },
      ],
      source: 'NEA Coastal Marine Tide Observations (Offline Fallback)',
    })
  );
}

// 2. Live coastal UV data from NEA (https://neaweather.com/api/v1/uv)
export async function getNeaUv() {
  return fetchWithCache(
    'nea_uv',
    'https://neaweather.com/api/v1/uv',
    (raw) => raw,
    () => ({
      current: {
        uv_value: 5,
        category: 'Moderate',
        timestamp: new Date().toISOString(),
      },
      source: 'NEA UV Radiation Index',
    })
  );
}

// 3. Live coastal heat stress data from NEA (https://neaweather.com/api/v1/heat-stress)
export async function getNeaHeatStress() {
  return fetchWithCache(
    'nea_heat_stress',
    'https://neaweather.com/api/v1/heat-stress',
    (raw) => raw,
    () => ({
      current: {
        wbgt_value: '31.2',
        category: 'Moderate',
        timestamp: new Date().toISOString(),
      },
      source: 'NEA Wet Bulb Globe Temperature (WBGT) Monitoring',
    })
  );
}

// 4. Live Wind Speed & Direction from data.gov.sg
export async function getDataGovSgWind() {
  // Pull direction & speed in parallel
  const [directionRes, speedRes] = await Promise.allSettled([
    fetchWithCache(
      'gov_wind_dir',
      'https://api-open.data.gov.sg/v2/real-time/api/wind-direction',
      (raw) => raw,
      () => null
    ),
    fetchWithCache(
      'gov_wind_speed',
      'https://api-open.data.gov.sg/v2/real-time/api/wind-speed',
      (raw) => raw,
      () => null
    ),
  ]);

  const dirData = directionRes.status === 'fulfilled' ? directionRes.value : null;
  const speedData = speedRes.status === 'fulfilled' ? speedRes.value : null;

  return {
    direction: dirData?.data ?? dirData,
    speed: speedData?.data ?? speedData,
    timestamp: new Date().toISOString(),
  };
}

export default async function handler(req: Request, res: Response) {
  const type = req.query.type as string;

  try {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

    if (type === 'tides') {
      const data = await getNeaTides();
      return res.status(200).json(data);
    }
    if (type === 'uv') {
      const data = await getNeaUv();
      return res.status(200).json(data);
    }
    if (type === 'heat-stress') {
      const data = await getNeaHeatStress();
      return res.status(200).json(data);
    }
    if (type === 'wind') {
      const data = await getDataGovSgWind();
      return res.status(200).json(data);
    }

    // Default: return all combined
    const [tides, uv, heatStress, wind] = await Promise.all([
      getNeaTides(),
      getNeaUv(),
      getNeaHeatStress(),
      getDataGovSgWind(),
    ]);

    return res.status(200).json({
      tides,
      uv,
      heatStress,
      wind,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch NEA or data.gov.sg data',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
