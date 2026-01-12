
export enum DomainStatus {
  LISTED = 'listed',
  SOLD = 'sold',
  DRAFT = 'draft'
}

export enum OrderStatus {
  INITIATED = 'initiated',
  IN_ESCROW = 'in_escrow',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface Domain {
  id: string;
  domain: string;
  logo_url: string;
  description: string;
  price: number;
  status: DomainStatus;
  category?: string;
  created_at?: string;
}

export interface Order {
  id: string;
  domain_id: string;
  buyer_name: string;
  buyer_email: string;
  buyer_company?: string;
  price: number;
  escrow_transaction_id: string;
  status: OrderStatus;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'visitor';
}
