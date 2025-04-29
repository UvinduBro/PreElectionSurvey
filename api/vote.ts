/**
 * API handler for /api/vote
 * Handles vote submission
 */

import { Request, Response } from 'express';
import { storage } from '../server/storage';
import { firebaseStorage } from '../server/storage-firebase';
import dotenv from 'dotenv';
import { validateConfig } from '../server/config';
import { insertVoteSchema } from '../shared/schema';

// Load environment variables
dotenv.config();

// Validate configuration
try {
  validateConfig();
} catch (error) {
  console.error('Configuration error:', error);
}

export default async function handler(req: Request, res: Response) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const voteData = req.body;
    
    // Use Firebase storage if configured, otherwise use memory storage
    const storageInstance = process.env.FIREBASE_PRIVATE_KEY ? firebaseStorage : storage;
    
    // Validate vote data
    const parseResult = insertVoteSchema.safeParse(voteData);
    if (!parseResult.success) {
      return res.status(400).json({ 
        error: 'Invalid vote data', 
        details: parseResult.error.message 
      });
    }
    
    // Check if user already voted (by NIC)
    const existingVoteByNIC = await storageInstance.getVoteByNIC(voteData.nic);
    if (existingVoteByNIC) {
      return res.status(409).json({ error: 'You have already voted with this NIC' });
    }
    
    // Create the vote
    const vote = await storageInstance.createVote(voteData);
    return res.status(201).json({ success: true, vote });
  } catch (error: any) {
    console.error('Error creating vote:', error);
    return res.status(500).json({ error: error.message || 'Failed to submit vote' });
  }
}