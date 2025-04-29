/**
 * API handler for /api/health
 * Health check endpoint
 */

import { Request, Response } from 'express';

export default function handler(_req: Request, res: Response) {
  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
}