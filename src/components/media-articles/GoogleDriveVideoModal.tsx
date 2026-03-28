'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface GoogleDriveVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  embedUrl: string;
  title: string;
}

export default function GoogleDriveVideoModal({ isOpen, onClose, embedUrl, title }: GoogleDriveVideoModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-modal-backdrop backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close video"
      />
      <div
        className="relative z-10 w-full max-w-[min(100vw-2rem,960px)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-[32px] bg-black shadow-[0px_16px_48px_rgba(0,0,0,0.45)]">
          <iframe
            src={embedUrl}
            className="absolute inset-0 z-0 h-full w-full"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            title={title}
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white shadow-md backdrop-blur-sm transition-colors hover:bg-black/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:right-3 sm:top-3 sm:h-11 sm:w-11"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
