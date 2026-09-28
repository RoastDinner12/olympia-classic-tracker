import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Calendar, Flame, Trophy, Sparkles, Scale } from 'lucide-react';

export const CountdownClock: React.FC = () => {
  const { profile } = useApp();

  const [timeLeft, setTimeLeft] = useState<{
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalDays: number;
  }>({
    months: 22,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 669
  });

  useEffect(() => {
    const updateCountdown = () => {
      const targetTime = new Date('2028-07-27T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = Math.max(0, targetTime - now);

      const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      const months = Math.floor(totalDays / 30.4375);
      const days = Math.floor(totalDays % 30.4375);
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ months, days, hours, minutes, seconds, totalDays });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card-gloss rounded-2xl p-6 border border-amber-500/30 bg-gradient-to-br from-slate-900 via-slate-900/95 to-amber-950/20 relative overflow-hidden shadow-xl shadow-amber-500/5">
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            THE 22-MONTH OLYMPIAN CONQUEST (JULY 27, 2028)
          </div>
          <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white uppercase">
            ROAD TO YOUNGEST IFBB CLASSIC WINNER
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Starting weight: <span className="text-white font-bold">74.0 kg (163.1 lbs)</span>. Stage weight ceiling: <span className="text-amber-400 font-bold">103.0 kg (227.0 lbs)</span>.
            Building <span className="text-cyan-400 font-black">+29.0 kg (+63.9 lbs)</span> of pure contractile muscle tissue.
          </p>
        </div>

        {/* Live Countdown Grid */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3 text-center">
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 min-w-[55px] sm:min-w-[68px]">
            <div className="text-xl sm:text-2xl font-black text-amber-400">{timeLeft.months}</div>
            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Months</div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/80 border border-slate-800 min-w-[55px] sm:min-w-[68px]">
            <div className="text-xl sm:text-2xl font-black text-white">{timeLeft.days}</div>
            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Days</div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/80 border border-slate-800 min-w-[55px] sm:min-w-[68px]">
            <div className="text-xl sm:text-2xl font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Hours</div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/80 border border-slate-800 min-w-[55px] sm:min-w-[68px]">
            <div className="text-xl sm:text-2xl font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Mins</div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-amber-500/10 border border-amber-500/40 min-w-[55px] sm:min-w-[68px] animate-pulse">
            <div className="text-xl sm:text-2xl font-black text-amber-300">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-[9px] uppercase tracking-wider text-amber-400 font-bold">Secs</div>
          </div>
        </div>
      </div>
    </div>
  );
};

