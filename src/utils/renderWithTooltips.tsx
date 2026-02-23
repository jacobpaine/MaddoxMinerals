import Tooltip from '../components/common/Tooltip';

// Words that may appear in mineral descriptions, fun facts, hints, or results
export const MINERAL_WORD_TIPS: Record<string, string> = {
  // Science concepts
  'piezoelectric':    'Generates electricity when squeezed or bent',
  'pyroelectric':     'Generates electricity when heated or cooled',
  'double refraction':'When a crystal splits one beam of light into two separate beams',
  'magnetoreception': 'The ability to sense the Earth\'s magnetic field — used by animals to navigate',
  'evaporite':        'A mineral left behind when water evaporates and dries up',
  'fluorescence':     'Glowing under UV (black) light',
  'fluorescent':      'Glowing under UV (black) light',
  'dispersion':       'When a material splits light into rainbow colors — like a prism',
  'interference':     'When light waves overlap inside a crystal, producing shimmering rainbow colors',
  'anisotropy':       'When a property (like hardness) differs depending on which direction you measure',
  'oxidation':        'Reacting with oxygen — like iron rusting or copper turning green',
  'patina':           'The green coating that forms on copper after years of weathering',
  'ultramarine':      'A brilliant deep blue pigment historically made from ground lapis lazuli',
  'iridescent':       'Showing shifting rainbow-like colors that change as you move',
  'opalescence':      'A soft, shifting glow with many colors — like the surface of a soap bubble',
  'abrasive':         'A rough material used to scratch, grind, or polish harder things',
  'emery':            'A tough abrasive powder made from corundum — coats nail files and sandpaper',
  'pigment':          'A colored powder mixed into paint to give it color',
  'vermillion':       'A vivid scarlet-red pigment historically made from ground cinnabar',
  'irradiation':      'Exposure to natural radiation underground over millions of years',
  'intoxication':     'Getting drunk from alcohol',
  'plagioclase':      'A very common type of feldspar mineral found in many rocks',
  'anorthosite':      'A rock made almost entirely of feldspar',
  'amphibole':        'A group of dark rock-forming minerals common in granite',
  'igneous':          'Rock formed when melted rock (magma or lava) cools and hardens',
  'metamorphic':      'Rock changed by intense heat and pressure deep underground',
  'carbonate':        'A compound made from carbon bonded with oxygen (CO₃)',
  'silica':           'Silicon dioxide — one of the most common compounds in Earth\'s crust',
  'chalcedony':       'A fine-grained form of quartz — crystals too tiny to see',
  'refractive index': 'How strongly a material bends light — higher means more sparkle',
  'nuclear reactors': 'Machines that produce electricity by splitting atoms',
  'neutrons':         'Tiny particles found in the center of atoms',
  'ore':              'A rock containing useful metals worth extracting',
  'sulfide':          'A compound of sulfur bonded with a metal — like galena (lead sulfide) or pyrite (iron sulfide)',
  // Crystal structure terms
  'polymorphs':       'Minerals that share the same chemistry but form completely different crystal structures — like diamond and graphite (both pure carbon!)',
  'twinning':         'When two crystals grow together sharing a mirrored surface — creating symmetric, cross-shaped, or butterfly patterns',
  'twinned':          'Grown as two crystals sharing a mirrored surface — a form of crystal twinning',
  'prismatic':        'Shaped like a prism — long crystals with flat, parallel faces running their length',
  'cockscomb':        'A crystal cluster shaped like a rooster\'s comb — fan-shaped with ridged, overlapping blades',
  'inclusions':       'Tiny bits of other minerals or material trapped inside a crystal as it grew',
  // Gemstone terms
  'carats':           'A unit of weight for gemstones — 1 carat equals 0.2 grams (about the weight of a raindrop)',
  'lapidary':         'The craft of cutting, shaping, and polishing rough stones into gems',
  'nacre':            'Mother-of-pearl: the iridescent lining inside shells, built from microscopic layered minerals',
  'birthstone':       'A gemstone traditionally associated with a specific birth month',
  'chiastolite':      'A variety of andalusite with a dark cross-shaped pattern of carbon trapped inside',
  'amulet':           'An object worn or carried as a charm for magical protection',
  // Geological terms
  'stalactites':      'Mineral formations that hang down from cave ceilings, built up drip by drip over thousands of years',
  'petrified':        'When organic material (like wood or bone) is slowly replaced by minerals over millions of years, turning to stone',
  'concentric':       'Circles or rings that share the same center point — like growth rings inside a tree trunk',
  'Bronze Age':       'A prehistoric period (~3300–1200 BC) when humans first made tools and weapons from bronze (copper + tin)',
  // Chemistry & elements
  'chromium':         'A metallic element that gives rubies their red color, emeralds their green, and alexandrite its color-change',
  'phosphorus':       'A chemical element essential to all life — found in bones, DNA, and agricultural fertilizers',
  'sulfate':          'A chemical compound where sulfur is bonded with oxygen (SO₄) — forms when sulfide minerals weather in air',
  'titanium dioxide': 'A brilliant white pigment made from titanium — used in white paints, plastics, and sunscreen',
  'zirconium':        'A metallic element from zircon used in nuclear reactors because it barely absorbs neutrons',
  'mercury':          'A shiny metallic element that is liquid at room temperature — highly toxic',
  'barium':           'A metallic element whose compounds are used in medical X-ray imaging and oil-well drilling',
  'alloys':           'Metals made by combining two or more elements — usually stronger or more useful than either alone',
  'antibacterial':    'Capable of killing or stopping the growth of harmful bacteria',
  // Biology terms
  'hydroxyapatite':   'The natural mineral that makes up most of your bones and tooth enamel',
  'fluorapatite':     'The harder mineral that forms in tooth enamel when fluoride bonds with hydroxyapatite',
  // Physics terms
  'nanometers':       'Billionths of a meter — used to describe the incredibly thin crystal layers that split light into rainbow colors',
  // Geological processes
  'pegmatite':        'A very coarse-grained igneous rock with giant crystals — forms from the last mineral-rich fluids as magma cools',
  'pegmatites':       'Very coarse-grained igneous rocks with giant crystals — form from the last mineral-rich fluids as magma cools',
  // Historical/cultural terms
  'kohl':             'An ancient eye cosmetic made from powdered minerals like stibnite — still used in many cultures today',
  'flintlock':        'An early type of firearm (1600s–1800s) that used a striking mineral to create sparks and fire the shot',
  'microcline':       'A type of potassium feldspar — the same composition as orthoclase but with a slightly different crystal structure; amazonite is its green variety',
  'Cairngorm':        'The Scottish name for smoky quartz, from the Cairngorm Mountains — Scotland\'s national gemstone',
  // Mineral property terms (appear in hints and results)
  'Mohs scale':       'The standard 1–10 scale for measuring mineral hardness (1 = softest, 10 = hardest)',
  'streak':           'The color of a mineral\'s powder when rubbed on a rough surface',
  'luster':           'The way light reflects off a mineral\'s surface',
  'cleavage':         'How a mineral breaks — along flat surfaces or unevenly',
  'hardness':         'How resistant a mineral is to being scratched',
  // Luster types
  'vitreous':         'Glassy — like the surface of broken glass',
  'metallic':         'Shiny like a polished metal surface',
  'pearly':           'Soft glow like the inside of a shell',
  'silky':            'Smooth sheen like silk fabric',
  'resinous':         'Warm glow like dried tree sap or amber',
  'earthy':           'No shine — like dry clay or chalk',
  'adamantine':       'Brilliant sparkle like a diamond',
  'waxy':             'Soft glow like candle wax',
};

export function renderWithTooltips(text: string): React.ReactNode {
  const terms = Object.keys(MINERAL_WORD_TIPS).sort((a, b) => b.length - a.length);
  const escaped = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, i) => {
        const matched = terms.find(t => t.toLowerCase() === part.toLowerCase());
        if (matched) return <Tooltip key={i} tip={MINERAL_WORD_TIPS[matched]}>{part}</Tooltip>;
        return part;
      })}
    </>
  );
}
