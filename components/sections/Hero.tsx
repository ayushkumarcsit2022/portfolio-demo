"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import NetworkBackground from "../ui/NetworkBackground";
import CyberTerminal from "../ui/CyberTerminal";
import { Shield, ShieldCheck, Terminal, Award, Network, Cpu, Activity, Server, Lock } from "lucide-react";

interface HeroProps {
  data?: {
    name: string;
    title: string;
    description: string;
    badges: { name: string; icon: string }[];
  };
}

const iconMap: Record<string, any> = {
  ShieldCheck, Network, Shield, Lock, Cpu, Server, Activity
};

export default function Hero({ data }: HeroProps) {
  const nameToUse = data?.name || "Gbenga Owadokun";
  const titleToUse = data?.title || "Senior Network & Cybersecurity Engineer";
  const descToUse = data?.description || "Protecting networks. Securing infrastructure. Designing robust Zero Trust architectures and deploying next-generation firewalls for global enterprises.";
  
  const [typedText, setTypedText] = useState("");
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(nameToUse.slice(0, index + 1));
      index++;
      if (index >= nameToUse.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [nameToUse]);

  const badgeItems = data?.badges || [
    { name: "AWS SASE", icon: "ShieldCheck" },
    { name: "CCNA Route/Switch", icon: "Network" },
    { name: "PCNSE Security", icon: "Shield" },
    { name: "Palo Alto NGFW", icon: "Lock" },
    { name: "Zero Trust Architecture", icon: "Cpu" }
  ];

  // Simulated metrics for the right panel dashboard
  const [threatCount, setThreatCount] = useState(0);
  const [cpuUsage, setCpuUsage] = useState(32);
  const [logs, setLogs] = useState<string[]>([
    "SYS_SEC: Initializing firewall rule analysis...",
    "SASE_GATEWAY: VPN endpoints connected successfully",
    "ZERO_TRUST: MFA policy token validated"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random fluctuations
      setThreatCount(prev => prev + Math.floor(Math.random() * 2));
      setCpuUsage(Math.floor(Math.random() * 15) + 25);
      
      const potentialLogs = [
        "SYS_SEC: Integrity verification status: PASS",
        "PANORAMA: Deploying security policy stack to node_dallas",
        "CORTEX: Threat hunter AI scanning endpoint logs",
        "FIREWALL: Blocking traffic from suspect IP: 198.51.100.72",
        "ZERO_TRUST: Continuous authentication verification checks ok",
        "IPSEC: Tunnel to Azure West active"
      ];
      const randomLog = potentialLogs[Math.floor(Math.random() * potentialLogs.length)];
      setLogs(prev => [randomLog, prev[0], prev[1]].slice(0, 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden pt-24 pb-16">
      {/* Interactive Cyber Graph Grid */}
      <NetworkBackground />
      <div className="absolute inset-0 bg-dot-matrix opacity-30 pointer-events-none" />

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and info */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Tag Line */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-text-muted bg-surface/50 border border-border-color/80 px-3 py-1 rounded-sm"
            >
              <Terminal className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span>// DEPLOYMENT_SECURE_INITIALIZING</span>
            </motion.div>

            {/* Animated Welcome Header */}
            <div className="space-y-3">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-heading text-lg sm:text-xl font-bold text-secondary uppercase tracking-widest"
              >
                SYSTEM ACCESS GRANTED
              </motion.p>
              
              <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-text-primary uppercase tracking-tight leading-[0.95] select-none">
                I'm <br />
                <span className="text-cyber-gradient blink-cursor">{typedText}</span>
              </h1>
            </div>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="font-heading text-lg sm:text-2xl md:text-3xl font-bold text-accent uppercase tracking-wide"
            >
              {titleToUse}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="font-sans text-sm sm:text-base md:text-lg text-text-muted font-medium max-w-xl leading-relaxed border-l-2 border-accent/40 pl-4"
            >
              {descToUse}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap gap-4 items-center pt-2"
            >
              <Button variant="primary" href="#projects">
                Launch Security Portfolio
              </Button>
              <Button variant="ghost" href="#contact">
                Establish Connection
              </Button>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="flex flex-wrap items-center gap-2 pt-6 border-t border-border-color"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted mr-2 flex items-center gap-1 font-bold">
                <Award className="w-3.5 h-3.5 text-secondary" /> Core Operations:
              </span>
              {badgeItems.map((badge, idx) => {
                const Icon = iconMap[badge.icon] || Shield;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 font-mono text-[9px] sm:text-xs font-bold bg-surface/80 border border-border-color px-3 py-1 rounded-sm text-text-primary uppercase tracking-wide hover:border-accent hover:text-accent transition-all duration-200"
                  >
                    <Icon className="w-3.5 h-3.5 text-accent" />
                    <span>{badge.name}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Interactive Secure Dashboard HUD Simulation */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="panel-glass rounded-lg p-6 w-full max-w-md mx-auto scanline shadow-[0_0_30px_rgba(0,245,255,0.05)] border border-border-color corner-decor"
            >
              {/* Terminal Title Bar */}
              <div className="flex justify-between items-center pb-4 mb-4 border-b border-border-color/60">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                  <span className="font-mono text-xs font-black text-text-primary uppercase tracking-wider">
                    SECURITY_OPERATIONS_HUD
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-border-color" />
                  <span className="w-1.5 h-1.5 rounded-full bg-border-color" />
                  <span className="w-1.5 h-1.5 rounded-full bg-border-color" />
                </div>
              </div>

              {/* Status Indicator Rows */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 bg-background/60 border border-border-color rounded-sm flex flex-col justify-between">
                  <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest">// SYSTEM_STATUS</span>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="w-2 h-2 rounded-full bg-success animate-ping" />
                    <span className="font-mono text-sm font-black text-success uppercase">SECURED</span>
                  </div>
                </div>

                <div className="p-3.5 bg-background/60 border border-border-color rounded-sm flex flex-col justify-between">
                  <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest">// DECRYPTION_L7</span>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="font-mono text-sm font-black text-accent uppercase">100% ACTIVE</span>
                  </div>
                </div>

                <div className="p-3.5 bg-background/60 border border-border-color rounded-sm flex flex-col justify-between">
                  <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest">// ACTIVE_TUNNELS</span>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Server className="w-4 h-4 text-secondary animate-pulse" />
                    <span className="font-mono text-sm font-black text-text-primary">1,480 / EST</span>
                  </div>
                </div>

                <div className="p-3.5 bg-background/60 border border-border-color rounded-sm flex flex-col justify-between">
                  <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest">// SEC_CPU_CORE</span>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Activity className="w-4 h-4 text-accent" />
                    <span className="font-mono text-sm font-black text-text-primary">{cpuUsage}% LOAD</span>
                  </div>
                </div>
              </div>

              {/* Threat Scan Bar Chart Simulation */}
              <div className="mb-6 p-4 bg-background/80 border border-border-color/80 rounded-sm">
                <div className="flex justify-between items-center mb-2 font-mono text-[10px] uppercase font-bold text-text-primary">
                  <span>Firewall Mitigation Flow</span>
                  <span className="text-secondary">{threatCount} BLOCKED / SEC</span>
                </div>
                <div className="w-full h-2 bg-border-color rounded-full overflow-hidden flex">
                  <motion.div
                    className="h-full bg-accent"
                    animate={{ width: `${(cpuUsage / 60) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    className="h-full bg-secondary"
                    animate={{ width: `${(threatCount / 20) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Interactive Cyber Terminal CLI */}
              <div className="mt-4">
                <CyberTerminal />
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Ambient Radial Accent Glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-secondary/5 filter blur-[100px] pointer-events-none" />
    </section>
  );
}
