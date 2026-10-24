// Site and presentation content shared by the home page and /deck (exported to PDF with `npm run pdf`).
// Drawn from the LAMPARA company profile (as of May 2026): real project numbers, real team, real licenses.
// Sample content where the source profile left a gap is marked inline — confirm before publishing.

export const company = {
  name: 'LAMPARA',
  full: 'Lampara Electrical Installation Services',
  tagline: 'Electrical Installation Services',
  founded: 2019,
  owner: 'Engr. John Karlo Mitra De Guzman',
  ownerTitle: 'CEO / Proprietor',
  address: 'Maligaya St, Lusacan, Tiaong, Quezon, 4325',
  // Numbers read off project-photo watermarks in the source profile — confirm exact digits before publishing.
  phones: ['+63 966 314 5852', '+63 970 783 4005'],
  website: 'lamparaeis.com',
  // No contact address is stated in the source profile — sample, confirm before publishing.
  email: 'info@lamparaeis.com',
};

export const about = {
  // Condensed from the "Who We Are" page of the May 2026 company profile, kept to the company's
  // own words and story — no stats, no staff count, no individual's professional history.
  paragraph:
    'In 2019, LAMPARA embarked on a journey within the electrical industry, with a focus on advancing both conventional and renewable energy systems and redefining standards in electrical design, manufacturing, installation and service for residential and commercial projects alike. From site explorations and resource assessments to procurement and operational oversight, every project has been an opportunity to refine our process and sharpen our capabilities. At the heart of it all is client satisfaction: each engineering solution tailored to the client it is built for, and every partnership built on trust.',
  facts: [
    ['Founded', '2019'],
    ['Based in', 'Tiaong, Quezon'],
  ] as [string, string][],
  credentials: [
    ['DTI', 'Business name registered nationally, No. 1975327'],
    ['Municipality of Tiaong', 'Business permit for electrical installation'],
    ['BIR', 'Registered, TIN 364-923-009-00000'],
  ] as [string, string][],
};

export const mission = 'Drive innovation and continuous improvement while committing to sustainability, social responsibility, and an inclusive workplace, with the goal of creating long-term value, ethical growth, and a positive impact beyond financial success.';
export const vision = 'Become a leading global electrical contracting company by delivering affordable, reliable, and high-quality services, driven by innovation, skilled professionals, and strong client relationships.';

export const services: [string, string][] = [
  ['Electrical design & planning', 'Comprehensive design and planning tailored to each client and project.'],
  ['Installation & commissioning', 'Professional installation executed with precision and attention to detail.'],
  ['Maintenance & repair', 'Proactive upkeep that maximizes equipment lifespan and minimizes downtime.'],
  ['Energy audits', 'Efficiency assessments that identify where clients can cut energy costs.'],
  ['Safety inspections', 'Rigorous compliance testing against industry standards and regulations.'],
  ['Consultation & project management', 'Guidance through every step, from initial planning to final execution.'],
  ['Emergency response', 'Responsive troubleshooting that minimizes disruption when issues come up.'],
];

export const process: [string, string][] = [
  ['Site assessment', 'A free on-site survey of the roof, load and electrical setup, the same form our surveyors have used for every job since day one.'],
  ['Engineering & design', 'A system sized to the site and the bill, specified down to the inverter and racking.'],
  ['Permits & procurement', 'Utility and LGU paperwork handled, materials sourced from reputable manufacturers.'],
  ['Installation & commissioning', 'Crew-led install, tested and energized, with a formal handover.'],
  ['Monitoring & after-sales', 'Warranty service and performance checks for as long as the system runs.'],
];

export type Project = { slug: string; location: string; system: string; type: 'Grid-Tie' | 'Hybrid' | ''; image: string };

