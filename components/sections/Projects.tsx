"use client";

import React from "react";
import SectionHeading from "../ui/SectionHeading";
import NetworkTopology from "../ui/NetworkTopology";
import SaseVisualizer from "../ui/SaseVisualizer";
import { PROJECTS } from "@/lib/data";
import { motion } from "framer-motion";
import { Monitor, ShieldAlert, Cpu, UserCheck, ArrowRight, ShieldCheck } from "lucide-react";

interface ProjectsProps {
  list?: typeof PROJECTS;
}

export default function Projects({ list = PROJECTS }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      {/* Divider & Cyber Grid */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-border-color/50" />
      <div className="absolute inset-0 bg-grid-cyber opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          sectionNumber="SEC_05"
          title="In the Field"
          subtitle="Featured security initiatives and network architectural blueprints deployed for enterprise defense."
        />

        {/* Interactive Network Topology Simulator */}
        <div className="mb-16">
          <NetworkTopology />
        </div>

        {/* Interactive SASE Visualizer */}
        <div className="mb-16">
          <SaseVisualizer />
        </div>

        <div className="space-y-16">
          {list.map((project, projectIdx) => (
            <motion.div
              key={projectIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="panel-glass rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-border-color shadow-[0_0_30px_rgba(0,102,255,0.08)]"
            >
              {/* Content Info Column */}
              <div className="p-8 sm:p-12 lg:col-span-7 flex flex-col justify-between h-full text-left">
                <div>
                  {/* Monospace project category */}
                  <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-accent uppercase tracking-widest mb-4 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    <span>// ACTIVE_PRODUCTION_DEPLOYMENT</span>
                  </div>
              
              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-text-primary uppercase tracking-tight mb-4">
                {project.title}
              </h3>
              
              <p className="font-sans text-sm sm:text-base text-secondary leading-relaxed mb-6 font-bold uppercase tracking-wider">
                {project.subtitle}
              </p>

              <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed mb-8">
                {project.desc}
              </p>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[10px] sm:text-xs font-bold bg-background border border-border-color/80 px-3 py-1 rounded-sm text-text-primary uppercase tracking-wider hover:border-accent hover:text-accent transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Learn More link */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 text-xs font-mono font-black uppercase tracking-wider text-secondary hover:text-secondary/85 group/link w-fit bg-background/50 border border-border-color/80 px-4 py-2.5 rounded-sm hover:border-secondary/40 transition-all duration-200"
            >
              <span>Consult On Similar Infrastructure</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
            </a>
          </div>

          {/* SVG Diagram Visual Column */}
          <div className="lg:col-span-5 bg-background/40 border-t lg:border-t-0 lg:border-l border-border-color p-8 flex items-center justify-center min-h-[340px] relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-cyber opacity-15" />
            
            {/* Interactive/Animated Security Flow SVG Diagram */}
            <svg
              className="w-full max-w-[340px] h-auto relative z-10"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Nodes and Links Connections */}
              <path
                d="M70 200 H330 M200 80 V320 M70 200 L200 80 L330 200 L200 320 Z"
                stroke="rgba(0, 102, 255, 0.15)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Endpoint block */}
              <g transform="translate(30, 160)">
                <rect width="80" height="80" rx="4" fill="#0C122C" stroke="#1E294B" strokeWidth="2" />
                <rect width="80" height="4" fill="#0066FF" rx="2" />
                <foreignObject x="0" y="15" width="80" height="50">
                  <div className="flex flex-col items-center justify-center text-center text-text-primary">
                    <Monitor className="w-5 h-5 text-accent mb-1.5 animate-pulse" />
                    <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Endpoint</span>
                  </div>
                </foreignObject>
              </g>

              {/* NGFW / Firewall block */}
              <g transform="translate(160, 40)">
                <rect width="80" height="80" rx="4" fill="#0C122C" stroke="#1E294B" strokeWidth="2" />
                <rect width="80" height="4" fill="#EF4444" rx="2" />
                <foreignObject x="0" y="15" width="80" height="50">
                  <div className="flex flex-col items-center justify-center text-center text-text-primary">
                    <ShieldAlert className="w-5 h-5 text-secondary mb-1.5" />
                    <span className="font-mono text-[9px] uppercase tracking-wider font-bold">NGFW Stack</span>
                  </div>
                </foreignObject>
              </g>

              {/* Cortex XDR Engine block */}
              <g transform="translate(160, 280)">
                <rect width="80" height="80" rx="4" fill="#0C122C" stroke="#1E294B" strokeWidth="2" />
                <rect width="80" height="4" fill="#0066FF" rx="2" />
                <foreignObject x="0" y="15" width="80" height="50">
                  <div className="flex flex-col items-center justify-center text-center text-text-primary">
                    <Cpu className="w-5 h-5 text-accent mb-1.5" />
                    <span className="font-mono text-[9px] uppercase tracking-wider font-bold">XDR Engine</span>
                  </div>
                </foreignObject>
              </g>

              {/* Analyst Response block */}
              <g transform="translate(290, 160)">
                <rect width="80" height="80" rx="4" fill="#0C122C" stroke="#1E294B" strokeWidth="2" />
                <rect width="80" height="4" fill="#EF4444" rx="2" />
                <foreignObject x="0" y="15" width="80" height="50">
                  <div className="flex flex-col items-center justify-center text-center text-text-primary">
                    <UserCheck className="w-5 h-5 text-secondary mb-1.5 animate-pulse" />
                    <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Analyst</span>
                  </div>
                </foreignObject>
              </g>

              {/* Signal Pulsing Particles */}
              <circle r="4" fill="#EF4444">
                <animateMotion
                  path="M70 200 L200 80 L330 200"
                  begin="0s"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="4" fill="#0066FF">
                <animateMotion
                  path="M70 200 L200 320 L330 200"
                  begin="1.5s"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
  );
}
