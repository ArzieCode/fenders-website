/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Users2 } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const Team: React.FC = () => {
  const { team } = siteConfig;

  // Modern tech-themed avatar colors for the four founders
  const avatarStyles = [
    { bg: 'from-blue-600 to-indigo-700', text: 'text-white' },
    { bg: 'from-sky-500 to-blue-600', text: 'text-white' },
    { bg: 'from-indigo-600 to-slate-800', text: 'text-white' },
    { bg: 'from-slate-800 to-blue-900', text: 'text-white' },
  ];

  return (
    <section id="team" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-semibold tracking-wider text-blue-600 uppercase mb-3">
            Founding Team
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            The People Behind FANDERS.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Founded with a collaborative mindset by four developers united to build data foundations, explore modern technology, and solve practical business problems.
          </p>
        </div>

        {/* 4 Founders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((founder, index) => {
            const style = avatarStyles[index] || avatarStyles[0];
            return (
              <div
                key={founder.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex flex-col items-center text-center group"
              >
                {/* Tech Monogram Initial Avatar */}
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${style.bg} ${style.text} flex items-center justify-center font-mono font-bold text-2xl tracking-wider shadow-inner mb-5 group-hover:scale-105 transition-transform duration-200`}
                >
                  {founder.initials}
                </div>

                {/* Founder Name */}
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {founder.name}
                </h3>

                {/* Role */}
                <div className="text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider mb-3">
                  {founder.role}
                </div>

                {/* Focus Area */}
                <div className="w-full pt-4 mt-auto border-t border-slate-100">
                  <div className="text-[11px] font-mono text-slate-400 mb-1">
                    Capability Focus
                  </div>
                  <div className="text-xs font-medium text-slate-700">
                    {founder.focusArea}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Startup Collaborative Spirit Note */}
        <div className="mt-12 p-6 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 shrink-0">
              <Users2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Shared Governance &amp; Collaborative Execution
              </h4>
              <p className="text-xs text-slate-500">
                All founders actively contribute to architecture, code implementation, and client discovery discussions.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap"
          >
            Connect with the founders &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
