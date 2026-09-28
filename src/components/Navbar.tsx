import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';
import { 
  Trophy, 
  Flame, 
  Scale, 
  Utensils, 
  Syringe, 
  Dumbbell, 
  Ruler, 
  Activity, 
  CalendarDays, 
  Settings,
  Sparkles,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    profile, 
    updateProfile, 
    currentAgeYears, 
    ageAtShowYears, 
    daysUntilShow, 
    weightDeltaToCap,
    adherenceScore,
    resetToDefaults
  } = useApp();

  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const tabs: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Command Center', icon: <Flame className="w-4 h-4 text-amber-400" /> },
    { id: 'matrix', label: 'IFBB Weight Cap', icon: <Scale className="w-4 h-4 text-emerald-400" />, badge: `${profile.stageWeightCap} lbs` },
    { id: 'nutrition', label: 'Meals & Diet', icon: <Utensils className="w-4 h-4 text-orange-400" /> },
    { id: 'peds', label: 'PED Protocol', icon: <Syringe className="w-4 h-4 text-cyan-400" /> },
    { id: 'training', label: 'Workout & Cardio', icon: <Dumbbell className="w-4 h-4 text-indigo-400" /> },
    { id: 'physique', label: 'Symmetry & Vacuum', icon: <Ruler className="w-4 h-4 text-yellow-400" /> },
    { id: 'biomarkers', label: 'Biomarkers & Labs', icon: <Activity className="w-4 h-4 text-rose-400" /> },
    { id: 'peakweek', label: 'Peak Week', icon: <CalendarDays className="w-4 h-4 text-purple-400" />, badge: 'D-7' },
  ];

  const isAheadOfRecord = ageAtShowYears < profile.recordToBeatAge;
  const ageDelta = Math.abs(profile.recordToBeatAge - ageAtShowYears).toFixed(1);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#0a0c12]/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl">
        {/* Top Ticker Bar */}
        <div className="bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-slate-900 border-b border-amber-500/20 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/30">
              <Trophy className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              OLYMPIA RECORD PURSUIT
            </span>
            <span className="text-slate-300 hidden md:inline">
              Target: <strong className="text-white">{profile.targetShowName}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Youngest Winner Delta */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Record Target:</span>
              <span className="text-slate-300">{profile.recordHolderName}</span>
              <span className={`px-1.5 py-0.5 rounded font-bold text-[11px] ${isAheadOfRecord ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40' : 'bg-rose-950 text-rose-400'}`}>
                {isAheadOfRecord ? `🔥 ${ageDelta}y YOUNGER PACE` : `+${ageDelta}y BEHIND`}
              </span>
            </div>

            {/* Countdown */}
            <div className="bg-slate-800/80 px-2.5 py-0.5 rounded border border-slate-700 font-mono text-amber-300">
              <span className="text-slate-400 mr-1">D-</span>
              <span className="text-sm font-bold">{daysUntilShow}</span> DAYS OUT
            </div>

            <button 
              onClick={() => setShowSettingsModal(true)}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Edit Profile & Targets"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Nav Header */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center font-black text-black text-xl tracking-tighter">
              IFBB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-wider uppercase text-white font-['Plus_Jakarta_Sans']">
                  AEGIS <span className="text-amber-400">CLASSIC</span>
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.2 bg-amber-400/10 text-amber-400 border border-amber-400/30 rounded">
                  Pro Division
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium flex items-center gap-2">
                <span>{profile.name}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300">Age: <strong className="text-amber-300">{currentAgeYears}</strong> yrs</span>
                <span className="text-slate-600">•</span>
                <span>Stage Cap: <strong className="text-emerald-400">{profile.stageWeightCap} lbs</strong></span>
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Scale Status */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-3">
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-400">Current Scale</div>
                <div className="text-sm font-bold text-white font-mono">{profile.currentWeight} <span className="text-xs text-slate-400">lbs</span></div>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-400">Delta To Cap</div>
                <div className={`text-sm font-bold font-mono ${weightDeltaToCap <= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {weightDeltaToCap > 0 ? `+${weightDeltaToCap}` : weightDeltaToCap} <span className="text-xs">lbs</span>
                </div>
              </div>
            </div>

            {/* Daily Adherence */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-2.5">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg className="w-8 h-8 -rotate-90">
                  <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="3" className="text-slate-800" fill="transparent" />
                  <circle 
                    cx="16" 
                    cy="16" 
                    r="13" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeDasharray={2 * Math.PI * 13} 
                    strokeDashoffset={2 * Math.PI * 13 * (1 - adherenceScore / 100)} 
                    className="text-amber-400 transition-all duration-500" 
                    fill="transparent" 
                  />
                </svg>
                <span className="absolute text-[10px] font-bold text-amber-300">{adherenceScore}%</span>
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-400">Protocol Adherence</div>
                <div className="text-xs font-semibold text-slate-200">Execution Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-2 overflow-x-auto scrollbar-none flex items-center gap-1 border-t border-slate-800/60 pb-1 pt-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive ? 'bg-amber-400 text-black' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#12141c] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Athlete Profile & Olympia Target</h3>
              </div>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Competitor Name</label>
                <input 
                  type="text" 
                  value={profile.name} 
                  onChange={(e) => updateProfile({ name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Date of Birth</label>
                  <input 
                    type="date" 
                    value={profile.birthDate} 
                    onChange={(e) => updateProfile({ birthDate: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Target Show Date</label>
                  <input 
                    type="date" 
                    value={profile.targetShowDate} 
                    onChange={(e) => updateProfile({ targetShowDate: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Target Show Title</label>
                <input 
                  type="text" 
                  value={profile.targetShowName} 
                  onChange={(e) => updateProfile({ targetShowName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Height (Feet)</label>
                  <select 
                    value={profile.heightFeet} 
                    onChange={(e) => updateProfile({ heightFeet: parseInt(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-amber-400 focus:outline-none"
                  >
                    {[5, 6].map(f => <option key={f} value={f}>{f} ft</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Height (Inches)</label>
                  <select 
                    value={profile.heightInches} 
                    onChange={(e) => updateProfile({ heightInches: parseInt(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-amber-400 focus:outline-none"
                  >
                    {Array.from({ length: 12 }, (_, i) => i).map(i => (
                      <option key={i} value={i}>{i} in</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Current Weight (lbs)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={profile.currentWeight} 
                    onChange={(e) => updateProfile({ currentWeight: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-lg flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-amber-200/90 text-[11px] leading-relaxed">
                  Official IFBB Pro League Classic Physique weight cap for <strong className="text-white">{profile.heightFeet}&apos;{profile.heightInches}&quot;</strong> is <strong className="text-amber-300 font-bold">{profile.stageWeightCap} lbs</strong>. Your delta is <strong className="text-white">{weightDeltaToCap > 0 ? `+${weightDeltaToCap}` : weightDeltaToCap} lbs</strong>.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button 
                onClick={resetToDefaults}
                className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Sample Data
              </button>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
