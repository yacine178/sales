import { create } from 'zustand';
import { Product, AssemblyPart } from '../types';
import { usePartStore } from './partStore';

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  adjustQuantity: (id: string, quantity: number, reason: string) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [
    {
      id: '1',
      name: 'Gaming PC',
      category: 'Electronics',
      quantity: 5,
      assemblyParts: [
        { partId: '1', quantity: 1 }, // CPU
        { partId: '2', quantity: 1 }, // GPU
      ],
      referenceCode: 'PC-001',
      unitPrice: 1499.99,
      description: 'High-performance gaming computer',
      imageUrl: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=300&h=300'
    }
  ],
  
  addProduct: (product) => {
    const partStore = usePartStore.getState();
    const newProduct = { ...product, id: Math.random().toString() };
    
    // Deduct parts from inventory for initial quantity
    product.assemblyParts.forEach((assemblyPart) => {
      const totalPartsNeeded = assemblyPart.quantity * product.quantity;
      partStore.adjustQuantity(assemblyPart.partId, -totalPartsNeeded, 'assembly');
    });
    
    set((state) => ({
      products: [...state.products, newProduct],
    }));
  },
  
  updateProduct: (id, updatedProduct) => {
    const partStore = usePartStore.getState();
    const currentProduct = get().products.find(p => p.id === id);
    
    if (currentProduct && updatedProduct.quantity !== undefined) {
      const quantityDiff = updatedProduct.quantity - currentProduct.quantity;
      
      if (quantityDiff > 0) {
        // Need more parts for additional products
        currentProduct.assemblyParts.forEach((assemblyPart) => {
          const additionalPartsNeeded = assemblyPart.quantity * quantityDiff;
          partStore.adjustQuantity(assemblyPart.partId, -additionalPartsNeeded, 'assembly');
        });
      }
    }
    
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      ),
    }));
  },
  
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
    
  adjustQuantity: (id, quantity, reason) => {
    const partStore = usePartStore.getState();
    const product = get().products.find(p => p.id === id);
    
    if (product) {
      if (quantity < 0) {
        // Removing products, return parts to inventory if not a sale
        if (reason !== 'sale') {
          product.assemblyParts.forEach((assemblyPart) => {
            const partsToReturn = assemblyPart.quantity * Math.abs(quantity);
            partStore.adjustQuantity(assemblyPart.partId, partsToReturn, reason);
          });
        }
      } else {
        // Adding products, need more parts
        product.assemblyParts.forEach((assemblyPart) => {
          const partsNeeded = assemblyPart.quantity * quantity;
          partStore.adjustQuantity(assemblyPart.partId, -partsNeeded, 'assembly');
        });
      }
      
      set((state) => ({
        products: state.products.map((p) =>
          p.id === id
            ? { ...p, quantity: Math.max(0, p.quantity + quantity) }
            : p
        ),
      }));
    }
  },
}));