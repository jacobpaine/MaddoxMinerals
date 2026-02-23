import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Tooltip from '../common/Tooltip';
import { renderWithTooltips } from '../../utils/renderWithTooltips';
import { minerals, getMineralById } from '../../data/minerals';
import type { Mineral } from '../../types/mineral';
import {
  pickRandomMineral,
  calculateToolShedScore,
  getHint,
  saveHighScore,
  getHighScores,
} from '../../utils/mineralUtils';
import MineralDisplay from './MineralDisplay';
import ToolPanel from './ToolPanel';
import GuessForm from './GuessForm';

type Phase = 'testing' | 'guessing' | 'result' | 'finished';

const ROUNDS = 10;

export default function ToolShed() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const forcedMineralId = searchParams.get('mineral');

  const [phase, setPhase] = useState<Phase>('testing');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [currentMineral, setCurrentMineral] = useState<Mineral | null>(null);
  const [revealedProperties, setRevealedProperties] = useState<Set<string>>(new Set());
  const [guessResult, setGuessResult] = useState<{ correct: boolean; hint?: string } | null>(null);
  const [roundScores, setRoundScores] = useState<number[]>([]);
  const [usedIds, setUsedIds] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);

  const startRound = useCallback(() => {
    let mineral: Mineral;
    if (forcedMineralId && round === 1) {
      mineral = getMineralById(forcedMineralId) ?? pickRandomMineral(minerals, usedIds);
    } else {
      mineral = pickRandomMineral(minerals, usedIds);
    }
    setCurrentMineral(mineral);
    setRevealedProperties(new Set());
    setGuessResult(null);
    setAttempts(0);
    setPhase('testing');
  }, [forcedMineralId, round, usedIds]);

  useEffect(() => {
    startRound();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReveal = (property: string) => {
    setRevealedProperties(prev => new Set([...prev, property]));
  };

  const handleGuess = (guess: string) => {
    if (!currentMineral) return;
    const correct = guess.toLowerCase().trim() === currentMineral.name.toLowerCase() ||
      currentMineral.id === guess.toLowerCase().replace(/\s+/g, '-');

    setAttempts(a => a + 1);

    if (correct) {
      const earned = calculateToolShedScore(true, revealedProperties.size);
      setScore(s => s + earned);
      setRoundScores(rs => [...rs, earned]);
      setUsedIds(ids => [...ids, currentMineral.id]);
      setGuessResult({ correct: true });
      setPhase('result');
    } else {
      const hint = getHint(currentMineral, guess);
      setGuessResult({ correct: false, hint });
      if (attempts >= 2) {
        // After 3 failed attempts, show result with 0 score
        setRoundScores(rs => [...rs, 0]);
        setUsedIds(ids => [...ids, currentMineral.id]);
        setPhase('result');
      }
    }
  };

  const handleNextRound = () => {
    if (round >= ROUNDS) {
      const finalScore = roundScores.reduce((a, b) => a + b, 0);
      saveHighScore('toolshed-scores', finalScore);
      setPhase('finished');
    } else {
      setRound(r => r + 1);
      startRound();
    }
  };

  const handleSkip = () => {
    if (!currentMineral) return;
    setRoundScores(rs => [...rs, 0]);
    setUsedIds(ids => [...ids, currentMineral.id]);
    setPhase('result');
    setGuessResult({ correct: false });
  };

  const highScores = getHighScores('toolshed-scores');

  if (phase === 'finished') {
    const finalScore = roundScores.reduce((a, b) => a + b, 0);
    const maxPossible = ROUNDS * 160;
    const percentage = Math.round((finalScore / maxPossible) * 100);

    return (
      <div className="min-h-screen bg-mineral-dark flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="font-display text-3xl font-bold text-mineral-gold mb-2">
            Session Complete!
          </h2>
          <div className="text-5xl font-bold text-white my-4">{finalScore}</div>
          <div className="text-purple-300 mb-4">
            {percentage}% efficiency · {roundScores.filter(s => s > 0).length}/{ROUNDS} correct
          </div>

          {/* Round breakdown */}
          <div className="panel mb-4 grid grid-cols-5 gap-1">
            {roundScores.map((s, i) => (
              <div key={i} className={`text-xs py-1 rounded ${s > 0 ? 'bg-green-900/40 text-green-300' : 'bg-red-900/40 text-red-400'}`}>
                R{i + 1}: {s}
              </div>
            ))}
          </div>

          {/* High scores */}
          {highScores.length > 0 && (
            <div className="panel mb-4 text-left">
              <div className="text-xs text-purple-400 mb-2 font-bold">HIGH SCORES</div>
              {highScores.slice(0, 5).map((s, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-purple-300">#{i + 1}</span>
                  <span className={s === finalScore ? 'text-mineral-gold font-bold' : 'text-white'}>{s}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => { setRound(1); setScore(0); setRoundScores([]); setUsedIds([]); startRound(); }} className="btn-primary flex-1">
              Play Again
            </button>
            <button onClick={() => navigate('/')} className="btn-secondary flex-1">
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mineral-dark p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate('/')} className="text-purple-400 hover:text-white transition-colors text-sm">
            ← Home
          </button>
          <h1 className="font-display text-xl font-bold text-mineral-gold">🔬 Tool Shed</h1>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-purple-300">Round {round}/{ROUNDS}</span>
            <span className="text-sm font-bold text-mineral-gold">⭐ {score}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-purple-900/50 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-mineral-gold transition-all duration-500"
            style={{ width: `${((round - 1) / ROUNDS) * 100}%` }}
          />
        </div>

        {currentMineral && (
          <div className="flex flex-col gap-4">
            {/* Mineral display + tools */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col items-center">
                <MineralDisplay
                  mineral={currentMineral}
                  revealedProperties={revealedProperties}
                  showStreak={revealedProperties.has('streak')}
                  showScratch={revealedProperties.has('hardness')}
                />
              </div>

              <div className="flex-1">
                <div className="text-xs text-purple-400 mb-2 font-display uppercase tracking-wide">
                  Use tools to identify this mineral
                </div>
                <ToolPanel
                  mineral={currentMineral}
                  revealedProperties={revealedProperties}
                  onReveal={handleReveal}
                />
              </div>
            </div>

            {/* Guess result feedback */}
            {guessResult && !guessResult.correct && phase === 'testing' && (
              <div className="panel bg-red-900/20 border-red-700/50">
                <div className="flex items-start gap-2">
                  <span>❌</span>
                  <div>
                    <div className="text-red-300 text-sm font-bold">Not quite!</div>
                    {guessResult.hint && (
                      <div className="text-red-200/70 text-xs mt-1">{renderWithTooltips(guessResult.hint)}</div>
                    )}
                    {attempts >= 2 && (
                      <div className="text-red-300 text-xs mt-1">Last attempt used up — see the answer below.</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Guess form or result */}
            {phase === 'testing' && (
              <div className="card">
                <GuessForm onGuess={handleGuess} disabled={attempts >= 3} />
                <button
                  onClick={handleSkip}
                  className="mt-2 text-xs text-purple-500 hover:text-purple-300 transition-colors"
                >
                  Skip this mineral (0 points)
                </button>
              </div>
            )}

            {phase === 'result' && (
              <div className={`card ${guessResult?.correct ? 'bg-green-900/30 border-green-600/50' : 'bg-red-900/20 border-red-700/30'}`}>
                {guessResult?.correct ? (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">✅</span>
                      <div>
                        <div className="font-bold text-green-300 text-lg">Correct! It's {currentMineral.name}</div>
                        <div className="text-green-400/70 text-sm">
                          +{roundScores[roundScores.length - 1]} points
                          {revealedProperties.size < 6 && (
                            <> (<Tooltip tip="Using fewer tools earns extra points — the fewer you need, the better you know your minerals!">efficiency bonus</Tooltip>: used only {revealedProperties.size}/6 tools)</>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="bg-black/20 rounded-lg p-3 mt-2">
                      <div className="text-yellow-300 text-xs font-bold mb-1">💡 Fun Fact</div>
                      <div className="text-white/70 text-xs leading-relaxed">{renderWithTooltips(currentMineral.funFact)}</div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">😔</span>
                      <div>
                        <div className="font-bold text-red-300">It was {currentMineral.name}</div>
                        <div className="text-red-400/70 text-sm">0 points this round</div>
                      </div>
                    </div>
                    <div className="text-white/50 text-xs leading-relaxed">{renderWithTooltips(currentMineral.description)}</div>
                  </div>
                )}

                <button
                  onClick={handleNextRound}
                  className="btn-primary w-full mt-3"
                >
                  {round >= ROUNDS ? 'See Final Score' : `Next Mineral (Round ${round + 1}/${ROUNDS}) →`}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
