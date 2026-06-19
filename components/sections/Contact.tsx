"use client";

import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { Mail, Phone, MapPin, ExternalLink, Terminal, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

interface ContactProps {
  data?: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
  };
}

export default function Contact({ data }: ContactProps) {
  const titleToUse = data?.title || "Initiate Secure Connection";
  const subtitleToUse = data?.subtitle || "Available for enterprise engineering projects, infrastructure auditing, SASE designs, and full-time cybersecurity leadership roles.";
  const emailToUse = data?.email || "oloritemi@yahoo.co.uk";
  const phoneToUse = data?.phone || "214-499-1461";
  const linkedinToUse = data?.linkedin || "https://www.linkedin.com/in/gbenga-owadokun-aws-ccna-cnss-network-security-engineer";
  const locationToUse = data?.location || "Dallas, TX Node";

  const contactChips = [
    { label: emailToUse, href: `mailto:${emailToUse}`, icon: Mail },
    { label: phoneToUse, href: `tel:${phoneToUse}`, icon: Phone },
    { label: locationToUse, href: null, icon: MapPin }
  ];

  const [encryptionProgress, setEncryptionProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEncryptionProgress(prev => (prev >= 100 ? 100 : prev + 2));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="bg-surface/30 py-24 relative overflow-hidden">
      {/* Decorative borders */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-border-color" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border-color" />

      {/* Cyber overlay patterns */}
      <div className="absolute inset-0 bg-grid-cyber opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Terminal Form Frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="panel-glass rounded-lg p-8 md:p-12 border border-border-color shadow-[0_0_40px_rgba(0,102,255,0.08)] scanline max-w-3xl mx-auto relative corner-decor"
        >
          {/* Header */}
          <div className="space-y-4 mb-8">
            <div className="font-mono text-xs text-accent uppercase tracking-widest flex items-center justify-center gap-2 font-bold bg-background/50 border border-border-color w-fit mx-auto px-4 py-1.5 rounded-sm">
              <Terminal className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span>// ESTABLISHED_SECURE_CHANNEL</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl font-black text-text-primary uppercase tracking-tight">
              {titleToUse}
            </h2>

            <p className="font-sans text-sm sm:text-base text-text-muted max-w-xl mx-auto leading-relaxed">
              {subtitleToUse}
            </p>
          </div>

          {/* Secure Transmission Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
            <div className="p-3 bg-background/80 border border-border-color rounded-sm font-mono text-[10px]">
              <span className="text-text-muted uppercase tracking-wider block">// LINK_STATUS</span>
              <span className="text-success font-black mt-1 block flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping" />
                ONLINE / READY
              </span>
            </div>
            
            <div className="p-3 bg-background/80 border border-border-color rounded-sm font-mono text-[10px]">
              <span className="text-text-muted uppercase tracking-wider block">// SECURITY_EXCHANGE</span>
              <span className="text-accent font-black mt-1 block uppercase">AES_256_GCM</span>
            </div>

            <div className="p-3 bg-background/80 border border-border-color rounded-sm font-mono text-[10px]">
              <span className="text-text-muted uppercase tracking-wider block">// SHIELD_VERIFICATION</span>
              <span className="text-secondary font-black mt-1 block uppercase">
                {encryptionProgress}% HARDENED
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button variant="primary" href={`mailto:${emailToUse}`} className="px-8 py-3.5">
              <Mail className="w-4 h-4 text-white" />
              <span>Send Secure Email</span>
            </Button>
            <Button
              variant="ghost"
              href={linkedinToUse}
              className="px-8 py-3.5"
            >
              <svg
                className="w-4 h-4 text-accent fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn Handshake</span>
              <ExternalLink className="w-3.5 h-3.5 text-accent/60" />
            </Button>
          </div>

          {/* Contact inline detail chips */}
          <div className="flex flex-wrap justify-center items-center gap-3 pt-10 mt-6 border-t border-border-color/60">
            {contactChips.map((chip, idx) => {
              const Icon = chip.icon;
              const isLink = chip.href !== null;
              const elementProps = isLink
                ? { href: chip.href as string, className: "hover:border-accent hover:text-accent" }
                : {};
              const Component = isLink ? "a" : "div";

              return (
                <Component
                  key={idx}
                  {...elementProps}
                  className={`flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold bg-background border border-border-color px-4 py-2 rounded-sm text-text-primary uppercase tracking-wider transition-all duration-200 ${
                    isLink ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-accent animate-pulse" />
                  <span>{chip.label}</span>
                </Component>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
