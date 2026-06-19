"use client";

import React from "react";
import SectionHeading from "../ui/SectionHeading";
import { EDUCATION_ITEMS } from "@/lib/data";
import { GraduationCap, Calendar, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface EducationProps {
  list?: typeof EDUCATION_ITEMS;
}

export default function Education({ list = EDUCATION_ITEMS }: EducationProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="education" className="py-24 bg-background relative overflow-hidden">
      {/* Divider & Cyber Grid */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-border-color/50" />
      <div className="absolute inset-0 bg-grid-cyber opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          sectionNumber="SEC_06"
          title="Education"
          subtitle="Academic milestones, specializations, and professional development archives."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {list.map((edu, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="p-6 panel-glass border border-border-color rounded-lg relative flex flex-col justify-between h-full hover:border-accent/40 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(0,102,255,0.08)] text-left"
            >
              {/* Corner tech flag */}
              <span className="absolute top-3 right-4 font-mono text-[8px] text-text-muted font-bold">
                // INST_RECORD_0{idx + 1}
              </span>

              <div>
                {/* Header info */}
                <div className="flex justify-between items-start gap-2 mb-5">
                  <div className="p-2.5 bg-background border border-border-color text-accent rounded-sm group-hover:border-accent group-hover:text-accent transition-colors duration-300">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[10px] text-text-muted bg-background border border-border-color/80 px-2.5 py-1 rounded-sm font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    <span>{edu.year}</span>
                  </div>
                </div>

                <h3 className="font-heading text-base sm:text-lg font-black text-text-primary mb-1.5 leading-snug group-hover:text-accent transition-colors duration-200">
                  {edu.degree}
                </h3>
                <p className="font-mono text-xs uppercase tracking-wider text-secondary font-bold mb-6">
                  {edu.institution}
                </p>
              </div>

              {/* Coursework Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border-color/60">
                {edu.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="font-mono text-[9px] font-bold bg-background border border-border-color px-2.5 py-0.5 rounded-sm text-text-muted uppercase tracking-wider hover:border-accent/40 hover:text-accent transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
