/**
 * API handler for /api/results
 * Returns voting results data
 */

import { Request, Response } from 'express';
import { storage } from '../server/storage';
import { firebaseStorage } from '../server/storage-firebase';
import dotenv from 'dotenv';
import { validateConfig } from '../server/config';

// Load environment variables
dotenv.config();

// Validate configuration
try {
  validateConfig();
} catch (error) {
  console.error('Configuration error:', error);
}

export default async function handler(req: Request, res: Response) {
  try {
    const { district, localGovernment } = req.query;
    
    // Use Firebase storage if configured, otherwise use memory storage
    const storageInstance = process.env.FIREBASE_PRIVATE_KEY ? firebaseStorage : storage;
    
    const results = await storageInstance.getResults(
      district as string | undefined,
      localGovernment as string | undefined
    );
    
    return res.status(200).json(results);
  } catch (error: any) {
    console.error('Error getting results:', error);
    return res.status(500).json({ error: error.message || 'Failed to fetch results' });
  }
}