export const commercialProjects: Project[] = [
  { slug: 'c01', location: 'Quezon City', system: '10.4 kWp', type: '', image: '/assets/work/commercial/01-quezon-city.webp' },
  { slug: 'c02', location: 'Isabela', system: '60.0 kWp', type: '', image: '/assets/work/commercial/02-isabela.webp' },
  { slug: 'c03', location: 'Sta. Rosa, Laguna', system: '200 kWp', type: '', image: '/assets/work/commercial/03-sta-rosa-laguna.webp' },
  { slug: 'c04', location: 'Batangas City', system: '2 MW', type: '', image: '/assets/work/commercial/04-batangas-city-2mw.webp' },
  { slug: 'c05', location: 'Tarlac City', system: '550 kWp', type: '', image: '/assets/work/commercial/05-tarlac-city.webp' },
  { slug: 'c06', location: 'Valenzuela', system: '350 kWp', type: '', image: '/assets/work/commercial/06-valenzuela.webp' },
  { slug: 'c07', location: 'Batangas City', system: '738 kWp', type: '', image: '/assets/work/commercial/07-batangas-city-738.webp' },
  { slug: 'c08', location: 'Bulacan', system: '700 kWp', type: '', image: '/assets/work/commercial/08-bulacan.webp' },
  { slug: 'c09', location: 'Makati City', system: '91.0 kWp', type: '', image: '/assets/work/commercial/09-makati-city.webp' },
  { slug: 'c10', location: 'Cebu City', system: '730 kWp', type: '', image: '/assets/work/commercial/10-cebu-city.webp' },
];

export const residentialProjects: Project[] = [
  { slug: 'r01', location: 'Candelaria, Quezon', system: '6.0 kWp', type: 'Grid-Tie', image: '/assets/work/residential/01-candelaria.webp' },
  { slug: 'r02', location: 'Sta. Rosa, Laguna', system: '11.0 kWp', type: 'Grid-Tie', image: '/assets/work/residential/02-sta-rosa-laguna.webp' },
  { slug: 'r03', location: 'Tiaong, Quezon', system: 'Hybrid', type: 'Hybrid', image: '/assets/work/residential/03-tiaong-quezon.webp' },
  { slug: 'r04', location: 'Muntinlupa City', system: '45.0 kWp', type: 'Grid-Tie', image: '/assets/work/residential/04-muntinlupa-city.webp' },
  { slug: 'r05', location: 'Bulacan', system: 'Hybrid', type: 'Hybrid', image: '/assets/work/residential/05-bulacan.webp' },
  { slug: 'r06', location: 'Bulacan', system: 'Hybrid', type: 'Hybrid', image: '/assets/work/residential/06-bulacan.webp' },
  { slug: 'r07', location: 'Malabon', system: 'Hybrid', type: 'Hybrid', image: '/assets/work/residential/07-malabon.webp' },
  { slug: 'r08', location: 'Malabon', system: '18.7 kWp', type: 'Grid-Tie', image: '/assets/work/residential/08-malabon.webp' },
  { slug: 'r09', location: 'Tiaong, Quezon', system: 'Hybrid', type: 'Hybrid', image: '/assets/work/residential/09-tiaong-quezon.webp' },
  { slug: 'r10', location: 'Padre Garcia, Batangas', system: '18.6 kWp', type: 'Hybrid', image: '/assets/work/residential/10-padre-garcia-batangas.webp' },
  { slug: 'r11', location: 'Laguna', system: '6.0 kWp', type: 'Grid-Tie', image: '/assets/work/residential/11-laguna.webp' },
  { slug: 'r12', location: 'Cavite', system: '14.0 kWp', type: 'Grid-Tie', image: '/assets/work/residential/12-cavite.webp' },
  { slug: 'r13', location: 'Navotas, Metro Manila', system: '8.54 kWp', type: 'Hybrid', image: '/assets/work/residential/13-navotas.webp' },
  { slug: 'r14', location: 'Cavite', system: '6.25 kWp', type: 'Hybrid', image: '/assets/work/residential/14-cavite.webp' },
  { slug: 'r15', location: 'Pagbilao, Quezon', system: '6.0 kWp', type: 'Hybrid', image: '/assets/work/residential/15-pagbilao-quezon.webp' },
  { slug: 'r16', location: 'Las Piñas', system: '10.0 kWp', type: 'Grid-Tie', image: '/assets/work/residential/16-las-pinas.webp' },
  { slug: 'r17', location: 'Sampaloc, Manila', system: '17.0 kWp', type: 'Hybrid', image: '/assets/work/residential/17-sampaloc-manila.webp' },
  { slug: 'r18', location: 'Quezon City', system: '7.0 kWp', type: 'Hybrid', image: '/assets/work/residential/18-quezon-city.webp' },
  { slug: 'r19', location: 'Candelaria, Quezon', system: '6.0 kWp', type: 'Hybrid', image: '/assets/work/residential/19-candelaria.webp' },
  { slug: 'r20', location: 'Sariaya, Quezon', system: '6.0 kWp', type: 'Hybrid', image: '/assets/work/residential/20-sariaya-quezon.webp' },
  { slug: 'r21', location: 'Tiaong, Quezon', system: '8.0 kWp', type: 'Hybrid', image: '/assets/work/residential/21-tiaong-quezon.webp' },
  { slug: 'r22', location: 'Pagbilao, Quezon', system: '3.0 kWp', type: 'Grid-Tie', image: '/assets/work/residential/22-pagbilao-quezon.webp' },
];

