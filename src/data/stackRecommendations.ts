import { StackRecommendation } from '../types';

export const STACK_RECOMMENDATIONS: StackRecommendation[] = [
  // 1. RAW MASS & SIZE: THE GOLDEN ERA ARNOLD TRINITY
  {
    id: 'rec_golden_era_dbol_kickstart',
    name: 'The Golden Era Arnold Mass Trinity: Test + Deca + Dbol',
    subtitle: 'Phase 1A | 74 kg → 86 kg Rapid Mass Detonator (Zero Primo / High Budget-Friendly)',
    phaseCategory: 'Mass_Accretion',
    goalType: 'Raw Mass & Size',
    experienceLevel: 'Intermediate',
    dosageTier: 'Heavy (900-1400mg/wk)',
    durationWeeks: 16,
    totalAasWeeklyMg: 1060,
    targetWeightProgression: '74 kg → 86 kg (+12 kg explosive mass & glycogen fullness)',
    aromatizationLevel: 'Moderate',
    organRiskLevel: 'Moderate',
    description:
      'The classic heavyweight mass trinity favored by Arnold and the Golden Era champions. Zero expensive Primobolan. Utilizes affordable, pharmaceutical-grade Testosterone and Deca as the long-ester foundation, kickstarted with Dianabol for immediate glycogen saturation, extreme strength, and euphoric training drive.',
    rationale:
      'Dianabol at 30mg/day floods muscle bellies with glycogen and intracellular hydration within 72 hours, adding 8-12 lbs of scale weight in weeks 1-4. Deca-Durabolin at 350mg provides immense joint synovial lubrication and collagen synthesis to protect connective tissue as pressing weights shoot up. Test Enanthate at 500mg maintains heavy androgenic tone. Aromasin controls Dbol’s 17α-methyl-estradiol, while TUDCA and NAC shield the liver.',
    keyBenefits: [
      '100% budget-friendly: Zero overpriced or fake Primobolan required',
      'Immediate strength and fullness explosion within the first 10 days from Dbol',
      'Deca-Durabolin eliminates shoulder and elbow pain under heavy 400+ lb benching',
      'Full liver and cardiovascular armor: TUDCA + NAC + Telmisartan included'
    ],
    compounds: [
      {
        name: 'Testosterone Enanthate',
        category: 'AAS',
        dose: '250',
        unit: 'mg',
        frequency: 'Twice Weekly',
        timing: 'AM',
        halfLifeDays: 7.0,
        route: 'Intramuscular',
        notes: 'Total 500 mg/week (e.g. 250mg Monday morning, 250mg Thursday evening). Affordable high-yield anabolic base.'
      },
      {
        name: 'Deca-Durabolin (Nandrolone Decanoate)',
        category: 'AAS',
        dose: '175',
        unit: 'mg',
        frequency: 'Twice Weekly',
        timing: 'AM',
        halfLifeDays: 15.0,
        route: 'Intramuscular',
        notes: 'Total 350 mg/week pinned in same syringe as Test Enanthate. Massive nitrogen retention & joint lubrication.'
      },
      {
        name: 'Dianabol (Methandrostenolone)',
        category: 'AAS',
        dose: '30',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'Divided',
        halfLifeDays: 0.21,
        route: 'Oral',
        notes: '30 mg/day (15mg with Breakfast, 15mg 60 mins Pre-Workout). Weeks 1-6 kickstart. Intracellular glycogen monster.'
      },
      {
        name: 'Aromasin (Exemestane)',
        category: 'Ancillary_AI',
        dose: '12.5',
        unit: 'mg',
        frequency: 'EOD',
        timing: 'PM',
        halfLifeDays: 1.1,
        route: 'Oral',
        isAncillary: true,
        notes: 'Suicidal aromatase inhibitor. Essential while taking Dianabol to control potent 17α-methyl-estradiol.'
      },
      {
        name: 'Cabergoline (Dostinex)',
        category: 'Ancillary_AI',
        dose: '0.25',
        unit: 'mg',
        frequency: 'Twice Weekly',
        timing: 'Pre-Bed',
        halfLifeDays: 2.7,
        route: 'Oral',
        isAncillary: true,
        notes: 'Prolactin inhibitor for Nandrolone Decanoate. Take Monday and Thursday night.'
      },
      {
        name: 'Telmisartan',
        category: 'Organ_Support',
        dose: '40',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 1.0,
        route: 'Oral',
        isAncillary: true,
        notes: 'Blood pressure control (targets < 125/80 mmHg) and prevents cardiac left ventricular strain.'
      },
      {
        name: 'TUDCA',
        category: 'Organ_Support',
        dose: '500',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'PM',
        halfLifeDays: 0.2,
        route: 'Oral',
        isAncillary: true,
        notes: 'Bile canaliculi flow protector. Essential to prevent cholestasis from 17-aa Dianabol.'
      },
      {
        name: 'N-Acetyl Cysteine (NAC)',
        category: 'Organ_Support',
        dose: '1200',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 0.25,
        route: 'Oral',
        isAncillary: true,
        notes: 'Glutathione antioxidant precursor to keep ALT/AST liver enzymes in check.'
      }
    ]
  },

  // 2. STRENGTH & POWER DETONATOR: ANADROL + MASTERON
  {
    id: 'rec_anadrol_nitrogen_detonator',
    name: 'The Oxymetholone (Anadrol) Power & Strength Detonator',
    subtitle: 'Phase 1B | 84 kg → 95 kg Heavy Accretion (The Ultimate Strength Oral)',
    phaseCategory: 'Mass_Accretion',
    goalType: 'Strength & Power Detonator',
    experienceLevel: 'Intermediate',
    dosageTier: 'Heavy (900-1400mg/wk)',
    durationWeeks: 16,
    totalAasWeeklyMg: 1200,
    targetWeightProgression: '84 kg → 95 kg (+11 kg heavy muscular thickness)',
    aromatizationLevel: 'Moderate',
    organRiskLevel: 'Moderate',
    description:
      'Engineered around your favorite powerhouse compound: Anadrol (Oxymetholone 50mg). Delivers unmatched mechanical overload capability, deep red blood cell expansion, and skin-splitting muscle pumps while swapping expensive Primo for affordable Masteron Enanthate as the dry DHT counter-balance.',
    rationale:
      'Anadrol 50mg taken 60-90 minutes pre-workout dramatically enhances neuromuscular recruitment, intracellular glycogen supercompensation, and EPO red blood cell production. Because Anadrol does not aromatize (yet can activate estrogen receptors directly), pairing it with 350mg Masteron Enanthate and 500mg Test Cypionate prevents sloppy water retention. Telmisartan at 40-80mg is mandatory to manage Anadrol’s blood pressure elevation.',
    keyBenefits: [
      'Unstoppable gym aggression, power, and PR lifts on compound movements',
      'Massive RBC volume increase driving roadmap vascularity even in a caloric surplus',
      'Masteron Enanthate replaces expensive Primo at 1/3 of the cost while hardening muscle texture',
      'High-potency liver support (TUDCA 750mg + NAC 1800mg) keeps liver transaminases protected'
    ],
    compounds: [
      {
        name: 'Testosterone Cypionate',
        category: 'AAS',
        dose: '250',
        unit: 'mg',
        frequency: 'Twice Weekly',
        timing: 'AM',
        halfLifeDays: 8.0,
        route: 'Intramuscular',
        notes: 'Total 500 mg/week (Monday morning / Thursday evening). Long ester base.'
      },
      {
        name: 'Masteron Enanthate (Drostanolone)',
        category: 'AAS',
        dose: '175',
        unit: 'mg',
        frequency: 'Twice Weekly',
        timing: 'AM',
        halfLifeDays: 8.0,
        route: 'Intramuscular',
        notes: 'Total 350 mg/week. Affordable DHT derivative that controls water and enhances muscle hardness.'
      },
      {
        name: 'Anadrol (Oxymetholone)',
        category: 'AAS',
        dose: '50',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'Pre-Workout',
        halfLifeDays: 0.35,
        route: 'Oral',
        notes: '50 mg taken 60-75 mins prior to workout with a high-carb meal. Weeks 1-6. Insane pump & raw strength.'
      },
      {
        name: 'Nolvadex (Tamoxifen)',
        category: 'Ancillary_AI',
        dose: '10',
        unit: 'mg',
        frequency: 'As Needed',
        timing: 'AM',
        halfLifeDays: 7.0,
        route: 'Oral',
        isAncillary: true,
        notes: 'Direct estrogen receptor antagonist. Crucial if sensitive nipples occur from Anadrol (AIs cannot block Anadrol-induced ER activation).'
      },
      {
        name: 'Telmisartan',
        category: 'Organ_Support',
        dose: '40',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 1.0,
        route: 'Oral',
        isAncillary: true,
        notes: 'Mandatory on Anadrol to prevent sudden systolic BP spikes and preserve renal glomeruli.'
      },
      {
        name: 'TUDCA',
        category: 'Organ_Support',
        dose: '750',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'PM',
        halfLifeDays: 0.2,
        route: 'Oral',
        isAncillary: true,
        notes: '750mg PM. Crucial liver bile flow protection while taking 17-aa Anadrol.'
      },
      {
        name: 'N-Acetyl Cysteine (NAC)',
        category: 'Organ_Support',
        dose: '1800',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 0.25,
        route: 'Oral',
        isAncillary: true,
        notes: '1800mg/day split dose. Restores hepatic glutathione pools.'
      },
      {
        name: 'Citrus Bergamot',
        category: 'Organ_Support',
        dose: '1000',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 0.5,
        route: 'Oral',
        isAncillary: true,
        notes: 'Protects HDL cholesterol from oral-induced suppression.'
      }
    ]
  },

  // 3. BEGINNER / FIRST TIME ORAL MASS BLAST
  {
    id: 'rec_beginner_dbol_foundation',
    name: 'First Oral Mass Kickstart: Conservative Dbol Foundation',
    subtitle: 'Level 1 Beginner | 74 kg → 82 kg Entry Mass (Gentle Dose / High Response)',
    phaseCategory: 'Mass_Accretion',
    goalType: 'Budget Friendly Mass',
    experienceLevel: 'Beginner / First Blast',
    dosageTier: 'Moderate (500-900mg/wk)',
    durationWeeks: 12,
    totalAasWeeklyMg: 610,
    targetWeightProgression: '74 kg → 82 kg (+8 kg clean initial foundation)',
    aromatizationLevel: 'Moderate',
    organRiskLevel: 'Mild',
    description:
      'The safest, most reliable entry into anabolic orals. Employs a moderate 400mg Test Enanthate base with a conservative 20mg/day Dianabol kickstart for 4 weeks. Ideal for a first cycle or an athlete testing oral tolerance without excessive liver stress.',
    rationale:
      '20mg Dbol provides 80% of the glycogen and strength benefits of 50mg with a fraction of the liver transaminase elevation or blood pressure volatility. Easily controlled with mild Aromasin dosing and standard NAC.',
    keyBenefits: [
      'Low side effect profile; easy to monitor blood pressure and liver enzymes',
      'Fast 6–8 lb strength kickstart in weeks 1–3',
      'Extremely affordable: Requires only 1 vial of Test and 1 bottle of Dbol',
      'Mild on lipids and cardiovascular geometry'
    ],
    compounds: [
      {
        name: 'Testosterone Enanthate',
        category: 'AAS',
        dose: '200',
        unit: 'mg',
        frequency: 'Twice Weekly',
        timing: 'AM',
        halfLifeDays: 7.0,
        route: 'Intramuscular',
        notes: 'Total 400 mg/week (e.g. 200mg Mon / 200mg Thu). Proven beginner anabolic foundation.'
      },
      {
        name: 'Dianabol (Methandrostenolone)',
        category: 'AAS',
        dose: '20',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'Divided',
        halfLifeDays: 0.21,
        route: 'Oral',
        notes: '20 mg/day (10mg breakfast / 10mg pre-workout) for Weeks 1–4 only. Clean entry oral kickstart.'
      },
      {
        name: 'Aromasin (Exemestane)',
        category: 'Ancillary_AI',
        dose: '12.5',
        unit: 'mg',
        frequency: 'As Needed',
        timing: 'PM',
        halfLifeDays: 1.1,
        route: 'Oral',
        isAncillary: true,
        notes: 'Take 12.5mg only if nipples get itchy or water retention feels heavy.'
      },
      {
        name: 'Telmisartan',
        category: 'Organ_Support',
        dose: '20',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 1.0,
        route: 'Oral',
        isAncillary: true,
        notes: '20mg maintenance for optimal blood pressure.'
      },
      {
        name: 'N-Acetyl Cysteine (NAC)',
        category: 'Organ_Support',
        dose: '1200',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 0.25,
        route: 'Oral',
        isAncillary: true,
        notes: 'Basic liver antioxidant support.'
      }
    ]
  },

  // 4. LOW LIVER BURDEN PRE-WORKOUT ANADROL PULSE
  {
    id: 'rec_anadrol_preworkout_pulse',
    name: 'The Pre-Workout Anadrol Pulse: Heavy Leg & Back Specialization',
    subtitle: 'Targeted Power | Low Liver Strain Pulse (4x/Week Workout Days Only)',
    phaseCategory: 'Mass_Accretion',
    goalType: 'Strength & Power Detonator',
    experienceLevel: 'Beginner / First Blast',
    dosageTier: 'Moderate (500-900mg/wk)',
    durationWeeks: 14,
    totalAasWeeklyMg: 750,
    targetWeightProgression: '74 kg → 85 kg (Targeted leg sweep and back width growth)',
    aromatizationLevel: 'Moderate',
    organRiskLevel: 'Mild',
    description:
      'Instead of taking Anadrol every single day, this protocol pulses 50mg Anadrol ONLY on your 4 heaviest training days (e.g. Leg Day AM/PM, Heavy Back, Heavy Bench). Rest days have zero oral intake, keeping liver transaminases almost identical to a pure injectable cycle.',
    rationale:
      'Pulsing Anadrol exclusively pre-workout maximizes the acute strength spike and intramuscular glycogen uptake during mechanical overload, while giving hepatic enzymes 3 full days of rest per week. Allows an 8–10 week run without killing appetite.',
    keyBenefits: [
      'Takes full advantage of Anadrol’s insane pumps without killing your appetite',
      '50% lower total liver transaminase stress compared to daily 17-aa dosing',
      'Targeted mechanical overload for building the signature Classic quad sweep and back lat spread',
      'Ultra affordable: A single bottle of 50mg Anadrol lasts over 2.5 months on this pulse schedule'
    ],
    compounds: [
      {
        name: 'Testosterone Enanthate',
        category: 'AAS',
        dose: '250',
        unit: 'mg',
        frequency: 'Twice Weekly',
        timing: 'AM',
        halfLifeDays: 7.0,
        route: 'Intramuscular',
        notes: 'Total 500 mg/week (Monday / Thursday). Base androgen anchor.'
      },
      {
        name: 'Deca-Durabolin (Nandrolone Decanoate)',
        category: 'AAS',
        dose: '250',
        unit: 'mg',
        frequency: 'Weekly',
        timing: 'AM',
        halfLifeDays: 15.0,
        route: 'Intramuscular',
        notes: 'Total 250 mg/week. Heavy collagen synthesis and joint durability.'
      },
      {
        name: 'Anadrol (Oxymetholone)',
        category: 'AAS',
        dose: '50',
        unit: 'mg',
        frequency: 'As Needed',
        timing: 'Pre-Workout',
        halfLifeDays: 0.35,
        route: 'Oral',
        notes: '50 mg taken 60 mins before Heavy Training sessions ONLY (4x/week max). Rest days = 0mg.'
      },
      {
        name: 'Telmisartan',
        category: 'Organ_Support',
        dose: '40',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 1.0,
        route: 'Oral',
        isAncillary: true,
        notes: 'Keeps resting BP < 125/80 mmHg even with Anadrol acute blood volume expansion.'
      },
      {
        name: 'TUDCA',
        category: 'Organ_Support',
        dose: '500',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'PM',
        halfLifeDays: 0.2,
        route: 'Oral',
        isAncillary: true,
        notes: 'Maintains optimal liver transaminases and bile clearance.'
      }
    ]
  },

  // 5. BUDGET FRIENDLY: UNDER $60/MONTH MASS
  {
    id: 'rec_ultra_budget_mass',
    name: 'The Ultra-Budget Golden Era Mass: Under $60/Month Blueprint',
    subtitle: 'Maximum Dollar-to-Growth Ratio | Test E + Dianabol Classic',
    phaseCategory: 'Mass_Accretion',
    goalType: 'Budget Friendly Mass',
    experienceLevel: 'Beginner / First Blast',
    dosageTier: 'Moderate (500-900mg/wk)',
    durationWeeks: 12,
    totalAasWeeklyMg: 710,
    targetWeightProgression: '74 kg → 83 kg (+9 kg raw muscle on minimal budget)',
    aromatizationLevel: 'Moderate',
    organRiskLevel: 'Mild',
    description:
      'The single most cost-effective bodybuilding cycle ever conceived. Testosterone Enanthate ($30-$35/vial) + Dianabol ($30/bottle). Zero overpriced boutique peptides, zero Primobolan. Pure, unadulterated mass building that built the golden physiques of Venice Beach.',
    rationale:
      'Testosterone at 500mg/wk costs less than a tub of protein powder and produces 90% of maximum muscle protein synthesis. Dianabol at 30mg for the first 5 weeks adds immediate nitrogen retention and gym euphoria.',
    keyBenefits: [
      'Total cycle drug cost under $60–$70/month',
      'Huge muscle belly swelling and strength progression',
      'Straightforward, uncomplicated protocol with minimum injection frequency (2x/wk)',
      'Basic liver and estrogen management included'
    ],
    compounds: [
      {
        name: 'Testosterone Enanthate',
        category: 'AAS',
        dose: '250',
        unit: 'mg',
        frequency: 'Twice Weekly',
        timing: 'AM',
        halfLifeDays: 7.0,
        route: 'Intramuscular',
        notes: 'Total 500 mg/week (250mg Monday / 250mg Thursday). Dirt cheap, reliable mass workhorse.'
      },
      {
        name: 'Dianabol (Methandrostenolone)',
        category: 'AAS',
        dose: '30',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'Divided',
        halfLifeDays: 0.21,
        route: 'Oral',
        notes: '30 mg/day (15mg breakfast / 15mg pre-workout) for Weeks 1–5.'
      },
      {
        name: 'Aromasin (Exemestane)',
        category: 'Ancillary_AI',
        dose: '12.5',
        unit: 'mg',
        frequency: 'EOD',
        timing: 'PM',
        halfLifeDays: 1.1,
        route: 'Oral',
        isAncillary: true,
        notes: 'Controls Dbol water retention.'
      },
      {
        name: 'N-Acetyl Cysteine (NAC)',
        category: 'Organ_Support',
        dose: '1200',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 0.25,
        route: 'Oral',
        isAncillary: true,
        notes: '1200mg daily liver protection.'
      }
    ]
  },

  // 6. GYNO-PROOF & LOW AROMATIZATION
  {
    id: 'rec_gyno_proof_recomp',
    name: 'The Gyno-Proof Clean Bulker: Zero Estrogen Flare',
    subtitle: 'Zero-Bloat Recomp | Masteron + Tbol (Guaranteed Dry)',
    phaseCategory: 'Recomp_Hardening',
    goalType: 'Gyno-Proof & Low Aromatization',
    experienceLevel: 'Intermediate',
    dosageTier: 'Moderate (500-900mg/wk)',
    durationWeeks: 12,
    totalAasWeeklyMg: 790,
    targetWeightProgression: '74 kg → 82 kg (Pristine zero water retention lean tissue)',
    aromatizationLevel: 'Very Low / Anti-Estrogenic',
    organRiskLevel: 'Mild',
    description:
      'Engineered specifically for athletes who are genetically prone to gynecomastia, puffy nipples, or water retention. Replaces aromatizing orals with Turinabol (which cannot aromatize) and utilizes high-ratio Masteron Propionate as a natural anti-estrogenic DHT shield.',
    rationale:
      'Testosterone Propionate is kept conservative at 250mg/wk so aromatization is low. Masteron Propionate at 350mg saturates androgen receptors and blocks estrogen at breast tissue. Turinabol (40mg/day) adds clean, dry, athletic muscle without converting to estrogen or progesterone.',
    keyBenefits: [
      '100% gyno-safe: Turinabol cannot convert to estrogen, Masteron acts as anti-estrogen',
      'Razor-sharp vacuum waistline with zero subcutaneous water holding',
      'Affordable Masteron replaces expensive Primobolan for skin-to-muscle dryness',
      'Noticeable vascularity and muscular definition improvements within 14 days'
    ],
    compounds: [
      {
        name: 'Testosterone Propionate',
        category: 'AAS',
        dose: '85',
        unit: 'mg',
        frequency: 'Mon/Wed/Fri',
        timing: 'AM',
        halfLifeDays: 1.5,
        route: 'Intramuscular',
        notes: 'Total 255 mg/week. Mild baseline androgen driver.'
      },
      {
        name: 'Masteron Propionate (Drostanolone)',
        category: 'AAS',
        dose: '120',
        unit: 'mg',
        frequency: 'Mon/Wed/Fri',
        timing: 'AM',
        halfLifeDays: 1.5,
        route: 'Intramuscular',
        notes: 'Total 360 mg/week. Strong anti-estrogenic DHT receptor saturation.'
      },
      {
        name: 'Turinabol (Oral Chlorodehydromethyltestosterone)',
        category: 'AAS',
        dose: '40',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'Divided',
        halfLifeDays: 0.65,
        route: 'Oral',
        notes: '40 mg/day (20mg AM / 20mg Pre-Workout). 0% aromatization, dry quality gains.'
      },
      {
        name: 'Telmisartan',
        category: 'Organ_Support',
        dose: '20',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 1.0,
        route: 'Oral',
        isAncillary: true,
        notes: 'Cardiovascular protection.'
      },
      {
        name: 'TUDCA',
        category: 'Organ_Support',
        dose: '500',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'PM',
        halfLifeDays: 0.2,
        route: 'Oral',
        isAncillary: true,
        notes: 'Liver protection for Turinabol.'
      }
    ]
  },

  // 7. RAPID 4-WEEK PLATEAU BUSTER (TWIN ORAL SYSTEM)
  {
    id: 'rec_dbol_anadrol_alternating_wave',
    name: 'The Dbol & Anadrol Alternating Wave: Twin Oral Mass Protocol',
    subtitle: 'Phase 1B/2A | 88 kg → 98 kg Breakthrough Plateaus (Pulse System)',
    phaseCategory: 'Mass_Accretion',
    goalType: 'Rapid 4-Week Plateau Buster',
    experienceLevel: 'Advanced',
    dosageTier: 'Heavy (900-1400mg/wk)',
    durationWeeks: 16,
    totalAasWeeklyMg: 1150,
    targetWeightProgression: '88 kg → 98 kg (Consecutive compound growth bursts)',
    aromatizationLevel: 'Moderate',
    organRiskLevel: 'Moderate',
    description:
      'Features both of your favorite compounds in a clinically periodized wave: Dianabol is run in Weeks 1-4 for initial mass and joint hydration, followed by a 4-week oral deload (injectables only) allowing liver transaminases to normalize, followed by Anadrol in Weeks 9-12 for high-density strength and plateau-breaking.',
    rationale:
      'Running two potent 17-aa orals simultaneously is hepatotoxic and blunts appetite. By alternating Dbol (Weeks 1-4) and Anadrol (Weeks 9-12) with a 4-week liver clearance bridge in between, you get the distinct hypertrophy benefits of BOTH compounds while keeping ALT/AST below 50 U/L and maintaining an aggressive 4,200 kcal appetite.',
    keyBenefits: [
      'Experience both Dbol (wet glycogen fullness) AND Anadrol (dense strength power)',
      'Built-in 4-week oral holiday prevents appetite loss and keeps liver enzymes healthy',
      'Test Enanthate (500mg) and NPP (300mg) provide continuous tissue growth throughout',
      'No expensive Primobolan needed; exceptional cost-to-growth ratio'
    ],
    compounds: [
      {
        name: 'Testosterone Enanthate',
        category: 'AAS',
        dose: '250',
        unit: 'mg',
        frequency: 'Twice Weekly',
        timing: 'AM',
        halfLifeDays: 7.0,
        route: 'Intramuscular',
        notes: 'Total 500 mg/week (Monday / Thursday). Base anabolic driver for all 16 weeks.'
      },
      {
        name: 'NPP (Nandrolone Phenylpropionate)',
        category: 'AAS',
        dose: '100',
        unit: 'mg',
        frequency: 'Mon/Wed/Fri',
        timing: 'AM',
        halfLifeDays: 4.5,
        route: 'Intramuscular',
        notes: 'Total 300 mg/week (100mg Mon/Wed/Fri). Rapid clearance nandrolone for massive collagen and fullness.'
      },
      {
        name: 'Dianabol (Methandrostenolone)',
        category: 'AAS',
        dose: '30',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'Divided',
        halfLifeDays: 0.21,
        route: 'Oral',
        notes: 'Weeks 1 to 4 ONLY (15mg AM / 15mg Pre-Workout). Initial massive water & glycogen surge.'
      },
      {
        name: 'Anadrol (Oxymetholone)',
        category: 'AAS',
        dose: '50',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'Pre-Workout',
        halfLifeDays: 0.35,
        route: 'Oral',
        notes: 'Weeks 9 to 12 ONLY (50mg 1 hour pre-workout). Heavy strength wave after oral deload.'
      },
      {
        name: 'Aromasin (Exemestane)',
        category: 'Ancillary_AI',
        dose: '12.5',
        unit: 'mg',
        frequency: 'As Needed',
        timing: 'PM',
        halfLifeDays: 1.1,
        route: 'Oral',
        isAncillary: true,
        notes: 'Take 12.5mg during Dbol weeks (1-4) if estradiol water retention or sensitive nipples appear.'
      },
      {
        name: 'Cabergoline (Dostinex)',
        category: 'Ancillary_AI',
        dose: '0.25',
        unit: 'mg',
        frequency: 'Twice Weekly',
        timing: 'Pre-Bed',
        halfLifeDays: 2.7,
        route: 'Oral',
        isAncillary: true,
        notes: 'Controls prolactin from NPP throughout the cycle.'
      },
      {
        name: 'TUDCA',
        category: 'Organ_Support',
        dose: '750',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'PM',
        halfLifeDays: 0.2,
        route: 'Oral',
        isAncillary: true,
        notes: 'Continuous liver cell membrane safeguard. Increase to 750mg during oral weeks.'
      },
      {
        name: 'Telmisartan',
        category: 'Organ_Support',
        dose: '40',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 1.0,
        route: 'Oral',
        isAncillary: true,
        notes: 'Maintains healthy systolic blood pressure and renal filtration under heavy oral load.'
      }
    ]
  },

  // 8. JOINT SHIELD & CONNECTIVE REPAIR
  {
    id: 'rec_joint_shield_repair',
    name: 'Heavyweight Collagen Armor & Joint Restoration',
    subtitle: 'Connective Tissue Recovery | Test + Deca + BPC-157 Healing Stack',
    phaseCategory: 'Mass_Accretion',
    goalType: 'Joint Shield & Connective Repair',
    experienceLevel: 'Intermediate',
    dosageTier: 'Moderate (500-900mg/wk)',
    durationWeeks: 16,
    totalAasWeeklyMg: 850,
    targetWeightProgression: 'Heavy PR Overload with Zero Tendon/Elbow Pain',
    aromatizationLevel: 'Moderate',
    organRiskLevel: 'Mild',
    description:
      'Engineered for athletes lifting heavy 500+ lb squats and 365+ lb bench presses who suffer from patellar tendonitis, shoulder impingement, or elbow flare-ups. Combines the immense Type I and III collagen synthesis of Nandrolone Decanoate with peptide healing (BPC-157).',
    rationale:
      'Deca-Durabolin increases systemic collagen synthesis by over 250% and dramatically increases joint synovial fluid retention. BPC-157 directly accelerates the angiogenic healing of micro-tears in tendons and joint capsules.',
    keyBenefits: [
      'Eliminates chronic elbow, knee, and shoulder aches within 21 days',
      'Massive muscle fullness and positive nitrogen balance from Deca',
      'BPC-157 repairs gut lining and accelerates microvascular tendon repair',
      'Zero oral liver strain; completely injectable protocol'
    ],
    compounds: [
      {
        name: 'Testosterone Enanthate',
        category: 'AAS',
        dose: '225',
        unit: 'mg',
        frequency: 'Twice Weekly',
        timing: 'AM',
        halfLifeDays: 7.0,
        route: 'Intramuscular',
        notes: 'Total 450 mg/week. Solid anabolic baseline.'
      },
      {
        name: 'Deca-Durabolin (Nandrolone Decanoate)',
        category: 'AAS',
        dose: '200',
        unit: 'mg',
        frequency: 'Twice Weekly',
        timing: 'AM',
        halfLifeDays: 15.0,
        route: 'Intramuscular',
        notes: 'Total 400 mg/week. Maximum synovial joint cushioning and connective tissue density.'
      },
      {
        name: 'BPC-157',
        category: 'Organ_Support',
        dose: '500',
        unit: 'mcg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 0.1,
        route: 'Subcutaneous',
        notes: 'Body Protection Compound. Injected subQ near injured tendon or abdomen daily.'
      },
      {
        name: 'Cabergoline (Dostinex)',
        category: 'Ancillary_AI',
        dose: '0.25',
        unit: 'mg',
        frequency: 'Twice Weekly',
        timing: 'Pre-Bed',
        halfLifeDays: 2.7,
        route: 'Oral',
        isAncillary: true,
        notes: 'Controls Deca prolactin.'
      },
      {
        name: 'Telmisartan',
        category: 'Organ_Support',
        dose: '40',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 1.0,
        route: 'Oral',
        isAncillary: true,
        notes: 'Blood pressure maintenance.'
      }
    ]
  },

  // 9. LEAN RECOMP & 3D HARDENING
  {
    id: 'rec_golden_era_density_masteron',
    name: 'The 3D Classic Density Sculptor: Test + Masteron + Dbol Pulse',
    subtitle: 'Phase 2A | 95 kg → 103 kg Cap Polish (Zero Primo / Affordable Hardening)',
    phaseCategory: 'Recomp_Hardening',
    goalType: 'Lean Recomp & 3D Hardening',
    experienceLevel: 'Advanced',
    dosageTier: 'Heavy (900-1400mg/wk)',
    durationWeeks: 14,
    totalAasWeeklyMg: 1050,
    targetWeightProgression: '95 kg → 103 kg (Hovering right at the 6\'0" IFBB limit with 3D grain)',
    aromatizationLevel: 'Low',
    organRiskLevel: 'Moderate',
    description:
      'Replaces expensive Primobolan with Masteron Propionate as the high-affinity DHT hardener, paired with short-ester Test Propionate and low-dose Dianabol (20mg pre-workout) to maintain fullness without spilling over. Carves out 3D delt striations and vacuum waistline.',
    rationale:
      'Masteron Propionate at 400mg delivers the same anti-estrogenic receptor blockade and graininess as Primobolan at 1/3 of the cost. Using 20mg Dianabol strictly pre-workout keeps intramuscular glycogen high while Masteron prevents any subcutaneous water retention.',
    keyBenefits: [
      'Masteron provides rock-hard 3D aesthetic at a fraction of Primobolan price',
      'Low-dose Dbol pre-workout maintains skin-splitting muscle bellies',
      'Test Propionate allows rapid clearance and acute water modulation',
      'Maintains tight vacuum midsection while filling frame to 103 kg cap'
    ],
    compounds: [
      {
        name: 'Testosterone Propionate',
        category: 'AAS',
        dose: '120',
        unit: 'mg',
        frequency: 'Mon/Wed/Fri',
        timing: 'AM',
        halfLifeDays: 1.5,
        route: 'Intramuscular',
        notes: 'Total 360 mg/week (120mg Mon/Wed/Fri). Rapid short ester, zero water bloat.'
      },
      {
        name: 'Masteron Propionate (Drostanolone)',
        category: 'AAS',
        dose: '135',
        unit: 'mg',
        frequency: 'Mon/Wed/Fri',
        timing: 'AM',
        halfLifeDays: 1.5,
        route: 'Intramuscular',
        notes: 'Total 405 mg/week (135mg Mon/Wed/Fri). Cosmetic hardening and anti-estrogenic DHT.'
      },
      {
        name: 'Dianabol (Methandrostenolone)',
        category: 'AAS',
        dose: '20',
        unit: 'mg',
        frequency: 'As Needed',
        timing: 'Pre-Workout',
        halfLifeDays: 0.21,
        route: 'Oral',
        notes: '20 mg taken 45 mins Pre-Workout only. Keeps muscle bellies round and full while Masteron keeps skin dry.'
      },
      {
        name: 'Telmisartan',
        category: 'Organ_Support',
        dose: '40',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 1.0,
        route: 'Oral',
        isAncillary: true,
        notes: 'Cardioprotection and blood pressure stabilization.'
      },
      {
        name: 'Citrus Bergamot',
        category: 'Organ_Support',
        dose: '1000',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 0.5,
        route: 'Oral',
        isAncillary: true,
        notes: 'Preserves HDL/LDL lipid balance against Masteron DHT suppression.'
      },
      {
        name: 'TUDCA',
        category: 'Organ_Support',
        dose: '500',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'PM',
        halfLifeDays: 0.2,
        route: 'Oral',
        isAncillary: true,
        notes: 'Hepatic bile canaliculi maintenance.'
      }
    ]
  },

  // 10. CONTEST PREP CONDITIONING & GLUTE STRIATIONS
  {
    id: 'rec_olympian_prep_anadrol_shred',
    name: 'The Olympian Stage Conditioning & Anadrol Fullness Protocol',
    subtitle: 'Final Contest Prep | 8-12 Weeks Out (Dry Glutes with Maximum Fullness)',
    phaseCategory: 'Contest_Prep',
    goalType: 'Contest Prep Conditioning',
    experienceLevel: 'Elite / Olympian',
    dosageTier: 'Extreme (>1400mg/wk)',
    durationWeeks: 12,
    totalAasWeeklyMg: 1480,
    targetWeightProgression: 'Stage ready 103 kg @ 3.8-4.2% Bodyfat (Striated Glutes & Full Bellies)',
    aromatizationLevel: 'Zero/Anti-Estrogenic',
    organRiskLevel: 'Strict Monitoring Required',
    description:
      'Championship prep protocol. Uses low-dose Test Propionate, Masteron Propionate, and Trenbolone Acetate for maximum conditioning, with Anadrol (50mg/day) introduced in the final 3-4 weeks to push intramuscular glycogen to the absolute limit without spilling over (Anadrol fullness secret of top Olympians).',
    rationale:
      'Many competitors look flat on stage because they cut all orals and rely only on Tren/Masteron. Introducing Anadrol in the final 3-4 weeks under a strict sub-6% deficit pulls intracellular water directly INTO the muscle cells, creating an explosive 3D look while glutes stay fully striated.',
    keyBenefits: [
      'Combats the dreaded "flat look" on stage by driving cellular glycogen hyper-hydration',
      'Masteron and Trenbolone Acetate guarantee paper-thin skin and striated hamstrings',
      'Anadrol drives extreme vascularity under stage lighting',
      'Zero expensive Primobolan; highest cosmetic impact per dollar'
    ],
    compounds: [
      {
        name: 'Testosterone Propionate',
        category: 'AAS',
        dose: '50',
        unit: 'mg',
        frequency: 'Mon/Wed/Fri',
        timing: 'AM',
        halfLifeDays: 1.5,
        route: 'Intramuscular',
        notes: 'Total 150 mg/week. Minimal anti-catabolic androgen base to avoid any extracellular water.'
      },
      {
        name: 'Masteron Propionate (Drostanolone)',
        category: 'AAS',
        dose: '150',
        unit: 'mg',
        frequency: 'Mon/Wed/Fri',
        timing: 'AM',
        halfLifeDays: 1.5,
        route: 'Intramuscular',
        notes: 'Total 450 mg/week. Maximum cosmetic density and anti-estrogen drying.'
      },
      {
        name: 'Trenbolone Acetate',
        category: 'AAS',
        dose: '70',
        unit: 'mg',
        frequency: 'Mon/Wed/Fri',
        timing: 'AM',
        halfLifeDays: 1.0,
        route: 'Intramuscular',
        notes: 'Total 210 mg/week. The premier nutrient partitioner and muscle hardener in existence.'
      },
      {
        name: 'Anadrol (Oxymetholone)',
        category: 'AAS',
        dose: '50',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'Divided',
        halfLifeDays: 0.35,
        route: 'Oral',
        notes: '50 mg/day (25mg AM / 25mg Pre-Workout). Final 3-4 weeks only. The Olympian secret for round 3D bellies under 4% bodyfat.'
      },
      {
        name: 'Winstrol (Stanozolol)',
        category: 'AAS',
        dose: '40',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'Divided',
        halfLifeDays: 0.38,
        route: 'Oral',
        notes: '40 mg/day oral. Final 3 weeks only. Strips final traces of subcutaneous water.'
      },
      {
        name: 'Clenbuterol',
        category: 'Thyroid_FatBurner',
        dose: '40',
        unit: 'mcg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 1.5,
        route: 'Oral',
        notes: '40 mcg/day AM fasted. Beta-2 agonist fat incinerator. Cycle 2 weeks on / 2 weeks off.'
      },
      {
        name: 'T3 (Liothyronine Sodium)',
        category: 'Thyroid_FatBurner',
        dose: '25',
        unit: 'mcg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 1.0,
        route: 'Oral',
        notes: '25 mcg upon waking. Restores metabolic rate during heavy contest dieting.'
      },
      {
        name: 'Cabergoline (Dostinex)',
        category: 'Ancillary_AI',
        dose: '0.25',
        unit: 'mg',
        frequency: 'Twice Weekly',
        timing: 'Pre-Bed',
        halfLifeDays: 2.7,
        route: 'Oral',
        isAncillary: true,
        notes: 'Essential prolactin control for Trenbolone Acetate.'
      },
      {
        name: 'TUDCA',
        category: 'Organ_Support',
        dose: '750',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'PM',
        halfLifeDays: 0.2,
        route: 'Oral',
        isAncillary: true,
        notes: 'Mandatory liver bile protection during final oral phase.'
      },
      {
        name: 'Telmisartan',
        category: 'Organ_Support',
        dose: '40',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 1.0,
        route: 'Oral',
        isAncillary: true,
        notes: 'Continuous renal and cardiovascular protection.'
      }
    ]
  },

  // 11. "CARBS ARE GOD" HIGH-GLYCOGEN HYPERTROPHY SURGE
  {
    id: 'rec_carbs_are_god_surge',
    name: 'The "Carbs Are God" High-Glycogen Mass Accelerator',
    subtitle: 'High Food Surge | 680g–750g Carbs Fueling Double Daily Sessions',
    phaseCategory: 'Mass_Accretion',
    goalType: 'Raw Mass & Size',
    experienceLevel: 'Advanced',
    dosageTier: 'Heavy (900-1400mg/wk)',
    durationWeeks: 16,
    totalAasWeeklyMg: 1250,
    targetWeightProgression: '74 kg → 88 kg (+14 kg rapid glycogen & contractile tissue)',
    aromatizationLevel: 'Moderate',
    organRiskLevel: 'Moderate',
    description:
      'Engineered specifically to harness your 680g+ daily carbohydrate intake and 4x frequency AM/PM double sessions. Combines 600mg Test Cypionate and 400mg Deca with 35mg Dianabol and daily rhGH to push muscle cell volume and satellite cell proliferation to the physiological maximum.',
    rationale:
      'Flooding muscle fibers with 680g of carbohydrates while on Dbol and rhGH triggers massive intracellular hyper-hydration. rhGH mobilizes fatty acids for energy while Dbol and insulin partition every gram of glucose straight into skeletal muscle GLUT4 receptors.',
    keyBenefits: [
      'Unstoppable energy and skin-splitting pumps in both AM and PM sessions',
      'Rapid weight gain (+14 kg in 16 weeks) without accumulating abdominal fat',
      'rhGH protects tendons and enhances nutrient partitioning',
      'Full cardiovascular support: Telmisartan 80mg keeps BP normal under heavy glycogen loads'
    ],
    compounds: [
      {
        name: 'Testosterone Cypionate',
        category: 'AAS',
        dose: '300',
        unit: 'mg',
        frequency: 'Twice Weekly',
        timing: 'AM',
        halfLifeDays: 8.0,
        route: 'Intramuscular',
        notes: 'Total 600 mg/week (300mg Mon / 300mg Thu). Strong supraphysiological mass base.'
      },
      {
        name: 'Deca-Durabolin (Nandrolone Decanoate)',
        category: 'AAS',
        dose: '200',
        unit: 'mg',
        frequency: 'Twice Weekly',
        timing: 'AM',
        halfLifeDays: 15.0,
        route: 'Intramuscular',
        notes: 'Total 400 mg/week. Maximum nitrogen balance and joint cushioning.'
      },
      {
        name: 'Dianabol (Methandrostenolone)',
        category: 'AAS',
        dose: '35',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'Divided',
        halfLifeDays: 0.21,
        route: 'Oral',
        notes: '35 mg/day (15mg with Breakfast / 20mg Pre-Workout). Glycogen supercompensation driver.'
      },
      {
        name: 'rhGH Somatropin',
        category: 'GH_Secretagogue',
        dose: '4.0',
        unit: 'IU',
        frequency: 'Every Day',
        timing: 'Divided',
        halfLifeDays: 0.15,
        route: 'Subcutaneous',
        notes: '2.0 IU AM fasted upon waking + 2.0 IU post-PM workout with high-carb meal.'
      },
      {
        name: 'Aromasin (Exemestane)',
        category: 'Ancillary_AI',
        dose: '12.5',
        unit: 'mg',
        frequency: 'EOD',
        timing: 'PM',
        halfLifeDays: 1.1,
        route: 'Oral',
        isAncillary: true,
        notes: '12.5mg every other day to control Dbol 17α-methyl-estradiol.'
      },
      {
        name: 'Telmisartan',
        category: 'Organ_Support',
        dose: '80',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 1.0,
        route: 'Oral',
        isAncillary: true,
        notes: '80mg AM. Strong blood pressure and renal protection under heavy high-carb mass load.'
      },
      {
        name: 'TUDCA',
        category: 'Organ_Support',
        dose: '500',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'PM',
        halfLifeDays: 0.2,
        route: 'Oral',
        isAncillary: true,
        notes: 'Liver bile protection.'
      }
    ]
  },

  // 12. RESTORATIVE HEALTH CRUISE & BIOMARKER DETOX
  {
    id: 'rec_post_oral_health_cruise',
    name: 'The Restorative Health Cruise & Biomarker Detox Bridge',
    subtitle: 'Inter-Phase Bridge | AST/ALT & Lipid Restoration',
    phaseCategory: 'Health_Cruise',
    goalType: 'Health Restoration & Cruise',
    experienceLevel: 'Beginner / First Blast',
    dosageTier: 'Low (<500mg/wk)',
    durationWeeks: 8,
    totalAasWeeklyMg: 140,
    targetWeightProgression: 'Tissue Consolidation (Hold 86-96 kg with Zero Loss)',
    aromatizationLevel: 'Physiological',
    organRiskLevel: 'Minimal',
    description:
      'The mandatory health recovery protocol following heavy Dbol or Anadrol mass blasts. Clears 17-aa oral stress, normalizes liver transaminases (AST/ALT < 30 U/L), restores HDL cholesterol, resensitizes androgen receptors, and locks in every gram of new muscle mass.',
    rationale:
      'True replacement Testosterone Enanthate at 140mg/week (70mg 2x/wk) preserves all acquired contractile tissue with zero cardiovascular strain. Clinical doses of TUDCA, NAC, and Citrus Bergamot rapidly detoxify hepatocytes and optimize vascular endothelial health.',
    keyBenefits: [
      'Normalizes liver enzymes (AST/ALT) back into safe clinical range (< 35 U/L)',
      'Restores HDL > 45 mg/dL after oral suppression',
      'Normalizes blood pressure to < 120/80 mmHg with Telmisartan',
      'Resensitizes androgen receptors for explosive growth on the next blast'
    ],
    compounds: [
      {
        name: 'Testosterone Enanthate',
        category: 'AAS',
        dose: '70',
        unit: 'mg',
        frequency: 'Twice Weekly',
        timing: 'AM',
        halfLifeDays: 7.0,
        route: 'Intramuscular',
        notes: 'Total 140 mg/week (70mg Monday / 70mg Thursday). Physiological TRT cruise level.'
      },
      {
        name: 'TUDCA',
        category: 'Organ_Support',
        dose: '500',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'PM',
        halfLifeDays: 0.2,
        route: 'Oral',
        isAncillary: true,
        notes: 'Cleanses hepatic bile canaliculi and reverses any subclinical cholestasis from orals.'
      },
      {
        name: 'N-Acetyl Cysteine (NAC)',
        category: 'Organ_Support',
        dose: '1800',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'Divided',
        halfLifeDays: 0.25,
        route: 'Oral',
        isAncillary: true,
        notes: '1800mg/day (900mg AM / 900mg PM). Replenishes liver glutathione pools.'
      },
      {
        name: 'Citrus Bergamot',
        category: 'Organ_Support',
        dose: '1000',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 0.5,
        route: 'Oral',
        isAncillary: true,
        notes: 'Restores HDL and lowers oxidized LDL back to optimal ranges.'
      },
      {
        name: 'Telmisartan',
        category: 'Organ_Support',
        dose: '20',
        unit: 'mg',
        frequency: 'Every Day',
        timing: 'AM',
        halfLifeDays: 1.0,
        route: 'Oral',
        isAncillary: true,
        notes: 'Renal and cardiac maintenance dose.'
      }
    ]
  }
];
