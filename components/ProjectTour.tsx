'use client';

// A pinned, scroll-scrubbed horizontal tour: the section holds its place while the page scrolls
// past it, and that scroll drives the row sideways — native scroll throughout (no wheel capture),
// so a screen reader, a reduced-motion visit or a failed script just gets the row as a normal,
// draggable horizontal strip (the default markup below, before any JS upgrades it).
import { useEffect, useRef, type ReactNode } from 'react';
import type { Project } from '@/lib/content';

export default function ProjectTour({ projects, head }: { projects: Project[]; head?: ReactNode }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return; // the tour is a desktop/tablet move; phones keep the native strip

    let st: import('gsap/ScrollTrigger').ScrollTrigger | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      // Frames have fixed widths, so the row's scroll distance is known without waiting for images.
      // The row stays its own scroll container; the page's scroll sets its scrollLeft.
      const distance = () => track.scrollWidth - track.clientWidth;
      if (distance() <= 0) return;
      track.style.overflowX = 'hidden';
      track.style.scrollSnapType = 'none';
      st = ScrollTrigger.create({
        trigger: pin,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: self => { track.scrollLeft = distance() * self.progress; },
      });
    })();

    return () => {
      cancelled = true;
      st?.kill();
      track.style.overflowX = '';
      track.style.scrollSnapType = '';
      track.scrollLeft = 0;
    };
  }, []);

  return (
    <div ref={pinRef} className="overflow-hidden md:flex md:h-dvh md:flex-col md:justify-center md:pt-16">
      {head}
      <div ref={trackRef} className="mt-8 flex gap-5 overflow-x-auto md:mt-10 px-4 pb-2 md:gap-8 md:px-[max(1.5rem,calc((100vw_-_1400px)/2_+_1.5rem))] md:pb-0" style={{ scrollSnapType: 'x mandatory' }}>
        {projects.map(p => (
          <figure key={p.slug} className="w-[78vw] shrink-0 sm:w-[56vw] md:w-[42vw] lg:w-[34vw]" style={{ scrollSnapAlign: 'center' }}>
            <img src={p.image} alt={`${p.location} installation`} width={1200} height={800} loading="lazy" className="block aspect-[4/3] h-auto w-full rounded-2xl object-cover" />
            <figcaption className="mt-4 flex items-baseline justify-between gap-4">
              <span className="text-[18px]">{p.location}</span>
              <span className="note text-soft">{p.system}</span>
            </figcaption>
          </figure>
        ))}
        <div className="shrink-0" style={{ width: 1 }} aria-hidden="true" />
      </div>
    </div>
  );
}
