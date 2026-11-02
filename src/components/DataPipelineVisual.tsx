/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Database, Cpu, Activity, LayoutDashboard, Layers, Server } from 'lucide-react';

interface StageNode {
  id: string;
  label: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  specs: string[];
}

const pipelineNodes: StageNode[] = [
  {
    id: 'sources',
    label: '01. Ingestion',
    title: 'Raw Data Sources',
    category: 'Ingestion Layer',
    icon: Server,
    description: 'Capturing structured & unstructured event streams, operational databases, and REST APIs.',
    specs: ['Event Logs', 'Relational DBs', 'External APIs'],
  },
  {
    id: 'pipelines',
    label: '02. Pipeline',
    title: 'ETL / ELT Pipelines',
    category: 'Processing Layer',
    icon: Cpu,
    description: 'Automated data orchestration, schema enforcement, deduplication, and transformation jobs.',
    specs: ['Orchestration', 'Schema Validation', 'Batch & Streaming'],
  },
  {
    id: 'storage',
    label: '03. Storage',
    title: 'Structured Storage',
    category: 'Infrastructure',
    icon: Database,
    description: 'Optimized data marts, relational PostgreSQL repositories, and clean warehouse architectures.',
    specs: ['Dimensional Models', 'Optimized Indexes', 'Access Governance'],
  },
  {
    id: 'analytics',
    label: '04. Insights',
    title: 'Analytics & Delivery',
    category: 'Intelligence Layer',
    icon: LayoutDashboard,
    description: 'Delivering clear business metrics, automated reports, and connected operational interfaces.',
    specs: ['Interactive KPIs', 'Automated Reports', 'API Endpoints'],
  },
];

export const DataPipelineVisual: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>('pipelines');
  const currentNode = pipelineNodes.find((n) => n.id === activeNode) || pipelineNodes[1];

  return (
    <div className="relative w-full rounded-2xl bg-[#060B1E] border border-slate-800/80 p-5 sm:p-7 text-white shadow-2xl overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header of Diagram */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-mono font-semibold tracking-wider text-slate-300 uppercase">
            Data Architecture &amp; Delivery Topology
          </span>
        </div>
        <div className="text-xs font-mono text-slate-400 hidden sm:block">
          Interactive Architecture Map
        </div>
      </div>

      {/* SVG Pipeline Canvas */}
      <div className="relative py-2">
        {/* Horizontal Connector Line for Desktop */}
        <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-slate-800 pointer-events-none">
          <div className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 opacity-60 w-full" />
        </div>

        {/* 4 Connected Pipeline Stages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {pipelineNodes.map((node, index) => {
            const Icon = node.icon;
            const isSelected = activeNode === node.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNode(node.id)}
                className={`text-left p-4 rounded-xl transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800/90 border-blue-500 shadow-md shadow-blue-500/10 ring-1 ring-blue-500/50'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2.5 rounded-lg ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 font-medium">
                    0{index + 1}
                  </span>
                </div>

                <div className="text-xs font-mono text-blue-400 font-semibold mb-1">
                  {node.category}
                </div>
                <h4 className="text-sm font-bold text-white mb-2 leading-tight">
                  {node.title}
                </h4>

                <div className="space-y-1 mt-3 pt-3 border-t border-slate-800/60">
                  {node.specs.map((spec) => (
                    <div
                      key={spec}
                      className="text-[11px] text-slate-300 flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-blue-400" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Node Deep Dive Inspector */}
      <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              {currentNode.label} Focus
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed max-w-xl">
            {currentNode.description}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-1.5 text-xs text-blue-300 font-mono">
          <span>Click stages to explore</span>
        </div>
      </div>
    </div>
  );
};
