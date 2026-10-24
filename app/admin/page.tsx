import type { Metadata } from 'next';
import { isAdmin } from '@/lib/admin-auth';
import { cmsEnabled, getUploads } from '@/lib/uploads';
import { deleteProject, logout } from './actions';
import { LoginForm, UploadForm } from './forms';

export const metadata: Metadata = { title: 'Admin | LAMPARA', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const CATEGORY_NAMES = { commercial: 'Commercial & industrial', residential: 'Residential' };

export default async function Admin() {
  const ready = cmsEnabled() && Boolean(process.env.ADMIN_PASSWORD);
  const admin = ready && (await isAdmin());
  const uploads = admin ? await getUploads() : [];

  return (
    <main className="day min-h-dvh py-16 md:py-24">
      <div className="mx-auto max-w-[960px] px-4 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href="/" className="inline-flex items-center gap-2 text-[20px]">
            <img src="/assets/brand/lampara-mark.png" alt="" className="h-6 w-auto" />LAMPARA
          </a>
          {admin && (
            <form action={logout}><button className="btn btn-line">Sign out</button></form>
          )}
        </div>
        <h1 className="mt-10 text-[clamp(34px,4vw,52px)] leading-[1.05] font-light">Project photos</h1>

        {!ready && (
          <div className="card card-white mt-8 p-6">
            <p>The photo uploader is not set up on this server yet.</p>
            <p className="note text-soft mt-2">Add a Vercel Blob store to the project (it sets BLOB_READ_WRITE_TOKEN) and set ADMIN_PASSWORD in the project&apos;s environment variables, then redeploy.</p>
          </div>
        )}

        {ready && !admin && <LoginForm />}

        {admin && (
          <>
            <p className="text-soft mt-4 max-w-[60ch] text-[18px] leading-[1.6]">New photos appear first in the homepage showcase and on the category pages, usually within a minute.</p>
            <p className="note text-soft mt-3">
              <a href="/deck?print" target="_blank" rel="noopener" className="underline underline-offset-4 hover:opacity-80">Export company profile PDF</a>
              {' '}· opens the print dialog; choose &ldquo;Save as PDF&rdquo;. Best in Chrome or Edge on a computer.
            </p>
            <UploadForm />

            <h2 className="mt-16 text-[28px] leading-[1.15] font-light">Uploaded ({uploads.length})</h2>
            {uploads.length === 0 ? (
              <p className="note text-soft mt-3">Nothing uploaded yet. The site is showing the original project photos.</p>
            ) : (
              <ul className="m-0 mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 md:grid-cols-3">
                {uploads.map(u => (
                  <li key={u.slug} className="card card-white p-2.5">
                    <img src={u.image} alt={`${u.location} installation`} loading="lazy" className="block aspect-[4/3] w-full rounded-xl object-cover" />
                    <div className="px-2 pt-3 pb-1">
                      <p className="text-[17px]">{u.location}</p>
                      <p className="note text-soft">{CATEGORY_NAMES[u.category]} · {u.system}{u.type && u.type !== u.system ? ` · ${u.type}` : ''}</p>
                      <p className="note text-soft">{new Date(u.uploadedAt).toLocaleDateString('en-PH', { dateStyle: 'medium' })}</p>
                      <form action={deleteProject} className="mt-3">
                        <input type="hidden" name="slug" value={u.slug} />
                        <button className="btn btn-line">Remove</button>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </main>
  );
}
