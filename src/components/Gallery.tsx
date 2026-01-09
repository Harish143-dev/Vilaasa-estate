import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = ({ property }: { property: any }) => {
  const images = property.galleryImages || [];
  const [index, setIndex] = useState(0);

  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  const itemsPerView = 2; // desktop
  const maxIndex = Math.max(images.length - itemsPerView, 0);

  const next = () => {
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreenIndex(null);
      if (e.key === "ArrowRight" && fullscreenIndex !== null) {
        setFullscreenIndex((i) => (i! < images.length - 1 ? i! + 1 : i));
      }
      if (e.key === "ArrowLeft" && fullscreenIndex !== null) {
        setFullscreenIndex((i) => (i! > 0 ? i! - 1 : i));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [fullscreenIndex, images.length]);

  return (
    <section className="py-20 px-4 md:px-10 bg-card border-y border-border">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-primary/60 uppercase tracking-[0.2em] text-xs font-bold">
              Master Plans
            </span>
            <h2 className="text-2xl font-light text-foreground mt-2">
              The Layout
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="p-2 border border-border rounded hover:border-primary transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button
              onClick={next}
              className="p-2 border border-border rounded hover:border-primary transition-colors"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={{ x: `-${index * 50}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {images.map((plan: any, idx: number) => (
              <div key={idx} className="min-w-full md:min-w-[calc(50%-16px)]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <button
                      onClick={() => setFullscreenIndex(idx)}
                      className="absolute bottom-4 right-4 flex items-center gap-2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      View Fullscreen
                    </button>
                  </div>

                  <h3 className="text-foreground font-medium">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {plan.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {fullscreenIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenIndex(null)}
          >
            {/* Image */}
            <motion.img
              src={images[fullscreenIndex].image}
              alt={images[fullscreenIndex].name}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Close */}
            <button
              onClick={() => setFullscreenIndex(null)}
              className="absolute top-6 right-6 text-white text-3xl"
            >
              ✕
            </button>

            {/* Left */}
            {fullscreenIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFullscreenIndex((i) => (i as number) - 1);
                }}
                className="absolute left-6 text-white text-4xl"
              >
                ‹
              </button>
            )}

            {/* Right */}
            {fullscreenIndex < images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFullscreenIndex((i) => (i as number) + 1);
                }}
                className="absolute right-6 text-white text-4xl"
              >
                ›
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
