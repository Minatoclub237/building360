import { useEffect, useRef, useState, type RefObject } from 'react';

const SRC = '/scroll-bg.mp4';
const POSTER = '/scroll-poster.jpg';
const MAX_FRAMES = 90;
const MIN_FRAMES = 24;
const FRAME_WIDTH = 960;
const LERP = 0.12;

type Props = {
  rangeRef: RefObject<HTMLElement>;
};

export default function ScrollVideo({ rangeRef }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const targetRef = useRef(0);
  const smoothRef = useRef(0);
  const metricsRef = useRef({ top: 0, height: 1 });
  const drawnRef = useRef(-1);

  const [hasFrame, setHasFrame] = useState(false);
  const [cacheReady, setCacheReady] = useState(false);

  // Scroll progress + rAF draw loop. offsetTop is measured outside the scroll
  // handler and refreshed on resize only.
  useEffect(() => {
    const range = rangeRef.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!range || !canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const measure = () => {
      metricsRef.current = {
        top: range.getBoundingClientRect().top + window.scrollY,
        height: range.offsetHeight,
      };

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawnRef.current = -1;
    };

    const onScroll = () => {
      const { top, height } = metricsRef.current;
      const denom = Math.max(1, height - window.innerHeight);
      const raw = (window.scrollY - top) / denom;
      targetRef.current = raw < 0 ? 0 : raw > 1 ? 1 : raw;
    };

    const drawCover = (source: CanvasImageSource, iw: number, ih: number) => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.drawImage(source, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const target = targetRef.current;
      const delta = target - smoothRef.current;
      if (Math.abs(delta) < 0.0002) {
        smoothRef.current = target;
      } else {
        smoothRef.current += delta * LERP;
      }
      const progress = smoothRef.current;

      const frames = framesRef.current;
      if (frames.length > 0) {
        const index = Math.round(progress * (frames.length - 1));
        if (index !== drawnRef.current) {
          const bitmap = frames[index];
          drawCover(bitmap, bitmap.width, bitmap.height);
          drawnRef.current = index;
        }
        return;
      }

      if (video.readyState >= 2 && video.duration) {
        const time = progress * (video.duration - 0.05);
        if (Math.abs(video.currentTime - time) > 0.04) video.currentTime = time;
      }
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        measure();
        onScroll();
      }, 150);
    };

    measure();
    onScroll();
    raf = requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [rangeRef]);

  // Offscreen frame cache: decoded once, then the canvas scrubs bitmaps
  // instead of seeking the video element.
  useEffect(() => {
    if (!hasFrame) return;
    let cancelled = false;
    const bitmaps: ImageBitmap[] = [];

    const timer = window.setTimeout(async () => {
      const source = document.createElement('video');
      source.src = SRC;
      source.muted = true;
      source.playsInline = true;
      source.preload = 'auto';

      try {
        await new Promise<void>((resolve, reject) => {
          source.addEventListener('loadedmetadata', () => resolve(), { once: true });
          source.addEventListener('error', () => reject(new Error('metadata')), { once: true });
        });
        if (cancelled) return;

        const duration = source.duration;
        const count = Math.min(MAX_FRAMES, Math.max(MIN_FRAMES, Math.round(duration * 12)));
        const width = Math.min(FRAME_WIDTH, source.videoWidth);
        const height = Math.round((width * source.videoHeight) / source.videoWidth);

        const scratch = document.createElement('canvas');
        scratch.width = width;
        scratch.height = height;
        const scratchCtx = scratch.getContext('2d');
        if (!scratchCtx) return;

        for (let i = 0; i < count; i += 1) {
          if (cancelled) return;
          const time = (i / (count - 1)) * (duration - 0.05);
          await new Promise<void>((resolve, reject) => {
            source.addEventListener('seeked', () => resolve(), { once: true });
            source.addEventListener('error', () => reject(new Error('seek')), { once: true });
            source.currentTime = time;
          });
          scratchCtx.drawImage(source, 0, 0, width, height);
          bitmaps.push(await createImageBitmap(scratch));
        }

        if (cancelled) return;
        framesRef.current = bitmaps;
        setCacheReady(true);
      } catch {
        bitmaps.forEach((bitmap) => bitmap.close());
      } finally {
        source.removeAttribute('src');
        source.load();
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      framesRef.current = [];
      bitmaps.forEach((bitmap) => bitmap.close());
    };
  }, [hasFrame]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a] pointer-events-none">
      <img
        src={POSTER}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          hasFrame || cacheReady ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <video
        ref={videoRef}
        src={SRC}
        poster={POSTER}
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setHasFrame(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          hasFrame && !cacheReady ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
          cacheReady ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Voile haut/bas : la vidéo reste pleine puissance au centre, le texte
          garde son contraste sur les bandes où il se pose. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.28)_30%,rgba(0,0,0,0.05)_52%,rgba(0,0,0,0.78)_100%)]" />
    </div>
  );
}
