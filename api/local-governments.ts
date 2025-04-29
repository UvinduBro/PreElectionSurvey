/**
 * API handler for /api/local-governments
 * Returns list of local governments for a district
 */

import { Request, Response } from 'express';
import { getLocalGovernments } from '../server/data/districts';

export default function handler(req: Request, res: Response) {
  try {
    // Only allow GET method
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const district = req.query.district as string;
    
    if (!district) {
      return res.status(400).json({ error: 'District parameter is required' });
    }
    
    const localGovernments = getLocalGovernments(district);
    return res.status(200).json(localGovernments);
  } catch (error: any) {
    console.error('Error getting local governments:', error);
    return res.status(500).json({ error: error.message || 'Failed to fetch local governments' });
  }
}