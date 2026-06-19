"use client";

import React from "react";
import { X, FileDown, Terminal, ShieldCheck, Mail, Phone } from "lucide-react";
import { PortfolioData } from "@/lib/db";

interface ResumeConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export default function ResumeConsole({ isOpen, onClose, data }: ResumeConsoleProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-background/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-mono text-xs">
      <div className="relative w-full max-w-4xl h-[85vh] bg-[#050814] border border-border-color rounded-lg shadow-[0_0_50px_rgba(0,102,255,0.15)] flex flex-col overflow-hidden corner-decor">
        
        {/* Title Bar */}
        <div className="bg-background/80 px-6 py-3 border-b border-border-color flex justify-between items-center select-none flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-accent animate-pulse" />
            <span className="font-heading text-xs font-black uppercase tracking-wider text-white">
              CREDENTIAL_INSPECTOR_LOG
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/Gbenga_Owadokun_Resume.docx"
              download="Gbenga_Owadokun_Resume.docx"
              className="flex items-center gap-1.5 px-3 py-1 bg-accent/20 hover:bg-accent/40 border border-accent/40 text-accent rounded-sm text-[10px] font-bold uppercase transition-all"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Save File</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-text-muted hover:text-secondary hover:bg-secondary/15 border border-transparent hover:border-secondary/20 rounded-sm transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-6 sm:p-10 space-y-8 scrollbar-thin text-left">
          
          {/* Header Card */}
          <div className="border-l-4 border-accent pl-6 space-y-2">
            <h1 className="font-heading text-3xl font-black text-white uppercase tracking-tight">
              {data.hero.name}
            </h1>
            <p className="text-accent text-sm font-bold uppercase tracking-wider">
              {data.hero.title}
            </p>
            <div className="flex flex-wrap gap-4 text-[10px] text-text-muted pt-2">
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-accent" /> {data.contact.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-accent" /> {data.contact.phone}</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-accent" /> {data.contact.location}</span>
            </div>
          </div>

          {/* Section: Profile */}
          <div className="space-y-3">
            <h2 className="font-heading text-base font-black text-white uppercase tracking-wider border-b border-border-color pb-1.5 flex items-center gap-2">
              <span className="text-accent">//</span> 01_EXECUTIVE_SUMMARY
            </h2>
            <p className="font-sans text-xs text-text-muted leading-relaxed">
              {data.about.bioParagraphs.join(" ")}
            </p>
          </div>

          {/* Section: Professional Experience */}
          <div className="space-y-4">
            <h2 className="font-heading text-base font-black text-white uppercase tracking-wider border-b border-border-color pb-1.5 flex items-center gap-2">
              <span className="text-accent">//</span> 02_PROFESSIONAL_HISTORY
            </h2>
            
            <div className="space-y-4">
              {data.experiences.map((exp, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-start font-bold">
                    <span className="text-white text-xs uppercase">{exp.role}</span>
                    <span className="text-accent text-[10px]">{exp.period}</span>
                  </div>
                  <p className="text-text-muted/80 text-[10px] font-semibold uppercase">{exp.company}</p>
                  <ul className="list-disc pl-4 space-y-1 pt-1 font-sans text-[11px] text-text-muted">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Certifications */}
          <div className="space-y-3">
            <h2 className="font-heading text-base font-black text-white uppercase tracking-wider border-b border-border-color pb-1.5 flex items-center gap-2">
              <span className="text-accent">//</span> 03_CREDENTIALS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
              {data.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-surface p-2.5 border border-border-color rounded-sm">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span className="font-bold text-white uppercase">{cert.name} ({cert.issuer})</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer info status */}
        <div className="bg-background/80 border-t border-border-color px-6 py-3 flex justify-between items-center text-[9px] text-text-muted flex-shrink-0">
          <span>CONSOLE_ACCESS_PROTOCOL: STRICT</span>
          <span className="text-accent font-bold">SYSTEM_LOG_INTEGRITY: SECURE</span>
        </div>

      </div>
    </div>
  );
}
