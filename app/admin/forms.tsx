'use client';

import { useActionState, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { addProject, login } from './actions';

const FIELD = 'mt-1.5 block min-h-11 w-full rounded-lg border border-field bg-white px-3 text-[16px]';

export function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="card card-white mt-8 max-w-[420px] p-6">
      <label className="block">
        <span className="note">Password</span>
        <input name="password" type="password" required autoComplete="current-password" className={FIELD} />
      </label>
      {error && <p role="alert" className="note mt-3" style={{ color: '#b42318' }}>{error}</p>}
      <button className="btn btn-yellow mt-5" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button>
    </form>
  );
}

// Phone photos are often 5–12 MB; shrink to a 2400px JPEG before sending (also strips EXIF location).
async function shrink(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  const scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>(r => canvas.toBlob(r, 'image/jpeg', 0.85));
  if (!blob) throw new Error('encode failed');
  return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.jpg', { type: 'image/jpeg' });
}

export function UploadForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setMessage(null);
    start(async () => {
      try {
        data.set('photo', await shrink(data.get('photo') as File));
      } catch {
        setMessage({ ok: false, text: 'This photo could not be read. Try a JPG or PNG.' });
        return;
      }
      const error = await addProject(data);
      if (error) return setMessage({ ok: false, text: error });
      formRef.current?.reset();
      setMessage({ ok: true, text: 'Uploaded. It will show in the list below and first in the showcase within a minute.' });
      router.refresh();
    });
  }

  return (
    <form ref={formRef} onSubmit={submit} className="card card-white mt-8 grid gap-5 p-6 md:grid-cols-2">
      <label className="block md:col-span-2">
        <span className="note">Photo</span>
        <input name="photo" type="file" accept="image/jpeg,image/png,image/webp" required className={`${FIELD} py-2.5`} />
      </label>
      <label className="block">
        <span className="note">Category</span>
        <select name="category" required defaultValue="residential" className={FIELD}>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial & industrial</option>
        </select>
      </label>
      <label className="block">
        <span className="note">Location</span>
        <input name="location" required maxLength={80} placeholder="Tiaong, Quezon" className={FIELD} />
      </label>
      <label className="block">
        <span className="note">System size</span>
        <input name="system" required maxLength={40} placeholder="8.0 kWp" className={FIELD} />
      </label>
      <label className="block">
        <span className="note">System type</span>
        <select name="type" defaultValue="" className={FIELD}>
          <option value="">Not stated</option>
          <option value="Grid-Tie">Grid-Tie</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </label>
      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <button className="btn btn-yellow" disabled={pending}>{pending ? 'Uploading…' : 'Upload photo'}</button>
        {message && <p role="status" className="note" style={{ color: message.ok ? undefined : '#b42318' }}>{message.text}</p>}
      </div>
    </form>
  );
}
