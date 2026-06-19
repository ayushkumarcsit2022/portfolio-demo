"use client";

import React from "react";
import { Shield, Cloud, Fingerprint, Activity, Cpu } from "lucide-react";

interface SkillItem {
  name: string;
  desc: string;
}

interface SkillCardProps {
  category: string;
  iconName: string;
  items: SkillItem[];
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Shield: Shield,
  Cloud: Cloud,
  Fingerprint: Fingerprint,
  Activity: Activity,
  Cpu: Cpu,
};

export default function SkillCard({ category, iconName, items }: SkillCardProps) {
  const IconComponent = iconMap[iconName] || Shield;

  return (
    <div className="relative group p-6 panel-glass border border-border-color rounded-lg glow-cyan-hover flex flex-col h-full hover:shadow-[0_0_25px_rgba(0,102,255,0.08)]">
      {/* Interactive top glow line */}
      <div className="absolute top-0 left-0 w-12 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
      
      {/* Corner indicators */}
      <div className="absolute top-2 right-2 flex items-center gap-1 font-mono text-[8px] text-text-muted">
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
        <span>SYS_OK</span>
      </div>

      <div className="flex items-center gap-4.5 mb-6">
        <div className="p-3 bg-background border border-border-color text-accent rounded-sm group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
          <IconComponent className="w-5 h-5" />
        </div>
        <h3 className="font-heading text-base sm:text-lg font-black text-text-primary tracking-wide group-hover:text-accent transition-colors duration-300 uppercase">
          {category}
        </h3>
      </div>

      <ul className="space-y-4 flex-grow text-left">
        {items.map((item, idx) => (
          <li key={idx} className="flex flex-col gap-1 border-l-2 border-border-color hover:border-accent pl-3 transition-colors duration-200">
            <span className="font-mono text-sm font-bold text-text-primary group-hover:text-accent/90 transition-colors duration-300">
              {item.name}
            </span>
            <span className="text-xs text-text-muted font-sans leading-relaxed">
              {item.desc}
            </span>
          </li>
        ))}
      </ul>
      
      {/* Monospace terminal-style status line */}
      <div className="mt-6 pt-4 border-t border-border-color/50 flex justify-between items-center font-mono text-[9px] text-text-muted">
        <span>GATEWAY_STATUS: ACTIVE</span>
        <span className="text-accent font-bold">L7_SHIELD_UP</span>
      </div>
    </div>
  );
}
