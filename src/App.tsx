import { useState, useEffect, useCallback, useRef } from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ScrollStage from '@/components/ScrollStage';

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresBlockRef = useRef<HTMLDivElement>(null);
  const [featuresVisible, setFeaturesVisible] = useState(false);

  const goTo = useCallback((section: number) => {
    setTransitioning(true);
    setActiveSection(section);
    setTimeout(() => setTransitioning(false), 1000);
  }, []);

  const goToSection = useCallback((section: number) => () => goTo(section), [goTo]);

  const forward = useCallback(() => {
    if (transitioning || activeSection !== 0) return;
    goTo(1);
  }, [activeSection, transitioning, goTo]);

  const backward = useCallback(() => {
    if (transitioning || activeSection !== 1) return;
    const el = featuresRef.current;
    if (el && el.scrollTop <= 0) goTo(0);
  }, [activeSection, transitioning, goTo]);

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      if (e.deltaY > 0) forward();
      else if (e.deltaY < 0) backward();
    },
    [forward, backward]
  );

  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (deltaY > 50) forward();
      else if (deltaY < -50) backward();
    };

    const handleKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) forward();
      else if (['ArrowUp', 'PageUp'].includes(e.key)) backward();
    };

    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleScroll, forward, backward]);

  // La section blanche n'est plus la première du calque : ses animations
  // d'entrée se déclenchent quand elle arrive à l'écran, pas au changement
  // de section.
  useEffect(() => {
    const block = featuresBlockRef.current;
    if (!block) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFeaturesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, root: featuresRef.current }
    );

    observer.observe(block);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: activeSection === 0 ? 1 : 0,
          transform: activeSection === 0 ? 'scale(1)' : 'scale(0.97)',
          pointerEvents: activeSection === 0 ? 'auto' : 'none',
        }}
      >
        <Hero onAdvance={goToSection(1)} />
      </div>

      <div
        ref={featuresRef}
        className="absolute inset-0 overflow-y-auto bg-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] scrollbar-hide"
        style={{
          opacity: activeSection === 1 ? 1 : 0,
          transform: activeSection === 1 ? 'scale(1)' : 'scale(1.02)',
          pointerEvents: activeSection === 1 ? 'auto' : 'none',
        }}
      >
        <ScrollStage scrollerRef={featuresRef} />
        <div ref={featuresBlockRef}>
          <Features active={featuresVisible} />
        </div>
      </div>
    </main>
  );
}
