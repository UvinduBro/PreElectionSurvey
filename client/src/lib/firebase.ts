import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, type User } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, doc, getDoc, orderBy, limit } from "firebase/firestore";

// Firebase configuration - these should be provided as environment variables
// in a production environment
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-key-for-development",
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo"}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo",
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo"}.appspot.com`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "demo-app-id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Subscribe to auth state changes
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Firestore helper functions
export const getVotes = async () => {
  try {
    const votesCollection = collection(db, 'votes');
    const votesSnapshot = await getDocs(votesCollection);
    return votesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting votes:", error);
    throw error;
  }
};

export const getVotesByDistrict = async (district: string) => {
  try {
    const votesCollection = collection(db, 'votes');
    const q = query(votesCollection, where("district", "==", district));
    const votesSnapshot = await getDocs(q);
    return votesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting votes by district:", error);
    throw error;
  }
};

export const getVotesByLocalGovernment = async (localGovernment: string) => {
  try {
    const votesCollection = collection(db, 'votes');
    const q = query(votesCollection, where("localGovernment", "==", localGovernment));
    const votesSnapshot = await getDocs(q);
    return votesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting votes by local government:", error);
    throw error;
  }
};

export const getVotesByDistrictAndLocalGovernment = async (district: string, localGovernment: string) => {
  try {
    const votesCollection = collection(db, 'votes');
    const q = query(
      votesCollection, 
      where("district", "==", district),
      where("localGovernment", "==", localGovernment)
    );
    const votesSnapshot = await getDocs(q);
    return votesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting votes by district and local government:", error);
    throw error;
  }
};

export const getVoteByNIC = async (nic: string) => {
  try {
    const votesCollection = collection(db, 'votes');
    const q = query(votesCollection, where("nic", "==", nic));
    const votesSnapshot = await getDocs(q);
    return votesSnapshot.empty ? null : {
      id: votesSnapshot.docs[0].id,
      ...votesSnapshot.docs[0].data()
    };
  } catch (error) {
    console.error("Error getting vote by NIC:", error);
    throw error;
  }
};

export const getVoteByUserId = async (userId: string) => {
  try {
    const votesCollection = collection(db, 'votes');
    const q = query(votesCollection, where("userId", "==", userId));
    const votesSnapshot = await getDocs(q);
    return votesSnapshot.empty ? null : {
      id: votesSnapshot.docs[0].id,
      ...votesSnapshot.docs[0].data()
    };
  } catch (error) {
    console.error("Error getting vote by user ID:", error);
    throw error;
  }
};

export const createVote = async (voteData: any) => {
  try {
    const votesCollection = collection(db, 'votes');
    const newVote = {
      ...voteData,
      timestamp: new Date()
    };
    const docRef = await addDoc(votesCollection, newVote);
    return {
      id: docRef.id,
      ...newVote
    };
  } catch (error) {
    console.error("Error creating vote:", error);
    throw error;
  }
};

export { auth, db };
