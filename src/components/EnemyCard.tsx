import React from 'react';
import { Enemy } from '../types/game';

interface EnemyCardProps {
  enemy: Enemy;
  probability?: number;
  confidence?: number;
  reasoning?: string;
  onClick?: () => void;
}

const EnemyCard: React.FC<EnemyCardProps> = ({ 
  enemy, 
  probability, 
  confidence, 
  reasoning, 
  onClick 
}) => {
  const rarityColors = {
    'Common': 'bg-gray-600',
    'Rare': 'bg-blue-600',
    'Epic': 'bg-purple-600',
    'Legendary': 'bg-yellow-600'
  };

  const elementColors = {
    'Fire': 'text-red-400',
    'Water': 'text-blue-400',
    'Earth': 'text-green-400',
    'Air': 'text-gray-300',
    'Dark': 'text-purple-400',
    'Light': 'text-yellow-400'
  };

  return (
    <div 
      className={`bg-gray-800 rounded-lg p-4 border border-gray-700 transition-all duration-200 hover:border-gray-600 hover:shadow-lg ${
        onClick ? 'cursor-pointer hover:bg-gray-750' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{enemy.icon}</div>
          <div>
            <h3 className="font-semibold text-white">{enemy.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${rarityColors[enemy.type]}`}>
                {enemy.type}
              </span>
              <span className={`text-sm font-medium ${elementColors[enemy.element]}`}>
                {enemy.element}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">STR: {enemy.strength}</div>
          {probability && (
            <div className="text-lg font-bold text-purple-400 mt-1">
              {(probability * 100).toFixed(1)}%
            </div>
          )}
        </div>
      </div>
      
      <p className="text-gray-300 text-sm mb-2">{enemy.description}</p>
      
      <div className="text-xs text-gray-400 mb-2">
        <strong>Weakness:</strong> {enemy.weakness}
      </div>
      
      {probability && confidence && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">Confidence</span>
            <span className="text-xs text-gray-300">{(confidence * 100).toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div 
              className="bg-purple-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${confidence * 100}%` }}
            />
          </div>
          {reasoning && (
            <p className="text-xs text-gray-400 mt-2">{reasoning}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EnemyCard;