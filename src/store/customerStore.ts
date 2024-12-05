import { create } from 'zustand';
import { Customer } from '../types';

interface CustomerState {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customers: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phones: [
        { id: '1', number: '+1234567890', label: 'Primary' },
        { id: '2', number: '+1987654321', label: 'Work' }
      ],
      address: '123 Main St, City',
      company: 'ABC Corp',
      nif: 'NIF123',
      nis: 'NIS456',
      rc: 'RC789',
      createdAt: new Date().toISOString(),
    },
  ],
  
  addCustomer: (customer) =>
    set((state) => ({
      customers: [
        ...state.customers,
        {
          ...customer,
          id: Math.random().toString(),
          createdAt: new Date().toISOString(),
        },
      ],
    })),
    
  updateCustomer: (id, updatedCustomer) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === id ? { ...customer, ...updatedCustomer } : customer
      ),
    })),
    
  deleteCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((customer) => customer.id !== id),
    })),
}));