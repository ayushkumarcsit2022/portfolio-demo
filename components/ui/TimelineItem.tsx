"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, ChevronUp, Terminal, Shield } from "lucide-react";

interface TimelineItemProps {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  isLast?: boolean;
}

export default function TimelineItem({
  company,
  role,
  period,
  bullets,
  isLast = false,
}: TimelineItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  // We show the first 2 bullets initially, and allow expanding to see all bullets
  const initialBullets = bullets.slice(0, 2);
  const remainingBullets = bullets.slice(2);
  const hasMore = bullets.length > 2;

  return (
    <div className="relative pl-8 sm:pl-12 pb-10 group text-left">
      {/* Vertical Connecting Line */}
      {!isLast && (
        <div className="absolute left-[7px] sm:left-[11px] top-5 bottom-0 w-[2px] bg-border-color group-hover:bg-accent/40 transition-colors duration-300" />
      )}

      {/* Pulsing Timeline Dot */}
      <div className="absolute left-0 sm:left-1 top-2 w-4 h-4 rounded-full border-2 border-accent bg-background z-10 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping absolute" />
        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
      </div>

      <div className="panel-glass border border-border-color rounded-lg p-6 hover:border-accent/45 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,102,255,0.08)] relative overflow-hidden group">
        {/* Glowing Top Edge */}
        <div className="absolute top-0 left-0 w-16 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />

        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-5">
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-black text-text-primary tracking-wide uppercase group-hover:text-accent transition-colors duration-200">
              {role}
            </h3>
            <p className="font-mono text-xs sm:text-sm text-secondary font-bold tracking-wider mt-1.5 uppercase flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>{company}</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted bg-background border border-border-color/80 px-3 py-1 rounded-sm w-fit self-start md:self-auto font-semibold">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <span>{period}</span>
          </div>
        </div>

        {/* Bullet Points */}
        <ul className="space-y-3.5 mb-4">
          {initialBullets.map((bullet, idx) => (
            <li key={idx} className="flex gap-3 text-xs sm:text-sm text-text-muted font-sans leading-relaxed">
              <span className="text-accent mt-1.5 select-none text-[8px] font-mono">&gt;</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Expandable Bullet Points */}
        {hasMore && (
          <>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-3.5 mb-4 overflow-hidden"
                >
                  {remainingBullets.map((bullet, idx) => (
                    <li key={idx} className="flex gap-3 text-xs sm:text-sm text-text-muted font-sans leading-relaxed">
                      <span className="text-accent mt-1.5 select-none text-[8px] font-mono">&gt;</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center gap-1.5 text-[10px] font-mono font-black uppercase tracking-wider text-secondary hover:text-secondary/80 transition-colors duration-150 focus:outline-none bg-background border border-border-color px-3 py-1.5 rounded-sm hover:border-secondary/40 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{isOpen ? "Close Logs" : "Expand Logs"}</span>
              {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
