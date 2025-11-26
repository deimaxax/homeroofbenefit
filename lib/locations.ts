export interface StateProgramData {
  name: string;
  programName: string;
  cities: string[];
  utility: string;
  insurers: string[];
  stats?: {
    avgClaim: string;
    homeowners: string;
    coverage: string;
  };
}

export const LOCATIONS: Record<string, StateProgramData> = {
  texas: {
    name: "Texas",
    programName: "Texas Storm Recovery Initiative",
    cities: ["austin", "dallas", "houston", "san-antonio", "fort-worth", "el-paso", "arlington"],
    utility: "ERCOT",
    insurers: ["State Farm Texas", "Allstate", "Farmers"],
    stats: {
      avgClaim: "$12,500",
      homeowners: "15,000+",
      coverage: "254 Counties"
    }
  },
  florida: {
    name: "Florida",
    programName: "Sunshine State Restoration",
    cities: ["miami", "orlando", "tampa", "jacksonville", "tallahassee", "fort-lauderdale"],
    utility: "FPL",
    insurers: ["Citizens Property Insurance", "Universal", "Progressive"],
    stats: {
      avgClaim: "$14,800",
      homeowners: "12,000+",
      coverage: "67 Counties"
    }
  },
  colorado: {
    name: "Colorado",
    programName: "Colorado Roof & Solar Incentive",
    cities: ["denver", "colorado-springs", "aurora", "fort-collins", "boulder", "pueblo"],
    utility: "Xcel Energy",
    insurers: ["State Farm", "American Family", "USAA"],
    stats: {
      avgClaim: "$11,200",
      homeowners: "8,500+",
      coverage: "64 Counties"
    }
  },
  oklahoma: {
    name: "Oklahoma",
    programName: "Oklahoma Storm Recovery",
    cities: ["oklahoma-city", "tulsa", "norman", "broken-arrow"],
    utility: "OG&E",
    insurers: ["State Farm", "Farmers", "Allstate"],
    stats: {
      avgClaim: "$10,500",
      homeowners: "6,200+",
      coverage: "77 Counties"
    }
  },
  kansas: {
    name: "Kansas",
    programName: "Kansas Weather Protection",
    cities: ["wichita", "overland-park", "kansas-city", "topeka"],
    utility: "Evergy",
    insurers: ["State Farm", "Shelter Insurance", "American Family"],
    stats: {
      avgClaim: "$9,800",
      homeowners: "4,500+",
      coverage: "105 Counties"
    }
  },
  nebraska: {
    name: "Nebraska",
    programName: "Nebraska Home Restoration",
    cities: ["omaha", "lincoln", "bellevue", "grand-island"],
    utility: "OPPD",
    insurers: ["State Farm", "Farmers", "USAA"],
    stats: {
      avgClaim: "$9,200",
      homeowners: "3,800+",
      coverage: "93 Counties"
    }
  },
  missouri: {
    name: "Missouri",
    programName: "Missouri Storm Relief",
    cities: ["kansas-city", "st-louis", "springfield", "columbia"],
    utility: "Ameren",
    insurers: ["State Farm", "Shelter Insurance", "Farmers"],
    stats: {
      avgClaim: "$10,100",
      homeowners: "5,500+",
      coverage: "114 Counties"
    }
  },
  minnesota: {
    name: "Minnesota",
    programName: "Minnesota Weather Recovery",
    cities: ["minneapolis", "st-paul", "rochester", "duluth"],
    utility: "Xcel Energy",
    insurers: ["State Farm", "American Family", "USAA"],
    stats: {
      avgClaim: "$10,800",
      homeowners: "6,800+",
      coverage: "87 Counties"
    }
  },
  illinois: {
    name: "Illinois",
    programName: "Illinois Home Protection",
    cities: ["chicago", "aurora", "naperville", "joliet", "rockford"],
    utility: "ComEd",
    insurers: ["State Farm", "Allstate", "Country Financial"],
    stats: {
      avgClaim: "$11,500",
      homeowners: "7,200+",
      coverage: "102 Counties"
    }
  },
  california: {
    name: "California",
    programName: "California Energy Upgrade",
    cities: ["los-angeles", "san-diego", "san-jose", "san-francisco", "fresno", "sacramento"],
    utility: "PG&E",
    insurers: ["State Farm", "Farmers", "AAA"],
    stats: {
      avgClaim: "$15,500",
      homeowners: "25,000+",
      coverage: "58 Counties"
    }
  }
};

export function getStateData(state: string): StateProgramData | null {
  return LOCATIONS[state.toLowerCase()] || null;
}
