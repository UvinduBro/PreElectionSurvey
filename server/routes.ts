import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { firebaseStorage as storage } from "./storage-firebase";
import { insertVoteSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api

  // API endpoint to get election results with optional filters
  app.get("/api/results", async (req: Request, res: Response) => {
    try {
      const district = req.query.district as string | undefined;
      const localGovernment = req.query.localGovernment as string | undefined;
      
      const results = await storage.getResults(district, localGovernment);
      res.json(results);
    } catch (error) {
      console.error("Error fetching results:", error);
      res.status(500).json({ message: "Failed to fetch results" });
    }
  });

  // API endpoint to submit a vote
  app.post("/api/vote", async (req: Request, res: Response) => {
    try {
      // Validate vote submission
      const voteData = insertVoteSchema.parse(req.body);
      
      // Check for duplicate NIC (handled in storage, but double-checking)
      const existingVote = await storage.getVoteByNIC(voteData.nic);
      if (existingVote) {
        return res.status(400).json({ 
          message: "You have already voted with this NIC number."
        });
      }
      
      // Check for duplicate user ID (Google account)
      const existingUserVote = await storage.getVoteByUserId(voteData.userId);
      if (existingUserVote) {
        return res.status(400).json({ 
          message: "You have already submitted a vote with this Google account."
        });
      }
      
      // Store the vote
      const vote = await storage.createVote(voteData);
      
      res.status(201).json({ 
        message: "Vote submitted successfully",
        id: vote.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Validation error
        return res.status(400).json({ 
          message: "Invalid vote submission", 
          errors: error.format()
        });
      } else if (error instanceof Error) {
        // Other errors
        return res.status(400).json({ message: error.message });
      }
      
      // Unknown error
      console.error("Error submitting vote:", error);
      res.status(500).json({ message: "Failed to submit vote" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "up" });
  });
  
  // Get districts endpoint
  app.get("/api/districts", async (_req: Request, res: Response) => {
    try {
      const { getDistricts } = await import('./data/districts');
      const districts = getDistricts();
      res.json(districts);
    } catch (error) {
      console.error("Error getting districts:", error);
      res.status(500).json({ error: "Failed to retrieve districts" });
    }
  });
  
  // Get local governments endpoint
  app.get("/api/local-governments", async (req: Request, res: Response) => {
    const { district } = req.query;
    
    if (!district) {
      return res.status(400).json({ error: "District parameter is required" });
    }
    
    try {
      const { getLocalGovernments } = await import('./data/districts');
      const localGovernments = getLocalGovernments(district as string);
      res.json(localGovernments);
    } catch (error) {
      console.error("Error getting local governments:", error);
      res.status(500).json({ error: "Failed to retrieve local governments" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
