import React, { useState } from 'react';
import { useSaleStore } from '../../store/saleStore';
import { useProductStore } from '../../store/productStore';
import { Sale } from '../../types';

interface SaleFormProps {
  sale?: Sale;
  onSubmit: () => void;
}

export function SaleForm({ sale, onSubmit }: SaleFormProps) {
  const { products } = useProductStore();
  const { addSale, updateSale } = useSaleStore();
  const [formData, setFormData] = useState({
    productId: sale?.productId || '',
    quantity: sale?.quantity || 1,
    unitPrice: sale?.unitPrice || 0,
    customerName: sale?.customerName || '',
    customerEmail: sale?.customerEmail || '',
    status: sale?.status || 'pending',
  });

  const selectedProduct = products.find(p => p.id === formData.productId);
  const totalPrice = formData.quantity * formData.unitPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const saleData = {
      ...formData,
      totalPrice,
      status: formData.status as 'completed' | 'pending' | 'cancelled',
    };

    if (sale) {
      updateSale(sale.id, saleData);
    } else {
      addSale(saleData);
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Product</label>
        <select
          value={formData.productId}
          onChange={(e) => {
            const product = products.find(p => p.id === e.target.value);
            setFormData({
              ...formData,
              productId: e.target.value,
              unitPrice: product?.unitPrice || 0,
            });
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} (${product.unitPrice.toFixed(2)})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          min="1"
          max={selectedProduct?.quantity || 999999}
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
        {selectedProduct && (
          <p className="mt-1 text-sm text-gray-500">
            Available: {selectedProduct.quantity}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Unit Price ($)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={formData.unitPrice}
          onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Customer Name</label>
        <input
          type="text"
          value={formData.customerName}
          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Customer Email</label>
        <input
          type="email"
          value={formData.customerEmail}
          onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <p className="text-lg font-medium">
          Total Price: ${totalPrice.toFixed(2)}
        </p>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {sale ? 'Update' : 'Create'} Sale
        </button>
      </div>
    </form>
  );
}