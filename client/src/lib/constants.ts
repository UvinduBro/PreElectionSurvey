// Party data for the application
export interface Party {
  id: string;
  name: string;
  shortName: string;
  color: string;
}

export const PARTIES: Party[] = [
  {
    id: "npp",
    name: "National Peoples Power",
    shortName: "NPP",
    color: "text-red-600 bg-red-100", // Red
  },
  {
    id: "sjb",
    name: "Samagi Jana Balawegaya",
    shortName: "SJB",
    color: "text-blue-600 bg-blue-100", // Blue
  },
  {
    id: "slpp",
    name: "Sri Lanka Podu Jana Peramuna",
    shortName: "SLPP",
    color: "text-red-800 bg-red-50", // Dark red
  },
  {
    id: "unp",
    name: "United National Party",
    shortName: "UNP",
    color: "text-green-700 bg-green-100", // Green
  },
  {
    id: "sb",
    name: "Sarwajana Balaya",
    shortName: "SB",
    color: "text-purple-700 bg-purple-100", // Purple
  },
  {
    id: "other",
    name: "Other Parties",
    shortName: "Other",
    color: "text-gray-600 bg-gray-100", // Gray
  },
];

export function getPartyById(id: string): Party {
  return PARTIES.find(party => party.id === id) || PARTIES[5]; // Default to "Other" if not found
}

export function getPartyColor(id: string): string {
  return getPartyById(id).color;
}

export const FORM_STEPS = {
  PERSONAL_DETAILS: 1,
  LOCATION: 2,
  VOTING: 3
};
