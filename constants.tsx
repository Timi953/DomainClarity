
import React from 'react';
import { Domain, DomainStatus } from './types';

export const SAMPLE_DOMAINS: Domain[] = [
  {
    id: '1',
    domain: 'Zenith.com',
    logo_url: 'https://picsum.photos/seed/zenith/400/200',
    description: 'The ultimate destination for luxury peak experiences.',
    price: 45000,
    status: DomainStatus.LISTED,
    category: 'Technology'
  },
  {
    id: '2',
    domain: 'Aether.io',
    logo_url: 'https://picsum.photos/seed/aether/400/200',
    description: 'Next-generation cloud networking platform.',
    price: 12500,
    status: DomainStatus.LISTED,
    category: 'Web3'
  },
  {
    id: '3',
    domain: 'FlowState.com',
    logo_url: 'https://picsum.photos/seed/flow/400/200',
    description: 'Productivity and mindfulness SaaS brand.',
    price: 28000,
    status: DomainStatus.LISTED,
    category: 'SaaS'
  },
  {
    id: '4',
    domain: 'Nebula.net',
    logo_url: 'https://picsum.photos/seed/nebula/400/200',
    description: 'A stellar network for creative professionals.',
    price: 8900,
    status: DomainStatus.SOLD,
    category: 'Creative'
  },
  // Adding more to demonstrate bulk/grid
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: `auto-${i}`,
    domain: `Brand${i + 10}.com`,
    logo_url: `https://picsum.photos/seed/brand${i+10}/400/200`,
    description: 'High-value premium digital asset for growing enterprises.',
    price: Math.floor(Math.random() * 50000) + 5000,
    status: DomainStatus.LISTED,
    category: i % 2 === 0 ? 'Business' : 'Innovation'
  }))
];

export const NAV_LINKS = [
  { name: 'Browse', href: '#/domains' },
  { name: 'How it Works', href: '#/how-it-works' },
  { name: 'About', href: '#/about' },
  { name: 'Admin', href: '#/admin' }
];
