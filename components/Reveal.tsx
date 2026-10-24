'use client';

// Entrance for the parts of a section: hidden only once JS confirms it can animate and observe,
// so a script-free visit never leaves content invisible. Children stagger via the --i custom property.
import { useEffect, useRef } from 'react';

export default function Reveal({ as: Tag = 'div', className = '', style, children }: { as?: 'div' | 'ul' | 'ol' | 'dl'; className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.classList.add('reveal-armed');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} data-reveal="" className={className} style={style}>
      {children}
    </Tag>
  );
}
