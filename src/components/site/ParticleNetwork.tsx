import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
};

type Pulse = {
  a: number; // particle index a
  b: number; // particle index b
  t: number; // 0..1 progress
  speed: number;
};

type Twinkle = {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  r: number;
};

interface Props {
  className?: string;
  particleCount?: number;
  connectDistance?: number;
}

export function ParticleNetwork({
  className = "",
  particleCount = 40,
  connectDistance = 130,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let pulses: Pulse[] = [];
    let twinkles: Twinkle[] = [];
    let breathe = 0;
    let rafId = 0;
    let lastT = performance.now();

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const count = isMobile ? Math.max(20, Math.floor(particleCount * 0.6)) : particleCount;
    const linkDist = isMobile ? connectDistance * 0.85 : connectDistance;

    const ACCENT = "212, 81, 26"; // #D4511A

    const seed = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 1.2 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
      }));
      pulses = [];
      twinkles = [];
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length === 0) seed();
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const draw = (now: number) => {
      const dt = Math.min(50, now - lastT);
      lastT = now;
      breathe += dt * 0.0008;

      ctx.clearRect(0, 0, width, height);

      // Soft breathing radial glow behind everything
      const glowRadius = Math.min(width, height) * (0.45 + Math.sin(breathe) * 0.05);
      const glowAlpha = 0.22 + Math.sin(breathe) * 0.06;
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        glowRadius,
      );
      grad.addColorStop(0, `rgba(${ACCENT}, ${glowAlpha})`);
      grad.addColorStop(0.5, `rgba(${ACCENT}, ${glowAlpha * 0.35})`);
      grad.addColorStop(1, "rgba(212, 81, 26, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Update particles
      const m = mouseRef.current;
      for (const p of particles) {
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        p.phase += dt * 0.002;

        // Wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Subtle mouse attraction
        if (m.active) {
          const dx = m.x - p.x;
          const dy = m.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 160 * 160) {
            const f = (1 - Math.sqrt(d2) / 160) * 0.04;
            p.vx += (dx / Math.sqrt(d2 + 0.001)) * f * 0.05;
            p.vy += (dy / Math.sqrt(d2 + 0.001)) * f * 0.05;
          }
        }

        // Damp velocity
        p.vx *= 0.995;
        p.vy *= 0.995;
        // Keep some baseline motion
        if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.02;
        if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.02;
      }

      // Connections
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            const t = 1 - dist / linkDist;
            const fade = 0.5 + 0.5 * Math.sin(breathe * 2 + (i + j) * 0.3);
            const alpha = t * 0.35 * fade;
            ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Occasional energy pulses
      if (Math.random() < 0.025 && pulses.length < 6 && particles.length > 1) {
        const a = Math.floor(Math.random() * particles.length);
        let b = Math.floor(Math.random() * particles.length);
        if (b === a) b = (b + 1) % particles.length;
        const pa = particles[a];
        const pb = particles[b];
        const d = Math.hypot(pa.x - pb.x, pa.y - pb.y);
        if (d < linkDist * 1.5) {
          pulses.push({ a, b, t: 0, speed: 0.006 + Math.random() * 0.008 });
        }
      }

      if (Math.random() < 0.02 && twinkles.length < 10 && particles.length > 0) {
        const p = particles[Math.floor(Math.random() * particles.length)];
        twinkles.push({
          x: p.x + (Math.random() - 0.5) * 18,
          y: p.y + (Math.random() - 0.5) * 18,
          life: 0,
          maxLife: 26 + Math.random() * 18,
          r: 0.8 + Math.random() * 1.2,
        });
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const pu = pulses[i];
        pu.t += pu.speed * (dt / 16);
        if (pu.t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const pa = particles[pu.a];
        const pb = particles[pu.b];
        if (!pa || !pb) {
          pulses.splice(i, 1);
          continue;
        }
        const x = pa.x + (pb.x - pa.x) * pu.t;
        const y = pa.y + (pb.y - pa.y) * pu.t;
        const fade = Math.sin(pu.t * Math.PI);
        const r = 6 * fade;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2);
        g.addColorStop(0, `rgba(${ACCENT}, ${0.9 * fade})`);
        g.addColorStop(1, `rgba(${ACCENT}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = twinkles.length - 1; i >= 0; i--) {
        const t = twinkles[i];
        t.life += dt;
        if (t.life >= t.maxLife) {
          twinkles.splice(i, 1);
          continue;
        }
        const prog = t.life / t.maxLife;
        const alpha = Math.sin(prog * Math.PI);
        const r = t.r * (1.5 + alpha * 1.5);
        const g = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, r * 4);
        g.addColorStop(0, `rgba(${ACCENT}, ${0.95 * alpha})`);
        g.addColorStop(0.35, `rgba(${ACCENT}, ${0.35 * alpha})`);
        g.addColorStop(1, `rgba(${ACCENT}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(t.x, t.y, r * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Particles with pulsing glow
      for (const p of particles) {
        const pulse = 0.6 + 0.4 * Math.sin(p.phase);
        const r = p.r * (0.9 + pulse * 0.2);

        // Outer glow
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 6);
        g.addColorStop(0, `rgba(${ACCENT}, ${0.55 * pulse})`);
        g.addColorStop(1, `rgba(${ACCENT}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(255, 200, 160, ${0.85 * pulse + 0.15})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    rafId = requestAnimationFrame(draw);

    // Respect reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      cancelAnimationFrame(rafId);
    }

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [particleCount, connectDistance]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
}
