import React from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'viewer';
}

export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  assemblyParts: AssemblyPart[];
  referenceCode: string;
  imageUrl?: string;
  description?: string;
  unitPrice: number;
}

export interface AssemblyPart {
  partId: string;
  quantity: number;
}

export interface Part {
  id: string;
  name: string;
  referenceCode: string;
  category: string;
  quantity: number;
  minimumStock: number;
  unitPrice: number;
  imageUrl?: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface PhoneNumber {
  id: string;
  number: string;
  label: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phones: PhoneNumber[];
  address: string;
  company?: string;
  nif?: string;
  nis?: string;
  rc?: string;
  notes?: string;
  createdAt: string;
}

export interface SaleItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Sale {
  id: string;
  customerId: string;
  items: SaleItem[];
  totalAmount: number;
  tvaAmount?: number;
  tvaIncluded?: boolean;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  invoiceNumber: string;
  notes?: string;
}

export interface Transaction {
  id: string;
  type: 'sale' | 'assembly' | 'damage' | 'return' | 'adjustment';
  productId?: string;
  partId?: string;
  quantity: number;
  date: string;
  reason?: string;
  notes?: string;
}

export type TransactionReason = 'sale' | 'assembly' | 'damage' | 'return' | 'adjustment';