import { useRef, useEffect, useCallback } from 'react';

type DrawFn = (ctx: CanvasRenderingContext2D, frame: number) => void;

export function useCanvas(draw: DrawFn) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const animRef = useRef<number>(0);
  const drawRef = useRef(draw);
  drawRef.current = draw;

  const startLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      frameRef.current++;
      const c = canvasRef.current;
      if (!c) return;
      const context = c.getContext('2d');
      if (!context) return;
      drawRef.current(context, frameRef.current);
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    });

    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      resizeObserver.observe(parent);
    }

    const cleanup = startLoop();
    return () => {
      resizeObserver.disconnect();
      cleanup?.();
    };
  }, [startLoop]);

  return canvasRef;
}
