interface Props {
  id: string;
  size?: number;
}

export default function MineralIcon({ id, size = 64 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <Shape id={id} />
    </svg>
  );
}

function Shape({ id }: { id: string }) {
  switch (id) {
    // Hexagonal prism clusters
    case 'quartz':     return <HexCluster c1="#e8eaf6" c2="#b0b4cc" c3="#f0f2ff" />;
    case 'amethyst':   return <HexCluster c1="#9b59b6" c2="#6c3483" c3="#d7bde2" />;
    case 'citrine':    return <HexCluster c1="#f4d03f" c2="#ca8a04" c3="#fef9c3" />;
    case 'beryl':      return <HexCluster c1="#50c878" c2="#166534" c3="#bbf7d0" />;
    case 'tourmaline': return <Tourmaline />;
    case 'corundum':   return <Corundum />;

    // Cubic / octahedral
    case 'pyrite':     return <IsoCube c1="#cda434" c2="#8a6b10" c3="#e0c050" />;
    case 'galena':     return <SteppedCubes />;
    case 'halite':     return <IsoCube c1="#ffe8e8" c2="#c8a8a8" c3="#fff0f0" />;
    case 'diamond':    return <Diamond />;
    case 'fluorite':   return <Fluorite />;
    case 'magnetite':  return <OctahedronIcon c1="#2d2d2d" c2="#141414" c3="#454545" />;
    case 'sodalite':   return <IsoCube c1="#2874a6" c2="#1a4a7a" c3="#5dade2" />;
    case 'sphalerite': return <IsoCube c1="#8b6914" c2="#3d2b00" c3="#c8a040" />;
    case 'zircon':     return <TetraPrism c1="#b0c4de" c2="#7090b0" c3="#d8e8f8" />;

    // Metallic masses
    case 'hematite':     return <PlatyStack c1="#6a0000" c2="#8b0000" c3="#a03030" />;
    case 'chalcopyrite': return <IridescentMass />;
    case 'pyrrhotite':   return <MetallicMass c1="#8b6914" c2="#5a3a08" c3="#b08020" />;
    case 'copper':       return <DendriticMass c1="#b87333" c2="#7a4010" c3="#da8a50" />;
    case 'gold':         return <DendriticMass c1="#ffd700" c2="#b8860b" c3="#ffe88a" />;

    // Banded / patterned
    case 'malachite':    return <BandedOval c1="#00a550" c2="#005e2c" c3="#4cae4c" />;
    case 'agate':        return <BandedRings c1="#c08040" c2="#8a5020" c3="#e8c080" />;
    case 'jasper':       return <MottledStone c1="#8b0000" c2="#a0522d" c3="#cd853f" />;
    case 'lapis-lazuli': return <Lapis />;
    case 'rhodonite':    return <VeinedStone base="#d4547a" vein="#1a1a1a" hi="#f0a0c0" />;
    case 'turquoise':    return <VeinedStone base="#40e0d0" vein="#3d2b10" hi="#7fffd4" />;
    case 'jade':         return <SmoothStone c1="#355e3b" c2="#4a7c59" c3="#68a077" />;

    // Platy / sheet
    case 'mica':      return <StackedSheets c1="#c8c8a0" c2="#9a9a78" c3="#e0e0b8" />;
    case 'talc':      return <StackedSheets c1="#e8e8d8" c2="#c0c0b0" c3="#f5f5ee" />;
    case 'kyanite':   return <BladeCluster c1="#4682b4" c2="#2c5a8a" c3="#a0c8e8" />;
    case 'selenite':  return <CrossingNeedles />;
    case 'gypsum':    return <StackedSheets c1="#f5f5f0" c2="#c8c8b8" c3="#fffff8" />;

    // Rounded nodules
    case 'garnet':   return <DodecaCluster c1="#8b0000" c2="#500000" c3="#c0392b" />;
    case 'azurite':  return <Azurite />;
    case 'opal':     return <Opal />;
    case 'obsidian': return <Obsidian />;
    case 'olivine':  return <RoundedGrains c1="#4a7c59" c2="#2a5238" c3="#6aaa6a" />;

    // Prismatic
    case 'topaz':      return <TetraPrism c1="#ffd700" c2="#b8860b" c3="#fff380" />;
    case 'hornblende': return <BladeCluster c1="#1a1a1a" c2="#0a0a0a" c3="#304030" />;
    case 'feldspar':   return <Feldspar />;
    case 'calcite':    return <RhomboIcon c1="#f8f8f8" c2="#c0c8c0" c3="#e8f0e8" />;
    case 'dolomite':   return <RhomboIcon c1="#f0ece0" c2="#c0b090" c3="#e8d8c0" />;
    case 'rutile':     return <TetraPrism c1="#b05010" c2="#703010" c3="#d07030" />;

    case 'marcasite':     return <BladeCluster c1="#d4c870" c2="#8a8020" c3="#f0e898" />;

    // ── New minerals ─────────────────────────────────────────────────────────
    // Mohs reference + industrial common
    case 'apatite':       return <HexCluster c1="#7cd8a8" c2="#3a7a58" c3="#c8f4e0" />;
    case 'orthoclase':    return <TetraPrism c1="#ede8dc" c2="#c4b898" c3="#fffef4" />;
    case 'sulfur':        return <SulfurCrystal />;

    // Native metals
    case 'silver':        return <DendriticMass c1="#d8d8d8" c2="#909090" c3="#f5f5f5" />;

    // Carbonates
    case 'cinnabar':      return <RhomboIcon c1="#cc1111" c2="#880808" c3="#ff5555" />;
    case 'rhodochrosite': return <BandedRings c1="#e75480" c2="#ad1457" c3="#f8bbd0" />;
    case 'aragonite':     return <TetraPrism c1="#fff8e8" c2="#d8c898" c3="#fffff4" />;
    case 'smithsonite':   return <BandedOval c1="#a0d4d4" c2="#6898a0" c3="#d4f0f0" />;

    // Copper minerals
    case 'chrysocolla':   return <RoundedGrains c1="#1abc9c" c2="#0d8870" c3="#80e8c8" />;
    case 'bornite':       return <Bornite />;

    // Metallic ores
    case 'stibnite':      return <BladeCluster c1="#a0a0a0" c2="#585858" c3="#d8d8d8" />;
    case 'cassiterite':   return <TetraPrism c1="#4a3020" c2="#1e0c04" c3="#7a5038" />;
    case 'molybdenite':   return <PlatyStack c1="#909090" c2="#585858" c3="#c8c8c8" />;

    // Optical / iridescent feldspars
    case 'labradorite':   return <Labradorite />;
    case 'moonstone':     return <SmoothStone c1="#e8eaf6" c2="#9fa8da" c3="#ffffff" />;

    // Gemstones
    case 'vanadinite':    return <HexCluster c1="#dd5500" c2="#992200" c3="#ff9966" />;
    case 'epidote':       return <TetraPrism c1="#8aad44" c2="#4a6820" c3="#c0e070" />;
    case 'spinel':        return <OctahedronIcon c1="#cc0022" c2="#880011" c3="#ff4466" />;
    case 'tanzanite':     return <TetraPrism c1="#6a0dad" c2="#3d0070" c3="#c084ff" />;
    case 'chrysoberyl':   return <RhomboIcon c1="#d4b040" c2="#906818" c3="#f0d070" />;
    case 'andalusite':    return <BladeCluster c1="#c87830" c2="#8a4818" c3="#f0a858" />;
    case 'staurolite':    return <StauroliteCross />;

    // Tabular / sulphates
    case 'barite':        return <StackedSheets c1="#e8f4ff" c2="#a8c8e0" c3="#f4faff" />;
    case 'wulfenite':     return <StackedSheets c1="#ff8c00" c2="#cc4800" c3="#ffcc44" />;

    // Botryoidal masses
    case 'prehnite':      return <RoundedGrains c1="#c8e0a0" c2="#8ab068" c3="#e8f4c0" />;

    // Nashville Shaft additions
    case 'cerussite':    return <TetraPrism c1="#f0eee8" c2="#b0aca4" c3="#faf8f4" />;

    // Colorado Springs minerals
    case 'amazonite':    return <TetraPrism c1="#4fc8a0" c2="#2a7858" c3="#a0f0d8" />;
    case 'smoky-quartz': return <HexCluster c1="#7a6a5a" c2="#3a2a1a" c3="#b0a090" />;
    case 'aquamarine':   return <HexCluster c1="#7fd4e8" c2="#3880a8" c3="#c0f0ff" />;

    // ── Igneous & metamorphic ─────────────────────────────────────────────
    case 'augite':       return <BladeCluster c1="#1a2a1a" c2="#0a1a0a" c3="#304030" />;
    case 'sillimanite':  return <BladeCluster c1="#dcdcd4" c2="#a4a49c" c3="#f0f0e8" />;
    case 'chlorite':     return <StackedSheets c1="#3a6a3a" c2="#284a28" c3="#5a8a5a" />;
    case 'actinolite':   return <BladeCluster c1="#2a7a3a" c2="#185228" c3="#4a9a5a" />;
    case 'serpentine':   return <VeinedStone base="#2a6428" vein="#5a9450" hi="#4a8848" />;
    case 'jadeite':      return <SmoothStone c1="#1a8a3a" c2="#0a6028" c3="#3aaa5a" />;
    case 'wollastonite': return <BladeCluster c1="#e8e8e0" c2="#b4b4ac" c3="#f8f8f4" />;

    // ── Metals & magnetic minerals ────────────────────────────────────────
    case 'native-iron':  return <MetallicMass c1="#686868" c2="#484848" c3="#909090" />;
    case 'ilmenite':     return <PlatyStack c1="#151515" c2="#202020" c3="#303030" />;
    case 'franklinite':  return <OctahedronIcon c1="#2a1a08" c2="#140c04" c3="#3a2a14" />;
    case 'arsenopyrite': return <BladeCluster c1="#c4c4bc" c2="#909090" c3="#d8d8d4" />;
    case 'wolframite':   return <StackedSheets c1="#151510" c2="#0e0e0a" c3="#282820" />;
    case 'chromite':     return <OctahedronIcon c1="#1e0e04" c2="#0e0800" c3="#2e1808" />;
    case 'bismuth':      return <BismuthCrystal />;
    case 'platinum':     return <RoundedGrains c1="#e8e8e8" c2="#b8b8b8" c3="#f8f8f8" />;

    // ── Gem quarry gemstones ──────────────────────────────────────────────
    case 'tigers-eye':   return <TigersEye />;
    case 'rose-quartz':  return <SmoothStone c1="#f4c2c2" c2="#e0a0a0" c3="#fcd5d5" />;
    case 'carnelian':    return <SmoothStone c1="#c84b14" c2="#a03010" c3="#e86030" />;
    case 'iolite':       return <TetraPrism c1="#4b3080" c2="#302060" c3="#8070c0" />;
    case 'sunstone':     return <Sunstone />;
    case 'kunzite':      return <TetraPrism c1="#e8b0d8" c2="#c080b8" c3="#f8d8f0" />;

    default: return <DefaultGem />;
  }
}

