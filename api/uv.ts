import type { Request, Response } from 'express';
import { getNeaUv } from './nea';

export default async function handler(req: Request, res: Response) {
  try {
    const data = await getNeaUv();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch coastal UV data from NEA',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
