import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MealItem, DayCarbCycle } from '../types';
import { 
  Utensils, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Droplet, 
  Flame, 
  Beef, 
  Wheat, 
  Sparkles,
  RefreshCw,
  Clock
} from 'lucide-react';

export const NutritionTab: React.FC = () => {
  const { 
    macros, 
    updateMacros, 
    carbCycleDay, 
    setCarbCycleDay, 
    meals, 
    addMeal, 
    toggleMealEaten, 
    deleteMeal 
  } = useApp();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newMeal, setNewMeal] = useState<{
    name: string;
    amount: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    timing: MealItem['timing'];
    notes: string;
  }>({
    name: '',
    amount: '',
    calories: 600,
    protein: 50,
    carbs: 65,
    fats: 10,
    timing: 'Midday',
    notes: ''
  });

  // Calculate consumed totals
  const eatenMeals = meals.filter(m => m.isEaten);
  const consumedCalories = eatenMeals.reduce((acc, m) => acc + m.calories, 0);
  const consumedProtein = eatenMeals.reduce((acc, m) => acc + m.protein, 0);
  const consumedCarbs = eatenMeals.reduce((acc, m) => acc + m.carbs, 0);
  const consumedFats = eatenMeals.reduce((acc, m) => acc + m.fats, 0);

  // Planned totals (all meals)
  const plannedCalories = meals.reduce((acc, m) => acc + m.calories, 0);
  const plannedProtein = meals.reduce((acc, m) => acc + m.protein, 0);
  const plannedCarbs = meals.reduce((acc, m) => acc + m.carbs, 0);
  const plannedFats = meals.reduce((acc, m) => acc + m.fats, 0);

  const handleCreateMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeal.name.trim()) return;
    addMeal({
      name: newMeal.name,
      amount: newMeal.amount || 'Standard portion',
      calories: Number(newMeal.calories),
      protein: Number(newMeal.protein),
      carbs: Number(newMeal.carbs),
      fats: Number(newMeal.fats),
      timing: newMeal.timing,
      isEaten: false,
      notes: newMeal.notes
    });
    setNewMeal({
      name: '',
      amount: '',
      calories: 600,
      protein: 50,
      carbs: 65,
      fats: 10,
      timing: 'Midday',
      notes: ''
    });
    setIsAddOpen(false);
  };

  const handleCarbCycleChange = (cycle: DayCarbCycle) => {
    setCarbCycleDay(cycle);
    // adjust carb target based on cycle
    if (cycle === 'High') {
      updateMacros({ carbs: 550, calories: 3950, fats: 50 });
    } else if (cycle === 'Moderate') {
      updateMacros({ carbs: 380, calories: 3350, fats: 65 });
    } else if (cycle === 'Low') {
      updateMacros({ carbs: 220, calories: 2750, fats: 75 });
    } else if (cycle === 'Zero') {
      updateMacros({ carbs: 60, calories: 2200, fats: 85 });
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header & Carb Cycling Switcher */}
      <div className="border border-slate-800 rounded-2xl bg-gradient-to-r from-slate-900 via-[#13111c] to-slate-900 p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-300 text-xs font-bold border border-orange-500/30">
              <Utensils className="w-3.5 h-3.5 text-orange-400" />
              ANABOLIC ARCHITECTURE // CONTEST NUTRITION & HYDRATION
            </div>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white uppercase">
              MACROS, MEAL TIMING & WATER METABOLISM
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every gram of carbohydrate is timed around workouts to fuel dense muscular contractions while preventing intramuscular insulin resistance.
            </p>
          </div>

          {/* Carb Cycle Selector */}
          <div className="bg-slate-950/90 border border-slate-700/80 rounded-xl p-4 shrink-0 space-y-2">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center justify-between">
              <span>Carb Cycling Protocol</span>
              <span className="text-orange-400 font-bold">{carbCycleDay} Day</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {(['High', 'Moderate', 'Low', 'Zero'] as DayCarbCycle[]).map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => handleCarbCycleChange(cycle)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    carbCycleDay === cycle
                      ? 'bg-orange-500 text-black shadow-md shadow-orange-500/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cycle}
                </button>
              ))}
            </div>
            <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              {carbCycleDay === 'High' && 'Refeed Day: Replenish glycogen & upregulate leptin hormone.'}
              {carbCycleDay === 'Moderate' && 'Standard Training Day: Sustained energy & anabolism.'}
              {carbCycleDay === 'Low' && 'Rest / Cardio Day: Accelerated fatty acid oxidation.'}
              {carbCycleDay === 'Zero' && 'Depletion Protocol: Flat & dry conditioning push.'}
            </div>
          </div>
        </div>
      </div>

      {/* Target vs Consumed Progress Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Calories */}
        <div className="card-gloss rounded-xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-bold uppercase flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Calories
            </span>
            <span className="font-mono text-xs text-amber-300">
              {consumedCalories} / {macros.calories} kcal
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-amber-400 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, (consumedCalories / macros.calories) * 100)}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 flex items-center justify-between">
            <span>Remaining:</span>
            <span className="font-mono text-white">{Math.max(0, macros.calories - consumedCalories)} kcal</span>
          </div>
        </div>

        {/* Protein */}
        <div className="card-gloss rounded-xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-bold uppercase flex items-center gap-1.5">
              <Beef className="w-3.5 h-3.5 text-rose-400" />
              Protein
            </span>
            <span className="font-mono text-xs text-rose-300">
              {consumedProtein} / {macros.protein} g
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-rose-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, (consumedProtein / macros.protein) * 100)}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 flex items-center justify-between">
            <span>Remaining:</span>
            <span className="font-mono text-white">{Math.max(0, macros.protein - consumedProtein)} g</span>
          </div>
        </div>

        {/* Carbohydrates */}
        <div className="card-gloss rounded-xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-bold uppercase flex items-center gap-1.5">
              <Wheat className="w-3.5 h-3.5 text-amber-300" />
              Carbohydrates
            </span>
            <span className="font-mono text-xs text-amber-200">
              {consumedCarbs} / {macros.carbs} g
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-amber-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, (consumedCarbs / macros.carbs) * 100)}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 flex items-center justify-between">
            <span>Remaining:</span>
            <span className="font-mono text-white">{Math.max(0, macros.carbs - consumedCarbs)} g</span>
          </div>
        </div>

        {/* Fats & Water */}
        <div className="card-gloss rounded-xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-bold uppercase flex items-center gap-1.5">
              <Droplet className="w-3.5 h-3.5 text-cyan-400" />
              Fats & Water
            </span>
            <span className="font-mono text-xs text-cyan-300">
              {consumedFats}g F • {macros.waterLiters}L H2O
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-cyan-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, (consumedFats / macros.fats) * 100)}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 flex items-center justify-between">
            <span>Sodium / Potassium:</span>
            <span className="font-mono text-white">{macros.sodiumMg}mg / {macros.potassiumMg}mg</span>
          </div>
        </div>
      </div>

      {/* Meals List */}
      <div className="card-gloss rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
              <Utensils className="w-5 h-5 text-orange-400" />
              Daily Scheduled Meals ({meals.length})
            </h3>
            <p className="text-xs text-slate-400">Tap circle to mark as consumed. Keep nutrient timing exact.</p>
          </div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-black text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Custom Meal
          </button>
        </div>

        <div className="space-y-3">
          {meals.map((meal, index) => (
            <div
              key={meal.id}
              className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                meal.isEaten 
                  ? 'bg-slate-900/30 border-emerald-500/20 opacity-80' 
                  : 'bg-[#12141e] border-slate-800 hover:border-orange-500/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleMealEaten(meal.id)}
                  className="mt-1 text-slate-500 hover:text-emerald-400 transition-colors"
                >
                  {meal.isEaten ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600" />
                  )}
                </button>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Meal {index + 1} • {meal.timing}
                    </span>
                    <h4 className={`text-sm font-bold ${meal.isEaten ? 'line-through text-slate-400' : 'text-white'}`}>
                      {meal.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300">{meal.amount}</p>
                  {meal.notes && (
                    <p className="text-[11px] text-slate-500 italic">💡 {meal.notes}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pl-8 md:pl-0">
                <div className="text-right font-mono">
                  <div className="text-sm font-bold text-white">{meal.calories} <span className="text-xs text-slate-400 font-normal">kcal</span></div>
                  <div className="text-[11px] text-slate-400">
                    <span className="text-rose-400 font-semibold">{meal.protein}g P</span> •{' '}
                    <span className="text-amber-400 font-semibold">{meal.carbs}g C</span> •{' '}
                    <span className="text-cyan-400 font-semibold">{meal.fats}g F</span>
                  </div>
                </div>

                <button
                  onClick={() => deleteMeal(meal.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  title="Delete meal"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Meal Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#12141c] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-orange-400" />
                Add Championship Meal
              </h3>
              <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateMeal} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Meal Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Pre-Workout Fuel" 
                  value={newMeal.name} 
                  onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-orange-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Food Items & Portions</label>
                <input 
                  type="text" 
                  placeholder="e.g. 200g Jasmine Rice, 180g Chicken Breast, 100g Green Beans" 
                  value={newMeal.amount} 
                  onChange={(e) => setNewMeal({ ...newMeal, amount: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-orange-400 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Timing Window</label>
                  <select 
                    value={newMeal.timing} 
                    onChange={(e) => setNewMeal({ ...newMeal, timing: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-orange-400 focus:outline-none"
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Pre-Workout">Pre-Workout</option>
                    <option value="Intra-Workout">Intra-Workout</option>
                    <option value="Post-Workout">Post-Workout</option>
                    <option value="Midday">Midday</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Pre-Bed">Pre-Bed</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Total Calories (kcal)</label>
                  <input 
                    type="number" 
                    value={newMeal.calories} 
                    onChange={(e) => setNewMeal({ ...newMeal, calories: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-orange-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Protein (g)</label>
                  <input 
                    type="number" 
                    value={newMeal.protein} 
                    onChange={(e) => setNewMeal({ ...newMeal, protein: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-orange-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Carbs (g)</label>
                  <input 
                    type="number" 
                    value={newMeal.carbs} 
                    onChange={(e) => setNewMeal({ ...newMeal, carbs: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-orange-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Fats (g)</label>
                  <input 
                    type="number" 
                    value={newMeal.fats} 
                    onChange={(e) => setNewMeal({ ...newMeal, fats: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-orange-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Notes / Digestion / Micronutrients</label>
                <input 
                  type="text" 
                  placeholder="e.g. Add 2g Himalayan salt + digestive enzymes" 
                  value={newMeal.notes} 
                  onChange={(e) => setNewMeal({ ...newMeal, notes: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:border-orange-400 focus:outline-none"
                />
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
                  className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-black text-xs font-bold"
                >
                  Save Meal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
