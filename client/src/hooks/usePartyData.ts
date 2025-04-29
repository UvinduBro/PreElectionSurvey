import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ResultsResponse } from "@shared/schema";

interface UsePartyDataOptions {
  initialDistrict?: string;
  initialLocalGovernment?: string;
}

export function usePartyData(options: UsePartyDataOptions = {}) {
  const [district, setDistrict] = useState<string | undefined>(options.initialDistrict);
  const [localGovernment, setLocalGovernment] = useState<string | undefined>(options.initialLocalGovernment);

  // Build query string for filters
  const getQueryString = () => {
    const params = new URLSearchParams();
    if (district && district !== 'all') params.append('district', district);
    if (localGovernment && localGovernment !== 'all') params.append('localGovernment', localGovernment);
    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  };

  const { 
    data: results,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery<ResultsResponse>({
    queryKey: ["/api/results", district, localGovernment],
    queryFn: async () => {
      const response = await fetch(`/api/results${getQueryString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }
      return response.json();
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Format data for display
  const partyResults = results?.parties || [];
  const totalVotes = results?.totalVotes || 0;
  const lastUpdated = results?.lastUpdated 
    ? new Date(results.lastUpdated).toLocaleString() 
    : new Date().toLocaleString();
  
  // Get available filter options
  const availableDistricts = results?.districts || [];
  const availableLocalGovernments = results?.localGovernments || [];
  const currentFilters = results?.filters || { district: null, localGovernment: null };

  // Clear local government when district changes
  const handleDistrictChange = (newDistrict: string | undefined) => {
    setDistrict(newDistrict);
    setLocalGovernment(undefined);
  };

  return {
    partyResults,
    totalVotes,
    lastUpdated,
    availableDistricts,
    availableLocalGovernments,
    currentFilters,
    district,
    localGovernment,
    setDistrict: handleDistrictChange,
    setLocalGovernment,
    isLoading,
    isError,
    error,
    refetch
  };
}
