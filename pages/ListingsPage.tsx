import React, { useState, useMemo } from 'react';
import { SAMPLE_DOMAINS } from '../constants';
import { DomainCard } from '../components/DomainCard';
import { ScrollReveal } from '../components/ScrollReveal';

export const ListingsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(100000);

  const filteredDomains = useMemo(() => {
    return SAMPLE_DOMAINS.filter(d =>
      d.domain.toLowerCase().includes(search.toLowerCase()) &&
      d.price <= maxPrice
    );
  }, [search, maxPrice]);

  return (
    <div className="pt-24 pb-24 min-h-screen bg-midnight">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <ScrollReveal animation="fadeUp">
            <div className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4">
              Premium Collection
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-cream mb-4">
              Inventory Explorer
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <p className="text-midnight-400 text-lg max-w-xl">
              Browse our collection of 100+ high-potential domain names. Find the perfect digital asset for your venture.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <ScrollReveal animation="fadeUp" delay={0.3}>
          <div className="glass rounded-3xl p-6 md:p-8 mb-12 border border-cream/5">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-cream mb-3">Search Domains</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. zenith..."
                    className="w-full pl-12 pr-4 py-4 bg-midnight-800 border border-cream/10 rounded-2xl text-cream placeholder-midnight-500 focus:ring-2 focus:ring-gold/50 focus:border-gold/50 outline-none transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <svg className="w-5 h-5 text-midnight-500 absolute left-4 top-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div className="md:w-72">
                <label className="block text-sm font-semibold text-cream mb-3">
                  Max Price: <span className="text-gold">${maxPrice.toLocaleString()}</span>
                </label>
                <div className="relative pt-2">
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    className="w-full h-2 bg-midnight-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #d4a574 0%, #d4a574 ${(maxPrice - 1000) / 990}%, #334155 ${(maxPrice - 1000) / 990}%, #334155 100%)`,
                    }}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  />
                </div>
                <div className="flex justify-between text-xs text-midnight-500 mt-2">
                  <span>$1,000</span>
                  <span>$100,000</span>
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => { setSearch(''); setMaxPrice(100000); }}
                  className="px-6 py-4 text-gold font-semibold hover:bg-gold/10 rounded-2xl transition-colors border border-gold/20 hover:border-gold/40"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-6 pt-6 border-t border-cream/5">
              <p className="text-midnight-400 text-sm">
                Showing <span className="text-gold font-semibold">{filteredDomains.length}</span> domains
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Results */}
        {filteredDomains.length > 0 ? (
          <ScrollReveal animation="fadeUp" stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDomains.map(domain => (
              <DomainCard key={domain.id} domain={domain} />
            ))}
          </ScrollReveal>
        ) : (
          <ScrollReveal animation="fadeUp">
            <div className="text-center py-24 glass rounded-3xl border border-cream/5">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-bold text-cream mb-2">No domains found</h3>
              <p className="text-midnight-400 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => { setSearch(''); setMaxPrice(100000); }}
                className="px-6 py-3 bg-gold text-midnight rounded-xl font-semibold hover:bg-gold-300 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
};
