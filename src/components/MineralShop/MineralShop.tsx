import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { locations } from '../../data/locations';
import { getMineralsByLocation } from '../../data/minerals';
import type { GridCell, InventoryItem, MineralLocation, Mineral } from '../../types/mineral';
import {
  pickRandomMineral,
  calculateInventoryValue,
  getAllMineralNames,
} from '../../utils/mineralUtils';
import MiningCanvas from './MiningCanvas';
import MineralIcon from '../shared/MineralIcon';
import BatteryMeter from './BatteryMeter';
import Inventory from './Inventory';
import ShopCounter from './ShopCounter';
import ToolPanel from '../ToolShed/ToolPanel';
import MineralDisplay from '../ToolShed/MineralDisplay';
import Tooltip from '../common/Tooltip';

const T = Tooltip;

const GRID_SIZE = 8;
const MINERAL_DENSITY = 0.35; // ~35% of cells have minerals

type ShopPhase = 'select-location' | 'mining' | 'identify' | 'shop-result';

function makeGrid(location: MineralLocation): GridCell[][] {
  const pool = getMineralsByLocation(location.id);
  const grid: GridCell[][] = [];

  for (let r = 0; r < GRID_SIZE; r++) {
    grid[r] = [];
    for (let c = 0; c < GRID_SIZE; c++) {
      const hasMineral = Math.random() < MINERAL_DENSITY;
      grid[r][c] = {
        row: r,
        col: c,
        revealed: false,
        mineral: hasMineral ? pickRandomMineral(pool) : null,
        empty: false,
        animating: false,
      };
    }
  }
  return grid;
}

const BATTERY_BY_DIFFICULTY = { easy: 30, medium: 25, hard: 20 };

