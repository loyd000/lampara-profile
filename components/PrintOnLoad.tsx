'use client';

import { useEffect } from 'react';

// /deck?print opens the browser's print dialog once fonts and photos are in, so "Save as PDF"
// gives the same file as `npm run pdf`, including the latest uploads.
export default function PrintOnLoad() {
  useEffect(() => {
    if (!new URLSearchParams(location.search).has('print')) return;
    const images = [...document.images].map(img => (img.complete ? null : new Promise(r => { img.onload = img.onerror = r; })));
    Promise.all([document.fonts.ready, ...images]).then(() => window.print());
  }, []);
  return null;
}
