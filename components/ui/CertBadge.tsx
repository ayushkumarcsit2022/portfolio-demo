"use client";

import React from "react";
import { ShieldAlert, Award, FileCheck } from "lucide-react";

interface CertBadgeProps {
  name: string;
  issuer: string;
}

export default function CertBadge({ name, issuer }: CertBadgeProps) {
  // Generate a mock verification hash based on the name length to simulate certificate verification
  const mockHash = `CERT-${name.replace(/\s+/g, "").substring(0, 4).toUpperCase()}-${(name.length * 137).toString(16).toUpperCase()}`;

  return (
    <div className="shimmer-hover relative p-5 panel-glass border-l-4 border-l-accent hover:border-accent/40 rounded-r-md transition-all duration-300 flex flex-col justify-between gap-4 h-full hover:shadow-[0_0_20px_rgba(0,245,255,0.06)] group">
      
      {/* Top Section */}
      <div className="flex items-start gap-4">
        <div className="p-2.5 bg-background border border-border-color text-accent rounded-sm mt-0.5 group-hover:border-accent/60 group-hover:text-accent transition-colors duration-300">
          <Award className="w-4 h-4" />
        </div>
        <div className="text-left">
          <h4 className="font-heading text-sm sm:text-base font-extrabold text-text-primary tracking-wide leading-snug group-hover:text-accent transition-colors duration-200">
            {name}
          </h4>
          <p className="mt-1 font-sans text-xs text-text-muted font-semibold leading-relaxed">
            {issuer}
          </p>
        </div>
      </div>

      {/* Bottom administrative details */}
      <div className="flex items-center justify-between pt-3 border-t border-border-color/60 font-mono text-[9px] text-text-muted">
        <div className="flex items-center gap-1">
          <FileCheck className="w-3 h-3 text-success" />
          <span>VERIFIED_SECURE</span>
        </div>
        <span className="font-bold text-accent/80 select-all">{mockHash}</span>
      </div>
      
    </div>
  );
}
