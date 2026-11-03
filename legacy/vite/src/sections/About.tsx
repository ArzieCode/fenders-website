/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Users2, Sparkles, Terminal, Compass, Target, Info } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const About: React.FC = () => {
  const { about } = siteConfig;

  const philosophyIcons = [
    { icon: Users2, color: 'text-blue-600 bg-blue-50' },
    { icon: Sparkles, color: 'text-sky-600 bg-sky-50' },
    { icon: Terminal, color: 'text-indigo-600 bg-indigo-50' },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-semibold tracking-wider text-blue-600 uppercase mb-3">
            About FANDERS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            {about.headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {about.narrative}
          </p>
        </div>

        {/* Philosophy Breakdown: Friends, New, Developers */}
        <div className="mb-20">
          <div className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider mb-6">
            The Philosophy Behind Our Identity
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {about.philosophy.map((item, index) => {
              const IconData = philosophyIcons[index] || philosophyIcons[0];
              const Icon = IconData.icon;
              return (
                <div
                  key={item.keyword}
                  className="p-6 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-lg ${IconData.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-400">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="text-xs font-mono font-semibold text-blue-600 uppercase mb-1">
                    {item.keyword}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Proposed Vision & Mission Area (Editable proposal with note) */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Proposal status badge note */}
          <div className="flex items-center gap-2 mb-6 text-xs font-mono text-slate-400">
            <Info className="w-4 h-4 text-blue-400" />
            <span>
              Working Charter Draft &mdash; Proposed statements currently under internal team review
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Vision Column */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-800 pb-8 lg:pb-0 lg:pr-8">
              <div className="flex items-center gap-2.5 mb-3 text-blue-400">
                <Compass className="w-5 h-5" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase">
                  Proposed Vision
                </span>
              </div>
              <p className="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed">
                &ldquo;{about.draftVision}&rdquo;
              </p>
              <div className="mt-4 text-xs text-slate-400">
                Serves as our operational north star while building data engineering and software solutions.
              </div>
            </div>

            {/* Mission Column */}
            <div className="lg:col-span-7 lg:pl-4">
              <div className="flex items-center gap-2.5 mb-4 text-blue-400">
                <Target className="w-5 h-5" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase">
                  Proposed Mission Pillars
                </span>
              </div>
              <div className="space-y-3.5">
                {about.draftMissions.map((mission, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-blue-400 mt-1 shrink-0">
                      0{idx + 1}.
                    </span>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {mission}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
