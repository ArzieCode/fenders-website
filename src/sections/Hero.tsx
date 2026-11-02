/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, MessageSquare, Database, BarChart3, Compass } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { DataPipelineVisual } from '../components/DataPipelineVisual';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0B132B] text-white overflow-hidden"
    >
      {/* Subtle tech background grid */}
      <div className="absolute inset-0 bg-tech-grid-dark opacity-40 pointer-events-none" />

      {/* Ambient gradient backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-blue-600/15 via-sky-500/10 to-indigo-600/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          {/* Company identity descriptor */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800/80 border border-slate-700/60 mb-6 text-xs text-slate-300 font-mono">
            <span className="font-semibold text-blue-400">{siteConfig.brand.name}</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>{siteConfig.brand.fullName}</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-slate-400">{siteConfig.brand.status}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] text-balance">
            {siteConfig.hero.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
            {siteConfig.hero.subheadline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="#solutions"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 active:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25 whitespace-nowrap shrink-0"
            >
              <span>{siteConfig.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 bg-slate-800/90 border border-slate-700 rounded-lg hover:bg-slate-700/80 hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>{siteConfig.hero.secondaryCta}</span>
            </a>
          </div>
        </div>

        {/* Abstract Technology & Data Pipeline Visualization */}
        <div className="max-w-5xl mx-auto">
          <DataPipelineVisual />
        </div>

        {/* Three Core Pillars Banner */}
        <div className="mt-16 pt-12 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/60">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                <Database className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-white tracking-wide">
                01. Data Engineering
              </h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Constructing scalable pipelines, automated ETL/ELT flows, and disciplined database schemas.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/60">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-sky-600/20 text-sky-400">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-white tracking-wide">
                02. Data Solutions &amp; Analytics
              </h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transforming distributed operational data into actionable business intelligence dashboards and insights.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/60">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400">
                <Compass className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-white tracking-wide">
                03. IT Consulting
              </h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Assessing technology stacks, mapping digital processes, and designing practical system architectures.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
