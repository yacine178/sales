import { create } from 'zustand';
import { Sale, SaleItem } from '../types';
import { useProductStore } from './productStore';

interface SaleState {
  sales: Sale[];
  lastInvoiceNumber: number;
  addSale: (sale: Omit<Sale, 'id' | 'date' | 'invoiceNumber'>) => void;
  updateSale: (id: string, sale: Partial<Sale>) => void;
  deleteSale: (id: string) => void;
  getNextInvoiceNumber: () => string;
}

export const useSaleStore = create<SaleState>((set, get) => ({
  sales: [],
  lastInvoiceNumber: 1000,
  
  getNextInvoiceNumber: () => {
    const nextNumber = get().lastInvoiceNumber + 1;
    set({ lastInvoiceNumber: nextNumber });
    return `INV-${nextNumber}`;
  },
  
  addSale: (sale) => {
    const productStore = useProductStore.getState();
    const newSale = {
      ...sale,
      id: Math.random().toString(),
      date: new Date().toISOString(),
      invoiceNumber: get().getNextInvoiceNumber(),
    };
    
    // Deduct product quantities
    sale.items.forEach((item) => {
      productStore.adjustQuantity(item.productId, -item.quantity, 'sale');
    });
    
    set((state) => ({
      sales: [...state.sales, newSale],
    }));
  },
  
  updateSale: (id, updatedSale) => {
    const currentSale = get().sales.find(s => s.id === id);
    const productStore = useProductStore.getState();
    
    if (currentSale && updatedSale.items) {
      // Restore previous quantities
      currentSale.items.forEach((item) => {
        productStore.adjustQuantity(item.productId, item.quantity, 'return');
      });
      
      // Deduct new quantities
      updatedSale.items.forEach((item) => {
        productStore.adjustQuantity(item.productId, -item.quantity, 'sale');
      });
    }
    
    set((state) => ({
      sales: state.sales.map((sale) =>
        sale.id === id ? { ...sale, ...updatedSale } : sale
      ),
    }));
  },
    
  deleteSale: (id) => {
    const sale = get().sales.find(s => s.id === id);
    if (sale) {
      const productStore = useProductStore.getState();
      // Return the products to inventory when sale is deleted
      sale.items.forEach((item) => {
        productStore.adjustQuantity(item.productId, item.quantity, 'return');
      });
    }
    
    set((state) => ({
      sales: state.sales.filter((sale) => sale.id !== id),
    }));
  },
}));