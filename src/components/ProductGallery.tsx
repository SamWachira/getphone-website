'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ProductGallery({ images, alt }: { images: string[], alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isLightboxOpen]);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div 
        className="relative bg-background-alt aspect-[4/5] rounded-3xl border border-border-light flex items-center justify-center p-8 cursor-pointer group hover:border-accent/40 transition-colors"
        onClick={() => setIsLightboxOpen(true)}
      >
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
          </svg>
        </div>
        <img 
          src={images[currentIndex]} 
          alt={`${alt} - image ${currentIndex + 1}`} 
          className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex sm:grid sm:grid-cols-5 gap-3 overflow-x-auto snap-x snap-mandatory pb-2 sm:pb-0 hide-scrollbar">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`shrink-0 w-20 sm:w-auto snap-center aspect-square rounded-xl border flex items-center justify-center p-2 transition-all bg-background-alt overflow-hidden ${
              currentIndex === idx ? 'border-accent shadow-sm ring-2 ring-accent/20' : 'border-border-light hover:border-accent/50 opacity-60 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain pointer-events-none" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setIsLightboxOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <button 
            className="absolute left-4 sm:left-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={prevImage}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>

          <img 
            src={images[currentIndex]} 
            alt="Fullscreen view" 
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing lightbox
          />

          <button 
            className="absolute right-4 sm:right-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={nextImage}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm font-semibold tracking-widest">
            {currentIndex + 1} / {images.length}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
