import type { Mineral } from '../../types/mineral';
import { getHardnessRange, getDensityDescription } from '../../utils/mineralUtils';
import Tooltip from '../common/Tooltip';

const T = Tooltip;

interface Props {
  mineral: Mineral;
  revealedProperties: Set<string>;
  onReveal: (property: string) => void;
}

interface Tool {
  id: string;
  label: string;
  icon: string;
  description: React.ReactNode;
  revealedContent: (mineral: Mineral) => React.ReactNode;
  animation: string;
}

const LUSTER_TIPS: Record<string, string> = {
  metallic: 'Shiny like a polished metal surface',
  vitreous: 'Glassy — like the surface of broken glass',
  pearly: 'Soft glow like the inside of a shell',
  silky: 'Smooth sheen like silk fabric',
  resinous: 'Warm glow like dried tree sap or amber',
  earthy: 'No shine — like dry clay or chalk',
  adamantine: 'Brilliant sparkle like a diamond',
  waxy: 'Soft glow like candle wax',
};

const LUSTER_DESCRIPTIONS: Record<string, React.ReactNode> = {
  metallic: <>Shiny like polished metal — reflects light strongly</>,
  vitreous: <>Glassy — like broken glass or a window</>,
  pearly: <>Soft <T tip="Showing soft, shifting rainbow-like colors">iridescent</T> sheen — like the inside of a shell</>,
  silky: <>Silky sheen with a <T tip="Made of many thin, thread-like strands packed together">fibrous</T> texture</>,
  resinous: <>Like <T tip="Hardened tree sap — think of amber">resin</T> or amber — yellowish glow</>,
  earthy: <>Dull, no shine — like dry clay or chalk</>,
  adamantine: <>Brilliant, diamond-like sparkle</>,
  waxy: <>Soft waxy sheen — like candle wax</>,
};

const CLEAVAGE_TIPS: Record<string, string> = {
  none: 'This mineral breaks unevenly, not along flat surfaces',
  poor: 'Barely shows flat break surfaces',
  good: 'Tends to break along flat surfaces',
  perfect: 'Breaks very neatly along flat surfaces',
  basal: 'Splits into flat sheets in one direction',
  cubic: 'Splits into cube-like pieces',
  rhombohedral: 'Splits along angles forming a squished cube shape',
};

const CLEAVAGE_DESCRIPTIONS: Record<string, React.ReactNode> = {
  none: <>Breaks <T tip="In an uneven, unpredictable way — not along flat surfaces">irregularly</T> (<T tip="Curved, shell-like break surface — like how glass shatters">conchoidal</T> or uneven <T tip="The way a mineral breaks when it has no flat cleavage planes">fracture</T>)</>,
  poor: <>Barely visible cleavage planes</>,
  good: <>Breaks along flat planes in one direction</>,
  perfect: <>Excellent flat <T tip="Smooth, flat surfaces where the mineral splits cleanly">cleavage planes</T></>,
  basal: <>Perfect cleavage in one direction only (sheets)</>,
  cubic: <>Perfect cleavage in three directions at right angles</>,
  rhombohedral: <>Perfect cleavage in three directions forming a <T tip="A 3D diamond-like shape with six faces that are parallelograms">rhombus</T></>,
};

