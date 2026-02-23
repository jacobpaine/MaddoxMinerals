import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tooltip from '../common/Tooltip';
import MineralIcon from '../shared/MineralIcon';
import type { InventoryItem } from '../../types/mineral';
import {
  calculateSellValue,
  getNamedHighScores,
  saveNamedHighScore,
  isNamedHighScore,
} from '../../utils/mineralUtils';

interface Props {
  inventory: InventoryItem[];
  totalEarned: number;
  onPlayAgain: () => void;
}

const SCORE_KEY = 'shop-scores-named';

export default function ShopCounter({ inventory, totalEarned, onPlayAgain }: Props) {
  const navigate = useNavigate();
  const qualifies = isNamedHighScore(SCORE_KEY, totalEarned);
  const [playerName, setPlayerName] = useState('');
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (qualifies && !saved) {
      inputRef.current?.focus();
    }
  }, [qualifies, saved]);

  const handleSaveName = () => {
    saveNamedHighScore(SCORE_KEY, totalEarned, playerName);
    setSaved(true);
  };

  const highScores = saved || !qualifies ? getNamedHighScores(SCORE_KEY) : [];

  const breakdown = inventory.map(item => ({
    id: item.mineral.id,
    name: item.identified ? item.mineral.name : '??? (unidentified)',
    rarity: item.mineral.rarity,
    identified: item.identified,
    value: calculateSellValue(item),
    color: item.mineral.color,
  }));

  return (
    <div className="min-h-screen bg-mineral-dark flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🏪</div>
          <h2 className="font-display text-2xl font-bold text-mineral-gold">Shop Counter</h2>
          <p className="text-purple-300 text-sm mt-1">Here's what your haul is worth</p>
        </div>

        {/* Sales breakdown */}
        {breakdown.length > 0 ? (
          <div className="panel mb-4">
            <div className="text-xs text-purple-400 font-bold mb-2 uppercase">Sold Minerals</div>
            {breakdown.map((item, i) => (
              <div key={i} className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0">
                {item.identified ? (
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                    <MineralIcon id={item.id} size={28} />
                  </div>
                ) : (
                  <div
                    className="w-8 h-8 rounded flex-shrink-0 flex items-center justify-center text-sm"
                    style={{ background: `linear-gradient(135deg, ${item.color[0]}60, ${item.color[item.color.length - 1]}30)` }}
                  >
                    ?
                  </div>
                )}
                <span className="text-sm text-white flex-1">{item.name}</span>
                <span className={`text-xs ${item.rarity === 'rare' ? 'text-yellow-400' : item.rarity === 'uncommon' ? 'text-blue-400' : 'text-gray-400'}`}>
                  {item.rarity}
                </span>
                {!item.identified && (
                  <Tooltip tip="Unidentified minerals sell for only 30% of their value — the shop takes a 70% cut for the guesswork">
                    <span className="text-xs text-red-400">-70%</span>
                  </Tooltip>
                )}
                <span className="text-sm text-mineral-gold font-bold">{item.value}c</span>
              </div>
            ))}
            <div className="flex justify-between mt-2 pt-2 border-t border-purple-700">
              <span className="font-bold text-white">Total</span>
              <span className="font-bold text-mineral-gold text-lg">{totalEarned} coins</span>
            </div>
          </div>
        ) : (
          <div className="panel mb-4 text-center text-purple-400 py-4">
            Nothing to sell this time!
          </div>
        )}

        {/* High score name entry */}
        {qualifies && !saved && (
          <div className="panel mb-4 bg-mineral-gold/10 border-mineral-gold/40">
            <div className="text-mineral-gold font-bold text-sm mb-1">🏆 New High Score!</div>
            <div className="text-purple-300 text-xs mb-3">Enter your name for the leaderboard</div>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={playerName}
                onChange={e => setPlayerName(e.target.value.slice(0, 25))}
                onKeyDown={e => e.key === 'Enter' && handleSaveName()}
                placeholder="Your name (max 25 chars)"
                maxLength={25}
                className="flex-1 bg-black/40 border border-mineral-gold/50 rounded-lg px-3 py-2 text-white
                           focus:outline-none focus:border-mineral-gold text-sm placeholder-purple-600"
              />
              <button onClick={handleSaveName} className="btn-primary text-sm px-4">
                Save
              </button>
            </div>
            <div className="text-right text-xs text-purple-500 mt-1">{playerName.length}/25</div>
          </div>
        )}

        {/* High scores */}
        {saved && highScores.length > 0 && (
          <div className="panel mb-4">
            <div className="text-xs text-purple-400 font-bold mb-2 uppercase">High Scores</div>
            {highScores.slice(0, 5).map((s, i) => (
              <div key={i} className="flex justify-between items-center text-sm py-0.5 gap-2">
                <span className="text-purple-300 w-6">#{i + 1}</span>
                <span className={`flex-1 truncate ${s.score === totalEarned && s.name === (playerName.trim() || 'Anonymous') ? 'text-mineral-gold font-bold' : 'text-white'}`}>
                  {s.name}
                </span>
                <span className={s.score === totalEarned && s.name === (playerName.trim() || 'Anonymous') ? 'text-mineral-gold font-bold' : 'text-white'}>
                  {s.score}c
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={onPlayAgain} className="btn-primary flex-1">
            Mine Again
          </button>
          <button onClick={() => navigate('/')} className="btn-secondary flex-1">
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
