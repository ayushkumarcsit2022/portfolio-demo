"use client";

import React from "react";
import { CERTIFICATIONS } from "@/lib/data";
import CertBadge from "../ui/CertBadge";
import SectionHeading from "../ui/SectionHeading";
import { motion } from "framer-motion";

export default function Certifications() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="certifications" className="py-24 bg-background relative overflow-hidden">
      {/* Divider & Cyber Grid */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-border-color/50" />
      <div className="absolute inset-0 bg-grid-cyber opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          sectionNumber="SEC_03"
          title="Credentials"
          subtitle="Validated masteries in enterprise cybersecurity networks, NGFW firewalls, and cloud network security architectures."
        />

        {/* Grid layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="h-full"
            >
              <CertBadge name={cert.name} issuer={cert.issuer} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
