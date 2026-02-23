import { useEffect, useRef, useCallback } from 'react';
import type { GridCell, MineralLocation } from '../../types/mineral';

interface Props {
  grid: GridCell[][];
  location: MineralLocation;
  onCellClick: (row: number, col: number) => void;
  disabled: boolean;
}

const GRID_SIZE = 8;
const CELL_SIZE = 52;
const PADDING = 4;

export default function MiningCanvas({ grid, location, onCellClick, disabled }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const frameRef = useRef(0);
  const gridRef = useRef(grid);
  const disabledRef = useRef(disabled);
  gridRef.current = grid;
  disabledRef.current = disabled;

  const canvasSize = GRID_SIZE * CELL_SIZE + PADDING * 2;

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, frame: number) => {
    const g = gridRef.current;
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, canvasSize);
    bgGrad.addColorStop(0, location.backgroundColors[0]);
    bgGrad.addColorStop(1, location.backgroundColors[1]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const cell = g[r][c];
        const x = PADDING + c * CELL_SIZE;
        const y = PADDING + r * CELL_SIZE;
        const w = CELL_SIZE - 2;
        const h = CELL_SIZE - 2;

        if (!cell.revealed) {
          // Unrevealed — dirt/rock texture
          const baseColor = getDirtColor(r, c, location.backgroundColors);
          ctx.fillStyle = baseColor;
          ctx.beginPath();
          ctx.roundRect(x + 1, y + 1, w, h, 4);
          ctx.fill();

          // Rock texture lines
          ctx.strokeStyle = 'rgba(0,0,0,0.2)';
          ctx.lineWidth = 1;
          for (let i = 0; i < 3; i++) {
            const ox = (r * 7 + c * 13 + i * 31) % (w - 8);
            const oy = (r * 11 + c * 5 + i * 17) % (h - 8);
            ctx.beginPath();
            ctx.moveTo(x + 4 + ox, y + 4 + oy);
            ctx.lineTo(x + 10 + ox, y + 8 + oy);
            ctx.stroke();
          }

          // Subtle highlight
          ctx.fillStyle = 'rgba(255,255,255,0.05)';
          ctx.beginPath();
          ctx.roundRect(x + 1, y + 1, w, 12, [4, 4, 0, 0]);
          ctx.fill();

        } else if (cell.empty) {
          // Dug out — empty hole
          ctx.fillStyle = 'rgba(0,0,0,0.6)';
          ctx.beginPath();
          ctx.roundRect(x + 1, y + 1, w, h, 4);
          ctx.fill();

          // Dirt border inside
          ctx.strokeStyle = 'rgba(100,60,20,0.4)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(x + 3, y + 3, w - 4, h - 4, 3);
          ctx.stroke();

        } else if (cell.mineral) {
          // Mineral found!
          const mineral = cell.mineral;
          const animPulse = 0.85 + 0.15 * Math.sin(frame * 0.08 + r + c);

          // Mineral background glow
          ctx.save();
          ctx.globalAlpha = 0.3 * animPulse;
          ctx.fillStyle = mineral.color[0];
          ctx.shadowColor = mineral.color[0];
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.roundRect(x + 1, y + 1, w, h, 4);
          ctx.fill();
          ctx.restore();

          // Cell background
          ctx.fillStyle = 'rgba(20,10,40,0.7)';
          ctx.beginPath();
          ctx.roundRect(x + 1, y + 1, w, h, 4);
          ctx.fill();

          // Mineral gem shape
          const cx2 = x + CELL_SIZE / 2;
          const cy2 = y + CELL_SIZE / 2;
          const gemR = 14 * animPulse;

          const grad = ctx.createRadialGradient(cx2 - 4, cy2 - 4, 2, cx2, cy2, gemR);
          grad.addColorStop(0, lightenHex(mineral.color[0], 60));
          grad.addColorStop(1, mineral.color[0]);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.moveTo(cx2, cy2 - gemR);
          ctx.lineTo(cx2 + gemR * 0.7, cy2 - gemR * 0.3);
          ctx.lineTo(cx2 + gemR * 0.7, cy2 + gemR * 0.3);
          ctx.lineTo(cx2, cy2 + gemR);
          ctx.lineTo(cx2 - gemR * 0.7, cy2 + gemR * 0.3);
          ctx.lineTo(cx2 - gemR * 0.7, cy2 - gemR * 0.3);
          ctx.closePath();
          ctx.fill();

          // Shine
          ctx.fillStyle = 'rgba(255,255,255,0.4)';
          ctx.beginPath();
          ctx.ellipse(cx2 - 4, cy2 - 5, 4, 2, -0.5, 0, Math.PI * 2);
          ctx.fill();

          // Rarity indicator
          if (mineral.rarity !== 'common') {
            ctx.fillStyle = mineral.rarity === 'rare' ? '#f0c040' : '#4080f0';
            ctx.beginPath();
            ctx.arc(x + w - 2, y + 4, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Animating cell (being dug)
        if (cell.animating) {
          const progress = (Math.sin(frame * 0.3) + 1) / 2;
          ctx.fillStyle = `rgba(255, 200, 50, ${0.3 * progress})`;
          ctx.beginPath();
          ctx.roundRect(x + 1, y + 1, w, h, 4);
          ctx.fill();

          // Dust particles
          for (let i = 0; i < 3; i++) {
            const px = x + 5 + ((frame * 3 + i * 15) % (w - 10));
            const py = y + h - 5 - ((frame * 2 + i * 10) % (h - 10));
            ctx.fillStyle = `rgba(180, 120, 50, ${0.6 * progress})`;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Grid lines
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(x, y, CELL_SIZE, CELL_SIZE, 3);
        ctx.stroke();
      }
    }
  }, [canvasSize, location]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      frameRef.current++;
      drawGrid(ctx, frameRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [canvasSize, drawGrid]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (disabledRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX - PADDING;
    const y = (e.clientY - rect.top) * scaleY - PADDING;
    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);
    if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
      onCellClick(row, col);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      className={`rounded-xl ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-crosshair hover:opacity-95'}`}
      style={{ width: canvasSize, height: canvasSize, maxWidth: '100%' }}
    />
  );
}

function getDirtColor(row: number, col: number, backgroundColors: string[]): string {
  const seed = (row * 8 + col) * 3;
  const variation = (seed % 20) - 10;
  const hex = (backgroundColors[0] ?? '#321e0f').replace('#', '');
  const num = parseInt(hex, 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + 40 + variation));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + 30 + variation));
  const b = Math.min(255, Math.max(0, (num & 0xff) + 20 + variation));
  return `rgb(${r},${g},${b})`;
}

function lightenHex(hex: string, amount: number): string {
  try {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, (num >> 16) + amount);
    const g = Math.min(255, ((num >> 8) & 0xff) + amount);
    const b = Math.min(255, (num & 0xff) + amount);
    return `rgb(${r},${g},${b})`;
  } catch {
    return hex;
  }
}
