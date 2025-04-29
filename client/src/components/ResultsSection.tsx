import { PartyCard } from "@/components/PartyCard";
import { usePartyData } from "@/hooks/usePartyData";
import { Skeleton } from "@/components/ui/skeleton";

export function ResultsSection() {
  const { partyResults, totalVotes, lastUpdated, isLoading, isError } = usePartyData();

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
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Current Survey Results</h3>
        
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
            {partyResults.map((party) => (
              <PartyCard key={party.id} party={party} />
            ))}
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
