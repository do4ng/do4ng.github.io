'use client';

import React, { useEffect, useRef } from 'react';
import { router } from '$exta-router';

export function TopProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const start = () => {
      if (!barRef.current) return;

      barRef.current.style.opacity = '1';
      barRef.current.style.transform = 'scaleX(0.1)';

      let progress = 0.1;
      timerRef.current = window.setInterval(() => {
        progress = Math.min(progress + Math.random() * 0.15, 0.9);
        barRef.current!.style.transform = `scaleX(${progress})`;
      }, 200);
    };

    const end = () => {
      if (!barRef.current) return;

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      barRef.current.style.transform = 'scaleX(1)';

      setTimeout(() => {
        if (!barRef.current) return;
        barRef.current.style.opacity = '0';
        barRef.current.style.transform = 'scaleX(0)';
      }, 300);
    };

    router.hook.addEventListener('load:start', start);
    router.hook.addEventListener('load:end', end);

    return () => {
      router.hook.removeEventListener('load:start', start);
      router.hook.removeEventListener('load:end', end);
    };
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: '#2f64f8bc',
        transformOrigin: 'left',
        transform: 'scaleX(0)',
        opacity: 0,
        transition: 'transform 0.2s ease, opacity 0.2s ease',
        zIndex: 9999,
      }}
    />
  );
}
