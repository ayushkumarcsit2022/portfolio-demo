"use client";

import React, { useState, useEffect } from "react";
import { Shield, Terminal, Cpu } from "lucide-react";

interface CyberLoaderProps {
  onComplete: () => void;
}

export default function CyberLoader({ onComplete }: CyberLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    { text: "ESTABLISHING HANDSHAKE PROTOCOL...", type: "info" },
    { text: "SCANNING PERIMETER IP NODES...", type: "info" },
    { text: "DECRYPTING SSL SECURITY TUNNELS...", type: "warning" },
    { text: "ENFORCING ZERO TRUST POLICIES...", type: "info" },
    { text: "VERIFYING PALO ALTO NGFW App-ID...", type: "info" },
    { text: "LOADER READY. PORTFOLIO UNLOCKED.", type: "success" }
  ];

  useEffect(() => {
    // Increment progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500); // trigger reveal shortly after 100%
          return 100;
        }
        // Random progressive jumps
        const nextValue = prev + Math.floor(Math.random() * 8) + 4;
        return nextValue > 100 ? 100 : nextValue;
      });
    }, 120);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  useEffect(() => {
    // Cycle terminal logs based on progress percentage
    if (progress > 15 && logIndex === 0) setLogIndex(1);
    if (progress > 35 && logIndex === 1) setLogIndex(2);
    if (progress > 55 && logIndex === 2) setLogIndex(3);
    if (progress > 75 && logIndex === 3) setLogIndex(4);
    if (progress >= 95 && logIndex === 4) setLogIndex(5);
  }, [progress, logIndex]);

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center p-6 text-center select-none font-mono">
      {/* Cybersecurity Matrix Backgrounds */}
      <div className="absolute inset-0 bg-grid-cyber opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-matrix opacity-25 pointer-events-none" />
      <div className="absolute inset-0 scanline pointer-events-none" />

      {/* Main Loader Frame */}
      <div className="relative w-full max-w-lg p-8 panel-glass border border-border-color rounded-lg shadow-2xl space-y-8 corner-decor">
        
        {/* Animated Cyber Shield Indicator */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          {/* Radar rotating ring */}
          <div className="absolute inset-0 border border-accent/20 rounded-full" />
          <div className="absolute inset-0 border-t-2 border-accent rounded-full animate-spin" style={{ animationDuration: "1.5s" }} />
          <div className="absolute inset-3 border border-secondary/20 rounded-full" />
          <div className="absolute inset-3 border-b-2 border-secondary rounded-full animate-spin" style={{ animationDuration: "3s", animationDirection: "reverse" }} />
          
          <Shield className="w-8 h-8 text-accent animate-pulse" />
        </div>

        {/* Access Title */}
        <div className="space-y-2">
          <h2 className="font-heading text-lg sm:text-xl font-black text-white tracking-widest uppercase">
            INITIALIZING SECURITY CONSOLE
          </h2>
          <div className="flex justify-center items-center gap-1.5 text-xs text-text-muted">
            <Cpu className="w-3.5 h-3.5 text-accent animate-spin" style={{ animationDuration: "6s" }} />
            <span>DECRYPTING COMPONENT BLUEPRINTS...</span>
          </div>
        </div>

        {/* Progress Value Counter */}
        <div className="relative">
          <span className="text-4xl sm:text-5xl font-black text-white">
            {progress}%
          </span>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-border-color rounded-full mt-4 overflow-hidden relative">
            <div 
              className="h-full bg-accent transition-all duration-100 ease-out shadow-[0_0_10px_rgba(0,102,255,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Terminal Boot Log Output */}
        <div className="bg-background/95 border border-border-color rounded-sm p-4 text-left h-[75px] flex flex-col justify-end text-[10px] space-y-1">
          <div className="text-accent/40 text-[8px] uppercase tracking-wider font-bold mb-1 border-b border-border-color/40 pb-1 flex justify-between items-center">
            <span>&gt;_ Security Kernel logs</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          </div>
          <div className="space-y-0.5 overflow-hidden">
            {logs.slice(0, logIndex + 1).map((log, idx) => {
              let color = "text-accent";
              if (log.type === "warning") color = "text-secondary font-bold";
              if (log.type === "success") color = "text-white font-bold";

              return (
                <div key={idx} className={`${color} truncate flex items-center gap-1.5`}>
                  <Terminal className="w-3 h-3 flex-shrink-0" />
                  <span>{log.text}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Decorative footer credentials */}
      <span className="absolute bottom-6 font-mono text-[9px] uppercase tracking-widest text-text-muted/40 font-bold">
        Secure Access Protocol v4.2 // Gbenga Owadokun Portfolio
      </span>
    </div>
  );
}
