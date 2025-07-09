import React, { useState, useEffect } from 'react';
import { Sword, Database, BarChart3, Brain, Sparkles } from 'lucide-react';
import { ChestEncounter, GameSession } from './types/game';
import { EnemyPredictor } from './utils/prediction';
import EncounterForm from './components/EncounterForm';
import EncounterHistory from './components/EncounterHistory';
import PredictionPanel from './components/PredictionPanel';
import Statistics from './components/Statistics';

type ActiveTab = 'encounters' | 'predictions' | 'statistics';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('encounters');
  const [encounters, setEncounters] = useState<ChestEncounter[]>([]);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedEncounters = localStorage.getItem('mcgg-encounters');
    if (savedEncounters) {
      try {
        const parsed = JSON.parse(savedEncounters);
        setEncounters(parsed.map((e: any) => ({ ...e, timestamp: new Date(e.timestamp) })));
      } catch (error) {
        console.error('Error loading saved encounters:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever encounters change
  useEffect(() => {
    localStorage.setItem('mcgg-encounters', JSON.stringify(encounters));
  }, [encounters]);

  // Update predictions when encounters change
  useEffect(() => {
    if (encounters.length > 0) {
      setIsLoading(true);
      setTimeout(() => {
        const predictor = new EnemyPredictor(encounters);
        const newPredictions = predictor.predictNextEnemy();
        const newInsights = predictor.getStrategicInsights();
        
        setPredictions(newPredictions);
        setInsights(newInsights);
        setIsLoading(false);
      }, 500); // Simulate processing time
    } else {
      setPredictions([]);
      setInsights([]);
    }
  }, [encounters]);

  const handleAddEncounter = (encounterData: Omit<ChestEncounter, 'id'>) => {
    const newEncounter: ChestEncounter = {
      ...encounterData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    setEncounters(prev => [...prev, newEncounter]);
  };

  const handleRemoveEncounter = (id: string) => {
    setEncounters(prev => prev.filter(encounter => encounter.id !== id));
  };

  const tabs = [
    { id: 'encounters' as const, label: 'Encounters', icon: Sword },
    { id: 'predictions' as const, label: 'Predictions', icon: Brain },
    { id: 'statistics' as const, label: 'Statistics', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Magic Chest Go Go</h1>
                <p className="text-sm text-gray-400">Enemy Prediction System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">
                {encounters.length} encounters logged
              </div>
              <div className="text-sm text-purple-400">
                v2.0 Beta
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'encounters' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <EncounterForm onAddEncounter={handleAddEncounter} />
            </div>
            <div>
              <EncounterHistory 
                encounters={encounters} 
                onRemoveEncounter={handleRemoveEncounter}
              />
            </div>
          </div>
        )}

        {activeTab === 'predictions' && (
          <PredictionPanel 
            predictions={predictions}
            insights={insights}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'statistics' && (
          <Statistics encounters={encounters} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-400 text-sm">
            <p>MCGG Enemy Predictor - Advanced AI-powered enemy prediction system</p>
            <p className="mt-1">Data is stored locally in your browser</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;