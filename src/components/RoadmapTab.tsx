import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Milestone, 
  Trophy, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Flame, 
  TrendingUp, 
  Scale, 
  Zap, 
  ShieldCheck,
  ChevronRight,
  Clock
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { CountdownClock } from './CountdownClock';

export const RoadmapTab: React.FC = () => {
  const { 
    roadmap, 
    toggleRoadmapComplete, 
    currentAgeYears, 
    ageAtShowYears, 
    daysUntilShow,
    profile 
  } = useApp();

  const phase1 = roadmap.filter(r => r.category.includes('Phase 1'));
  const phase2 = roadmap.filter(r => r.category.includes('Phase 2'));

  // 22-Month Mass Accretion Projection: Starting at 74 kg (163 lbs) up to 103 kg (227 lbs)!
  const projectionData = [
    { month: 'Sep 26 (M0)', weightLbs: 163, weightKg: 74, capLbs: 227, capKg: 103, event: 'Start (74 kg)' },
    { month: 'Dec 26 (M3)', weightLbs: 178, weightKg: 81, capLbs: 227, capKg: 103, event: 'Initial Surge (+7 kg)' },
    { month: 'Apr 27 (M7)', weightLbs: 198, weightKg: 90, capLbs: 227, capKg: 103, event: 'Blast 1 Peak (90 kg)' },
    { month: 'Jun 27 (M9)', weightLbs: 194, weightKg: 88, capLbs: 227, capKg: 103, event: 'Organ Cruise (88 kg)' },
    { month: 'Nov 27 (M14)', weightLbs: 236, weightKg: 107, capLbs: 227, capKg: 103, event: 'Offseason Peak (107 kg)' },
    { month: 'Feb 28 (M17)', weightLbs: 230, weightKg: 104, capLbs: 227, capKg: 103, event: 'Contest Prep Cut' },
    { month: 'Mar 28 (M18)', weightLbs: 227, weightKg: 103, capLbs: 227, capKg: 103, event: 'WIN PRO CARD (103 kg)' },
    { month: 'May 28 (M20)', weightLbs: 227, weightKg: 103, capLbs: 227, capKg: 103, event: 'Pro Debut Win' },
    { month: 'Jul 28 (M22)', weightLbs: 227, weightKg: 103, capLbs: 227, capKg: 103, event: 'OLYMPIA CORONATION' }
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* 22-Month Live Ticking Countdown Clock */}
      <CountdownClock />

      {/* 22-Month Target Weight & Stage Trajectory Chart */}
      <div className="card-gloss rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white uppercase flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              22-Month Lean Mass Trajectory (74 kg → 103 kg Stage Cap)
            </h3>
            <p className="text-xs text-slate-400">
              Disciplined anabolic surplus building +29.0 kg (+63.9 lbs) of dense muscle tissue to max out the 6&apos;0&quot; IFBB Classic frame.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-amber-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Planned Scale (kg)
            </span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Stage Cap (103 kg / 227 lbs)
            </span>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="projGradKg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis domain={[70, 110]} stroke="#64748b" fontSize={11} tickLine={false} unit="kg" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                formatter={(val: any, name: string) => [
                  name === 'weightKg' ? `${val} kg (${Math.round(Number(val) * 2.20462)} lbs)` : `${val} kg (227 lbs)`,
                  name === 'weightKg' ? 'Athlete Scale' : 'IFBB Cap'
                ]}
              />
              <Area type="monotone" dataKey="weightKg" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#projGradKg)" />
              <Area type="monotone" dataKey="capKg" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" fillOpacity={0} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Phase 1: 14-Month Disciplined Mass & Symmetry Build */}
      <div className="card-gloss rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
              PHASE 1 (14 MONTHS)
            </span>
            <h3 className="font-bold text-white text-base uppercase">
              Mass Accretion (74 kg → 107 kg Peak Offseason)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Months 1 to 14 (Oct 2026 - Nov 2027)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {phase1.map((p) => (
            <div 
              key={p.id}
              className={`p-5 rounded-xl border transition-all space-y-3 flex flex-col justify-between ${
                p.completed ? 'bg-slate-900/40 border-emerald-500/30' : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                    {p.monthRange}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    p.pedPhase === 'Blast' ? 'bg-cyan-950 text-cyan-400' : 'bg-emerald-950 text-emerald-400'
                  }`}>
                    {p.pedPhase}
                  </span>
                </div>

                <h4 className="font-bold text-white text-sm">{p.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{p.primaryFocus}</p>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Target Milestones:</div>
                  {p.milestones.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-slate-400 text-[11px]">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => toggleRoadmapComplete(p.id)}
                className={`w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  p.completed 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {p.completed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Phase Complete
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-slate-500" />
                    Mark Phase Complete
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Phase 2: 8-Month Competitive Assault & Pro Card */}
      <div className="card-gloss rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-mono font-bold text-xs border border-emerald-500/30">
              PHASE 2 (8 MONTHS)
            </span>
            <h3 className="font-bold text-white text-base uppercase">
              Pro Card Win & Historic Olympia Finals at 103 kg (227 lbs)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Months 15 to 22 (Dec 2027 - Jul 2028)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {phase2.map((p) => (
            <div 
              key={p.id}
              className={`p-5 rounded-xl border transition-all space-y-3 flex flex-col justify-between ${
                p.completed ? 'bg-slate-900/40 border-emerald-500/30' : 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/40'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-300">
                    {p.monthRange}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-300">
                    {p.pedPhase}
                  </span>
                </div>

                <h4 className="font-bold text-white text-sm">{p.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{p.primaryFocus}</p>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Championship Milestones:</div>
                  {p.milestones.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-slate-400 text-[11px]">
                      <span className="text-emerald-400 mt-0.5">🏆</span>
                      <span className="text-slate-200 font-semibold">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => toggleRoadmapComplete(p.id)}
                className={`w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  p.completed 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {p.completed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Championship Milestone Secured
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-slate-500" />
                    Mark Milestone Complete
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
