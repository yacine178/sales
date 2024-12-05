import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ProductList } from './components/Products/ProductList';
import { PartList } from './components/Parts/PartList';
import { CategoryList } from './components/Categories/CategoryList';
import { CustomerList } from './components/Customers/CustomerList';
import { SaleList } from './components/Sales/SaleList';
import { NewSale } from './components/Sales/NewSale';
import { useAuthStore } from './store/authStore';

const queryClient = new QueryClient();

export default function App() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            onClick={() =>
              useAuthStore.getState().setUser({
                id: '1',
                name: 'Admin User',
                email: 'admin@example.com',
                role: 'admin',
              })
            }
          >
            Login as Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-gray-100 p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/parts" element={<PartList />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/customers" element={<CustomerList />} />
              <Route path="/sales" element={<SaleList />} />
              <Route path="/sales/new" element={<NewSale />} />
              <Route path="/reports" element={<div>Reports (Coming Soon)</div>} />
              <Route path="/users" element={<div>Users (Coming Soon)</div>} />
              <Route path="/settings" element={<div>Settings (Coming Soon)</div>} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}