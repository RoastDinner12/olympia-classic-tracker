import { 
  UserProfile, 
  MacroTarget, 
  MealItem, 
  Compound, 
  InjectionLog, 
  WorkoutSession, 
  BodyMeasurement, 
  BiomarkerEntry, 
  PeakWeekDay,
  RoadmapPhase,
  CyclePhasePlan,
  WeakPointRating,
  PhotoCheckIn
} from '../types';

export const INITIAL_PROFILE: UserProfile = {
  name: "Marcus Vance",
  birthDate: "2003-04-12", // 23.4 years old
  targetShowDate: "2028-07-27", // Olympia Finals (22 Months Out)
  targetShowName: "IFBB Mr. Olympia Classic Physique",
  heightFeet: 6,
  heightInches: 0,
  currentWeight: 163.1, // 74.0 kg
  weightUnit: "kg",
  stageWeightCap: 227, // 103.0 kg limit for 6'0"
  phase: "mass_offseason",
  recordToBeatAge: 24.8, // Beat Chris Bumstead (24.8 yrs)
  recordHolderName: "Chris Bumstead (24y 290d)"
};

export const INITIAL_ROADMAP: RoadmapPhase[] = [
  {
    id: "phase1a",
    title: "Phase 1A: Clean Mass Accretion Kickstart (74 kg → 84 kg)",
    category: "Phase 1: Hypertrophy & Tissue Accretion",
    durationMonths: 4,
    monthRange: "Months 1 - 4 (Oct 2026 - Jan 2027)",
    startDate: "2026-10-01",
    endDate: "2027-01-31",
    goalWeightLbs: 185,
    pedPhase: "Blast",
    primaryFocus: "Pure contractile tissue accretion with zero water bloat. Maintaining razor-tight vacuum midsection and pristine cardiovascular biomarkers.",
    milestones: [
      "Reach 84 kg (185 lbs) with under 10% bodyfat",
      "Expand chest clavicular shelf and lateral deltoid width for V-taper",
      "Establish strict baseline bloodwork (lipids, kidney eGFR, liver transaminases)"
    ],
    completed: false
  },
  {
    id: "phase1b",
    title: "Phase 1B: Primary Hypertrophy Engine (84 kg → 94 kg)",
    category: "Phase 1: Hypertrophy & Tissue Accretion",
    durationMonths: 6,
    monthRange: "Months 5 - 10 (Feb 2027 - Jul 2027)",
    startDate: "2027-02-01",
    endDate: "2027-07-31",
    goalWeightLbs: 207,
    pedPhase: "Blast",
    primaryFocus: "Heavy progressive mechanical tension on squat and deadlift variations. Massive leg sweeps and back lat thickness.",
    milestones: [
      "Cross 94 kg (207 lbs) scale weight",
      "Hit 500 lb squat and 365 lb incline barbell press",
      "Maintain resting BP below 125/80 mmHg with Telmisartan support"
    ],
    completed: false
  },
  {
    id: "phase1c",
    title: "Phase 1C: Health Consolidation & Organ Deload",
    category: "Phase 1: Hypertrophy & Tissue Accretion",
    durationMonths: 4,
    monthRange: "Months 11 - 14 (Aug 2027 - Nov 2027)",
    startDate: "2027-08-01",
    endDate: "2027-11-30",
    goalWeightLbs: 205,
    pedPhase: "Cruise/Deload",
    primaryFocus: "Receptor resensitization, complete biomarker recovery, joint cartilage and tendon regeneration.",
    milestones: [
      "Maintain 93-94 kg lean body mass on TRT cruise + rhGH",
      "Normalise AST/ALT < 35 U/L and eGFR > 95 mL/min",
      "Complete 4-week heavy tendon rehab protocol"
    ],
    completed: false
  },
  {
    id: "phase2a",
    title: "Phase 2A: Maxing Division Ceiling (94 kg → 103 kg Cap)",
    category: "Phase 2: Pro Card & Olympia Assault",
    durationMonths: 4,
    monthRange: "Months 15 - 18 (Dec 2027 - Mar 2028)",
    startDate: "2027-12-01",
    endDate: "2028-03-31",
    goalWeightLbs: 227,
    pedPhase: "Blast",
    primaryFocus: "Fill frame to exact 103 kg IFBB Classic Physique stage weight limit. Win IFBB Pro Card at National Championship.",
    milestones: [
      "Weigh in at 103 kg (227 lbs) contest condition",
      "Win IFBB Pro Card with unanimous first-place scores",
      "Lock down full Classic posing routine with vacuum holds"
    ],
    completed: false
  },
  {
    id: "phase2b",
    title: "Phase 2B: Olympia Peak Conditioning & Victory",
    category: "Phase 2: Pro Card & Olympia Assault",
    durationMonths: 4,
    monthRange: "Months 19 - 22 (Apr 2028 - Jul 2028)",
    startDate: "2028-04-01",
    endDate: "2028-07-27",
    goalWeightLbs: 227,
    pedPhase: "Contest Prep Protocol",
    primaryFocus: "3.8% bodyfat stage conditioning, striated glutes, paper-thin skin, crowning as the youngest IFBB Classic Olympia winner.",
    milestones: [
      "Step on Olympia stage at maximum 103 kg limit @ 4% BF",
      "Execute flawless vacuum pose during finals comparison",
      "Crowned youngest IFBB Classic Physique Mr. Olympia champion"
    ],
    completed: false
  }
];

