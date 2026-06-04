"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import { MapPin, Server, Activity, Shield, Layers } from "lucide-react";

export default function About() {
  const stats = [
    { value: "10+", label: "Years of Experience", sub: "Enterprise & Critical Infrastructure", icon: Server },
    { value: "3", label: "Certification Families", sub: "Palo Alto, Cisco, Microsoft Solutions", icon: Shield },
    { value: "2", label: "Industries Served", sub: "High-volume Toll systems & MSP services", icon: Layers },
    { value: "1", label: "Core Mission", sub: "Zero Trust verification across all layers", icon: Activity }
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background grid line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-border-color/50" />
      <div className="absolute inset-0 bg-grid-cyber opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          sectionNumber="SEC_01"
          title="The Engineer Behind the Firewall"
          subtitle="Architecting secure perimeters, mitigating vulnerability points, and ensuring network resiliency."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Bio text (Left column) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <p className="font-sans text-lg md:text-xl text-text-primary leading-relaxed font-bold">
              I am a Senior Network and Cybersecurity Engineer dedicated to securing critical infrastructures, safeguarding enterprise assets, and building network resiliency.
            </p>
            
            <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed">
              With over a decade of hands-on experience, I specialize in designing and deploying Palo Alto Next-Generation Firewalls, cloud security architectures, and advanced endpoint security. My engineering philosophy centers on implementing rigorous Zero Trust models, ensuring continuous identity validation, and automating perimeter defenses to meet evolving threat landscapes.
            </p>

            <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed">
              Whether orchestrating global VPN deployments, deploying AI-driven Cortex XDR architectures, or training the next generation of security engineers, I construct network perimeters that are scalable, transparent, and absolutely secure.
            </p>

            {/* Location & Active Node status */}
            <div className="pt-4 flex flex-wrap gap-4 items-center font-mono text-xs">
              <div className="flex items-center gap-2 text-accent bg-surface border border-border-color px-4 py-2 rounded-sm">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>Dallas, TX Node</span>
              </div>
              <div className="flex items-center gap-2 text-success bg-surface border border-border-color px-4 py-2 rounded-sm">
                <span className="w-2 h-2 rounded-full bg-success animate-ping" />
                <span>STATUS: OPERATIONAL_OK</span>
              </div>
            </div>
          </motion.div>

          {/* Stats board (Right column) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 panel-glass border border-border-color rounded-lg relative flex flex-col justify-between hover:border-accent/40 hover:shadow-[0_0_20px_rgba(0,245,255,0.05)] transition-all duration-300 group cursor-default"
                >
                  {/* Micro tech label */}
                  <span className="absolute top-3 right-4 font-mono text-[8px] text-text-muted font-bold">
                    // SYS_STAT_0{idx + 1}
                  </span>
                  
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="p-2.5 bg-background border border-border-color text-accent rounded-sm group-hover:border-accent group-hover:text-accent transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading text-3xl sm:text-4xl font-black text-cyber-gradient tracking-tight leading-none">
                        {stat.value}
                      </h4>
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-text-primary font-bold">
                      {stat.label}
                    </p>
                    {stat.sub && (
                      <p className="mt-2 font-sans text-xs text-text-muted border-t border-border-color/60 pt-2 font-medium">
                        {stat.sub}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
