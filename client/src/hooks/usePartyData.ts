import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ResultsResponse } from "@shared/schema";

export function usePartyData() {
  const { 
    data: results,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery<ResultsResponse>({
    queryKey: ["/api/results"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Format data for display
  const partyResults = results?.parties || [];
  const totalVotes = results?.totalVotes || 0;
  const lastUpdated = results?.lastUpdated 
    ? new Date(results.lastUpdated).toLocaleString() 
    : new Date().toLocaleString();

  return {
    partyResults,
    totalVotes,
    lastUpdated,
    isLoading,
    isError,
    error,
    refetch
  };
}
