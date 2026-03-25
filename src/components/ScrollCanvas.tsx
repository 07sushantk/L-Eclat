import React, { useEffect, useRef, useState } from 'react';

interface ScrollCanvasProps {
  currentFrame: number;
  totalFrames: number;
}

const ScrollCanvas: React.FC<ScrollCanvasProps> = ({ currentFrame, totalFrames }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const frameBaseUrl = `${import.meta.env.BASE_URL}frames/`;

  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;

      const loadImage = (index: number) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          const frameNumber = (index + 1).toString();
          img.src = `${frameBaseUrl}frame-${frameNumber}.jpg`;

          img.onload = () => {
            loadedCount++;
            setLoadProgress(Math.floor((loadedCount / totalFrames) * 100));
            resolve(img);
          };

          img.onerror = () => {
            // If local frames are missing, we'll use a placeholder to avoid a broken UI
            // but we still resolve to keep the loading sequence moving
            loadedCount++;
            setLoadProgress(Math.floor((loadedCount / totalFrames) * 100));

            // Fallback to a placeholder if the specific frame fails
            const fallbackImg = new Image();

            fallbackImg.onload = () => resolve(fallbackImg);
            fallbackImg.onerror = () => resolve(new Image());
          };
        });
      };

      // Load all frames needed for the cinematic sequence
      const promises = [];
      for (let i = 0; i < totalFrames; i++) {
        promises.push(loadImage(i));
      }

      const results = await Promise.all(promises);
      setImages(results);
      setIsLoading(false);
    };

    preloadImages();
  }, [totalFrames]);

  useEffect(() => {
    if (images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false }); // Optimization: no alpha needed for full-screen frames
    if (!context) return;

    const render = () => {
      // Handle high DPI displays
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      context.scale(dpr, dpr);

      const img = images[currentFrame];
      if (img && img.complete) {
        drawImageProp(context, img, 0, 0, width, height);
      }

      context.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
    };

    requestAnimationFrame(render);
  }, [currentFrame, images]);

  // Optimized drawImage (cover)
  function drawImageProp(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) {
    const iw = img.width;
    const ih = img.height;
    const r = Math.max(w / iw, h / ih);
    const nw = iw * r;
    const nh = ih * r;
    const cx = (w - nw) / 2;
    const cy = (h - nh) / 2;

    ctx.drawImage(img, cx, cy, nw, nh);
  }

  return (
    <div className="fixed inset-0 z-0 bg-[#0f0f0f]">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0f0f0f] z-50">
          <div className="text-[#c5a059] text-4xl font-serif italic mb-8 animate-pulse">L'Éclat</div>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#c5a059] transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <div className="mt-4 text-white/30 text-[10px] uppercase tracking-[0.2em]">
            Loading Experience {loadProgress}%
          </div>
        </div>
      )}
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
    </div>
  );
};

export default ScrollCanvas;
