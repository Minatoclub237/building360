import { useEffect, useRef, useState } from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ScrollStage from '@/components/ScrollStage';

// Le hero reste en place pendant que la section suivante glisse par-dessus :
// il s'efface légèrement sur la hauteur d'un écran.

export default function App() {
  const heroRangeRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [fade, setFade] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const raw = window.scrollY / Math.max(1, window.innerHeight);
      setFade(raw < 0 ? 0 : raw > 1 ? 1 : raw);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollToStage = () => {
    const el = stageRef.current;
    if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
  };

  return (
    <main className="relative">
      <div ref={heroRangeRef} className="relative z-0 h-screen supports-[height:100svh]:h-[100svh]">
        <div
          className="sticky top-0 h-screen supports-[height:100svh]:h-[100svh] overflow-hidden"
          style={{
            opacity: 1 - fade * 0.4,
            transform: `scale(${1 - fade * 0.04})`,
          }}
        >
          <Hero onAdvance={scrollToStage} />
        </div>
      </div>

      <div ref={stageRef} className="relative z-10">
        <ScrollStage />
      </div>

      <Features />
    </main>
  );
}
