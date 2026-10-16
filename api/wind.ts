import type { Request, Response } from 'express';
import { getDataGovSgWind } from './nea';

export default async function handler(req: Request, res: Response) {
  try {
    const data = await getDataGovSgWind();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch wind data from data.gov.sg',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
