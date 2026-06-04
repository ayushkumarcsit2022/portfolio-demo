"use client";

import React from "react";
import { SKILL_CATEGORIES } from "@/lib/data";
import SkillCard from "../ui/SkillCard";
import SectionHeading from "../ui/SectionHeading";
import { motion } from "framer-motion";

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
  };

  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      {/* Divider & Cyber Grid */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-border-color/50" />
      <div className="absolute inset-0 bg-grid-cyber opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          sectionNumber="SEC_02"
          title="Weapons of Choice"
          subtitle="A comprehensive overview of security tools, routing protocols, and SASE platforms deployed to secure networks."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div key={idx} variants={itemVariants} className="h-full">
              <SkillCard
                category={cat.category}
                iconName={cat.icon}
                items={cat.items}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
