import type { Metadata } from 'next';
import {
  about, commercialProjects, company, credentials, farmProjects, mission, permits, process,
  residentialProjects, services, vision, type Project,
} from '@/lib/content';
import { projectsIn } from '@/lib/uploads';
import PrintOnLoad from '@/components/PrintOnLoad';

export const revalidate = 60; // picks up admin uploads, like the homepage

// 16:9 presentation version of the site for clients who prefer a PDF. Every <Slide> is one
// 1920x1080 page; `npm run pdf` prints this route to public/LAMPARA-Company-Profile.pdf.
// Same night/day grounds, cards and type as the site; the cover uses a still of the hero's light rays.
export const metadata: Metadata = {
  title: 'LAMPARA | Company profile',
  robots: { index: false, follow: false },
};

// Projects go 3 to a page; a remainder of 1 or 2 joins the last page so no page is left near-empty.
function paginate(list: Project[], per = 3) {
  const pages: Project[][] = [];
  for (let i = 0; i < list.length; i += per) pages.push(list.slice(i, i + per));
  if (pages.length > 1 && pages[pages.length - 1].length < per) pages[pages.length - 2].push(...pages.pop()!);
  return pages;
}
const FIRST_COMMERCIAL = 3;
// Chrome embeds WebP losslessly in a PDF but passes JPEG through, so the deck uses JPEG copies
// (admin uploads are already JPEG).
const jpg = (src: string) => src.replace(/\.webp$/, '.jpg');
const H2 = 'text-[76px] leading-[1.04] font-light tracking-[-0.025em]';
const NOTE = 'text-soft text-[24px] leading-[1.5]';

