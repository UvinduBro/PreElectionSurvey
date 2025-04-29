/**
 * API handler for /api/districts
 * Returns list of districts
 */

import { Request, Response } from 'express';
import { getDistricts } from '../server/data/districts';

export default function handler(req: Request, res: Response) {
  try {
    // Only allow GET method
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const districts = getDistricts();
    return res.status(200).json(districts);
  } catch (error: any) {
    console.error('Error getting districts:', error);
    return res.status(500).json({ error: error.message || 'Failed to fetch districts' });
  }
}