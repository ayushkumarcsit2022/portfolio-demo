"use client";

import React, { useState } from "react";
import { Shield, Server, Laptop, Cloud, Play, RotateCcw, AlertTriangle } from "lucide-react";

interface Node {
  id: string;
  name: string;
  type: "endpoint" | "gateway" | "firewall" | "cloud";
  status: "secure" | "breached" | "warning";
  policy: string;
  x: number;
  y: number;
}

export default function NetworkTopology() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: "1", name: "User Endpoint", type: "endpoint", status: "secure", policy: "MFA Active & CrowdStrike Agent Verified", x: 10, y: 50 },
    { id: "2", name: "AWS SASE Gateway", type: "gateway", status: "secure", policy: "SD-WAN Tunnel / SSL Decryption On", x: 38, y: 25 },
    { id: "3", name: "Palo Alto NGFW", type: "firewall", status: "secure", policy: "App-ID & Threat Prevention Active", x: 62, y: 75 },
    { id: "4", name: "Corporate VPC", type: "cloud", status: "secure", policy: "Zero Trust Network Access (ZTNA) Rules", x: 90, y: 50 }
  ]);

  const [selectedNode, setSelectedNode] = useState<Node | null>(nodes[0]);
  const [simulationState, setSimulationState] = useState<"idle" | "simulating" | "blocked">("idle");

  const runSimulation = () => {
    setSimulationState("simulating");
    
    // Step 1: Intrusion starts at endpoint, makes path red
    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id === "1" ? { ...n, status: "warning" } : n));
    }, 1000);

    // Step 2: Hits firewall, showing intrusion block trigger
    setTimeout(() => {
      setSimulationState("blocked");
      setNodes(prev => prev.map(n => n.id === "3" ? { ...n, status: "warning" } : n));
    }, 2500);
  };

  const resetSimulation = () => {
    setSimulationState("idle");
    setNodes([
      { id: "1", name: "User Endpoint", type: "endpoint", status: "secure", policy: "MFA Active & CrowdStrike Agent Verified", x: 10, y: 50 },
      { id: "2", name: "AWS SASE Gateway", type: "gateway", status: "secure", policy: "SD-WAN Tunnel / SSL Decryption On", x: 38, y: 25 },
      { id: "3", name: "Palo Alto NGFW", type: "firewall", status: "secure", policy: "App-ID & Threat Prevention Active", x: 62, y: 75 },
      { id: "4", name: "Corporate VPC", type: "cloud", status: "secure", policy: "Zero Trust Network Access (ZTNA) Rules", x: 90, y: 50 }
    ]);
    setSelectedNode(nodes[0]);
  };

  return (
    <div className="panel-glass rounded-lg border border-border-color p-6 max-w-3xl mx-auto my-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-border-color pb-4">
        <div>
          <h3 className="font-heading text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            Zero Trust Architecture & Flow Simulator
          </h3>
          <p className="text-text-muted text-xs font-medium font-sans">
            Interactive visualization showing security rule enforcement points.
          </p>
        </div>
        <div className="flex gap-2">
          {simulationState === "idle" ? (
            <button
              onClick={runSimulation}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-accent hover:bg-accent/90 text-white font-mono text-[10px] uppercase font-bold tracking-wider transition-all"
            >
              <Play className="w-3.5 h-3.5" /> Simulate Threat
            </button>
          ) : (
            <button
              onClick={resetSimulation}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-secondary hover:bg-secondary/90 text-white font-mono text-[10px] uppercase font-bold tracking-wider transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Topology
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Topology Diagram Pane */}
        <div className="lg:col-span-2 relative min-h-[220px] bg-background/60 border border-border-color rounded-sm overflow-hidden p-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-grid-cyber opacity-40 pointer-events-none" />
          
          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            {/* Path 1: Endpoint to Gateway */}
            <path
              d="M 15% 50% L 38% 25%"
              stroke={simulationState === "simulating" ? "#EF4444" : "#0066FF"}
              strokeWidth="2"
              strokeDasharray={simulationState === "simulating" ? "5,5" : "none"}
              className={simulationState === "simulating" ? "animate-pulse" : ""}
            />
            {/* Path 2: Gateway to Firewall */}
            <path
              d="M 38% 25% L 62% 75%"
              stroke={simulationState === "simulating" ? "#EF4444" : "#0066FF"}
              strokeWidth="2"
              strokeDasharray={simulationState === "simulating" ? "5,5" : "none"}
            />
            {/* Path 3: Firewall to VPC */}
            <path
              d="M 62% 75% L 90% 50%"
              stroke={simulationState === "blocked" ? "#FFFFFF" : "#0066FF"}
              strokeWidth="2"
              className={simulationState === "blocked" ? "stroke-white" : ""}
            />
          </svg>

          {/* Interactive Nodes */}
          <div className="absolute inset-0 flex items-center justify-around">
            {nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              
              let Icon = Laptop;
              if (node.type === "gateway") Icon = Server;
              if (node.type === "firewall") Icon = Shield;
              if (node.type === "cloud") Icon = Cloud;

              let colorClass = "border-accent text-accent bg-background/90";
              if (node.status === "warning") colorClass = "border-secondary text-secondary bg-background/90 animate-pulse";
              if (node.status === "secure" && simulationState === "blocked" && node.type === "cloud") colorClass = "border-accent text-accent bg-background/90";

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`relative p-3 rounded-full border-2 transition-all flex flex-col items-center gap-1 ${colorClass} ${
                    isSelected ? "ring-2 ring-white scale-110 shadow-[0_0_15px_rgba(0,102,255,0.4)]" : "hover:scale-105"
                  }`}
                  style={{ zIndex: 10 }}
                >
                  <Icon className="w-6 h-6" />
                  <span className="absolute -bottom-6 font-mono text-[9px] uppercase tracking-wider text-text-muted font-bold whitespace-nowrap bg-background px-1 border border-border-color/40 rounded-sm">
                    {node.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Node Policy / Config Detail Pane */}
        <div className="bg-background/80 border border-border-color rounded-sm p-4 flex flex-col justify-between">
          <div>
            <span className="font-mono text-[9px] uppercase text-text-muted tracking-widest">// SEC_POLICY_INSPECTOR</span>
            {selectedNode ? (
              <div className="mt-3 space-y-3">
                <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
                  {selectedNode.name}
                </h4>
                <div className="p-3 bg-surface border border-border-color rounded-sm">
                  <span className="font-mono text-[9px] text-accent uppercase font-bold tracking-wider">Applied Protocol</span>
                  <p className="font-mono text-[11px] text-text-primary mt-1 leading-relaxed">
                    {selectedNode.policy}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`w-2 h-2 rounded-full ${selectedNode.status === "secure" ? "bg-accent" : "bg-secondary"}`} />
                  <span className="font-mono text-[10px] uppercase font-bold text-text-primary">
                    Status: {selectedNode.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ) : (
              <p className="font-mono text-xs text-text-muted mt-4">Select a node to inspect security rules.</p>
            )}
          </div>

          {/* Live Simulator Logs */}
          <div className="mt-4 pt-4 border-t border-border-color/60 font-mono text-[10px] space-y-1.5 text-left">
            <span className="text-[9px] text-text-muted uppercase font-bold">// SIMULATOR_OUTPUT</span>
            {simulationState === "idle" && (
              <p className="text-text-muted">&gt; System quiet. Waiting for trigger...</p>
            )}
            {simulationState === "simulating" && (
              <p className="text-secondary animate-pulse">&gt; ALERT: Intrusion path simulated via endpoint L4 socket...</p>
            )}
            {simulationState === "blocked" && (
              <>
                <p className="text-secondary">&gt; Attack detected: SQL_INJECTION_EXPLOIT</p>
                <p className="text-white font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-white" /> MITIGATED: Threat block policy enforced by Palo Alto App-ID
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
