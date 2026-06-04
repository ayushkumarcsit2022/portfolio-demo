"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  sectionNumber: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  sectionNumber,
  align = "left",
}: SectionHeadingProps) {
  const isLeft = align === "left";

  // Split title into characters for stagger animation
  const titleLetters = Array.from(title);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 150,
      },
    },
  };

  return (
    <div className={`mb-12 md:mb-16 ${isLeft ? "text-left" : "text-center mx-auto max-w-3xl"}`}>
      {/* Monospace Code Prefix tag */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4 }}
        className={`font-mono text-xs font-semibold tracking-widest text-accent mb-2 uppercase flex items-center gap-2 ${!isLeft && "justify-center"}`}
      >
        <span className="text-secondary animate-pulse">&lt;</span>
        <span>{sectionNumber}</span>
        <span className="text-secondary animate-pulse">/&gt;</span>
      </motion.div>

      {/* Staggered text heading with multi-color cyber gradient */}
      <motion.h2
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-cyber-gradient uppercase leading-tight inline-block"
      >
        {titleLetters.map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block origin-bottom"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base md:text-lg text-text-muted font-sans font-medium leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Dynamic line width with glow accent */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`mt-4 h-[2px] bg-gradient-to-r from-accent to-secondary shadow-[0_0_8px_#00E5FF] ${!isLeft && "mx-auto"}`}
      />
    </div>
  );
}
