import { WorkoutExercise } from '../types';

export interface AmPmScheduledDay {
  dayNumber: number;
  dayName: string;
  isRestDay: boolean;
  amSession?: {
    title: string;
    focus: string;
    stimulus: 'Mechanical Tension' | 'Hypertrophic Stretch' | 'Metabolic Stress' | 'Peak Contraction & Posing';
    targetMuscles: string[];
    suggestedOralTiming: string;
    exercises: WorkoutExercise[];
    cardioMin: number;
    vacuumSeconds: number;
  };
  pmSession?: {
    title: string;
    focus: string;
    stimulus: 'Mechanical Tension' | 'Hypertrophic Stretch' | 'Metabolic Stress' | 'Peak Contraction & Posing';
    targetMuscles: string[];
    suggestedOralTiming: string;
    exercises: WorkoutExercise[];
    cardioMin: number;
    vacuumSeconds: number;
  };
  recoveryNotes: string;
}

export const AM_PM_WEEKLY_SPLIT: AmPmScheduledDay[] = [
  {
    dayNumber: 1,
    dayName: 'Monday',
    isRestDay: false,
    recoveryNotes: 'Consume Meal 1 at 7:00 AM. Lift AM at 8:30 AM. Nap/rest 1:00 PM. Meal 3 at 3:30 PM. Lift PM at 5:30 PM.',
    amSession: {
      title: 'Upper Body A: Heavy Mechanical Tension',
      focus: 'High neurological tension, 5-8 reps, maximum mechanical load on clavicular chest and lats.',
      stimulus: 'Mechanical Tension',
      targetMuscles: ['Chest', 'Back', 'Delts', 'Arms'],
      suggestedOralTiming: '15mg Dbol OR 25mg Anadrol 60 mins before AM lift with 50g Cream of Rice.',
      cardioMin: 20,
      vacuumSeconds: 120,
      exercises: [
        { id: 'm1_1', name: 'Incline Barbell Bench Press (30°)', targetSets: 4, targetReps: '5-8 (Top set RPE 9.5)', workingWeight: 315, rpe: 9.5, notes: 'Clavicular head thickness. 2-second controlled descent.', completed: false, isPR: true },
        { id: 'm1_2', name: 'Weighted Neutral-Grip Pull-ups', targetSets: 4, targetReps: '6-8', workingWeight: 45, rpe: 9, notes: 'Full lat stretch at bottom, chin over bar.', completed: false },
        { id: 'm1_3', name: 'Standing Dumbbell Lateral Raise (Heavy Swings)', targetSets: 4, targetReps: '8-10', workingWeight: 50, rpe: 9, notes: 'Heavy clavicular lateral sweep for V-taper.', completed: false },
        { id: 'm1_4', name: 'Standing Barbell Bicep Curl', targetSets: 3, targetReps: '6-8', workingWeight: 115, rpe: 9, notes: 'Strict form, no hip swing.', completed: false }
      ]
    },
    pmSession: {
      title: 'Lower Body A: Quad Sweep Overload',
      focus: 'Knee flexion, maximum vastus lateralis tension, 6-10 rep range with deep knee flexion.',
      stimulus: 'Mechanical Tension',
      targetMuscles: ['Quads', 'Adductors', 'Calves', 'Vacuum Core'],
      suggestedOralTiming: '15mg Dbol OR second oral pulse 60 mins before PM lift with 40g Cluster Dextrin.',
      cardioMin: 0,
      vacuumSeconds: 120,
      exercises: [
        { id: 'm2_1', name: 'Heel-Elevated Hack Squats (ATG)', targetSets: 4, targetReps: '6-10 (Failure on set 4)', workingWeight: 450, rpe: 10, notes: 'Knees driving over toes. Deep teardrop quad recruitment.', completed: false, isPR: true },
        { id: 'm2_2', name: 'Leg Press (Close & Low Foot Placement)', targetSets: 4, targetReps: '8-10', workingWeight: 720, rpe: 9.5, notes: 'Outer quad sweep overload.', completed: false },
        { id: 'm2_3', name: 'Seated Hip Adductor Machine', targetSets: 3, targetReps: '10-12', workingWeight: 180, rpe: 9, notes: 'Inner thigh fullness for Front Double Bicep.', completed: false },
        { id: 'm2_4', name: 'Standing Donkey Calf Raises', targetSets: 4, targetReps: '10-12 (2s stretch at bottom)', workingWeight: 240, rpe: 9, notes: 'Gastrocnemius diamond head.', completed: false }
      ]
    }
  },
  {
    dayNumber: 2,
    dayName: 'Tuesday',
    isRestDay: false,
    recoveryNotes: 'High hydration (6.5L). Take 5g Taurine between sessions to prevent lower back and calf pumps.',
    amSession: {
      title: 'Upper Body B: Hypertrophic Stretch & Negatives',
      focus: '3-second eccentric negatives and deep fascial stretch for chest, lats, and rear delts.',
      stimulus: 'Hypertrophic Stretch',
      targetMuscles: ['Chest', 'Back', 'Delts', 'Arms'],
      suggestedOralTiming: '15mg Dbol OR 25mg Anadrol 60 mins before AM lift with 60g oats & whey isolate.',
      cardioMin: 20,
      vacuumSeconds: 120,
      exercises: [
        { id: 't1_1', name: 'Incline Dumbbell Flyes with Deep Stretch', targetSets: 3, targetReps: '10-12 (3s negative)', workingWeight: 65, rpe: 9, notes: 'Deep stretch at bottom. Expand ribcage.', completed: false },
        { id: 't1_2', name: 'Wide-Grip Lat Pulldown (Slow Eccentric)', targetSets: 4, targetReps: '10-12', workingWeight: 220, rpe: 9, notes: 'Pull to upper clavicle, control 3s release.', completed: false },
        { id: 't1_3', name: 'Rear Delt Cross-Cable Flyes', targetSets: 4, targetReps: '12-15', workingWeight: 35, rpe: 9, notes: 'Rear head 3D cap for Back Double Bicep.', completed: false },
        { id: 't1_4', name: 'Overhead Dual Cable Tricep Extension', targetSets: 4, targetReps: '10-12', workingWeight: 75, rpe: 9, notes: 'Long head tricep horseshoe stretch.', completed: false }
      ]
    },
    pmSession: {
      title: 'Lower Body B: Posterior Chain & Hamstrings',
      focus: 'Hip hinge mechanics, biceps femoris tie-in, and glute-hamstring separation.',
      stimulus: 'Hypertrophic Stretch',
      targetMuscles: ['Hamstrings', 'Glutes', 'Calves', 'Vacuum Core'],
      suggestedOralTiming: '15mg Dbol OR oral pulse 60 mins before PM lift with pre-workout meal.',
      cardioMin: 0,
      vacuumSeconds: 120,
      exercises: [
        { id: 't2_1', name: 'Deficit Romanian Deadlifts (RDLs)', targetSets: 4, targetReps: '8-10 (Soft knees, slow stretch)', workingWeight: 385, rpe: 9.5, notes: 'Biceps femoris stretch. Hips back, spine neutral.', completed: false },
        { id: 't2_2', name: 'Seated Leg Curls (Dorsiflexed Toes)', targetSets: 4, targetReps: '10-12 (Hold 1s at peak)', workingWeight: 165, rpe: 9, notes: 'Lengthened position hamstring tension.', completed: false },
        { id: 't2_3', name: '45° Hyperextensions (Glute & Ham Focus)', targetSets: 3, targetReps: '12-15 (Rounded upper back)', workingWeight: 50, rpe: 9, notes: 'Glute-ham tie-in striations.', completed: false },
        { id: 't2_4', name: 'Seated Soleus Calf Raise', targetSets: 4, targetReps: '12-15', workingWeight: 135, rpe: 9, notes: 'Soleus muscle depth.', completed: false }
      ]
    }
  },
  {
    dayNumber: 3,
    dayName: 'Wednesday',
    isRestDay: true,
    recoveryNotes: 'Mid-week central nervous system deload. High carbohydrate refeed (+100g carbs). Fasted 35m zone 2 incline treadmill + 4x40s vacuum practice.',
    amSession: undefined,
    pmSession: undefined
  },
  {
    dayNumber: 4,
    dayName: 'Thursday',
    isRestDay: false,
    recoveryNotes: 'High glycogen status from Wednesday refeed. Expect massive skin-splitting pumps in both sessions.',
    amSession: {
      title: 'Upper Body C: Metabolic Hyperemia & Giant Sets',
      focus: 'Extreme blood volume, drop-sets, and continuous tension for upper chest, back, and delts.',
      stimulus: 'Metabolic Stress',
      targetMuscles: ['Chest', 'Back', 'Delts', 'Arms'],
      suggestedOralTiming: '15mg Dbol OR 25mg Anadrol 60 mins before AM lift. High sodium (1500mg) for pumps.',
      cardioMin: 20,
      vacuumSeconds: 120,
      exercises: [
        { id: 'th1_1', name: 'Incline Hammer Strength Press (Rest-Pause)', targetSets: 4, targetReps: '12-15 + 4 mini-reps', workingWeight: 270, rpe: 10, notes: 'Maximum clavicular blood saturation.', completed: false },
        { id: 'th1_2', name: 'Chest-Supported T-Bar Row', targetSets: 4, targetReps: '12-15', workingWeight: 180, rpe: 9, notes: 'Mid-back lat thickness and rhomboids.', completed: false },
        { id: 'th1_3', name: 'Cable Lateral Raise Strip-Set', targetSets: 4, targetReps: '15 + 10 drop', workingWeight: 30, rpe: 10, notes: 'Caps the medial deltoid.', completed: false },
        { id: 'th1_4', name: 'Incline Dumbbell Bicep Curls (Supinated)', targetSets: 3, targetReps: '12-15', workingWeight: 35, rpe: 9, notes: 'Bicep peak fullness.', completed: false }
      ]
    },
    pmSession: {
      title: 'Lower Body C: Quad Sweep & Sissy Squat Burn',
      focus: 'High metabolic quad accumulation, teardrop (vastus medialis) and outer sweep burnout.',
      stimulus: 'Metabolic Stress',
      targetMuscles: ['Quads', 'Adductors', 'Calves', 'Vacuum Core'],
      suggestedOralTiming: '15mg Dbol OR second oral pulse 60 mins before PM lift.',
      cardioMin: 0,
      vacuumSeconds: 120,
      exercises: [
        { id: 'th2_1', name: 'Leg Extensions (Continuous Tension)', targetSets: 4, targetReps: '15-20 (Final set 20 reps)', workingWeight: 190, rpe: 10, notes: 'Vastus medialis pump.', completed: false },
        { id: 'th2_2', name: 'Pendulum Squat or Sissy Squat Machine', targetSets: 4, targetReps: '12-15', workingWeight: 225, rpe: 9.5, notes: 'Unrelenting quad burn.', completed: false },
        { id: 'th2_3', name: 'Walking Dumbbell Lunges (Long Stride)', targetSets: 3, targetReps: '20 steps total', workingWeight: 60, rpe: 9, notes: 'Quad and glute density.', completed: false },
        { id: 'th2_4', name: 'Leg Press Calf Press (15 Reps + Burnouts)', targetSets: 4, targetReps: '15-20', workingWeight: 360, rpe: 9.5, notes: 'Intramuscular calf blood flow.', completed: false }
      ]
    }
  },
  {
    dayNumber: 5,
    dayName: 'Friday',
    isRestDay: false,
    recoveryNotes: 'Final training day before weekend growth consolidation. Practice full stage mandatories post-workout.',
    amSession: {
      title: 'Upper Body D: Peak Contraction & Stage Silhouette',
      focus: 'Peak 2-second muscle contractions and Classic mandatory posing hold practice under load.',
      stimulus: 'Peak Contraction & Posing',
      targetMuscles: ['Chest', 'Back', 'Delts', 'Arms'],
      suggestedOralTiming: '15mg Dbol OR 25mg Anadrol 60 mins before AM lift with 50g carbs.',
      cardioMin: 20,
      vacuumSeconds: 180,
      exercises: [
        { id: 'f1_1', name: 'Low-to-High Cable Crossover', targetSets: 4, targetReps: '12-15 (Hold peak 2s)', workingWeight: 45, rpe: 9, notes: 'Clavicular chest striations.', completed: false },
        { id: 'f1_2', name: 'Single-Arm Neutral Cable Lat Row', targetSets: 4, targetReps: '10-12', workingWeight: 100, rpe: 9, notes: 'Elbow into hip pocket for lat flare.', completed: false },
        { id: 'f1_3', name: 'Machine Shoulder Press (Full Lockout)', targetSets: 4, targetReps: '10-12', workingWeight: 190, rpe: 9, notes: 'Classic 3D boulder shoulders.', completed: false },
        { id: 'f1_4', name: 'Cable Rope Tricep Pushdown & Pose', targetSets: 4, targetReps: '12-15', workingWeight: 65, rpe: 9, notes: 'Hold classic side tricep pose after set.', completed: false }
      ]
    },
    pmSession: {
      title: 'Lower Body D: Glute-Ham Tie-in & Striation Hardening',
      focus: 'Peak contraction of hamstrings and glutes, locked-in calf contractions.',
      stimulus: 'Peak Contraction & Posing',
      targetMuscles: ['Hamstrings', 'Glutes', 'Calves', 'Vacuum Core'],
      suggestedOralTiming: '15mg Dbol OR oral pulse 60 mins before PM lift.',
      cardioMin: 0,
      vacuumSeconds: 180,
      exercises: [
        { id: 'f2_1', name: 'Lying Leg Curls (2s Squeeze at Top)', targetSets: 4, targetReps: '10-12 (2s peak hold)', workingWeight: 140, rpe: 9.5, notes: 'Maximum hamstring belly contraction.', completed: false },
        { id: 'f2_2', name: 'Barbell Glute Bridge / Hip Thrust', targetSets: 4, targetReps: '10-12 (Hold 2s at lockout)', workingWeight: 405, rpe: 9, notes: 'Glute striation density.', completed: false },
        { id: 'f2_3', name: 'Standing Single-Leg Hamstring Curl', targetSets: 3, targetReps: '12-15', workingWeight: 65, rpe: 9, notes: 'Unilateral symmetry correction.', completed: false },
        { id: 'f2_4', name: 'Standing Machine Calf Raise (Peak Hold)', targetSets: 4, targetReps: '12-15 (2s peak squeeze)', workingWeight: 220, rpe: 9, notes: 'Diamond calf flare.', completed: false }
      ]
    }
  },
  {
    dayNumber: 6,
    dayName: 'Saturday',
    isRestDay: true,
    recoveryNotes: 'Weekend Recovery Block Day 1: Sleep 9+ hours. Complete biomarker health check-in (Blood Pressure morning reading). Sauna / foam roll.',
    amSession: undefined,
    pmSession: undefined
  },
  {
    dayNumber: 7,
    dayName: 'Sunday',
    isRestDay: true,
    recoveryNotes: 'Weekend Recovery Block Day 2: Prep 6 meals for the upcoming 4x frequency assault. Stomach vacuum holds (4x45s). Restorative walk.',
    amSession: undefined,
    pmSession: undefined
  }
];

