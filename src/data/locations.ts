import type { MineralLocation } from '../types/mineral';

export const locations: MineralLocation[] = [
  {
    id: 'cave-mine',
    name: 'Cave Mine',
    description: 'A shallow limestone cave with common minerals. Perfect for beginners learning basic identification.',
    difficulty: 'easy',
    minerals: [
      'quartz', 'feldspar', 'calcite', 'pyrite', 'mica',
      'gypsum', 'halite', 'talc', 'hornblende', 'hematite',
      'selenite', 'dolomite', 'obsidian', 'magnetite', 'galena',
      'olivine', 'agate', 'jasper', 'copper', 'pyrrhotite',
      'native-iron', 'ilmenite', 'arsenopyrite', 'chromite',
      'augite', 'chlorite', 'actinolite', 'serpentine', 'wollastonite',
    ],
    backgroundColors: ['#2d4a2d', '#1a3a1a'],
    gridIcon: '🪨',
  },
  {
    id: 'gem-quarry',
    name: 'Gem Quarry',
    description: 'An open-pit quarry with a mix of common and semi-precious minerals. Intermediate challenge.',
    difficulty: 'medium',
    minerals: [
      'quartz', 'amethyst', 'citrine', 'pyrite', 'mica',
      'obsidian', 'fluorite', 'olivine', 'garnet', 'malachite',
      'azurite', 'turquoise', 'agate', 'jasper', 'chalcopyrite',
      'sphalerite', 'sodalite', 'rhodonite', 'opal', 'kyanite',
      'rutile', 'tourmaline', 'copper', 'ilmenite', 'arsenopyrite',
      'tigers-eye', 'rose-quartz', 'carnelian', 'iolite', 'sunstone', 'kunzite',
      'augite', 'sillimanite', 'chlorite', 'actinolite', 'wollastonite',
    ],
    backgroundColors: ['#3a2d4a', '#1a0f2e'],
    gridIcon: '💎',
  },
  {
    id: 'deep-shaft',
    name: 'Deep Shaft',
    description: 'A deep underground mine with rare and valuable minerals. Expert-level identification required.',
    difficulty: 'hard',
    minerals: [
      'amethyst', 'magnetite', 'galena', 'fluorite', 'corundum',
      'diamond', 'topaz', 'garnet', 'hematite', 'malachite',
      'azurite', 'turquoise', 'jade', 'chalcopyrite', 'sphalerite',
      'beryl', 'lapis-lazuli', 'opal', 'kyanite', 'pyrrhotite',
      'rutile', 'tourmaline', 'gold', 'zircon',
      'native-iron', 'ilmenite', 'franklinite', 'arsenopyrite',
      'wolframite', 'chromite', 'bismuth', 'platinum',
      'augite', 'sillimanite', 'actinolite', 'jadeite',
    ],
    backgroundColors: ['#1a0a0a', '#0a0a1a'],
    gridIcon: '⛏️',
  },
  {
    id: 'nashville-shaft',
    name: 'Nashville Shaft',
    description: 'A limestone mine sunk into the Nashville Dome. The Central Tennessee Zinc District runs through here — sphalerite, galena, and fluorite alongside classic cave carbonate minerals.',
    difficulty: 'medium',
    minerals: [
      'calcite', 'dolomite', 'quartz', 'pyrite', 'marcasite',
      'sphalerite', 'galena', 'fluorite', 'barite', 'gypsum', 'aragonite',
      'hematite', 'chalcopyrite', 'smithsonite', 'cerussite', 'silver',
    ],
    backgroundColors: ['#362a20', '#1e160e'],
    gridIcon: '🏛️',
  },
  {
    id: 'crystal-peak-mine',
    name: 'Crystal Peak Mine',
    description: 'A high-altitude granite pegmatite mine in the Pikes Peak region of Colorado. Famous for world-class amazonite, smoky quartz, and Colorado\'s state gemstone, aquamarine.',
    difficulty: 'medium',
    minerals: [
      'amazonite', 'smoky-quartz', 'aquamarine', 'rhodochrosite',
      'fluorite', 'pyrite', 'garnet', 'topaz', 'turquoise', 'malachite', 'gold',
      'wolframite',
    ],
    backgroundColors: ['#2a3a4a', '#1a2a3a'],
    gridIcon: '🏔️',
  },
];

export function getLocationById(id: string): MineralLocation | undefined {
  return locations.find(l => l.id === id);
}
