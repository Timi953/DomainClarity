
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
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/domains" element={<ListingsPage />} />
            <Route path="/domains/:id" element={<div className="p-24 text-center">Detailed info page coming soon.</div>} />
            <Route path="/checkout/:id" element={<CheckoutPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/how-it-works" element={<div className="p-24 text-center">Secure Escrow explanation coming soon.</div>} />
            <Route path="/about" element={<div className="p-24 text-center">DomainClarity story coming soon.</div>} />
          </Routes>
        </main>
        
        <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold text-white">DomainClarity</span>
            </div>
            <p className="mb-8 max-w-xl mx-auto">
              The world's most trusted marketplace for premium digital real estate. Secured by institutional-grade escrow protocols.
            </p>
            <div className="flex justify-center gap-8 mb-12">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </div>
            <p className="text-sm">© 2024 DomainClarity Brokerage. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
