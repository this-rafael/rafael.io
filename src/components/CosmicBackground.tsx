"use client";

import { useEffect, useRef, useState } from "react";

type Star = {
  id: number;
  left: string;
  top: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
};

type Particle = {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
};

const MAX_PARTICLES = 320;
const MIN_PARTICLES = 150;
const BASE_GRAVITY_STRENGTH = 1200;
const GRAVITY_RADIUS = 380;
const VELOCITY_DAMPING = 0.95;
const MAX_SPEED = 3.2;
const REPULSION_STRENGTH = 2200;
const REPULSION_RADIUS = 300;
const REPULSION_DURATION = 700;
const REPULSION_COOLDOWN = 140;
const SUPER_REPULSION_STRENGTH_MULTIPLIER = 1.9;
const SUPER_REPULSION_RADIUS_MULTIPLIER = 1.25;
const SUPER_REPULSION_DURATION_MULTIPLIER = 1.15;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

// Generate stars deterministically-enough client-side after mount
// to avoid server/client hydration mismatch
export default function CosmicBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [isDesktopInteractive, setIsDesktopInteractive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -10000, y: -10000, active: false });
  const smoothMouseRef = useRef({ x: -10000, y: -10000 });
  const repulsionRef = useRef({
    x: 0,
    y: 0,
    start: 0,
    until: 0,
    strength: REPULSION_STRENGTH,
    radius: REPULSION_RADIUS,
    duration: REPULSION_DURATION,
    lastTrigger: 0,
    active: false,
  });
  const lastFrameRef = useRef(0);

  useEffect(() => {
    // Only generate on client to prevent hydration mismatch
    const generated = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
    }));
    setStars(generated);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine)",
    );

    const updateMode = () => {
      setIsDesktopInteractive(mediaQuery.matches);
    };

    updateMode();
    mediaQuery.addEventListener("change", updateMode);

    return () => {
      mediaQuery.removeEventListener("change", updateMode);
    };
  }, []);

  useEffect(() => {
    if (!isDesktopInteractive) {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      const ctx = canvasRef.current?.getContext("2d");
      if (ctx && canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }

      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const createParticles = (width: number, height: number): Particle[] => {
      const area = width * height;
      const targetCount = clamp(
        Math.floor(area / 25000),
        MIN_PARTICLES,
        MAX_PARTICLES,
      );

      return Array.from({ length: targetCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        prevX: 0,
        prevY: 0,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3.2 + 1.2,
        opacity: Math.random() * 0.45 + 0.2,
      })).map((particle) => ({
        ...particle,
        prevX: particle.x,
        prevY: particle.y,
      }));
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      particlesRef.current = createParticles(width, height);
      smoothMouseRef.current = { x: width / 2, y: height / 2 };
      if (!mouseRef.current.active) {
        mouseRef.current.x = width / 2;
        mouseRef.current.y = height / 2;
      }
    };

    const moveHandler = (event: PointerEvent) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
      mouseRef.current.active = true;
    };

    const leaveHandler = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -10000;
      mouseRef.current.y = -10000;
    };

    const pointerDownHandler = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target?.closest(
          "a,button,input,textarea,select,label,[role='button'],[data-no-bg-repulse='true']",
        )
      ) {
        return;
      }

      const now = performance.now();
      const elapsedSinceLastTrigger = now - repulsionRef.current.lastTrigger;
      if (elapsedSinceLastTrigger < REPULSION_COOLDOWN) {
        return;
      }

      const isDoubleClick = event.pointerType === "mouse" && event.detail >= 2;
      const strength = isDoubleClick
        ? REPULSION_STRENGTH * SUPER_REPULSION_STRENGTH_MULTIPLIER
        : REPULSION_STRENGTH;
      const radius = isDoubleClick
        ? REPULSION_RADIUS * SUPER_REPULSION_RADIUS_MULTIPLIER
        : REPULSION_RADIUS;
      const duration = isDoubleClick
        ? REPULSION_DURATION * SUPER_REPULSION_DURATION_MULTIPLIER
        : REPULSION_DURATION;

      repulsionRef.current = {
        x: event.clientX,
        y: event.clientY,
        start: now,
        until: now + duration,
        strength,
        radius,
        duration,
        lastTrigger: now,
        active: true,
      };
    };

    const visibilityHandler = () => {
      if (document.hidden && animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
        return;
      }

      if (!document.hidden && animationRef.current === null) {
        lastFrameRef.current = performance.now();
        animationRef.current = requestAnimationFrame(render);
      }
    };

    const render = (timestamp: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const delta = clamp(
        (timestamp - (lastFrameRef.current || timestamp)) / 16.67,
        0.2,
        2,
      );
      lastFrameRef.current = timestamp;

      smoothMouseRef.current.x +=
        (mouseRef.current.x - smoothMouseRef.current.x) * 0.08;
      smoothMouseRef.current.y +=
        (mouseRef.current.y - smoothMouseRef.current.y) * 0.08;

      context.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const centerX = smoothMouseRef.current.x;
      const centerY = smoothMouseRef.current.y;
      const repulse = repulsionRef.current;
      const repulseActive = repulse.active && timestamp <= repulse.until;

      if (!repulseActive && repulse.active) {
        repulsionRef.current.active = false;
      }

      const repulseProgress = repulseActive
        ? clamp((timestamp - repulse.start) / repulse.duration, 0, 1)
        : 1;
      const repulseFade = 1 - repulseProgress;

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        particle.prevX = particle.x;
        particle.prevY = particle.y;

        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const distanceSq = dx * dx + dy * dy;

        if (
          distanceSq > 1 &&
          distanceSq < GRAVITY_RADIUS * GRAVITY_RADIUS &&
          mouseRef.current.active
        ) {
          const distance = Math.sqrt(distanceSq);
          const pull =
            (BASE_GRAVITY_STRENGTH / distanceSq) *
            ((GRAVITY_RADIUS - distance) / GRAVITY_RADIUS);

          particle.vx += dx * pull * delta;
          particle.vy += dy * pull * delta;
        }

        if (repulseActive) {
          const rdx = particle.x - repulse.x;
          const rdy = particle.y - repulse.y;
          const repulseDistanceSq = rdx * rdx + rdy * rdy;

          if (
            repulseDistanceSq > 1 &&
            repulseDistanceSq < repulse.radius * repulse.radius
          ) {
            const repulseDistance = Math.sqrt(repulseDistanceSq);
            const push =
              (repulse.strength / repulseDistanceSq) *
              ((repulse.radius - repulseDistance) / repulse.radius) *
              repulseFade;

            particle.vx += rdx * push * delta;
            particle.vy += rdy * push * delta;
          }
        }

        particle.vx *= VELOCITY_DAMPING;
        particle.vy *= VELOCITY_DAMPING;

        const speed = Math.hypot(particle.vx, particle.vy);
        if (speed > MAX_SPEED) {
          const limiter = MAX_SPEED / speed;
          particle.vx *= limiter;
          particle.vy *= limiter;
        }

        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        context.beginPath();
        context.strokeStyle = `rgba(191,90,242,${particle.opacity * 0.24})`;
        context.lineWidth = Math.max(0.4, particle.size * 0.28);
        context.moveTo(particle.prevX, particle.prevY);
        context.lineTo(particle.x, particle.y);
        context.stroke();

        context.beginPath();
        context.fillStyle = `rgba(245,245,247,${particle.opacity})`;
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }

      if (mouseRef.current.active) {
        const gradient = context.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          200,
        );
        gradient.addColorStop(0, "rgba(10,132,255,0.28)");
        gradient.addColorStop(0.5, "rgba(191,90,242,0.10)");
        gradient.addColorStop(1, "rgba(10,132,255,0)");

        context.beginPath();
        context.fillStyle = gradient;
        context.arc(centerX, centerY, 200, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        context.fillStyle = "rgba(191,90,242,0.75)";
        context.arc(centerX, centerY, 10, 0, Math.PI * 2);
        context.fill();

        // Anel externo sutil
        context.beginPath();
        context.strokeStyle = "rgba(191,90,242,0.28)";
        context.lineWidth = 1.5;
        context.arc(centerX, centerY, 20, 0, Math.PI * 2);
        context.stroke();
      }

      if (repulseActive) {
        const pulseRadius = 20 + repulseProgress * (repulse.radius * 0.62);
        context.beginPath();
        context.strokeStyle = `rgba(10,132,255,${0.35 * repulseFade})`;
        context.lineWidth = 2;
        context.arc(repulse.x, repulse.y, pulseRadius, 0, Math.PI * 2);
        context.stroke();

        context.beginPath();
        context.fillStyle = `rgba(191,90,242,${0.16 * repulseFade})`;
        context.arc(
          repulse.x,
          repulse.y,
          14 + repulseProgress * 28,
          0,
          Math.PI * 2,
        );
        context.fill();
      }

      animationRef.current = requestAnimationFrame(render);
    };

    resizeCanvas();
    lastFrameRef.current = performance.now();
    animationRef.current = requestAnimationFrame(render);

    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("pointermove", moveHandler, { passive: true });
    window.addEventListener("pointerleave", leaveHandler);
    window.addEventListener("pointerdown", pointerDownHandler, {
      passive: true,
    });
    document.addEventListener("visibilitychange", visibilityHandler);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", moveHandler);
      window.removeEventListener("pointerleave", leaveHandler);
      window.removeEventListener("pointerdown", pointerDownHandler);
      document.removeEventListener("visibilitychange", visibilityHandler);

      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isDesktopInteractive]);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Aurora Orb — Blue */}
      <div
        className="absolute rounded-full mix-blend-screen animate-float-1"
        style={{
          width: 900,
          height: 900,
          left: "20%",
          top: "10%",
          background:
            "radial-gradient(circle, rgba(10,132,255,0.25) 0%, transparent 70%)",
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />
      {/* Aurora Orb — Purple */}
      <div
        className="absolute rounded-full mix-blend-screen animate-float-2"
        style={{
          width: 1000,
          height: 1000,
          right: "10%",
          top: "30%",
          background:
            "radial-gradient(circle, rgba(191,90,242,0.20) 0%, transparent 70%)",
          filter: "blur(100px)",
          willChange: "transform",
        }}
      />
      {/* Aurora Orb — Green */}
      <div
        className="absolute rounded-full mix-blend-screen animate-float-3"
        style={{
          width: 800,
          height: 800,
          left: "50%",
          bottom: "10%",
          background:
            "radial-gradient(circle, rgba(48,209,88,0.15) 0%, transparent 70%)",
          filter: "blur(90px)",
          willChange: "transform",
        }}
      />
      {/* Aurora Orb — Accent */}
      <div
        className="absolute rounded-full mix-blend-screen animate-float-4"
        style={{
          width: 850,
          height: 850,
          left: "10%",
          bottom: "30%",
          background:
            "radial-gradient(circle, rgba(255,55,95,0.12) 0%, transparent 70%)",
          filter: "blur(85px)",
          willChange: "transform",
        }}
      />

      {/* Star field — rendered only on client */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            background: "#f5f5f7",
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}

      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: isDesktopInteractive ? 1 : 0 }}
      />
    </div>
  );
}
