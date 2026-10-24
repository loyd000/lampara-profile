import { company } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="pt-16 pb-10" style={{ background: 'var(--color-night)', color: 'var(--color-night-ink)', ['--muted' as string]: 'var(--color-night-muted)' }}>
      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div className="note text-soft flex flex-col gap-1.5">
            <p>{company.address}</p>
            <p>{company.phones.join(' · ')}</p>
            <p>{company.website}</p>
          </div>
          <p className="note text-soft">© {new Date().getFullYear()} {company.full}</p>
        </div>
        <div className="mt-14 flex items-center gap-4" aria-hidden="true">
          <img src="/assets/brand/lampara-mark.png" alt="" width={56} height={110} className="h-[clamp(36px,10vw,120px)] w-auto" />
          <p className="text-[clamp(44px,13vw,160px)] leading-none font-light tracking-[-0.03em]">LAMPARA</p>
        </div>
      </div>
    </footer>
  );
}
