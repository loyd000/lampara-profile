'use client';

import { useEffect, useRef, useState } from 'react';

const links: [string, string][] = [['/#projects', 'Projects'], ['/#process', 'Process'], ['/#credentials', 'Credentials'], ['/#contact', 'Contact']];

export default function Header() {
  const [open, setOpen] = useState(false);
  const nav = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => { if (!nav.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey); };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-20 h-16" style={{ background: 'var(--color-night)', color: 'var(--color-night-ink)' }}>
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between px-4 md:px-6">
        <a href="/" className="flex min-h-11 items-center gap-2.5 text-[18px] font-normal tracking-[-0.01em]" aria-label="LAMPARA home">
          <img src="/assets/brand/lampara-mark.png" alt="" width={28} height={55} className="h-6 w-auto" />
          LAMPARA
        </a>
        <nav className="hidden items-center gap-7 text-[15px] md:flex" aria-label="Main navigation">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="min-h-11 content-center opacity-80 hover:opacity-100">{label}</a>
          ))}
          <a href="/#contact" className="btn btn-yellow ml-1 min-h-10 px-5 text-[15px]">Get a quote</a>
        </nav>
        <div className="relative md:hidden" ref={nav}>
          <button type="button" className="btn btn-line min-h-11 px-4 text-[15px]" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(v => !v)}>
            {open ? 'Close' : 'Menu'}
          </button>
          <nav id="mobile-nav" className="card absolute right-0 top-13 flex w-52 flex-col gap-1 p-2" style={{ background: 'var(--color-night-2)', border: '1px solid rgba(233, 237, 244, 0.1)' }} aria-label="Mobile navigation" hidden={!open}>
            {links.map(([href, label]) => (
              <a key={href} href={href} className="flex min-h-11 items-center rounded-lg px-3 hover:bg-white/5" onClick={() => setOpen(false)}>{label}</a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
