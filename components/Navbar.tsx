import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Change background on scroll
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'glass-dark border-b border-cream/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-600 rounded-xl flex items-center justify-center shadow-lg shadow-gold/20 group-hover:shadow-gold/40 transition-shadow">
              <span className="text-midnight font-display font-bold text-xl">D</span>
            </div>
            <span className="text-2xl font-display font-bold text-gradient hidden sm:block">
              DomainClarity
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-cream/70 hover:text-cream font-medium transition-colors group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
            <a
              href="#/domains"
              className="ml-4 px-6 py-2.5 bg-gold text-midnight rounded-full font-semibold hover:bg-gold-300 transition-all shadow-lg shadow-gold/20 hover:shadow-gold/40 flex items-center gap-2 group"
            >
              <span>Get Started</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl glass text-cream"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 glass-dark border-b border-cream/5 transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-2">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-4 py-3 text-cream/70 hover:text-cream font-medium rounded-xl hover:bg-cream/5 transition-all"
              onClick={() => setIsOpen(false)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#/domains"
            className="block mt-4 px-4 py-3 bg-gold text-midnight rounded-xl font-semibold text-center"
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};
