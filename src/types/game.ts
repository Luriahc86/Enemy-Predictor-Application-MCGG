export interface Enemy {
  id: string;
  name: string;
  type: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  element: 'Fire' | 'Water' | 'Earth' | 'Air' | 'Dark' | 'Light';
  strength: number;
  weakness: string;
  description: string;
  icon: string;
}

export interface ChestEncounter {
  id: string;
  chestNumber: number;
  enemy: Enemy;
  timestamp: Date;
  location: string;
  outcome: 'Victory' | 'Defeat' | 'Fled';
}

export interface PredictionResult {
  enemy: Enemy;
  probability: number;
  confidence: number;
  reasoning: string;
}

export interface GameSession {
  id: string;
  name: string;
  encounters: ChestEncounter[];
  createdAt: Date;
  lastModified: Date;
}