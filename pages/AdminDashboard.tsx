import React, { useState } from 'react';
import { SAMPLE_DOMAINS } from '../constants';
import { DomainStatus, Domain } from '../types';
import { ScrollReveal } from '../components/ScrollReveal';

export const AdminDashboard: React.FC = () => {
  const [domains, setDomains] = useState<Domain[]>(SAMPLE_DOMAINS);
  const [activeTab, setActiveTab] = useState<'inventory' | 'upload'>('inventory');
  const [csvPreview, setCsvPreview] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const rows = text.split('\n').slice(1);
        const parsed = rows.map(row => {
          const [domain, logo_url, description, price, status] = row.split(',');
          return { domain, logo_url, description, price: parseInt(price), status };
        }).filter(r => r.domain);
        setCsvPreview(parsed);
      };
      reader.readAsText(file);
    }
  };

  const handleImport = () => {
    const newDomains = csvPreview.map((row, i) => ({
      id: `new-${Date.now()}-${i}`,
      domain: row.domain,
      logo_url: row.logo_url || 'https://picsum.photos/400/200',
      description: row.description,
      price: row.price,
      status: DomainStatus.LISTED
    }));
    setDomains([...newDomains, ...domains]);
    setCsvPreview([]);
    setActiveTab('inventory');
  };

  const stats = {
    total: domains.length,
    listed: domains.filter(d => d.status === DomainStatus.LISTED).length,
    sold: domains.filter(d => d.status === DomainStatus.SOLD).length,
    totalValue: domains.reduce((acc, d) => acc + d.price, 0),
  };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-midnight">
      {/* Background Effects */}
      <div className="fixed inset-0 gradient-mesh opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal animation="fadeUp">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <div className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-2">
                Dashboard
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-cream">
                Admin Command Center
              </h1>
              <p className="text-midnight-400 mt-2">
                Manage listings, analyze sales, and bulk update inventory.
              </p>
            </div>

            <div className="flex glass rounded-2xl p-1.5 border border-cream/10">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                  activeTab === 'inventory'
                    ? 'bg-gold text-midnight shadow-lg shadow-gold/20'
                    : 'text-cream/70 hover:text-cream hover:bg-cream/5'
                }`}
              >
                Inventory
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                  activeTab === 'upload'
                    ? 'bg-gold text-midnight shadow-lg shadow-gold/20'
                    : 'text-cream/70 hover:text-cream hover:bg-cream/5'
                }`}
              >
                Bulk Upload
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Stats Cards */}
        <ScrollReveal animation="fadeUp" delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="glass rounded-2xl p-6 border border-cream/5 hover:border-gold/20 transition-all">
              <div className="text-midnight-400 text-sm font-medium mb-1">Total Domains</div>
              <div className="text-3xl font-bold text-cream">{stats.total}</div>
            </div>
            <div className="glass rounded-2xl p-6 border border-cream/5 hover:border-gold/20 transition-all">
              <div className="text-midnight-400 text-sm font-medium mb-1">Listed</div>
              <div className="text-3xl font-bold text-emerald-400">{stats.listed}</div>
            </div>
            <div className="glass rounded-2xl p-6 border border-cream/5 hover:border-gold/20 transition-all">
              <div className="text-midnight-400 text-sm font-medium mb-1">Sold</div>
              <div className="text-3xl font-bold text-red-400">{stats.sold}</div>
            </div>
            <div className="glass rounded-2xl p-6 border border-cream/5 hover:border-gold/20 transition-all">
              <div className="text-midnight-400 text-sm font-medium mb-1">Portfolio Value</div>
              <div className="text-3xl font-bold text-gold">${stats.totalValue.toLocaleString()}</div>
            </div>
          </div>
        </ScrollReveal>

        {/* Inventory Table */}
        {activeTab === 'inventory' && (
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <div className="glass rounded-3xl border border-cream/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-midnight-800/50 border-b border-cream/5">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-gold uppercase tracking-widest">Asset</th>
                      <th className="px-6 py-4 text-xs font-bold text-gold uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-gold uppercase tracking-widest">Price</th>
                      <th className="px-6 py-4 text-xs font-bold text-gold uppercase tracking-widest">Category</th>
                      <th className="px-6 py-4 text-xs font-bold text-gold uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream/5">
                    {domains.map(domain => (
                      <tr key={domain.id} className="hover:bg-cream/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={domain.logo_url}
                              className="w-12 h-12 rounded-xl object-cover border border-cream/10"
                              alt=""
                            />
                            <div>
                              <p className="font-semibold text-cream">{domain.domain}</p>
                              <p className="text-xs text-midnight-400 truncate max-w-xs">{domain.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            domain.status === DomainStatus.LISTED
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : domain.status === DomainStatus.SOLD
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : 'bg-midnight-700 text-midnight-400 border border-midnight-600'
                          }`}>
                            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${
                              domain.status === DomainStatus.LISTED ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                            }`} />
                            {domain.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-gold">${domain.price.toLocaleString()}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-midnight-400">{domain.category || 'N/A'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2.5 text-midnight-400 hover:text-gold hover:bg-gold/10 rounded-xl transition-all border border-transparent hover:border-gold/20">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => setDomains(domains.filter(d => d.id !== domain.id))}
                              className="p-2.5 text-midnight-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* CSV Import Section */}
        {activeTab === 'upload' && (
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <div className="max-w-3xl mx-auto">
              <div className="glass rounded-3xl p-12 border-2 border-dashed border-cream/10 text-center mb-12 hover:border-gold/30 transition-all">
                <div className="w-20 h-20 bg-gold/10 text-gold rounded-3xl flex items-center justify-center mx-auto mb-6 border border-gold/20">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h2 className="text-2xl font-display font-bold text-cream mb-2">Drop CSV File</h2>
                <p className="text-midnight-400 mb-8">
                  Files should have headers: domain, logo_url, description, price, status
                </p>

                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  id="csv-input"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="csv-input"
                  className="inline-block px-8 py-4 bg-gold text-midnight rounded-2xl font-bold cursor-pointer hover:bg-gold-300 transition-all shadow-lg shadow-gold/20 hover:shadow-gold/40"
                >
                  Choose File
                </label>
              </div>

              {csvPreview.length > 0 && (
                <div className="glass rounded-3xl border border-cream/5 p-8">
                  <h3 className="text-xl font-display font-bold text-cream mb-6">
                    Import Preview <span className="text-gold">({csvPreview.length} items)</span>
                  </h3>
                  <div className="space-y-4 mb-8">
                    {csvPreview.slice(0, 5).map((row, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-midnight-800/50 rounded-2xl border border-cream/5">
                        <div>
                          <p className="font-semibold text-cream">{row.domain}</p>
                          <p className="text-xs text-midnight-400">${row.price?.toLocaleString()} USD</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          READY
                        </span>
                      </div>
                    ))}
                    {csvPreview.length > 5 && (
                      <p className="text-center text-midnight-400 text-sm">
                        ...and {csvPreview.length - 5} more
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setCsvPreview([])}
                      className="flex-1 py-4 glass text-cream/70 font-semibold rounded-2xl border border-cream/10 hover:border-cream/30 hover:text-cream transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleImport}
                      className="flex-1 py-4 bg-gold text-midnight font-bold rounded-2xl shadow-lg shadow-gold/20 hover:bg-gold-300 hover:shadow-gold/40 transition-all"
                    >
                      Import All Assets
                    </button>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
};
