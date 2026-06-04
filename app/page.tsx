import React from "react";
import NavBar from "@/components/ui/NavBar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex-1 w-full">
        {/* SECTION 00: Hero viewport */}
        <Hero />

        {/* SECTION 01: About bio & stats */}
        <About />

        {/* SECTION 02: Core weapons selection */}
        <Skills />

        {/* SECTION 03: Credentials & certs */}
        <Certifications />

        {/* SECTION 04: Experience chronological history */}
        <Experience />

        {/* SECTION 05: Projects and architecture */}
        <Projects />

        {/* SECTION 06: Academic & course history */}
        <Education />

        {/* SECTION 07: CTA & Direct links */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
