/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Solutions } from './sections/Solutions';
import { Approach } from './sections/Approach';
import { Expertise } from './sections/Expertise';
import { Projects } from './sections/Projects';
import { Team } from './sections/Team';
import { Collaboration } from './sections/Collaboration';
import { FAQ } from './sections/FAQ';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Slim Persistent Reading Progress Indicator */}
      <ReadingProgressBar />

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* A & B. Hero Section with Interactive Architecture Map */}
        <Hero />

        {/* C. About FANDERS (Narrative, Name Philosophy, Draft Vision & Mission) */}
        <About />

        {/* D. What We Do (Data Engineering, Analytics, IT Consulting) */}
        <Solutions />

        {/* E. Our Approach (Understand, Analyze, Engineer, Improve) */}
        <Approach />

        {/* F. Technology Expertise (Data Engineering, Analytics, Software & IT) */}
        <Expertise />

        {/* G. Projects & Initiatives (Concept, In Development, Completed) */}
        <Projects />

        {/* H. Our Team (Faza, Arza, Danies, Naufal) */}
        <Team />

        {/* I. Collaboration Section (Call for early-stage partnership) */}
        <Collaboration />

        {/* J. Frequently Asked Questions */}
        <FAQ />

        {/* K. Contact & Direct Discussion Builder */}
        <Contact />
      </main>

      {/* L. Footer */}
      <Footer />
    </div>
  );
}
