import { useEffect, useRef } from 'react';
import type { Mineral } from '../../types/mineral';
import MineralIcon from '../shared/MineralIcon';

interface Props {
  mineral: Mineral;
  revealedProperties: Set<string>;
  showStreak: boolean;
  showScratch: boolean;
}

export default function MineralDisplay({ mineral, showStreak, showScratch }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 220;
    canvas.height = 220;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawSparkles = (frame: number) => {
      ctx.clearRect(0, 0, 220, 220);

      const cx = 110;
      const cy = 110;
      const t = frame * 0.02;

      // Streak effect (drawn at right edge, outside mineral icon area)
      if (showStreak) {
        ctx.save();
        ctx.translate(cx + 80, cy);
        ctx.rotate(-0.3);
        ctx.fillStyle = mineral.streak;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.roundRect(-30, -5, 60, 10, 5);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      // Scratch mark effect (drawn as an overlay line)
      if (showScratch) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 2]);
        ctx.beginPath();
        ctx.moveTo(-40, -20);
        ctx.lineTo(40, 10);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      // Floating sparkles
      const sparkCount = 6;
      for (let i = 0; i < sparkCount; i++) {
        const sparkAngle = t + (i * Math.PI * 2) / sparkCount;
        const sparkR = 90 + Math.sin(t * 2 + i) * 10;
        const sx = cx + Math.cos(sparkAngle) * sparkR;
        const sy = cy + Math.sin(sparkAngle) * sparkR * 0.7;
        const alpha = 0.4 + 0.3 * Math.sin(t * 3 + i);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = mineral.color[i % mineral.color.length];
        ctx.beginPath();
        ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    const loop = () => {
      frameRef.current++;
      drawSparkles(frameRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mineral, showStreak, showScratch]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="rounded-2xl p-4 flex items-center justify-center relative"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(74,45,138,0.3) 0%, rgba(26,15,46,0.8) 100%)',
          boxShadow: `0 0 40px ${mineral.color[0]}40`,
          width: 228,
          height: 228,
        }}
      >
        {/* Sparkle + effect canvas behind the icon */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ width: 220, height: 220, left: 4, top: 4 }}
        />
        {/* Mineral SVG illustration on top */}
        <div className="relative z-10">
          <MineralIcon id={mineral.id} size={200} />
        </div>
      </div>
      <div className="text-purple-400 text-xs font-display">
        Weight: {mineral.density < 2.5 ? 'Very light' : mineral.density < 3.5 ? 'Light' : mineral.density < 5 ? 'Heavy' : 'Very heavy'} for its size
      </div>
    </div>
  );
}
