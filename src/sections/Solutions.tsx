/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Database, BarChart3, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const Solutions: React.FC = () => {
  const { solutions } = siteConfig;
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>(solutions[0].id);

  const activeSolution = solutions.find((s) => s.id === selectedSolutionId) || solutions[0];

  const getSolutionIcon = (id: string) => {
    switch (id) {
      case 'data-engineering':
        return Database;
      case 'data-analytics':
        return BarChart3;
      case 'it-consulting':
      default:
        return Compass;
    }
  };

  return (
    <section id="solutions" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono font-semibold tracking-wider text-blue-600 uppercase mb-3">
            What We Do
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Technology Capabilities for a Data-Driven Future.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Our technical focus centers on three symbiotic areas &mdash; from structuring raw information streams to delivering strategic digital architecture.
          </p>
          <div className="mt-3 text-xs text-slate-500 font-mono">
            * Displaying core technical capability focus and developmental scope of FANDERS.
          </div>
        </div>

        {/* 3 Domain Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {solutions.map((item) => {
            const Icon = getSolutionIcon(item.id);
            const isSelected = item.id === activeSolution.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedSolutionId(item.id)}
                className={`p-5 rounded-xl text-left transition-all duration-150 border cursor-pointer ${
                  isSelected
                    ? 'bg-white border-blue-600 shadow-md ring-1 ring-blue-600/30'
                    : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-slate-400">
                    {item.number}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {item.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Domain Detailed View & Architecture Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Scope & Description */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-blue-600">
                  {activeSolution.number}
                </span>
                <span className="text-xs font-mono uppercase text-slate-400">
                  Domain Exploration Scope
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                {activeSolution.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed">
                {activeSolution.description}
              </p>

              {/* Scope Checklist */}
              <div className="mb-8">
                <h4 className="text-xs font-mono font-bold tracking-wider text-slate-900 uppercase mb-4">
                  Scope of Technical Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeSolution.scope.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span className="text-xs font-medium text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Outcome Box */}
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-blue-900 mb-0.5">
                    Target Engineering Outcome
                  </div>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    {activeSolution.keyOutcome}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Architecture Blueprint Representation */}
            <div className="lg:col-span-5 bg-[#0B132B] rounded-xl p-6 text-white border border-slate-800 relative overflow-hidden">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 pb-3 border-b border-slate-800 flex items-center justify-between">
                <span>Architecture Concept</span>
                <span className="text-blue-400 font-bold">{activeSolution.number}</span>
              </div>

              {/* Conditional Visual Blueprint based on Active Solution */}
              {activeSolution.id === 'data-engineering' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400 mb-1">01. INGESTION</div>
                    <div className="text-xs font-bold text-white">Source Connectors &amp; Webhooks</div>
                    <div className="text-[11px] text-slate-400 mt-1">REST APIs · Cloud Storage · SQL DBs</div>
                  </div>
                  <div className="flex justify-center text-blue-400 font-mono text-xs">
                    ↓ Stream / Batch Extraction
                  </div>
                  <div className="p-3 rounded-lg bg-blue-950/60 border border-blue-800/80">
                    <div className="text-[11px] font-mono text-blue-400 mb-1">02. TRANSFORMATION</div>
                    <div className="text-xs font-bold text-white">dbt Models &amp; Orchestration</div>
                    <div className="text-[11px] text-slate-300 mt-1">Schema Enforcement · Data Cleansing · Deduplication</div>
                  </div>
                  <div className="flex justify-center text-blue-400 font-mono text-xs">
                    ↓ Structured Ingestion
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400 mb-1">03. REPOSITORY</div>
                    <div className="text-xs font-bold text-white">PostgreSQL &amp; Data Warehouse</div>
                    <div className="text-[11px] text-slate-400 mt-1">Star Schema · Analytical Views · Partitioning</div>
                  </div>
                </div>
              )}

              {activeSolution.id === 'data-analytics' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400 mb-1">01. EXPLORATION</div>
                    <div className="text-xs font-bold text-white">Dataset Audit &amp; Distribution Analysis</div>
                    <div className="text-[11px] text-slate-400 mt-1">Pandas · Descriptive Statistics · Profiling</div>
                  </div>
                  <div className="flex justify-center text-sky-400 font-mono text-xs">
                    ↓ Aggregation &amp; Modeling
                  </div>
                  <div className="p-3 rounded-lg bg-sky-950/60 border border-sky-800/80">
                    <div className="text-[11px] font-mono text-sky-400 mb-1">02. MODELING &amp; METRICS</div>
                    <div className="text-xs font-bold text-white">KPI Formulas &amp; Cohort Trends</div>
                    <div className="text-[11px] text-slate-300 mt-1">Conversion Ratios · Time-Series · Churn Curves</div>
                  </div>
                  <div className="flex justify-center text-sky-400 font-mono text-xs">
                    ↓ Visual Reporting
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400 mb-1">03. DASHBOARD VIEWS</div>
                    <div className="text-xs font-bold text-white">Power BI, Tableau &amp; Web Reports</div>
                    <div className="text-[11px] text-slate-400 mt-1">Interactive Filters · Automated Executive Exports</div>
                  </div>
                </div>
              )}

              {activeSolution.id === 'it-consulting' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400 mb-1">01. DIAGNOSTICS</div>
                    <div className="text-xs font-bold text-white">Current Stack &amp; Workflow Audit</div>
                    <div className="text-[11px] text-slate-400 mt-1">Bottleneck Mapping · Tool Debt Review</div>
                  </div>
                  <div className="flex justify-center text-indigo-400 font-mono text-xs">
                    ↓ Strategic Architecture
                  </div>
                  <div className="p-3 rounded-lg bg-indigo-950/60 border border-indigo-800/80">
                    <div className="text-[11px] font-mono text-indigo-400 mb-1">02. SYSTEM DESIGN</div>
                    <div className="text-xs font-bold text-white">Integration Blueprint &amp; Technology Selection</div>
                    <div className="text-[11px] text-slate-300 mt-1">API Schemas · Scalability Review · Budget Feasibility</div>
                  </div>
                  <div className="flex justify-center text-indigo-400 font-mono text-xs">
                    ↓ Execution Roadmap
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400 mb-1">03. OPTIMIZATION</div>
                    <div className="text-xs font-bold text-white">Digital Transformation Steps</div>
                    <div className="text-[11px] text-slate-400 mt-1">Implementation Guidelines · Handover Documentation</div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Collaborate on this capability:</span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300"
                >
                  <span>Discuss Need</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
