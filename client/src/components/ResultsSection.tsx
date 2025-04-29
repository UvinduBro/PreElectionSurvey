import { PartyCard } from "@/components/PartyCard";
import { usePartyData } from "@/hooks/usePartyData";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

export function ResultsSection() {
  const { 
    partyResults, 
    totalVotes, 
    lastUpdated, 
    availableDistricts,
    availableLocalGovernments,
    district,
    localGovernment,
    setDistrict,
    setLocalGovernment,
    isLoading, 
    isError 
  } = usePartyData();

  if (isError) {
    return (
      <section className="mb-12">
        <div className="bg-red-50 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-red-800 mb-2">Error Loading Results</h3>
          <p className="text-red-600">
            We encountered an error while loading the survey results. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Current Survey Results</h3>
          
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-[200px]">
              <Select
                value={district}
                onValueChange={(value) => setDistrict(value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Districts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {availableDistricts.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-[250px]">
              <Select
                value={localGovernment}
                onValueChange={(value) => setLocalGovernment(value || undefined)}
                disabled={!district || availableLocalGovernments.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Local Governments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Local Governments</SelectItem>
                  {availableLocalGovernments.map((lg) => (
                    <SelectItem key={lg} value={lg}>{lg}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {((district && district !== 'all') || (localGovernment && localGovernment !== 'all')) && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setDistrict(undefined);
                  setLocalGovernment(undefined);
                }}
                className="h-10"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
        
        {/* Filter notification */}
        {((district && district !== 'all') || (localGovernment && localGovernment !== 'all')) && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4 flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800">
                <span className="font-medium">Filtered results:</span> {' '}
                {district && district !== 'all' && <span>District: <strong>{district}</strong></span>}
                {district && district !== 'all' && localGovernment && localGovernment !== 'all' && <span> | </span>}
                {localGovernment && localGovernment !== 'all' && <span>Local Government: <strong>{localGovernment}</strong></span>}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Showing {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'} matching these criteria.
              </p>
            </div>
          </div>
        )}
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="ml-4 space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
                <Skeleton className="h-2.5 w-full rounded-full mb-2" />
                <div className="flex justify-end">
                  <Skeleton className="h-4 w-10" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partyResults.length > 0 ? (
              partyResults.map((party) => (
                <PartyCard key={party.id} party={party} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">No votes recorded for this selection.</p>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Total respondents: <span className="font-semibold text-primary">{totalVotes.toLocaleString()}</span>
          </p>
          <p className="text-xs text-gray-500">
            Last updated: <span>{lastUpdated}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
