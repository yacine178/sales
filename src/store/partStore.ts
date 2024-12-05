import { create } from 'zustand';
import { Part } from '../types';

interface PartState {
  parts: Part[];
  addPart: (part: Omit<Part, 'id'>) => void;
  updatePart: (id: string, part: Partial<Part>) => void;
  deletePart: (id: string) => void;
  adjustQuantity: (id: string, quantity: number, reason: string) => void;
}

export const usePartStore = create<PartState>((set) => ({
  parts: [
    {
      id: '1',
      name: 'CPU',
      referenceCode: 'CPU-001',
      category: 'Electronics',
      quantity: 15,
      minimumStock: 5,
      unitPrice: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=200&h=200',
      description: 'High-performance processor',
    },
    {
      id: '2',
      name: 'GPU',
      referenceCode: 'GPU-001',
      category: 'Electronics',
      quantity: 8,
      minimumStock: 3,
      unitPrice: 599.99,
      imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=200&h=200',
      description: 'Graphics processing unit',
    },
  ],
  addPart: (part) =>
    set((state) => ({
      parts: [...state.parts, { ...part, id: Math.random().toString() }],
    })),
  updatePart: (id, updatedPart) =>
    set((state) => ({
      parts: state.parts.map((part) =>
        part.id === id ? { ...part, ...updatedPart } : part
      ),
    })),
  deletePart: (id) =>
    set((state) => ({
      parts: state.parts.filter((part) => part.id !== id),
    })),
  adjustQuantity: (id, quantity, reason) =>
    set((state) => ({
      parts: state.parts.map((part) =>
        part.id === id
          ? { ...part, quantity: Math.max(0, part.quantity + quantity) }
          : part
      ),
    })),
}));