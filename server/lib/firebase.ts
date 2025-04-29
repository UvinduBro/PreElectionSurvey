import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { type PartyId, type InsertUser, type User, type InsertVote, type Vote, type PartyResult, type ResultsResponse } from '@shared/schema';

// Initialize Firebase Admin with environment variables
let firebaseApp;
try {
  firebaseApp = initializeApp({
    credential: cert({
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    }),
  });
} catch (error) {
  console.error('Firebase admin initialization error:', error);
  // Fallback for development (using Firebase client SDK already initialized)
  firebaseApp = initializeApp();
}

// Initialize Firestore
const db = getFirestore(firebaseApp);

// Create collections references
const usersCollection = db.collection('users');
const votesCollection = db.collection('votes');

// Party data with names for results display
const partyData: Record<PartyId, string> = {
  npp: "National Peoples Power",
  sjb: "Samagi Jana Balawegaya",
  slpp: "Sri Lanka Podu Jana Peramuna",
  unp: "United National Party",
  sb: "Sarwajana Balaya",
  other: "Other Parties"
};

// Export Firestore instance and collections
export { db, usersCollection, votesCollection, partyData };