// ─── Shared shape components ──────────────────────────────────────────────────

function HexCluster({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return (
    <g>
      <polygon points="26,12 40,30 40,82 18,82 18,30" fill={c2} opacity={0.65} />
      <polygon points="74,14 82,28 82,80 58,80 58,28" fill={c2} opacity={0.65} />
      <polygon points="50,5 67,26 67,90 33,90 33,26" fill={c1} />
      <polygon points="50,5 62,26 60,60 40,60 38,26" fill="white" opacity={0.16} />
      <line x1="33" y1="26" x2="67" y2="26" stroke={c3} strokeWidth="0.8" opacity={0.5} />
      <line x1="50" y1="5" x2="50" y2="90" stroke={c3} strokeWidth="0.4" opacity={0.25} />
    </g>
  );
}

function IsoCube({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return (
    <g>
      <polygon points="50,18 78,34 50,50 22,34" fill={c3} />
      <polygon points="22,34 50,50 50,78 22,62" fill={c1} />
      <polygon points="50,50 78,34 78,62 50,78" fill={c2} />
      <polyline points="22,34 50,18 78,34 78,62 50,78 22,62 22,34"
        fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
      <line x1="50" y1="18" x2="50" y2="78" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
      <line x1="22" y1="62" x2="78" y2="34" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
    </g>
  );
}

function SteppedCubes() {
  return (
    <g>
      <polygon points="60,15 80,25 60,35 40,25" fill="#b0b0b0" />
      <polygon points="40,25 60,35 60,55 40,45" fill="#808080" />
      <polygon points="60,35 80,25 80,45 60,55" fill="#606060" />
      <polygon points="45,42 72,57 45,72 18,57" fill="#c0c0c0" />
      <polygon points="18,57 45,72 45,92 18,77" fill="#909090" />
      <polygon points="45,72 72,57 72,77 45,92" fill="#707070" />
      <polyline points="18,57 45,42 72,57 72,77 45,92 18,77 18,57"
        fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="0.7" />
    </g>
  );
}

function Diamond() {
  return (
    <g>
      <polygon points="50,10 80,50 50,70 20,50" fill="#e8f4f8" />
      <polygon points="50,10 80,50 50,70" fill="#ffc8c8" opacity={0.45} />
      <polygon points="50,10 50,70 20,50" fill="#c8ffc8" opacity={0.4} />
      <polygon points="50,10 65,40 55,60 45,40" fill="white" opacity={0.38} />
      <polygon points="20,50 50,70 80,50 50,90" fill="#c0d8e8" />
      <polygon points="50,70 80,50 50,90" fill="#a0c4dc" />
      <polygon points="20,50 50,70 50,90" fill="#b8d0e0" />
      <polyline points="50,10 80,50 50,90 20,50 50,10"
        fill="none" stroke="rgba(180,220,240,0.8)" strokeWidth="0.8" />
      <line x1="20" y1="50" x2="80" y2="50" stroke="rgba(150,200,220,0.5)" strokeWidth="0.5" />
    </g>
  );
}

function Fluorite() {
  return (
    <g>
      <polygon points="50,10 80,50 50,70 20,50" fill="#7b68ee" />
      <polygon points="50,10 80,50 50,70" fill="#9980ff" opacity={0.5} />
      <polygon points="20,50 50,70 80,50 50,90" fill="#90ee90" />
      <polygon points="50,70 80,50 50,90" fill="#70cc70" />
      <line x1="20" y1="50" x2="80" y2="50" stroke="white" strokeWidth="0.8" opacity={0.5} />
      <polygon points="50,10 65,38 52,55 38,38" fill="white" opacity={0.2} />
      <polyline points="50,10 80,50 50,90 20,50 50,10"
        fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
    </g>
  );
}

function Tourmaline() {
  return (
    <g>
      <polygon points="26,12 40,30 40,82 18,82 18,30" fill="#004d00" opacity={0.6} />
      <polygon points="50,5 67,26 67,90 33,90 33,26" fill="#00aa44" />
      <polygon points="50,5 60,26 60,90 40,90 40,26" fill="#cc4488" opacity={0.82} />
      <polygon points="50,5 62,26 60,55 40,55 38,26" fill="white" opacity={0.14} />
      <line x1="33" y1="26" x2="67" y2="26" stroke="#88ffaa" strokeWidth="0.7" opacity={0.5} />
    </g>
  );
}

function Corundum() {
  return (
    <g>
      <polygon points="72,14 82,28 82,80 58,80 58,28" fill="#4444aa" opacity={0.6} />
      <polygon points="50,5 67,26 67,90 33,90 33,26" fill="#cc0000" />
      <polygon points="50,5 67,26 67,55 33,55 33,26" fill="#0000cc" />
      <line x1="33" y1="55" x2="67" y2="55" stroke="white" strokeWidth="1" opacity={0.4} />
      <polygon points="50,5 60,26 58,50 42,50 40,26" fill="white" opacity={0.14} />
      <line x1="33" y1="26" x2="67" y2="26" stroke="rgba(255,255,255,0.5)" strokeWidth="0.7" />
    </g>
  );
}

function TetraPrism({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return (
    <g>
      <polygon points="40,10 60,10 65,28 65,78 60,90 40,90 35,78 35,28" fill={c1} />
      <polygon points="60,10 65,28 65,78 60,90 62,90 68,78 68,28 64,10" fill={c2} opacity={0.75} />
      <polygon points="40,10 60,10 64,10 50,5 36,10" fill={c3} />
      <polygon points="40,10 55,28 53,60 40,60 38,28" fill="white" opacity={0.17} />
      <line x1="35" y1="28" x2="65" y2="28" stroke={c3} strokeWidth="0.7" opacity={0.5} />
      <line x1="35" y1="78" x2="65" y2="78" stroke="rgba(0,0,0,0.2)" strokeWidth="0.6" />
    </g>
  );
}

function PlatyStack({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  const ys = [20, 32, 44, 56, 68, 78];
  return (
    <g>
      {ys.map((y, i) => (
        <ellipse key={i} cx="50" cy={y} rx={28 - i} ry={6}
          fill={i % 2 === 0 ? c1 : c2}
          stroke={c3} strokeWidth="0.4"
        />
      ))}
      <ellipse cx="42" cy="20" rx="16" ry="3" fill="rgba(255,255,255,0.2)" />
    </g>
  );
}

function MetallicMass({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return (
    <g>
      <polygon points="30,25 50,15 70,20 82,40 80,65 65,82 40,80 20,65 18,42" fill={c1} />
      <polygon points="30,25 50,15 70,20 72,35 58,30 42,32 30,40" fill={c3} opacity={0.55} />
      <polygon points="65,82 80,65 82,40 70,55 72,72" fill={c2} opacity={0.4} />
      <ellipse cx="44" cy="26" rx="10" ry="7" fill="white" opacity={0.2} transform="rotate(-20,44,26)" />
    </g>
  );
}

function IridescentMass() {
  return (
    <g>
      <polygon points="28,28 50,16 72,22 82,44 75,68 52,82 30,76 18,54 22,34" fill="#cfa020" />
      <polygon points="28,28 50,16 72,22 65,40 45,36" fill="#6060ff" opacity={0.35} />
      <polygon points="50,16 72,22 75,50 60,58 50,38" fill="#ff60ff" opacity={0.3} />
      <polygon points="30,76 52,82 70,65 60,58 38,62" fill="#4040ff" opacity={0.35} />
      <polygon points="28,28 35,55 45,68 38,62 22,54" fill="#ff8040" opacity={0.25} />
      <ellipse cx="42" cy="28" rx="12" ry="8" fill="white" opacity={0.2} transform="rotate(-15,42,28)" />
    </g>
  );
}

function DendriticMass({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return (
    <g>
      <circle cx="50" cy="60" r="26" fill={c1} />
      <line x1="50" y1="34" x2="50" y2="16" stroke={c2} strokeWidth="4" strokeLinecap="round" />
      <line x1="50" y1="22" x2="40" y2="10" stroke={c2} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="22" x2="62" y2="11" stroke={c2} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="28" x2="36" y2="19" stroke={c2} strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="52" x2="12" y2="44" stroke={c2} strokeWidth="3" strokeLinecap="round" />
      <line x1="14" y1="45" x2="8" y2="36" stroke={c2} strokeWidth="2" strokeLinecap="round" />
      <circle cx="43" cy="54" r="8" fill={c3} opacity={0.4} />
      <ellipse cx="40" cy="52" rx="6" ry="4" fill="white" opacity={0.2} />
    </g>
  );
}

function BandedOval({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return (
    <g>
      <ellipse cx="50" cy="52" rx="40" ry="36" fill={c2} />
      <ellipse cx="50" cy="52" rx="34" ry="30" fill={c3} />
      <ellipse cx="50" cy="52" rx="28" ry="24" fill={c2} />
      <ellipse cx="50" cy="52" rx="22" ry="18" fill={c1} />
      <ellipse cx="50" cy="52" rx="16" ry="12" fill={c2} />
      <ellipse cx="50" cy="52" rx="10" ry="7" fill={c3} />
      <ellipse cx="50" cy="52" rx="5" ry="3" fill={c1} />
      <ellipse cx="38" cy="38" rx="10" ry="6" fill="white" opacity={0.14} transform="rotate(-20,38,38)" />
    </g>
  );
}

function BandedRings({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return (
    <g>
      <circle cx="50" cy="50" r="40" fill={c1} />
      <circle cx="50" cy="50" r="35" fill={c3} />
      <circle cx="50" cy="50" r="29" fill={c2} />
      <circle cx="50" cy="50" r="23" fill={c3} />
      <circle cx="50" cy="50" r="17" fill={c1} />
      <circle cx="50" cy="50" r="12" fill={c3} />
      <circle cx="50" cy="50" r="7"  fill={c2} />
      <circle cx="50" cy="50" r="3"  fill={c3} />
      <ellipse cx="38" cy="38" rx="8" ry="5" fill="white" opacity={0.12} />
    </g>
  );
}

function MottledStone({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return (
    <g>
      <ellipse cx="50" cy="52" rx="40" ry="38" fill={c2} />
      <ellipse cx="35" cy="40" rx="16" ry="12" fill={c1} opacity={0.8} />
      <ellipse cx="65" cy="58" rx="14" ry="10" fill={c3} opacity={0.8} />
      <ellipse cx="48" cy="68" rx="18" ry="10" fill={c1} opacity={0.7} />
      <ellipse cx="62" cy="35" rx="10" ry="8"  fill={c3} opacity={0.6} />
      <ellipse cx="30" cy="65" rx="10" ry="8"  fill={c3} opacity={0.6} />
      <ellipse cx="38" cy="36" rx="10" ry="6" fill="white" opacity={0.12} transform="rotate(-20,38,36)" />
    </g>
  );
}

function Lapis() {
  return (
    <g>
      <ellipse cx="50" cy="52" rx="40" ry="37" fill="#1a3a6b" />
      <ellipse cx="50" cy="52" rx="40" ry="37" fill="#1560bd" opacity={0.5} />
      <ellipse cx="32" cy="40" rx="10" ry="7" fill="white" opacity={0.3} transform="rotate(-15,32,40)" />
      <ellipse cx="68" cy="65" rx="8"  ry="5" fill="white" opacity={0.22} transform="rotate(10,68,65)" />
      {([
        [55, 38], [45, 55], [65, 50], [35, 62], [60, 68], [72, 40], [40, 32],
      ] as [number, number][]).map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill="#daa520" opacity={0.85} />
      ))}
      <ellipse cx="36" cy="36" rx="10" ry="6" fill="white" opacity={0.15} transform="rotate(-20,36,36)" />
    </g>
  );
}

function VeinedStone({ base, vein, hi }: { base: string; vein: string; hi: string }) {
  return (
    <g>
      <ellipse cx="50" cy="52" rx="40" ry="37" fill={base} />
      <path d="M 20 40 Q 40 38 55 52 Q 70 66 85 60" fill="none" stroke={vein} strokeWidth="2.5" opacity={0.7} />
      <path d="M 28 70 Q 45 60 60 68 Q 72 75 80 72" fill="none" stroke={vein} strokeWidth="2" opacity={0.6} />
      <path d="M 35 28 Q 50 35 58 30" fill="none" stroke={vein} strokeWidth="1.8" opacity={0.5} />
      <ellipse cx="38" cy="36" rx="10" ry="6" fill={hi} opacity={0.25} transform="rotate(-20,38,36)" />
      <ellipse cx="36" cy="35" rx="7" ry="4" fill="white" opacity={0.12} />
    </g>
  );
}

function SmoothStone({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return (
    <g>
      <ellipse cx="50" cy="52" rx="40" ry="37" fill={c1} />
      <ellipse cx="50" cy="52" rx="33" ry="30" fill={c2} opacity={0.5} />
      <ellipse cx="36" cy="36" rx="14" ry="9" fill={c3} opacity={0.35} transform="rotate(-20,36,36)" />
      <ellipse cx="34" cy="34" rx="8"  ry="5" fill="white" opacity={0.18} transform="rotate(-20,34,34)" />
    </g>
  );
}

function StackedSheets({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  const sheets = [
    { y: 16, w: 66, x: 17 },
    { y: 28, w: 62, x: 19 },
    { y: 40, w: 66, x: 17 },
    { y: 52, w: 60, x: 20 },
    { y: 64, w: 62, x: 19 },
    { y: 76, w: 56, x: 22 },
  ];
  return (
    <g>
      {sheets.map((s, i) => (
        <rect key={i} x={s.x} y={s.y} width={s.w} height={10} rx="2"
          fill={i % 2 === 0 ? c1 : c2}
          stroke={c3} strokeWidth="0.4"
        />
      ))}
      <rect x="17" y="16" width="28" height="4" rx="1" fill="white" opacity={0.2} />
    </g>
  );
}

function BladeCluster({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return (
    <g>
      <polygon points="20,85 28,15 38,15 32,85" fill={c2} opacity={0.6} />
      <polygon points="68,88 76,18 86,18 78,88" fill={c2} opacity={0.6} />
      <polygon points="38,90 46,10 58,10 52,90" fill={c1} />
      <polygon points="46,10 54,10 52,50 44,50" fill={c3} opacity={0.4} />
      <polygon points="46,10 50,10 48,50 44,50" fill="white" opacity={0.15} />
    </g>
  );
}

function CrossingNeedles() {
  return (
    <g>
      <polygon points="14,82 20,14 26,15 22,84" fill="#f0f0e8" stroke="#c8c8b8" strokeWidth="0.4" />
      <polygon points="32,88 38,8 43,9 39,88"  fill="#f8f8f0" stroke="#d0d0c0" strokeWidth="0.4" />
      <polygon points="56,90 62,10 67,11 63,90" fill="#f0f0e8" stroke="#c8c8b8" strokeWidth="0.4" />
      <polygon points="12,30 86,38 86,46 12,38" fill="#e8e8d8" stroke="#b8b8a8" strokeWidth="0.4" opacity={0.8} />
      <polygon points="14,82 20,14 22,20 18,82" fill="white" opacity={0.25} />
      <polygon points="12,30 86,38 86,40 12,32" fill="white" opacity={0.2} />
    </g>
  );
}

function DodecaCluster({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return (
    <g>
      <polygon points="32,35 46,42 50,58 40,70 24,70 18,55 22,40" fill={c2} opacity={0.85} />
      <polygon points="58,25 75,34 80,52 72,68 56,74 40,68 34,50 42,34" fill={c1} />
      <line x1="58" y1="25" x2="58" y2="74" stroke={c3} strokeWidth="0.6" opacity={0.5} />
      <line x1="34" y1="50" x2="80" y2="52" stroke={c3} strokeWidth="0.6" opacity={0.5} />
      <line x1="40" y1="34" x2="72" y2="68" stroke={c3} strokeWidth="0.5" opacity={0.4} />
      <line x1="42" y1="68" x2="75" y2="34" stroke={c3} strokeWidth="0.5" opacity={0.4} />
      <ellipse cx="54" cy="40" rx="10" ry="7" fill="white" opacity={0.2} transform="rotate(-20,54,40)" />
    </g>
  );
}

function Azurite() {
  return (
    <g>
      <ellipse cx="50" cy="52" rx="40" ry="37" fill="#0047ab" />
      <ellipse cx="50" cy="52" rx="30" ry="27" fill="#1560bd" opacity={0.6} />
      <path d="M 14 45 Q 20 25 35 22 Q 20 30 18 50" fill="#00a550" opacity={0.8} />
      <path d="M 80 55 Q 85 38 75 28 Q 82 40 85 60" fill="#00a550" opacity={0.7} />
      <path d="M 25 75 Q 38 85 55 82 Q 40 82 28 72" fill="#00a550" opacity={0.75} />
      <ellipse cx="40" cy="42" rx="8" ry="6" fill="#2874a6" opacity={0.5} transform="rotate(-10,40,42)" />
      <ellipse cx="36" cy="36" rx="10" ry="6" fill="white" opacity={0.2} transform="rotate(-20,36,36)" />
    </g>
  );
}

function Opal() {
  return (
    <g>
      <ellipse cx="50" cy="52" rx="40" ry="37" fill="#f0f0f8" />
      <ellipse cx="42" cy="45" rx="10" ry="8" fill="#ff8080" opacity={0.35} transform="rotate(-15,42,45)" />
      <ellipse cx="58" cy="42" rx="9"  ry="7" fill="#80ff80" opacity={0.35} transform="rotate(10,58,42)" />
      <ellipse cx="55" cy="60" rx="11" ry="8" fill="#8080ff" opacity={0.35} transform="rotate(-5,55,60)" />
      <ellipse cx="38" cy="62" rx="9"  ry="7" fill="#ffff80" opacity={0.3}  transform="rotate(15,38,62)" />
      <ellipse cx="50" cy="50" rx="7"  ry="5" fill="#ff80ff" opacity={0.3} />
      <ellipse cx="64" cy="54" rx="7"  ry="5" fill="#80ffff" opacity={0.28} />
      <ellipse cx="36" cy="36" rx="14" ry="9" fill="white"   opacity={0.3}  transform="rotate(-20,36,36)" />
      <ellipse cx="50" cy="52" rx="40" ry="37" fill="none" stroke="#d0d0e0" strokeWidth="0.5" />
    </g>
  );
}

function Obsidian() {
  return (
    <g>
      <polygon points="25,22 55,15 78,30 85,55 75,80 48,88 22,75 15,45" fill="#1a1a1a" />
      <path d="M 40 30 Q 58 22 72 35" fill="none" stroke="#404040" strokeWidth="1"   opacity={0.7} />
      <path d="M 35 45 Q 58 35 75 50" fill="none" stroke="#404040" strokeWidth="0.8" opacity={0.6} />
      <path d="M 30 60 Q 55 50 78 62" fill="none" stroke="#404040" strokeWidth="0.8" opacity={0.5} />
      <path d="M 32 72 Q 55 65 72 74" fill="none" stroke="#404040" strokeWidth="0.7" opacity={0.4} />
      <polygon points="25,22 55,15 60,22 38,28" fill="white" opacity={0.15} />
      <line x1="30" y1="35" x2="50" y2="26" stroke="white" strokeWidth="0.8" opacity={0.2} />
    </g>
  );
}

function RoundedGrains({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return (
    <g>
      <circle cx="32" cy="45" r="16" fill={c2} />
      <circle cx="62" cy="38" r="14" fill={c1} />
      <circle cx="50" cy="66" r="18" fill={c1} />
      <circle cx="74" cy="62" r="12" fill={c2} />
      <ellipse cx="26" cy="39" rx="7" ry="5" fill={c3} opacity={0.4} transform="rotate(-20,26,39)" />
      <ellipse cx="56" cy="32" rx="6" ry="4" fill={c3} opacity={0.35} transform="rotate(-20,56,32)" />
      <ellipse cx="44" cy="59" rx="7" ry="5" fill={c3} opacity={0.35} transform="rotate(-20,44,59)" />
      <ellipse cx="26" cy="38" rx="4" ry="3" fill="white" opacity={0.15} />
    </g>
  );
}

function RhomboIcon({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return (
    <g>
      <polygon points="50,12 80,32 60,52 30,32" fill={c3} />
      <polygon points="30,32 60,52 55,80 25,60" fill={c1} />
      <polygon points="60,52 80,32 75,60 55,80" fill={c2} />
      <polygon points="38,42 55,52 52,66 35,56" fill="none" stroke={c3} strokeWidth="0.7" opacity={0.5} />
      <polyline points="30,32 50,12 80,32 75,60 55,80 25,60 30,32"
        fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="0.7" />
      <polygon points="50,12 70,28 60,42 42,26" fill="white" opacity={0.2} />
    </g>
  );
}

function Feldspar() {
  return (
    <g>
      <polygon points="35,15 65,15 70,30 70,80 65,88 35,88 30,80 30,30" fill="#f5f0e8" />
      <polygon points="65,15 70,30 70,80 65,88 68,88 74,80 74,30 68,15" fill="#d4c5b0" opacity={0.8} />
      <polygon points="35,15 65,15 68,15 50,8 32,15" fill="#fffef5" />
      <line x1="30" y1="45" x2="70" y2="45" stroke="#c8b89a" strokeWidth="0.8" opacity={0.5} />
      <line x1="30" y1="62" x2="70" y2="62" stroke="#c8b89a" strokeWidth="0.7" opacity={0.4} />
      <polygon points="35,15 55,30 53,60 35,60 33,30" fill="white" opacity={0.14} />
    </g>
  );
}

// Bornite: copper-red base with iridescent purple-blue patches (like chalcopyrite but distinct)
function Bornite() {
  return (
    <g>
      <polygon points="28,28 50,16 72,22 82,44 75,68 52,82 30,76 18,54 22,34" fill="#a04020" />
      <polygon points="28,28 50,16 72,22 65,40 45,36" fill="#8040c0" opacity={0.52} />
      <polygon points="50,16 72,22 75,50 60,58 50,38" fill="#4060e0" opacity={0.48} />
      <polygon points="30,76 52,82 70,65 60,58 38,62" fill="#a040c0" opacity={0.46} />
      <polygon points="28,28 35,55 45,68 38,62 22,54" fill="#6040d0" opacity={0.32} />
      <ellipse cx="42" cy="28" rx="12" ry="8" fill="white" opacity={0.2} transform="rotate(-15,42,28)" />
    </g>
  );
}

// Labradorite: dark gray feldspar base with vivid iridescent color-flash patches
function Labradorite() {
  return (
    <g>
      <polygon points="35,15 65,15 70,30 70,80 65,88 35,88 30,80 30,30" fill="#404858" />
      <polygon points="65,15 70,30 70,80 65,88 68,88 74,80 74,30 68,15" fill="#282e38" opacity={0.9} />
      <polygon points="35,15 65,15 68,15 50,8 32,15" fill="#505868" />
      <ellipse cx="44" cy="48" rx="15" ry="10" fill="#2090e0" opacity={0.58} transform="rotate(-10,44,48)" />
      <ellipse cx="57" cy="62" rx="12" ry="8" fill="#20c040" opacity={0.48} transform="rotate(8,57,62)" />
      <ellipse cx="50" cy="33" rx="10" ry="7" fill="#d0a020" opacity={0.44} transform="rotate(-15,50,33)" />
      <line x1="30" y1="52" x2="70" y2="52" stroke="#606878" strokeWidth="0.7" opacity={0.45} />
      <line x1="30" y1="66" x2="70" y2="66" stroke="#606878" strokeWidth="0.6" opacity={0.35} />
      <polygon points="35,15 55,30 53,52 35,52 33,30" fill="white" opacity={0.07} />
    </g>
  );
}

// StauroliteCross: iconic natural cross-twin crystal
function StauroliteCross() {
  return (
    <g>
      {/* Vertical prism */}
      <polygon points="40,8 60,8 63,50 59,94 41,94 37,50" fill="#8b4513" />
      <polygon points="60,8 63,8 66,50 63,94 59,94 63,50" fill="#5c2e0a" opacity={0.85} />
      <polygon points="40,8 60,8 63,8 50,3 37,8" fill="#cd7040" />
      {/* Horizontal prism crossing at ~55% down */}
      <polygon points="8,52 8,70 50,72 92,70 92,52 50,50" fill="#9b5020" opacity={0.92} />
      <polygon points="8,52 92,52 92,55 8,55" fill="#cd7040" opacity={0.45} />
      {/* Vertical highlight */}
      <polygon points="40,8 54,26 52,50 41,50 38,26" fill="white" opacity={0.16} />
    </g>
  );
}

// Octahedron — shared shape for magnetite, spinel, franklinite, chromite
function OctahedronIcon({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return (
    <g>
      <polygon points="50,10 80,50 50,70 20,50" fill={c1} />
      <polygon points="50,10 80,50 50,70" fill={c2} opacity={0.55} />
      <polygon points="20,50 50,70 80,50 50,90" fill={c2} />
      <polygon points="50,70 80,50 50,90" fill={c3} opacity={0.65} />
      <line x1="20" y1="50" x2="80" y2="50" stroke="rgba(0,0,0,0.2)" strokeWidth="0.7" opacity={0.6} />
      <polygon points="50,10 65,38 52,55 38,38" fill="white" opacity={0.18} />
      <polyline points="50,10 80,50 50,90 20,50 50,10"
        fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />
    </g>
  );
}

// Sulfur — orthorhombic bipyramid (two pyramids base-to-base), distinctly NOT a cube
function SulfurCrystal() {
  return (
    <g>
      <polygon points="50,12 20,50 50,62" fill="#fff080" />
      <polygon points="50,12 80,50 50,62" fill="#ffdd00" opacity={0.9} />
      <polygon points="20,50 50,62 50,90" fill="#b89500" opacity={0.9} />
      <polygon points="80,50 50,62 50,90" fill="#c8a800" opacity={0.75} />
      <line x1="20" y1="50" x2="80" y2="50" stroke="rgba(0,0,0,0.12)" strokeWidth="0.5" />
      <polygon points="50,12 36,42 48,58" fill="white" opacity={0.22} />
      <polyline points="50,12 80,50 50,90 20,50 50,12"
        fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="0.6" />
    </g>
  );
}

// Bismuth — stepped hopper crystal form with faint iridescent tarnish
function BismuthCrystal() {
  return (
    <g>
      <polygon points="50,18 78,34 78,66 50,82 22,66 22,34" fill="#d0c8c4" />
      <polygon points="50,28 68,38 68,62 50,72 32,62 32,38" fill="#b8b0ac" />
      <polygon points="50,38 62,44 62,58 50,64 38,58 38,44" fill="#a8a09c" />
      <polygon points="50,18 78,34 68,38 50,28 32,38 22,34" fill="#c8d0e0" opacity={0.4} />
      <polygon points="50,28 68,38 62,44 50,38 38,44 32,38" fill="#e0c0d0" opacity={0.3} />
      <ellipse cx="57" cy="42" rx="7" ry="4" fill="#7080ff" opacity={0.2} />
      <ellipse cx="43" cy="54" rx="6" ry="3" fill="#ff7080" opacity={0.18} />
      <ellipse cx="52" cy="36" rx="5" ry="3" fill="#70c080" opacity={0.16} />
    </g>
  );
}

// Tiger's Eye — chatoyant silky bands in golden-brown
function TigersEye() {
  return (
    <g>
      <ellipse cx="50" cy="52" rx="40" ry="35" fill="#c08030" />
      <path d="M 12 36 Q 50 33 88 37" fill="none" stroke="#a06010" strokeWidth="2.5" opacity={0.5} />
      <path d="M 11 44 Q 50 41 89 45" fill="none" stroke="#d8a850" strokeWidth="3"   opacity={0.5} />
      <path d="M 11 52 Q 50 49 89 53" fill="none" stroke="#906010" strokeWidth="2.5" opacity={0.48} />
      <path d="M 11 60 Q 50 57 89 61" fill="none" stroke="#d8b060" strokeWidth="3"   opacity={0.5} />
      <path d="M 12 68 Q 50 65 88 69" fill="none" stroke="#a07020" strokeWidth="2"   opacity={0.42} />
      <ellipse cx="50" cy="52" rx="40" ry="35" fill="none" stroke="#8a5018" strokeWidth="0.5" />
      <ellipse cx="34" cy="36" rx="10" ry="6" fill="white" opacity={0.14} transform="rotate(-20,34,36)" />
    </g>
  );
}

// Sunstone — orange feldspar crystal with copper aventurescence sparkle
function Sunstone() {
  const sparkles: [number, number][] = [
    [42, 35], [58, 30], [65, 55], [38, 60], [52, 50], [48, 70], [62, 72], [36, 46],
  ];
  return (
    <g>
      <polygon points="35,15 65,15 70,30 70,80 65,88 35,88 30,80 30,30" fill="#e8741a" />
      <polygon points="65,15 70,30 70,80 65,88 68,88 74,80 74,30 68,15" fill="#b05010" opacity={0.8} />
      <polygon points="35,15 65,15 68,15 50,8 32,15" fill="#f09040" />
      {sparkles.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.8" fill="#ffd700" opacity={0.75} />
      ))}
      <polygon points="35,15 55,30 53,60 35,60 33,30" fill="white" opacity={0.14} />
    </g>
  );
}

function DefaultGem() {
  return (
    <g>
      <polygon points="50,10 80,40 70,90 30,90 20,40" fill="#a855f7" />
      <polygon points="50,10 70,40 50,60 30,40" fill="white" opacity={0.2} />
    </g>
  );
}
