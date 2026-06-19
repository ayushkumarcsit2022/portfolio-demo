"use client";

import React, { useState } from "react";
import { Server, ShieldAlert, Cpu, Network, Wifi, ShieldCheck, ArrowRight, ServerCrash } from "lucide-react";

export default function SaseVisualizer() {
  const [activeMode, setActiveMode] = useState<"legacy" | "sase">("sase");

  return (
    <div className="panel-glass rounded-lg border border-border-color p-6 max-w-3xl mx-auto my-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-border-color pb-4">
        <div>
          <h3 className="font-heading text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Network className="w-5 h-5 text-accent" />
            SASE/SD-WAN Architectural Visualizer
          </h3>
          <p className="text-text-muted text-xs font-semibold">
            Compare legacy WAN backhaul against Prisma SASE Zero Trust designs.
          </p>
        </div>
        
        {/* Toggle Mode Tabs */}
        <div className="flex bg-background border border-border-color p-1 rounded-sm">
          <button
            onClick={() => setActiveMode("legacy")}
            className={`px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-wider rounded-sm transition-all cursor-pointer ${
              activeMode === "legacy" ? "bg-secondary text-white" : "text-text-muted hover:text-white"
            }`}
          >
            Legacy WAN
          </button>
          <button
            onClick={() => setActiveMode("sase")}
            className={`px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-wider rounded-sm transition-all cursor-pointer ${
              activeMode === "sase" ? "bg-accent text-white" : "text-text-muted hover:text-white"
            }`}
          >
            Prisma SASE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* SVG Drawing Column */}
        <div className="lg:col-span-7 bg-background/60 border border-border-color rounded-sm p-4 relative min-h-[240px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-grid-cyber opacity-35 pointer-events-none" />
          
          <svg className="w-full max-w-[280px] h-auto relative z-10" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {activeMode === "legacy" ? (
              <>
                {/* Legacy Path: Branch to Datacenter */}
                <path d="M 50 150 L 250 150" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="6,6" className="animate-pulse" />
                
                {/* Branch Node */}
                <g transform="translate(10, 110)">
                  <rect width="60" height="80" rx="4" fill="#0C122C" stroke="#1E294B" strokeWidth="2" />
                  <foreignObject x="0" y="10" width="60" height="60">
                    <div className="flex flex-col items-center justify-center text-center text-white">
                      <Wifi className="w-5 h-5 text-secondary mb-1" />
                      <span className="font-mono text-[8px] uppercase font-bold">Branch</span>
                    </div>
                  </foreignObject>
                </g>

                {/* HQ Data Center Node */}
                <g transform="translate(230, 110)">
                  <rect width="60" height="80" rx="4" fill="#0C122C" stroke="#1E294B" strokeWidth="2" />
                  <foreignObject x="0" y="10" width="60" height="60">
                    <div className="flex flex-col items-center justify-center text-center text-white">
                      <ServerCrash className="w-5 h-5 text-secondary mb-1" />
                      <span className="font-mono text-[8px] uppercase font-bold">Data Center</span>
                    </div>
                  </foreignObject>
                </g>

                {/* Threat particle flow */}
                <circle r="4" fill="#EF4444">
                  <animateMotion path="M 50 150 L 250 150" dur="2s" repeatCount="indefinite" />
                </circle>
              </>
            ) : (
              <>
                {/* SASE Paths */}
                <path d="M 50 200 L 150 100" stroke="#0066FF" strokeWidth="2" />
                <path d="M 250 200 L 150 100" stroke="#0066FF" strokeWidth="2" />
                <path d="M 150 100 L 150 30" stroke="#0066FF" strokeWidth="2" />

                {/* User/Branch Endpoint */}
                <g transform="translate(10, 160)">
                  <rect width="60" height="80" rx="4" fill="#0C122C" stroke="#1E294B" strokeWidth="2" />
                  <foreignObject x="0" y="10" width="60" height="60">
                    <div className="flex flex-col items-center justify-center text-center text-white">
                      <Wifi className="w-5 h-5 text-accent mb-1" />
                      <span className="font-mono text-[8px] uppercase font-bold">Branch</span>
                    </div>
                  </foreignObject>
                </g>

                {/* SASE Cloud Gateway */}
                <g transform="translate(120, 60)">
                  <rect width="60" height="80" rx="4" fill="#0C122C" stroke="#0066FF" strokeWidth="2" className="animate-pulse" />
                  <foreignObject x="0" y="10" width="60" height="60">
                    <div className="flex flex-col items-center justify-center text-center text-white">
                      <Cpu className="w-5 h-5 text-accent mb-1" />
                      <span className="font-mono text-[8px] uppercase font-bold">SASE Cloud</span>
                    </div>
                  </foreignObject>
                </g>

                {/* Secured HQ Target */}
                <g transform="translate(230, 160)">
                  <rect width="60" height="80" rx="4" fill="#0C122C" stroke="#1E294B" strokeWidth="2" />
                  <foreignObject x="0" y="10" width="60" height="60">
                    <div className="flex flex-col items-center justify-center text-center text-white">
                      <Server className="w-5 h-5 text-white mb-1" />
                      <span className="font-mono text-[8px] uppercase font-bold">Secure Core</span>
                    </div>
                  </foreignObject>
                </g>

                {/* Secured particle flows */}
                <circle r="3" fill="#FFFFFF">
                  <animateMotion path="M 50 200 L 150 100" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="#FFFFFF">
                  <animateMotion path="M 150 100 L 250 200" dur="2.5s" repeatCount="indefinite" />
                </circle>
              </>
            )}
          </svg>
        </div>

        {/* Metrics Column */}
        <div className="lg:col-span-5 bg-background/80 border border-border-color rounded-sm p-4 flex flex-col justify-between text-left space-y-4">
          <div>
            <span className="font-mono text-[9px] uppercase text-text-muted tracking-widest">// ARCHITECTURE_SPECS</span>
            <div className="mt-3 space-y-3">
              <div className="p-3 bg-surface border border-border-color rounded-sm">
                <span className="font-mono text-[9px] text-accent uppercase font-bold tracking-wider">Transport Routing</span>
                <p className="font-sans text-xs text-white mt-1 font-semibold">
                  {activeMode === "legacy" ? "Rigid MPLS Backhaul (HQ bottleneck)" : "Prisma SD-WAN App-Defined Routing"}
                </p>
              </div>

              <div className="p-3 bg-surface border border-border-color rounded-sm">
                <span className="font-mono text-[9px] text-accent uppercase font-bold tracking-wider">Identity Checking</span>
                <p className="font-sans text-xs text-white mt-1 font-semibold">
                  {activeMode === "legacy" ? "Static Perimeter rules (No MFA check)" : "Continuous Zero Trust verification"}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border-color/60 grid grid-cols-2 gap-2 text-center">
            <div className="p-2 bg-background border border-border-color rounded-sm">
              <span className="font-mono text-[8px] text-text-muted uppercase font-bold block">Latency SLA</span>
              <span className={`font-mono text-xs font-black block mt-1 ${activeMode === "legacy" ? "text-secondary" : "text-white"}`}>
                {activeMode === "legacy" ? "HIGH (Backhauled)" : "OPTIMIZED"}
              </span>
            </div>
            <div className="p-2 bg-background border border-border-color rounded-sm">
              <span className="font-mono text-[8px] text-text-muted uppercase font-bold block">Security Audit</span>
              <span className={`font-mono text-xs font-black block mt-1 ${activeMode === "legacy" ? "text-secondary" : "text-white"}`}>
                {activeMode === "legacy" ? "EXPOSED" : "VERIFIED_OK"}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
