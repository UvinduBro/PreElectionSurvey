import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { subscribeToAuthChanges, signInWithGoogle, signOutUser } from "@/lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      setError(null);
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to sign in"));
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOutUser();
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to sign out"));
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
