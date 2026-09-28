import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { WorkoutSession, WorkoutExercise } from '../types';
import { 
  AM_PM_WEEKLY_SPLIT, 
  MUSCLE_4X_FREQUENCY_AUDIT, 
  AmPmScheduledDay 
} from '../data/amPmSplitSchedule';
import { 
  Dumbbell, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Flame, 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Trophy, 
  Sparkles, 
  Sun, 
  Moon, 
  Pill, 
  Zap, 
  Activity, 
  ShieldCheck, 
  Check, 
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';

export const TrainingTab: React.FC = () => {
  const { workouts, addWorkoutSession, toggleWorkoutComplete } = useApp();

  // Active Day selector (default to Day 1: Monday)
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const activeDay: AmPmScheduledDay = AM_PM_WEEKLY_SPLIT[selectedDayIndex] || AM_PM_WEEKLY_SPLIT[0];

  // Interactive Stomach vacuum stopwatch state
  const [vacuumTime, setVacuumTime] = useState(0);
  const [isVacuumRunning, setIsVacuumRunning] = useState(false);
  const [vacuumHistory, setVacuumHistory] = useState<number[]>([35, 42, 40]);

  // Session completion state tracking for local UI interaction
  const [completedSessions, setCompletedSessions] = useState<{ [key: string]: boolean }>({});
  const [completedExercises, setCompletedExercises] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    let interval: any = null;
    if (isVacuumRunning) {
      interval = setInterval(() => {
        setVacuumTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isVacuumRunning]);

  const handleVacuumReset = () => {
    setIsVacuumRunning(false);
    if (vacuumTime > 5) {
      setVacuumHistory(prev => [vacuumTime, ...prev]);
    }
    setVacuumTime(0);
  };

  const toggleExerciseCheck = (exerciseId: string) => {
    setCompletedExercises(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  const handleLogAmPmSession = (
    sessionData: NonNullable<AmPmScheduledDay['amSession'] | AmPmScheduledDay['pmSession']>,
    slot: 'AM' | 'PM'
  ) => {
    const sessionKey = `${activeDay.dayName}_${slot}`;
    const newSession: WorkoutSession = {
      id: `w_ampm_${Date.now()}`,
      dayName: `${activeDay.dayName} ${slot}: ${sessionData.title}`,
      split: sessionData.title,
      sessionSlot: slot,
      stimulusType: sessionData.stimulus,
      targetMuscleGroups: sessionData.targetMuscles,
      date: new Date().toISOString().split('T')[0],
      durationMinutes: 65,
      completed: true,
      cardioMinutes: sessionData.cardioMin,
      cardioType: 'Fasted Incline Treadmill',
      vacuumSeconds: sessionData.vacuumSeconds,
      oralPreWorkoutTaken: sessionData.suggestedOralTiming,
      exercises: sessionData.exercises.map(ex => ({
        ...ex,
        completed: completedExercises[ex.id] || true
      }))
    };

    addWorkoutSession(newSession);
    setCompletedSessions(prev => ({ ...prev, [sessionKey]: true }));
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* ========================================================= */}
      {/* 4X FREQUENCY AM/PM HEADER BANNER                          */}
      {/* ========================================================= */}
      <div className="border border-indigo-500/30 rounded-2xl bg-gradient-to-r from-slate-900 via-[#130f26] to-slate-900 p-6 lg:p-8 relative overflow-hidden shadow-xl shadow-indigo-500/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-black uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              4X WEEKLY FREQUENCY AM/PM SPLIT ARCHITECTURE
            </div>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white uppercase">
              HIGH-FREQUENCY HYPERTROPHY ENGINE
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every single muscle group is stimulated <strong className="text-amber-400 font-black">4 times every 7 days</strong> via dual daily sessions (AM Upper body, PM Lower body). Precision volume (6–10 brutal sets/session) paired with AM/PM oral pre-workout fueling (Dbol/Anadrol) accelerates the 74 kg to 103 kg mass accretion curve.
            </p>
          </div>

          {/* Quick Frequency Badge */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 space-y-1.5 text-center min-w-[200px]">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Weekly Muscle Frequency</div>
            <div className="text-2xl font-black text-amber-400 flex items-center justify-center gap-1.5">
              <span>4.0×</span>
              <span className="text-xs font-bold text-slate-400">/ muscle / week</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold flex items-center justify-center gap-1">
              <Check className="w-3 h-3 text-emerald-400" />
              8 Sessions • 4 Double Days
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4X FREQUENCY MUSCLE AUDIT ACCORDION / SUMMARY             */}
      {/* ========================================================= */}
      <div className="card-gloss rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-black text-white uppercase tracking-wider">
              Weekly Muscle Frequency Matrix (Every Muscle Hit 4x)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            8 Total Sessions / Week
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MUSCLE_4X_FREQUENCY_AUDIT.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-indigo-500/30 transition-colors space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-white">{item.muscle}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {item.weeklyHits}× / wk
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {item.sessions.map((s, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="text-[10px] text-slate-400 line-clamp-1 italic">
                {item.classicImpact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* DAY-BY-DAY SCHEDULE NAVIGATOR (MON - SUN)                 */}
      {/* ========================================================= */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {AM_PM_WEEKLY_SPLIT.map((day, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <button
                key={day.dayNumber}
                onClick={() => setSelectedDayIndex(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/50'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{day.dayName}</span>
                {day.isRestDay ? (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Rest
                  </span>
                ) : (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    2× Sessions
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Day Recovery Protocol Callout */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Day {activeDay.dayNumber} Protocol Note: </strong>
            <span className="text-slate-300">{activeDay.recoveryNotes}</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* REST DAY DISPLAY                                          */}
        {/* ========================================================= */}
        {activeDay.isRestDay ? (
          <div className="card-gloss rounded-2xl p-8 border border-dashed border-slate-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white uppercase">{activeDay.dayName}: Systemic Growth & Glycogen Deload</h3>
              <p className="text-xs text-slate-400 max-w-lg mx-auto mt-1 leading-relaxed">
                No lifting sessions today. 4x weekly frequency requires aggressive recovery to trigger muscle protein synthesis. Perform 35 mins fasted zone 2 incline treadmill + 4 sets of 40s stomach vacuum holds.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-300 font-bold">
              <Check className="w-4 h-4 text-emerald-400" />
              Sleep 9+ Hours • 6 High Protein / High Carb Meals • Full Hydration
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* DOUBLE SPLIT: AM & PM WORKOUT PANELS                      */
          /* ========================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AM SESSION PANEL */}
            {activeDay.amSession && (
              <div className="card-gloss rounded-2xl p-5 border border-slate-800 hover:border-amber-500/30 transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        <Sun className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                          SESSION 1 • MORNING DRIVE (08:30)
                        </span>
                        <h4 className="text-base font-black text-white">{activeDay.amSession.title}</h4>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      {activeDay.amSession.stimulus}
                    </span>
                  </div>

                  {/* Focus Description */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeDay.amSession.focus}
                  </p>

                  {/* Oral Pre-Workout Fueling Recommendation */}
                  <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-purple-300 font-black text-[11px] uppercase">
                      <Pill className="w-3.5 h-3.5 text-purple-400" />
                      AM Oral Pre-Workout Dosing (Dbol / Anadrol):
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {activeDay.amSession.suggestedOralTiming}
                    </p>
                  </div>

                  {/* Target Muscles */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Target Muscles:</span>
                    {activeDay.amSession.targetMuscles.map((m, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {m}
                      </span>
                    ))}
                  </div>

                  {/* Exercise List */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Prescribed Exercises ({activeDay.amSession.exercises.length})
                    </div>
                    {activeDay.amSession.exercises.map((ex) => {
                      const isChecked = completedExercises[ex.id];
                      return (
                        <div
                          key={ex.id}
                          onClick={() => toggleExerciseCheck(ex.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isChecked
                              ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-300'
                              : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-white'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExerciseCheck(ex.id);
                              }}
                              className="mt-0.5 text-slate-400 hover:text-white"
                            >
                              {isChecked ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Circle className="w-4 h-4" />
                              )}
                            </button>
                            <div>
                              <div className={`text-xs font-black ${isChecked ? 'line-through text-slate-400' : 'text-white'}`}>
                                {ex.name}
                              </div>
                              <div className="text-[10px] text-slate-400 mt-0.5">
                                {ex.targetSets} sets × {ex.targetReps} • Working: <strong className="text-cyan-400">{ex.workingWeight} lbs</strong> (RPE {ex.rpe})
                              </div>
                              {ex.notes && (
                                <div className="text-[10px] text-amber-400/90 italic mt-0.5">
                                  {ex.notes}
                                </div>
                              )}
                            </div>
                          </div>

                          {ex.isPR && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 flex-shrink-0">
                              PR Focus
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* AM Session Action */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div className="text-[10px] text-slate-400">
                    Cardio: <strong className="text-white">{activeDay.amSession.cardioMin}m</strong> • Vacuum: <strong className="text-amber-400">{activeDay.amSession.vacuumSeconds}s</strong>
                  </div>
                  <button
                    onClick={() => handleLogAmPmSession(activeDay.amSession!, 'AM')}
                    disabled={completedSessions[`${activeDay.dayName}_AM`]}
                    className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      completedSessions[`${activeDay.dayName}_AM`]
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                        : 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20'
                    }`}
                  >
                    {completedSessions[`${activeDay.dayName}_AM`] ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        AM Completed
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Log AM Session Complete
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* PM SESSION PANEL */}
            {activeDay.pmSession && (
              <div className="card-gloss rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        <Moon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400">
                          SESSION 2 • EVENING OVERLOAD (17:30)
                        </span>
                        <h4 className="text-base font-black text-white">{activeDay.pmSession.title}</h4>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      {activeDay.pmSession.stimulus}
                    </span>
                  </div>

                  {/* Focus Description */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeDay.pmSession.focus}
                  </p>

                  {/* Oral Pre-Workout Fueling Recommendation */}
                  <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-purple-300 font-black text-[11px] uppercase">
                      <Pill className="w-3.5 h-3.5 text-purple-400" />
                      PM Oral Pre-Workout Dosing (Dbol / Anadrol):
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {activeDay.pmSession.suggestedOralTiming}
                    </p>
                  </div>

                  {/* Target Muscles */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Target Muscles:</span>
                    {activeDay.pmSession.targetMuscles.map((m, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {m}
                      </span>
                    ))}
                  </div>

                  {/* Exercise List */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Prescribed Exercises ({activeDay.pmSession.exercises.length})
                    </div>
                    {activeDay.pmSession.exercises.map((ex) => {
                      const isChecked = completedExercises[ex.id];
                      return (
                        <div
                          key={ex.id}
                          onClick={() => toggleExerciseCheck(ex.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isChecked
                              ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-300'
                              : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-white'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExerciseCheck(ex.id);
                              }}
                              className="mt-0.5 text-slate-400 hover:text-white"
                            >
                              {isChecked ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Circle className="w-4 h-4" />
                              )}
                            </button>
                            <div>
                              <div className={`text-xs font-black ${isChecked ? 'line-through text-slate-400' : 'text-white'}`}>
                                {ex.name}
                              </div>
                              <div className="text-[10px] text-slate-400 mt-0.5">
                                {ex.targetSets} sets × {ex.targetReps} • Working: <strong className="text-cyan-400">{ex.workingWeight} lbs</strong> (RPE {ex.rpe})
                              </div>
                              {ex.notes && (
                                <div className="text-[10px] text-cyan-400/90 italic mt-0.5">
                                  {ex.notes}
                                </div>
                              )}
                            </div>
                          </div>

                          {ex.isPR && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex-shrink-0">
                              PR Focus
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* PM Session Action */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div className="text-[10px] text-slate-400">
                    Cardio: <strong className="text-white">{activeDay.pmSession.cardioMin}m</strong> • Vacuum: <strong className="text-amber-400">{activeDay.pmSession.vacuumSeconds}s</strong>
                  </div>
                  <button
                    onClick={() => handleLogAmPmSession(activeDay.pmSession!, 'PM')}
                    disabled={completedSessions[`${activeDay.dayName}_PM`]}
                    className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      completedSessions[`${activeDay.dayName}_PM`]
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                    }`}
                  >
                    {completedSessions[`${activeDay.dayName}_PM`] ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        PM Completed
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Log PM Session Complete
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* CLASSIC STOMACH VACUUM TRAINER (TRANSVERSE ABDOMINIS)      */}
      {/* ========================================================= */}
      <div className="card-gloss rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
              <Timer className="w-5 h-5 text-amber-400" />
              Classic Transverse Abdominis (Stomach Vacuum) Trainer
            </h3>
            <p className="text-xs text-slate-400">
              Mandatory morning protocol: Expel 100% of air from lungs, pull belly button back against spine, lock ribcage high. Hold for 30–45 seconds. Builds the razor-thin 28-inch vacuum waistline.
            </p>
          </div>

          {/* Stopwatch Controls */}
          <div className="flex items-center gap-3">
            <div className="font-mono text-3xl font-black text-amber-400 bg-black/60 px-4 py-2 rounded-xl border border-amber-500/30 min-w-[90px] text-center">
              {vacuumTime}s
            </div>
            <button
              onClick={() => setIsVacuumRunning(!isVacuumRunning)}
              className={`p-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors ${
                isVacuumRunning 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-amber-500 hover:bg-amber-400 text-black'
              }`}
            >
              {isVacuumRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={handleVacuumReset}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Save & Reset"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Vacuum Recent Sets */}
        <div className="flex items-center gap-3 pt-2 text-xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Today&apos;s Vacuum Sets:</span>
          {vacuumHistory.map((sec, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono font-bold">
              Set {idx + 1}: {sec}s hold
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
