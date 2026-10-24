'use server';

import { revalidatePath } from 'next/cache';
import { isAdmin, signIn, signOut } from '@/lib/admin-auth';
import { addUpload, removeUpload, type Category } from '@/lib/uploads';

const CATEGORIES: Category[] = ['commercial', 'residential'];
const TYPES = ['', 'Grid-Tie', 'Hybrid'] as const;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function refreshSite() {
  revalidatePath('/');
  revalidatePath('/projects/[category]', 'page');
  revalidatePath('/deck');
  revalidatePath('/admin');
}

export async function login(_: string | null, form: FormData) {
  if (await signIn(String(form.get('password') ?? ''))) {
    revalidatePath('/admin');
    return null;
  }
  return 'That password is not right.';
}

export async function logout() {
  await signOut();
  revalidatePath('/admin');
}

export async function addProject(form: FormData): Promise<string | null> {
  if (!(await isAdmin())) return 'Your session ended. Reload the page and sign in again.';

  const photo = form.get('photo');
  const category = String(form.get('category'));
  const location = String(form.get('location') ?? '').trim();
  const system = String(form.get('system') ?? '').trim();
  const type = String(form.get('type') ?? '') as (typeof TYPES)[number];

  if (!(photo instanceof File) || !IMAGE_TYPES.includes(photo.type)) return 'Choose a JPG, PNG or WebP photo.';
  if (photo.size > 4 * 1024 * 1024) return 'That photo is too large (4 MB at most).';
  if (!CATEGORIES.includes(category as Category)) return 'Choose a category.';
  if (!location || location.length > 80) return 'Enter the location (up to 80 characters).';
  if (!system || system.length > 40) return 'Enter the system size, e.g. 8.0 kWp (up to 40 characters).';
  if (!TYPES.includes(type)) return 'Choose a system type.';

  try {
    await addUpload(photo, { category: category as Category, location, system, type });
  } catch (e) {
    console.error('CMS: upload failed', e);
    return 'The upload did not go through. Check your connection and try again.';
  }
  refreshSite();
  return null;
}

export async function deleteProject(form: FormData) {
  if (!(await isAdmin())) return;
  try {
    await removeUpload(String(form.get('slug')));
  } catch (e) {
    console.error('CMS: delete failed', e); // the item stays listed, so the admin sees it was not removed
  }
  refreshSite();
}