function Brand({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[0.35em] font-normal tracking-[-0.01em] ${className}`}>
      <img src="/assets/brand/lampara-mark.png" alt="" className="h-[1.15em] w-auto" />
      LAMPARA
    </span>
  );
}

function Slide({ page, total, name, tone, children }: { page: number; total: number; name?: string; tone: 'night' | 'day'; children: React.ReactNode }) {
  return (
    <section
      className={`${tone} relative flex h-[1080px] w-[1920px] shrink-0 flex-col overflow-hidden break-after-page px-28 pt-24 pb-36 last:break-after-auto`}
      // The site's layered CSS gradients print as pattern fills that PDF viewers redraw on every scroll;
      // a pre-rendered still of the same background draws once.
      style={tone === 'night' ? { background: 'var(--color-night) url(/assets/brand/night-bg.jpg) center / cover no-repeat' } : undefined}
    >
      {children}
      {name && (
        <footer className="text-soft absolute right-28 bottom-12 left-28 flex items-center justify-between text-[20px]">
          <span className="flex items-center gap-6"><Brand className="text-[22px]" />{name}</span>
          <span>{page} of {total}</span>
        </footer>
      )}
    </section>
  );
}

function ProjectPage({ page, total, name, title, note, tone, projects }: { page: number; total: number; name: string; title: string; note: string; tone: 'night' | 'day'; projects: Project[] }) {
  return (
    <Slide total={total} page={page} name={name} tone={tone}>
      <div className="flex items-end justify-between gap-16">
        <h2 className={H2}>{title}</h2>
        <p className={`${NOTE} max-w-[560px] text-right`}>{note}</p>
      </div>
      <ul className="m-0 mt-14 grid list-none gap-8 p-0" style={{ gridTemplateColumns: `repeat(${projects.length}, 1fr)` }}>
        {projects.map(p => (
          <li key={p.slug}>
            <img src={jpg(p.image)} alt="" className={`block w-full rounded-3xl object-cover ${projects.length > 3 ? 'aspect-[3/4]' : 'aspect-square'}`} />
            <p className="mt-5 text-[28px] leading-tight">{p.location}</p>
            <p className="text-soft mt-1.5 text-[21px]">{p.type && p.system !== 'Hybrid' ? `${p.system} · ${p.type}` : p.system}</p>
          </li>
        ))}
      </ul>
    </Slide>
  );
}

export default async function Deck() {
  const commercialPages = paginate(await projectsIn('commercial'));
  const residentialPages = paginate(await projectsIn('residential'));
  const FIRST_RESIDENTIAL = FIRST_COMMERCIAL + commercialPages.length;
  const AFTER_PROJECTS = FIRST_RESIDENTIAL + residentialPages.length;
  const total = AFTER_PROJECTS + 5;
  return (
    <main className="flex flex-col items-center gap-10 bg-black py-10 print:gap-0 print:py-0">
      {/* Browser "Save as PDF": one slide per page, backgrounds kept. */}
      <style>{'@page { size: 1920px 1080px; margin: 0; } html, body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }'}</style>
      <PrintOnLoad />
      {/* Cover */}
      <Slide total={total} page={1} tone="night">
        <img src="/assets/brand/rays-cover.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative flex h-full flex-col">
          <Brand className="text-[40px]" />
          <div className="mt-auto">
            <h1 className="text-[140px] leading-[1] font-light tracking-[-0.03em]">Power Outage Worries,<br />No More.</h1>
            <p className="text-soft mt-10 max-w-[900px] text-[30px] leading-[1.5]">
              LAMPARA Electrical Installation Services: licensed solar and electrical installation for homes, businesses and utility-scale sites across the Philippines, since 2019.
            </p>
          </div>
          <p className="text-soft mt-16 text-[22px]">Company profile, {new Date().getFullYear()}</p>
        </div>
      </Slide>

      {/* Who we are */}
      <Slide total={total} page={2} name="Who we are" tone="day">
        <div className="grid grid-cols-[1fr_1.15fr] gap-20">
          <h2 className={H2}>Redefining electrical standards</h2>
          <p className="text-[24px] leading-[1.55]">{about.paragraph}</p>
        </div>
        <div className="mt-auto grid grid-cols-3 gap-6">
          <article className="card card-photo flex h-[380px] flex-col justify-end p-8">
            <img src={jpg(residentialProjects[1].image)} alt="" />
            <h3 className="text-[34px] leading-[1.1] font-light">Our mission</h3>
            <p className="text-soft mt-3 text-[19px] leading-[1.5]">{mission}</p>
          </article>
          <article className="card card-ink flex h-[380px] flex-col justify-end p-8">
            <h3 className="text-[34px] leading-[1.1] font-light">Our vision</h3>
            <p className="text-soft mt-3 text-[19px] leading-[1.5]">{vision}</p>
          </article>
          <article className="card card-white flex h-[380px] flex-col justify-end p-8">
            <h3 className="text-[34px] leading-[1.1] font-light">Rooted in Tiaong, Quezon</h3>
            <p className="text-soft mt-3 text-[19px] leading-[1.5]">Founded in {about.facts[0][1]}, serving homes, businesses and institutions across the Philippines from our base in Quezon province.</p>
          </article>
        </div>
      </Slide>

      {/* Commercial and residential, 3 projects to a page */}
      {commercialPages.map((projects, i) => (
        <ProjectPage total={total} key={`c${i}`} page={FIRST_COMMERCIAL + i} name="Commercial & industrial" tone="night" title="Commercial & industrial" note="Rooftop systems for factories, offices and institutions." projects={projects} />
      ))}
      {residentialPages.map((projects, i) => (
        <ProjectPage total={total} key={`r${i}`} page={FIRST_RESIDENTIAL + i} name="Residential" tone="day" title="Residential" note="Grid-tie and hybrid systems for homes." projects={projects} />
      ))}

      {/* Solar farm */}
      <Slide total={total} page={AFTER_PROJECTS} name="Solar farm" tone="night">
        <div className="flex items-end justify-between gap-16">
          <h2 className={H2}>Solar farm</h2>
          <p className={`${NOTE} max-w-[560px]`}>Utility-scale ground mount, from racking to inverters.</p>
        </div>
        <div className="mt-12 grid min-h-0 flex-1 grid-cols-[2fr_1fr] grid-rows-2 gap-6">
          <img src={jpg(farmProjects[0].image)} alt="" className="row-span-2 h-full min-h-0 w-full rounded-2xl object-cover" />
          <img src={jpg(farmProjects[1].image)} alt="" className="h-full min-h-0 w-full rounded-2xl object-cover" />
          <img src={jpg(farmProjects[2].image)} alt="" className="h-full min-h-0 w-full rounded-2xl object-cover" />
        </div>
      </Slide>

      {/* Services */}
      <Slide total={total} page={AFTER_PROJECTS + 1} name="Services" tone="day">
        <h2 className={H2}>Services that fit the job</h2>
        <div className="mt-12 grid min-h-0 flex-1 grid-cols-4 grid-rows-3 gap-5">
          <ServiceCard title={services[0][0]} text={services[0][1]} />
          <article className="card card-photo col-span-2 col-start-2 row-span-2 row-start-1 flex flex-col justify-end p-8">
            <img src={jpg(commercialProjects[6].image)} alt="" />
            <h3 className="max-w-[12ch] text-[52px] leading-[1.05] font-light">One team, every circuit</h3>
            <p className="text-soft mt-3 max-w-[40ch] text-[20px] leading-[1.5]">From the first site visit to the warranty call, the same crew designs, installs and services your system.</p>
          </article>
          {services.slice(1).map(([t, d], n) => <ServiceCard key={t} title={t} text={d} dark={n === 2} />)}
          <article className="card card-ink flex flex-col justify-between p-7">
            <p className="text-[26px] leading-[1.2] font-light">Not sure what you need?</p>
            <p className="text-[20px] leading-[1.4]" style={{ color: 'var(--color-brand-yellow)' }}>Book a site assessment</p>
          </article>
        </div>
      </Slide>

      {/* Process */}
      <Slide total={total} page={AFTER_PROJECTS + 2} name="How a project runs" tone="night">
        <div className="grid flex-1 grid-cols-[1fr_900px] gap-20">
          <div className="flex flex-col justify-between">
            <h2 className={`${H2} max-w-[11ch]`}>From site visit to switched on</h2>
            <p className={`${NOTE} max-w-[30ch]`}>One team from start to finish, with warranty service for as long as the system runs.</p>
          </div>
          <ol className="m-0 flex list-none flex-col justify-center gap-4 p-0">
            {process.map(([title, text]) => (
              <li key={title} className="card card-glass px-8 py-6">
                <h3 className="text-[28px] leading-[1.2] font-light">{title}</h3>
                <p className="text-soft mt-1.5 text-[19px] leading-[1.45]">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Slide>

      {/* Credentials */}
      <Slide total={total} page={AFTER_PROJECTS + 3} name="Licensed and trained" tone="day">
        <div className="grid flex-1 grid-cols-[1fr_1.7fr] items-center gap-20">
          <div>
            <h2 className={`${H2} max-w-[9ch]`}>Licensed and trained</h2>
            <p className={`${NOTE} mt-8 max-w-[30ch]`}>Registered with the national and local government, and trained by the manufacturer on the inverters we install.</p>
          </div>
          <div className="card card-white p-3">
            <table className="text-left text-[22px]">
              <tbody>
                {credentials.map((c, i) => (
                  <tr key={c.title + c.body} style={i % 2 ? { background: 'var(--color-bg)' } : undefined}>
                    <td className="rounded-l-xl py-5 pl-6">{c.title}</td>
                    <td className="text-soft py-5 pl-6">{c.body}</td>
                    <td className="text-soft rounded-r-xl py-5 pr-6 text-right whitespace-nowrap">{c.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Slide>

      {/* Permits */}
      <Slide total={total} page={AFTER_PROJECTS + 4} name="Permits and registration" tone="day">
        <h2 className={H2}>Permits and registration</h2>
        <ul className="m-0 mt-12 grid min-h-0 flex-1 list-none grid-cols-3 gap-6 p-0">
          {permits.map(p => (
            <li key={p.title} className="card card-white flex min-h-0 flex-col p-5">
              <div className="min-h-0 flex-1 rounded-xl p-4" style={{ background: 'var(--color-bg)' }}>
                <img src={jpg(p.image)} alt="" className="block h-full w-full object-contain" />
              </div>
              <p className="mt-5 text-[26px] leading-tight">{p.title}</p>
              <p className="text-soft mt-1.5 text-[20px]">{p.body}</p>
            </li>
          ))}
        </ul>
      </Slide>

      {/* Closing */}
      <Slide total={total} page={total} tone="night">
        <div className="grid flex-1 grid-cols-[1.1fr_1fr] items-center gap-20">
          <div>
            <h2 className="text-[110px] leading-[1.02] font-light tracking-[-0.03em]">Your roof could be next.</h2>
            <div className="mt-12 flex flex-col gap-3 text-[30px]">
              <p>{company.email}</p>
              <p>{company.phones.join('  ·  ')}</p>
              <p>{company.website}</p>
            </div>
            <p className={`${NOTE} mt-8`}>{company.address}</p>
          </div>
          <img src={jpg(residentialProjects[3].image)} alt="" className="aspect-[4/3] w-full rounded-3xl object-cover" />
        </div>
        <Brand className="mt-10 text-[44px]" />
      </Slide>
    </main>
  );
}

function ServiceCard({ title, text, dark = false }: { title: string; text: string; dark?: boolean }) {
  return (
    <article className={`card ${dark ? 'card-ink' : 'card-white'} flex flex-col justify-end p-7`}>
      <h3 className="text-[26px] leading-[1.2] font-light">{title}</h3>
      <p className="text-soft mt-2 text-[18px] leading-[1.45]">{text}</p>
    </article>
  );
}
