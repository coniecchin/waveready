import type { Request, Response } from 'express';

export interface HealthResponse {
  status: 'ok' | 'error';
  timestamp: string;
  uptimeSeconds: number;
  endpoints: {
    tides: string;
    uv: string;
    heatStress: string;
    wind: string;
    onemapTiles: string;
  };
}

export default async function handler(req: Request, res: Response) {
  try {
    const data: HealthResponse = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      endpoints: {
        tides: '/api/tides',
        uv: '/api/uv',
        heatStress: '/api/heat-stress',
        wind: '/api/wind',
        onemapTiles: 'https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png',
      },
    };
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown server error',
    });
  }
}
