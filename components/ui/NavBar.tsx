"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, FileDown, ShieldCheck } from "lucide-react";
import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar({ onViewResume }: { onViewResume?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 px-4 md:px-8"
            : "py-6 px-4 md:px-8"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 py-3 flex justify-between items-center transition-all duration-300 rounded-lg ${
            isScrolled
              ? "panel-glass shadow-[0_0_20px_rgba(0,102,255,0.08)]"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="p-1.5 bg-accent/10 border border-accent/30 text-accent rounded-sm group-hover:border-accent transition-all duration-200">
              <ShieldCheck className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-base font-extrabold text-text-primary tracking-wide leading-none group-hover:text-accent transition-colors duration-200">
                GBENGA OWADOKUN
              </span>
              <span className="font-mono text-[9px] text-secondary tracking-widest leading-none mt-1 uppercase font-bold">
                // SYSTEM SECURED
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-xs font-semibold text-text-muted hover:text-accent tracking-wider uppercase transition-all duration-200 relative group/nav"
              >
                {link.name}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover/nav:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Resume CTA */}
          <div className="hidden md:block">
            <Button variant="ghost" onClick={onViewResume}>
              <FileDown className="w-4 h-4 text-accent" />
              <span>Download CV</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-text-primary hover:text-accent focus:outline-none transition-colors duration-150"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md flex flex-col justify-center items-center md:hidden"
          >
            {/* Tech Scan Line Motif */}
            <div className="absolute inset-0 bg-grid-cyber opacity-15 pointer-events-none" />

            <nav className="flex flex-col items-center gap-8 text-center relative z-10">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-heading text-2xl font-black tracking-wider text-text-primary hover:text-accent uppercase transition-colors duration-150"
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-6"
              >
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onViewResume) onViewResume();
                  }}
                >
                  <FileDown className="w-4 h-4 text-accent" />
                  <span>Download CV</span>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
