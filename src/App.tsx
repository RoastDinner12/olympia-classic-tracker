import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { WeightMatrixTab } from './components/WeightMatrixTab';
import { NutritionTab } from './components/NutritionTab';
import { PedTrackerTab } from './components/PedTrackerTab';
import { TrainingTab } from './components/TrainingTab';
import { PhysiqueTab } from './components/PhysiqueTab';
import { BiomarkersTab } from './components/BiomarkersTab';
import { PeakWeekTab } from './components/PeakWeekTab';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'matrix' && <WeightMatrixTab />}
      {activeTab === 'nutrition' && <NutritionTab />}
      {activeTab === 'peds' && <PedTrackerTab />}
      {activeTab === 'training' && <TrainingTab />}
      {activeTab === 'physique' && <PhysiqueTab />}
      {activeTab === 'biomarkers' && <BiomarkersTab />}
      {activeTab === 'peakweek' && <PeakWeekTab />}
    </main>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#07080b] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
        <Navbar />
        <div className="flex-1">
          <MainContent />
        </div>
        <footer className="border-t border-slate-900 bg-[#06070a] py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
              <span className="text-slate-400 font-bold uppercase tracking-wider">AEGIS CLASSIC PHYSIQUE OS</span>
              <span>• Official IFBB Pro Division Engineering</span>
            </div>
            <div>
              Built for the Youngest Champion Record • All Data Stored Locally & Privately
            </div>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
};

export default App;