/** A curated subset of each category for the homepage tour; "See all" links to the full list. */
export const commercialFeatured: Project[] = ['c04', 'c10', 'c09', 'c05', 'c03'].map(s => commercialProjects.find(p => p.slug === s)!);
export const residentialFeatured: Project[] = ['r04', 'r08', 'r10', 'r09', 'r16'].map(s => residentialProjects.find(p => p.slug === s)!);

export const farmProjects: Project[] = [
  { slug: 'f01', location: 'Solar farm installation', system: 'Utility-scale ground mount', type: '', image: '/assets/work/farm/01-overview.webp' },
  { slug: 'f02', location: 'Solar farm installation', system: 'Racking and inverters', type: '', image: '/assets/work/farm/02-array.webp' },
  { slug: 'f03', location: 'Solar farm installation', system: 'Crew on site', type: '', image: '/assets/work/farm/03-crew.webp' },
];

export const streetlightProjects: Project[] = [
  { slug: 's01', location: 'Brgy. Cabang, Tiaong, Quezon', system: '50pcs 50W solar street lights', type: '', image: '/assets/work/streetlights/01-barangay-cabang.webp' },
  { slug: 's02', location: 'Solar component supply', system: '330pcs solar street lights, 50–300W', type: '', image: '/assets/work/streetlights/02-components.webp' },
];

export const credentials: { year: string; title: string; body: string; detail: string }[] = [
  { year: '2025', title: 'Business Name Registration', body: 'Department of Trade and Industry', detail: 'National, No. 1975327' },
  { year: '2026', title: 'Business Permit', body: 'Municipality of Tiaong, Quezon', detail: 'Electrical installation' },
  { year: '', title: 'BIR Registration', body: 'Bureau of Internal Revenue', detail: 'TIN 364-923-009-00000' },
  { year: '', title: 'Solis inverter installer training', body: 'Manila', detail: 'Completed' },
  { year: '', title: 'Solis inverter installer training', body: 'Pampanga', detail: 'Completed' },
  { year: '', title: 'Solis inverter installer training', body: 'Cebu', detail: 'Completed' },
  { year: '', title: 'Solis inverter installer training', body: 'Lucena', detail: 'Completed' },
];

/** Scans of the registration documents, shown beside the credentials list. */
export const permits: { title: string; body: string; image: string }[] = [
  { title: 'DTI Business Name Registration', body: 'No. 1975327, valid to July 2030', image: '/assets/work/company/permit-dti.webp' },
  { title: 'Business Permit', body: 'Municipality of Tiaong, Quezon, 2026', image: '/assets/work/company/permit-business.webp' },
  { title: 'BIR Registration', body: 'TIN 364-923-009-00000', image: '/assets/work/company/permit-bir.webp' },
];

export const products: string[] = [
  'High-quality electrical wiring and installation materials',
  'Energy-efficient, environmentally friendly lighting fixtures',
  'Power distribution equipment designed for safety and performance',
  'Solar panels and wind turbines for renewable energy',
  'Control systems and automation technology',
];
