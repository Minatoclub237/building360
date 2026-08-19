import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';

export const ScrollerContext = createContext<RefObject<HTMLElement> | null>(null);

export default function Reveal({
  delay = 0,
  className = '',
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroller = useContext(ScrollerContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, root: scroller?.current ?? null }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [scroller]);

  return (
    <div
      ref={ref}
      className={`${className} will-change-transform transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