export const INITIAL_CYCLE_PLANS: CyclePhasePlan[] = [];

export const INITIAL_WEAK_POINTS: WeakPointRating[] = [
  {
    id: "wp_chest",
    muscleGroup: "Chest",
    muscleHead: "Clavicular Head (Upper Chest)",
    score: 6.8,
    targetScore: 9.8,
    classicPriority: "Maximum (Defines Side Chest & Front Vacuum)",
    specializationExercise: "30-degree Incline Hammer Press with 2-second peak pause",
    coachingCue: "Tuck scapula, initiate press through clavicle fibers, avoid shoulder flare"
  },
  {
    id: "wp_delts",
    muscleGroup: "Shoulders",
    muscleHead: "Lateral Deltoid",
    score: 7.2,
    targetScore: 9.9,
    classicPriority: "Maximum (Creates the golden V-Taper)",
    specializationExercise: "Behind-the-Back Cable Lateral Raise with continuous tension",
    coachingCue: "Lead with elbows, pour the pitcher at the top, control 3s negative"
  },
  {
    id: "wp_quads",
    muscleGroup: "Quads",
    muscleHead: "Vastus Lateralis (Outer Sweep)",
    score: 6.5,
    targetScore: 9.7,
    classicPriority: "High (Key to Front Double Bicep & Ab-Thigh)",
    specializationExercise: "Narrow Stance Heel-Elevated Hack Squats (ATG)",
    coachingCue: "Knees forward past toes, zero hip shift, maintain torso erect"
  },
  {
    id: "wp_hamstrings",
    muscleGroup: "Hamstrings",
    muscleHead: "Biceps Femoris & Glute-Ham Tie-in",
    score: 7.0,
    targetScore: 9.6,
    classicPriority: "High (Required for striated side and back shots)",
    specializationExercise: "Deficit Stiff-Legged Barbell Deadlifts with slow eccentric stretch",
    coachingCue: "Hips high and back, maintain soft knee bend, pull through hamstrings"
  },
  {
    id: "wp_vacuum",
    muscleGroup: "Core",
    muscleHead: "Transverse Abdominis (Vacuum Midsection)",
    score: 8.0,
    targetScore: 10.0,
    classicPriority: "Legendary (Signature IFBB Classic Physique Weapon)",
    specializationExercise: "Fasted Morning 4x30-second Supine & Standing Stomach Vacuums",
    coachingCue: "Exhale every milliliter of air, pull navel into spine, lock rib cage up"
  }
];

