import React from 'react';
import { useApp } from '../context/AppContext';
import { IFBB_CLASSIC_LIMITS, HISTORIC_BENCHMARKS } from '../data/ifbbLimits';
import { Scale, Info, Check, ShieldCheck, Trophy, ArrowRight, Sparkles } from 'lucide-react';

export const WeightMatrixTab: React.FC = () => {
  const { profile, updateProfile, daysUntilShow, weightDeltaToCap } = useApp();

  const totalHeightInches = (profile.heightFeet * 12) + profile.heightInches;
  const currentHeightCm = Math.round(totalHeightInches * 2.54);

  // Daily deficit math to make weight
  const lbsToLose = Math.max(0, weightDeltaToCap);
  const weeksLeft = Math.max(1, Math.round(daysUntilShow / 7));
  const lbsPerWeek = (lbsToLose / weeksLeft).toFixed(2);
  const dailyCalDeficit = Math.round((parseFloat(lbsPerWeek) * 3500) / 7);

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="border border-slate-800 rounded-2xl bg-gradient-to-r from-slate-900 via-[#10131d] to-slate-900 p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              OFFICIAL IFBB PRO LEAGUE CLASSIC DIVISION SPECIFICATION
            </div>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white uppercase">
              HEIGHT-TO-WEIGHT CUTOFF MATRIX
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unlike the Open division, Classic Physique is defined by strict weight caps per quarter-inch of height. Stepping on the official check-in scale even 0.1 lbs over results in automatic disqualification.
            </p>
          </div>

          {/* Current Status Box */}
          <div className="bg-slate-950/90 border border-slate-700/80 rounded-xl p-5 shrink-0 space-y-2">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Your Official Tier</div>
            <div className="text-2xl font-black text-amber-400 font-mono">
              {profile.heightFeet}&apos;{profile.heightInches}&quot; <span className="text-sm font-normal text-slate-400">({currentHeightCm} cm)</span>
            </div>
            <div className="flex items-center gap-3 pt-1 border-t border-slate-800 text-xs">
              <div>
                <span className="text-slate-400">Stage Limit: </span>
                <strong className="text-emerald-400 font-mono">{profile.stageWeightCap} lbs</strong>
              </div>
              <div className="h-4 w-px bg-slate-800" />
              <div>
                <span className="text-slate-400">Current Scale: </span>
                <strong className="text-white font-mono">{profile.currentWeight} lbs</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weight Cut Strategy Engine */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-gloss rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase">Weight Delta to Limit</div>
          <div className={`text-2xl font-black font-mono ${weightDeltaToCap <= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {weightDeltaToCap <= 0 ? 'ON WEIGHT' : `+${weightDeltaToCap} lbs to drop`}
          </div>
          <p className="text-[11px] text-slate-400">
            {weightDeltaToCap <= 0 
              ? 'You are currently within official stage boundaries! Focus on muscle fullness and paper-thin skin.' 
              : `Must shed ${weightDeltaToCap} lbs of water and residual fat to step on stage.`}
          </p>
        </div>

        <div className="card-gloss rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase">Required Rate of Loss</div>
          <div className="text-2xl font-black text-white font-mono">
            {lbsPerWeek} <span className="text-xs text-slate-400">lbs / week</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Over {weeksLeft} weeks remaining ({daysUntilShow} days out). Sweet spot for preserving lean tissue is 0.75 - 1.5 lbs/week.
          </p>
        </div>

        <div className="card-gloss rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase">Calculated Daily Deficit</div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            ~{dailyCalDeficit} <span className="text-xs text-slate-400">kcal / day</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Derived through cardio expenditure (e.g. 30-45m stairmaster) + diet titration.
          </p>
        </div>
      </div>

      {/* Official IFBB Table */}
      <div className="card-gloss rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Complete IFBB Pro League Classic Physique Tier Matrix
            </h3>
            <p className="text-xs text-slate-400">Updated with recent official weight bumps to foster dense classic lines.</p>
          </div>
          <div className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            Highlighted row is your active division
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider bg-slate-900/60">
                <th className="py-3 px-4">Height Tier (Feet & Inches)</th>
                <th className="py-3 px-4">Height Range (cm)</th>
                <th className="py-3 px-4">Max Weight (lbs)</th>
                <th className="py-3 px-4">Max Weight (kg)</th>
                <th className="py-3 px-4">Recommended Off-Season (+12%)</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {IFBB_CLASSIC_LIMITS.map((bracket, idx) => {
                const isUserTier = totalHeightInches <= bracket.maxHeightInches && 
                  (idx === 0 || totalHeightInches > IFBB_CLASSIC_LIMITS[idx - 1].maxHeightInches);
                
                const offSeasonMax = Math.round(bracket.weightLimitLbs * 1.12);

                return (
                  <tr 
                    key={bracket.label}
                    className={`transition-colors ${
                      isUserTier 
                        ? 'bg-amber-500/15 font-bold text-amber-200 border-l-4 border-l-amber-400' 
                        : 'hover:bg-slate-900/40 text-slate-300'
                    }`}
                  >
                    <td className="py-3 px-4 font-sans font-semibold flex items-center gap-2">
                      {isUserTier && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                      {bracket.label}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {Math.round(bracket.minHeightInches * 2.54)} - {Math.round(bracket.maxHeightInches * 2.54)} cm
                    </td>
                    <td className="py-3 px-4 text-emerald-400 font-bold text-sm">
                      {bracket.weightLimitLbs} lbs
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {bracket.weightLimitKg} kg
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      ~{offSeasonMax} lbs
                    </td>
                    <td className="py-3 px-4 text-center">
                      {isUserTier ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-400 text-black font-bold uppercase tracking-wider">
                          Your Bracket
                        </span>
                      ) : (
                        <span className="text-slate-600">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Benchmarks Breakdown */}
      <div className="card-gloss rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-black text-white uppercase">
            Historic Young Champions: Height & Weight Case Studies
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HISTORIC_BENCHMARKS.map((legend) => (
            <div key={legend.name} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{legend.name}</h4>
                  <div className="text-xs text-amber-400 font-semibold">{legend.achievement} ({legend.year})</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-400 font-mono">Age: {legend.ageWon} yrs</div>
                  <div className="text-[11px] text-slate-400">{legend.height} • {legend.weight}</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 pt-1 border-t border-slate-800/80 leading-relaxed">
                {legend.significance}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
