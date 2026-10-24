import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import ProjectTour from '@/components/ProjectTour';
import {
  about, commercialProjects, company, credentials, farmProjects, mission, permits, process,
  residentialProjects, services, vision,
} from '@/lib/content';
import { featuredIn } from '@/lib/uploads';

export const metadata: Metadata = {
  title: 'LAMPARA | Electrical Installation Services',
  description: 'Solar and electrical design, installation and after-sales for homes, businesses and utility-scale sites across the Philippines, since 2019.',
};

// Uploads trigger a refresh, but Blob reads can lag a write by a few seconds; re-check every minute too.
export const revalidate = 60;

const WRAP ='mx-auto max-w-[1400px] px-4 md:px-6';
const PAD = 'py-24 md:py-32';
const H2 = 'text-[clamp(34px,4vw,56px)] leading-[1.05] font-light';

function CategoryHead({ title, note, href }: { title: string; note: string; href: string }) {
  return (
    <div className={`${WRAP} flex w-full flex-wrap items-end justify-between gap-6`}>
      <div>
        <h3 className="text-[clamp(26px,2.6vw,36px)] leading-[1.1] font-light">{title}</h3>
        <p className="note text-soft mt-2">{note}</p>
      </div>
      <a href={href} className="btn btn-line">See all projects <span aria-hidden="true">→</span></a>
    </div>
  );
}

