import React, { useRef, useState } from 'react';
import { Domain, DomainStatus } from '../types';

interface DomainCardProps {
  domain: Domain;
}

export const DomainCard: React.FC<DomainCardProps> = ({ domain }) => {
  const isSold = domain.status === DomainStatus.SOLD;
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = ((e.clientY - centerY) / (rect.height / 2)) * 5;
    const y = ((e.clientX - centerX) / (rect.width / 2)) * -5;

    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className={`group relative ${isSold ? 'opacity-60' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative glass rounded-3xl overflow-hidden border border-cream/5 transition-all duration-500 hover:border-gold/20 hover:shadow-2xl hover:shadow-gold/10"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? 20 : 0}px)`,
          transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out',
        }}
      >
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={domain.logo_url}
            alt={domain.domain}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-60" />

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                isSold
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${isSold ? 'bg-red-400' : 'bg-emerald-400 animate-pulse'}`} />
              {domain.status}
            </span>
          </div>

          {/* Category Tag */}
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-midnight/50 text-cream/70 backdrop-blur-md border border-cream/10">
              {domain.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Domain Name & Price */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-display font-bold text-cream group-hover:text-gold transition-colors">
              {domain.domain}
            </h3>
            <div className="text-right">
              <span className="text-gold font-bold text-xl">
                ${domain.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-midnight-400 text-sm line-clamp-2 mb-6 leading-relaxed">
            {domain.description}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <a
              href={`#/domains/${domain.id}`}
              className="flex-1 text-center py-3 rounded-xl font-semibold text-cream/70 border border-cream/10 hover:border-cream/30 hover:text-cream transition-all"
            >
              Details
            </a>
            {!isSold && (
              <a
                href={`#/checkout/${domain.id}`}
                className="flex-1 text-center py-3 bg-gold text-midnight rounded-xl font-semibold hover:bg-gold-300 transition-all shadow-lg shadow-gold/20 hover:shadow-gold/40 flex items-center justify-center gap-2 group/btn"
              >
                <span>Buy Now</span>
                <svg
                  className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Hover glow effect */}
        <div
          className={`absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(
              600px circle at ${tilt.y * -10 + 50}% ${tilt.x * 10 + 50}%,
              rgba(212, 165, 116, 0.1),
              transparent 40%
            )`,
          }}
        />
      </div>
    </div>
  );
};
