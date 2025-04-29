import { votes, type Vote, type InsertVote, type PartyResult, type ResultsResponse, type PartyId } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Vote related methods
  createVote(vote: InsertVote): Promise<Vote>;
  getVoteByNIC(nic: string): Promise<Vote | undefined>;
  getResults(): Promise<ResultsResponse>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private votes: Map<number, Vote>;
  currentUserId: number;
  currentVoteId: number;

  // Party data with names for results display
  private partyData: Record<PartyId, string> = {
    npp: "National Peoples Power",
    sjb: "Samagi Jana Balawegaya",
    slpp: "Sri Lanka Podu Jana Peramuna",
    unp: "United National Party",
    sb: "Sarwajana Balaya",
    other: "Other Parties"
  };

  constructor() {
    this.users = new Map();
    this.votes = new Map();
    this.currentUserId = 1;
    this.currentVoteId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createVote(insertVote: InsertVote): Promise<Vote> {
    // Check if NIC already exists
    const existingVote = await this.getVoteByNIC(insertVote.nic);
    if (existingVote) {
      throw new Error("You have already voted with this NIC.");
    }

    const id = this.currentVoteId++;
    const timestamp = new Date();
    const vote: Vote = { 
      ...insertVote, 
      id, 
      timestamp 
    };
    
    this.votes.set(id, vote);
    return vote;
  }

  async getVoteByNIC(nic: string): Promise<Vote | undefined> {
    return Array.from(this.votes.values()).find(
      (vote) => vote.nic.toLowerCase() === nic.toLowerCase()
    );
  }

  async getResults(): Promise<ResultsResponse> {
    const votes = Array.from(this.votes.values());
    const totalVotes = votes.length;
    
    // Count votes for each party
    const voteCount: Record<string, number> = {
      npp: 0,
      sjb: 0,
      slpp: 0,
      unp: 0,
      sb: 0,
      other: 0
    };
    
    votes.forEach(vote => {
      if (vote.party in voteCount) {
        voteCount[vote.party]++;
      } else {
        voteCount.other++;
      }
    });

    // Calculate percentages and format results
    const parties: PartyResult[] = Object.entries(voteCount).map(([id, count]) => {
      const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
      return {
        id,
        name: this.partyData[id as PartyId],
        votes: count,
        percentage
      };
    });

    // Sort by vote count (descending)
    parties.sort((a, b) => b.votes - a.votes);

    return {
      parties,
      totalVotes,
      lastUpdated: new Date().toISOString()
    };
  }
}

export const storage = new MemStorage();
