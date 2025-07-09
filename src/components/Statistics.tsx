import React from 'react';
import { BarChart3, PieChart, Award } from 'lucide-react';
import { ChestEncounter } from '../types/game';

interface StatisticsProps {
  encounters: ChestEncounter[];
}

const Statistics: React.FC<StatisticsProps> = ({ encounters }) => {
  const elementStats = encounters.reduce((acc, encounter) => {
    const element = encounter.enemy.element;
    acc[element] = (acc[element] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const rarityStats = encounters.reduce((acc, encounter) => {
    const rarity = encounter.enemy.type;
    acc[rarity] = (acc[rarity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const outcomeStats = encounters.reduce((acc, encounter) => {
    acc[encounter.outcome] = (acc[encounter.outcome] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const winRate = encounters.length > 0 
    ? ((outcomeStats.Victory || 0) / encounters.length * 100).toFixed(1)
    : '0';

  const elementColors = {
    'Fire': 'bg-red-500',
    'Water': 'bg-blue-500',
    'Earth': 'bg-green-500',
    'Air': 'bg-gray-500',
    'Dark': 'bg-purple-500',
    'Light': 'bg-yellow-500'
  };

  const rarityColors = {
    'Common': 'bg-gray-500',
    'Rare': 'bg-blue-500',
    'Epic': 'bg-purple-500',
    'Legendary': 'bg-yellow-500'
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <BarChart3 className="mr-2" size={20} />
          Statistics Overview
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-400">{encounters.length}</div>
            <div className="text-sm text-gray-400">Total Encounters</div>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-400">{winRate}%</div>
            <div className="text-sm text-gray-400">Win Rate</div>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-teal-400">
              {encounters.length > 0 ? encounters[encounters.length - 1].chestNumber : 0}
            </div>
            <div className="text-sm text-gray-400">Last Chest</div>
          </div>
        </div>
      </div>

      {/* Element Distribution */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <PieChart className="mr-2" size={20} />
          Element Distribution
        </h3>
        
        <div className="space-y-3">
          {Object.entries(elementStats).map(([element, count]) => {
            const percentage = (count / encounters.length * 100).toFixed(1);
            return (
              <div key={element} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded ${elementColors[element as keyof typeof elementColors]}`}></div>
                  <span className="text-gray-300">{element}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${elementColors[element as keyof typeof elementColors]}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-12">{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rarity Distribution */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Award className="mr-2" size={20} />
          Rarity Distribution
        </h3>
        
        <div className="space-y-3">
          {Object.entries(rarityStats).map(([rarity, count]) => {
            const percentage = (count / encounters.length * 100).toFixed(1);
            return (
              <div key={rarity} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded ${rarityColors[rarity as keyof typeof rarityColors]}`}></div>
                  <span className="text-gray-300">{rarity}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${rarityColors[rarity as keyof typeof rarityColors]}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-12">{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Statistics;