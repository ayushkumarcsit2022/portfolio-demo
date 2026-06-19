"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CyberLoader from "./CyberLoader";
import NavBar from "./NavBar";
import ResumeConsole from "./ResumeConsole";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Certifications from "../sections/Certifications";
import Experience from "../sections/Experience";
import Projects from "../sections/Projects";
import Education from "../sections/Education";
import Contact from "../sections/Contact";
import Footer from "./Footer";
import { PortfolioData } from "@/lib/db";

export default function PortfolioContainer({ data }: { data: PortfolioData }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999]"
          >
            <CyberLoader onComplete={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col min-h-screen"
      >
        <NavBar onViewResume={() => setIsResumeOpen(true)} />
        <main className="flex-1 w-full">
          <Hero data={data.hero} />
          <About data={data.about} />
          <Skills categories={data.skills} />
          <Certifications items={data.certifications} />
          <Experience list={data.experiences} />
          <Projects list={data.projects} />
          <Education list={data.education} />
          <Contact data={data.contact} />
        </main>
        <Footer />
      </motion.div>

      {/* Inline Credentials Console Modal */}
      <ResumeConsole isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} data={data} />
    </>
  );
}
