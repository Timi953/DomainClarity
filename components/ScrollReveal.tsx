import React, { useRef, useEffect, useState, Children, cloneElement, isValidElement, ReactElement } from 'react';

type AnimationType = 'fadeUp' | 'fadeDown' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'blur';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  stagger?: number;
  className?: string;
  once?: boolean;
}

const animationStyles: Record<AnimationType, { initial: React.CSSProperties; animate: React.CSSProperties }> = {
  fadeUp: {
    initial: { opacity: 0, transform: 'translateY(60px)' },
    animate: { opacity: 1, transform: 'translateY(0)' },
  },
  fadeDown: {
    initial: { opacity: 0, transform: 'translateY(-60px)' },
    animate: { opacity: 1, transform: 'translateY(0)' },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideLeft: {
    initial: { opacity: 0, transform: 'translateX(80px)' },
    animate: { opacity: 1, transform: 'translateX(0)' },
  },
  slideRight: {
    initial: { opacity: 0, transform: 'translateX(-80px)' },
    animate: { opacity: 1, transform: 'translateX(0)' },
  },
  scaleIn: {
    initial: { opacity: 0, transform: 'scale(0.85)' },
    animate: { opacity: 1, transform: 'scale(1)' },
  },
  blur: {
    initial: { opacity: 0, filter: 'blur(10px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
  },
};

export function ScrollReveal({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  stagger = 0,
  className = '',
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated)) {
          setIsVisible(true);
          setHasAnimated(true);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, once, hasAnimated]);

  const { initial, animate } = animationStyles[animation];

  // Handle staggered children
  if (stagger > 0) {
    const childArray = Children.toArray(children);

    return (
      <div ref={ref} className={className}>
        {childArray.map((child, index) => {
          const childDelay = delay + index * stagger;

          return (
            <div
              key={index}
              style={{
                ...(isVisible ? animate : initial),
                transition: `all ${duration}s cubic-bezier(0.23, 1, 0.32, 1) ${childDelay}s`,
                willChange: 'opacity, transform, filter',
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(isVisible ? animate : initial),
        transition: `all ${duration}s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s`,
        willChange: 'opacity, transform, filter',
      }}
    >
      {children}
    </div>
  );
}

// Individual animated item for use within ScrollReveal with stagger
interface AnimatedItemProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedItem({ children, className = '', style = {} }: AnimatedItemProps) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

// Parallax wrapper component
interface ParallaxWrapperProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxWrapper({ children, speed = 0.5, className = '' }: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const element = ref.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = elementCenter - windowHeight / 2;

        setOffset(distanceFromCenter * speed * -1);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          transform: `translateY(${offset}px)`,
          transition: 'transform 0.1s linear',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default ScrollReveal;
