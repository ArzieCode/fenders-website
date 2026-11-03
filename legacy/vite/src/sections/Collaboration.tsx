/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, MessageSquare, Handshake, Sparkles } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const Collaboration: React.FC = () => {
  const { collaboration } = siteConfig;

  return (
    <section className="py-20 lg:py-24 bg-[#0B132B] text-white relative overflow-hidden">
      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 bg-tech-grid-dark opacity-30 pointer-events-none" />

      {/* Ambient Gradient Glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Open to Collaboration Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800/90 border border-slate-700/80 mb-6 text-xs text-blue-300 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Early-Stage Partnerships &amp; Technical Discovery</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 max-w-3xl mx-auto leading-tight text-balance">
          {collaboration.headline}
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
          {collaboration.subheadline}
        </p>

        {/* Key Areas of Collaboration */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10 text-left">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-mono font-bold text-blue-400 mb-1">
              Data Foundations
            </div>
            <p className="text-xs text-slate-400">
              Audit data pipelines, databases, and reporting readiness.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-mono font-bold text-sky-400 mb-1">
              Pilot Initiatives
            </div>
            <p className="text-xs text-slate-400">
              Prototype business intelligence dashboards and operational metrics.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-mono font-bold text-indigo-400 mb-1">
              Tech Exploration
            </div>
            <p className="text-xs text-slate-400">
              Evaluate system architectures and digital modernization strategies.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 active:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 whitespace-nowrap shrink-0"
          >
            <Handshake className="w-4 h-4" />
            <span>{collaboration.primaryCta}</span>
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{collaboration.secondaryCta}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
