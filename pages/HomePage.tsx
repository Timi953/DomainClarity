
import React from 'react';
import { ParallaxSection } from '../components/ParallaxSection';
import { SAMPLE_DOMAINS } from '../constants';
import { DomainCard } from '../components/DomainCard';

export const HomePage: React.FC = () => {
  const featuredDomains = SAMPLE_DOMAINS.slice(0, 3);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <ParallaxSection imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" speed={0.4}>
        <div className="text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Acquire Your <span className="text-indigo-400">Digital Empire</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 font-light">
            Premium domains for high-growth ventures. Secured by Escrow.com at DomainClarity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#/domains" className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl hover:shadow-indigo-500/30">
              Browse Inventory
            </a>
            <a href="#/about" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
              Learn More
            </a>
          </div>
        </div>
      </ParallaxSection>

      {/* Featured Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Listings</h2>
            <p className="text-slate-500">Curated high-value assets for your next big project.</p>
          </div>
          <a href="#/domains" className="text-indigo-600 font-semibold hover:underline">View All Domains →</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDomains.map(domain => (
            <DomainCard key={domain.id} domain={domain} />
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <ParallaxSection imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" speed={0.2} className="h-96">
        <div className="max-w-4xl text-center px-4">
          <div className="inline-block px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-bold mb-6 border border-emerald-500/30">
            SECURE TRANSACTIONS
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">Powered by Escrow.com</h2>
          <p className="text-lg text-slate-300">
            Every transaction on DomainClarity is protected. Your funds are only released to the seller once you have full control of the domain. 100% Guaranteed.
          </p>
        </div>
      </ParallaxSection>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04c0 4.833 1.253 9.421 3.441 13.401L12 21l3.177-1.659c2.188-3.98 3.441-8.568 3.441-13.401z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Safe & Verified</h3>
            <p className="text-slate-500">We verify ownership and history for every domain listed on our platform.</p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Transfer</h3>
            <p className="text-slate-500">Optimized transfer protocols ensuring you get your assets in record time.</p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Fair Pricing</h3>
            <p className="text-slate-500">Transparent valuation based on market trends and industry benchmarks.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
