"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Skill {
  id: number;
  title: string;
  imageUrl: string;
  themeAccentColor: string;
  label: string;
}

interface SkillsCarouselProps {
  skills: Skill[];
}

export default function SkillsCarousel({ skills }: SkillsCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoplayTimerRef = useRef<number | null>(null);

  const handleNext = useMemo(() => {
    return () => {
      if (isAnimating) return;

      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % skills.length);

      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    };
  }, [isAnimating, skills.length]);

  const handlePrev = useMemo(() => {
    return () => {
      if (isAnimating) return;

      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + skills.length) % skills.length);

      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    };
  }, [isAnimating, skills.length]);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;

    const distance = touchStart - touchEnd;
    const isSwipe = Math.abs(distance) > 50;

    if (isSwipe) {
      if (distance > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Setup autoplay
  useEffect(() => {
    autoplayTimerRef.current = window.setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [handleNext]);

  // Pause autoplay on hover
  const pauseAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  // Resume autoplay on mouse leave
  const resumeAutoplay = () => {
    if (!autoplayTimerRef.current) {
      autoplayTimerRef.current = window.setInterval(() => {
        handleNext();
      }, 5000);
    }
  };

  // Get the current skill
  const currentSkill = skills[currentSlide];

  return (
    <div id="skills" className="w-full py-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Principais habilidades
      </h2>

      <div
        className="card max-w-3xl mx-auto relative overflow-hidden"
        onMouseEnter={pauseAutoplay}
        onMouseLeave={resumeAutoplay}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center min-h-[20rem] p-4 md:p-8">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 w-full transition-opacity duration-500 ${
              isAnimating ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-medium mb-4">
                {currentSkill.title}
              </h3>
              <span
                className="inline-block px-3 py-1 text-xs rounded-full text-white w-fit mb-4"
                style={{ backgroundColor: currentSkill.themeAccentColor }}
              >
                {currentSkill.label}
              </span>
              <p className="text-portfolio-light/70">
                {currentSkill.label === "Backend" &&
                  "Desenvolvimento de APIs, serviços e arquitetura de sistemas de backend."}
                {currentSkill.label === "Frontend" &&
                  "Criação de interfaces de usuário responsivas e interativas."}
                {currentSkill.label === "Fullstack" &&
                  "Desenvolvimento completo de aplicações web, do backend ao frontend."}
                {currentSkill.label === "Database" &&
                  "Modelagem, otimização e administração de bancos de dados."}
                {currentSkill.label === "Architecture" &&
                  "Design de arquitetura de software escalável e sustentável."}
              </p>
            </div>

            <div className="flex items-center justify-center relative">
              <div className="w-64 h-64 relative flex items-center justify-center">
                <div
                  className="w-52 h-52 relative flex items-center justify-center"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "50%",
                  }}
                >
                  <Image
                    src={currentSkill.imageUrl}
                    alt={currentSkill.title}
                    fill
                    className="object-contain max-w-full max-h-full"
                  />
                  <div
                    className="absolute inset-0 rounded-full opacity-15"
                    style={{
                      backgroundColor: currentSkill.themeAccentColor,
                      filter: "blur(100px)",
                    }}
                  />
                </div>

                <div
                  className="absolute inset-0 rounded-full opacity-25"
                  style={{
                    backgroundColor: currentSkill.themeAccentColor,
                    filter: "blur(10px)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-portfolio-dark/50 hover:bg-portfolio-dark/80 
                    text-white p-2 rounded-full transition-all duration-300 hover:scale-110 z-10"
          aria-label="Previous skill"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-portfolio-dark/50 hover:bg-portfolio-dark/80 
                    text-white p-2 rounded-full transition-all duration-300 hover:scale-110 z-10"
          aria-label="Next skill"
        >
          <ChevronRight size={18} />
        </button>

        {/* Pagination dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {skills.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-portfolio-accent w-4"
                  : "bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
