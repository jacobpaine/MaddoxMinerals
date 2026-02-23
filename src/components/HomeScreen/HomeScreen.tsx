import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  alphaDecay: number;
  sparkle: number;
}

const SPARKLE_COLORS = [
  '#f0c040', '#40c0f0', '#c040f0', '#40f0c0',
  '#f04080', '#80f040', '#f08040', '#4080f0',
];

export default function HomeScreen() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnParticle = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.8) * 1.2,
        size: Math.random() * 3 + 1,
        color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
        alpha: 1,
        alphaDecay: Math.random() * 0.01 + 0.005,
        sparkle: Math.random() * Math.PI * 2,
      });
    };

    // Spawn initial particles
    for (let i = 0; i < 60; i++) spawnParticle();

    let frame = 0;
    const loop = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Spawn new particles periodically
      if (frame % 8 === 0) spawnParticle();

      particlesRef.current = particlesRef.current.filter(p => p.alpha > 0);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.alphaDecay;
        p.sparkle += 0.1;

        const s = p.size * (0.8 + 0.2 * Math.sin(p.sparkle));

        // Draw sparkle star
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.sparkle);
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2;
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * s * 2, Math.sin(angle) * s * 2);
        }
        ctx.lineWidth = s * 0.5;
        ctx.strokeStyle = p.color;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-mineral-dark">
      {/* Particle canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.7 }}
      />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(45,27,94,0.6) 0%, rgba(26,15,46,0.95) 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-4 max-w-2xl w-full">
        {/* Title */}
        <div className="text-center">
          <div className="text-mineral-gold font-display text-sm tracking-widest uppercase mb-2 opacity-80">
            Educational Game
          </div>
          <h1
            className="font-display font-bold text-5xl md:text-7xl tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #f0c040, #ffffff, #40c0f0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
            }}
          >
            Maddox
          </h1>
          <h1
            className="font-display font-bold text-5xl md:text-7xl tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #40c0f0, #c040f0, #f0c040)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
            }}
          >
            Minerals
          </h1>
          <p className="mt-4 text-purple-300 text-base md:text-lg max-w-md mx-auto">
            Explore, identify, and collect Earth's amazing minerals
          </p>
        </div>

        {/* Mode buttons */}
        <div className="grid grid-cols-1 gap-4 w-full">
          <ModeButton
            icon="🔬"
            title="Tool Shed"
            description="Identify mystery minerals using scientific tools"
            color="from-amber-900/60 to-amber-800/40"
            borderColor="border-amber-600/50"
            hoverColor="hover:border-amber-400"
            onClick={() => navigate('/toolshed')}
          />
          <ModeButton
            icon="⛏️"
            title="Go Mining!"
            description="Mine for minerals, identify them, and sell your haul"
            color="from-emerald-900/60 to-emerald-800/40"
            borderColor="border-emerald-600/50"
            hoverColor="hover:border-emerald-400"
            onClick={() => navigate('/shop')}
          />
          <ModeButton
            icon="📖"
            title="Reference"
            description="Browse the complete mineral encyclopedia"
            color="from-blue-900/60 to-blue-800/40"
            borderColor="border-blue-600/50"
            hoverColor="hover:border-blue-400"
            onClick={() => navigate('/reference')}
          />
        </div>

        <div className="text-purple-500 text-xs font-display">
          Inspired by Murphy's Minerals (MECC, 1990)
        </div>
      </div>
    </div>
  );
}

interface ModeButtonProps {
  icon: string;
  title: string;
  description: string;
  color: string;
  borderColor: string;
  hoverColor: string;
  onClick: () => void;
}

function ModeButton({ icon, title, description, color, borderColor, hoverColor, onClick }: ModeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-4 p-5 rounded-xl border
        bg-gradient-to-r ${color} ${borderColor} ${hoverColor}
        transition-all duration-200 active:scale-98 text-left
        hover:scale-101 hover:shadow-lg hover:shadow-black/40
      `}
    >
      <span className="text-4xl flex-shrink-0">{icon}</span>
      <div>
        <div className="font-display font-bold text-xl text-white">{title}</div>
        <div className="text-sm text-white/60 mt-0.5">{description}</div>
      </div>
      <span className="ml-auto text-white/40 text-xl">›</span>
    </button>
  );
}
