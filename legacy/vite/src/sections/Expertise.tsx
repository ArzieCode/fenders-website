/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Database, BarChart2, Terminal, Info } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const Expertise: React.FC = () => {
  const { technology } = siteConfig;

  const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    'Data Engineering': Database,
    'Data Analytics': BarChart2,
    'Software & IT': Terminal,
  };

  return (
    <section id="expertise" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono font-semibold tracking-wider text-blue-600 uppercase mb-3">
            Technology Stack
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Technology We Explore and Build With.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Our evolving toolkit spans industry-standard data engineering orchestrators, analytical libraries, and modern software development ecosystems.
          </p>

          {/* Honest Capability Disclaimer */}
          <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-slate-100/80 border border-slate-200 text-xs text-slate-600">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              This stack represents the technical tools and frameworks actively explored, utilized, and evaluated by the FANDERS founding team. Capabilities are continuously expanded through ongoing development.
            </span>
          </div>
        </div>

        {/* 3 Technology Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {technology.map((cat) => {
            const Icon = categoryIcons[cat.category] || Terminal;
            return (
              <div
                key={cat.category}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {cat.category}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                    Active Stack &amp; Tools
                  </div>

                  {/* Clean unboxed/subtle pills with zero-slop restraint */}
                  <div className="flex flex-wrap gap-2">
                    {cat.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200/70 text-xs font-mono text-slate-800 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
                  Configurable in siteConfig.ts
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