export const MUSCLE_4X_FREQUENCY_AUDIT = [
  {
    muscle: 'Clavicular & Sternal Chest',
    weeklyHits: 4,
    sessions: ['Mon AM (Tension)', 'Tue AM (Stretch)', 'Thu AM (Metabolic)', 'Fri AM (Peak Pose)'],
    classicImpact: 'Clavicular shelf for Side Chest & Front Vacuum'
  },
  {
    muscle: 'Latissimus Dorsi & Back Width',
    weeklyHits: 4,
    sessions: ['Mon AM (Tension)', 'Tue AM (Stretch)', 'Thu AM (Metabolic)', 'Fri AM (Peak Pose)'],
    classicImpact: 'Creates the signature Golden Era V-Taper lat spread'
  },
  {
    muscle: 'Deltoids (Lateral & Rear Heads)',
    weeklyHits: 4,
    sessions: ['Mon AM (Tension)', 'Tue AM (Stretch)', 'Thu AM (Metabolic)', 'Fri AM (Peak Pose)'],
    classicImpact: '3D capped boulder delts hanging over a 28" waist'
  },
  {
    muscle: 'Biceps & Triceps (Arm Peak)',
    weeklyHits: 4,
    sessions: ['Mon AM (Tension)', 'Tue AM (Stretch)', 'Thu AM (Metabolic)', 'Fri AM (Peak Pose)'],
    classicImpact: 'Arnold-esque bicep peaks and hanging tricep horseshoes'
  },
  {
    muscle: 'Quadriceps (Vastus Lateralis Sweep)',
    weeklyHits: 4,
    sessions: ['Mon PM (Tension)', 'Tue PM (Stretch)', 'Thu PM (Metabolic)', 'Fri PM (Peak Pose)'],
    classicImpact: 'Deep outer flare for Front Double Bicep and Ab-Thigh'
  },
  {
    muscle: 'Hamstrings & Glute Tie-in',
    weeklyHits: 4,
    sessions: ['Mon PM (Tension)', 'Tue PM (Stretch)', 'Thu PM (Metabolic)', 'Fri PM (Peak Pose)'],
    classicImpact: 'Striated glute-ham tie-in on Back Double Bicep'
  },
  {
    muscle: 'Calves (Gastrocnemius & Soleus)',
    weeklyHits: 4,
    sessions: ['Mon PM (Tension)', 'Tue PM (Stretch)', 'Thu PM (Metabolic)', 'Fri PM (Peak Pose)'],
    classicImpact: 'Eliminates high calf genetic weak points'
  },
  {
    muscle: 'Transverse Abdominis (Vacuum Midsection)',
    weeklyHits: 4,
    sessions: ['Mon Daily', 'Tue Daily', 'Thu Daily', 'Fri Daily (+ Weekend)'],
    classicImpact: 'Unbeatable vacuum pose that wins Olympia titles'
  }
];
