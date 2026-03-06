"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Artigos", path: "/artigos" },
  { label: "Projetos", path: "/projetos" },
  { label: "Contato", path: "/contato" },
];

export default function FloatingNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const activeIndex = navItems.findIndex((item) => item.path === pathname);

  return (
    <>
      {/* Desktop floating pill navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 32, delay: 0.2 }}
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 glass-deep rounded-full px-3 sm:px-5 py-2 flex items-center gap-1 max-w-[calc(100vw-2rem)] hidden md:flex"
      >
        {/* Logo */}
        <Link href="/" className="mr-3 flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
            <defs>
              <linearGradient id="logo-grad-nav" x1="0" y1="0" x2="28" y2="28">
                <stop offset="0%" stopColor="#0A84FF" />
                <stop offset="100%" stopColor="#BF5AF2" />
              </linearGradient>
            </defs>
            <path
              d="M14 2L26 8v12l-12 6L2 20V8l12-6z"
              stroke="url(#logo-grad-nav)"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="14" cy="14" r="4" fill="url(#logo-grad-nav)" />
          </svg>
          <span className="text-gradient-primary font-syne font-bold text-sm tracking-tight">
            RP
          </span>
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-1 relative">
          {navItems.map((item, i) => (
            <Link
              key={item.label}
              href={item.path}
              className="relative px-3 py-1.5 text-xs font-semibold uppercase tracking-widest z-10 transition-colors duration-200"
              style={{
                color: activeIndex === i ? "#fff" : "rgba(232,232,240,0.5)",
              }}
            >
              {activeIndex === i && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #0A84FF, #5856D6)",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/servicos"
          className="ml-3 px-4 py-1.5 text-xs font-semibold rounded-full text-white bg-gradient-to-r from-portfolio-accent to-portfolio-secondary shadow-[0_0_16px_rgba(10,132,255,0.3)] hover:shadow-[0_0_24px_rgba(10,132,255,0.5)] hover:scale-105 transition-all duration-200"
        >
          Contratar
        </Link>

        {/* Live dot */}
        <div className="ml-2 flex items-center">
          <div className="relative w-2 h-2">
            <div className="absolute inset-0 rounded-full bg-portfolio-green" />
            <div className="absolute inset-0 rounded-full bg-portfolio-green animate-ping opacity-75" />
          </div>
        </div>
      </motion.nav>

      {/* Mobile header */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden flex items-center justify-between px-5 py-4 glass-deep border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <defs>
              <linearGradient id="logo-grad-mob" x1="0" y1="0" x2="28" y2="28">
                <stop offset="0%" stopColor="#0A84FF" />
                <stop offset="100%" stopColor="#BF5AF2" />
              </linearGradient>
            </defs>
            <path
              d="M14 2L26 8v12l-12 6L2 20V8l12-6z"
              stroke="url(#logo-grad-mob)"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="14" cy="14" r="4" fill="url(#logo-grad-mob)" />
          </svg>
          <span className="text-gradient-primary font-syne font-bold text-sm tracking-tight">
            Rafael Pereira
          </span>
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-portfolio-light/70 hover:text-portfolio-light transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-14 left-4 right-4 z-40 md:hidden glass-deep rounded-xl p-4 flex flex-col gap-1 border border-white/10"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                pathname === item.path
                  ? "text-white bg-portfolio-accent/20 text-portfolio-accent"
                  : "text-portfolio-light/70 hover:text-portfolio-light hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/servicos"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-center text-white bg-gradient-to-r from-portfolio-accent to-portfolio-secondary"
          >
            Contratar
          </Link>
        </motion.div>
      )}
    </>
  );
}