export default async function Home() {
  const [commercialFeatured, residentialFeatured] = await Promise.all([featuredIn('commercial'), featuredIn('residential')]);
  return (
    <>
      <Header />
      <main id="main">
        <Hero />

        {/* Who we are */}
        <section id="about" className={`day ${PAD}`} aria-labelledby="about-title">
          <div className={WRAP}>
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <h2 id="about-title" className={H2}>Redefining electrical standards</h2>
              <p className="max-w-[60ch] text-[18px] leading-[1.6] lg:pt-2">{about.paragraph}</p>
            </div>
            <Reveal as="div" className="mt-14 grid gap-4 md:grid-cols-3">
              <article className="card card-photo flex min-h-[340px] flex-col justify-end p-6" style={{ '--i': 0 } as never}>
                <img src={residentialProjects[1].image} alt="" width={658} height={386} loading="lazy" />
                <div>
                  <h3 className="text-[24px] leading-[1.15] font-light">Our mission</h3>
                  <p className="note text-soft mt-3">{mission}</p>
                </div>
              </article>
              <article className="card card-ink flex min-h-[340px] flex-col justify-end p-6" style={{ '--i': 1 } as never}>
                <div>
                  <h3 className="text-[24px] leading-[1.15] font-light">Our vision</h3>
                  <p className="note text-soft mt-3">{vision}</p>
                </div>
              </article>
              <article className="card card-white flex min-h-[340px] flex-col justify-end p-6" style={{ '--i': 2 } as never}>
                <div>
                  <h3 className="text-[24px] leading-[1.15] font-light">Rooted in Tiaong, Quezon</h3>
                  <p className="note text-soft mt-3">Founded in {about.facts[0][1]}, serving homes, businesses and institutions across the Philippines from our base in Quezon province.</p>
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        {/* Work: a few chosen projects per category, toured sideways as the page scrolls */}
        <section id="projects" className={`night ${PAD}`} aria-labelledby="work-title">
          <div className={WRAP}>
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <h2 id="work-title" className={`${H2} max-w-[16ch]`}>Every photo here is a finished job.</h2>
              <p className="text-soft max-w-[52ch] text-[18px] leading-[1.6] lg:pt-2">Completed LAMPARA installations, not renders and not stock roofs. Below are a few from each kind of work we do; every project is a click away.</p>
            </div>
          </div>

          <div className="mt-16 md:mt-10">
            <ProjectTour projects={commercialFeatured} head={<CategoryHead title="Commercial & industrial" note="Rooftop systems for factories, offices and institutions." href="/projects/commercial" />} />
          </div>

          <div className="mt-20 md:mt-0">
            <ProjectTour projects={residentialFeatured} head={<CategoryHead title="Residential" note="Grid-tie and hybrid systems for homes." href="/projects/residential" />} />
          </div>

          <div className={`${WRAP} mt-20 md:mt-24`}>
            <h3 className="text-[clamp(26px,2.6vw,36px)] leading-[1.1] font-light">Solar farm</h3>
            <p className="note text-soft mt-2">Utility-scale ground mount, from racking to inverters.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-[2fr_1fr] md:grid-rows-2">
              <img src={farmProjects[0].image} alt="Solar farm installation, inverters along the array" width={1348} height={758} loading="lazy" className="aspect-[16/10] h-auto w-full rounded-2xl object-cover md:row-span-2 md:aspect-auto md:h-full" />
              <img src={farmProjects[1].image} alt="Solar farm installation, racking under construction" width={740} height={555} loading="lazy" className="aspect-[4/3] h-auto w-full rounded-2xl object-cover" />
              <img src={farmProjects[2].image} alt="Solar farm installation, crew on site" width={740} height={555} loading="lazy" className="aspect-[4/3] h-auto w-full rounded-2xl object-cover" />
            </div>
          </div>
        </section>

        {/* Services: bento */}
        <section id="services" className={`day ${PAD}`} aria-labelledby="services-title">
          <div className={WRAP}>
            <h2 id="services-title" className={H2}>Services that fit the job</h2>
            <Reveal as="div" className="mt-12 grid gap-4 md:auto-rows-[230px] md:grid-cols-4">
              {services.slice(0, 1).map(([t, d]) => <ServiceCard key={t} title={t} text={d} i={0} />)}
              <article className="card card-photo flex min-h-[320px] flex-col justify-end p-6 md:col-span-2 md:col-start-2 md:row-span-2 md:row-start-1" style={{ '--i': 1 } as never}>
                <img src={commercialProjects[6].image} alt="" width={854} height={480} loading="lazy" />
                <h3 className="max-w-[12ch] text-[clamp(30px,3vw,44px)] leading-[1.05] font-light">One team, every circuit</h3>
                <p className="note text-soft mt-3 max-w-[44ch]">From the first site visit to the warranty call, the same crew designs, installs and services your system.</p>
              </article>
              {services.slice(1).map(([t, d], n) => <ServiceCard key={t} title={t} text={d} i={n + 2} dark={n === 2} />)}
              <article className="card card-ink flex flex-col justify-between p-6" style={{ '--i': 9 } as never}>
                <p className="text-[20px] leading-[1.25] font-light">Not sure what you need?</p>
                <a href="#contact" className="btn btn-yellow self-start">Book a site assessment</a>
              </article>
            </Reveal>
          </div>
        </section>

        {/* How a project runs */}
        <section id="process" className={`night ${PAD}`} aria-labelledby="process-title">
          <div className={`${WRAP} grid gap-12 lg:grid-cols-[1fr_minmax(0,560px)]`}>
            <div className="flex flex-col justify-between gap-10">
              <div>
                <h2 id="process-title" className={`${H2} max-w-[12ch]`}>From site visit to switched on</h2>
              </div>
              <p className="note text-soft max-w-[40ch]">One team from start to finish, with warranty service for as long as the system runs.</p>
            </div>
            <Reveal as="ol" className="m-0 flex list-none flex-col gap-3 p-0">
              {process.map(([title, text], i) => (
                <li key={title} className="card card-glass p-6" style={{ '--i': i } as never}>
                  <h3 className="text-[20px] leading-[1.2] font-light">{title}</h3>
                  <p className="note text-soft mt-1.5">{text}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Credentials */}
        <section id="credentials" className={`day ${PAD}`} aria-labelledby="credentials-title">
          <div className={`${WRAP} grid gap-10 lg:grid-cols-[1fr_1.6fr]`}>
            <div>
              <h2 id="credentials-title" className={`${H2} max-w-[10ch]`}>Licensed and trained</h2>
              <p className="text-soft mt-5 max-w-[40ch] text-[18px] leading-[1.6]">Registered with the national and local government, and trained by the manufacturer on the inverters we install.</p>
            </div>
            <div className="card card-white overflow-x-auto p-2">
              <table className="text-left text-[16px]">
                <tbody>
                  {credentials.map((c, i) => (
                    <tr key={c.title + c.body} style={i % 2 ? { background: 'var(--color-bg)' } : undefined}>
                      <td className="rounded-l-lg py-4 pl-4">{c.title}</td>
                      <td className="text-soft py-4 pl-4">{c.body}</td>
                      <td className="note text-soft rounded-r-lg py-4 pr-4 text-right">{c.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <ul className={`${WRAP} m-0 mt-10 grid list-none gap-4 p-0 md:grid-cols-3`}>
            {permits.map(p => (
              <li key={p.title} className="card card-white p-4">
                <a href={p.image} target="_blank" rel="noopener" className="block rounded-lg" style={{ background: 'var(--color-bg)' }}>
                  <img src={p.image} alt={`${p.title} certificate`} loading="lazy" className="block h-[340px] w-full object-contain p-3" />
                </a>
                <h3 className="mt-4 text-[18px] leading-[1.25] font-normal">{p.title}</h3>
                <p className="note text-soft mt-1">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section id="contact" className={`night ${PAD}`} aria-labelledby="contact-title">
          <div className={`${WRAP} grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]`}>
            <div>
              <h2 id="contact-title" className={H2}>Your roof could be next.</h2>
              <p className="text-soft mt-5 max-w-[46ch] text-[18px] leading-[1.6]">Tell us about your home or site and we will arrange a site assessment. We usually reply within a business day.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${company.email}?subject=${encodeURIComponent('Site assessment request')}`} className="btn btn-yellow">Email {company.email}</a>
                <a href={`tel:${company.phones[0].replace(/\s/g, '')}`} className="btn btn-line">Call {company.phones[0]}</a>
              </div>
              <p className="note text-soft mt-6">{company.address}</p>
            </div>
            <img src={residentialProjects[3].image} alt="Completed residential installation, Muntinlupa City" width={675} height={429} loading="lazy" className="aspect-[4/3] h-auto w-full rounded-2xl object-cover" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ServiceCard({ title, text, i, dark = false }: { title: string; text: string; i: number; dark?: boolean }) {
  return (
    <article className={`card ${dark ? 'card-ink' : 'card-white'} flex flex-col justify-end gap-6 p-6`} style={{ '--i': i } as never}>
      <div>
        <h3 className="text-[20px] leading-[1.25] font-light">{title}</h3>
        <p className="note text-soft mt-2">{text}</p>
      </div>
    </article>
  );
}
