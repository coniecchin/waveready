import type { Request, Response } from 'express';

export interface OneMapConfig {
  tileUrl: string;
  attribution: string;
  minZoom: number;
  maxZoom: number;
  defaultCenter: {
    lat: number;
    lng: number;
    zoom: number;
  };
  coastalBounds: {
    north: number;
    south: number;
    west: number;
    east: number;
  };
}

export const ONEMAP_CONFIG: OneMapConfig = {
  tileUrl: 'https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png',
  attribution: '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:14px;width:14px;display:inline-block;vertical-align:middle;margin-right:4px;"/> OneMap | Singapore Land Authority',
  minZoom: 11,
  maxZoom: 19,
  defaultCenter: {
    lat: 1.3521,
    lng: 103.8198,
    zoom: 12,
  },
  coastalBounds: {
    north: 1.4700,
    south: 1.2000,
    west: 103.6000,
    east: 104.0500,
  },
};

export default async function handler(req: Request, res: Response) {
  try {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    return res.status(200).json(ONEMAP_CONFIG);
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to retrieve OneMap basemap configuration',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
