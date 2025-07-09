import React from 'react';
import { Brain, TrendingUp, Target } from 'lucide-react';
import { PredictionResult } from '../types/game';
import EnemyCard from './EnemyCard';

interface PredictionPanelProps {
  predictions: PredictionResult[];
  insights: string[];
  isLoading: boolean;
}

const PredictionPanel: React.FC<PredictionPanelProps> = ({ 
  predictions, 
  insights, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Predictions */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Brain className="mr-2" size={20} />
          Enemy Predictions
        </h3>
        
        {predictions.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No predictions available. Add more encounters to improve accuracy.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {predictions.slice(0, 6).map((prediction, index) => (
              <EnemyCard
                key={prediction.enemy.id}
                enemy={prediction.enemy}
                probability={prediction.probability}
                confidence={prediction.confidence}
                reasoning={prediction.reasoning}
              />
            ))}
          </div>
        )}
      </div>

      {/* Strategic Insights */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <TrendingUp className="mr-2" size={20} />
          Strategic Insights
        </h3>
        
        {insights.length === 0 ? (
          <p className="text-gray-400 text-center py-4">
            More data needed for strategic analysis.
          </p>
        ) : (
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div 
                key={index}
                className="bg-gray-700 p-3 rounded-md border-l-4 border-teal-500"
              >
                <p className="text-gray-300 flex items-start">
                  <Target className="mr-2 mt-1 flex-shrink-0" size={16} />
                  {insight}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionPanel;