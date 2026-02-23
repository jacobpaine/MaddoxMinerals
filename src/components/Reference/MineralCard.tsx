import { useParams, useNavigate } from 'react-router-dom';
import { getMineralById } from '../../data/minerals';
import { getLocationById } from '../../data/locations';
import MineralIcon from '../shared/MineralIcon';
import { getHardnessDescription, getDensityDescription } from '../../utils/mineralUtils';
import Tooltip from '../common/Tooltip';
import { renderWithTooltips } from '../../utils/renderWithTooltips';

const T = Tooltip;

const RARITY_STYLES = {
  common:   'bg-gray-800 text-gray-300 border-gray-600',
  uncommon: 'bg-blue-900/50 text-blue-300 border-blue-600',
  rare:     'bg-yellow-900/50 text-yellow-300 border-yellow-600',
};

// ─── Luster ──────────────────────────────────────────────────────────────────

const LUSTER_TIPS: Record<string, string> = {
  metallic:   'Shiny like a polished metal surface',
  vitreous:   'Glassy — like the surface of broken glass',
  pearly:     'Soft glow like the inside of a shell',
  silky:      'Smooth sheen like silk fabric',
  resinous:   'Warm glow like dried tree sap or amber',
  earthy:     'No shine — like dry clay or chalk',
  adamantine: 'Brilliant sparkle like a diamond',
  waxy:       'Soft glow like candle wax',
};

const LUSTER_DESCRIPTIONS: Record<string, React.ReactNode> = {
  metallic:   <>Shiny like polished metal — reflects light strongly</>,
  vitreous:   <>Glassy — like broken glass or a window</>,
  pearly:     <>Soft <T tip="Showing soft, shifting rainbow-like colors">iridescent</T> sheen — like the inside of a shell</>,
  silky:      <>Silky sheen with a <T tip="Made of many thin, thread-like strands packed together">fibrous</T> texture</>,
  resinous:   <>Like <T tip="Hardened tree sap — think of amber">resin</T> or amber — yellowish glow</>,
  earthy:     <>Dull, no shine — like dry clay or chalk</>,
  adamantine: <>Brilliant, diamond-like sparkle</>,
  waxy:       <>Soft waxy sheen — like candle wax</>,
};

// ─── Cleavage ────────────────────────────────────────────────────────────────

const CLEAVAGE_TIPS: Record<string, string> = {
  none:         'This mineral breaks unevenly, not along flat surfaces',
  poor:         'Barely shows flat break surfaces',
  good:         'Tends to break along flat surfaces',
  perfect:      'Breaks very neatly along flat surfaces',
  basal:        'Splits into flat sheets in one direction',
  cubic:        'Splits into cube-like pieces',
  rhombohedral: 'Splits along angles forming a squished cube shape',
};

const CLEAVAGE_DESCRIPTIONS: Record<string, React.ReactNode> = {
  none:         <>Breaks <T tip="In an uneven, unpredictable way — not along flat surfaces">irregularly</T> (<T tip="Curved, shell-like break surface — like how glass shatters">conchoidal</T> or uneven <T tip="The way a mineral breaks when it has no flat cleavage planes">fracture</T>)</>,
  poor:         <>Barely visible cleavage planes</>,
  good:         <>Breaks along flat planes in one direction</>,
  perfect:      <>Excellent flat <T tip="Smooth, flat surfaces where the mineral splits cleanly">cleavage planes</T></>,
  basal:        <>Perfect cleavage in one direction only (sheets)</>,
  cubic:        <>Perfect cleavage in three directions at right angles</>,
  rhombohedral: <>Perfect cleavage in three directions forming a <T tip="A 3D diamond-like shape with six faces that are parallelograms">rhombus</T></>,
};

// ─── Crystal system ──────────────────────────────────────────────────────────

const CRYSTAL_SYSTEM_TIPS: Record<string, string> = {
  Trigonal:     'Atoms arranged with 3-fold symmetry — like a triangular prism',
  Cubic:        'Atoms in perfect cube-like patterns — looks the same from every direction',
  Monoclinic:   'Atoms in a slanted box-like pattern — like a leaning brick',
  Triclinic:    'Atoms in a slanted pattern with no equal sides — the least symmetric',
  Orthorhombic: 'Atoms in a rectangular box with three unequal side lengths',
  Hexagonal:    'Atoms arranged in a 6-sided (snowflake-like) pattern',
  Tetragonal:   'Atoms in a square-based pattern, stretched taller in one direction',
  Amorphous:    'No regular crystal pattern — atoms are randomly arranged, like glass',
};

// ─── Chemical formula renderer ───────────────────────────────────────────────

const ELEMENT_NAMES: Record<string, string> = {
  H:  'Hydrogen — the lightest element, part of water (H₂O)',
  B:  'Boron — a rare element found in tourmaline',
  C:  'Carbon — found in diamonds, coal, and all living things',
  O:  'Oxygen — the most abundant element in Earth\'s crust',
  F:  'Fluorine — a reactive element that gives fluorite its colors',
  Na: 'Sodium — one half of table salt (Na + Cl)',
  Mg: 'Magnesium — a lightweight silvery metal',
  Al: 'Aluminum — the most abundant metal in Earth\'s crust',
  Si: 'Silicon — forms the backbone of most rocks and minerals',
  P:  'Phosphorus — found in fertilizers and matches',
  S:  'Sulfur — smells like rotten eggs when burned',
  Cl: 'Chlorine — combined with sodium it makes table salt',
  K:  'Potassium — a soft metal found in many feldspars',
  Ca: 'Calcium — found in bones, shells, and limestone',
  Ti: 'Titanium — a strong, lightweight silvery metal',
  Mn: 'Manganese — gives minerals pink and black colors',
  Fe: 'Iron — gives minerals red, black, or metallic colors',
  Cu: 'Copper — a reddish metal used in wires and coins',
  Zn: 'Zinc — a bluish-white metal used to coat steel',
  Zr: 'Zirconium — a heat-resistant metal used in nuclear reactors',
  Pb: 'Lead — an extremely heavy, soft metal',
  Au: 'Gold — the rare precious yellow metal',
  Be: 'Beryllium — a lightweight stiff metal found in emeralds',
};

const SUBSCRIPTS = '₀₁₂₃₄₅₆₇₈₉';

function toRegularDigits(s: string): string {
  return s.split('').map(c => {
    const idx = SUBSCRIPTS.indexOf(c);
    return idx >= 0 ? idx.toString() : c;
  }).join('');
}

function isSubOrDigit(ch: string): boolean {
  return SUBSCRIPTS.includes(ch) || /\d/.test(ch);
}

// Wrap element symbols in tooltips; subscripts/numbers immediately follow the symbol.
function renderFormula(formula: string): React.ReactNode {
  if (!formula || formula === 'Unknown') return formula;
  // Text-only formulas — no parsing needed
  if (!formula.match(/[A-Z]/)) return formula;
  if (formula === 'Composite rock' || formula === 'Complex borosilicate') return formula;

  const parts: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < formula.length) {
    const ch = formula[i];

    if (/[A-Z]/.test(ch)) {
      // Collect element symbol: 1 capital + optional 1 lowercase
      let symbol = ch;
      if (i + 1 < formula.length && /[a-z]/.test(formula[i + 1])) {
        symbol += formula[i + 1];
        i++;
      }
      i++;

      // Collect immediately following subscript/regular digits
      let numStr = '';
      while (i < formula.length && isSubOrDigit(formula[i])) {
        numStr += formula[i];
        i++;
      }

      const name = ELEMENT_NAMES[symbol];
      if (name) {
        const count = numStr ? parseInt(toRegularDigits(numStr)) : 1;
        const atomWord = count === 1 ? 'atom' : 'atoms';
        parts.push(
          <T key={key++} tip={`${name} — ${count} ${atomWord}`}>{symbol}{numStr}</T>
        );
      } else {
        parts.push(symbol + numStr);
      }
    } else {
      // Pass through parentheses, commas, dots, special subscripts, etc.
      parts.push(<span key={key++}>{ch}</span>);
      i++;
    }
  }

  return <>{parts}</>;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function MineralCard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mineral = getMineralById(id ?? '');

  if (!mineral) {
    return (
      <div className="min-h-screen bg-mineral-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🪨</div>
          <div className="text-white text-xl">Mineral not found</div>
          <button onClick={() => navigate('/reference')} className="btn-secondary mt-4">
            Back to Reference
          </button>
        </div>
      </div>
    );
  }

  const crystalTip = Object.entries(CRYSTAL_SYSTEM_TIPS).find(([key]) =>
    (mineral.crystalSystem ?? '').includes(key)
  )?.[1];

  const propertyRows: { label: React.ReactNode; value: React.ReactNode; icon: string }[] = [
    {
      label: (
        <T tip="A shorthand code showing which elements make up the mineral and how many of each — like a recipe for atoms. Hover each symbol to learn more!">
          Chemical Formula
        </T>
      ),
      value: renderFormula(mineral.formula ?? 'Unknown'),
      icon: '⚗️',
    },
    {
      label: (
        <T tip="The geometric pattern in which a mineral's atoms are arranged — determines the shape of its crystals">
          Crystal System
        </T>
      ),
      value: crystalTip
        ? <T tip={crystalTip}>{mineral.crystalSystem ?? 'Unknown'}</T>
        : (mineral.crystalSystem ?? 'Unknown'),
      icon: '🔷',
    },
    {
      label: <><T tip="How resistant to scratching — rated 1 (softest, like talc) to 10 (hardest, diamond)">Hardness</T> (Mohs)</>,
      value: `${mineral.hardness} — ${getHardnessDescription(mineral.hardness)}`,
      icon: '💪',
    },
    {
      label: <T tip="The color of a mineral's powder when rubbed on a rough surface — often different from the mineral's own color">Streak</T>,
      value: mineral.streak,
      icon: '✏️',
    },
    {
      label: <T tip="The way light reflects off a mineral's surface">Luster</T>,
      value: (
        <>
          <T tip={LUSTER_TIPS[mineral.luster] ?? mineral.luster}>{mineral.luster}</T>
          {' '}—{' '}
          {LUSTER_DESCRIPTIONS[mineral.luster] ?? mineral.luster}
        </>
      ),
      icon: '✨',
    },
    {
      label: <T tip="How a mineral breaks — some split along flat surfaces, others shatter unevenly">Cleavage</T>,
      value: (
        <>
          <T tip={CLEAVAGE_TIPS[mineral.cleavage] ?? mineral.cleavage}>{mineral.cleavage}</T>
          {' '}—{' '}
          {CLEAVAGE_DESCRIPTIONS[mineral.cleavage] ?? mineral.cleavage}
        </>
      ),
      icon: '🔪',
    },
    {
      label: <T tip="How heavy a mineral is for its size — two same-sized minerals can feel very different">Density</T>,
      value: (
        <>
          {mineral.density}{' '}
          <T tip="Grams per cubic centimeter — a small cube (1cm per side) of this mineral would weigh this many grams">g/cm³</T>
          {' '}—{' '}
          {getDensityDescription(mineral.density)}
        </>
      ),
      icon: '⚖️',
    },
    { label: 'Colors', value: mineral.colorNames.join(', '), icon: '🎨' },
    {
      label: <T tip="Whether a magnet will be attracted to this mineral — caused by iron content">Magnetic</T>,
      value: mineral.magnetic ? 'Yes — attracted to magnets' : 'No',
      icon: '🧲',
    },
    { label: 'Value', value: `${mineral.value} coins`, icon: '💰' },
  ];

  return (
    <div className="min-h-screen bg-mineral-dark p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/reference')}
            className="text-purple-400 hover:text-white transition-colors text-sm"
          >
            ← Reference
          </button>
          <button
            onClick={() => navigate(`/toolshed?mineral=${mineral.id}`)}
            className="btn-primary ml-auto text-sm py-2 px-4"
          >
            Practice ID →
          </button>
        </div>

        {/* Hero */}
        <div className="card mb-4">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div
              className="w-full md:w-48 h-48 rounded-xl flex-shrink-0 flex items-center justify-center relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${mineral.color[0]}40, ${mineral.color[mineral.color.length - 1]}20)`,
              }}
            >
              <MineralIcon id={mineral.id} size={180} />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-display font-bold text-3xl text-white">{mineral.name}</h1>
                <span className={`text-xs font-bold px-2 py-1 rounded border ${RARITY_STYLES[mineral.rarity]}`}>
                  {mineral.rarity}
                </span>
              </div>
              {mineral.formula && (
                <div className="text-mineral-gem text-sm font-mono mt-1">
                  {renderFormula(mineral.formula)}
                </div>
              )}
              <p className="text-purple-200 mt-3 leading-relaxed">{mineral.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {mineral.locations.map(loc => {
                  const location = getLocationById(loc);
                  return (
                    <span key={loc} className="text-xs bg-purple-900/50 border border-purple-700 px-2 py-1 rounded text-purple-300">
                      {location ? `${location.gridIcon} ${location.name}` : loc}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Properties table */}
        <div className="card mb-4">
          <h2 className="font-display font-bold text-mineral-gold mb-3">Properties</h2>
          <div className="space-y-2">
            {propertyRows.map(({ label, value, icon }, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                <span className="text-lg w-7 flex-shrink-0">{icon}</span>
                <div className="flex flex-col sm:flex-row sm:gap-4 flex-1">
                  <span className="text-purple-400 text-sm font-bold w-36 flex-shrink-0">{label}</span>
                  <span className="text-white text-sm capitalize">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fun fact */}
        <div className="card bg-gradient-to-r from-yellow-900/30 to-amber-900/20 border-yellow-700/50">
          <div className="flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <div className="font-bold text-mineral-gold mb-1">Fun Fact</div>
              <p className="text-yellow-100/80 text-sm leading-relaxed">
                {renderWithTooltips(mineral.funFact)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
