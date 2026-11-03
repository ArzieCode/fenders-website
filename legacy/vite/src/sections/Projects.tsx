/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lightbulb, Wrench, Sparkles, Filter } from 'lucide-react';
import { siteConfig, ProjectStatus } from '../config/siteConfig';

export const Projects: React.FC = () => {
  const { projects } = siteConfig;
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Data Engineering', 'Data Analytics', 'IT Consulting'];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Completed</span>
          </span>
        );
      case 'In Development':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
            <Wrench className="w-3 h-3 text-blue-600" />
            <span>In Development</span>
          </span>
        );
      case 'Concept':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            <Lightbulb className="w-3 h-3 text-amber-600" />
            <span>Concept</span>
          </span>
        );
    }
  };

  return (
    <section id="projects" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-semibold tracking-wider text-blue-600 uppercase mb-3">
              Projects &amp; Initiatives
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Exploring Ideas. Building Solutions.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              An overview of our internal technical experiments, architectural prototypes, and engineering research initiatives.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg self-start md:self-auto overflow-x-auto max-w-full">
            <div className="px-2 text-slate-400">
              <Filter className="w-3.5 h-3.5" />
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 sm:p-7 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono text-slate-500 font-medium">
                    {project.category}
                  </span>
                  {getStatusBadge(project.status)}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {project.summary}
                </p>
              </div>

              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Key Technologies &amp; Methods
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[11px] font-mono bg-white border border-slate-200 text-slate-700 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Exploration note */}
        <div className="mt-8 text-center text-xs text-slate-500 font-mono">
          Initiatives are updated continuously as internal prototypes advance to proof-of-concept stages.
        </div>
      </div>
    </section>
  );
};
