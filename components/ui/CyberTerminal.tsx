"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, Shield, Check, AlertCircle } from "lucide-react";

interface CommandLog {
  text: string;
  type: "input" | "output" | "error" | "success";
}

export default function CyberTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    { text: "Initializing Security Sandbox...", type: "output" },
    { text: "Type 'help' to see list of operational protocols.", type: "success" }
  ]);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;

    const newLogs: CommandLog[] = [
      ...history,
      { text: `guest@gbenga.security:~$ ${input}`, type: "input" }
    ];

    switch (command) {
      case "help":
        newLogs.push({
          text: "Available commands: 'about', 'skills', 'contact', 'clear', 'bypass-firewall'",
          type: "output"
        });
        break;
      case "about":
        newLogs.push({
          text: "Gbenga Owadokun - Senior Network & Cybersecurity Engineer. Specializes in Palo Alto NGFW, Zero Trust Enterprise Architectures, SASE, and Endpoint Defense.",
          type: "output"
        });
        break;
      case "skills":
        newLogs.push({
          text: "Network Security: Palo Alto PCNSE, Cisco CCNA, AWS SASE, Routing & Switching\nCloud: Azure Security, AWS VPC Transit Gateway, SASE Architectures\nDefenses: Cortex XDR, Zero Trust Identity, Vulnerability Auditing",
          type: "output"
        });
        break;
      case "contact":
        newLogs.push({
          text: "Secure Channel Active:\nEmail: oloritemi@yahoo.co.uk\nPhone: 214-499-1461\nLinkedIn: /in/gbenga-owadokun-aws-ccna-cnss-network-security-engineer",
          type: "success"
        });
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "bypass-firewall":
        newLogs.push({
          text: "[WARNING] Attempting standard firewall bypass sequence...",
          type: "error"
        });
        newLogs.push({
          text: "[BLOCKED] Palo Alto L7 App-ID detected unauthorized tunneling request. Mitigation response: Session reset. Network interface secure.",
          type: "error"
        });
        break;
      default:
        newLogs.push({
          text: `Command not found: '${command}'. Type 'help' for available options.`,
          type: "error"
        });
    }

    setHistory(newLogs);
    setInput("");
  };

  return (
    <div className="panel-glass rounded-lg border border-border-color shadow-2xl overflow-hidden font-mono text-xs w-full max-w-lg mx-auto flex flex-col h-[280px]">
      {/* Title Bar */}
      <div className="bg-background/80 px-4 py-2 border-b border-border-color flex justify-between items-center select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-accent" />
          <span className="text-[10px] font-black uppercase tracking-wider text-text-primary">
            SECURE_CLI_v1.0.8
          </span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-success/80" />
        </div>
      </div>

      {/* Logs Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin">
        {history.map((log, idx) => {
          let textStyle = "text-text-muted";
          if (log.type === "input") textStyle = "text-text-primary font-bold";
          if (log.type === "success") textStyle = "text-success font-bold";
          if (log.type === "error") textStyle = "text-secondary font-bold";
          if (log.type === "output") textStyle = "text-accent";

          return (
            <div key={idx} className={`whitespace-pre-wrap ${textStyle}`}>
              {log.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Row */}
      <form onSubmit={handleCommandSubmit} className="border-t border-border-color bg-background/50 p-2 flex items-center gap-2">
        <span className="text-accent font-bold">guest@gbenga:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-text-muted/40 font-mono text-xs caret-accent"
          placeholder="type command here..."
          autoComplete="off"
          autoFocus
        />
      </form>
    </div>
  );
}