export const INITIAL_CHECKIN_PHOTOS: PhotoCheckIn[] = [
  {
    id: "photo_1",
    date: "2026-09-27",
    weightLbs: 163.1,
    pose: "Favorite Classic Pose",
    notes: "Day 1 Baseline Check-in: 74.0 kg (163.1 lbs). Starting 22-month conquest to 103 kg Olympia cap.",
    photoUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "photo_2",
    date: "2026-09-27",
    weightLbs: 163.1,
    pose: "Stomach Vacuum",
    notes: "Baseline stomach vacuum: 28-inch waist circumference. Target: maintain under 30.5 inches at 103 kg.",
    photoUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_MACROS: MacroTarget = {
  calories: 3350,
  protein: 310,
  carbs: 380,
  fats: 65,
  waterLiters: 6.5,
  sodiumMg: 4500,
  potassiumMg: 3500
};

export const INITIAL_MEALS: MealItem[] = [
  {
    id: "m1",
    name: "Meal 1: Fasted Anabolic Kickstart",
    amount: "100g Cream of Rice, 60g Hydrolyzed Whey Isolate, 150g Blueberries, 20g Almond Butter, 5g Pink Himalayan Salt",
    calories: 680,
    protein: 55,
    carbs: 85,
    fats: 12,
    timing: "Breakfast",
    isEaten: true,
    notes: "High digestion speed, low GI distress"
  },
  {
    id: "m2",
    name: "Meal 2: Pre-Workout Sustained Density",
    amount: "250g Jasmine Rice, 200g 96/4 Lean Ground Beef, 100g Steamed Asparagus, 10ml Macadamia Nut Oil",
    calories: 740,
    protein: 58,
    carbs: 90,
    fats: 14,
    timing: "Pre-Workout",
    isEaten: true,
    notes: "Consumed 90 mins before training. Excellent intramuscular glycogen pumps."
  },
  {
    id: "m3",
    name: "Meal 3: Intra-Workout Hyperemia Fuel",
    amount: "45g Highly Branched Cyclic Dextrin (Cluster Dextrin), 15g EAAs, 5g Creatine Creapure, 1500mg Sodium, 500mg Potassium",
    calories: 210,
    protein: 15,
    carbs: 45,
    fats: 0,
    timing: "Intra-Workout",
    isEaten: false,
    notes: "Sipped throughout heavy working sets"
  },
  {
    id: "m4",
    name: "Meal 4: Post-Workout Glycogen Reload",
    amount: "300g White Rice, 220g Chicken Breast, 1 Bananas, 5g Cinnamon (glucose sensitivity)",
    calories: 720,
    protein: 62,
    carbs: 98,
    fats: 6,
    timing: "Post-Workout",
    isEaten: false,
    notes: "Spike protein synthesis & rapid glycogen restoration"
  },
  {
    id: "m5",
    name: "Meal 5: Evening Structural Anabolism",
    amount: "250g Sweet Potato, 220g Wild Alaskan Salmon, 150g Steamed Broccoli, 1 Lemon squeezed",
    calories: 620,
    protein: 56,
    carbs: 55,
    fats: 18,
    timing: "Dinner",
    isEaten: false,
    notes: "Rich in Omega-3 (EPA/DHA) for systemic inflammation control"
  },
  {
    id: "m6",
    name: "Meal 6: Nocturnal Slow-Release Recovery",
    amount: "250g Pasteurized Liquid Egg Whites, 1 Whole Omega-3 Egg, 30g Micellar Casein, 15g Raw Walnuts",
    calories: 380,
    protein: 64,
    carbs: 7,
    fats: 15,
    timing: "Pre-Bed",
    isEaten: false,
    notes: "Maintains positive nitrogen balance through deep REM sleep"
  }
];

// Active compounds cleared out - ready for user custom stack
export const INITIAL_COMPOUNDS: Compound[] = [];

// Injection history cleared out
export const INITIAL_INJECTIONS: InjectionLog[] = [];


export const INITIAL_WORKOUTS: WorkoutSession[] = [
  {
    id: "w1",
    dayName: "Chest & Classical Deltoid Silhouette",
    split: "Push (Chest/Shoulders/Triceps)",
    date: "2026-09-27",
    durationMinutes: 72,
    completed: true,
    cardioMinutes: 35,
    cardioType: "Fasted Incline Treadmill",
    vacuumSeconds: 180,
    exercises: [
      { id: "e1", name: "Incline Hammer Strength Chest Press", targetSets: 4, targetReps: "8-10 (Top set to failure + 2 partials)", workingWeight: 360, rpe: 10, notes: "Clavicular head focus for massive side chest pose", completed: true, isPR: true },
      { id: "e2", name: "Prime Fitness Incline Dumbbell Flyes", targetSets: 3, targetReps: "10-12 (3 sec eccentric stretch)", workingWeight: 75, rpe: 9, notes: "Full deep fascial expansion at the bottom", completed: true },
      { id: "e3", name: "Standing Dumbbell Lateral Raise (Heavy)", targetSets: 5, targetReps: "12-15", workingWeight: 55, rpe: 9.5, notes: "Key to broad V-taper ratio over narrow waist", completed: true },
      { id: "e4", name: "Cross-Cable Rear Delt Flyes", targetSets: 4, targetReps: "15-20", workingWeight: 42.5, rpe: 9, notes: "3D shoulder cap for back double bicep", completed: true },
      { id: "e5", name: "Overhead Dual Cable Tricep Extension", targetSets: 4, targetReps: "10-12", workingWeight: 85, rpe: 9, notes: "Long head horseshoe fullness", completed: true }
    ]
  },
  {
    id: "w2",
    dayName: "V-Taper Lat Width & Classical Back Density",
    split: "Pull (Back/Rear Delts/Biceps)",
    date: "2026-09-26",
    durationMinutes: 78,
    completed: true,
    cardioMinutes: 30,
    cardioType: "Stairmaster",
    vacuumSeconds: 150,
    exercises: [
      { id: "e6", name: "Chest-Supported T-Bar Row", targetSets: 4, targetReps: "8-10", workingWeight: 270, rpe: 9.5, notes: "Mid-back thickness & rhomboid detail", completed: true },
      { id: "e7", name: "Single Arm Iliac Lat Pulldown", targetSets: 4, targetReps: "10-12", workingWeight: 110, rpe: 9, notes: "Isolate lower lats down to hip insertion", completed: true },
      { id: "e8", name: "Weighted Wide-Grip Neutral Pullups", targetSets: 3, targetReps: "Failure", workingWeight: 45, rpe: 10, notes: "Classic sweep expansion", completed: true },
      { id: "e9", name: "Incline Dumbbell Spider Curls", targetSets: 4, targetReps: "10-12", workingWeight: 45, rpe: 9, notes: "High bicep peak for front double bicep", completed: true }
    ]
  }
];

export const INITIAL_MEASUREMENTS: BodyMeasurement[] = [
  {
    id: "m-1",
    date: "2026-09-27",
    weight: 234.5,
    bodyFatPct: 6.8,
    chestInches: 51.5,
    waistInches: 29.8, // Elite classic waist (< 30 inches!)
    shouldersInches: 56.2,
    leftArmInches: 19.8,
    rightArmInches: 20.0,
    leftQuadInches: 28.2,
    rightQuadInches: 28.3,
    leftCalfInches: 18.2,
    rightCalfInches: 18.2,
    neckInches: 18.4,
    frontVacuumHoldSeconds: 42
  },
  {
    id: "m-2",
    date: "2026-09-13",
    weight: 238.2,
    bodyFatPct: 7.9,
    chestInches: 52.0,
    waistInches: 30.5,
    shouldersInches: 56.0,
    leftArmInches: 20.0,
    rightArmInches: 20.1,
    leftQuadInches: 28.6,
    rightQuadInches: 28.7,
    leftCalfInches: 18.3,
    rightCalfInches: 18.3,
    neckInches: 18.5,
    frontVacuumHoldSeconds: 35
  },
  {
    id: "m-3",
    date: "2026-08-30",
    weight: 242.0,
    bodyFatPct: 8.8,
    chestInches: 52.2,
    waistInches: 31.4,
    shouldersInches: 56.4,
    leftArmInches: 20.2,
    rightArmInches: 20.3,
    leftQuadInches: 29.0,
    rightQuadInches: 29.1,
    leftCalfInches: 18.4,
    rightCalfInches: 18.4,
    neckInches: 18.6,
    frontVacuumHoldSeconds: 28
  }
];

export const INITIAL_BIOMARKERS: BiomarkerEntry[] = [
  {
    id: "bio-1",
    date: "2026-09-27",
    bpSystolic: 118,
    bpDiastolic: 74,
    restingHeartRate: 54,
    fastingBloodGlucose: 86,
    hematocritPct: 48.2,
    rbc: 5.4,
    astLiver: 28,
    altLiver: 32,
    egfrKidney: 104,
    creatinine: 1.15,
    totalCholesterol: 168,
    hdl: 44,
    ldl: 105,
    estradiolE2: 29.4,
    totalTestosterone: 2450,
    prolactin: 8.2
  },
  {
    id: "bio-2",
    date: "2026-09-14",
    bpSystolic: 122,
    bpDiastolic: 76,
    restingHeartRate: 56,
    fastingBloodGlucose: 89,
    hematocritPct: 49.0,
    astLiver: 34,
    altLiver: 38,
    egfrKidney: 98,
    creatinine: 1.20,
    hdl: 41,
    ldl: 112,
    estradiolE2: 34.0
  }
];

export const INITIAL_PEAK_WEEK: PeakWeekDay[] = [
  {
    dayIndex: 7,
    dayName: "Saturday (7 Days Out) - Frontload Saturation",
    date: "2026-11-07",
    waterGoalLiters: 9.0,
    sodiumGoalMg: 6000,
    potassiumGoalMg: 2500,
    carbsGoalG: 200,
    proteinGoalG: 340,
    cardioMin: 45,
    trainingInstructions: "Full body depletion circuit (Upper focus). High reps (15-20), slow tempo, no heavy central nervous fatigue.",
    tanInstructions: "Exfoliate entire body in shower with pH-balanced scrub. Hydrate skin, no lotions.",
    pumpUpProtocol: "N/A - Depletion Phase",
    completed: false
  },
  {
    dayIndex: 6,
    dayName: "Sunday (6 Days Out) - Glycogen Depletion A",
    date: "2026-11-08",
    waterGoalLiters: 9.0,
    sodiumGoalMg: 6000,
    potassiumGoalMg: 2500,
    carbsGoalG: 150,
    proteinGoalG: 350,
    cardioMin: 45,
    trainingInstructions: "Leg depletion session. High volume leg press, leg curls, lunges, calf raises. Drive all intramuscular glycogen to zero.",
    tanInstructions: "Shave entire body clean, gentle moisturizing toner.",
    pumpUpProtocol: "N/A - Depletion Phase",
    completed: false
  },
  {
    dayIndex: 5,
    dayName: "Monday (5 Days Out) - Maximum Depletion B",
    date: "2026-11-09",
    waterGoalLiters: 8.0,
    sodiumGoalMg: 6000,
    potassiumGoalMg: 3000,
    carbsGoalG: 120,
    proteinGoalG: 360,
    cardioMin: 40,
    trainingInstructions: "Back & Delts pump depletion. Muscles look flat and depleted. This creates the supercompensation vacuum.",
    tanInstructions: "Base tan coat 1 applied in evening (Pro Tan / Liquid Sun Rayz).",
    pumpUpProtocol: "N/A",
    completed: false
  },
  {
    dayIndex: 4,
    dayName: "Tuesday (4 Days Out) - The Carb-Up Begins",
    date: "2026-11-10",
    waterGoalLiters: 8.0,
    sodiumGoalMg: 5000,
    potassiumGoalMg: 3500,
    carbsGoalG: 600,
    proteinGoalG: 220,
    cardioMin: 20,
    trainingInstructions: "Rest day or light posing only. No lifting. Allow glucose and water to shuttle directly into dried muscle cells.",
    tanInstructions: "Rinse base coat off with cool water only. No soaps.",
    pumpUpProtocol: "N/A",
    completed: false
  },
  {
    dayIndex: 3,
    dayName: "Wednesday (3 Days Out) - High Supercompensation",
    date: "2026-11-11",
    waterGoalLiters: 6.0,
    sodiumGoalMg: 4500,
    potassiumGoalMg: 4000,
    carbsGoalG: 550,
    proteinGoalG: 220,
    cardioMin: 0,
    trainingInstructions: "15 minutes of mandatory posing hold practice in stage trunks. Check striations in glutes and Christmas tree.",
    tanInstructions: "Contest coat 2 applied. Dry under fans.",
    pumpUpProtocol: "N/A",
    completed: false
  },
  {
    dayIndex: 2,
    dayName: "Thursday (2 Days Out) - Fluid Tapering & Fill",
    date: "2026-11-12",
    waterGoalLiters: 3.5,
    sodiumGoalMg: 3500,
    potassiumGoalMg: 4500,
    carbsGoalG: 450,
    proteinGoalG: 200,
    cardioMin: 0,
    trainingInstructions: "Strict rest. Feet elevated. Evaluate vascularity and skin paper-thinness.",
    tanInstructions: "Touch-up glaze & dark top coat. Check coloring under natural stage spotlighting.",
    pumpUpProtocol: "N/A",
    completed: false
  },
  {
    dayIndex: 1,
    dayName: "Friday (1 Day Out) - Official Weigh-In & Dry Out",
    date: "2026-11-13",
    waterGoalLiters: 1.5,
    sodiumGoalMg: 2000,
    potassiumGoalMg: 5000,
    carbsGoalG: 380,
    proteinGoalG: 180,
    cardioMin: 0,
    trainingInstructions: "Official IFBB Pro Weigh-In! Step on scale under weight cap. Once made, immediately consume 80g carbs + 500ml water.",
    tanInstructions: "Final check. Dark matte bronze sheen.",
    pumpUpProtocol: "Practice 5 mandatories with zero cramp response",
    completed: false
  },
  {
    dayIndex: 0,
    dayName: "SHOW DAY - Mr. Olympia Classic Finals",
    date: "2026-11-14",
    waterGoalLiters: 0.8,
    sodiumGoalMg: 3000,
    potassiumGoalMg: 3000,
    carbsGoalG: 300,
    proteinGoalG: 150,
    cardioMin: 0,
    trainingInstructions: "WARMUP ROOM: 45 mins before stage: 2 rice cakes with honey + 1/2 tsp sea salt. Resistance bands only: side laterals, bicep curls, chest press (do not fatigue).",
    tanInstructions: "Apply Muscle Sheen / Posing Glaze. Not overly greasy, pure chisel highlight.",
    pumpUpProtocol: "Bands pump 15 min out, sip red wine / dark chocolate for vasodilatory vascular pop. HIT THE CLASSIC VACUUM ON STAGE!",
    completed: false
  }
];
