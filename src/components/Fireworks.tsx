import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

interface Firework {
  x: number;
  y: number;
  vy: number;
  exploded: boolean;
  particles: Particle[];
}

export const Fireworks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fireworksRef = useRef<Firework[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = ['#C00021', '#FF4D6D', '#FF758F', '#FFFFFF', '#FFB3C1'];

    const createFirework = (): Firework => ({
      x: Math.random() * canvas.width,
      y: canvas.height,
      vy: -8 - Math.random() * 4,
      exploded: false,
      particles: [],
    });

    const explode = (firework: Firework) => {
      const particleCount = 60 + Math.random() * 40;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = 2 + Math.random() * 4;
        firework.particles.push({
          x: firework.x,
          y: firework.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 2 + Math.random() * 2,
        });
      }
      firework.exploded = true;
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Randomly add new fireworks
      if (Math.random() < 0.03) {
        fireworksRef.current.push(createFirework());
      }

      fireworksRef.current = fireworksRef.current.filter((firework) => {
        if (!firework.exploded) {
          firework.y += firework.vy;
          firework.vy += 0.1;

          // Draw trail
          ctx.beginPath();
          ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#C00021';
          ctx.fill();

          // Explode at peak
          if (firework.vy >= 0) {
            explode(firework);
          }
          return true;
        } else {
          // Update and draw particles
          firework.particles = firework.particles.filter((particle) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.05;
            particle.alpha -= 0.015;

            if (particle.alpha > 0) {
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
              ctx.fillStyle = particle.color;
              ctx.globalAlpha = particle.alpha;
              ctx.fill();
              ctx.globalAlpha = 1;
              return true;
            }
            return false;
          });

          return firework.particles.length > 0;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
};
