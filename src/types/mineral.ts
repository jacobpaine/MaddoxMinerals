export type LusterType =
  | 'metallic'
  | 'vitreous'
  | 'pearly'
  | 'silky'
  | 'resinous'
  | 'earthy'
  | 'adamantine'
  | 'waxy';

export type CleavageType =
  | 'none'
  | 'poor'
  | 'good'
  | 'perfect'
  | 'basal'
  | 'cubic'
  | 'rhombohedral';

export type RarityType = 'common' | 'uncommon' | 'rare';

export type LocationId = 'cave-mine' | 'gem-quarry' | 'deep-shaft' | 'nashville-shaft' | 'crystal-peak-mine';

export interface Mineral {
  id: string;
  name: string;
  hardness: number;       // Mohs 1–10
  streak: string;         // color name
  luster: LusterType;
  cleavage: CleavageType;
  color: string[];        // possible display colors (hex)
  colorNames: string[];   // human-readable color names
  magnetic: boolean;
  density: number;        // g/cm³
  description: string;
  funFact: string;
  value: number;          // shop selling price 1–100
  rarity: RarityType;
  locations: LocationId[];
  crystalSystem?: string;
  formula?: string;
}

export interface MineralLocation {
  id: LocationId;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  minerals: string[];     // mineral ids that can appear here
  backgroundColors: [string, string]; // gradient stops
  gridIcon: string;       // emoji for location
}

export interface InventoryItem {
  mineral: Mineral;
  identified: boolean;
  quantity: number;
}

export interface ToolShedState {
  phase: 'testing' | 'guessing' | 'result';
  currentMineral: Mineral | null;
  round: number;
  score: number;
  toolsUsed: Set<string>;
  revealedProperties: Set<string>;
  lastGuess: string | null;
  correct: boolean | null;
  hint: string | null;
}

export interface MiningState {
  phase: 'select-location' | 'mining' | 'shop';
  location: MineralLocation | null;
  grid: GridCell[][];
  battery: number;
  maxBattery: number;
  inventory: InventoryItem[];
  totalEarnings: number;
  digCount: number;
}

export interface GridCell {
  row: number;
  col: number;
  revealed: boolean;
  mineral: Mineral | null;
  empty: boolean;
  animating: boolean;
}
