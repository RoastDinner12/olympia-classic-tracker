import React, { createContext, useContext, useState, useEffect } from 'react';
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
  TabType,
  DayCarbCycle,
  RoadmapPhase,
  CyclePhasePlan,
  WeakPointRating,
  PhotoCheckIn,
  ClinicalGuardrailAlert,
  PedLibraryItem,
  StackRecommendation
} from '../types';
import { 
  INITIAL_PROFILE, 
  INITIAL_ROADMAP,
  INITIAL_CYCLE_PLANS,
  INITIAL_WEAK_POINTS,
  INITIAL_CHECKIN_PHOTOS,
  INITIAL_MACROS, 
  INITIAL_MEALS, 
  INITIAL_COMPOUNDS, 
  INITIAL_INJECTIONS, 
  INITIAL_WORKOUTS, 
  INITIAL_MEASUREMENTS, 
  INITIAL_BIOMARKERS, 
  INITIAL_PEAK_WEEK 
} from '../data/initialData';
import { PED_LIBRARY } from '../data/pedLibrary';
import { STACK_RECOMMENDATIONS } from '../data/stackRecommendations';
import { getIfbbWeightLimit } from '../data/ifbbLimits';

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  roadmap: RoadmapPhase[];
  toggleRoadmapComplete: (id: string) => void;
  cyclePlans: CyclePhasePlan[];
  updateCyclePhaseStatus: (id: string, status: CyclePhasePlan['status']) => void;
  weakPoints: WeakPointRating[];
  updateWeakPointScore: (id: string, score: number) => void;
  checkInPhotos: PhotoCheckIn[];
  addCheckInPhoto: (photo: Omit<PhotoCheckIn, 'id'>) => void;
  macros: MacroTarget;
  updateMacros: (updates: Partial<MacroTarget>) => void;
  carbCycleDay: DayCarbCycle;
  setCarbCycleDay: (cycle: DayCarbCycle) => void;
  meals: MealItem[];
  addMeal: (meal: Omit<MealItem, 'id'>) => void;
  toggleMealEaten: (id: string) => void;
  deleteMeal: (id: string) => void;
  compounds: Compound[];
  addCompound: (compound: Omit<Compound, 'id'>) => void;
  addCompoundFromLibrary: (item: PedLibraryItem, customDose?: string, customFrequency?: any, customTiming?: any) => void;
  clearAllCyclesAndCompounds: () => void;
  deployStackRecommendation: (rec: StackRecommendation, replaceExisting?: boolean) => void;
  toggleCompoundLogged: (id: string) => void;
  toggleCompoundActive: (id: string) => void;
  deleteCompound: (id: string) => void;
  pedLibrary: PedLibraryItem[];
  stackRecommendations: StackRecommendation[];
  injections: InjectionLog[];
  addInjection: (inj: Omit<InjectionLog, 'id'>) => void;
  workouts: WorkoutSession[];
  addWorkoutSession: (session: WorkoutSession) => void;
  toggleWorkoutComplete: (id: string) => void;
  measurements: BodyMeasurement[];
  addMeasurement: (measurement: Omit<BodyMeasurement, 'id'>) => void;
  biomarkers: BiomarkerEntry[];
  addBiomarker: (entry: Omit<BiomarkerEntry, 'id'>) => void;
  clinicalAlerts: ClinicalGuardrailAlert[];
  peakWeek: PeakWeekDay[];
  togglePeakDayComplete: (dayIndex: number) => void;
  resetToDefaults: () => void;
  currentAgeYears: number;
  ageAtShowYears: number;
  daysUntilShow: number;
  weightDeltaToCap: number;
  adherenceScore: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_PREFIX = 'aegis_classic_data_v5_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [carbCycleDay, setCarbCycleDay] = useState<DayCarbCycle>('Moderate');

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'roadmap');
    return saved ? JSON.parse(saved) : INITIAL_ROADMAP;
  });

  const [cyclePlans, setCyclePlans] = useState<CyclePhasePlan[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'cyclePlans');
    return saved ? JSON.parse(saved) : INITIAL_CYCLE_PLANS;
  });

  const [weakPoints, setWeakPoints] = useState<WeakPointRating[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'weakPoints');
    return saved ? JSON.parse(saved) : INITIAL_WEAK_POINTS;
  });

  const [checkInPhotos, setCheckInPhotos] = useState<PhotoCheckIn[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'checkInPhotos');
    return saved ? JSON.parse(saved) : INITIAL_CHECKIN_PHOTOS;
  });

  const [macros, setMacros] = useState<MacroTarget>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'macros');
    return saved ? JSON.parse(saved) : INITIAL_MACROS;
  });

  const [meals, setMeals] = useState<MealItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'meals');
    return saved ? JSON.parse(saved) : INITIAL_MEALS;
  });

  const [compounds, setCompounds] = useState<Compound[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'compounds');
    return saved ? JSON.parse(saved) : INITIAL_COMPOUNDS;
  });

  const [injections, setInjections] = useState<InjectionLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'injections');
    return saved ? JSON.parse(saved) : INITIAL_INJECTIONS;
  });

  const [workouts, setWorkouts] = useState<WorkoutSession[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'workouts');
    return saved ? JSON.parse(saved) : INITIAL_WORKOUTS;
  });

  const [measurements, setMeasurements] = useState<BodyMeasurement[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'measurements');
    return saved ? JSON.parse(saved) : INITIAL_MEASUREMENTS;
  });

  const [biomarkers, setBiomarkers] = useState<BiomarkerEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'biomarkers');
    return saved ? JSON.parse(saved) : INITIAL_BIOMARKERS;
  });

  const [peakWeek, setPeakWeek] = useState<PeakWeekDay[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'peakWeek');
    return saved ? JSON.parse(saved) : INITIAL_PEAK_WEEK;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'profile', JSON.stringify(profile));
  }, [profile]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'roadmap', JSON.stringify(roadmap));
  }, [roadmap]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'cyclePlans', JSON.stringify(cyclePlans));
  }, [cyclePlans]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'weakPoints', JSON.stringify(weakPoints));
  }, [weakPoints]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'checkInPhotos', JSON.stringify(checkInPhotos));
  }, [checkInPhotos]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'macros', JSON.stringify(macros));
  }, [macros]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'meals', JSON.stringify(meals));
  }, [meals]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'compounds', JSON.stringify(compounds));
  }, [compounds]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'injections', JSON.stringify(injections));
  }, [injections]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'workouts', JSON.stringify(workouts));
  }, [workouts]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'measurements', JSON.stringify(measurements));
  }, [measurements]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'biomarkers', JSON.stringify(biomarkers));
  }, [biomarkers]);
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'peakWeek', JSON.stringify(peakWeek));
  }, [peakWeek]);

  // Dynamic calculations
  const birthTime = new Date(profile.birthDate).getTime();
  const now = new Date().getTime();
  const showTime = new Date(profile.targetShowDate).getTime();

  const currentAgeYears = parseFloat(((now - birthTime) / (365.25 * 24 * 3600 * 1000)).toFixed(2));
  const ageAtShowYears = parseFloat(((showTime - birthTime) / (365.25 * 24 * 3600 * 1000)).toFixed(2));
  const daysUntilShow = Math.max(0, Math.ceil((showTime - now) / (1000 * 3600 * 24)));

  const officialLimit = getIfbbWeightLimit(profile.heightFeet, profile.heightInches);
  const weightDeltaToCap = parseFloat((profile.currentWeight - officialLimit.limitLbs).toFixed(1));

  // Compute Daily Adherence Score
  const totalMeals = meals.length;
  const eatenMeals = meals.filter(m => m.isEaten).length;
  const activeCompounds = compounds.filter(c => c.currentActive && c.frequency !== 'As Needed');
  const loggedCompounds = activeCompounds.filter(c => c.logsToday).length;
  
  const mealAdherence = totalMeals > 0 ? (eatenMeals / totalMeals) * 50 : 50;
  const compoundAdherence = activeCompounds.length > 0 ? (loggedCompounds / activeCompounds.length) * 50 : 50;
  const adherenceScore = Math.round(mealAdherence + compoundAdherence);

  // Dynamic Clinical Guardrails Engine
  const latestBio = biomarkers[0];
  const clinicalAlerts: ClinicalGuardrailAlert[] = [];

  if (latestBio) {
    if (latestBio.bpSystolic > 135 || latestBio.bpDiastolic > 85) {
      clinicalAlerts.push({
        id: 'bp_crit',
        parameter: 'Blood Pressure',
        currentValue: `${latestBio.bpSystolic}/${latestBio.bpDiastolic} mmHg`,
        severity: 'CRITICAL',
        rationale: 'Elevated systolic BP triggers left ventricular hypertrophy and accelerates renal strain.',
        remedialAction: 'Increase Telmisartan from 40mg to 80mg, increase fasted Zone 2 cardio to 40 mins, drop sodium by 1000mg.',
        ancillaryProtocol: 'Telmisartan 80mg AM + Hawthorn Berry 1000mg + 5g L-Citrulline'
      });
    } else if (latestBio.bpSystolic > 125 || latestBio.bpDiastolic > 80) {
      clinicalAlerts.push({
        id: 'bp_warn',
        parameter: 'Blood Pressure',
        currentValue: `${latestBio.bpSystolic}/${latestBio.bpDiastolic} mmHg`,
        severity: 'BORDERLINE',
        rationale: 'Slightly above strict bodybuilding benchmark (< 120/80 mmHg).',
        remedialAction: 'Maintain daily 30m fasted treadmill, ensure 6.5L minimum fluid throughput.',
        ancillaryProtocol: 'Telmisartan 40mg AM + Carditone herbal support'
      });
    } else {
      clinicalAlerts.push({
        id: 'bp_opt',
        parameter: 'Blood Pressure',
        currentValue: `${latestBio.bpSystolic}/${latestBio.bpDiastolic} mmHg`,
        severity: 'OPTIMAL',
        rationale: 'Pristine cardiovascular status. Excellent left ventricular compliance.',
        remedialAction: 'Maintain current protocol.',
        ancillaryProtocol: 'Telmisartan 40mg maintenance'
      });
    }

    if (latestBio.hematocritPct && latestBio.hematocritPct > 52) {
      clinicalAlerts.push({
        id: 'hct_crit',
        parameter: 'Hematocrit (RBC Density)',
        currentValue: `${latestBio.hematocritPct}%`,
        severity: 'CRITICAL',
        rationale: 'Viscous blood increases stroke risk and strains heart pump efficiency.',
        remedialAction: 'Schedule 500ml therapeutic phlebotomy within 7 days. Bump water to 8L daily immediately.',
        ancillaryProtocol: 'Baby Aspirin (81mg) daily + Nattokinase 4000 FU'
      });
    } else if (latestBio.hematocritPct && latestBio.hematocritPct > 50) {
      clinicalAlerts.push({
        id: 'hct_warn',
        parameter: 'Hematocrit (RBC Density)',
        currentValue: `${latestBio.hematocritPct}%`,
        severity: 'BORDERLINE',
        rationale: 'Approaching the upper limit of clinical safety (50-52%).',
        remedialAction: 'Increase daily grapefruit consumption (naringin downregulates hematocrit) + maintain 7L hydration.',
        ancillaryProtocol: 'Grapefruit extract + 81mg Aspirin'
      });
    } else {
      clinicalAlerts.push({
        id: 'hct_opt',
        parameter: 'Hematocrit (RBC Density)',
        currentValue: `${latestBio.hematocritPct || 48.2}%`,
        severity: 'OPTIMAL',
        rationale: 'Fluid hemodynamic flow with optimal oxygen carrying capacity.',
        remedialAction: 'Maintain 6.5L hydration.',
        ancillaryProtocol: 'Standard hydration'
      });
    }

    if (latestBio.egfrKidney && latestBio.egfrKidney < 80) {
      clinicalAlerts.push({
        id: 'egfr_crit',
        parameter: 'Kidney Function (eGFR)',
        currentValue: `${latestBio.egfrKidney} mL/min`,
        severity: 'CRITICAL',
        rationale: 'Renal clearance impaired. Heavy nitrogenous waste or high androgen load.',
        remedialAction: 'Order Cystatin C blood test (creatinine often gives false low eGFR in muscular bodybuilders).',
        ancillaryProtocol: 'Astragalus Root 3000mg/day + Sodium Bicarbonate'
      });
    } else {
      clinicalAlerts.push({
        id: 'egfr_opt',
        parameter: 'Kidney Function (eGFR)',
        currentValue: `${latestBio.egfrKidney || 104} mL/min`,
        severity: 'OPTIMAL',
        rationale: 'Excellent glomerular filtration rate. Kidneys operating at full capacity.',
        remedialAction: 'Continue kidney organ support stack.',
        ancillaryProtocol: 'Astragalus 2000mg maintenance'
      });
    }
  }

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => {
      const updated = { ...prev, ...updates };
      if (updates.heightFeet !== undefined || updates.heightInches !== undefined) {
        const hF = updates.heightFeet ?? prev.heightFeet;
        const hI = updates.heightInches ?? prev.heightInches;
        const lim = getIfbbWeightLimit(hF, hI);
        updated.stageWeightCap = lim.limitLbs;
      }
      return updated;
    });
  };

  const toggleRoadmapComplete = (id: string) => {
    setRoadmap(prev => prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  const updateCyclePhaseStatus = (id: string, status: CyclePhasePlan['status']) => {
    setCyclePlans(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const updateWeakPointScore = (id: string, score: number) => {
    setWeakPoints(prev => prev.map(w => w.id === id ? { ...w, score } : w));
  };

  const addCheckInPhoto = (photo: Omit<PhotoCheckIn, 'id'>) => {
    const newP: PhotoCheckIn = {
      ...photo,
      id: 'photo_' + Date.now()
    };
    setCheckInPhotos(prev => [newP, ...prev]);
  };

  const updateMacros = (updates: Partial<MacroTarget>) => {
    setMacros(prev => ({ ...prev, ...updates }));
  };

  const addMeal = (meal: Omit<MealItem, 'id'>) => {
    const newMeal: MealItem = {
      ...meal,
      id: 'm_' + Date.now()
    };
    setMeals(prev => [...prev, newMeal]);
  };

  const toggleMealEaten = (id: string) => {
    setMeals(prev => prev.map(m => m.id === id ? { ...m, isEaten: !m.isEaten } : m));
  };

  const deleteMeal = (id: string) => {
    setMeals(prev => prev.filter(m => m.id !== id));
  };

  const addCompound = (compound: Omit<Compound, 'id'>) => {
    const newC: Compound = {
      ...compound,
      id: 'c_' + Date.now()
    };
    setCompounds(prev => [...prev, newC]);
  };

  const addCompoundFromLibrary = (
    item: PedLibraryItem,
    customDose?: string,
    customFrequency?: any,
    customTiming?: any
  ) => {
    const newC: Compound = {
      id: 'c_' + Date.now(),
      name: item.name,
      category: item.mappedCategory,
      dose: customDose || item.defaultDoseNumber,
      unit: item.unit,
      frequency: customFrequency || item.typicalFrequency,
      timing: customTiming || item.defaultTiming,
      halfLifeDays: item.halfLifeDays,
      route: item.route,
      currentActive: true,
      notes: `${item.chemicalName}. ${item.classicPhysiqueUtility}`,
      logsToday: false
    };
    setCompounds(prev => [...prev, newC]);
  };

  const clearAllCyclesAndCompounds = () => {
    setCompounds([]);
    setCyclePlans([]);
    setInjections([]);
    localStorage.removeItem(STORAGE_PREFIX + 'compounds');
    localStorage.removeItem(STORAGE_PREFIX + 'cyclePlans');
    localStorage.removeItem(STORAGE_PREFIX + 'injections');
  };

  const deployStackRecommendation = (rec: StackRecommendation, replaceExisting: boolean = true) => {
    const newCompounds: Compound[] = rec.compounds.map((c, idx) => ({
      id: `c_rec_${rec.id}_${Date.now()}_${idx}`,
      name: c.name,
      category: c.category,
      dose: c.dose,
      unit: c.unit,
      frequency: c.frequency,
      timing: c.timing,
      halfLifeDays: c.halfLifeDays,
      route: c.route,
      currentActive: true,
      notes: `${c.notes}${c.isAncillary ? ' [Mandatory Ancillary / Organ Shield]' : ''}`,
      logsToday: false
    }));

    if (replaceExisting) {
      setCompounds(newCompounds);
    } else {
      setCompounds(prev => [...prev, ...newCompounds]);
    }

    const newPlan: CyclePhasePlan = {
      id: `plan_${rec.id}_${Date.now()}`,
      name: rec.name,
      phaseType: rec.phaseCategory === 'Mass_Accretion' ? 'Mass_Blast' :
                 rec.phaseCategory === 'Contest_Prep' ? 'Contest_Prep_Cut' :
                 rec.phaseCategory === 'Health_Cruise' ? 'Consolidation_Cruise' : 'Peak_Dry',
      durationWeeks: rec.durationWeeks,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + rec.durationWeeks * 7 * 24 * 3600 * 1000).toISOString().split('T')[0],
      compounds: rec.compounds.map(c => `${c.name} (${c.dose}${c.unit} ${c.frequency})`),
      bloodworkCheckpointWeeks: [4, Math.floor(rec.durationWeeks / 2), rec.durationWeeks],
      esterClearanceWindowDays: Math.max(...rec.compounds.map(c => Math.round(c.halfLifeDays * 5))),
      healthSupportFocus: `Cardioprotection & Organ Armor (AAS Load: ${rec.totalAasWeeklyMg}mg/wk)`,
      status: 'active'
    };

    setCyclePlans(prev => [newPlan, ...prev.map(p => ({ ...p, status: 'upcoming' as const }))]);
  };

  const toggleCompoundLogged = (id: string) => {
    setCompounds(prev => prev.map(c => c.id === id ? { ...c, logsToday: !c.logsToday } : c));
  };

  const toggleCompoundActive = (id: string) => {
    setCompounds(prev => prev.map(c => c.id === id ? { ...c, currentActive: !c.currentActive } : c));
  };

  const deleteCompound = (id: string) => {
    setCompounds(prev => prev.filter(c => c.id !== id));
  };

  const addInjection = (inj: Omit<InjectionLog, 'id'>) => {
    const newInj: InjectionLog = {
      ...inj,
      id: 'inj_' + Date.now()
    };
    setInjections(prev => [newInj, ...prev]);
  };

  const addWorkoutSession = (session: WorkoutSession) => {
    setWorkouts(prev => [session, ...prev]);
  };

  const toggleWorkoutComplete = (id: string) => {
    setWorkouts(prev => prev.map(w => w.id === id ? { ...w, completed: !w.completed } : w));
  };

  const addMeasurement = (measurement: Omit<BodyMeasurement, 'id'>) => {
    const newM: BodyMeasurement = {
      ...measurement,
      id: 'meas_' + Date.now()
    };
    setMeasurements(prev => [newM, ...prev]);
    updateProfile({ currentWeight: measurement.weight });
  };

  const addBiomarker = (entry: Omit<BiomarkerEntry, 'id'>) => {
    const newBio: BiomarkerEntry = {
      ...entry,
      id: 'bio_' + Date.now()
    };
    setBiomarkers(prev => [newBio, ...prev]);
  };

  const togglePeakDayComplete = (dayIndex: number) => {
    setPeakWeek(prev => prev.map(d => d.dayIndex === dayIndex ? { ...d, completed: !d.completed } : d));
  };

  const resetToDefaults = () => {
    if (confirm('Reset all tracking data to 22-Month Championship Prep defaults?')) {
      localStorage.clear();
      setProfile(INITIAL_PROFILE);
      setRoadmap(INITIAL_ROADMAP);
      setCyclePlans(INITIAL_CYCLE_PLANS);
      setWeakPoints(INITIAL_WEAK_POINTS);
      setCheckInPhotos(INITIAL_CHECKIN_PHOTOS);
      setMacros(INITIAL_MACROS);
      setMeals(INITIAL_MEALS);
      setCompounds(INITIAL_COMPOUNDS);
      setInjections(INITIAL_INJECTIONS);
      setWorkouts(INITIAL_WORKOUTS);
      setMeasurements(INITIAL_MEASUREMENTS);
      setBiomarkers(INITIAL_BIOMARKERS);
      setPeakWeek(INITIAL_PEAK_WEEK);
    }
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      profile,
      updateProfile,
      roadmap,
      toggleRoadmapComplete,
      cyclePlans,
      updateCyclePhaseStatus,
      weakPoints,
      updateWeakPointScore,
      checkInPhotos,
      addCheckInPhoto,
      macros,
      updateMacros,
      carbCycleDay,
      setCarbCycleDay,
      meals,
      addMeal,
      toggleMealEaten,
      deleteMeal,
      compounds,
      addCompound,
      addCompoundFromLibrary,
      clearAllCyclesAndCompounds,
      deployStackRecommendation,
      toggleCompoundLogged,
      toggleCompoundActive,
      deleteCompound,
      pedLibrary: PED_LIBRARY,
      stackRecommendations: STACK_RECOMMENDATIONS,
      injections,
      addInjection,
      workouts,
      addWorkoutSession,
      toggleWorkoutComplete,
      measurements,
      addMeasurement,
      biomarkers,
      addBiomarker,
      clinicalAlerts,
      peakWeek,
      togglePeakDayComplete,
      resetToDefaults,
      currentAgeYears,
      ageAtShowYears,
      daysUntilShow,
      weightDeltaToCap,
      adherenceScore
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

