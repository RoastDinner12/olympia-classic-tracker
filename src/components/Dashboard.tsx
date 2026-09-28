import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Trophy, 
  Flame, 
  Scale, 
  Syringe, 
  Utensils, 
  CheckCircle2, 
  Circle, 
  HeartPulse, 
  Timer, 
  TrendingDown, 
  ShieldAlert, 
  ChevronRight,
  PlusCircle,
  Clock,
  Sparkles,
  Zap
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const Dashboard: React.FC = () => {
  const { 
    profile, 
    setActiveTab, 
    currentAgeYears, 
    ageAtShowYears, 
    daysUntilShow, 
    weightDeltaToCap,
    meals,
    toggleMealEaten,
    compounds,
    toggleCompoundLogged,
    biomarkers,
    workouts,
    adherenceScore,
    measurements,
    updateProfile
  } = useApp();

  const [weightInput, setWeightInput] = useState('');
  const [quickWeightOpen, setQuickWeightOpen] = useState(false);

  const isAheadOfCBum = ageAtShowYears < 24.8;
  const isAheadOfArnold = ageAtShowYears < 23.2;

  const latestBio = biomarkers[0];
  const isBPOptimal = latestBio && latestBio.bpSystolic <= 125 && latestBio.bpDiastolic <= 80;

  // Weight trend data
  const weightTrendData = [...measurements].reverse().map(m => ({
    date: m.date.slice(5),
    weight: m.weight,
    cap: profile.stageWeightCap
  }));

  const handleQuickWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(weightInput);
    if (!isNaN(val) && val > 0) {
      updateProfile({ currentWeight: val });
      setQuickWeightOpen(false);
      setWeightInput('');
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Hero Banner: The Pursuit of History */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-black via-[#141208] to-[#1c1808] p-6 lg:p-8 shadow-2xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
              <Trophy className="w-4 h-4 text-amber-400" />
              DESTINY BLUEPRINT // THE YOUNGEST CLASSIC WINNER
            </div>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white uppercase font-['Plus_Jakarta_Sans']">
              CHRIS BUMSTEAD WON AT <span className="text-amber-400">24.8 YEARS</span>.
              <br />
              <span className="text-slate-200">YOU STEP ON STAGE AT </span>
              <span className="gold-text-gradient">{ageAtShowYears} YEARS OLD</span>.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every single meal, compound titration, vacuum session, and biomarker reading is engineered to bring a historic, flawless Classic Physique to the Olympia stage ahead of any man in bodybuilding history.
            </p>
          </div>

          {/* Countdown & Pace Widget */}
          <div className="flex flex-row lg:flex-col items-center justify-center gap-4 bg-slate-950/70 p-5 rounded-xl border border-amber-500/30 shrink-0">
            <div className="text-center">
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">Contest Countdown</div>
              <div className="text-3xl lg:text-4xl font-black text-white font-mono">{daysUntilShow} <span className="text-sm text-slate-400">DAYS</span></div>
            </div>
            <div className="h-8 lg:h-px w-px lg:w-full bg-slate-800" />
            <div className="text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Record Pace</div>
              <div className="text-xs font-bold mt-0.5">
                {isAheadOfCBum ? (
                  <span className="text-emerald-400 font-mono">{(24.8 - ageAtShowYears).toFixed(1)} YEARS YOUNGER THAN C-BUM</span>
                ) : (
                  <span className="text-amber-400 font-mono">AT PEAK OLYMPIA AGE</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Scale vs Weight Cap */}
        <div 
          onClick={() => setActiveTab('matrix')}
          className="card-gloss rounded-xl p-4 cursor-pointer hover:border-amber-500/50 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              IFBB Weight Cap
            </span>
            <span className="text-[11px] text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center">
              Matrix <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="text-2xl font-black text-white font-mono">{profile.currentWeight} <span className="text-xs text-slate-400">lbs</span></div>
            <div className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-emerald-500/30">
              Cap: {profile.stageWeightCap} lbs
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>To Stage Limit:</span>
            <span className={`font-mono font-bold ${weightDeltaToCap <= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {weightDeltaToCap > 0 ? `-${weightDeltaToCap} lbs to drop` : `+${Math.abs(weightDeltaToCap)} lbs headroom`}
            </span>
          </div>
        </div>

        {/* Daily Championship Adherence */}
        <div 
          onClick={() => setActiveTab('nutrition')}
          className="card-gloss rounded-xl p-4 cursor-pointer hover:border-amber-500/50 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Daily Adherence
            </span>
            <span className="text-[11px] text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center">
              Diet <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="text-2xl font-black text-white font-mono">{adherenceScore}%</div>
            <div className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
              {adherenceScore >= 80 ? 'ELITE EXECUTION' : 'INCOMPLETE'}
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Meals Logged:</span>
            <span className="font-mono text-slate-200">
              {meals.filter(m => m.isEaten).length} / {meals.length} meals
            </span>
          </div>
        </div>

        {/* PED Protocol Today */}
        <div 
          onClick={() => setActiveTab('peds')}
          className="card-gloss rounded-xl p-4 cursor-pointer hover:border-amber-500/50 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase flex items-center gap-1.5">
              <Syringe className="w-3.5 h-3.5 text-cyan-400" />
              PEDs & Protection
            </span>
            <span className="text-[11px] text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center">
              Protocol <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="text-2xl font-black text-white font-mono">
              {compounds.filter(c => c.currentActive && c.logsToday).length} / {compounds.filter(c => c.currentActive && c.frequency !== 'As Needed').length}
            </div>
            <div className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              ON CYCLE
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Organ Defense:</span>
            <span className="font-mono text-emerald-400">TUDCA / Telmi Active</span>
          </div>
        </div>

        {/* Blood Pressure & Vitals */}
        <div 
          onClick={() => setActiveTab('biomarkers')}
          className="card-gloss rounded-xl p-4 cursor-pointer hover:border-rose-500/50 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold uppercase flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
              Cardiovascular Vitals
            </span>
            <span className="text-[11px] text-rose-400 group-hover:translate-x-0.5 transition-transform flex items-center">
              Labs <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="text-2xl font-black text-white font-mono">
              {latestBio ? `${latestBio.bpSystolic}/${latestBio.bpDiastolic}` : '118/74'} <span className="text-xs text-slate-400">mmHg</span>
            </div>
            <div className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${isBPOptimal ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30' : 'bg-rose-950 text-rose-400 border border-rose-500/30'}`}>
              {isBPOptimal ? 'OPTIMAL' : 'ELEVATED'}
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Fasted RHR:</span>
            <span className="font-mono text-slate-200">{latestBio?.restingHeartRate || 54} BPM</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section: Checklist on Left, Analytics & Telemetry on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Today's High-Priority Execution Checklist */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Protocol Checklist */}
          <div className="card-gloss rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-black text-white text-lg tracking-wide uppercase flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400" />
                  Today&apos;s Olympia Execution Checklist
                </h3>
                <p className="text-xs text-slate-400">Zero compromises. Tap item to mark complete.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuickWeightOpen(!quickWeightOpen)}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  Quick Weight
                </button>
              </div>
            </div>

            {/* Quick Weight Input Drawer */}
            {quickWeightOpen && (
              <form onSubmit={handleQuickWeightSubmit} className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 flex items-center gap-3">
                <label className="text-xs text-slate-300 font-semibold">Today&apos;s Morning Fasted Weight (lbs):</label>
                <input 
                  type="number" 
                  step="0.1" 
                  placeholder={profile.currentWeight.toString()} 
                  value={weightInput} 
                  onChange={(e) => setWeightInput(e.target.value)}
                  className="w-28 bg-black border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono text-sm focus:border-amber-400 focus:outline-none"
                  autoFocus
                />
                <button type="submit" className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-lg transition-colors">
                  Update Scale
                </button>
              </form>
            )}

            {/* Meals Checklist */}
            <div className="mt-5 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Utensils className="w-3.5 h-3.5 text-orange-400" />
                Nutrition & Meal Schedule ({meals.filter(m => m.isEaten).length}/{meals.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {meals.map((meal) => (
                  <div
                    key={meal.id}
                    onClick={() => toggleMealEaten(meal.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                      meal.isEaten 
                        ? 'bg-slate-900/40 border-emerald-500/30 opacity-75' 
                        : 'bg-[#151722] border-slate-800 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {meal.isEaten ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                        )}
                        <span className={`text-xs font-bold ${meal.isEaten ? 'line-through text-slate-400' : 'text-white'}`}>
                          {meal.timing}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 pl-6">{meal.name}</p>
                      <div className="text-[10px] text-amber-300 font-mono pl-6">
                        {meal.calories} kcal • {meal.protein}g P • {meal.carbs}g C • {meal.fats}g F
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily PED & Health Support Checklist */}
            <div className="mt-6 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Syringe className="w-3.5 h-3.5 text-cyan-400" />
                Compounds & Organ Protection Schedule ({compounds.filter(c => c.currentActive && c.logsToday).length}/{compounds.filter(c => c.currentActive && c.frequency !== 'As Needed').length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {compounds.filter(c => c.currentActive).map((compound) => (
                  <div
                    key={compound.id}
                    onClick={() => toggleCompoundLogged(compound.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-2 ${
                      compound.logsToday 
                        ? 'bg-slate-900/40 border-cyan-500/30 opacity-75' 
                        : 'bg-[#151722] border-slate-800 hover:border-cyan-500/40'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        {compound.logsToday ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-slate-600" />
                        )}
                        <span className={compound.logsToday ? 'line-through text-slate-400' : 'text-slate-200'}>
                          {compound.name.split(' ')[0]}
                        </span>
                      </div>
                      <div className="text-[10px] text-cyan-300 font-mono pl-5">
                        {compound.dose} {compound.unit} ({compound.timing})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Cardio & Vacuum Status */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-slate-900 to-[#141824] border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                  <Timer className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Classic Stomach Vacuum Training</div>
                  <div className="text-[11px] text-slate-400">Target: 3-5 sets of 30-45s holds for 29&quot; waistline</div>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('physique')}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold transition-colors"
              >
                Launch Vacuum Timer
              </button>
            </div>
          </div>

          {/* Weight Trajectory vs Official Cap Chart */}
          <div className="card-gloss rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-black text-white text-base tracking-wide uppercase flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-emerald-400" />
                  Prep Weight Trajectory vs IFBB Weight Cap
                </h3>
                <p className="text-xs text-slate-400">Official 6&apos;0&quot; limit: {profile.stageWeightCap} lbs</p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Scale Weight
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> IFBB Cap
                </span>
              </div>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weightTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis domain={['dataMin - 3', 'dataMax + 3']} stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Area type="monotone" dataKey="weight" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#weightGrad)" />
                  <Area type="monotone" dataKey="cap" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Historical Comparison, Organ Safety & Next Pin */}
        <div className="space-y-6">
          {/* Youngest Olympia Winners Benchmark */}
          <div className="card-gloss rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h3 className="font-black text-white text-base tracking-wide uppercase">
                Historic Hall of Legends
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Your age on show date: <strong className="text-amber-300 font-mono">{ageAtShowYears} years</strong>
            </p>

            <div className="space-y-3">
              {/* CBum Benchmark */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Chris Bumstead</span>
                  <span className="text-xs font-mono font-bold text-amber-400">24.8 yrs</span>
                </div>
                <div className="text-[11px] text-slate-400">2019 Classic Olympia Win #1</div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
                  <div 
                    className="bg-amber-400 h-1.5 rounded-full" 
                    style={{ width: `${Math.min(100, (ageAtShowYears / 24.8) * 100)}%` }}
                  />
                </div>
                <div className="text-[10px] text-emerald-400 font-mono font-semibold pt-0.5">
                  {ageAtShowYears < 24.8 ? `🏆 Will surpass C-Bum by ${(24.8 - ageAtShowYears).toFixed(1)} years` : 'Equal age tier'}
                </div>
              </div>

              {/* Arnold Benchmark */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Arnold Schwarzenegger</span>
                  <span className="text-xs font-mono font-bold text-slate-300">23.2 yrs</span>
                </div>
                <div className="text-[11px] text-slate-400">1970 Mr. Olympia (Youngest in History)</div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
                  <div 
                    className="bg-yellow-500 h-1.5 rounded-full" 
                    style={{ width: `${Math.min(100, (ageAtShowYears / 23.2) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Lee Haney */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Lee Haney</span>
                  <span className="text-xs font-mono font-bold text-slate-300">24.9 yrs</span>
                </div>
                <div className="text-[11px] text-slate-400">1984 Mr. Olympia Win #1</div>
              </div>
            </div>
          </div>

          {/* Biomarker Safety Sentinel */}
          <div className="card-gloss rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-emerald-400" />
                <h3 className="font-black text-white text-base tracking-wide uppercase">
                  Biomarker Sentinel
                </h3>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Safe
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Longevity & organ defense ensures sustained peak physical output.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400">Blood Pressure:</span>
                <span className="font-mono font-bold text-emerald-400">{latestBio?.bpSystolic}/{latestBio?.bpDiastolic} mmHg</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400">Fasted Glucose:</span>
                <span className="font-mono font-bold text-slate-200">{latestBio?.fastingBloodGlucose} mg/dL</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400">Kidney (eGFR):</span>
                <span className="font-mono font-bold text-emerald-400">{latestBio?.egfrKidney} mL/min (Optimal)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400">Liver (AST / ALT):</span>
                <span className="font-mono font-bold text-emerald-400">{latestBio?.astLiver} / {latestBio?.altLiver} U/L</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                <span className="text-slate-400">Hematocrit (RBC):</span>
                <span className="font-mono font-bold text-slate-200">{latestBio?.hematocritPct}% (Within limit)</span>
              </div>
            </div>

            <button 
              onClick={() => setActiveTab('biomarkers')}
              className="w-full mt-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
            >
              Full Bloodwork Panel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
