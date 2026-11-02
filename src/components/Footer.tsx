/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060B1E] text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand & Tagline */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-extrabold text-2xl tracking-wider text-white">
                {siteConfig.brand.name}
              </span>
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            </div>

            <p className="text-sm font-medium text-slate-300 mb-2">
              {siteConfig.brand.fullName}
            </p>
            <p className="text-xs text-slate-400 max-w-sm mb-4 leading-relaxed">
              {siteConfig.brand.positioning}
            </p>
            <p className="text-xs font-mono text-blue-400">
              &ldquo;{siteConfig.brand.tagline}&rdquo;
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About FANDERS
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  Capabilities &amp; Solutions
                </a>
              </li>
              <li>
                <a href="#approach" className="hover:text-white transition-colors">
                  Our Approach
                </a>
              </li>
              <li>
                <a href="#expertise" className="hover:text-white transition-colors">
                  Technology Stack
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Projects &amp; Initiatives
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition-colors">
                  Founding Team
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Focus Areas */}
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Capability Focus
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  Data Engineering
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  Data Solutions &amp; Analytics
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  IT Consulting
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  System Integration
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  Workflow Optimization
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Status */}
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Inquiries
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.channels[0].value}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {siteConfig.contact.channels[0].value}
                </a>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                {siteConfig.brand.status}
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                {siteConfig.brand.location}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-500">
            &copy; {currentYear} {siteConfig.brand.name} ({siteConfig.brand.fullName}). All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] font-mono text-slate-500">
              Co-founded by Faza, Arza, Danies &amp; Naufal
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
