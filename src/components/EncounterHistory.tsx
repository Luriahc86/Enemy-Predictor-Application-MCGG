import React from 'react';
import { History, Trash2, Calendar } from 'lucide-react';
import { ChestEncounter } from '../types/game';

interface EncounterHistoryProps {
  encounters: ChestEncounter[];
  onRemoveEncounter: (id: string) => void;
}

const EncounterHistory: React.FC<EncounterHistoryProps> = ({ 
  encounters, 
  onRemoveEncounter 
}) => {
  const outcomeColors = {
    'Victory': 'text-green-400',
    'Defeat': 'text-red-400',
    'Fled': 'text-yellow-400'
  };

  const sortedEncounters = [...encounters].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <History className="mr-2" size={20} />
        Encounter History ({encounters.length})
      </h3>
      
      {encounters.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          No encounters logged yet. Start by adding your first encounter!
        </p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {sortedEncounters.map((encounter) => (
            <div 
              key={encounter.id}
              className="bg-gray-700 p-4 rounded-md border border-gray-600 hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-xl">{encounter.enemy.icon}</span>
                    <div>
                      <h4 className="font-medium text-white">{encounter.enemy.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span>Chest #{encounter.chestNumber}</span>
                        <span>•</span>
                        <span>{encounter.location}</span>
                        <span>•</span>
                        <span className={outcomeColors[encounter.outcome]}>
                          {encounter.outcome}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="mr-1" size={12} />
                    {new Date(encounter.timestamp).toLocaleString()}
                  </div>
                </div>
                
                <button
                  onClick={() => onRemoveEncounter(encounter.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors p-1"
                  title="Remove encounter"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EncounterHistory;