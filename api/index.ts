/**
 * API handler for Vercel serverless functions
 * This file handles all API routes when deployed to Vercel
 */

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "../server/routes";
import dotenv from 'dotenv';
import { validateConfig } from '../server/config';

// Load environment variables from .env file
dotenv.config();

// Validate required environment variables
validateConfig();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handle API requests
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.path}`);
  next();
});

// Initialize API routes
registerRoutes(app);

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
});

export default app;