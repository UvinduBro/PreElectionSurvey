// Data for Sri Lanka's districts and local governments
// Source: https://elections.gov.lk/web/wp-content/uploads/pdf/local_authority/Local%20Athorities_E.pdf

export interface LocalGovernment {
  name: string;
  type: "MC" | "UC" | "PS"; // Municipal Council, Urban Council, Pradeshiya Sabha
}

export interface District {
  name: string;
  localGovernments: LocalGovernment[];
}

export const districts: District[] = [
  {
    name: "Colombo",
    localGovernments: [
      { name: "Colombo", type: "MC" },
      { name: "Dehiwala - Mt. Lavinia", type: "MC" },
      { name: "Sri Jayawardenepura Kotte", type: "MC" },
      { name: "Moratuwa", type: "MC" },
      { name: "Kaduwela", type: "MC" },
      { name: "Kolonnawa", type: "UC" },
      { name: "Seethawakapura", type: "UC" },
      { name: "Maharagama", type: "UC" },
      { name: "Boralesgamuwa", type: "UC" },
      { name: "Kotikawatte Mulleriyawa", type: "PS" },
      { name: "Homagama", type: "PS" },
      { name: "Kesbewa", type: "PS" }
    ]
  },
  {
    name: "Gampaha",
    localGovernments: [
      { name: "Gampaha", type: "MC" },
      { name: "Negombo", type: "MC" },
      { name: "Wattala - Mabole", type: "UC" },
      { name: "Peliyagoda", type: "UC" },
      { name: "Minuwangoda", type: "UC" },
      { name: "Ja-Ela", type: "UC" },
      { name: "Katunayake - Seeduwa", type: "UC" },
      { name: "Gampaha", type: "PS" },
      { name: "Attanagalla", type: "PS" },
      { name: "Minuwangoda", type: "PS" },
      { name: "Meerigama", type: "PS" },
      { name: "Divulapitiya", type: "PS" },
      { name: "Dompe", type: "PS" },
      { name: "Mahara", type: "PS" },
      { name: "Kelaniya", type: "PS" },
      { name: "Biyagama", type: "PS" },
      { name: "Wattala", type: "PS" },
      { name: "Ja-Ela", type: "PS" },
      { name: "Katana", type: "PS" },
      { name: "Negombo", type: "PS" }
    ]
  },
  {
    name: "Kalutara",
    localGovernments: [
      { name: "Kalutara", type: "UC" },
      { name: "Beruwala", type: "UC" },
      { name: "Panadura", type: "UC" },
      { name: "Horana", type: "UC" },
      { name: "Kalutara", type: "PS" },
      { name: "Beruwala", type: "PS" },
      { name: "Dodangoda", type: "PS" },
      { name: "Mathugama", type: "PS" },
      { name: "Agalawatta", type: "PS" },
      { name: "Palindanuwara", type: "PS" },
      { name: "Walallawita", type: "PS" },
      { name: "Bandaragama", type: "PS" },
      { name: "Horana", type: "PS" },
      { name: "Panadura", type: "PS" },
      { name: "Bulathsinhala", type: "PS" },
      { name: "Millaniya", type: "PS" },
      { name: "Madurawela", type: "PS" }
    ]
  },
  {
    name: "Kandy",
    localGovernments: [
      { name: "Kandy", type: "MC" },
      { name: "Matale", type: "MC" },
      { name: "Wattegama", type: "UC" },
      { name: "Kadugannawa", type: "UC" },
      { name: "Gampola", type: "UC" },
      { name: "Nawalapitiya", type: "UC" },
      { name: "Yatinuwara", type: "PS" },
      { name: "Udunuwara", type: "PS" },
      { name: "Udapalatha", type: "PS" },
      { name: "Ganga Ihala Korale", type: "PS" },
      { name: "Pasbage Korale", type: "PS" },
      { name: "Harispattuwa", type: "PS" },
      { name: "Poojapitiya", type: "PS" },
      { name: "Akurana", type: "PS" },
      { name: "Pathadumbara", type: "PS" },
      { name: "Panwila", type: "PS" },
      { name: "Medadumbara", type: "PS" },
      { name: "Kundasale", type: "PS" },
      { name: "Minipe", type: "PS" },
      { name: "Doluwa", type: "PS" }
    ]
  },
  {
    name: "Matale",
    localGovernments: [
      { name: "Matale", type: "MC" },
      { name: "Dambulla", type: "MC" },
      { name: "Rattota", type: "PS" },
      { name: "Ukuwela", type: "PS" },
      { name: "Wilgamuwa", type: "PS" },
      { name: "Matale", type: "PS" },
      { name: "Ambanganga Korale", type: "PS" },
      { name: "Laggala-Pallegama", type: "PS" },
      { name: "Naula", type: "PS" },
      { name: "Dambulla", type: "PS" },
      { name: "Galewela", type: "PS" },
      { name: "Pallepola", type: "PS" },
      { name: "Yatawatta", type: "PS" }
    ]
  },
  {
    name: "Nuwara Eliya",
    localGovernments: [
      { name: "Nuwara Eliya", type: "MC" },
      { name: "Hatton-Dickoya", type: "UC" },
      { name: "Talawakele-Lindula", type: "UC" },
      { name: "Nuwara Eliya", type: "PS" },
      { name: "Kothmale", type: "PS" },
      { name: "Hanguranketha", type: "PS" },
      { name: "Walapane", type: "PS" },
      { name: "Ambagamuwa", type: "PS" }
    ]
  },
  {
    name: "Galle",
    localGovernments: [
      { name: "Galle", type: "MC" },
      { name: "Ambalangoda", type: "UC" },
      { name: "Hikkaduwa", type: "UC" },
      { name: "Bentota", type: "PS" },
      { name: "Elpitiya", type: "PS" },
      { name: "Niyagama", type: "PS" },
      { name: "Thawalama", type: "PS" },
      { name: "Neluwa", type: "PS" },
      { name: "Nagoda", type: "PS" },
      { name: "Baddegama", type: "PS" },
      { name: "Welivitiya-Divithura", type: "PS" },
      { name: "Ambalangoda", type: "PS" },
      { name: "Karandeniya", type: "PS" },
      { name: "Rajgama", type: "PS" },
      { name: "Akmeemana", type: "PS" },
      { name: "Bope-Poddala", type: "PS" },
      { name: "Yakkalamulla", type: "PS" },
      { name: "Imaduwa", type: "PS" },
      { name: "Habaraduwa", type: "PS" }
    ]
  },
  {
    name: "Matara",
    localGovernments: [
      { name: "Matara", type: "MC" },
      { name: "Weligama", type: "UC" },
      { name: "Pitabeddara", type: "PS" },
      { name: "Kotapola", type: "PS" },
      { name: "Pasgoda", type: "PS" },
      { name: "Mulatiyana", type: "PS" },
      { name: "Akuressa", type: "PS" },
      { name: "Malimbada", type: "PS" },
      { name: "Kamburupitiya", type: "PS" },
      { name: "Hakmana", type: "PS" },
      { name: "Kirinda Puhulwella", type: "PS" },
      { name: "Thihagoda", type: "PS" },
      { name: "Weligama", type: "PS" },
      { name: "Matara", type: "PS" },
      { name: "Devinuwara", type: "PS" },
      { name: "Dickwella", type: "PS" }
    ]
  },
  {
    name: "Hambantota",
    localGovernments: [
      { name: "Hambantota", type: "UC" },
      { name: "Tangalle", type: "UC" },
      { name: "Beliatta", type: "PS" },
      { name: "Tangalle", type: "PS" },
      { name: "Angunakolapelessa", type: "PS" },
      { name: "Ambalantota", type: "PS" },
      { name: "Lunugamwehera", type: "PS" },
      { name: "Hambantota", type: "PS" },
      { name: "Tissamaharama", type: "PS" },
      { name: "Sooriyawewa", type: "PS" },
      { name: "Weeraketiya", type: "PS" },
      { name: "Katuwana", type: "PS" }
    ]
  },
  {
    name: "Jaffna",
    localGovernments: [
      { name: "Jaffna", type: "MC" },
      { name: "Valvettithurai", type: "UC" },
      { name: "Point Pedro", type: "UC" },
      { name: "Chavakachcheri", type: "UC" },
      { name: "Delft", type: "PS" },
      { name: "Island North", type: "PS" },
      { name: "Island South", type: "PS" },
      { name: "Karainagar", type: "PS" },
      { name: "Kayts", type: "PS" },
      { name: "Nallur", type: "PS" },
      { name: "Valikamam East", type: "PS" },
      { name: "Valikamam North", type: "PS" },
      { name: "Valikamam South", type: "PS" },
      { name: "Valikamam South-West", type: "PS" },
      { name: "Valikamam West", type: "PS" },
      { name: "Vadamaradchi East", type: "PS" },
      { name: "Vadamaradchi North", type: "PS" },
      { name: "Vadamaradchi South-West", type: "PS" },
      { name: "Thenmaradchi", type: "PS" }
    ]
  },
  {
    name: "Kilinochchi",
    localGovernments: [
      { name: "Pachchilaipalli", type: "PS" },
      { name: "Poonakary", type: "PS" },
      { name: "Karachchi", type: "PS" },
      { name: "Kandavalai", type: "PS" }
    ]
  },
  {
    name: "Mannar",
    localGovernments: [
      { name: "Mannar", type: "UC" },
      { name: "Manthai West", type: "PS" },
      { name: "Musali", type: "PS" },
      { name: "Nanaddan", type: "PS" },
      { name: "Mannar", type: "PS" }
    ]
  },
  {
    name: "Vavuniya",
    localGovernments: [
      { name: "Vavuniya", type: "UC" },
      { name: "Vavuniya North", type: "PS" },
      { name: "Vavuniya South", type: "PS" },
      { name: "Vengalasettikulam", type: "PS" }
    ]
  },
  {
    name: "Mullaitivu",
    localGovernments: [
      { name: "Maritimepattu", type: "PS" },
      { name: "Puthukudiyiruppu", type: "PS" },
      { name: "Thunukkai", type: "PS" },
      { name: "Manthai East", type: "PS" },
      { name: "Welioya", type: "PS" },
      { name: "Mullaitivu", type: "PS" }
    ]
  },
  {
    name: "Batticaloa",
    localGovernments: [
      { name: "Batticaloa", type: "MC" },
      { name: "Eravur", type: "UC" },
      { name: "Kattankudy", type: "UC" },
      { name: "Eravur Pattu", type: "PS" },
      { name: "Koralai Pattu", type: "PS" },
      { name: "Koralai Pattu West", type: "PS" },
      { name: "Koralai Pattu North", type: "PS" },
      { name: "Koralai Pattu South", type: "PS" },
      { name: "Manmunai North", type: "PS" },
      { name: "Manmunai Pattu", type: "PS" },
      { name: "Manmunai South & Eruvil Pattu", type: "PS" },
      { name: "Manmunai South-West", type: "PS" },
      { name: "Manmunai West", type: "PS" },
      { name: "Porativu Pattu", type: "PS" }
    ]
  },
  {
    name: "Ampara",
    localGovernments: [
      { name: "Ampara", type: "UC" },
      { name: "Kalmunai", type: "MC" },
      { name: "Sammanthurai", type: "PS" },
      { name: "Karativu", type: "PS" },
      { name: "Nainttivu", type: "PS" },
      { name: "Addalachchenai", type: "PS" },
      { name: "Akkaraipattu", type: "PS" },
      { name: "Alayadivembu", type: "PS" },
      { name: "Damana", type: "PS" },
      { name: "Dehiattakandiya", type: "PS" },
      { name: "Irakkamam", type: "PS" },
      { name: "Lahugala", type: "PS" },
      { name: "Mahaoya", type: "PS" },
      { name: "Navithanveli", type: "PS" },
      { name: "Padiyathalawa", type: "PS" },
      { name: "Pothuvil", type: "PS" },
      { name: "Thirukkovil", type: "PS" },
      { name: "Uhana", type: "PS" }
    ]
  },
  {
    name: "Trincomalee",
    localGovernments: [
      { name: "Trincomalee", type: "UC" },
      { name: "Kinniya", type: "UC" },
      { name: "Kantalai", type: "PS" },
      { name: "Kinniya", type: "PS" },
      { name: "Kuchchaveli", type: "PS" },
      { name: "Morawewa", type: "PS" },
      { name: "Muttur", type: "PS" },
      { name: "Padavi Sri Pura", type: "PS" },
      { name: "Seruvila", type: "PS" },
      { name: "Thambalagamuwa", type: "PS" },
      { name: "Trincomalee Town & Gravets", type: "PS" },
      { name: "Verugal", type: "PS" }
    ]
  },
  {
    name: "Kurunegala",
    localGovernments: [
      { name: "Kurunegala", type: "MC" },
      { name: "Kuliyapitiya", type: "UC" },
      { name: "Polgahawela", type: "UC" },
      { name: "Alawwa", type: "PS" },
      { name: "Bingiriya", type: "PS" },
      { name: "Ehetuwewa", type: "PS" },
      { name: "Galgamuwa", type: "PS" },
      { name: "Ganewatta", type: "PS" },
      { name: "Giribawa", type: "PS" },
      { name: "Ibbagamuwa", type: "PS" },
      { name: "Kobeigane", type: "PS" },
      { name: "Kotawehera", type: "PS" },
      { name: "Kuliyapitiya East", type: "PS" },
      { name: "Kuliyapitiya West", type: "PS" },
      { name: "Kurunegala", type: "PS" },
      { name: "Mahawa", type: "PS" },
      { name: "Mallawapitiya", type: "PS" },
      { name: "Maspotha", type: "PS" },
      { name: "Mawathagama", type: "PS" },
      { name: "Narammala", type: "PS" },
      { name: "Nikaweratiya", type: "PS" },
      { name: "Panduwasnuwara", type: "PS" },
      { name: "Pannala", type: "PS" },
      { name: "Polgahawela", type: "PS" },
      { name: "Polpithigama", type: "PS" },
      { name: "Rasnayakapura", type: "PS" },
      { name: "Rideegama", type: "PS" },
      { name: "Udubaddawa", type: "PS" },
      { name: "Wariyapola", type: "PS" },
      { name: "Weerambugedara", type: "PS" }
    ]
  },
  {
    name: "Puttalam",
    localGovernments: [
      { name: "Chilaw", type: "UC" },
      { name: "Puttalam", type: "UC" },
      { name: "Anamaduwa", type: "PS" },
      { name: "Arachchikattuwa", type: "PS" },
      { name: "Chilaw", type: "PS" },
      { name: "Dankotuwa", type: "PS" },
      { name: "Kalpitiya", type: "PS" },
      { name: "Karuwalagaswewa", type: "PS" },
      { name: "Madampe", type: "PS" },
      { name: "Mahakumbukkadawala", type: "PS" },
      { name: "Mahawewa", type: "PS" },
      { name: "Mundalama", type: "PS" },
      { name: "Nattandiya", type: "PS" },
      { name: "Nawagattegama", type: "PS" },
      { name: "Pallama", type: "PS" },
      { name: "Puttalam", type: "PS" },
      { name: "Vanathavilluwa", type: "PS" },
      { name: "Wennappuwa", type: "PS" }
    ]
  },
  {
    name: "Anuradhapura",
    localGovernments: [
      { name: "Anuradhapura", type: "MC" },
      { name: "Kekirawa", type: "PS" },
      { name: "Medawachchiya", type: "PS" },
      { name: "Mihintale", type: "PS" },
      { name: "Nochchiyagama", type: "PS" },
      { name: "Nuwaragam Palatha Central", type: "PS" },
      { name: "Nuwaragam Palatha East", type: "PS" },
      { name: "Padaviya", type: "PS" },
      { name: "Palagala", type: "PS" },
      { name: "Palugaswewa", type: "PS" },
      { name: "Rajanganaya", type: "PS" },
      { name: "Rambewa", type: "PS" },
      { name: "Thalawa", type: "PS" },
      { name: "Thambuttegama", type: "PS" },
      { name: "Thirappane", type: "PS" },
      { name: "Galenbindunuwewa", type: "PS" },
      { name: "Horowpothana", type: "PS" },
      { name: "Ipalogama", type: "PS" },
      { name: "Kahatagasdigiliya", type: "PS" },
      { name: "Kebithigollewa", type: "PS" },
      { name: "Mahavilachchiya", type: "PS" },
      { name: "Galnewa", type: "PS" }
    ]
  },
  {
    name: "Polonnaruwa",
    localGovernments: [
      { name: "Polonnaruwa", type: "UC" },
      { name: "Dimbulagala", type: "PS" },
      { name: "Elahera", type: "PS" },
      { name: "Hingurakgoda", type: "PS" },
      { name: "Lankapura", type: "PS" },
      { name: "Medirigiriya", type: "PS" },
      { name: "Thamankaduwa", type: "PS" },
      { name: "Welikanda", type: "PS" }
    ]
  },
  {
    name: "Badulla",
    localGovernments: [
      { name: "Badulla", type: "MC" },
      { name: "Bandarawela", type: "MC" },
      { name: "Haputale", type: "UC" },
      { name: "Hali-Ela", type: "UC" },
      { name: "Ella", type: "PS" },
      { name: "Badulla", type: "PS" },
      { name: "Bandarawela", type: "PS" },
      { name: "Haldummulla", type: "PS" },
      { name: "Haputale", type: "PS" },
      { name: "Kandaketiya", type: "PS" },
      { name: "Lunugala", type: "PS" },
      { name: "Mahiyanganaya", type: "PS" },
      { name: "Meegahakivula", type: "PS" },
      { name: "Passara", type: "PS" },
      { name: "Rideemaliyadda", type: "PS" },
      { name: "Soranathota", type: "PS" },
      { name: "Uva-Paranagama", type: "PS" },
      { name: "Welimada", type: "PS" }
    ]
  },
  {
    name: "Monaragala",
    localGovernments: [
      { name: "Monaragala", type: "PS" },
      { name: "Badalkumbura", type: "PS" },
      { name: "Bibile", type: "PS" },
      { name: "Buttala", type: "PS" },
      { name: "Katharagama", type: "PS" },
      { name: "Madulla", type: "PS" },
      { name: "Medagama", type: "PS" },
      { name: "Sevanagala", type: "PS" },
      { name: "Siyambalanduwa", type: "PS" },
      { name: "Thanamalvila", type: "PS" },
      { name: "Wellawaya", type: "PS" }
    ]
  },
  {
    name: "Ratnapura",
    localGovernments: [
      { name: "Ratnapura", type: "MC" },
      { name: "Balangoda", type: "UC" },
      { name: "Embilipitiya", type: "UC" },
      { name: "Ayagama", type: "PS" },
      { name: "Balangoda", type: "PS" },
      { name: "Eheliyagoda", type: "PS" },
      { name: "Embilipitiya", type: "PS" },
      { name: "Godakawela", type: "PS" },
      { name: "Imbulpe", type: "PS" },
      { name: "Kahawatta", type: "PS" },
      { name: "Kalawana", type: "PS" },
      { name: "Kiriella", type: "PS" },
      { name: "Kolonna", type: "PS" },
      { name: "Kuruvita", type: "PS" },
      { name: "Nivithigala", type: "PS" },
      { name: "Pelmadulla", type: "PS" },
      { name: "Ratnapura", type: "PS" },
      { name: "Weligepola", type: "PS" }
    ]
  },
  {
    name: "Kegalle",
    localGovernments: [
      { name: "Kegalle", type: "UC" },
      { name: "Aranayaka", type: "PS" },
      { name: "Bulathkohupitiya", type: "PS" },
      { name: "Dehiovita", type: "PS" },
      { name: "Deraniyagala", type: "PS" },
      { name: "Galigamuwa", type: "PS" },
      { name: "Kegalle", type: "PS" },
      { name: "Mawanella", type: "PS" },
      { name: "Rambukkana", type: "PS" },
      { name: "Ruwanwella", type: "PS" },
      { name: "Warakapola", type: "PS" },
      { name: "Yatiyantota", type: "PS" }
    ]
  }
];

// Helper function to get all districts
export function getDistricts(): string[] {
  return districts.map(district => district.name);
}

// Helper function to get local governments for a given district
export function getLocalGovernments(districtName: string): string[] {
  const district = districts.find(d => d.name === districtName);
  if (!district) return [];
  
  return district.localGovernments.map(lg => {
    const typeMap: Record<string, string> = {
      "MC": "Municipal Council",
      "UC": "Urban Council",
      "PS": "Pradeshiya Sabha"
    };
    return `${lg.name} ${typeMap[lg.type]}`;
  });
}
