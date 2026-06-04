"use client";

import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  href?: string;
  download?: boolean | string;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  href,
  download,
}: ButtonProps) {
  const baseClasses =
    "relative inline-flex items-center justify-center px-6 py-3 font-mono text-sm font-semibold tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-secondary text-background hover:bg-opacity-90 shadow-[0_0_15px_rgba(255,107,53,0.2)] border border-transparent",
    ghost:
      "bg-transparent text-accent border border-accent/30 hover:border-accent hover:bg-accent/5",
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Decorative corner lines for cyberpunk look */}
      {variant === "primary" && (
        <>
          <span className="absolute top-0 left-0 w-1 h-1 bg-white" />
          <span className="absolute bottom-0 right-0 w-1 h-1 bg-white" />
        </>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        className={`${baseClasses} ${variants[variant]} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
