export interface IfbbWeightBracket {
  minHeightInches: number;
  maxHeightInches: number;
  label: string;
  weightLimitLbs: number;
  weightLimitKg: number;
}

// Official IFBB Pro League Classic Physique Height-Weight Divisions (with recent pro limit updates)
export const IFBB_CLASSIC_LIMITS: IfbbWeightBracket[] = [
  { minHeightInches: 0, maxHeightInches: 64, label: "Up to & incl. 5'4\" (163 cm)", weightLimitLbs: 165, weightLimitKg: 74.8 },
  { minHeightInches: 64.01, maxHeightInches: 65, label: "Over 5'4\" up to 5'5\" (165 cm)", weightLimitLbs: 172, weightLimitKg: 78.0 },
  { minHeightInches: 65.01, maxHeightInches: 66, label: "Over 5'5\" up to 5'6\" (168 cm)", weightLimitLbs: 179, weightLimitKg: 81.2 },
  { minHeightInches: 66.01, maxHeightInches: 67, label: "Over 5'6\" up to 5'7\" (170 cm)", weightLimitLbs: 186, weightLimitKg: 84.4 },
  { minHeightInches: 67.01, maxHeightInches: 68, label: "Over 5'7\" up to 5'8\" (173 cm)", weightLimitLbs: 194, weightLimitKg: 88.0 },
  { minHeightInches: 68.01, maxHeightInches: 69, label: "Over 5'8\" up to 5'9\" (175 cm)", weightLimitLbs: 202, weightLimitKg: 91.6 },
  { minHeightInches: 69.01, maxHeightInches: 70, label: "Over 5'9\" up to 5'10\" (178 cm)", weightLimitLbs: 210, weightLimitKg: 95.3 },
  { minHeightInches: 70.01, maxHeightInches: 71, label: "Over 5'10\" up to 5'11\" (180 cm)", weightLimitLbs: 218, weightLimitKg: 98.9 },
  { minHeightInches: 71.01, maxHeightInches: 72, label: "Over 5'11\" up to 6'0\" (183 cm)", weightLimitLbs: 227, weightLimitKg: 103.0 },
  { minHeightInches: 72.01, maxHeightInches: 73, label: "Over 6'0\" up to 6'1\" (185 cm)", weightLimitLbs: 236, weightLimitKg: 107.0 },
  { minHeightInches: 73.01, maxHeightInches: 74, label: "Over 6'1\" up to 6'2\" (188 cm)", weightLimitLbs: 245, weightLimitKg: 111.1 },
  { minHeightInches: 74.01, maxHeightInches: 75, label: "Over 6'2\" up to 6'3\" (191 cm)", weightLimitLbs: 254, weightLimitKg: 115.2 },
  { minHeightInches: 75.01, maxHeightInches: 76, label: "Over 6'3\" up to 6'4\" (193 cm)", weightLimitLbs: 263, weightLimitKg: 119.3 },
  { minHeightInches: 76.01, maxHeightInches: 77, label: "Over 6'4\" up to 6'5\" (196 cm)", weightLimitLbs: 271, weightLimitKg: 122.9 },
  { minHeightInches: 77.01, maxHeightInches: 78, label: "Over 6'5\" up to 6'6\" (198 cm)", weightLimitLbs: 280, weightLimitKg: 127.0 },
  { minHeightInches: 78.01, maxHeightInches: 80, label: "Over 6'6\" up to 6'7\" (201 cm)", weightLimitLbs: 288, weightLimitKg: 130.6 },
  { minHeightInches: 80.01, maxHeightInches: 90, label: "Over 6'7\" (201+ cm)", weightLimitLbs: 295, weightLimitKg: 133.8 }
];

export function getIfbbWeightLimit(heightFeet: number, heightInches: number): { limitLbs: number; limitKg: number; bracketLabel: string } {
  const totalInches = (heightFeet * 12) + heightInches;
  const match = IFBB_CLASSIC_LIMITS.find(b => totalInches <= b.maxHeightInches) || IFBB_CLASSIC_LIMITS[IFBB_CLASSIC_LIMITS.length - 1];
  return {
    limitLbs: match.weightLimitLbs,
    limitKg: match.weightLimitKg,
    bracketLabel: match.label
  };
}

export interface LegendRecord {
  name: string;
  achievement: string;
  ageWon: number;
  year: number;
  height: string;
  weight: string;
  significance: string;
}

export const HISTORIC_BENCHMARKS: LegendRecord[] = [
  {
    name: "Chris Bumstead (CBum)",
    achievement: "First Classic Physique Olympia Victory",
    ageWon: 24.8,
    year: 2019,
    height: "6'1\" (185 cm)",
    weight: "237 lbs (Stage Cap)",
    significance: "Standard bearer of modern Classic Physique. Won at age 24, went on to 6x consecutive Olympia reigns."
  },
  {
    name: "Arnold Schwarzenegger",
    achievement: "Youngest Ever Mr. Olympia (Open)",
    ageWon: 23.2,
    year: 1970,
    height: "6'2\" (188 cm)",
    weight: "235 lbs",
    significance: "Won his 1st of 7 Sandows at 23 years, 2 months old. The eternal benchmark for youth dominance."
  },
  {
    name: "Lee Haney",
    achievement: "First Mr. Olympia Victory",
    ageWon: 24.9,
    year: 1984,
    height: "5'11\" (180 cm)",
    weight: "248 lbs",
    significance: "Dominant aesthetic mass era; captured 8 consecutive Olympias starting at age 24."
  },
  {
    name: "Shawn Rhoden",
    achievement: "Oldest First-Time Olympia Winner",
    ageWon: 43.4,
    year: 2018,
    height: "5'10\"",
    weight: "242 lbs",
    significance: "Proof of long-term classic lines, but the goal here is the EXACT opposite: earliest coronation in history."
  }
];
