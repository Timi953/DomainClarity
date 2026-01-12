import React, { useRef, useEffect, useState, useMemo } from 'react';

type SplitType = 'chars' | 'words' | 'lines';
type AnimationType = 'fadeUp' | 'fadeIn' | 'slideUp' | 'blur' | 'scale';

interface SplitTextProps {
  children: string;
  type?: SplitType;
  animation?: AnimationType;
  delay?: number;
  stagger?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  charClassName?: string;
  wordClassName?: string;
  once?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const getAnimationStyles = (animation: AnimationType) => {
  switch (animation) {
    case 'fadeUp':
      return {
        initial: { opacity: 0, transform: 'translateY(100%)' },
        animate: { opacity: 1, transform: 'translateY(0)' },
      };
    case 'fadeIn':
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      };
    case 'slideUp':
      return {
        initial: { transform: 'translateY(100%)' },
        animate: { transform: 'translateY(0)' },
      };
    case 'blur':
      return {
        initial: { opacity: 0, filter: 'blur(10px)' },
        animate: { opacity: 1, filter: 'blur(0)' },
      };
    case 'scale':
      return {
        initial: { opacity: 0, transform: 'scale(0.5)' },
        animate: { opacity: 1, transform: 'scale(1)' },
      };
    default:
      return {
        initial: { opacity: 0, transform: 'translateY(100%)' },
        animate: { opacity: 1, transform: 'translateY(0)' },
      };
  }
};

export function SplitText({
  children,
  type = 'chars',
  animation = 'fadeUp',
  delay = 0,
  stagger = 0.03,
  duration = 0.6,
  threshold = 0.2,
  className = '',
  charClassName = '',
  wordClassName = '',
  once = true,
  as: Component = 'div',
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
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
      { threshold, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, once, hasAnimated]);

  const { initial, animate } = getAnimationStyles(animation);

  const splitContent = useMemo(() => {
    const text = children;

    if (type === 'words') {
      const words = text.split(' ');
      return words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className={`inline-block overflow-hidden ${wordClassName}`}
        >
          <span
            className="inline-block"
            style={{
              ...(isVisible ? animate : initial),
              transition: `all ${duration}s cubic-bezier(0.23, 1, 0.32, 1) ${delay + wordIndex * stagger}s`,
              willChange: 'opacity, transform, filter',
            }}
          >
            {word}
          </span>
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ));
    }

    if (type === 'chars') {
      const words = text.split(' ');
      let charIndex = 0;

      return words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className={`inline-block whitespace-nowrap ${wordClassName}`}
        >
          {word.split('').map((char, i) => {
            const currentCharIndex = charIndex++;
            return (
              <span
                key={i}
                className={`inline-block overflow-hidden ${charClassName}`}
              >
                <span
                  className="inline-block"
                  style={{
                    ...(isVisible ? animate : initial),
                    transition: `all ${duration}s cubic-bezier(0.23, 1, 0.32, 1) ${delay + currentCharIndex * stagger}s`,
                    willChange: 'opacity, transform, filter',
                  }}
                >
                  {char}
                </span>
              </span>
            );
          })}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ));
    }

    // lines - split by line breaks or treat as single line
    const lines = text.split('\n');
    return lines.map((line, lineIndex) => (
      <span
        key={lineIndex}
        className="block overflow-hidden"
      >
        <span
          className="block"
          style={{
            ...(isVisible ? animate : initial),
            transition: `all ${duration}s cubic-bezier(0.23, 1, 0.32, 1) ${delay + lineIndex * stagger}s`,
            willChange: 'opacity, transform, filter',
          }}
        >
          {line}
        </span>
      </span>
    ));
  }, [children, type, isVisible, initial, animate, delay, stagger, duration, charClassName, wordClassName]);

  return React.createElement(
    Component,
    { ref: ref as any, className },
    splitContent
  );
}

// Animated heading component with built-in styling
interface AnimatedHeadingProps {
  children: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  animation?: AnimationType;
  className?: string;
  gradient?: boolean;
  delay?: number;
}

export function AnimatedHeading({
  children,
  level = 1,
  animation = 'fadeUp',
  className = '',
  gradient = false,
  delay = 0,
}: AnimatedHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const baseClassName = gradient ? 'text-gradient' : '';

  return (
    <SplitText
      as={Tag}
      type="words"
      animation={animation}
      delay={delay}
      stagger={0.08}
      className={`${baseClassName} ${className}`}
    >
      {children}
    </SplitText>
  );
}

// Typewriter effect component
interface TypewriterProps {
  children: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
  onComplete?: () => void;
}

export function Typewriter({
  children,
  speed = 50,
  delay = 0,
  className = '',
  cursor = true,
  onComplete,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const text = children;

      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [children, speed, delay, hasStarted, onComplete]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {cursor && !isComplete && (
        <span className="inline-block w-[2px] h-[1em] bg-current ml-1 animate-pulse" />
      )}
    </span>
  );
}

export default SplitText;
