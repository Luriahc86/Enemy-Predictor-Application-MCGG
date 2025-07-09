import React, { useState } from 'react';
import { Plus, MapPin, Clock } from 'lucide-react';
import { Enemy, ChestEncounter } from '../types/game';
import { enemyDatabase } from '../data/enemies';

interface EncounterFormProps {
  onAddEncounter: (encounter: Omit<ChestEncounter, 'id'>) => void;
}

const EncounterForm: React.FC<EncounterFormProps> = ({ onAddEncounter }) => {
  const [selectedEnemyId, setSelectedEnemyId] = useState<string>('');
  const [chestNumber, setChestNumber] = useState<number>(1);
  const [location, setLocation] = useState<string>('Forest');
  const [outcome, setOutcome] = useState<'Victory' | 'Defeat' | 'Fled'>('Victory');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedEnemy = enemyDatabase.find(enemy => enemy.id === selectedEnemyId);
    if (!selectedEnemy) return;

    const encounter: Omit<ChestEncounter, 'id'> = {
      chestNumber,
      enemy: selectedEnemy,
      timestamp: new Date(),
      location,
      outcome
    };

    onAddEncounter(encounter);
    setChestNumber(prev => prev + 1);
    setSelectedEnemyId('');
  };

  const locations = [
    'Forest', 'Cave', 'Mountain', 'Swamp', 'Desert', 'Ruins', 'Castle', 'Volcano'
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <Plus className="mr-2" size={20} />
        Log New Encounter
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <MapPin className="inline mr-1" size={14} />
              Chest Number
            </label>
            <input
              type="number"
              value={chestNumber}
              onChange={(e) => setChestNumber(parseInt(e.target.value))}
              min="1"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Clock className="inline mr-1" size={14} />
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Enemy Encountered
          </label>
          <select
            value={selectedEnemyId}
            onChange={(e) => setSelectedEnemyId(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
            required
          >
            <option value="">Select an enemy...</option>
            {enemyDatabase.map(enemy => (
              <option key={enemy.id} value={enemy.id}>
                {enemy.icon} {enemy.name} ({enemy.type})
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Battle Outcome
          </label>
          <div className="flex space-x-4">
            {(['Victory', 'Defeat', 'Fled'] as const).map(result => (
              <label key={result} className="flex items-center">
                <input
                  type="radio"
                  name="outcome"
                  value={result}
                  checked={outcome === result}
                  onChange={(e) => setOutcome(e.target.value as any)}
                  className="mr-2 text-purple-500"
                />
                <span className="text-gray-300">{result}</span>
              </label>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200 font-medium"
        >
          Add Encounter
        </button>
      </form>
    </div>
  );
};

export default EncounterForm;