const TOOLS: Tool[] = [
  {
    id: 'hardness',
    label: 'Hardness Kit',
    icon: '🪨',
    description: (
      <><T tip="Rubbing materials against the mineral to see how easily it scratches">Scratch test</T> with various materials</>
    ),
    revealedContent: m => (
      <><T tip="How resistant a mineral is to being scratched — rated 1 (softest) to 10 (hardest)">Hardness</T> ~{getHardnessRange(m.hardness)}</>
    ),
    animation: 'scratch',
  },
  {
    id: 'streak',
    label: 'Streak Plate',
    icon: '✏️',
    description: (
      <>Rub on <T tip="A rough ceramic tile used to see the true color of a mineral's powder">unglazed porcelain</T></>
    ),
    revealedContent: m => (
      <><T tip="The color of a mineral's powder when rubbed on a rough surface — often different from the mineral's color">Streak</T>: {m.streak}</>
    ),
    animation: 'streak',
  },
  {
    id: 'luster',
    label: 'Light',
    icon: '💡',
    description: (
      <>Examine surface <T tip="How much light bounces off the surface — shiny or dull?">reflectivity</T></>
    ),
    revealedContent: m => (
      <>
        <T tip="The way light reflects off a mineral's surface">Luster</T>:{' '}
        <T tip={LUSTER_TIPS[m.luster] ?? m.luster}>{m.luster}</T>
        {' '}—{' '}
        {LUSTER_DESCRIPTIONS[m.luster] ?? m.luster}
      </>
    ),
    animation: 'glow',
  },
  {
    id: 'magnet',
    label: 'Magnet',
    icon: '🧲',
    description: (
      <>Check <T tip="Attracted to a magnet — caused by iron or other magnetic metals inside">magnetic</T> attraction</>
    ),
    revealedContent: m => (
      m.magnetic
        ? <><T tip="Pulled toward a magnet — this mineral contains iron or other magnetic metals">Magnetic</T>! Attracted to magnet</>
        : <>Not <T tip="Not pulled toward a magnet — no significant iron content">magnetic</T></>
    ),
    animation: 'snap',
  },
  {
    id: 'cleavage',
    label: 'Cleavage Viewer',
    icon: '🔍',
    description: (
      <>Examine <T tip="The flat, smooth surfaces where a mineral naturally splits apart">crystal faces</T> and break patterns</>
    ),
    revealedContent: m => (
      <>
        <T tip="The way a mineral breaks — some split along smooth flat surfaces, others shatter unevenly">Cleavage</T>:{' '}
        <T tip={CLEAVAGE_TIPS[m.cleavage] ?? m.cleavage}>{m.cleavage}</T>
        {' '}—{' '}
        {CLEAVAGE_DESCRIPTIONS[m.cleavage] ?? getCleavageDescriptionFallback(m.cleavage)}
      </>
    ),
    animation: 'rotate',
  },
  {
    id: 'density',
    label: 'Density Scale',
    icon: '⚖️',
    description: (
      <><T tip="How heavy a mineral is for its size — two same-sized minerals can feel very different">Density</T> test: weigh in air and water</>
    ),
    revealedContent: m => (
      <>
        <T tip="How heavy something is for its size — a higher number means heavier">Density</T>: ~{m.density.toFixed(1)}{' '}
        <T tip="Grams per cubic centimeter — a small cube (1cm per side) of this mineral would weigh this many grams">g/cm³</T>
        {' '}—{' '}
        {getDensityDescription(m.density)}
      </>
    ),
    animation: 'weigh',
  },
];

function getCleavageDescriptionFallback(cleavage: string): string {
  return cleavage;
}

export default function ToolPanel({ mineral, revealedProperties, onReveal }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {TOOLS.map(tool => {
        const revealed = revealedProperties.has(tool.id);
        return (
          <button
            key={tool.id}
            onClick={() => onReveal(tool.id)}
            className={`
              relative p-3 rounded-xl border text-left transition-all duration-200
              ${revealed
                ? 'bg-green-900/40 border-green-600/60 cursor-default'
                : 'bg-mineral-mid/60 border-purple-700/50 hover:border-purple-400 hover:bg-mineral-light/40 active:scale-95 cursor-pointer'
              }
            `}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{tool.icon}</span>
              <span className="text-xs font-bold text-white leading-tight">{tool.label}</span>
            </div>

            {revealed ? (
              <div className="text-xs text-green-300 leading-snug">
                {tool.revealedContent(mineral)}
              </div>
            ) : (
              <div className="text-xs text-purple-400">{tool.description}</div>
            )}

            {!revealed && (
              <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            )}
            {revealed && (
              <div className="absolute top-1 right-1 text-green-400 text-xs">✓</div>
            )}
          </button>
        );
      })}
    </div>
  );
}
