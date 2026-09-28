import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BodyMeasurement } from '../types';
import { 
  Ruler, 
  Sparkles, 
  Trophy, 
  Camera, 
  Plus, 
  CheckCircle2, 
  Flame, 
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';

export const PhysiqueTab: React.FC = () => {
  const { measurements, addMeasurement, profile } = useApp();

  const [isAddMeasurementOpen, setIsAddMeasurementOpen] = useState(false);
  const latestMeas = measurements[0] || {
    weight: 234.5,
    waistInches: 29.8,
    chestInches: 51.5,
    shouldersInches: 56.2,
    leftArmInches: 19.8,
    rightArmInches: 20.0,
    leftQuadInches: 28.2,
    rightQuadInches: 28.3,
    leftCalfInches: 18.2,
    rightCalfInches: 18.2,
    neckInches: 18.4,
    frontVacuumHoldSeconds: 42
  };

  const [newM, setNewM] = useState<{
    weight: number;
    waistInches: number;
    chestInches: number;
    shouldersInches: number;
    leftArmInches: number;
    rightArmInches: number;
    leftQuadInches: number;
    rightQuadInches: number;
    leftCalfInches: number;
    rightCalfInches: number;
    neckInches: number;
    frontVacuumHoldSeconds: number;
  }>({
    weight: profile.currentWeight,
    waistInches: latestMeas.waistInches,
    chestInches: latestMeas.chestInches,
    shouldersInches: latestMeas.shouldersInches,
    leftArmInches: latestMeas.leftArmInches,
    rightArmInches: latestMeas.rightArmInches,
    leftQuadInches: latestMeas.leftQuadInches,
    rightQuadInches: latestMeas.rightQuadInches,
    leftCalfInches: latestMeas.leftCalfInches,
    rightCalfInches: latestMeas.rightCalfInches,
    neckInches: latestMeas.neckInches,
    frontVacuumHoldSeconds: latestMeas.frontVacuumHoldSeconds
  });

  // Golden Era Calculations
  // Ideal V-Taper: Shoulder-to-Waist ratio >= 1.618 (The Golden Ratio phi)
  const shoulderToWaistRatio = latestMeas.waistInches > 0 
    ? (latestMeas.shouldersInches / latestMeas.waistInches).toFixed(3) 
    : '1.618';

  const chestToWaistRatio = latestMeas.waistInches > 0 
    ? (latestMeas.chestInches / latestMeas.waistInches).toFixed(2) 
    : '1.70';

  // Classical Trinity: Arms, Calves, Neck should be identical in circumference
  const avgArm = ((latestMeas.leftArmInches + latestMeas.rightArmInches) / 2).toFixed(1);
  const avgCalf = ((latestMeas.leftCalfInches + latestMeas.rightCalfInches) / 2).toFixed(1);
  const neck = latestMeas.neckInches.toFixed(1);

  const mandatoryPoses = [
    { name: "Front Double Bicep", tip: "Flaring lats while pinning heels, vacuum engaged or tight abdominal wall, wrists curled inwards for peaked bicep peak." },
    { name: "Side Chest", tip: "Spike front hamstring/calf, arch thoracic cage upwards, clamp hands together to crush pectoral striations." },
    { name: "Back Double Bicep", tip: "Drive rear delts back, contract lower back Christmas tree, spike one calf into the mat for maximal hamstring sweep." },
    { name: "Abdominal & Thigh", tip: "Extend lead leg with quad feathering, hands interlocked behind head, full exhalation crunch or standing vacuum." },
    { name: "Favorite Classic Pose", tip: "Arnold 3/4 Back Pose, Frank Zane Classic Vacuum, or Bob Paris Archer Pose. Pure artistic grace." }
  ];

  const handleCreateMeasurement = (e: React.FormEvent) => {
    e.preventDefault();
    addMeasurement({
      date: new Date().toISOString().split('T')[0],
      weight: Number(newM.weight),
      bodyFatPct: 6.5,
      waistInches: Number(newM.waistInches),
      chestInches: Number(newM.chestInches),
      shouldersInches: Number(newM.shouldersInches),
      leftArmInches: Number(newM.leftArmInches),
      rightArmInches: Number(newM.rightArmInches),
      leftQuadInches: Number(newM.leftQuadInches),
      rightQuadInches: Number(newM.rightQuadInches),
      leftCalfInches: Number(newM.leftCalfInches),
      rightCalfInches: Number(newM.rightCalfInches),
      neckInches: Number(newM.neckInches),
      frontVacuumHoldSeconds: Number(newM.frontVacuumHoldSeconds)
    });
    setIsAddMeasurementOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="border border-slate-800 rounded-2xl bg-gradient-to-r from-slate-900 via-[#1a1710] to-slate-900 p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-300 text-xs font-bold border border-yellow-500/30">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              THE STEVE REEVES & ARNOLD SYMMETRY CODE
            </div>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white uppercase">
              GOLDEN ERA PROPORTIONS & MANDATORY POSES
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Classic Physique rewards the golden ratio (1.618:1 V-taper) and equilateral matching of Arms, Calves, and Neck. Mass without classical harmony will not win the Sandow.
            </p>
          </div>

          <button
            onClick={() => setIsAddMeasurementOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/20"
          >
            <Plus className="w-4 h-4" />
            Log Body Circumferences
          </button>
        </div>
      </div>

      {/* Proportions Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* V-Taper Ratio */}
        <div className="card-gloss rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Golden V-Taper (Shoulder/Waist)</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded">
              GOLDEN RATIO
            </span>
          </div>
          <div className="text-3xl font-black text-amber-400 font-mono">
            {shoulderToWaistRatio} <span className="text-sm text-slate-400">: 1</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {parseFloat(shoulderToWaistRatio) >= 1.618 
              ? 'Flawless divine proportion! Shoulders dwarf the waistline to create comic-book taper on stage.' 
              : 'Targeting 1.618:1 ratio by expanding side delts and tightening vacuum waist.'}
          </p>
        </div>

        {/* The Classical Trinity */}
        <div className="card-gloss rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">The Reeves Trinity (Arms = Calves = Neck)</span>
            <span className="text-[10px] bg-amber-500/10 text-amber-300 font-bold px-2 py-0.5 rounded">
              SYMMETRY
            </span>
          </div>
          <div className="text-sm font-mono text-white flex items-center justify-between pt-1">
            <span>Arms: <strong className="text-amber-400">{avgArm}&quot;</strong></span>
            <span>Calves: <strong className="text-emerald-400">{avgCalf}&quot;</strong></span>
            <span>Neck: <strong className="text-cyan-400">{neck}&quot;</strong></span>
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            Golden Era ideal states all three should be within 0.5&quot; of each other for absolute structural balance.
          </p>
        </div>

        {/* Waist Measurement */}
        <div className="card-gloss rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Stage Waist & Vacuum</span>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded">
              SUB-30&quot; ELITE
            </span>
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {latestMeas.waistInches}&quot; <span className="text-xs text-amber-400 font-bold">({latestMeas.frontVacuumHoldSeconds}s hold)</span>
          </div>
          <p className="text-[11px] text-slate-400">
            A sub-30 inch waistline at 230+ lbs stage weight creates an optical illusion of unmatched size and conditioning.
          </p>
        </div>
      </div>

      {/* Circumferences Table */}
      <div className="card-gloss rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white uppercase flex items-center gap-2">
          <Ruler className="w-5 h-5 text-yellow-400" />
          Detailed Muscle Tape Measurements Log
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider bg-slate-900/40">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Weight</th>
                <th className="py-2.5 px-3">Waist</th>
                <th className="py-2.5 px-3">Chest</th>
                <th className="py-2.5 px-3">Shoulders</th>
                <th className="py-2.5 px-3">Arms (L / R)</th>
                <th className="py-2.5 px-3">Quads (L / R)</th>
                <th className="py-2.5 px-3">Calves</th>
                <th className="py-2.5 px-3">Vacuum Hold</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {measurements.map((m) => (
                <tr key={m.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-2.5 px-3 font-sans text-white font-semibold">{m.date}</td>
                  <td className="py-2.5 px-3 text-amber-400 font-bold">{m.weight} lbs</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">{m.waistInches}&quot;</td>
                  <td className="py-2.5 px-3 text-slate-200">{m.chestInches}&quot;</td>
                  <td className="py-2.5 px-3 text-slate-200">{m.shouldersInches}&quot;</td>
                  <td className="py-2.5 px-3 text-slate-300">{m.leftArmInches}&quot; / {m.rightArmInches}&quot;</td>
                  <td className="py-2.5 px-3 text-slate-300">{m.leftQuadInches}&quot; / {m.rightQuadInches}&quot;</td>
                  <td className="py-2.5 px-3 text-slate-300">{m.leftCalfInches}&quot;</td>
                  <td className="py-2.5 px-3 text-amber-300">{m.frontVacuumHoldSeconds}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5 Mandatory Classic Poses Guide */}
      <div className="card-gloss rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white uppercase">
            Official IFBB Pro League 5 Mandatory Classic Poses
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mandatoryPoses.map((pose, idx) => (
            <div key={pose.name} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400">Pose #{idx + 1}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Mandatory</span>
              </div>
              <h4 className="text-sm font-bold text-white">{pose.name}</h4>
              <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-800/80">
                {pose.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Measurement Modal */}
      {isAddMeasurementOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#12141c] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                Log Body Circumferences
              </h3>
              <button onClick={() => setIsAddMeasurementOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateMeasurement} className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Scale Weight (lbs)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={newM.weight} 
                    onChange={(e) => setNewM({ ...newM, weight: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Waist (in)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={newM.waistInches} 
                    onChange={(e) => setNewM({ ...newM, waistInches: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Vacuum Hold (sec)</label>
                  <input 
                    type="number" 
                    value={newM.frontVacuumHoldSeconds} 
                    onChange={(e) => setNewM({ ...newM, frontVacuumHoldSeconds: Number(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Chest (in)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={newM.chestInches} 
                    onChange={(e) => setNewM({ ...newM, chestInches: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Shoulders (in)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={newM.shouldersInches} 
                    onChange={(e) => setNewM({ ...newM, shouldersInches: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Arms (L / R in)</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      step="0.1" 
                      value={newM.leftArmInches} 
                      onChange={(e) => setNewM({ ...newM, leftArmInches: parseFloat(e.target.value) || 0 })}
                      className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-amber-400 focus:outline-none"
                    />
                    <input 
                      type="number" 
                      step="0.1" 
                      value={newM.rightArmInches} 
                      onChange={(e) => setNewM({ ...newM, rightArmInches: parseFloat(e.target.value) || 0 })}
                      className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Quads (L / R in)</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      step="0.1" 
                      value={newM.leftQuadInches} 
                      onChange={(e) => setNewM({ ...newM, leftQuadInches: parseFloat(e.target.value) || 0 })}
                      className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-amber-400 focus:outline-none"
                    />
                    <input 
                      type="number" 
                      step="0.1" 
                      value={newM.rightQuadInches} 
                      onChange={(e) => setNewM({ ...newM, rightQuadInches: parseFloat(e.target.value) || 0 })}
                      className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setIsAddMeasurementOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold"
                >
                  Save Measurement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
