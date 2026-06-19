"use client";

import React from "react";
import { EXPERIENCES } from "@/lib/data";
import TimelineItem from "../ui/TimelineItem";
import SectionHeading from "../ui/SectionHeading";
import { motion } from "framer-motion";

interface ExperienceProps {
  list?: typeof EXPERIENCES;
}

export default function Experience({ list = EXPERIENCES }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 bg-background relative overflow-hidden">
      {/* Divider & Cyber Grid */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-border-color/50" />
      <div className="absolute inset-0 bg-grid-cyber opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          sectionNumber="SEC_04"
          title="Operational History"
          subtitle="A chronological timeline of engineering secure perimeters, deploying next-gen solutions, and defending networks."
        />

        <div className="relative mt-12">
          {/* Main vertical line for timeline */}
          <div className="absolute left-[7px] sm:left-[11px] top-4 bottom-4 w-[2px] bg-border-color" />

          {list.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <TimelineItem
                company={exp.company}
                role={exp.role}
                period={exp.period}
                bullets={exp.bullets}
                isLast={idx === list.length - 1}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
