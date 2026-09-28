import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  CalendarDays, 
  Droplet, 
  Wheat, 
  Sparkles, 
  Trophy, 
  CheckCircle2, 
  Circle, 
  Flame, 
  AlertCircle 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const PeakWeekTab: React.FC = () => {
  const { peakWeek, togglePeakDayComplete } = useApp();

  const chartData = [...peakWeek].reverse().map(d => ({
    name: d.dayIndex === 0 ? 'SHOW' : `D-${d.dayIndex}`,
    water: d.waterGoalLiters,
    carbs: d.carbsGoalG
  }));

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="border border-slate-800 rounded-2xl bg-gradient-to-r from-slate-900 via-[#181024] to-slate-900 p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-bold border border-purple-500/30">
              <CalendarDays className="w-3.5 h-3.5 text-purple-400" />
              PEAK WEEK MASTER ENGINE // 7-DAY PRECISION DRYING & CARB-UP
            </div>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white uppercase">
              THE FINAL 7 DAYS: TRANSLATING FLESH INTO GRANITE
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Peak week doesn&apos;t make a physique, but a mistake can destroy 16 weeks of suffering. We utilize scientific aldosterone manipulation: water frontloading, sodium preservation, and controlled supercompensation.
            </p>
          </div>

          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 shrink-0 text-center">
            <div className="text-[10px] text-purple-400 uppercase font-bold tracking-wider">Peak Week Protocol</div>
            <div className="text-2xl font-black text-white font-mono mt-0.5">D-7 → DAY 0</div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-1">Aldosterone Dialed In</div>
          </div>
        </div>
      </div>

      {/* Water & Carb Supercompensation Curves */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Water Titration */}
        <div className="card-gloss rounded-2xl p-5 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplet className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase">Water Flush to Sips (Liters)</h3>
            </div>
            <span className="text-[10px] font-mono text-cyan-300 font-bold">Frontload 9L → 0.8L</span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Bar dataKey="water" fill="#00f0ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            Hyper-hydrating turns off aldosterone. When water is cut, the body continues dumping fluid through renal osmosis.
          </p>
        </div>

        {/* Carb Depletion & Load */}
        <div className="card-gloss rounded-2xl p-5 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wheat className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase">Carb Supercompensation (Grams)</h3>
            </div>
            <span className="text-[10px] font-mono text-amber-300 font-bold">120g → 600g Load</span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Bar dataKey="carbs" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            Depleting to zero glycogen upregulates GLUT4 receptors, allowing 600g carb reload to shuttle directly into muscle bellies.
          </p>
        </div>
      </div>

      {/* Day by Day Protocol Cards */}
      <div className="space-y-4">
        {peakWeek.map((day) => (
          <div
            key={day.dayIndex}
            className={`card-gloss rounded-2xl p-6 border transition-all space-y-4 ${
              day.dayIndex === 0 
                ? 'border-amber-500/50 bg-gradient-to-r from-amber-950/20 via-[#1c160b] to-black' 
                : 'border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => togglePeakDayComplete(day.dayIndex)}
                  className="text-slate-500 hover:text-emerald-400 transition-colors"
                >
                  {day.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-600" />
                  )}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      day.dayIndex === 0 ? 'bg-amber-400 text-black' : 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                    }`}>
                      {day.dayIndex === 0 ? 'CHAMPIONSHIP FINALS' : `D-${day.dayIndex}`}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{day.date}</span>
                  </div>
                  <h3 className={`text-base font-bold mt-0.5 ${day.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                    {day.dayName}
                  </h3>
                </div>
              </div>

              {/* Day's Macro & Fluid Targets */}
              <div className="flex items-center gap-2 font-mono text-xs text-slate-300 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="text-cyan-400 font-bold">{day.waterGoalLiters}L H2O</span>
                <span>•</span>
                <span className="text-amber-400 font-bold">{day.carbsGoalG}g Carbs</span>
                <span>•</span>
                <span className="text-rose-400 font-bold">{day.proteinGoalG}g Protein</span>
                <span>•</span>
                <span className="text-slate-400">{day.sodiumGoalMg}mg Na</span>
              </div>
            </div>

            {/* Protocols Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="font-bold text-amber-400 uppercase text-[10px] tracking-wider">
                  Depletion / Training / Cardio
                </div>
                <p className="text-slate-300 leading-relaxed">{day.trainingInstructions}</p>
                {day.cardioMin > 0 && (
                  <div className="text-[10px] text-slate-400 font-mono pt-1">Cardio: {day.cardioMin} minutes</div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="font-bold text-purple-400 uppercase text-[10px] tracking-wider">
                  Stage Tan & Skin Prep
                </div>
                <p className="text-slate-300 leading-relaxed">{day.tanInstructions}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider">
                  Pump-Up & Backstage Protocol
                </div>
                <p className="text-slate-300 leading-relaxed">{day.pumpUpProtocol}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
