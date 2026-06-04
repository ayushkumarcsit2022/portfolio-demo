"use client";

import React from "react";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background py-10 border-t border-border-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Monospace tagline */}
        <div className="font-mono text-xs text-text-muted tracking-wider order-2 md:order-1">
          // Stay secure. Stay vigilant.
        </div>

        {/* Copy */}
        <div className="font-sans text-xs text-text-muted font-medium order-1 md:order-2">
          Gbenga Owadokun &copy; {new Date().getFullYear()}
        </div>

        {/* Social Link List */}
        <div className="flex items-center gap-4 order-3">
          <a
            href="https://www.linkedin.com/in/gbenga-owadokun-aws-ccna-cnss-network-security-engineer"
            className="p-2 bg-surface border border-border-color text-text-muted hover:border-accent hover:text-accent rounded-sm transition-colors duration-150"
            aria-label="LinkedIn Profile"
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href="mailto:oloritemi@yahoo.co.uk"
            className="p-2 bg-surface border border-border-color text-text-muted hover:border-accent hover:text-accent rounded-sm transition-colors duration-150"
            aria-label="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

