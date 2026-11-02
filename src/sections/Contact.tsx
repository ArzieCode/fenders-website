/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, MessageCircle, Linkedin, Github, Send, Copy, Check, Clock, AlertCircle } from 'lucide-react';
import { siteConfig, ContactChannel } from '../config/siteConfig';

export const Contact: React.FC = () => {
  const { contact } = siteConfig;
  const [topic, setTopic] = useState<'Data Engineering' | 'Data Analytics' | 'IT Consulting' | 'General Collaboration'>('Data Engineering');
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  const getChannelIcon = (id: string) => {
    switch (id) {
      case 'email':
        return Mail;
      case 'whatsapp':
        return MessageCircle;
      case 'linkedin':
        return Linkedin;
      case 'github':
        return Github;
      default:
        return Mail;
    }
  };

  const emailChannel = contact.channels.find((c) => c.id === 'email');
  const targetEmail = emailChannel?.value || 'contact.fanders@gmail.com';

  const generatedSubject = `Collaboration Inquiry: ${topic} - ${name ? name : 'Prospective Partner'}`;
  const generatedBody = `Hi FANDERS Team,

I would like to explore a potential discussion regarding ${topic}.

Name / Team: ${name || '[Your Name / Organization]'}
Topic of Interest: ${topic}
Discussion Points:
${notes ? notes : '[Please describe your project, challenge, or ideas here]'}

Looking forward to connecting with the FANDERS co-founders.

Best regards,
${name || '[Your Name]'}`;

  const mailtoLink = `mailto:${targetEmail}?subject=${encodeURIComponent(
    generatedSubject
  )}&body=${encodeURIComponent(generatedBody)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${generatedSubject}\n\n${generatedBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-semibold tracking-wider text-blue-600 uppercase mb-3">
            Contact &amp; Collaboration
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {contact.title}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Contact Channels from Centralized Config */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-2">
              Official Channels
            </div>

            {contact.channels.map((channel: ContactChannel) => {
              const Icon = getChannelIcon(channel.id);
              return (
                <div
                  key={channel.id}
                  className={`p-5 rounded-xl border transition-all ${
                    channel.isAvailable
                      ? 'bg-white border-slate-200/90 shadow-sm hover:border-blue-300'
                      : 'bg-slate-100/60 border-slate-200/60 opacity-80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          channel.isAvailable
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          {channel.name}
                        </h3>
                        <div className="text-xs font-mono text-slate-500">
                          {channel.value}
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    {channel.isAvailable ? (
                      <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded">
                        <Clock className="w-3 h-3" />
                        <span>In Setup</span>
                      </span>
                    )}
                  </div>

                  {channel.statusNote && (
                    <p className="text-xs text-slate-500 mb-3 pl-11">
                      {channel.statusNote}
                    </p>
                  )}

                  <div className="pl-11">
                    {channel.isAvailable && channel.href ? (
                      <a
                        href={channel.href}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                      >
                        <span>{channel.label}</span>
                        <Send className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="text-xs font-mono text-slate-400 cursor-not-allowed"
                      >
                        Channel undergoing verification
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Note regarding authentic channels */}
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-500 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                All communication is conducted directly with the four founding partners. Secondary channels will be activated following official administrative registrations.
              </span>
            </div>
          </div>

          {/* Right Column: Direct Email Inquiry Composer (Real client-side mailto draft, NO fake backend form) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Prepare Your Discussion Topic
                </h3>
                <p className="text-xs text-slate-500">
                  Select your topic and generate an email to dispatch directly to the FANDERS team.
                </p>
              </div>
              <span className="hidden sm:inline-block text-xs font-mono text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
                Direct Email Dispatch
              </span>
            </div>

            <div className="space-y-4">
              {/* Select Focus Topic */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Topic of Interest
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Data Engineering', 'Data Analytics', 'IT Consulting', 'General Collaboration'] as const).map(
                    (item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTopic(item)}
                        className={`p-2.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                          topic === item
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Sender Name / Organization */}
              <div>
                <label
                  htmlFor="inquirer-name"
                  className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Your Name or Organization (Optional)
                </label>
                <input
                  id="inquirer-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe / Tech Startup"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Project / Question Notes */}
              <div>
                <label
                  htmlFor="inquiry-notes"
                  className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Brief Summary / Question (Optional)
                </label>
                <textarea
                  id="inquiry-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us briefly about what you are exploring or want to build together..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Action Buttons: Open in Email Client OR Copy Text */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={mailtoLink}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 active:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open in Your Email Client</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-500" />
                      <span>Copy Draft</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-400 font-mono text-center pt-2">
                Draft will be addressed to: {targetEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
