/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

export const ReadingProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const { scrollHeight, clientHeight } = document.documentElement;
      const scrollableHeight = scrollHeight - clientHeight;

      if (scrollableHeight > 0) {
        const progress = (window.scrollY / scrollableHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Page reading progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-slate-900/20 backdrop-blur-xs pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 shadow-[0_0_10px_rgba(56,189,248,0.6)] transition-all duration-150 ease-out will-change-[width]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
