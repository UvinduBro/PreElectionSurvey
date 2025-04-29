import { db, votesCollection, usersCollection, partyData } from './lib/firebase';
import { type User, type InsertUser, type Vote, type InsertVote, type PartyResult, type ResultsResponse, type PartyId } from "@shared/schema";
import { IStorage } from './storage';

export class FirebaseStorage implements IStorage {
  constructor() {
    // Initialize Firebase connection
    console.log('Firebase storage initialized');
  }

  async getUser(id: number): Promise<User | undefined> {
    try {
      const userDoc = await usersCollection.doc(id.toString()).get();
      if (!userDoc.exists) return undefined;
      return { id, ...userDoc.data() } as User;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const snapshot = await usersCollection.where('username', '==', username).limit(1).get();
      if (snapshot.empty) return undefined;
      const userDoc = snapshot.docs[0];
      return { id: parseInt(userDoc.id), ...userDoc.data() } as User;
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      // Get the next ID (this would typically be handled by the database)
      const countSnapshot = await usersCollection.count().get();
      const id = countSnapshot.data().count + 1;
      
      // Create the user document
      const user: User = { ...insertUser, id };
      await usersCollection.doc(id.toString()).set(user);
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async createVote(insertVote: InsertVote): Promise<Vote> {
    try {
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

      // Get the next ID (this would be handled by Firestore auto ID, but we need numeric IDs for compatibility)
      const countSnapshot = await votesCollection.count().get();
      const id = countSnapshot.data().count + 1;
      
      // Create the vote document
      const timestamp = new Date();
      const vote: Vote = { 
        ...insertVote, 
        id, 
        timestamp 
      };
      
      await votesCollection.doc(id.toString()).set(vote);
      return vote;
    } catch (error) {
      console.error('Error creating vote:', error);
      throw error;
    }
  }

  async getVoteByUserId(userId: string): Promise<Vote | undefined> {
    try {
      const snapshot = await votesCollection.where('userId', '==', userId).limit(1).get();
      if (snapshot.empty) return undefined;
      const voteDoc = snapshot.docs[0];
      return { id: parseInt(voteDoc.id), ...voteDoc.data() } as Vote;
    } catch (error) {
      console.error('Error getting vote by user ID:', error);
      return undefined;
    }
  }

  async getVoteByNIC(nic: string): Promise<Vote | undefined> {
    try {
      const snapshot = await votesCollection.where('nic', '==', nic.toLowerCase()).limit(1).get();
      if (snapshot.empty) return undefined;
      const voteDoc = snapshot.docs[0];
      return { id: parseInt(voteDoc.id), ...voteDoc.data() } as Vote;
    } catch (error) {
      console.error('Error getting vote by NIC:', error);
      return undefined;
    }
  }

  async getResults(district?: string, localGovernment?: string): Promise<ResultsResponse> {
    try {
      // Create query based on filters
      let query = votesCollection;
      
      if (district && district !== 'all') {
        query = query.where('district', '==', district);
      }
      
      if (localGovernment && localGovernment !== 'all') {
        query = query.where('localGovernment', '==', localGovernment);
      }
      
      // Execute query
      const snapshot = await query.get();
      const votes = snapshot.docs.map(doc => ({ id: parseInt(doc.id), ...doc.data() })) as Vote[];
      
      // Count votes for each party
      const totalVotes = votes.length;
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
          name: partyData[id as PartyId],
          votes: count,
          percentage
        };
      });

      // Sort by vote count (descending)
      parties.sort((a, b) => b.votes - a.votes);

      // Get all votes for district and local government information
      const allVotesSnapshot = await votesCollection.get();
      const allVotes = allVotesSnapshot.docs.map(doc => ({ id: parseInt(doc.id), ...doc.data() })) as Vote[];
      
      // Extract unique districts and local governments
      const districts = Array.from(new Set(allVotes.map(vote => vote.district))).sort();
      const localGovernments = Array.from(new Set(allVotes.map(vote => vote.localGovernment))).sort();

      // Prepare minimal vote info for filtering
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
    } catch (error) {
      console.error('Error getting results:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const firebaseStorage = new FirebaseStorage();
