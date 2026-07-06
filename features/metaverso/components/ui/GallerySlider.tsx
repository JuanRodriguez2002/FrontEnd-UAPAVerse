"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GallerySliderProps {
  images: string[];
  title: string;
  accentColor?: string;
}

export function GallerySlider({
  images,
  title,
  accentColor = "#00d4ff",
}: GallerySliderProps) {
  const [index, setIndex] = useState(0);

  if (!images.length) return null;

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="mb-4">
      <h3 className="mb-3 text-sm font-semibold text-[#00d4ff]">Galería</h3>
      <div className="overflow-hidden rounded-xl border border-[#00d4ff]/20 bg-[#001a33]/40">
        <div className="relative aspect-[16/9] w-full bg-[#000a18]">
          <AnimatePresence mode="wait">
            <motion.img
              key={images[index]}
              src={images[index]}
              alt={`${title} — foto ${index + 1}`}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute top-1/2 left-2 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#00d4ff]/40 bg-[#030014]/80 text-[#00d4ff] transition hover:bg-[#00d4ff]/20"
                aria-label="Foto anterior"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute top-1/2 right-2 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#00d4ff]/40 bg-[#030014]/80 text-[#00d4ff] transition hover:bg-[#00d4ff]/20"
                aria-label="Foto siguiente"
              >
                ›
              </button>
            </>
          )}

          <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-[#030014]/90 to-transparent px-4 py-3">
            <p className="text-xs text-[#e8f4ff]/70">
              {index + 1} / {images.length}
            </p>
          </div>
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto p-3">
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => setIndex(i)}
                className="relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition"
                style={{
                  borderColor: i === index ? accentColor : "rgba(0,212,255,0.2)",
                }}
              >
                <img
                  src={src}
                  alt={`Miniatura ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