export default function MineralShop() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<ShopPhase>('select-location');
  const [selectedLocation, setSelectedLocation] = useState<MineralLocation | null>(null);
  const [grid, setGrid] = useState<GridCell[][]>([]);
  const [battery, setBattery] = useState(30);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [totalEarned, setTotalEarned] = useState(0);
  const [pendingMineral, setPendingMineral] = useState<{ mineral: Mineral; row: number; col: number } | null>(null);
  const [identifyGuess, setIdentifyGuess] = useState('');
  const [identifyResult, setIdentifyResult] = useState<'correct' | 'wrong' | null>(null);
  const [identifyAttempts, setIdentifyAttempts] = useState(0);
  const [allNames] = useState(() => getAllMineralNames());

  // Tool Shed inline state
  const [showTools, setShowTools] = useState(false);
  const [revealedProps, setRevealedProps] = useState<Set<string>>(new Set());

  // Identify dropdown state
  const [dropdownSuggestions, setDropdownSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Reset identify + tool shed state whenever a new mineral comes up
  useEffect(() => {
    setIdentifyAttempts(0);
    setShowTools(false);
    setRevealedProps(new Set());
    setDropdownSuggestions([]);
    setShowDropdown(false);
  }, [pendingMineral?.mineral.id]);

  const startMining = (location: MineralLocation) => {
    const maxBat = BATTERY_BY_DIFFICULTY[location.difficulty];
    setSelectedLocation(location);
    setGrid(makeGrid(location));
    setBattery(maxBat);
    setInventory([]);
    setPhase('mining');
  };

  const handleCellClick = useCallback((row: number, col: number) => {
    setGrid(prev => {
      const cell = prev[row][col];
      if (cell.revealed) return prev;
      return prev;
    });

    setBattery(b => {
      if (b <= 0) return b;
      const newBat = b - 1;

      setGrid(prev => {
        const cell = prev[row][col];
        if (cell.revealed) return prev;

        const newGrid = prev.map(r => r.map(c => ({ ...c })));
        newGrid[row][col].revealed = true;

        if (cell.mineral) {
          newGrid[row][col].animating = true;
          setTimeout(() => {
            setGrid(g => {
              const ng = g.map(r => r.map(c => ({ ...c })));
              ng[row][col].animating = false;
              return ng;
            });
          }, 600);
          // Trigger identify prompt
          setTimeout(() => {
            setPendingMineral({ mineral: cell.mineral!, row, col });
            setIdentifyGuess('');
            setIdentifyResult(null);
            setPhase('identify');
          }, 200);
        } else {
          newGrid[row][col].empty = true;
        }

        return newGrid;
      });

      if (newBat <= 0) {
        setTimeout(() => {
          setPhase(p => p === 'mining' ? 'mining' : p);
          // Battery dead — go to shop
          setTimeout(() => endMining(), 300);
        }, 100);
      }

      return newBat;
    });
  }, []);

  const endMining = () => {
    setInventory(inv => {
      const earned = calculateInventoryValue(inv);
      setTotalEarned(earned);
      return inv;
    });
    setPhase('shop-result');
  };

  const handleIdentifyGuess = (skipId = false) => {
    if (!pendingMineral) return;

    if (skipId) {
      // Add unidentified
      setInventory(inv => [...inv, { mineral: pendingMineral.mineral, identified: false, quantity: 1 }]);
      setPendingMineral(null);
      setPhase('mining');
      return;
    }

    const correct = identifyGuess.toLowerCase().trim() === pendingMineral.mineral.name.toLowerCase() ||
      pendingMineral.mineral.id === identifyGuess.toLowerCase().replace(/\s+/g, '-');

    if (correct) {
      setIdentifyResult('correct');
      setIdentifyGuess('');
      setInventory(inv => [...inv, { mineral: pendingMineral.mineral, identified: true, quantity: 1 }]);
      setTimeout(() => {
        setPendingMineral(null);
        setIdentifyResult(null);
        setPhase('mining');
      }, 1500);
    } else {
      setIdentifyAttempts(a => a + 1);
      setIdentifyResult('wrong');
      setIdentifyGuess('');
    }
  };

  const handleSkipIdentify = () => {
    handleIdentifyGuess(true);
  };

  const handleCollectUnidentified = () => {
    if (!pendingMineral) return;
    setInventory(inv => [...inv, { mineral: pendingMineral.mineral, identified: false, quantity: 1 }]);
    setPendingMineral(null);
    setIdentifyResult(null);
    setPhase('mining');
  };

  if (phase === 'shop-result') {
    return (
      <ShopCounter
        inventory={inventory}
        totalEarned={totalEarned}
        onPlayAgain={() => {
          setPhase('select-location');
          setSelectedLocation(null);
          setInventory([]);
          setTotalEarned(0);
        }}
      />
    );
  }

  if (phase === 'select-location') {
    return (
      <div className="min-h-screen bg-mineral-dark p-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => navigate('/')} className="text-purple-400 hover:text-white transition-colors text-sm">
              ← Home
            </button>
            <h1 className="font-display text-2xl font-bold text-mineral-gold">⛏️ Mineral Shop</h1>
          </div>

          <p className="text-purple-300 mb-6 text-sm">Choose a mining location to begin your <T tip="An organized trip to search for and collect minerals">expedition</T>.</p>

          <div className="space-y-3">
            {locations.map(loc => (
              <button
                key={loc.id}
                onClick={() => startMining(loc)}
                className="w-full card text-left hover:border-purple-500 transition-all hover:scale-101 active:scale-98"
                style={{
                  background: `linear-gradient(135deg, ${loc.backgroundColors[0]}80, ${loc.backgroundColors[1]}40)`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{loc.gridIcon}</span>
                  <div className="flex-1">
                    <div className="font-bold text-white text-lg">{loc.name}</div>
                    <div className="text-sm text-white/60 mt-0.5">{loc.description}</div>
                    <div className="flex gap-3 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded font-bold
                        ${loc.difficulty === 'easy' ? 'bg-green-900/50 text-green-400' :
                          loc.difficulty === 'medium' ? 'bg-yellow-900/50 text-yellow-400' :
                          'bg-red-900/50 text-red-400'}`}>
                        {loc.difficulty.toUpperCase()}
                      </span>
                      <span className="text-xs text-purple-400">
                        <T tip="Your energy supply for this trip — each square you dig uses 1 charge">Battery</T>: {BATTERY_BY_DIFFICULTY[loc.difficulty]} <T tip="Units of energy — harder locations give you fewer, so you must dig more carefully">charges</T>
                      </span>
                    </div>
                  </div>
                  <span className="text-white/30 text-2xl">›</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const inventoryValue = calculateInventoryValue(inventory);
  const batteryPct = battery / (BATTERY_BY_DIFFICULTY[selectedLocation?.difficulty ?? 'easy']);

  return (
    <div className="min-h-screen bg-mineral-dark p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <button onClick={() => navigate('/')} className="text-purple-400 hover:text-white transition-colors text-sm">
            ← Home
          </button>
          <span className="font-display text-lg font-bold text-mineral-gold">
            {selectedLocation?.gridIcon} {selectedLocation?.name}
          </span>
          <div className="ml-auto">
            <BatteryMeter
              battery={battery}
              maxBattery={BATTERY_BY_DIFFICULTY[selectedLocation?.difficulty ?? 'easy']}
            />
          </div>
        </div>

        {batteryPct <= 0.25 && battery > 0 && (
          <div className="panel bg-red-900/20 border-red-700/50 mb-3 text-xs text-red-300">
            ⚠️ Battery low! Return to shop soon or you'll lose your haul!
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          {/* Mining canvas */}
          <div className="flex flex-col items-center gap-2">
            <MiningCanvas
              grid={grid}
              location={selectedLocation!}
              onCellClick={handleCellClick}
              disabled={battery <= 0 || phase === 'identify'}
            />
            <div className="text-xs text-purple-500">
              Click a cell to dig (<T tip="Each dig costs 1 unit of battery power — spend it wisely!">-1 battery</T>)
            </div>
          </div>

          {/* Side panel */}
          <div className="flex-1 flex flex-col gap-3">
            <Inventory inventory={inventory} totalValue={inventoryValue} />

            <button
              onClick={endMining}
              className="btn-primary"
            >
              Return to Shop ({inventoryValue} coins)
            </button>

            {battery <= 0 && (
              <div className="panel bg-red-900/30 border-red-700/60 text-center text-sm text-red-300">
                Battery dead! Heading to shop...
              </div>
            )}
          </div>
        </div>

        {/* Identify modal */}
        {phase === 'identify' && pendingMineral && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className={`card w-full my-auto transition-all duration-200 ${showTools ? 'max-w-2xl' : 'max-w-sm'}`}>

              {/* Header */}
              <div className="text-center mb-4">
                {!showTools && (
                  <div className="flex justify-center mb-3">
                    <MineralIcon id={pendingMineral.mineral.id} size={96} />
                  </div>
                )}
                <div className="font-bold text-white">You found a mineral!</div>
                <div className="text-purple-300 text-sm mt-1">
                  Can you identify it? Correct ID = full value ({pendingMineral.mineral.value} coins)
                </div>
                <div className="text-purple-500 text-xs mt-1">
                  Or collect <T tip="You add it to your bag without knowing what it is — the shop pays much less for mystery minerals">unidentified</T> for {Math.floor(pendingMineral.mineral.value * 0.3)} coins (30%)
                </div>
              </div>

              {/* Inline Tool Shed */}
              {showTools && (
                <div className="mb-4 border-t border-purple-800/50 pt-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col items-center">
                      <MineralDisplay
                        mineral={pendingMineral.mineral}
                        revealedProperties={revealedProps}
                        showStreak={revealedProps.has('streak')}
                        showScratch={revealedProps.has('hardness')}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-purple-400 mb-2 font-display uppercase tracking-wide">
                        Use tools to identify this mineral
                      </div>
                      <ToolPanel
                        mineral={pendingMineral.mineral}
                        revealedProperties={revealedProps}
                        onReveal={prop => setRevealedProps(prev => new Set([...prev, prop]))}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Guess / result area */}
              {identifyResult === 'correct' ? (
                <div className="panel bg-green-900/30 border-green-600/50 text-center">
                  <div className="text-green-300 font-bold">✅ Correct! It's {pendingMineral.mineral.name}!</div>
                  <div className="text-green-400/70 text-sm">+{pendingMineral.mineral.value} coins</div>
                </div>
              ) : identifyAttempts >= 3 ? (
                <div className="panel bg-red-900/20 border-red-700/40 text-center">
                  <div className="text-red-300 font-bold mb-1">Out of guesses!</div>
                  <div className="text-red-400/70 text-sm mb-3">Collect it unidentified for {Math.floor(pendingMineral.mineral.value * 0.3)} coins</div>
                  <div className="flex gap-2">
                    <button onClick={handleCollectUnidentified} className="btn-secondary flex-1 text-sm py-2">
                      Collect (??)
                    </button>
                    <button onClick={handleSkipIdentify} className="flex-1 text-sm py-2 text-red-400 hover:text-red-300 transition-colors">
                      Leave it
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {identifyResult === 'wrong' && (
                    <div className="panel bg-red-900/20 border-red-700/40 mb-3 text-sm text-red-300">
                      ❌ Not quite — {3 - identifyAttempts} {3 - identifyAttempts === 1 ? 'guess' : 'guesses'} remaining
                    </div>
                  )}

                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => setShowTools(t => !t)}
                      className={`flex-1 text-sm py-2 border rounded-lg transition-all
                        ${showTools
                          ? 'bg-purple-700/40 border-purple-500 text-purple-200'
                          : 'bg-purple-900/40 border-purple-600/50 text-purple-300 hover:bg-purple-800/50 hover:text-white'
                        }`}
                    >
                      🔬 {showTools ? 'Hide Tools' : 'Use Tool Shed'}
                    </button>
                    <button
                      onClick={handleCollectUnidentified}
                      className="btn-secondary flex-1 text-sm py-2"
                    >
                      Collect (??)
                    </button>
                  </div>

                  <div className="relative mb-3">
                    <input
                      type="text"
                      value={identifyGuess}
                      onChange={e => {
                        const val = e.target.value;
                        setIdentifyGuess(val);
                        setIdentifyResult(null);
                        if (val.length >= 1) {
                          const matches = allNames.filter(n =>
                            n.toLowerCase().includes(val.toLowerCase())
                          );
                          setDropdownSuggestions(matches.slice(0, 6));
                          setShowDropdown(matches.length > 0);
                        } else {
                          setDropdownSuggestions([]);
                          setShowDropdown(false);
                        }
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && identifyGuess.trim()) handleIdentifyGuess();
                        if (e.key === 'Escape') setShowDropdown(false);
                      }}
                      placeholder="Type mineral name..."
                      autoComplete="off"
                      className="w-full bg-black/40 border border-purple-700 rounded-lg px-3 py-2 text-white
                                 focus:outline-none focus:border-purple-400 text-sm"
                      autoFocus={!showTools}
                    />
                    {showDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-mineral-mid border border-purple-700 rounded-lg overflow-hidden z-50 shadow-xl">
                        {dropdownSuggestions.map(name => (
                          <button
                            key={name}
                            onMouseDown={e => {
                              e.preventDefault();
                              setIdentifyGuess(name);
                              setShowDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-white hover:bg-mineral-light/60 transition-colors"
                          >
                            {name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleIdentifyGuess()}
                    disabled={!identifyGuess.trim()}
                    className="btn-primary w-full text-sm py-2 mb-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Identify
                  </button>

                  <div className="flex justify-center">
                    <button
                      onClick={handleSkipIdentify}
                      className="px-3 py-2 text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      Leave it
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
