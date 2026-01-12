
import React, { useState, useMemo } from 'react';
import { SAMPLE_DOMAINS } from '../constants';
import { DomainCard } from '../components/DomainCard';

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
    <div className="pt-24 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Inventory Explorer</h1>
          <p className="text-slate-500 text-lg">Browse our collection of 100+ high-potential domain names.</p>
        </header>

        {/* Filters */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-12 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Search Domains</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="e.g. zenith..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
          
          <div className="md:w-64">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Max Price (${maxPrice.toLocaleString()})</label>
            <input 
              type="range" 
              min="1000" 
              max="100000" 
              step="1000"
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-4"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            />
          </div>

          <div className="flex items-end">
            <button 
              onClick={() => { setSearch(''); setMaxPrice(100000); }}
              className="px-6 py-3 text-indigo-600 font-bold hover:bg-indigo-50 rounded-2xl transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results */}
        {filteredDomains.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDomains.map(domain => (
              <DomainCard key={domain.id} domain={domain} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <h3 className="text-xl font-bold text-slate-400">No domains match your criteria.</h3>
            <button 
              onClick={() => { setSearch(''); setMaxPrice(100000); }}
              className="mt-4 text-indigo-600 font-bold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
