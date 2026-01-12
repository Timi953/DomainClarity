
import React from 'react';
import { Domain, DomainStatus } from '../types';

interface DomainCardProps {
  domain: Domain;
}

export const DomainCard: React.FC<DomainCardProps> = ({ domain }) => {
  const isSold = domain.status === DomainStatus.SOLD;

  return (
    <div className={`group bg-white rounded-2xl overflow-hidden border border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isSold ? 'opacity-75' : ''}`}>
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img 
          src={domain.logo_url} 
          alt={domain.domain} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            isSold ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
          }`}>
            {domain.status}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-900">{domain.domain}</h3>
          <span className="text-indigo-600 font-bold text-lg">
            ${domain.price.toLocaleString()}
          </span>
        </div>
        <p className="text-slate-500 text-sm line-clamp-2 mb-6">
          {domain.description}
        </p>
        
        <div className="flex gap-3">
          <a 
            href={`#/domains/${domain.id}`}
            className="flex-1 text-center py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
          >
            Details
          </a>
          {!isSold && (
            <a 
              href={`#/checkout/${domain.id}`}
              className="flex-1 text-center py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-md"
            >
              Buy Now
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
