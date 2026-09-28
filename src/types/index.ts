export type TabType = 
  | 'dashboard'
  | 'roadmap'
  | 'matrix'
  | 'nutrition'
  | 'peds'
  | 'training'
  | 'physique'
  | 'biomarkers'
  | 'peakweek';

export interface UserProfile {
  name: string;
  birthDate: string; // YYYY-MM-DD
  targetShowDate: string; // YYYY-MM-DD
  targetShowName: string;
  heightFeet: number;
  heightInches: number;
  currentWeight: number; // in lbs
  weightUnit: 'lbs' | 'kg';
  stageWeightCap: number; // computed from IFBB table
  phase: 'prep' | 'offseason' | 'mass_offseason' | 'peak_week' | 'post_show';
  recordToBeatAge: number; // e.g. 24.8 (C-Bum was 24, Arnold 23)
  recordHolderName: string;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  category: string;
  durationMonths: number;
  monthRange: string;
  startDate: string;
  endDate: string;
  goalWeightLbs: number;
  pedPhase: 'Blast' | 'Cruise/Deload' | 'Contest Prep Protocol';
  primaryFocus: string;
  milestones: string[];
  completed: boolean;
}

export interface CyclePhasePlan {
  id: string;
  name: string;
  phaseType: 'Mass_Blast' | 'Consolidation_Cruise' | 'Contest_Prep_Cut' | 'Peak_Dry';
  durationWeeks: number;
  startDate: string;
  endDate: string;
  compounds: string[];
  bloodworkCheckpointWeeks: number[];
  esterClearanceWindowDays: number;
  healthSupportFocus: string;
  status: 'active' | 'upcoming' | 'completed';
}

export interface WeakPointRating {
  id: string;
  muscleGroup: string;
  muscleHead: string;
  score: number;
  targetScore: number;
  classicPriority: string;
  specializationExercise: string;
  coachingCue: string;
}

export interface PhotoCheckIn {
  id: string;
  date: string;
  weightLbs: number;
  pose: 'Front Double Bicep' | 'Side Chest' | 'Back Double Bicep' | 'Ab & Thigh' | 'Favorite Classic Pose' | 'Stomach Vacuum';
  notes: string;
  photoUrl: string;
}

export interface ClinicalGuardrailAlert {
  id: string;
  parameter: string;
  currentValue: string;
  severity: 'OPTIMAL' | 'BORDERLINE' | 'CRITICAL';
  rationale: string;
  remedialAction: string;
  ancillaryProtocol: string;
}

export interface MacroTarget {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  waterLiters: number;
  sodiumMg: number;
  potassiumMg: number;
}

export interface MealItem {
  id: string;
  name: string;
  amount: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  timing: 'Breakfast' | 'Pre-Workout' | 'Intra-Workout' | 'Post-Workout' | 'Midday' | 'Dinner' | 'Pre-Bed';
  isEaten: boolean;
  notes?: string;
}

export type DayCarbCycle = 'High' | 'Moderate' | 'Low' | 'Zero';

export interface Compound {
  id: string;
  name: string;
  category: 'AAS' | 'GH_Secretagogue' | 'Thyroid_FatBurner' | 'Ancillary_AI' | 'Organ_Support';
  dose: string;
  unit: 'mg' | 'mcg' | 'IU';
  frequency: 'Every Day' | 'EOD' | 'Mon/Wed/Fri' | 'Twice Weekly' | 'Weekly' | 'As Needed';
  timing: 'AM' | 'PM' | 'Pre-Workout' | 'Pre-Bed' | 'Divided';
  halfLifeDays: number;
  route: 'Intramuscular' | 'Subcutaneous' | 'Oral';
  currentActive: boolean;
  notes: string;
  logsToday: boolean;
}

export type InjectionSite = 
  | 'Right Glute'
  | 'Left Glute'
  | 'Right Ventroglute'
  | 'Left Ventroglute'
  | 'Right Delt'
  | 'Left Delt'
  | 'Right Quad'
  | 'Left Quad'
  | 'Right Lat'
  | 'Left Lat';

export interface InjectionLog {
  id: string;
  date: string;
  site: InjectionSite;
  compounds: string;
  volumeMl: number;
  painRating: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  targetSets: number;
  targetReps: string;
  workingWeight: number;
  rpe: number;
  notes?: string;
  completed: boolean;
  isPR?: boolean;
}

export interface WorkoutSession {
  id: string;
  dayName: string;
  split: 'Push (Chest/Shoulders/Triceps)' | 'Pull (Back/Rear Delts/Biceps)' | 'Legs (Quad Dominant)' | 'Legs (Ham/Glute Dominant)' | 'Upper Classic Aesthetics' | 'Rest / Active Recovery';
  date: string;
  durationMinutes: number;
  completed: boolean;
  cardioMinutes: number;
  cardioType: 'Fasted Incline Treadmill' | 'Stairmaster' | 'Stationary Bike' | 'None';
  vacuumSeconds: number;
  exercises: WorkoutExercise[];
}

export interface BodyMeasurement {
  id: string;
  date: string;
  weight: number;
  bodyFatPct?: number;
  chestInches: number;
  waistInches: number;
  shouldersInches: number;
  leftArmInches: number;
  rightArmInches: number;
  leftQuadInches: number;
  rightQuadInches: number;
  leftCalfInches: number;
  rightCalfInches: number;
  neckInches: number;
  frontVacuumHoldSeconds: number;
  frontPhoto?: string;
  sidePhoto?: string;
  backPhoto?: string;
}

export interface BiomarkerEntry {
  id: string;
  date: string;
  bpSystolic: number;
  bpDiastolic: number;
  restingHeartRate: number;
  fastingBloodGlucose: number;
  hematocritPct?: number;
  rbc?: number;
  astLiver?: number;
  altLiver?: number;
  egfrKidney?: number;
  creatinine?: number;
  totalCholesterol?: number;
  hdl?: number;
  ldl?: number;
  estradiolE2?: number;
  totalTestosterone?: number;
  prolactin?: number;
}

export interface PeakWeekDay {
  dayIndex: number;
  dayName: string;
  date: string;
  waterGoalLiters: number;
  sodiumGoalMg: number;
  potassiumGoalMg: number;
  carbsGoalG: number;
  proteinGoalG: number;
  cardioMin: number;
  trainingInstructions: string;
  tanInstructions: string;
  pumpUpProtocol: string;
  completed: boolean;
}

