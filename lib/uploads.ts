// Photos uploaded through /admin. The images live in Vercel Blob; their captions live in one JSON
// manifest beside them (newest first). Without BLOB_READ_WRITE_TOKEN (local dev) there are no
// uploads and the site shows only the projects in content.ts.
import { del, get, put } from '@vercel/blob';
import { commercialFeatured, commercialProjects, residentialFeatured, residentialProjects, type Project } from './content';

export type Category = 'commercial' | 'residential';
export type Upload = Project & { category: Category; uploadedAt: string };

const MANIFEST = 'cms/projects.json';
export const cmsEnabled = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

// Throws on a storage error so a write never replaces the list with a partial one; null means "no uploads yet".
async function readUploads(): Promise<Upload[]> {
  const res = await get(MANIFEST, { access: 'public', useCache: false });
  if (!res) return [];
  if (res.statusCode !== 200) throw new Error(`CMS: unexpected status ${res.statusCode}`);
  return JSON.parse(await new Response(res.stream).text());
}

/** For pages: a storage problem shows the built-in projects instead of an error. */
export async function getUploads(): Promise<Upload[]> {
  if (!cmsEnabled()) return [];
  try {
    return await readUploads();
  } catch (e) {
    console.error('CMS: could not read uploads', e);
    return [];
  }
}

// ponytail: read-modify-write on one file; fine for one person uploading at a time.
async function saveUploads(list: Upload[]) {
  await put(MANIFEST, JSON.stringify(list), {
    access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 60,
  });
}

export async function addUpload(photo: File, meta: Omit<Upload, 'slug' | 'image' | 'uploadedAt'>) {
  const name = meta.location.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'project';
  const list = await readUploads();
  const blob = await put(`projects/${meta.category}/${name}.jpg`, photo, { access: 'public', addRandomSuffix: true, contentType: photo.type });
  list.unshift({ ...meta, slug: `u${Date.now()}`, image: blob.url, uploadedAt: new Date().toISOString() });
  await saveUploads(list);
}

export async function removeUpload(slug: string) {
  const list = await readUploads();
  const gone = list.find(u => u.slug === slug);
  if (!gone) return;
  await saveUploads(list.filter(u => u !== gone));
  await del(gone.image).catch(e => console.error('CMS: could not delete image', e));
}

const BUILT_IN = { commercial: commercialProjects, residential: residentialProjects };
const BUILT_IN_FEATURED = { commercial: commercialFeatured, residential: residentialFeatured };

/** Every project in a category, newest uploads first. */
export async function projectsIn(category: Category): Promise<Project[]> {
  const uploads = (await getUploads()).filter(u => u.category === category);
  return [...uploads, ...BUILT_IN[category]];
}

/** The homepage tour: the latest uploads, topped up with the curated picks to five. */
export async function featuredIn(category: Category): Promise<Project[]> {
  const uploads = (await getUploads()).filter(u => u.category === category);
  return [...uploads, ...BUILT_IN_FEATURED[category]].slice(0, 5);
}
