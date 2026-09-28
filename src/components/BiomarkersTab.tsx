import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BiomarkerEntry } from '../types';
import { 
  Activity, 
  HeartPulse, 
  Plus, 
  ShieldCheck, 
  AlertTriangle, 
  Droplet, 
  Sparkles,
  Calendar
} from 'lucide-react';

export const BiomarkersTab: React.FC = () => {
  const { biomarkers, addBiomarker } = useApp();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newEntry, setNewEntry] = useState<{
    bpSystolic: number;
    bpDiastolic: number;
    restingHeartRate: number;
    fastingBloodGlucose: number;
    hematocritPct: number;
    astLiver: number;
    altLiver: number;
    egfrKidney: number;
    creatinine: number;
    hdl: number;
    ldl: number;
    estradiolE2: number;
    totalTestosterone: number;
  }>({
    bpSystolic: 120,
    bpDiastolic: 75,
    restingHeartRate: 55,
    fastingBloodGlucose: 88,
    hematocritPct: 48.5,
    astLiver: 30,
    altLiver: 34,
    egfrKidney: 102,
    creatinine: 1.16,
    hdl: 42,
    ldl: 108,
    estradiolE2: 30,
    totalTestosterone: 2200
  });

  const latest = biomarkers[0] || {
    bpSystolic: 118,
    bpDiastolic: 74,
    restingHeartRate: 54,
    fastingBloodGlucose: 86,
    hematocritPct: 48.2,
    astLiver: 28,
    altLiver: 32,
    egfrKidney: 104,
    creatinine: 1.15,
    hdl: 44,
    ldl: 105,
    estradiolE2: 29.4,
    totalTestosterone: 2450
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addBiomarker({
      date: new Date().toISOString().split('T')[0],
      bpSystolic: Number(newEntry.bpSystolic),
      bpDiastolic: Number(newEntry.bpDiastolic),
      restingHeartRate: Number(newEntry.restingHeartRate),
      fastingBloodGlucose: Number(newEntry.fastingBloodGlucose),
      hematocritPct: Number(newEntry.hematocritPct),
      astLiver: Number(newEntry.astLiver),
      altLiver: Number(newEntry.altLiver),
      egfrKidney: Number(newEntry.egfrKidney),
      creatinine: Number(newEntry.creatinine),
      hdl: Number(newEntry.hdl),
      ldl: Number(newEntry.ldl),
      estradiolE2: Number(newEntry.estradiolE2),
      totalTestosterone: Number(newEntry.totalTestosterone)
    });
    setIsAddOpen(false);
  };

  // Status helper
  const getStatus = (val: number | undefined, minOpt: number, maxOpt: number, maxWarn: number) => {
    if (val === undefined) return { label: 'N/A', color: 'text-slate-400' };
    if (val >= minOpt && val <= maxOpt) return { label: 'OPTIMAL', color: 'text-emerald-400' };
    if (val <= maxWarn) return { label: 'BORDERLINE', color: 'text-amber-400' };
    return { label: 'ELEVATED', color: 'text-rose-400' };
  };

  const bpStatus = latest.bpSystolic <= 125 && latest.bpDiastolic <= 80 ? 'OPTIMAL' : 'MONITOR';

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="border border-slate-800 rounded-2xl bg-gradient-to-r from-slate-900 via-[#181119] to-slate-900 p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 text-xs font-bold border border-rose-500/30">
              <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
              CLINICAL TELEMETRY & ENDOCRINE/ORGAN GUARD
            </div>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white uppercase">
              BIOMARKERS & BLOODWORK SENTINEL
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              True championship bodybuilding is an endurance sport of health management. High performance without premature organ stress ensures a decade of Olympia domination.
            </p>
          </div>

          <button
            onClick={() => setIsAddOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-lg shadow-rose-500/20"
          >
            <Plus className="w-4 h-4" />
            Log Lab Panel / Vitals
          </button>
        </div>
      </div>

      {/* Core Vitals KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Blood Pressure */}
        <div className="card-gloss rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Blood Pressure</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
              bpStatus === 'OPTIMAL' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-300'
            }`}>
              {bpStatus}
            </span>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {latest.bpSystolic}/{latest.bpDiastolic} <span className="text-xs text-slate-400">mmHg</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Target &lt; 120/80 mmHg. Protected via 40mg Telmisartan + daily cardio.
          </p>
        </div>

        {/* Fasting Glucose */}
        <div className="card-gloss rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Fasting Glucose</span>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded">
              OPTIMAL
            </span>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {latest.fastingBloodGlucose} <span className="text-xs text-slate-400">mg/dL</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Insulin sensitivity range 75 - 92 mg/dL. Peak nutrient partitioning into muscle cells.
          </p>
        </div>

        {/* Hematocrit (RBC) */}
        <div className="card-gloss rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Hematocrit (HCT)</span>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded">
              SAFE
            </span>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {latest.hematocritPct}% <span className="text-xs text-slate-400">(Max 52%)</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Blood viscosity control. Drink 6L+ water daily + baby aspirin if &gt; 50%.
          </p>
        </div>

        {/* Kidney eGFR */}
        <div className="card-gloss rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Renal (eGFR)</span>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded">
              &gt; 90 OPTIMAL
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {latest.egfrKidney} <span className="text-xs text-slate-400">mL/min</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Glomerular filtration rate is pristine. Creatinine: {latest.creatinine} mg/dL.
          </p>
        </div>
      </div>

      {/* Complete Bloodwork Panel Breakdown */}
      <div className="card-gloss rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white uppercase flex items-center gap-2">
            <Activity className="w-5 h-5 text-rose-400" />
            Complete Clinical Bloodwork Vault
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Last Lab: {latest.date}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {/* Liver Panel */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-xs text-white">Hepatic / Liver Enzymes</span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">PROTECTED</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">AST:</span>
                <span className="font-mono font-bold text-emerald-400">{latest.astLiver} U/L (ref &lt; 40)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ALT:</span>
                <span className="font-mono font-bold text-emerald-400">{latest.altLiver} U/L (ref &lt; 45)</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1 italic">
                Supported by 1000mg TUDCA + 1200mg NAC.
              </p>
            </div>
          </div>

          {/* Lipid Profile */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-xs text-white">Lipid Profile & Cardio</span>
              <span className="text-[10px] font-mono text-amber-400 font-bold">MONITORED</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">HDL (Good):</span>
                <span className="font-mono font-bold text-amber-300">{latest.hdl} mg/dL (target &gt; 40)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">LDL (Bad):</span>
                <span className="font-mono font-bold text-slate-300">{latest.ldl} mg/dL (target &lt; 100)</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1 italic">
                Supported by Citrus Bergamot + High EPA/DHA Omega-3.
              </p>
            </div>
          </div>

          {/* Endocrine & Hormones */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-xs text-white">Endocrine / Sex Hormones</span>
              <span className="text-[10px] font-mono text-cyan-400 font-bold">SUPRAPHYSIO</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Testosterone:</span>
                <span className="font-mono font-bold text-cyan-300">&gt; {latest.totalTestosterone} ng/dL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estradiol (E2):</span>
                <span className="font-mono font-bold text-emerald-400">{latest.estradiolE2} pg/mL (sweet spot)</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1 italic">
                E2 dialed in for joint integrity and dry vascularity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Biomarker Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#12141c] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-rose-400" />
                Log Lab Panel & Vitals
              </h3>
              <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Blood Pressure (Systolic/Diastolic)</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      value={newEntry.bpSystolic} 
                      onChange={(e) => setNewEntry({ ...newEntry, bpSystolic: Number(e.target.value) })}
                      className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-rose-400 focus:outline-none"
                      placeholder="120"
                    />
                    <input 
                      type="number" 
                      value={newEntry.bpDiastolic} 
                      onChange={(e) => setNewEntry({ ...newEntry, bpDiastolic: Number(e.target.value) })}
                      className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-rose-400 focus:outline-none"
                      placeholder="75"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Fasting Blood Glucose (mg/dL)</label>
                  <input 
                    type="number" 
                    value={newEntry.fastingBloodGlucose} 
                    onChange={(e) => setNewEntry({ ...newEntry, fastingBloodGlucose: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-rose-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Hematocrit (%)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={newEntry.hematocritPct} 
                    onChange={(e) => setNewEntry({ ...newEntry, hematocritPct: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-rose-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Estradiol E2 (pg/mL)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={newEntry.estradiolE2} 
                    onChange={(e) => setNewEntry({ ...newEntry, estradiolE2: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-rose-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Liver AST / ALT (U/L)</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      value={newEntry.astLiver} 
                      onChange={(e) => setNewEntry({ ...newEntry, astLiver: Number(e.target.value) })}
                      className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-rose-400 focus:outline-none"
                    />
                    <input 
                      type="number" 
                      value={newEntry.altLiver} 
                      onChange={(e) => setNewEntry({ ...newEntry, altLiver: Number(e.target.value) })}
                      className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-rose-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Renal eGFR (mL/min)</label>
                  <input 
                    type="number" 
                    value={newEntry.egfrKidney} 
                    onChange={(e) => setNewEntry({ ...newEntry, egfrKidney: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-rose-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-lg bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
