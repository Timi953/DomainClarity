import React, { useEffect, useState, useRef, useCallback } from 'react';

interface ParallaxLayerProps {
  imageUrl?: string;
  speed?: number;
  className?: string;
  children?: React.ReactNode;
  opacity?: number;
}

interface ParallaxSectionProps {
  children: React.ReactNode;
  imageUrl?: string;
  speed?: number;
  className?: string;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  height?: string;
  layers?: ParallaxLayerProps[];
  gradient?: boolean;
}

// Individual parallax layer component
export const ParallaxLayer: React.FC<ParallaxLayerProps & { offset: number }> = ({
  imageUrl,
  className = '',
  children,
  opacity = 1,
  offset,
}) => {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        transform: `translate3d(0, ${offset}px, 0)`,
        opacity,
        willChange: 'transform',
      }}
    >
      {imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${imageUrl})`,
            height: '130%',
            top: '-15%',
          }}
        />
      )}
      {children}
    </div>
  );
};

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  imageUrl,
  speed = 0.5,
  className = '',
  overlay = true,
  overlayColor = 'midnight',
  overlayOpacity = 0.6,
  height = '100vh',
  layers = [],
  gradient = false,
}) => {
  const [offsetY, setOffsetY] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>();

  const handleScroll = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if in view
        const inView = rect.bottom > 0 && rect.top < windowHeight;
        setIsInView(inView);

        if (inView) {
          // Calculate offset based on element position
          const elementCenter = rect.top + rect.height / 2;
          const distanceFromCenter = elementCenter - windowHeight / 2;
          setOffsetY(distanceFromCenter * speed);
        }
      }
    });
  }, [speed]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll]);

  // Determine overlay classes based on color
  const overlayClasses = overlayColor === 'midnight'
    ? 'bg-midnight'
    : overlayColor === 'gold'
      ? 'bg-gold'
      : `bg-${overlayColor}`;

  return (
    <div
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      {/* Gradient mesh background */}
      {gradient && (
        <div className="absolute inset-0 z-0 gradient-mesh" />
      )}

      {/* Main background image */}
      {imageUrl && (
        <div
          className="absolute inset-0 z-[1]"
          style={{
            transform: `translate3d(0, ${offsetY * -0.8}px, 0)`,
            willChange: 'transform',
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center ken-burns"
            style={{
              backgroundImage: `url(${imageUrl})`,
              height: '140%',
              top: '-20%',
            }}
          />
        </div>
      )}

      {/* Additional parallax layers */}
      {layers.map((layer, index) => (
        <ParallaxLayer
          key={index}
          {...layer}
          offset={offsetY * (layer.speed || 0.3) * -1}
        />
      ))}

      {/* Overlay */}
      {overlay && (
        <div
          className={`absolute inset-0 z-10 ${overlayClasses}`}
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(15, 23, 42, 0.3) 0%,
            transparent 30%,
            transparent 70%,
            rgba(15, 23, 42, 0.5) 100%
          )`,
        }}
      />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        {children}
      </div>

      {/* Bottom fade for smooth transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgb(15, 23, 42), transparent)',
        }}
      />
    </div>
  );
};

// Hero-specific parallax component with more features
interface HeroParallaxProps {
  children: React.ReactNode;
  imageUrl?: string;
  videoUrl?: string;
  className?: string;
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({
  children,
  imageUrl,
  videoUrl,
  className = '',
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const rafId = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;
        setScrollY(scrollPosition);
        // Fade out as user scrolls
        setOpacity(Math.max(0, 1 - scrollPosition / 600));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Gradient mesh background */}
      <div className="absolute inset-0 z-0 gradient-mesh" />

      {/* Background media */}
      {videoUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-[1]"
          style={{
            transform: `translate3d(0, ${scrollY * 0.4}px, 0) scale(1.1)`,
            willChange: 'transform',
          }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : imageUrl ? (
        <div
          className="absolute inset-0 z-[1]"
          style={{
            transform: `translate3d(0, ${scrollY * 0.4}px, 0)`,
            willChange: 'transform',
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${imageUrl})`,
              height: '130%',
              top: '-15%',
            }}
          />
        </div>
      ) : null}

      {/* Decorative elements */}
      <div
        className="absolute top-20 right-20 w-96 h-96 rounded-full z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212, 165, 116, 0.15) 0%, transparent 70%)',
          transform: `translate3d(${scrollY * 0.2}px, ${scrollY * 0.1}px, 0)`,
          willChange: 'transform',
        }}
      />
      <div
        className="absolute bottom-40 left-10 w-64 h-64 rounded-full z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212, 165, 116, 0.1) 0%, transparent 70%)',
          transform: `translate3d(${scrollY * -0.15}px, ${scrollY * 0.05}px, 0)`,
          willChange: 'transform',
        }}
      />

      {/* Main overlay */}
      <div className="absolute inset-0 bg-midnight/70 z-10" />

      {/* Content with parallax */}
      <div
        className="relative z-20 min-h-screen flex items-center justify-center"
        style={{
          transform: `translate3d(0, ${scrollY * 0.2}px, 0)`,
          opacity,
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
        style={{ opacity }}
      >
        <div className="flex flex-col items-center gap-2 text-gold/60">
          <span className="text-xs uppercase tracking-[0.3em] font-medium">Scroll</span>
          <div className="w-6 h-10 border-2 border-gold/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgb(15, 23, 42), transparent)',
        }}
      />
    </div>
  );
};

export default ParallaxSection;
