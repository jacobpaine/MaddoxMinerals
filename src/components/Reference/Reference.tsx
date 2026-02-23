import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { minerals } from '../../data/minerals';
import { locations } from '../../data/locations';
import MineralIcon from '../shared/MineralIcon';
import type { LusterType, RarityType } from '../../types/mineral';
import Tooltip from '../common/Tooltip';

const T = Tooltip;

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

const LUSTER_OPTIONS: LusterType[] = [
  'metallic', 'vitreous', 'pearly', 'silky', 'resinous', 'earthy', 'adamantine', 'waxy',
];

const FILTER_KEY = 'reference-filters';

function loadSavedFilters() {
  try { return JSON.parse(localStorage.getItem(FILTER_KEY) || '{}'); }
  catch { return {}; }
}

export default function Reference() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterLuster, setFilterLuster] = useState<LusterType | ''>(() => loadSavedFilters().luster ?? '');
  const [filterRarity, setFilterRarity] = useState<RarityType | ''>(() => loadSavedFilters().rarity ?? '');
  const [hardnessMin, setHardnessMin] = useState<number>(() => loadSavedFilters().hardnessMin ?? 1);
  const [hardnessMax, setHardnessMax] = useState<number>(() => loadSavedFilters().hardnessMax ?? 10);
  const [filterMagnetic, setFilterMagnetic] = useState<'all' | 'yes' | 'no'>(() => loadSavedFilters().magnetic ?? 'all');
  const [filterLocation, setFilterLocation] = useState<string>(() => loadSavedFilters().location ?? '');

  useEffect(() => {
    try {
      localStorage.setItem(FILTER_KEY, JSON.stringify({
        luster: filterLuster,
        rarity: filterRarity,
        hardnessMin,
        hardnessMax,
        magnetic: filterMagnetic,
        location: filterLocation,
      }));
    } catch {}
  }, [filterLuster, filterRarity, hardnessMin, hardnessMax, filterMagnetic, filterLocation]);

  const filtered = useMemo(() => {
    return minerals
      .filter(m => {
        if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (filterLuster && m.luster !== filterLuster) return false;
        if (filterRarity && m.rarity !== filterRarity) return false;
        if (m.hardness < hardnessMin || m.hardness > hardnessMax) return false;
        if (filterMagnetic === 'yes' && !m.magnetic) return false;
        if (filterMagnetic === 'no' && m.magnetic) return false;
        if (filterLocation && !m.locations.includes(filterLocation as never)) return false;
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [search, filterLuster, filterRarity, hardnessMin, hardnessMax, filterMagnetic, filterLocation]);

  const rarityColor = (rarity: string) => {
    if (rarity === 'common') return 'text-gray-400';
    if (rarity === 'uncommon') return 'text-blue-400';
    return 'text-yellow-400';
  };

  return (
    <div className="min-h-screen bg-mineral-dark p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-purple-400 hover:text-white transition-colors text-sm"
          >
            ← Home
          </button>
          <h1 className="font-display text-3xl font-bold text-mineral-gold">
            📖 Mineral Reference
          </h1>
          <span className="text-purple-400 text-sm ml-auto">
            {filtered.length} / {minerals.length} minerals
          </span>
        </div>

        {/* Filters */}
        <div className="card mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="text-xs text-purple-400 uppercase tracking-wide block mb-1">Search</label>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Mineral name..."
              className="w-full bg-black/40 border border-purple-800 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-xs text-purple-400 uppercase tracking-wide block mb-1">
              <T tip="The way light reflects off a mineral's surface — shiny, glassy, dull, etc.">Luster</T>
            </label>
            <select
              value={filterLuster}
              onChange={e => setFilterLuster(e.target.value as LusterType | '')}
              className="w-full bg-black/40 border border-purple-800 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
            >
              <option value="">All lusters</option>
              {LUSTER_OPTIONS.map(l => (
                <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-purple-400 uppercase tracking-wide block mb-1">Rarity</label>
            <select
              value={filterRarity}
              onChange={e => setFilterRarity(e.target.value as RarityType | '')}
              className="w-full bg-black/40 border border-purple-800 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
            >
              <option value="">All rarities</option>
              <option value="common">Common</option>
              <option value="uncommon">Uncommon</option>
              <option value="rare">Rare</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-purple-400 uppercase tracking-wide block mb-1">Location</label>
            <select
              value={filterLocation}
              onChange={e => setFilterLocation(e.target.value)}
              className="w-full bg-black/40 border border-purple-800 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
            >
              <option value="">All locations</option>
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.gridIcon} {loc.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-purple-400 uppercase tracking-wide block mb-1">
              <T tip="How resistant to scratching — 1 is softest (like talc), 10 is hardest (diamond)">Hardness</T>: {hardnessMin}–{hardnessMax}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range" min={1} max={10} value={hardnessMin}
                onChange={e => setHardnessMin(Number(e.target.value))}
                className="flex-1 accent-purple-500"
              />
              <input
                type="range" min={1} max={10} value={hardnessMax}
                onChange={e => setHardnessMax(Number(e.target.value))}
                className="flex-1 accent-purple-500"
              />
            </div>
          </div>

          <div className="flex items-end gap-2">
            <label className="text-xs text-purple-400 uppercase tracking-wide block mb-1 mr-2">
              <T tip="Whether the mineral is attracted to a magnet — caused by iron content">Magnetic</T>:
            </label>
            {(['all', 'yes', 'no'] as const).map(opt => (
              <button
                key={opt}
                onClick={() => setFilterMagnetic(opt)}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                  filterMagnetic === opt
                    ? 'bg-purple-600 text-white'
                    : 'bg-black/40 border border-purple-800 text-purple-300 hover:border-purple-500'
                }`}
              >
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearch('');
                setFilterLuster('');
                setFilterRarity('');
                setHardnessMin(1);
                setHardnessMax(10);
                setFilterMagnetic('all');
                setFilterLocation('');
              }}
              className="text-sm text-purple-400 hover:text-white transition-colors"
            >
              Clear filters
            </button>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center text-purple-400 py-16">
            No minerals match your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(mineral => (
              <button
                key={mineral.id}
                onClick={() => navigate(`/reference/${mineral.id}`)}
                className="card text-left hover:border-purple-500 transition-all hover:scale-102 active:scale-98 group"
              >
                {/* Mineral illustration */}
                <div
                  className="w-full h-16 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${mineral.color[0]}30, ${mineral.color[mineral.color.length - 1]}18)`,
                  }}
                >
                  <MineralIcon id={mineral.id} size={64} />
                </div>

                <div className="font-bold text-white text-sm truncate">{mineral.name}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-purple-300">
                    <T tip="How resistant to scratching — 1 (softest) to 10 (hardest)">Hardness</T> {mineral.hardness}
                  </span>
                  <span className={`text-xs font-bold ${rarityColor(mineral.rarity)}`}>
                    {mineral.rarity}
                  </span>
                </div>
                <div className="text-xs text-purple-400 mt-1 capitalize">
                  <T tip={LUSTER_TIPS[mineral.luster] ?? 'The way light reflects off the surface'}>{mineral.luster}</T> luster
                </div>
                {mineral.magnetic && (
                  <div className="text-xs text-yellow-400 mt-1">⚡ <T tip="Attracted to a magnet — contains iron or other magnetic metals">Magnetic</T></div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
