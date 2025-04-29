import { votes, users, type User, type InsertUser, type Vote, type InsertVote, type PartyResult, type ResultsResponse, type PartyId } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Vote related methods
  createVote(vote: InsertVote): Promise<Vote>;
  getVoteByNIC(nic: string): Promise<Vote | undefined>;
  getResults(district?: string, localGovernment?: string): Promise<ResultsResponse>;
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
    
    // Add some sample votes for testing
    this.addSampleVotes();
  }
  
  private addSampleVotes() {
    // Add a few sample votes to have data for testing filters
    const districts = [
      "Colombo", "Gampaha", "Kandy"
    ];
    
    const localGovMap: Record<string, string[]> = {
      "Colombo": [
        "Colombo Municipal Council", 
        "Dehiwala-Mount Lavinia Municipal Council", 
        "Kolonnawa Urban Council"
      ],
      "Gampaha": [
        "Gampaha Municipal Council",
        "Negombo Municipal Council",
        "Ja-Ela Urban Council"
      ],
      "Kandy": [
        "Kandy Municipal Council",
        "Gampola Urban Council",
        "Kadugannawa Urban Council"
      ]
    };
    
    const parties = ["npp", "sjb", "slpp", "unp", "sb"];
    
    // Create mock votes
    districts.forEach(district => {
      const localGovs = localGovMap[district];
      
      localGovs.forEach(localGov => {
        // Add 1-3 votes per local government
        const voteCount = Math.floor(Math.random() * 3) + 1;
        
        for (let i = 0; i < voteCount; i++) {
          const party = parties[Math.floor(Math.random() * parties.length)];
          const id = this.currentVoteId++;
          const timestamp = new Date();
          const vote: Vote = {
            id,
            fullName: `Test User ${id}`,
            mobileNumber: `07${Math.floor(10000000 + Math.random() * 90000000)}`,
            nic: `${Math.floor(100000000 + Math.random() * 900000000)}V`,
            district,
            localGovernment: localGov,
            party,
            timestamp,
            userId: `user${id}`
          };
          
          this.votes.set(id, vote);
        }
      });
    });
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
    
    // Check if user already voted with this Google account
    const existingUserVote = await this.getVoteByUserId(insertVote.userId);
    if (existingUserVote) {
      throw new Error("You have already submitted a vote with this Google account.");
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
  
  async getVoteByUserId(userId: string): Promise<Vote | undefined> {
    return Array.from(this.votes.values()).find(
      (vote) => vote.userId === userId
    );
  }

  async getVoteByNIC(nic: string): Promise<Vote | undefined> {
    return Array.from(this.votes.values()).find(
      (vote) => vote.nic.toLowerCase() === nic.toLowerCase()
    );
  }

  async getResults(district?: string, localGovernment?: string): Promise<ResultsResponse> {
    // Get all votes and filter by district/localGovernment if provided
    let votes = Array.from(this.votes.values());
    
    // Apply filters if specified
    if (district) {
      votes = votes.filter(vote => vote.district === district);
    }
    
    if (localGovernment) {
      votes = votes.filter(vote => vote.localGovernment === localGovernment);
    }
    
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

    // Get unique districts and local governments for filters
    const allVotes = Array.from(this.votes.values());
    const districts = Array.from(new Set(allVotes.map(vote => vote.district))).sort();
    const localGovernments = Array.from(new Set(allVotes.map(vote => vote.localGovernment))).sort();

    // Prepare minimal vote info for filtering (only district and localGovernment)
    const voteInfo = allVotes.map(vote => ({
      district: vote.district,
      localGovernment: vote.localGovernment
    }));
    
    return {
      parties,
      totalVotes,
      lastUpdated: new Date().toISOString(),
      districts,
      localGovernments,
      votes: voteInfo,
      filters: {
        district: district || null,
        localGovernment: localGovernment || null
      }
    };
  }
}

export const storage = new MemStorage();
