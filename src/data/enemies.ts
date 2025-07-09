import { Enemy } from '../types/game';

export const enemyDatabase: Enemy[] = [
  {
    id: 'fire-goblin',
    name: 'Fire Goblin',
    type: 'Common',
    element: 'Fire',
    strength: 3,
    weakness: 'Water magic',
    description: 'A small, aggressive creature with flaming attacks.',
    icon: '🔥'
  },
  {
    id: 'water-sprite',
    name: 'Water Sprite',
    type: 'Common',
    element: 'Water',
    strength: 2,
    weakness: 'Lightning spells',
    description: 'A nimble aquatic being with healing abilities.',
    icon: '💧'
  },
  {
    id: 'earth-golem',
    name: 'Earth Golem',
    type: 'Rare',
    element: 'Earth',
    strength: 7,
    weakness: 'Wind attacks',
    description: 'A massive rock creature with devastating physical attacks.',
    icon: '🗿'
  },
  {
    id: 'air-wraith',
    name: 'Air Wraith',
    type: 'Rare',
    element: 'Air',
    strength: 5,
    weakness: 'Holy magic',
    description: 'A ghostly being that phases in and out of reality.',
    icon: '🌪️'
  },
  {
    id: 'shadow-dragon',
    name: 'Shadow Dragon',
    type: 'Epic',
    element: 'Dark',
    strength: 15,
    weakness: 'Light magic',
    description: 'A fearsome dragon cloaked in darkness.',
    icon: '🐉'
  },
  {
    id: 'light-phoenix',
    name: 'Light Phoenix',
    type: 'Epic',
    element: 'Light',
    strength: 12,
    weakness: 'Dark magic',
    description: 'A majestic bird of pure light and rebirth.',
    icon: '🔥'
  },
  {
    id: 'void-lord',
    name: 'Void Lord',
    type: 'Legendary',
    element: 'Dark',
    strength: 20,
    weakness: 'Combined elements',
    description: 'An ancient entity from the void realm.',
    icon: '👑'
  },
  {
    id: 'crystal-guardian',
    name: 'Crystal Guardian',
    type: 'Legendary',
    element: 'Light',
    strength: 18,
    weakness: 'Chaos magic',
    description: 'A protector of ancient crystal formations.',
    icon: '💎'
  }
];