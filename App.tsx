import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AdminDashboard } from './pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-midnight flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/domains" element={<ListingsPage />} />
            <Route path="/domains/:id" element={
              <div className="min-h-screen flex items-center justify-center bg-midnight">
                <div className="text-center">
                  <h1 className="text-4xl font-display font-bold text-cream mb-4">Coming Soon</h1>
                  <p className="text-midnight-400">Detailed domain information page is under construction.</p>
                </div>
              </div>
            } />
            <Route path="/checkout/:id" element={<CheckoutPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/how-it-works" element={
              <div className="min-h-screen flex items-center justify-center bg-midnight">
                <div className="text-center">
                  <h1 className="text-4xl font-display font-bold text-cream mb-4">How It Works</h1>
                  <p className="text-midnight-400">Secure Escrow explanation coming soon.</p>
                </div>
              </div>
            } />
            <Route path="/about" element={
              <div className="min-h-screen flex items-center justify-center bg-midnight">
                <div className="text-center">
                  <h1 className="text-4xl font-display font-bold text-cream mb-4">About Us</h1>
                  <p className="text-midnight-400">The DomainClarity story coming soon.</p>
                </div>
              </div>
            } />
          </Routes>
        </main>

        <footer className="bg-midnight-950 border-t border-cream/5">
          <div className="max-w-7xl mx-auto px-4 py-16">
            {/* Top Section */}
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-600 rounded-xl flex items-center justify-center">
                    <span className="text-midnight font-display font-bold text-xl">D</span>
                  </div>
                  <span className="text-2xl font-display font-bold text-gradient">DomainClarity</span>
                </div>
                <p className="text-midnight-400 max-w-sm leading-relaxed mb-6">
                  The world's most trusted marketplace for premium digital real estate. Secured by institutional-grade escrow protocols.
                </p>
                <div className="flex gap-4">
                  {['Twitter', 'LinkedIn', 'Discord'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-xl glass flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold/30 transition-all"
                    >
                      <span className="sr-only">{social}</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <h4 className="text-cream font-semibold mb-4">Marketplace</h4>
                <ul className="space-y-3">
                  {['Browse Domains', 'Categories', 'Pricing', 'Sell Your Domain'].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-midnight-400 hover:text-gold transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-cream font-semibold mb-4">Company</h4>
                <ul className="space-y-3">
                  {['About Us', 'How It Works', 'Contact', 'Blog'].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-midnight-400 hover:text-gold transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="pt-8 border-t border-cream/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-midnight-500 text-sm">
                © 2024 DomainClarity Brokerage. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-midnight-500 hover:text-gold transition-colors">Terms</a>
                <a href="#" className="text-midnight-500 hover:text-gold transition-colors">Privacy</a>
                <a href="#" className="text-midnight-500 hover:text-gold transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
