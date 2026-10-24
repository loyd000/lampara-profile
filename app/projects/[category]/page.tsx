import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { projectsIn, type Category } from '@/lib/uploads';

const CATEGORIES: Record<string, { title: string; note: string }> = {
  commercial: { title: 'Commercial & industrial', note: 'Rooftop systems for factories, offices and institutions.' },
  residential: { title: 'Residential', note: 'Grid-tie and hybrid systems for homes.' },
};

export const dynamicParams = false;
export const revalidate = 60; // backstop for uploads, see app/page.tsx
export function generateStaticParams() {
  return Object.keys(CATEGORIES).map(category => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const c = CATEGORIES[(await params).category];
  return { title: c ? `${c.title} projects | LAMPARA` : 'Projects | LAMPARA' };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = CATEGORIES[category];
  if (!c) notFound();
  const projects = await projectsIn(category as Category);
  const other = c === CATEGORIES.commercial ? ['residential', 'Residential'] : ['commercial', 'Commercial & industrial'];

  return (
    <>
      <Header />
      <main id="main" className="day min-h-dvh pt-32 pb-24 md:pt-40">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6">
          <a href="/#projects" className="note text-soft inline-flex min-h-11 items-center hover:opacity-80">← Back to the work</a>
          <h1 className="mt-6 text-[clamp(40px,5vw,72px)] leading-[1.02] font-light">{c.title}</h1>
          <p className="note text-soft mt-4 max-w-[60ch]">{c.note}</p>

          <ul className="m-0 mt-14 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <li key={p.slug} className="card card-white p-2.5">
                <img src={p.image} alt={`${p.location} installation`} width={900} height={675} loading={i < 3 ? undefined : 'lazy'} className="block aspect-[4/3] h-auto w-full rounded-xl object-cover" />
                <p className="flex items-baseline justify-between gap-4 px-2 pt-4 pb-2">
                  <span className="text-[18px]">{p.location}</span>
                  <span className="note text-soft">{p.type ? `${p.system === 'Hybrid' ? '' : p.system + ' · '}${p.type}` : p.system}</span>
                </p>
              </li>
            ))}
          </ul>

          <div className="card card-ink mt-16 flex flex-wrap items-center justify-between gap-6 p-8">
            <p className="text-[clamp(22px,2.2vw,30px)] leading-[1.2] font-light">Want one of these on your roof?</p>
            <div className="flex flex-wrap gap-3">
              <a href={`/projects/${other[0]}`} className="btn btn-line">{other[1]} projects</a>
              <a href="/#contact" className="btn btn-yellow">Request a quote</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
