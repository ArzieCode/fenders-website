/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, LineChart, Code2, RefreshCw, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const Approach: React.FC = () => {
  const { approach } = siteConfig;
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const stepIcons = [Search, LineChart, Code2, RefreshCw];

  return (
    <section id="approach" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-semibold tracking-wider text-blue-600 uppercase mb-3">
            Our Approach
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            From Problems to Practical Solutions.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            We follow a disciplined, four-phase engineering methodology designed to ensure every technology initiative addresses authentic organizational realities.
          </p>
        </div>

        {/* Modern Workflow Visualizer with Stepper Track */}
        <div className="relative mb-12">
          {/* Connector Rail for Desktop */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-slate-200 pointer-events-none">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(activeStepIndex / (approach.length - 1)) * 100}%` }}
            />
          </div>

          {/* Stepper Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {approach.map((item, index) => {
              const Icon = stepIcons[index] || Search;
              const isActive = activeStepIndex === index;
              const isPast = activeStepIndex > index;

              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setActiveStepIndex(index)}
                  className={`p-6 rounded-xl text-left transition-all duration-200 border cursor-pointer ${
                    isActive
                      ? 'bg-blue-50/60 border-blue-600 shadow-md ring-1 ring-blue-600/30'
                      : isPast
                      ? 'bg-slate-50/80 border-slate-300'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : isPast
                          ? 'bg-slate-800 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400">
                      Phase {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {item.step} &mdash; {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {item.summary}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Phase Deep Dive */}
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-900 text-white border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
                <span>Phase {approach[activeStepIndex].step} Deep Dive</span>
                <span>·</span>
                <span>{approach[activeStepIndex].name}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {approach[activeStepIndex].summary}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                {approach[activeStepIndex].description}
              </p>

              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Key Phase Deliverables &amp; Artifacts
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {approach[activeStepIndex].deliverables.map((deliv, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between h-full">
              <div>
                <div className="text-xs font-mono text-slate-400 mb-2">
                  Sequential Progression
                </div>
                <div className="text-xs text-slate-300 leading-relaxed mb-6">
                  Each phase is grounded in transparent communication. We validate milestones collaboratively before moving to the next engineering tier.
                </div>
              </div>

              <div className="flex items-center gap-3">
                {activeStepIndex < approach.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex((prev) => prev + 1)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    <span>Next Phase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    <span>Discuss Your Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
