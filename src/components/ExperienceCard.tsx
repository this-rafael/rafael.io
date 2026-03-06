"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import type { ExperienceData } from "./ExperienceModal";

interface ExperienceCardProps {
  experience: ExperienceData;
  index: number;
  isHighlighted: boolean;
  onClick: () => void;
}

export default function ExperienceCard({
  experience,
  index,
  isHighlighted,
  onClick,
}: ExperienceCardProps) {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isHighlighted) {
      setHasAnimated(false);
      return;
    }
    // Reset animation flag when this card becomes highlighted
    setHasAnimated(false);
    const timer = setTimeout(() => setHasAnimated(true), 1600);
    return () => clearTimeout(timer);
  }, [isHighlighted]);

  const topHighlight = experience.highlights.find((h) => h.metric);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onClick={onClick}
      className="relative cursor-pointer group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Pulsing dot indicator — appears when this card is highlighted */}
      {isHighlighted && !hasAnimated && (
        <motion.div
          className="absolute -top-2 -right-2 z-10 pointer-events-none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <span className="relative flex h-5 w-5">
            {/* Double-ping effect */}
            <motion.span
              className="absolute inset-0 rounded-full bg-portfolio-accent"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{
                duration: 0.7,
                repeat: 1,
                repeatDelay: 0.15,
                ease: "easeOut",
              }}
            />
            {/* Solid dot */}
            <motion.span
              className="relative inline-flex h-5 w-5 rounded-full bg-portfolio-accent shadow-[0_0_12px_rgba(10,132,255,0.6)]"
              animate={{ scale: [1, 0.85, 1, 0.85, 1] }}
              transition={{
                duration: 1.0,
                times: [0, 0.2, 0.4, 0.6, 0.8],
                ease: "easeInOut",
              }}
            />
          </span>
        </motion.div>
      )}

      {/* Card with aura glow when highlighted */}
      <motion.div
        className={`relative p-5 rounded-xl border transition-all duration-300 overflow-hidden
          ${
            isHighlighted
              ? "border-portfolio-accent/50 shadow-[0_0_40px_rgba(10,132,255,0.15)]"
              : "border-white/8 hover:border-portfolio-accent/30"
          }
          bg-white/5 backdrop-blur-sm hover:bg-white/8
        `}
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        animate={
          isHighlighted
            ? {
                boxShadow: [
                  "0 0 20px rgba(10,132,255,0.1)",
                  "0 0 50px rgba(10,132,255,0.25)",
                  "0 0 20px rgba(10,132,255,0.1)",
                ],
              }
            : {}
        }
        transition={
          isHighlighted
            ? { boxShadow: { duration: 2, repeat: 0, ease: "easeInOut" } }
            : { duration: 0.2 }
        }
      >
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-portfolio-accent/5 via-transparent to-portfolio-secondary/5 rounded-xl" />

        <div className="relative z-[1]">
          <h3 className="text-base font-bold text-portfolio-light group-hover:text-portfolio-accent transition-colors duration-300 mb-1">
            {experience.company}
          </h3>
          <p className="text-xs text-portfolio-secondary font-medium mb-3">
            {experience.role}
          </p>
          <p className="text-xs text-portfolio-light/60 line-clamp-2 mb-3 leading-relaxed">
            {experience.summary}
          </p>

          {/* Top metric if available */}
          {topHighlight && (
            <div className="flex items-center gap-2 text-xs">
              <TrendingUp
                size={12}
                className="text-portfolio-accent shrink-0"
              />
              <span className="text-portfolio-light/70">
                <strong className="text-portfolio-accent font-semibold mr-1">
                  {topHighlight.metric}
                </strong>
                <span className="line-clamp-1">{topHighlight.text}</span>
              </span>
            </div>
          )}

          {/* Tech mini pills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {experience.techStack.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-portfolio-light/50"
              >
                {t}
              </span>
            ))}
            {experience.techStack.length > 4 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-portfolio-light/40">
                +{experience.techStack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* "Click to expand" hint */}
        <div className="absolute bottom-2 right-3 text-[10px] text-portfolio-light/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          clique para expandir
        </div>
      </motion.div>
    </motion.div>
  );
}
