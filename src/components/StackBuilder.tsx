import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StackRecommendation, StackRecommendationCompound, Compound, PedLibraryItem } from '../types';
import { 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  Zap, 
  Plus, 
  Trash2, 
  ArrowRight, 
  Syringe, 
  HeartPulse, 
  Info, 
  Sliders, 
  Check, 
  RotateCcw,
  CheckCircle,
  ExternalLink,
  HelpCircle,
  Search,
  Pill,
  DollarSign,
  X,
  Target,
  Award,
  Filter,
  Clock
} from 'lucide-react';

export const StackBuilder: React.FC = () => {
  const { 
    stackRecommendations, 
    deployStackRecommendation, 
    pedLibrary, 
    addCompound,
    compounds: activeCompounds 
  } = useApp();

  // Mode: 'recommendations' or 'sandbox'
  const [builderMode, setBuilderMode] = useState<'recommendations' | 'sandbox'>('recommendations');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGoal, setSelectedGoal] = useState<string>('All');
  const [selectedExperience, setSelectedExperience] = useState<string>('All');
  const [selectedDosageTier, setSelectedDosageTier] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickFilter, setQuickFilter] = useState<'all' | 'dbol' | 'anadrol' | 'budget' | 'beginner' | 'gynosafe'>('all');
  const [selectedRec, setSelectedRec] = useState<StackRecommendation | null>(stackRecommendations[0] || null);
  const [deployNotification, setDeployNotification] = useState<string | null>(null);
  const [isOralGuideOpen, setIsOralGuideOpen] = useState(false);

  // Deploy modal state
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [replaceExisting, setReplaceExisting] = useState(true);
  const [stackToDeploy, setStackToDeploy] = useState<StackRecommendation | null>(null);

  // Sandbox State
  const [sandboxName, setSandboxName] = useState('My Custom Hypertrophy Protocol');
  const [sandboxCompounds, setSandboxCompounds] = useState<StackRecommendationCompound[]>(() => {
    // Default to the first recommendation compounds for convenience
    return stackRecommendations[0]?.compounds || [];
  });
  const [librarySearch, setLibrarySearch] = useState('');
  const [selectedLibraryAdd, setSelectedLibraryAdd] = useState<string>('');

  // Categories filter
  const categories = [
    { id: 'All', label: 'All Phases' },
    { id: 'Mass_Accretion', label: 'Mass Accretion (74-95kg)' },
    { id: 'Recomp_Hardening', label: 'Recomp & Density (95-103kg)' },
    { id: 'Contest_Prep', label: 'Contest Prep Shred' },
    { id: 'Health_Cruise', label: 'Health Cruise / Deload' }
  ];

  // Distinct Filter Options
  const goalOptions = [
    { id: 'All', label: 'All Target Goals' },
    { id: 'Raw Mass & Size', label: 'Raw Mass & Size' },
    { id: 'Strength & Power Detonator', label: 'Strength & Power Detonator' },
    { id: 'Lean Recomp & 3D Hardening', label: 'Lean Recomp & Hardening' },
    { id: 'Contest Prep Conditioning', label: 'Contest Prep Conditioning' },
    { id: 'Budget Friendly Mass', label: 'Budget-Friendly Mass' },
    { id: 'Gyno-Proof & Low Aromatization', label: 'Gyno-Proof Low Aromatization' },
    { id: 'Rapid 4-Week Plateau Buster', label: '4-Week Plateau Buster' },
    { id: 'Joint Shield & Connective Repair', label: 'Joint Shield & Repair' },
    { id: 'Health Restoration & Cruise', label: 'Health Restoration & Cruise' }
  ];

  const experienceOptions = [
    { id: 'All', label: 'All Experience Levels' },
    { id: 'Beginner / First Blast', label: 'Beginner / First Blast' },
    { id: 'Intermediate', label: 'Intermediate' },
    { id: 'Advanced', label: 'Advanced' },
    { id: 'Elite / Olympian', label: 'Elite / Olympian' }
  ];

  const dosageOptions = [
    { id: 'All', label: 'All Dosage Tiers' },
    { id: 'Low (<500mg/wk)', label: 'Low (<500 mg/wk)' },
    { id: 'Moderate (500-900mg/wk)', label: 'Moderate (500-900 mg/wk)' },
    { id: 'Heavy (900-1400mg/wk)', label: 'Heavy (900-1400 mg/wk)' },
    { id: 'Extreme (>1400mg/wk)', label: 'Extreme (>1400 mg/wk)' }
  ];

  // Comprehensive multi-dimensional filtering
  const filteredRecommendations = stackRecommendations.filter(rec => {
    // Category filter
    if (selectedCategory !== 'All' && rec.phaseCategory !== selectedCategory) {
      return false;
    }
    // Goal filter
    if (selectedGoal !== 'All' && rec.goalType !== selectedGoal) {
      return false;
    }
    // Experience level filter
    if (selectedExperience !== 'All' && rec.experienceLevel !== selectedExperience) {
      return false;
    }
    // Dosage tier filter
    if (selectedDosageTier !== 'All' && rec.dosageTier !== selectedDosageTier) {
      return false;
    }
    // Quick filter presets
    if (quickFilter === 'dbol') {
      const hasDbol = rec.compounds.some(c => c.name.toLowerCase().includes('dianabol') || c.name.toLowerCase().includes('dbol'));
      if (!hasDbol) return false;
    } else if (quickFilter === 'anadrol') {
      const hasAnadrol = rec.compounds.some(c => c.name.toLowerCase().includes('anadrol') || c.name.toLowerCase().includes('oxymetholone'));
      if (!hasAnadrol) return false;
    } else if (quickFilter === 'budget') {
      if (rec.goalType !== 'Budget Friendly Mass' && !rec.name.toLowerCase().includes('budget') && !rec.subtitle.toLowerCase().includes('budget')) {
        return false;
      }
    } else if (quickFilter === 'beginner') {
      if (rec.experienceLevel !== 'Beginner / First Blast') return false;
    } else if (quickFilter === 'gynosafe') {
      if (rec.aromatizationLevel === 'Heavy' && !rec.compounds.some(c => c.isAncillary && c.name.toLowerCase().includes('aromasin'))) {
        return false;
      }
      if (!rec.name.toLowerCase().includes('gyno') && rec.goalType !== 'Gyno-Proof & Low Aromatization' && rec.aromatizationLevel !== 'Low' && rec.aromatizationLevel !== 'Negligible') {
        return false;
      }
    }

    // Text search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = rec.name.toLowerCase().includes(q);
      const matchSub = rec.subtitle.toLowerCase().includes(q);
      const matchDesc = rec.description.toLowerCase().includes(q);
      const matchGoal = rec.goalType?.toLowerCase().includes(q);
      const matchRationale = rec.rationale.toLowerCase().includes(q);
      const matchTarget = rec.targetWeightProgression.toLowerCase().includes(q);
      const matchCompounds = rec.compounds.some(c => c.name.toLowerCase().includes(q) || c.notes.toLowerCase().includes(q));
      const matchBenefits = rec.keyBenefits.some(b => b.toLowerCase().includes(q));
      if (!matchName && !matchSub && !matchDesc && !matchGoal && !matchRationale && !matchTarget && !matchCompounds && !matchBenefits) {
        return false;
      }
    }

    return true;
  });

  const hasActiveFilters = selectedCategory !== 'All' || selectedGoal !== 'All' || selectedExperience !== 'All' || selectedDosageTier !== 'All' || searchQuery.trim() !== '' || quickFilter !== 'all';

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedGoal('All');
    setSelectedExperience('All');
    setSelectedDosageTier('All');
    setSearchQuery('');
    setQuickFilter('all');
  };

  // Trigger deploy confirmation
  const handleOpenDeploy = (rec: StackRecommendation) => {
    setStackToDeploy(rec);
    setIsDeployModalOpen(true);
  };

  const handleConfirmDeploy = () => {
    if (!stackToDeploy) return;
    deployStackRecommendation(stackToDeploy, replaceExisting);
    setIsDeployModalOpen(false);
    setDeployNotification(`Successfully deployed "${stackToDeploy.name}" to your active cycle!`);
    setTimeout(() => setDeployNotification(null), 4000);
  };

  // Load a recommendation into Sandbox for custom tweaking
  const handleLoadIntoSandbox = (rec: StackRecommendation) => {
    setSandboxName(`Customized: ${rec.name}`);
    setSandboxCompounds(JSON.parse(JSON.stringify(rec.compounds)));
    setBuilderMode('sandbox');
  };

  // Sandbox: Add compound from PED Library
  const handleAddFromLibraryToSandbox = (item: PedLibraryItem) => {
    const newComp: StackRecommendationCompound = {
      name: item.name,
      category: item.mappedCategory,
      dose: item.defaultDoseNumber,
      unit: item.unit,
      frequency: item.typicalFrequency,
      timing: item.defaultTiming,
      halfLifeDays: item.halfLifeDays,
      route: item.route,
      notes: `${item.chemicalName}. ${item.classicPhysiqueUtility}`,
      isAncillary: item.mappedCategory === 'Organ_Support' || item.mappedCategory === 'Ancillary_AI'
    };
    setSandboxCompounds(prev => [...prev, newComp]);
    setSelectedLibraryAdd('');
  };

  // Sandbox: Remove compound
  const handleRemoveFromSandbox = (index: number) => {
    setSandboxCompounds(prev => prev.filter((_, i) => i !== index));
  };

  // Sandbox: Update compound field
  const handleUpdateSandboxCompound = (index: number, field: keyof StackRecommendationCompound, value: any) => {
    setSandboxCompounds(prev => prev.map((c, i) => i === index ? { ...c, [field]: value } : c));
  };

  // Sandbox: Deploy custom stack to active cycle
  const handleDeploySandbox = () => {
    if (sandboxCompounds.length === 0) return;
    const customRec: StackRecommendation = {
      id: `custom_${Date.now()}`,
      name: sandboxName || 'Custom Built Protocol',
      subtitle: `${sandboxCompounds.length} Compounds Active`,
      phaseCategory: 'Mass_Accretion',
      goalType: 'Raw Mass & Size',
      experienceLevel: 'Intermediate',
      dosageTier: totalSandboxAasMg < 500 
        ? 'Low (<500mg/wk)' 
        : totalSandboxAasMg <= 900 
        ? 'Moderate (500-900mg/wk)' 
        : totalSandboxAasMg <= 1400 
        ? 'Heavy (900-1400mg/wk)' 
        : 'Extreme (>1400mg/wk)',
      durationWeeks: 16,
      totalAasWeeklyMg: totalSandboxAasMg,
      description: 'Custom athlete-engineered protocol from the Stack Builder Sandbox.',
      rationale: 'Individually tailored androgen, growth hormone, and organ armor array.',
      targetWeightProgression: 'Targeting 6\'0" 103 kg IFBB Classic Cap',
      aromatizationLevel: hasAiOrDht ? 'Low' : 'Moderate',
      organRiskLevel: hasOrganProtection ? 'Mild' : 'Moderate',
      keyBenefits: ['Customized androgen to GH ratios', 'Individualized dosing and route selection'],
      compounds: sandboxCompounds
    };

    deployStackRecommendation(customRec, replaceExisting);
    setDeployNotification(`Successfully deployed "${customRec.name}" to your active cycle!`);
    setTimeout(() => setDeployNotification(null), 4000);
  };

  // --- Live Sandbox Telemetry Calculations ---
  const calculateWeeklyDoseMg = (comp: StackRecommendationCompound): number => {
    if (comp.unit !== 'mg' || comp.category !== 'AAS') return 0;
    const doseNum = parseFloat(comp.dose) || 0;
    switch (comp.frequency) {
      case 'Every Day': return doseNum * 7;
      case 'EOD': return doseNum * 3.5;
      case 'Mon/Wed/Fri': return doseNum * 3;
      case 'Twice Weekly': return doseNum * 2;
      case 'Weekly': return doseNum * 1;
      default: return doseNum;
    }
  };

  const totalSandboxAasMg = Math.round(
    sandboxCompounds.reduce((acc, c) => acc + calculateWeeklyDoseMg(c), 0)
  );

  // Safety Intelligence checks
  const has19Nor = sandboxCompounds.some(c => 
    c.name.toLowerCase().includes('nandrolone') || 
    c.name.toLowerCase().includes('npp') || 
    c.name.toLowerCase().includes('deca') || 
    c.name.toLowerCase().includes('tren') ||
    c.name.toLowerCase().includes('trestolone') ||
    c.name.toLowerCase().includes('ment')
  );

  const hasCaber = sandboxCompounds.some(c => 
    c.name.toLowerCase().includes('caber') || 
    c.name.toLowerCase().includes('dostinex')
  );

  const hasOral17aa = sandboxCompounds.some(c => 
    c.name.toLowerCase().includes('anadrol') || 
    c.name.toLowerCase().includes('dianabol') || 
    c.name.toLowerCase().includes('winstrol') || 
    c.name.toLowerCase().includes('superdrol') ||
    c.name.toLowerCase().includes('anavar') ||
    c.name.toLowerCase().includes('turinabol')
  );

  const hasLiverShield = sandboxCompounds.some(c => 
    c.name.toLowerCase().includes('tudca') || 
    c.name.toLowerCase().includes('nac')
  );

  const hasHighTest = sandboxCompounds.some(c => 
    c.name.toLowerCase().includes('testosterone') && calculateWeeklyDoseMg(c) >= 300
  );

  const hasAiOrDht = sandboxCompounds.some(c => 
    c.name.toLowerCase().includes('aromasin') || 
    c.name.toLowerCase().includes('arimidex') || 
    c.name.toLowerCase().includes('primo') || 
    c.name.toLowerCase().includes('masteron') ||
    c.name.toLowerCase().includes('nolvadex')
  );

  const hasTelmisartan = sandboxCompounds.some(c => 
    c.name.toLowerCase().includes('telmisartan')
  );

  const hasOrganProtection = sandboxCompounds.some(c => c.category === 'Organ_Support');

  // Quick auto-add ancillary
  const handleQuickAddAncillary = (ancillaryName: string) => {
    const item = pedLibrary.find(p => p.name.toLowerCase().includes(ancillaryName.toLowerCase()));
    if (item) {
      handleAddFromLibraryToSandbox(item);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="card-gloss rounded-2xl p-6 border border-slate-800 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-gradient-to-br from-cyan-500/10 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              CLINICAL PROTOCOL STACK ARCHITECT
            </div>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white uppercase">
              STACK BUILDER & EXPERT RECOMMENDATIONS
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed mt-1">
              Select scientifically periodized stack recommendations designed specifically for the 6'0" 103 kg Classic Physique division limit, or engineer your own custom protocol with real-time pharmacological safety telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsOralGuideOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 text-xs font-bold flex items-center gap-1.5 transition-colors border border-purple-500/30 shadow-sm"
              title="View Anadrol & Dianabol Clinical Mastery & Harm Reduction Blueprint"
            >
              <Pill className="w-3.5 h-3.5 text-purple-400" />
              Anadrol & Dbol Blueprint
            </button>
            <button
              onClick={() => setBuilderMode('recommendations')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                builderMode === 'recommendations'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Curated Recommendations ({stackRecommendations.length})
            </button>
            <button
              onClick={() => setBuilderMode('sandbox')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                builderMode === 'sandbox'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Custom Stack Sandbox
            </button>
          </div>
        </div>

        {/* Deploy Notification Banner */}
        {deployNotification && (
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-lg shadow-emerald-950/50">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{deployNotification}</span>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODE 1: CURATED STACK RECOMMENDATIONS                      */}
      {/* ========================================================= */}
      {builderMode === 'recommendations' && (
        <div className="space-y-6">
          {/* Search & Multi-Filter Control Deck */}
          <div className="card-gloss rounded-2xl p-4 border border-slate-800 space-y-4">
            {/* Search Bar + Result Counter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search 12 protocols (e.g. Dianabol, Anadrol, Deca, Joint, Gyno, Arnold, Budget)..."
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/70"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-300 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                  Showing <span className="text-amber-400 font-black">{filteredRecommendations.length}</span> of {stackRecommendations.length} Protocols
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs font-bold text-slate-300 hover:text-amber-300 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Dropdown Filters Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-1 border-t border-slate-800/70">
              {/* Target Goal */}
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1">
                  <Target className="w-3 h-3 text-cyan-400" />
                  Target Goal
                </label>
                <select
                  value={selectedGoal}
                  onChange={e => setSelectedGoal(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                >
                  {goalOptions.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1">
                  <Award className="w-3 h-3 text-purple-400" />
                  Experience Level
                </label>
                <select
                  value={selectedExperience}
                  onChange={e => setSelectedExperience(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-400"
                >
                  {experienceOptions.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Dosage Tier */}
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" />
                  Dosage Tier
                </label>
                <select
                  value={selectedDosageTier}
                  onChange={e => setSelectedDosageTier(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                >
                  {dosageOptions.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Phase Category */}
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1">
                  <Filter className="w-3 h-3 text-emerald-400" />
                  Phase Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick-Pick Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 scrollbar-none text-[11px]">
              <span className="text-[10px] uppercase font-black text-slate-400 whitespace-nowrap mr-1">Quick Picks:</span>
              <button
                onClick={() => setQuickFilter(quickFilter === 'dbol' ? 'all' : 'dbol')}
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-all border ${
                  quickFilter === 'dbol'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                💥 Dianabol Protocols
              </button>
              <button
                onClick={() => setQuickFilter(quickFilter === 'anadrol' ? 'all' : 'anadrol')}
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-all border ${
                  quickFilter === 'anadrol'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                ⚡ Anadrol Protocols
              </button>
              <button
                onClick={() => setQuickFilter(quickFilter === 'budget' ? 'all' : 'budget')}
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-all border ${
                  quickFilter === 'budget'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                💰 Budget Mass (&lt;$60/Mo)
              </button>
              <button
                onClick={() => setQuickFilter(quickFilter === 'beginner' ? 'all' : 'beginner')}
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-all border ${
                  quickFilter === 'beginner'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                🔰 Beginner Friendly
              </button>
              <button
                onClick={() => setQuickFilter(quickFilter === 'gynosafe' ? 'all' : 'gynosafe')}
                className={`px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-all border ${
                  quickFilter === 'gynosafe'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                🛡️ Gyno-Proof / Low E2
              </button>
            </div>
          </div>

          {/* Empty State */}
          {filteredRecommendations.length === 0 && (
            <div className="card-gloss rounded-2xl p-10 border border-slate-800 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <Filter className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-white">No Protocols Found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No cycle recommendations match your current combination of filters. Try widening your criteria or click reset below.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-bold inline-flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset All Filters
              </button>
            </div>
          )}

          {/* Grid of Recommendation Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredRecommendations.map(rec => {
              const isSelected = selectedRec?.id === rec.id;
              const hasAnadrol = rec.compounds.some(c => 
                c.name.toLowerCase().includes('anadrol') || 
                c.name.toLowerCase().includes('oxymetholone')
              );
              const hasDbol = rec.compounds.some(c => 
                c.name.toLowerCase().includes('dianabol') || 
                c.name.toLowerCase().includes('dbol') ||
                c.name.toLowerCase().includes('methandrostenolone')
              );

              return (
                <div
                  key={rec.id}
                  className={`card-gloss rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-500/50 shadow-lg shadow-amber-500/10 bg-slate-900/90'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Multi-Badge Header */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {/* Goal Badge */}
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 flex items-center gap-1">
                            <Target className="w-2.5 h-2.5" />
                            {rec.goalType}
                          </span>

                          {/* Experience Badge */}
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center gap-1">
                            <Award className="w-2.5 h-2.5" />
                            {rec.experienceLevel}
                          </span>

                          {/* Duration Badge */}
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 text-slate-400" />
                            {rec.durationWeeks} Wks
                          </span>
                        </div>

                        {/* Total AAS */}
                        <div className="flex items-center gap-1 text-xs font-black text-amber-400">
                          <Flame className="w-3.5 h-3.5 text-amber-400" />
                          <span>{rec.totalAasWeeklyMg} mg AAS/wk</span>
                        </div>
                      </div>

                      {/* Dosage Tier & Oral Highlights */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          {rec.dosageTier}
                        </span>

                        {hasAnadrol && hasDbol && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-gradient-to-r from-purple-500/20 to-amber-500/20 border border-purple-500/40 text-purple-200 flex items-center gap-1">
                            🌪️ Twin Oral Pulse Engine (Anadrol + Dbol)
                          </span>
                        )}
                        {hasAnadrol && !hasDbol && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center gap-1">
                            ⚡ Oxymetholone (Anadrol) Accelerated
                          </span>
                        )}
                        {hasDbol && !hasAnadrol && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center gap-1">
                            💥 Dianabol Glycogen Kickstart
                          </span>
                        )}
                        {rec.goalType === 'Budget Friendly Mass' && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1">
                            💰 Budget Verified: &lt;$60/Mo
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-base font-black text-white">{rec.name}</h3>
                      <div className="text-xs text-amber-400 font-semibold">{rec.subtitle}</div>
                      <div className="text-[11px] text-cyan-300 mt-0.5 font-medium">
                        Target: {rec.targetWeightProgression}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {rec.description}
                    </p>

                    {/* Key Benefits */}
                    <div className="space-y-1 pt-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Classic Advantages</div>
                      {rec.keyBenefits.map((b, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                          <Check className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>

                    {/* Compounds Included Pill Preview */}
                    <div className="pt-2">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Compounds Included ({rec.compounds.length})
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {rec.compounds.map((c, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 border ${
                              c.isAncillary
                                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                                : c.category === 'AAS'
                                ? 'bg-cyan-950/40 border-cyan-500/30 text-cyan-300'
                                : 'bg-purple-950/40 border-purple-500/30 text-purple-300'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {c.name} ({c.dose}{c.unit} {c.frequency})
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Clinical Safety Metrics */}
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800 text-slate-400 flex items-center justify-between">
                        <span>Aromatization:</span>
                        <span className="font-bold text-amber-300">{rec.aromatizationLevel}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800 text-slate-400 flex items-center justify-between">
                        <span>Organ Risk:</span>
                        <span className="font-bold text-emerald-300">{rec.organRiskLevel}</span>
                      </div>
                    </div>

                    {/* Scientific Rationale */}
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                      <div className="font-bold text-slate-300 flex items-center gap-1">
                        <Info className="w-3 h-3 text-amber-400" />
                        Pharmacological Rationale
                      </div>
                      <p className="leading-relaxed text-slate-400">{rec.rationale}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-4 mt-4 border-t border-slate-800">
                    <button
                      onClick={() => handleOpenDeploy(rec)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-amber-500/20"
                    >
                      <Zap className="w-3.5 h-3.5 fill-black" />
                      Deploy Stack to Active Cycle
                    </button>
                    <button
                      onClick={() => handleLoadIntoSandbox(rec)}
                      className="py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                      title="Load into sandbox to adjust doses or add custom compounds"
                    >
                      <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                      Customize
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 2: CUSTOM STACK SANDBOX                               */}
      {/* ========================================================= */}
      {builderMode === 'sandbox' && (
        <div className="space-y-6">
          {/* Sandbox Header / Title Editor */}
          <div className="card-gloss rounded-2xl p-5 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Custom Protocol Name
              </label>
              <input
                type="text"
                value={sandboxName}
                onChange={e => setSandboxName(e.target.value)}
                className="w-full text-base font-black text-white bg-slate-950/70 border border-slate-700 rounded-xl px-3.5 py-2 focus:outline-none focus:border-cyan-400"
                placeholder="e.g. 74kg Lean Mass Primer: Test + Primo + rhGH"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSandboxCompounds([])}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Sandbox
              </button>
              <button
                onClick={handleDeploySandbox}
                disabled={sandboxCompounds.length === 0}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black text-xs font-black flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-500/20"
              >
                <Zap className="w-3.5 h-3.5 fill-black" />
                Deploy Custom Protocol ({sandboxCompounds.length})
              </button>
            </div>
          </div>

          {/* Pharmacological Safety Intelligence Gauge & Alerts */}
          <div className="card-gloss rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-black text-white uppercase tracking-wider">
                  Real-Time Pharmacological Safety Telemetry
                </h3>
              </div>
              <span className="text-[11px] font-bold text-slate-400">
                Total AAS Weekly: <span className="text-cyan-300 font-black">{totalSandboxAasMg} mg/wk</span>
              </span>
            </div>

            {/* Status Gauges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Total AAS Load Metric */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Total AAS Load</div>
                <div className="text-lg font-black text-white flex items-center gap-1">
                  <span>{totalSandboxAasMg}</span>
                  <span className="text-xs text-slate-400 font-normal">mg/wk</span>
                </div>
                <div className="text-[10px] font-bold">
                  {totalSandboxAasMg === 0 ? (
                    <span className="text-slate-400">No AAS</span>
                  ) : totalSandboxAasMg <= 300 ? (
                    <span className="text-emerald-400">TRT / Low Load</span>
                  ) : totalSandboxAasMg <= 750 ? (
                    <span className="text-cyan-400">Moderate Foundation</span>
                  ) : totalSandboxAasMg <= 1200 ? (
                    <span className="text-amber-400">Heavy Blast</span>
                  ) : (
                    <span className="text-rose-400">Aggressive Contest</span>
                  )}
                </div>
              </div>

              {/* Estrogen Management */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Estradiol Control</div>
                <div className="text-sm font-black flex items-center gap-1.5 mt-1">
                  {hasAiOrDht ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Balanced
                    </span>
                  ) : hasHighTest ? (
                    <span className="text-amber-400 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> High Risk
                    </span>
                  ) : (
                    <span className="text-slate-400">Physiological</span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400">
                  {hasAiOrDht ? 'AI / DHT present' : hasHighTest ? 'Add Masteron or AI' : 'Low aromatization'}
                </div>
              </div>

              {/* 19-Nor Prolactin Status */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">19-Nor Prolactin</div>
                <div className="text-sm font-black flex items-center gap-1.5 mt-1">
                  {!has19Nor ? (
                    <span className="text-slate-400">None Active</span>
                  ) : hasCaber ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Shielded
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Danger
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400">
                  {has19Nor ? (hasCaber ? 'Cabergoline active' : 'Missing Caber!') : 'No Deca/NPP/Tren'}
                </div>
              </div>

              {/* Organ Armor / Hepatic */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Organ Protection</div>
                <div className="text-sm font-black flex items-center gap-1.5 mt-1">
                  {hasOral17aa && !hasLiverShield ? (
                    <span className="text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Hepatic Risk
                    </span>
                  ) : hasTelmisartan && hasOrganProtection ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Fortified
                    </span>
                  ) : (
                    <span className="text-amber-400">Partial Armor</span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400">
                  {hasOral17aa && !hasLiverShield ? 'Add TUDCA + NAC' : hasTelmisartan ? 'Telmisartan + Antiox' : 'Consider Telmisartan'}
                </div>
              </div>
            </div>

            {/* Smart Safety Guardrail Alerts */}
            {has19Nor && !hasCaber && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>
                    <strong>19-Nor Progestin Detected (NPP/Tren):</strong> Prolactin elevation can induce gynecomastia, lethargy, and erectile dysfunction.
                  </span>
                </div>
                <button
                  onClick={() => handleQuickAddAncillary('Cabergoline')}
                  className="px-3 py-1 rounded-lg bg-rose-500 hover:bg-rose-400 text-black text-[11px] font-bold whitespace-nowrap"
                >
                  + Add Cabergoline (0.25mg)
                </button>
              </div>
            )}

            {hasOral17aa && !hasLiverShield && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>
                    <strong>17-Alpha Alkylated Oral Present:</strong> Hepatic transaminases (AST/ALT) will spike without active bile canaliculi protection.
                  </span>
                </div>
                <button
                  onClick={() => handleQuickAddAncillary('TUDCA')}
                  className="px-3 py-1 rounded-lg bg-rose-500 hover:bg-rose-400 text-black text-[11px] font-bold whitespace-nowrap"
                >
                  + Add TUDCA (500mg)
                </button>
              </div>
            )}

            {totalSandboxAasMg >= 500 && !hasTelmisartan && (
              <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-500/40 text-amber-300 text-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>
                    <strong>Heavy Anabolic Load ({totalSandboxAasMg}mg/wk):</strong> Blood pressure and left ventricular remodeling risk increases significantly.
                  </span>
                </div>
                <button
                  onClick={() => handleQuickAddAncillary('Telmisartan')}
                  className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-[11px] font-bold whitespace-nowrap"
                >
                  + Add Telmisartan (40mg)
                </button>
              </div>
            )}
          </div>

          {/* Add Compound Selector Bar */}
          <div className="card-gloss rounded-2xl p-4 border border-slate-800">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-1 w-full">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Add Compound from Master PED Library ({pedLibrary.length} Available)
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <select
                    value={selectedLibraryAdd}
                    onChange={e => {
                      const val = e.target.value;
                      if (!val) return;
                      const item = pedLibrary.find(p => p.id === val);
                      if (item) handleAddFromLibraryToSandbox(item);
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 appearance-none"
                  >
                    <option value="">Select a compound to add into your custom stack...</option>
                    {pedLibrary.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name} [{item.category}] — Typical: {item.typicalDose} ({item.route})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Active Sandbox Compounds List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Drafted Compounds ({sandboxCompounds.length})
              </h4>
              <span className="text-[11px] text-slate-400">
                Adjust doses, frequencies, or remove compounds below
              </span>
            </div>

            {sandboxCompounds.length === 0 ? (
              <div className="card-gloss rounded-2xl p-8 border border-dashed border-slate-800 text-center space-y-3">
                <Syringe className="w-8 h-8 text-slate-600 mx-auto" />
                <div className="text-sm font-bold text-slate-300">Sandbox Stack is Empty</div>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Select a compound from the dropdown above, or return to Curated Recommendations and click "Customize" to load a pre-tested championship blueprint.
                </p>
              </div>
            ) : (
              sandboxCompounds.map((comp, idx) => (
                <div
                  key={idx}
                  className="card-gloss rounded-xl p-4 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left: Name & Category badge */}
                  <div className="space-y-1 min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        comp.category === 'AAS'
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                          : comp.category === 'Organ_Support'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                      }`}>
                        {comp.category}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{comp.route}</span>
                    </div>
                    <div className="text-sm font-black text-white">{comp.name}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{comp.notes}</div>
                  </div>

                  {/* Middle: Dose, Frequency, Timing Controls */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Dose */}
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Dose</label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={comp.dose}
                          onChange={e => handleUpdateSandboxCompound(idx, 'dose', e.target.value)}
                          className="w-16 bg-slate-950 border border-slate-700 rounded-l-lg px-2 py-1 text-xs text-white font-bold focus:outline-none focus:border-cyan-400 text-center"
                        />
                        <span className="bg-slate-800 border border-l-0 border-slate-700 rounded-r-lg px-2 py-1 text-xs text-slate-300 font-bold">
                          {comp.unit}
                        </span>
                      </div>
                    </div>

                    {/* Frequency */}
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Frequency</label>
                      <select
                        value={comp.frequency}
                        onChange={e => handleUpdateSandboxCompound(idx, 'frequency', e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-medium focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Every Day">Every Day</option>
                        <option value="EOD">EOD (Every Other Day)</option>
                        <option value="Mon/Wed/Fri">Mon/Wed/Fri</option>
                        <option value="Twice Weekly">Twice Weekly</option>
                        <option value="Weekly">Weekly</option>
                        <option value="As Needed">As Needed</option>
                      </select>
                    </div>

                    {/* Timing */}
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Timing</label>
                      <select
                        value={comp.timing}
                        onChange={e => handleUpdateSandboxCompound(idx, 'timing', e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-medium focus:outline-none focus:border-cyan-400"
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                        <option value="Pre-Workout">Pre-Workout</option>
                        <option value="Pre-Bed">Pre-Bed</option>
                        <option value="Divided">Divided</option>
                      </select>
                    </div>
                  </div>

                  {/* Right: Remove Button */}
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => handleRemoveFromSandbox(idx)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Remove compound from sandbox"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* DEPLOY CONFIRMATION MODAL                                 */}
      {/* ========================================================= */}
      {isDeployModalOpen && stackToDeploy && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 animate-scaleUp">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">
                Confirm Protocol Deployment
              </div>
              <h3 className="text-xl font-black text-white">{stackToDeploy.name}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Deploying this protocol will configure all {stackToDeploy.compounds.length} compounds, clinical doses, injection frequencies, and organ armor directly into your active tracker and periodized roadmap.
              </p>
            </div>

            {/* Replacement Choice */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-white">Deployment Mode:</div>
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300">
                <input
                  type="radio"
                  name="deployMode"
                  checked={replaceExisting}
                  onChange={() => setReplaceExisting(true)}
                  className="accent-amber-500"
                />
                <span><strong>Replace Active Cycle</strong> (Recommended — cleans old stack and installs fresh protocol)</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300">
                <input
                  type="radio"
                  name="deployMode"
                  checked={!replaceExisting}
                  onChange={() => setReplaceExisting(false)}
                  className="accent-amber-500"
                />
                <span><strong>Append to Existing Compounds</strong> (Keeps current compounds and adds these alongside)</span>
              </label>
            </div>

            {/* Compounds summary */}
            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
              {stackToDeploy.compounds.map((c, i) => (
                <div key={i} className="text-[11px] p-2 rounded-lg bg-slate-800/60 flex items-center justify-between">
                  <span className="font-semibold text-white">{c.name}</span>
                  <span className="text-cyan-400 font-bold">{c.dose}{c.unit} • {c.frequency}</span>
                </div>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsDeployModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDeploy}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-amber-500/20"
              >
                <Zap className="w-3.5 h-3.5 fill-black" />
                Confirm & Deploy Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ANADROL & DBOL CLINICAL MASTERY BLUEPRINT MODAL           */}
      {/* ========================================================= */}
      {isOralGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-500/40 rounded-2xl max-w-3xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto scrollbar-thin shadow-2xl shadow-purple-950/50 animate-scaleUp">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-black uppercase tracking-wider mb-1.5">
                  <Pill className="w-3.5 h-3.5 text-purple-400" />
                  HEAVYWEIGHT MASS MONSTER PLAYBOOK
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-white">
                  Anadrol & Dianabol: The Heavy Mass Blueprint
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Zero overpriced Primobolan. How to safely wield bodybuilding&apos;s two greatest oral compounds to pack on 25+ lbs of pure contractile mass without wrecking your liver or killing your appetite.
                </p>
              </div>
              <button
                onClick={() => setIsOralGuideOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Economics Callout */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-emerald-300 uppercase">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                The Zero-Primo Reality: High-Affinity Budget Economics
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Primobolan costs <strong>\$150–\$220 per 10ml vial</strong> and requires 400–600mg/week (that&apos;s \$500–\$700/month just for Primo, with high counterfeit risk). In contrast, <strong>Testosterone (\$35) + Deca (\$40) + Dbol (\$35) + Anadrol (\$45) + Masteron (\$50)</strong> gives you <strong>5x the raw tissue accretion</strong> at a fraction of the price!
              </p>
            </div>

            {/* Compound 1: Anadrol (Oxymetholone) */}
            <div className="card-gloss rounded-xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <h4 className="text-sm font-black text-white uppercase">
                    Anadrol (Oxymetholone / A-Bombs)
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/30">
                  Strength & EPO Red Cell King
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-1">
                  <span className="font-bold text-slate-200">Optimal Dosing & Timing:</span>
                  <p className="text-slate-400">
                    <strong>50 mg/day</strong>. Take 60–75 minutes pre-workout with 50–80g carbs. Peak blood levels hit right as you begin heavy warm-up sets.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-1">
                  <span className="font-bold text-amber-300">The Non-Aromatizing ER Quirk (Crucial):</span>
                  <p className="text-slate-400">
                    Anadrol is a DHT derivative and does NOT convert to estrogen via aromatase. However, it can activate Estrogen Receptors directly! <strong>AIs (Arimidex/Aromasin) WILL NOT STOP Anadrol gyno.</strong> You must use <strong>Nolvadex (Tamoxifen 10–20mg)</strong> to block the receptor directly.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-1">
                  <span className="font-bold text-cyan-300">Blood Pressure & Kidneys:</span>
                  <p className="text-slate-400">
                    Anadrol causes rapid renal sodium reabsorption and red blood cell spikes. <strong>Telmisartan (40–80mg daily)</strong> is non-negotiable to keep resting BP &lt; 125/80 mmHg.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-1">
                  <span className="font-bold text-emerald-300">Appetite Preservation Hack:</span>
                  <p className="text-slate-400">
                    Anadrol can blunt appetite after 4–5 continuous weeks. Use the <strong>4x/Week Pre-Workout Pulse</strong> (take 50mg on squat/bench/deadlift days, 0mg on off days). Keeps appetite at 4,000+ kcal!
                  </p>
                </div>
              </div>
            </div>

            {/* Compound 2: Dianabol (Methandrostenolone) */}
            <div className="card-gloss rounded-xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-400" />
                  <h4 className="text-sm font-black text-white uppercase">
                    Dianabol (Methandrostenolone / Dbol)
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                  Golden Era Muscle Detonator
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-1">
                  <span className="font-bold text-slate-200">Optimal Dosing & Split:</span>
                  <p className="text-slate-400">
                    <strong>25–35 mg/day</strong>. Half-life is 4.5–6 hours. Split: 15mg with Breakfast + 15mg 60 mins Pre-Workout. Drives massive glycogen supercompensation within 48 hours.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-1">
                  <span className="font-bold text-amber-300">17α-Methyl-Estradiol Management:</span>
                  <p className="text-slate-400">
                    Dbol aromatizes into 17α-methyl-estradiol, which binds much more aggressively to breast tissue than normal E2. Have <strong>Aromasin 12.5mg EOD or PRN</strong> ready to prevent itchy nipples.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-1">
                  <span className="font-bold text-purple-300">Lower Back Pump Neutralizer:</span>
                  <p className="text-slate-400">
                    Severe lower back pumps during squats and deadlifts occur from intense muscular glycogen swelling. Supplement <strong>3,000–5,000 mg Taurine daily</strong> to eliminate back pumps completely.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-1">
                  <span className="font-bold text-emerald-300">Synergy with Deca & Test:</span>
                  <p className="text-slate-400">
                    The classic Arnold mass stack. Deca provides joint synovial fluid while Dbol provides instant leverage and neuromuscular drive. Explosive lean mass kickstart for 74kg starting weight!
                  </p>
                </div>
              </div>
            </div>

            {/* Organ Shield & Harm Reduction */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                The Mandatory Liver & Vascular Protection Protocol:
              </div>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li><strong>TUDCA 500–750mg PM:</strong> Take before bed, at least 3 hours away from oral dosing so it doesn&apos;t interfere with oral absorption while flushing hepatic bile canaliculi overnight.</li>
                <li><strong>NAC 1200–1800mg AM:</strong> Precursor to glutathione; protects hepatocytes from reactive oxidative metabolites.</li>
                <li><strong>Telmisartan 40mg AM:</strong> Controls angiotensin II, prevents left ventricular hypertrophy, and preserves kidney eGFR.</li>
                <li><strong>Hydration:</strong> Minimum 5.5 to 6.5 Liters of water daily to maintain renal clearance throughput.</li>
              </ul>
            </div>

            {/* Close Button */}
            <div className="pt-2 text-right">
              <button
                onClick={() => setIsOralGuideOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-black text-xs font-black transition-colors shadow-lg shadow-purple-500/20"
              >
                Close & Return to Protocols
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
