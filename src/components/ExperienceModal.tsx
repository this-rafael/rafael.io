"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, Briefcase, Code2, Quote, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type ExperienceData = {
  company: string;
  role: string;
  type: string;
  summary: string;
  context: string;
  techStack: string[];
  highlights: { metric?: string; text: string }[];
  story?: string;
  softSkills?: string[];
  recommendation?: { author: string; role: string; text: string };
};

interface ExperienceModalProps {
  experience: ExperienceData | null;
  onClose: () => void;
}

export default function ExperienceModal({
  experience,
  onClose,
}: ExperienceModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!experience) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [experience, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {experience && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal — x/y via Framer Motion style so they combine with scale in one transform */}
          <motion.div
            className="fixed left-1/2 top-1/2 z-10 w-full max-w-[42rem] max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl border border-white/10 bg-portfolio-surface/95 backdrop-blur-xl shadow-2xl"
            style={{ x: "-50%", y: "-50%" }}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-portfolio-accent via-portfolio-secondary to-portfolio-accent rounded-t-2xl" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Fechar"
            >
              <X size={18} className="text-portfolio-light/70" />
            </button>

            <div className="p-6 md:p-8 space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold text-portfolio-accent mb-1">
                  {experience.company}
                </h2>
                <p className="text-sm font-medium text-portfolio-secondary">
                  {experience.role}
                </p>
                <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-portfolio-accent/10 text-portfolio-accent border border-portfolio-accent/20">
                  {experience.type}
                </span>
              </div>

              {/* Context */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase size={14} className="text-portfolio-accent" />
                  <h3 className="text-sm font-semibold text-portfolio-light/90">
                    Contexto
                  </h3>
                </div>
                <p className="text-sm text-portfolio-light/70 leading-relaxed">
                  {experience.context}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={14} className="text-portfolio-accent" />
                  <h3 className="text-sm font-semibold text-portfolio-light/90">
                    Entregas & Impacto
                  </h3>
                </div>
                <ul className="space-y-2">
                  {experience.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-portfolio-accent shrink-0" />
                      <span className="text-portfolio-light/80">
                        {h.metric && (
                          <strong className="text-portfolio-accent font-semibold mr-1">
                            {h.metric}
                          </strong>
                        )}
                        {h.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Code2 size={14} className="text-portfolio-accent" />
                  <h3 className="text-sm font-semibold text-portfolio-light/90">
                    Stack Tecnológica
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {experience.techStack.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-portfolio-light/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Story — personal narrative */}
              {experience.story && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Quote size={14} className="text-portfolio-secondary" />
                    <h3 className="text-sm font-semibold text-portfolio-light/90">
                      A História por Trás
                    </h3>
                  </div>
                  <p className="text-sm text-portfolio-light/65 leading-relaxed italic border-l-2 border-portfolio-secondary/40 pl-4">
                    {experience.story}
                  </p>
                </div>
              )}

              {/* Soft skills */}
              {experience.softSkills && experience.softSkills.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={14} className="text-portfolio-green" />
                    <h3 className="text-sm font-semibold text-portfolio-light/90">
                      Soft Skills Desenvolvidas
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {experience.softSkills.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2.5 py-1 rounded-full bg-portfolio-green/10 border border-portfolio-green/20 text-portfolio-green/80"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendation */}
              {experience.recommendation && (
                <div className="rounded-xl bg-white/5 border border-white/8 p-4">
                  <p className="text-sm text-portfolio-light/70 italic leading-relaxed mb-3">
                    &ldquo;{experience.recommendation.text}&rdquo;
                  </p>
                  <p className="text-xs text-portfolio-light/50">
                    — <strong>{experience.recommendation.author}</strong>,{" "}
                    {experience.recommendation.role}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
