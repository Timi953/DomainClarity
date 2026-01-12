
import React, { useEffect, useState, useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  imageUrl?: string;
  speed?: number; // 0.1 to 1.0
  className?: string;
  overlay?: boolean;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  imageUrl, 
  speed = 0.5, 
  className = "",
  overlay = true 
}) => {
  const [offsetY, setOffsetY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const top = sectionRef.current.getBoundingClientRect().top;
        setOffsetY(top * speed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div 
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height: '70vh' }}
    >
      {imageUrl && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${imageUrl})`,
            transform: `translateY(${offsetY * -1}px)`,
            height: '120%' // Extra height to allow movement
          }}
        />
      )}
      {overlay && <div className="absolute inset-0 bg-slate-900/40 z-10" />}
      <div className="relative z-20 h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
