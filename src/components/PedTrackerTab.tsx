import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Compound, InjectionSite, CyclePhasePlan, PedLibraryItem } from '../types';
import { 
  Syringe, 
  ShieldAlert, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Activity, 
  Zap, 
  Info,
  MapPin,
  Flame,
  Layers,
  HeartPulse,
  BookOpen,
  Search,
  Filter,
  Check,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export const PedTrackerTab: React.FC = () => {
  const { 
    compounds, 
    addCompound, 
    addCompoundFromLibrary,
    clearAllCyclesAndCompounds,
    toggleCompoundLogged, 
    toggleCompoundActive, 
    deleteCompound,
    injections,
    addInjection,
    cyclePlans,
    updateCyclePhaseStatus,
    pedLibrary
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'library' | 'compounds' | 'phases' | 'sites' | 'halflife'>('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLibItem, setSelectedLibItem] = useState<PedLibraryItem | null>(null);

  const [isAddCompoundOpen, setIsAddCompoundOpen] = useState(false);
  const [isLogInjectionOpen, setIsLogInjectionOpen] = useState(false);
  const [addedItemNotification, setAddedItemNotification] = useState<string | null>(null);

  // New compound form
  const [newCompound, setNewCompound] = useState<{
    name: string;
    category: Compound['category'];
    dose: string;
    unit: Compound['unit'];
    frequency: Compound['frequency'];
    timing: Compound['timing'];
    halfLifeDays: number;
    route: Compound['route'];
    notes: string;
  }>({
    name: '',
    category: 'AAS',
    dose: '200',
    unit: 'mg',
    frequency: 'Twice Weekly',
    timing: 'AM',
    halfLifeDays: 7,
    route: 'Intramuscular',
    notes: ''
  });

  // New injection form
  const [newInj, setNewInj] = useState<{
    site: InjectionSite;
    compounds: string;
    volumeMl: number;
    painRating: 1 | 2 | 3 | 4 | 5;
    notes: string;
  }>({
    site: 'Right Ventroglute',
    compounds: 'Testosterone Enanthate',
    volumeMl: 1.0,
    painRating: 1,
    notes: ''
  });

  const injectionSites: InjectionSite[] = [
    'Right Glute', 'Left Glute',
    'Right Ventroglute', 'Left Ventroglute',
    'Right Delt', 'Left Delt',
    'Right Quad', 'Left Quad',
    'Right Lat', 'Left Lat'
  ];

  const getLastPinForSite = (site: InjectionSite) => {
    return injections.find(i => i.site === site);
  };

  const handleCreateCompound = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompound.name.trim()) return;
    addCompound({
      ...newCompound,
      currentActive: true,
      logsToday: false
    });
    setNewCompound({
      name: '',
      category: 'AAS',
      dose: '200',
      unit: 'mg',
      frequency: 'Twice Weekly',
      timing: 'AM',
      halfLifeDays: 7,
      route: 'Intramuscular',
      notes: ''
    });
    setIsAddCompoundOpen(false);
  };

  const handleCreateInjection = (e: React.FormEvent) => {
    e.preventDefault();
    addInjection({
      date: new Date().toISOString().split('T')[0],
      site: newInj.site,
      compounds: newInj.compounds,
      volumeMl: Number(newInj.volumeMl),
      painRating: newInj.painRating,
      notes: newInj.notes
    });
    setIsLogInjectionOpen(false);
  };

  const handleAddFromLibrary = (item: PedLibraryItem) => {
    addCompoundFromLibrary(item);
    setAddedItemNotification(`${item.name} added to your active stack!`);
    setTimeout(() => setAddedItemNotification(null), 3000);
  };

  const handleClearCycles = () => {
    if (confirm('Clear all current active cycles, compounds, and injection history? You can add any compound back anytime from the PED Master Library.')) {
      clearAllCyclesAndCompounds();
    }
  };

  // Filter PED Library
  const libraryCategories = [
    'All',
    'Testosterone & Esters',
    '19-Nor Anabolics',
    'DHT Derivatives',
    'Mass Orals',
    'Growth Hormone & Peptides',
    'Metabolic & Fat Burners',
    'Insulin & Glucose Partitioning',
    'Aromatase Inhibitors & SERMs',
    'Prolactin & Neuro',
    'Organ Support & Cardioprotection'
  ];

  const filteredLibrary = pedLibrary.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.chemicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tradeNames.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.classicPhysiqueUtility.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const halfLifeCurveData = Array.from({ length: 14 }, (_, i) => {
    const day = i + 1;
    const testLevel = Math.round(100 * Math.exp(-0.693 * ((day - 1) % 4) / 8) + 80);
    const primoLevel = Math.round(120 * Math.exp(-0.693 * ((day - 1) % 4) / 10) + 110);
    const mastLevel = Math.round(70 * Math.exp(-0.693 * ((day - 1) % 2) / 2.5) + 30);

    return {
      day: `Day ${day}`,
      Testosterone: testLevel,
      Primobolan: primoLevel,
      Masteron: mastLevel
    };
  });

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="border border-slate-800 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0e1620] to-slate-900 p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              THE DEFINITIVE BODYBUILDING PED MASTER COMPENDIUM
            </div>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white uppercase">
              PED LIBRARY & PROTOCOL ARCHITECT
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Explore the complete scientific and pharmacological compendium of every anabolic, peptide, metabolic agent, and organ protector. Add any compound directly to your custom stack with one click.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleClearCycles}
              className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold flex items-center gap-1.5 transition-colors border border-rose-500/30"
              title="Wipe current active cycle to build a fresh stack"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear Active Cycle
            </button>
            <button
              onClick={() => setIsLogInjectionOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold flex items-center gap-1.5 transition-colors shadow-lg shadow-cyan-500/20"
            >
              <MapPin className="w-3.5 h-3.5" />
              Log Injection Pin
            </button>
            <button
              onClick={() => setIsAddCompoundOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <Plus className="w-3.5 h-3.5 text-cyan-400" />
              Custom Compound
            </button>
          </div>
        </div>

        {/* Added Notification Toast */}
        {addedItemNotification && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-400" />
            {addedItemNotification}
          </div>
        )}

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800 text-xs overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveSubTab('library')}
            className={`px-4 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'library' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            PED Master Library ({pedLibrary.length} Compounds)
          </button>
          <button
            onClick={() => setActiveSubTab('compounds')}
            className={`px-4 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'compounds' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Syringe className="w-3.5 h-3.5" />
            My Active Stack ({compounds.length})
          </button>
          <button
            onClick={() => setActiveSubTab('phases')}
            className={`px-4 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'phases' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Periodized Cycle Plans
          </button>
          <button
            onClick={() => setActiveSubTab('sites')}
            className={`px-4 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'sites' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Injection Site Rotation
          </button>
          <button
            onClick={() => setActiveSubTab('halflife')}
            className={`px-4 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'halflife' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Pharmacokinetics & Clearance
          </button>
        </div>
      </div>

      {/* SUBTAB: PED MASTER LIBRARY */}
      {activeSubTab === 'library' && (
        <div className="space-y-6">
          {/* Search & Category Filter Bar */}
          <div className="card-gloss rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by compound (e.g. Trenbolone, Primo, Masteron, rhGH, T3, Telmisartan)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Showing <strong className="text-cyan-400">{filteredLibrary.length}</strong> of {pedLibrary.length} compounds
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              {libraryCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Library Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLibrary.map((item) => {
              const categoryColor = {
                'Testosterone & Esters': 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
                '19-Nor Anabolics': 'border-purple-500/40 text-purple-300 bg-purple-500/10',
                'DHT Derivatives': 'border-amber-500/40 text-amber-300 bg-amber-500/10',
                'Mass Orals': 'border-rose-500/40 text-rose-300 bg-rose-500/10',
                'Growth Hormone & Peptides': 'border-blue-500/40 text-blue-300 bg-blue-500/10',
                'Metabolic & Fat Burners': 'border-orange-500/40 text-orange-300 bg-orange-500/10',
                'Insulin & Glucose Partitioning': 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
                'Aromatase Inhibitors & SERMs': 'border-yellow-500/40 text-yellow-300 bg-yellow-500/10',
                'Prolactin & Neuro': 'border-indigo-500/40 text-indigo-300 bg-indigo-500/10',
                'Organ Support & Cardioprotection': 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10'
              }[item.category] || 'border-slate-700 text-slate-300 bg-slate-800';

              const isAlreadyActive = compounds.some(c => c.name.toLowerCase().includes(item.name.toLowerCase().split(' ')[0]));

              return (
                <div
                  key={item.id}
                  className="card-gloss rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between gap-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${categoryColor}`}>
                        {item.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono font-semibold">
                        {item.route}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors">
                        {item.name}
                      </h4>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {item.chemicalName}
                      </div>
                    </div>

                    {/* Stats Matrix */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Half-Life</span>
                        <span className="text-white font-bold">{item.halfLife}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Typical Dose</span>
                        <span className="text-cyan-400 font-bold">{item.typicalDose}</span>
                      </div>
                      {item.anabolicRatio !== undefined && (
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase">Anabolic:Androgenic</span>
                          <span className="text-amber-400 font-bold">{item.anabolicRatio}:{item.androgenicRatio}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Aromatization</span>
                        <span className={item.aromatization === 'None' || item.aromatization === 'Anti-Estrogenic' ? 'text-emerald-400' : 'text-rose-400'}>
                          {item.aromatization}
                        </span>
                      </div>
                    </div>

                    {/* Classic Utility */}
                    <div className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-amber-300 text-[11px] uppercase block mb-0.5">Classic Physique Role:</strong>
                      {item.classicPhysiqueUtility}
                    </div>

                    {/* Organ Safety Note */}
                    <div className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-800/80">
                      🛡️ {item.mandatoryAncillaries}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => setSelectedLibItem(item)}
                      className="w-1/2 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                    >
                      Full Monograph
                    </button>
                    <button
                      onClick={() => handleAddFromLibrary(item)}
                      className={`w-1/2 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isAlreadyActive
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-md shadow-cyan-500/20'
                      }`}
                    >
                      {isAlreadyActive ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      {isAlreadyActive ? 'In Stack' : 'Add to Stack'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB: MY ACTIVE STACK */}
      {activeSubTab === 'compounds' && (
        <div className="space-y-4">
          {compounds.length === 0 ? (
            <div className="card-gloss rounded-2xl p-12 text-center border border-slate-800 space-y-4 max-w-xl mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
                <Syringe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white uppercase">Your Active Cycle is Empty</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All pre-existing cycles have been cleared out. Browse the <strong>PED Master Library</strong> to assemble your custom 22-month stack, or click <strong>Custom Compound</strong> to enter a formula manually.
              </p>
              <button
                onClick={() => setActiveSubTab('library')}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold inline-flex items-center gap-2 transition-colors shadow-lg shadow-cyan-500/20"
              >
                <BookOpen className="w-4 h-4" />
                Browse PED Master Library
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {compounds.map((comp) => (
                <div
                  key={comp.id}
                  className={`card-gloss rounded-xl p-5 border transition-all flex flex-col justify-between gap-4 ${
                    comp.currentActive ? 'border-slate-800' : 'border-slate-800/40 opacity-50'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                        {comp.category.replace('_', ' ')}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleCompoundActive(comp.id)}
                          className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase transition-colors ${
                            comp.currentActive 
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {comp.currentActive ? 'Active' : 'Paused'}
                        </button>
                        <button
                          onClick={() => deleteCompound(comp.id)}
                          className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-white text-base">{comp.name}</h4>
                      <div className="text-sm font-mono font-bold text-cyan-300 mt-0.5">
                        {comp.dose} {comp.unit} <span className="text-xs text-slate-400 font-normal">({comp.frequency})</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-800/80">
                      <div className="flex justify-between">
                        <span>Route / Timing:</span>
                        <span className="text-slate-200 font-medium">{comp.route} • {comp.timing}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Half-Life:</span>
                        <span className="text-slate-200 font-medium">{comp.halfLifeDays} days</span>
                      </div>
                      {comp.notes && (
                        <p className="text-[11px] text-slate-400 pt-1 italic line-clamp-2">{comp.notes}</p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleCompoundLogged(comp.id)}
                    className={`w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      comp.logsToday
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {comp.logsToday ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        Administered Today
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4 text-slate-600" />
                        Mark Administered Today
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBTAB: PERIODIZED CYCLE PLANS */}
      {activeSubTab === 'phases' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
            <Layers className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <div className="font-bold text-white">Custom 22-Month Periodized Hormone Protocol Architecture</div>
              <p className="text-slate-400">
                Alternating heavy tissue accretion blasts with cardiovascular & hepatic consolidation cruises preserves insulin sensitivity and avoids permanent receptor downregulation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cyclePlans.map((plan) => {
              const typeColor = {
                Mass_Blast: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
                Consolidation_Cruise: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
                Contest_Prep_Cut: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
                Peak_Dry: 'text-purple-400 border-purple-500/30 bg-purple-500/10'
              }[plan.phaseType];

              return (
                <div 
                  key={plan.id}
                  className={`card-gloss rounded-2xl p-6 border transition-all space-y-4 ${
                    plan.status === 'active' ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/10' : 'border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${typeColor}`}>
                        {plan.phaseType.replace('_', ' ')} • {plan.durationWeeks} WEEKS
                      </span>
                      <h3 className="font-bold text-white text-base mt-1.5">{plan.name}</h3>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        {plan.startDate} → {plan.endDate}
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                      plan.status === 'active' ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {plan.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Compound Stack:</div>
                    {plan.compounds.map((comp, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-300 font-mono text-[11px]">
                        <span className="text-cyan-400 font-bold">›</span>
                        <span>{comp}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase">Ester Clearance:</div>
                      <div className="font-bold text-white">{plan.esterClearanceWindowDays} Days window</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase">Bloodwork Weeks:</div>
                      <div className="font-bold text-amber-300">Week {plan.bloodworkCheckpointWeeks.join(', Week ')}</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 italic">
                    🛡️ <strong>Health Directive:</strong> {plan.healthSupportFocus}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB: INJECTION SITE ROTATION */}
      {activeSubTab === 'sites' && (
        <div className="space-y-6">
          <div className="card-gloss rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  Injection Site Tissue Rotation Map
                </h3>
                <p className="text-xs text-slate-400">
                  Prevent focal fibrosis and subcutaneous scar tissue buildup. Rotate every single administration.
                </p>
              </div>
              <button
                onClick={() => setIsLogInjectionOpen(true)}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Log Site Pin
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              {injectionSites.map((site) => {
                const lastPin = getLastPinForSite(site);
                const daysAgo = lastPin 
                  ? Math.max(0, Math.floor((new Date().getTime() - new Date(lastPin.date).getTime()) / (1000 * 3600 * 24)))
                  : null;

                const isRested = daysAgo === null || daysAgo >= 5;

                return (
                  <div 
                    key={site} 
                    className={`p-4 rounded-xl border transition-all space-y-2 ${
                      isRested 
                        ? 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/40' 
                        : 'bg-amber-950/20 border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{site}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        isRested ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-300'
                      }`}>
                        {isRested ? 'RESTED' : 'RECENT'}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      Last Pinned: <br />
                      <strong className="text-slate-200 font-mono">
                        {lastPin ? `${lastPin.date} (${daysAgo}d ago)` : 'Never / Clear'}
                      </strong>
                    </div>

                    {lastPin && (
                      <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/80 line-clamp-1">
                        {lastPin.compounds} ({lastPin.volumeMl}ml)
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB: HALF-LIFE PHARMACOKINETICS */}
      {activeSubTab === 'halflife' && (
        <div className="card-gloss rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                Active Blood Serum Concentration Simulation
              </h3>
              <p className="text-xs text-slate-400">
                Visualizing steady-state saturation curve based on ester release half-lives.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-cyan-400 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" /> Test Cyp
              </span>
              <span className="text-amber-400 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Primobolan
              </span>
              <span className="text-purple-400 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block" /> Masteron
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={halfLifeCurveData}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="Testosterone" stroke="#00f0ff" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Primobolan" stroke="#f59e0b" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Masteron" stroke="#c084fc" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* FULL COMPOUND MONOGRAPH MODAL */}
      {selectedLibItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#12141c] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {selectedLibItem.category}
                </span>
                <h3 className="font-black text-white text-xl mt-1">{selectedLibItem.name}</h3>
                <div className="text-xs text-slate-400 font-mono">{selectedLibItem.chemicalName}</div>
              </div>
              <button onClick={() => setSelectedLibItem(null)} className="text-slate-400 hover:text-white text-lg font-bold">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase">Half-Life</div>
                  <div className="font-bold text-white text-sm">{selectedLibItem.halfLife}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase">Route</div>
                  <div className="font-bold text-cyan-400 text-sm">{selectedLibItem.route}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase">Typical Dose</div>
                  <div className="font-bold text-amber-300 text-sm">{selectedLibItem.typicalDose}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase">Aromatization</div>
                  <div className="font-bold text-emerald-400 text-sm">{selectedLibItem.aromatization}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-400 uppercase text-[11px]">Primary Pharmacology & Application:</h4>
                <p className="text-slate-200 leading-relaxed">{selectedLibItem.primaryApplication}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="font-bold text-cyan-400 uppercase text-[11px]">Classic Physique Strategic Role:</h4>
                <p className="text-slate-200 leading-relaxed">{selectedLibItem.classicPhysiqueUtility}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase text-[11px]">Organ Risk Profile & Harm Reduction:</h4>
                <p className="text-slate-300 leading-relaxed">{selectedLibItem.organRiskProfile}</p>
                <div className="pt-2 border-t border-slate-800/80 text-slate-400">
                  🛡️ <strong>Mandatory Ancillaries:</strong> {selectedLibItem.mandatoryAncillaries}
                </div>
              </div>

              {selectedLibItem.tradeNames.length > 0 && (
                <div className="text-[11px] text-slate-400">
                  <strong>Common Trade / Pharma Names:</strong> {selectedLibItem.tradeNames.join(', ')}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedLibItem(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleAddFromLibrary(selectedLibItem);
                  setSelectedLibItem(null);
                }}
                className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
              >
                <Plus className="w-4 h-4" />
                Add to My Active Protocol
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log Injection Modal */}
      {isLogInjectionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#12141c] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                Log Injection Pin
              </h3>
              <button onClick={() => setIsLogInjectionOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateInjection} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Target Injection Site</label>
                <select
                  value={newInj.site}
                  onChange={(e) => setNewInj({ ...newInj, site: e.target.value as InjectionSite })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-cyan-400 focus:outline-none"
                >
                  {injectionSites.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Compounds & Doses In Barrel</label>
                <input 
                  type="text" 
                  value={newInj.compounds} 
                  onChange={(e) => setNewInj({ ...newInj, compounds: e.target.value })}
                  placeholder="e.g. Testosterone Enanthate (250mg) + Primo (200mg)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Total Volume (ml)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={newInj.volumeMl} 
                    onChange={(e) => setNewInj({ ...newInj, volumeMl: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Post-Injection Pain (1-5)</label>
                  <select
                    value={newInj.painRating}
                    onChange={(e) => setNewInj({ ...newInj, painRating: Number(e.target.value) as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-cyan-400 focus:outline-none"
                  >
                    <option value={1}>1 - Completely Painless</option>
                    <option value={2}>2 - Minor Soreness</option>
                    <option value={3}>3 - Noticeable Knot</option>
                    <option value={4}>4 - High PIP</option>
                    <option value={5}>5 - Severe</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Needle Gauge & Notes</label>
                <input 
                  type="text" 
                  value={newInj.notes} 
                  onChange={(e) => setNewInj({ ...newInj, notes: e.target.value })}
                  placeholder="e.g. 25G 1-inch, smooth aspiration, zero blood"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setIsLogInjectionOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold"
                >
                  Save Pin Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Custom Compound Modal */}
      {isAddCompoundOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#12141c] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                Add Custom Compound to Protocol
              </h3>
              <button onClick={() => setIsAddCompoundOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateCompound} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Compound Name</label>
                <input 
                  type="text" 
                  value={newCompound.name} 
                  onChange={(e) => setNewCompound({ ...newCompound, name: e.target.value })}
                  placeholder="e.g. Masteron Enanthate"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Category</label>
                  <select 
                    value={newCompound.category} 
                    onChange={(e) => setNewCompound({ ...newCompound, category: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="AAS">Anabolic Steroid (AAS)</option>
                    <option value="GH_Secretagogue">Growth Hormone / Peptide</option>
                    <option value="Thyroid_FatBurner">Thyroid / Thermogenic</option>
                    <option value="Ancillary_AI">Aromatase Inhibitor / SERM</option>
                    <option value="Organ_Support">Organ & Cardiovascular Defense</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Dosage & Unit</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={newCompound.dose} 
                      onChange={(e) => setNewCompound({ ...newCompound, dose: e.target.value })}
                      className="w-2/3 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-cyan-400 focus:outline-none"
                      required
                    />
                    <select 
                      value={newCompound.unit} 
                      onChange={(e) => setNewCompound({ ...newCompound, unit: e.target.value as any })}
                      className="w-1/3 bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-white font-medium focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="mg">mg</option>
                      <option value="mcg">mcg</option>
                      <option value="IU">IU</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Frequency</label>
                  <select 
                    value={newCompound.frequency} 
                    onChange={(e) => setNewCompound({ ...newCompound, frequency: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-white font-medium focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Every Day">Every Day</option>
                    <option value="EOD">EOD (Every Other Day)</option>
                    <option value="Twice Weekly">Twice Weekly</option>
                    <option value="Weekly">Weekly</option>
                    <option value="As Needed">As Needed</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Administration Route</label>
                  <select 
                    value={newCompound.route} 
                    onChange={(e) => setNewCompound({ ...newCompound, route: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-white font-medium focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Intramuscular">Intramuscular (IM)</option>
                    <option value="Subcutaneous">Subcutaneous (SubQ)</option>
                    <option value="Oral">Oral</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Est. Half-Life (days)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={newCompound.halfLifeDays} 
                    onChange={(e) => setNewCompound({ ...newCompound, halfLifeDays: parseFloat(e.target.value) || 1 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Biomarker / Rationale Notes</label>
                <input 
                  type="text" 
                  value={newCompound.notes} 
                  onChange={(e) => setNewCompound({ ...newCompound, notes: e.target.value })}
                  placeholder="e.g. Hardening agent, maintain E2 in 25-35 range"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setIsAddCompoundOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold"
                >
                  Add Compound
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

