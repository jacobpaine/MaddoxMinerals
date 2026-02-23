import type { Mineral, InventoryItem } from '../types/mineral';
import { minerals } from '../data/minerals';

export function pickRandomMineral(pool: Mineral[], exclude?: string[]): Mineral {
  const available = exclude
    ? pool.filter(m => !exclude.includes(m.id))
    : pool;
  return available[Math.floor(Math.random() * available.length)];
}

export function getHardnessDescription(hardness: number): string {
  if (hardness <= 1) return 'Extremely soft — easily scratched with a fingernail';
  if (hardness <= 2) return 'Very soft — scratched by a fingernail';
  if (hardness <= 3) return 'Soft — scratched by a copper coin';
  if (hardness <= 4) return 'Fairly soft — scratched by a steel nail';
  if (hardness <= 5) return 'Medium — scratched by a steel file';
  if (hardness <= 6) return 'Medium-hard — scratched by glass, scratches steel';
  if (hardness <= 7) return 'Hard — scratches glass easily';
  if (hardness <= 8) return 'Very hard — scratches quartz';
  if (hardness <= 9) return 'Extremely hard — scratches topaz';
  return 'Hardest natural mineral — scratches everything';
}

export function getHardnessRange(hardness: number): string {
  if (hardness <= 2) return '1–2 (scratched by fingernail)';
  if (hardness <= 3) return '2.5–3 (scratched by penny)';
  if (hardness <= 4) return '3–4 (scratched by nail)';
  if (hardness <= 5) return '4.5–5 (scratched by steel file)';
  if (hardness <= 6) return '5.5–6 (scratches glass)';
  if (hardness <= 7) return '6.5–7 (scratches glass easily)';
  if (hardness <= 8) return '7.5–8 (very hard)';
  if (hardness <= 9) return '8.5–9 (extremely hard)';
  return '10 (hardest)';
}

export function getLusterDescription(luster: string): string {
  const descriptions: Record<string, string> = {
    metallic: 'Shiny like polished metal — reflects light strongly',
    vitreous: 'Glassy — like broken glass or a window',
    pearly: 'Soft iridescent sheen — like the inside of a shell',
    silky: 'Silky sheen with a fibrous texture',
    resinous: 'Like resin or amber — yellowish glow',
    earthy: 'Dull, no shine — like dry clay or chalk',
    adamantine: 'Brilliant, diamond-like sparkle',
    waxy: 'Soft waxy sheen — like candle wax',
  };
  return descriptions[luster] || luster;
}

export function getCleavageDescription(cleavage: string): string {
  const descriptions: Record<string, string> = {
    none: 'Breaks irregularly (conchoidal or uneven fracture)',
    poor: 'Barely visible cleavage planes',
    good: 'Breaks along flat planes in one direction',
    perfect: 'Excellent flat cleavage planes',
    basal: 'Perfect cleavage in one direction only (sheets)',
    cubic: 'Perfect cleavage in three directions at right angles',
    rhombohedral: 'Perfect cleavage in three directions forming a rhombus',
  };
  return descriptions[cleavage] || cleavage;
}

export function getDensityDescription(density: number): string {
  if (density < 2) return 'Very light — lighter than most rocks';
  if (density < 3) return 'Light — average rock weight';
  if (density < 4) return 'Moderate — slightly heavier than average';
  if (density < 5) return 'Heavy — noticeably heavy for its size';
  if (density < 8) return 'Very heavy — much heavier than typical rocks';
  return 'Extremely heavy — like solid metal';
}

export function calculateToolShedScore(
  correct: boolean,
  toolsUsed: number,
): number {
  if (!correct) return 0;
  const baseScore = 100;
  const toolBonus = Math.max(0, (6 - toolsUsed) * 10);
  return baseScore + toolBonus;
}

export function calculateSellValue(item: InventoryItem): number {
  if (item.identified) return item.mineral.value;
  return Math.floor(item.mineral.value * 0.3); // unidentified = 30% value
}

export function calculateInventoryValue(inventory: InventoryItem[]): number {
  return inventory.reduce((total, item) => total + calculateSellValue(item) * item.quantity, 0);
}

export function getHint(mineral: Mineral, guessedName: string): string {
  const guess = guessedName.toLowerCase();
  const name = mineral.name.toLowerCase();

  // Check if the guess is close
  if (name.includes(guess) || guess.includes(name.split(' ')[0])) {
    return `Almost! Think about the ${mineral.hardness < 4 ? 'softness' : 'hardness'} — it\'s ${mineral.hardness} on the Mohs scale.`;
  }

  // Provide a property-based hint
  const hints = [
    `Hint: The streak color is ${mineral.streak}.`,
    `Hint: The luster is ${mineral.luster} — ${getLusterDescription(mineral.luster)}.`,
    `Hint: It has ${mineral.cleavage} cleavage.`,
    `Hint: Hardness is ${mineral.hardness} on the Mohs scale.`,
  ];

  return hints[Math.floor(Math.random() * hints.length)];
}

export function getAllMineralNames(): string[] {
  return minerals.map(m => m.name).sort();
}

export function getHighScores(key: string): number[] {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveHighScore(key: string, score: number): void {
  try {
    const scores = getHighScores(key);
    scores.push(score);
    scores.sort((a, b) => b - a);
    localStorage.setItem(key, JSON.stringify(scores.slice(0, 10)));
  } catch {
    // ignore storage errors
  }
}

export interface NamedScore {
  name: string;
  score: number;
}

export function getNamedHighScores(key: string): NamedScore[] {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    // Guard against old plain-number format
    if (!Array.isArray(parsed) || typeof parsed[0] === 'number') return [];
    return parsed as NamedScore[];
  } catch {
    return [];
  }
}

export function saveNamedHighScore(key: string, score: number, name: string): void {
  try {
    const scores = getNamedHighScores(key);
    scores.push({ name: name.trim() || 'Anonymous', score });
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem(key, JSON.stringify(scores.slice(0, 10)));
  } catch {
    // ignore storage errors
  }
}

export function isNamedHighScore(key: string, score: number): boolean {
  if (score <= 0) return false;
  const scores = getNamedHighScores(key);
  return scores.length < 10 || score > scores[scores.length - 1].score;
}
