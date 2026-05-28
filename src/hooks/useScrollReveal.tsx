'use client';

import { useEffect, useRef } from 'react';

/**
 * A lightweight scroll-reveal hook using Intersection Observer.
 * Adds the `revealed` class when an element enters the viewport.
 * 
 * Usage:
 *   const ref = useScrollReveal();
 *   <div ref={ref} className="scroll-reveal"> ... </div>
 * 
 * CSS classes applied:
 *   .scroll-reveal { opacity: 0; transform: translateY(24px); transition: ... }
 *   .scroll-reveal.revealed { opacity: 1; transform: translateY(0); }
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px'
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return ref;
}

/**
 * ScrollReveal wrapper component for server components that can't use hooks.
 * Wraps children in a div that fades in when scrolled into view.
 */
export function ScrollRevealClient({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
