
import React, { useState } from 'react';
import { SAMPLE_DOMAINS } from '../constants';
import { DomainStatus, Domain } from '../types';

export const AdminDashboard: React.FC = () => {
  const [domains, setDomains] = useState<Domain[]>(SAMPLE_DOMAINS);
  const [activeTab, setActiveTab] = useState<'inventory' | 'upload'>('inventory');
  const [csvPreview, setCsvPreview] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate CSV Parsing
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
    alert('Import successful!');
  };

  return (
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Admin Command Center</h1>
            <p className="text-slate-500">Manage listings, analyze sales, and bulk update inventory.</p>
          </div>
          
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`px-6 py-2 rounded-xl font-bold transition-all ${
                activeTab === 'inventory' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Inventory
            </button>
            <button 
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-2 rounded-xl font-bold transition-all ${
                activeTab === 'upload' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Bulk Upload
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Asset</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Price</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {domains.map(domain => (
                    <tr key={domain.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={domain.logo_url} className="w-12 h-12 rounded-lg object-cover" alt="" />
                          <div>
                            <p className="font-bold text-slate-900">{domain.domain}</p>
                            <p className="text-xs text-slate-400 truncate max-w-xs">{domain.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          domain.status === DomainStatus.LISTED ? 'bg-emerald-100 text-emerald-600' : 
                          domain.status === DomainStatus.SOLD ? 'bg-red-100 text-red-600' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {domain.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-mono text-indigo-600 font-bold">${domain.price.toLocaleString()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">{domain.category || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          </button>
                          <button 
                            onClick={() => setDomains(domains.filter(d => d.id !== domain.id))}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CSV Import Section */}
        {activeTab === 'upload' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl p-12 border-2 border-dashed border-slate-200 text-center mb-12">
              <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Drop CSV File</h2>
              <p className="text-slate-400 mb-8">Files should have headers: domain, logo_url, description, price, status</p>
              
              <input 
                type="file" 
                accept=".csv" 
                className="hidden" 
                id="csv-input" 
                onChange={handleFileUpload}
              />
              <label 
                htmlFor="csv-input"
                className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold cursor-pointer hover:bg-indigo-700 transition-all shadow-lg"
              >
                Choose File
              </label>
            </div>

            {csvPreview.length > 0 && (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-xl font-bold mb-6">Import Preview ({csvPreview.length} items)</h3>
                <div className="space-y-4 mb-8">
                  {csvPreview.slice(0, 5).map((row, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                      <div>
                        <p className="font-bold">{row.domain}</p>
                        <p className="text-xs text-slate-400">{row.price} USD</p>
                      </div>
                      <span className="text-xs font-bold text-emerald-500">READY</span>
                    </div>
                  ))}
                  {csvPreview.length > 5 && <p className="text-center text-slate-400 text-sm">...and {csvPreview.length - 5} more</p>}
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setCsvPreview([])}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleImport}
                    className="flex-2 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-700 transition-all"
                  >
                    Import All Assets
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
