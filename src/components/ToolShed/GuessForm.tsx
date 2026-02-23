import { useState, useRef, useEffect } from 'react';
import { getAllMineralNames } from '../../utils/mineralUtils';

interface Props {
  onGuess: (name: string) => void;
  disabled?: boolean;
}

export default function GuessForm({ onGuess, disabled }: Props) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const allNames = useRef(getAllMineralNames());

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const handleInput = (value: string) => {
    setInput(value);
    if (value.length >= 2) {
      const matches = allNames.current.filter(n =>
        n.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches.slice(0, 6));
      setShowSuggestions(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const submit = (name: string) => {
    if (!name.trim()) return;
    setInput('');
    setSuggestions([]);
    setShowSuggestions(false);
    onGuess(name.trim());
  };

  return (
    <div className="relative">
      <div className="text-sm text-purple-300 mb-2 font-display">
        What mineral is this?
      </div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => handleInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') submit(input);
              if (e.key === 'Escape') setShowSuggestions(false);
            }}
            disabled={disabled}
            placeholder="Type mineral name..."
            autoComplete="off"
            className="w-full bg-black/40 border border-purple-700 rounded-lg px-3 py-2.5 text-white
                       focus:outline-none focus:border-purple-400 placeholder-purple-600
                       disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          />
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-mineral-mid border border-purple-700 rounded-lg overflow-hidden z-50 shadow-xl">
              {suggestions.map(name => (
                <button
                  key={name}
                  onClick={() => submit(name)}
                  className="w-full text-left px-3 py-2 text-sm text-white hover:bg-mineral-light/60 transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => submit(input)}
          disabled={disabled || !input.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm py-2.5 px-4"
        >
          Guess
        </button>
      </div>
    </div>
  );
}
