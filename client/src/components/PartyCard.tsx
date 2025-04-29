import { getPartyColor } from "@/lib/constants";
import type { PartyResult } from "@shared/schema";

interface PartyCardProps {
  party: PartyResult;
}

export function PartyCard({ party }: PartyCardProps) {
  const colorClass = getPartyColor(party.id);
  
  // Derive background and text colors for progress bar
  const progressBarClass = colorClass.includes('text-red') 
    ? 'bg-red-600' 
    : colorClass.includes('text-blue') 
      ? 'bg-blue-600'
      : colorClass.includes('text-green')
        ? 'bg-green-600'
        : colorClass.includes('text-purple')
          ? 'bg-purple-600'
          : 'bg-gray-600';

  // Get text color for vote count
  const textColorClass = colorClass.split(' ')[0];

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition duration-200">
      <div className="flex items-center mb-4">
        <div className={`flex-shrink-0 h-16 w-16 ${colorClass} rounded-full flex items-center justify-center`}>
          <svg 
            className="h-10 w-10" 
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm3.5 12.09l-1.41 1.41L12 13.42 9.91 15.5 8.5 14.09 10.59 12 8.5 9.91 9.91 8.5 12 10.59l2.09-2.09 1.41 1.41L13.42 12l2.08 2.09z" />
          </svg>
        </div>
        <div className="ml-4">
          <h4 className="text-lg font-semibold text-gray-800">{party.name}</h4>
          <div className="flex items-center">
            <span className={`${textColorClass} font-semibold`}>{party.votes.toLocaleString()}</span>
            <span className="text-gray-500 text-sm ml-2">votes</span>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`${progressBarClass} h-2.5 rounded-full`} 
          style={{ width: `${party.percentage}%` }}
        />
      </div>
      <div className="mt-2 text-right">
        <span className="text-sm font-medium text-gray-700">{party.percentage}%</span>
      </div>
    </div>
  );
}
