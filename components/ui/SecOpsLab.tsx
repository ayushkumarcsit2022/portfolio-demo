"use client";

import React, { useState } from "react";
import { Terminal, ShieldAlert, ShieldCheck, Play, CheckCircle } from "lucide-react";

interface PolicyRule {
  id: string;
  name: string;
  vuln: string;
  severity: "critical" | "warning" | "resolved";
  details: string;
}

export default function SecOpsLab() {
  const [policies, setPolicies] = useState<PolicyRule[]>([
    { id: "POL-001", name: "INBOUND_SSH_PUBLIC", vuln: "Port 22 (SSH) open to 0.0.0.0/0", severity: "critical", details: "Allows brute-force access attempts globally." },
    { id: "POL-002", name: "DMZ_CLEAR_TEXT", vuln: "HTTP clear-text traffic allowed to App Server", severity: "warning", details: "Exposes sensitive credentials in transit." },
    { id: "POL-003", name: "OUTBOUND_ANY_ANY", vuln: "Wildcard * egress allowed on web subnets", severity: "warning", details: "Potential data exfiltration path." }
  ]);

  const [activeLog, setActiveLog] = useState<string>("Audit engine idle. Click 'Mitigate' to commit secure rules.");
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleMitigate = (id: string, name: string) => {
    setIsProcessing(id);
    setActiveLog(`[COMMIT] Initiating policy review for ${name}...`);

    setTimeout(() => {
      setActiveLog(`[PANORAMA] Pushing rule commit template to Dallas NGFW node...`);
    }, 1000);

    setTimeout(() => {
      setPolicies(prev =>
        prev.map(p => p.id === id ? { ...p, severity: "resolved", vuln: "Enforced: MFA & Zero Trust Identity Check" } : p)
      );
      setIsProcessing(null);
      setActiveLog(`[SUCCESS] Rule verified. App-ID restriction applied. Integrity check: OK.`);
    }, 2200);
  };

  return (
    <div className="panel-glass rounded-lg border border-border-color p-6 max-w-3xl mx-auto my-8">
      <div className="flex items-center gap-2 border-b border-border-color pb-4 mb-6">
        <Terminal className="w-5 h-5 text-accent animate-pulse" />
        <div>
          <h3 className="font-heading text-lg font-black text-white uppercase tracking-wider">
            SecOps Firewall Audit Sandbox
          </h3>
          <p className="text-text-muted text-xs font-semibold">
            Identify and close vulnerabilities in the simulated Palo Alto policy stack.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {policies.map((p) => (
          <div key={p.id} className="p-4 bg-background/60 border border-border-color rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-left space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] text-text-muted bg-surface px-2 py-0.5 border border-border-color/60 rounded-sm font-bold">
                  {p.id}
                </span>
                <span className="font-heading text-sm font-black text-white uppercase tracking-wider">
                  {p.name}
                </span>
                {p.severity === "critical" && (
                  <span className="flex items-center gap-1 font-mono text-[9px] text-secondary uppercase font-bold">
                    <ShieldAlert className="w-3 h-3 text-secondary animate-pulse" /> Critical
                  </span>
                )}
                {p.severity === "warning" && (
                  <span className="flex items-center gap-1 font-mono text-[9px] text-secondary uppercase font-bold">
                    <ShieldAlert className="w-3 h-3 text-secondary" /> Warning
                  </span>
                )}
                {p.severity === "resolved" && (
                  <span className="flex items-center gap-1 font-mono text-[9px] text-white uppercase font-bold">
                    <ShieldCheck className="w-3 h-3 text-accent" /> Secured
                  </span>
                )}
              </div>
              <p className="font-mono text-xs text-text-muted font-bold">
                {p.vuln}
              </p>
              <p className="text-[11px] text-text-muted/60 font-sans leading-relaxed">
                {p.details}
              </p>
            </div>

            {p.severity !== "resolved" && (
              <button
                disabled={isProcessing !== null}
                onClick={() => handleMitigate(p.id, p.name)}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-accent disabled:bg-accent/40 hover:bg-accent/90 text-white font-mono text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer"
              >
                {isProcessing === p.id ? (
                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Play className="w-3 h-3" />
                )}
                <span>{isProcessing === p.id ? "Enforcing..." : "Mitigate"}</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Simulator logs output */}
      <div className="mt-6 p-4 bg-background border border-border-color rounded-sm font-mono text-[10px] text-left">
        <span className="text-[9px] text-text-muted uppercase font-bold block mb-1 border-b border-border-color/40 pb-1">
          // AUDIT_ENGINE_LOGS
        </span>
        <p className="text-accent">&gt; {activeLog}</p>
      </div>
    </div>
  );
}
