import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
}

// Hook for detecting when element enters viewport
export function useInView(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setHasAnimated(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView, hasAnimated };
}

// Hook for parallax scrolling effect
export function useParallax(options: UseParallaxOptions = {}) {
  const { speed = 0.5, direction = 'up' } = options;
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const rafId = useRef<number>();

  const handleScroll = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = elementCenter - windowHeight / 2;

      const multiplier = direction === 'up' ? -1 : 1;
      const newOffset = distanceFromCenter * speed * multiplier;

      setOffset(newOffset);
    });
  }, [speed, direction]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll]);

  return { ref, offset };
}

// Hook for scroll progress (0 to 1)
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
        setProgress(Math.min(Math.max(scrollProgress, 0), 1));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return progress;
}

// Hook for element-specific scroll progress
export function useElementScrollProgress() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const element = ref.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate progress: 0 when element enters from bottom, 1 when it exits at top
        const elementProgress = 1 - (rect.bottom / (windowHeight + rect.height));
        setProgress(Math.min(Math.max(elementProgress, 0), 1));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return { ref, progress };
}

// Hook for mouse-based 3D tilt effect
export function useTilt(intensity: number = 10) {
  const ref = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = ((e.clientY - centerY) / (rect.height / 2)) * intensity;
      const y = ((e.clientX - centerX) / (rect.width / 2)) * -intensity;

      setTilt({ x, y });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return { ref, tilt };
}

// Hook for smooth counter animation
export function useCounter(
  end: number,
  duration: number = 2000,
  start: number = 0,
  isEnabled: boolean = true
) {
  const [count, setCount] = useState(start);
  const rafId = useRef<number>();
  const startTime = useRef<number>();

  useEffect(() => {
    if (!isEnabled) {
      setCount(start);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTime.current) {
        startTime.current = timestamp;
      }

      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out-cubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * easeProgress;

      setCount(Math.round(current));

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      startTime.current = undefined;
    };
  }, [end, duration, start, isEnabled]);

  return count;
}
