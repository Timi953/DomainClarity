import React from 'react';
import { HeroParallax, ParallaxSection } from '../components/ParallaxSection';
import { SAMPLE_DOMAINS } from '../constants';
import { DomainCard } from '../components/DomainCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { SplitText, AnimatedHeading } from '../components/SplitText';
import { useInView, useCounter } from '../hooks/useScrollAnimation';

// Stats component with animated counters
const StatCounter: React.FC<{ end: number; suffix?: string; label: string }> = ({ end, suffix = '', label }) => {
  const { ref, isInView } = useInView({ threshold: 0.5 });
  const count = useCounter(end, 2000, 0, isInView);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center">
      <div className="text-5xl md:text-6xl font-display font-bold text-gradient mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-midnight-400 text-sm uppercase tracking-wider">{label}</div>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const featuredDomains = SAMPLE_DOMAINS.slice(0, 3);

  return (
    <div className="bg-midnight">
      {/* Hero Section */}
      <HeroParallax imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop">
        <div className="text-center px-4 max-w-5xl mx-auto">
          {/* Eyebrow */}
          <ScrollReveal animation="fadeDown" delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse-soft" />
              <span className="text-sm text-gold/80 uppercase tracking-[0.2em] font-medium">Premium Domain Marketplace</span>
            </div>
          </ScrollReveal>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-cream mb-8 leading-[0.95] tracking-tight">
            <SplitText type="words" animation="fadeUp" delay={0.3} stagger={0.1}>
              Acquire Your
            </SplitText>
            <span className="block mt-2">
              <SplitText type="words" animation="fadeUp" delay={0.6} stagger={0.1} className="text-gradient">
                Digital Empire
              </SplitText>
            </span>
          </h1>

          {/* Subheading */}
          <ScrollReveal animation="fadeUp" delay={0.9}>
            <p className="text-xl md:text-2xl text-midnight-300 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
              Premium domains for high-growth ventures. Every transaction secured by Escrow.com.
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal animation="fadeUp" delay={1.1}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#/domains"
                className="group px-8 py-4 bg-gold text-midnight rounded-full font-semibold text-lg hover:bg-gold-300 transition-all shadow-xl hover:shadow-gold/30 glow-hover flex items-center justify-center gap-2"
              >
                <span>Browse Inventory</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#/about"
                className="px-8 py-4 glass text-cream border border-cream/20 rounded-full font-semibold text-lg hover:bg-cream/10 transition-all"
              >
                Learn More
              </a>
            </div>
          </ScrollReveal>
        </div>
      </HeroParallax>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <ScrollReveal animation="fadeUp" stagger={0.15} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatCounter end={500} suffix="+" label="Domains Sold" />
            <StatCounter end={50} suffix="M" label="Total Value" />
            <StatCounter end={99} suffix="%" label="Success Rate" />
            <StatCounter end={24} suffix="/7" label="Support" />
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight-800 to-midnight" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <ScrollReveal animation="slideRight">
              <div>
                <div className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4">Curated Collection</div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-cream mb-4">
                  Featured Listings
                </h2>
                <p className="text-midnight-400 max-w-md">
                  Hand-picked premium assets ready for your next big venture.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slideLeft" delay={0.2}>
              <a
                href="#/domains"
                className="group flex items-center gap-3 text-gold font-semibold hover:text-gold-300 transition-colors"
              >
                <span>View All Domains</span>
                <span className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fadeUp" stagger={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDomains.map(domain => (
              <DomainCard key={domain.id} domain={domain} />
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Trust Section */}
      <ParallaxSection
        imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
        speed={0.3}
        height="80vh"
        overlayOpacity={0.75}
        gradient
      >
        <div className="max-w-4xl text-center px-4">
          <ScrollReveal animation="scaleIn">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full mb-8 border border-emerald-500/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">Secure Transactions</span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.2}>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-cream mb-8">
              Powered by <span className="text-gradient">Escrow.com</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.4}>
            <p className="text-xl text-midnight-300 leading-relaxed max-w-2xl mx-auto">
              Every transaction on DomainClarity is protected. Your funds are only released to the seller once you have full control of the domain.
              <span className="text-gold font-semibold"> 100% Guaranteed.</span>
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.6}>
            <div className="mt-12 flex flex-wrap justify-center gap-8">
              {['SSL Secured', 'Buyer Protection', 'Instant Transfer', 'Money Back'].map((item, i) => (
                <div key={item} className="flex items-center gap-2 text-midnight-400">
                  <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </ParallaxSection>

      {/* Benefits */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <ScrollReveal animation="fadeUp" className="text-center mb-20">
            <div className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4">Why Choose Us</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-cream">
              The DomainClarity Advantage
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" stagger={0.15} className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04c0 4.833 1.253 9.421 3.441 13.401L12 21l3.177-1.659c2.188-3.98 3.441-8.568 3.441-13.401z" />
                  </svg>
                ),
                title: 'Safe & Verified',
                description: 'We verify ownership and history for every domain listed on our platform. No surprises, just premium assets.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Instant Transfer',
                description: 'Optimized transfer protocols ensuring you get your assets in record time. Most transfers complete within 24 hours.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Fair Pricing',
                description: 'Transparent valuation based on market trends and industry benchmarks. No hidden fees, ever.',
              },
            ].map((benefit, index) => (
              <div
                key={benefit.title}
                className="group p-8 rounded-3xl glass border border-cream/5 hover:border-gold/20 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/5"
              >
                <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-display font-semibold text-cream mb-4">{benefit.title}</h3>
                <p className="text-midnight-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-midnight to-midnight" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <ScrollReveal animation="scaleIn">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-cream mb-6">
              Ready to <span className="text-gradient">Get Started?</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.2}>
            <p className="text-xl text-midnight-400 mb-10 max-w-xl mx-auto">
              Join thousands of entrepreneurs who've found their perfect domain on DomainClarity.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#/domains"
                className="group px-10 py-5 bg-gold text-midnight rounded-full font-bold text-lg hover:bg-gold-300 transition-all shadow-xl hover:shadow-gold/30 glow"
              >
                Explore Domains
              </a>
              <a
                href="#/contact"
                className="px-10 py-5 glass text-cream border border-cream/20 rounded-full font-bold text-lg hover:bg-cream/10 transition-all"
              >
                Contact Sales
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
