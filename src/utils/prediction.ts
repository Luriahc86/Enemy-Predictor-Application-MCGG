import { ChestEncounter, Enemy, PredictionResult } from '../types/game';
import { enemyDatabase } from '../data/enemies';

export class EnemyPredictor {
  private encounters: ChestEncounter[];

  constructor(encounters: ChestEncounter[]) {
    this.encounters = encounters;
  }

  // Analyze patterns using Markov chain approach
  predictNextEnemy(): PredictionResult[] {
    if (this.encounters.length < 2) {
      return this.getRandomPredictions();
    }

    const transitions = this.buildTransitionMatrix();
    const lastEnemy = this.encounters[this.encounters.length - 1].enemy;
    const predictions = this.calculateProbabilities(transitions, lastEnemy);

    return predictions.sort((a, b) => b.probability - a.probability);
  }

  private buildTransitionMatrix(): Map<string, Map<string, number>> {
    const transitions = new Map<string, Map<string, number>>();

    for (let i = 0; i < this.encounters.length - 1; i++) {
      const current = this.encounters[i].enemy.id;
      const next = this.encounters[i + 1].enemy.id;

      if (!transitions.has(current)) {
        transitions.set(current, new Map());
      }

      const currentTransitions = transitions.get(current)!;
      currentTransitions.set(next, (currentTransitions.get(next) || 0) + 1);
    }

    return transitions;
  }

  private calculateProbabilities(
    transitions: Map<string, Map<string, number>>,
    lastEnemy: Enemy
  ): PredictionResult[] {
    const results: PredictionResult[] = [];
    const lastEnemyTransitions = transitions.get(lastEnemy.id);

    if (!lastEnemyTransitions) {
      return this.getRandomPredictions();
    }

    const total = Array.from(lastEnemyTransitions.values()).reduce((sum, count) => sum + count, 0);

    for (const [enemyId, count] of lastEnemyTransitions) {
      const enemy = enemyDatabase.find(e => e.id === enemyId);
      if (enemy) {
        const probability = count / total;
        results.push({
          enemy,
          probability,
          confidence: this.calculateConfidence(count, total),
          reasoning: `Based on ${count} occurrences after ${lastEnemy.name}`
        });
      }
    }

    // Add some randomness for enemies not in transition matrix
    const unseenEnemies = enemyDatabase.filter(e => !lastEnemyTransitions.has(e.id));
    unseenEnemies.forEach(enemy => {
      const baseProbability = this.getBaseProbability(enemy);
      if (baseProbability > 0) {
        results.push({
          enemy,
          probability: baseProbability,
          confidence: 0.3,
          reasoning: `Estimated based on ${enemy.type} rarity`
        });
      }
    });

    return results;
  }

  private calculateConfidence(count: number, total: number): number {
    const frequency = count / total;
    const sampleSize = Math.min(total / 10, 1);
    return Math.min(frequency * sampleSize, 1);
  }

  private getBaseProbability(enemy: Enemy): number {
    const rarityProbabilities = {
      'Common': 0.4,
      'Rare': 0.3,
      'Epic': 0.2,
      'Legendary': 0.1
    };
    return rarityProbabilities[enemy.type] * 0.1; // Reduced for unseen enemies
  }

  private getRandomPredictions(): PredictionResult[] {
    return enemyDatabase.map(enemy => ({
      enemy,
      probability: this.getBaseProbability(enemy),
      confidence: 0.2,
      reasoning: `Initial prediction based on ${enemy.type} rarity`
    }));
  }

  // Analyze patterns and provide strategic insights
  getStrategicInsights(): string[] {
    const insights: string[] = [];

    if (this.encounters.length < 3) {
      insights.push("More data needed for accurate pattern analysis");
      return insights;
    }

    // Analyze element patterns
    const elementCounts = this.countElements();
    const dominantElement = this.getDominantElement(elementCounts);
    
    if (dominantElement) {
      insights.push(`${dominantElement} element enemies appear frequently - prepare counters`);
    }

    // Analyze rarity patterns
    const rarityTrend = this.analyzeRarityTrend();
    if (rarityTrend) {
      insights.push(rarityTrend);
    }

    // Analyze location patterns
    const locationPattern = this.analyzeLocationPattern();
    if (locationPattern) {
      insights.push(locationPattern);
    }

    return insights;
  }

  private countElements(): Map<string, number> {
    const counts = new Map<string, number>();
    this.encounters.forEach(encounter => {
      const element = encounter.enemy.element;
      counts.set(element, (counts.get(element) || 0) + 1);
    });
    return counts;
  }

  private getDominantElement(elementCounts: Map<string, number>): string | null {
    let maxCount = 0;
    let dominantElement = null;

    for (const [element, count] of elementCounts) {
      if (count > maxCount && count > this.encounters.length * 0.3) {
        maxCount = count;
        dominantElement = element;
      }
    }

    return dominantElement;
  }

  private analyzeRarityTrend(): string | null {
    if (this.encounters.length < 5) return null;

    const recentEncounters = this.encounters.slice(-5);
    const rareCount = recentEncounters.filter(e => 
      e.enemy.type === 'Rare' || e.enemy.type === 'Epic' || e.enemy.type === 'Legendary'
    ).length;

    if (rareCount >= 3) {
      return "High-tier enemy streak detected - legendary encounter likely";
    }

    return null;
  }

  private analyzeLocationPattern(): string | null {
    const locationCounts = new Map<string, number>();
    this.encounters.forEach(encounter => {
      const location = encounter.location;
      locationCounts.set(location, (locationCounts.get(location) || 0) + 1);
    });

    for (const [location, count] of locationCounts) {
      if (count > this.encounters.length * 0.4) {
        return `${location} shows concentrated enemy activity`;
      }
    }

    return null;
  }
}