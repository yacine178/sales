import React, { useState } from 'react';
import { useProductStore } from '../../store/productStore';
import { usePartStore } from '../../store/partStore';
import { useCategoryStore } from '../../store/categoryStore';
import { Product, AssemblyPart } from '../../types';

interface ProductFormProps {
  product?: Product;
  onSubmit: () => void;
}

export function ProductForm({ product, onSubmit }: ProductFormProps) {
  const { addProduct, updateProduct } = useProductStore();
  const { categories } = useCategoryStore();
  const { parts } = usePartStore();
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    quantity: product?.quantity || 0,
    referenceCode: product?.referenceCode || '',
    description: product?.description || '',
    unitPrice: product?.unitPrice || 0,
    imageUrl: product?.imageUrl || '',
    assemblyParts: product?.assemblyParts || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      updateProduct(product.id, formData);
    } else {
      addProduct(formData);
    }
    onSubmit();
  };

  const handlePartQuantityChange = (partId: string, quantity: string) => {
    const parsedQuantity = parseInt(quantity) || 0;
    setFormData(prev => ({
      ...prev,
      assemblyParts: [
        ...prev.assemblyParts.filter(p => p.partId !== partId),
        ...(parsedQuantity > 0 ? [{ partId, quantity: parsedQuantity }] : [])
      ].sort((a, b) => a.partId.localeCompare(b.partId))
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Reference Code</label>
        <input
          type="text"
          value={formData.referenceCode}
          onChange={(e) => setFormData({ ...formData, referenceCode: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Initial Quantity</label>
        <input
          type="number"
          min="0"
          value={formData.quantity.toString()}
          onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Unit Price ($)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={formData.unitPrice.toString()}
          onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) || 0 })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Assembly Parts</label>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {parts.map((part) => {
            const assemblyPart = formData.assemblyParts.find(p => p.partId === part.id);
            return (
              <div key={part.id} className="flex items-center space-x-4 bg-gray-50 p-2 rounded-md">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{part.name}</p>
                  <p className="text-xs text-gray-500">{part.referenceCode}</p>
                </div>
                <input
                  type="number"
                  min="0"
                  value={assemblyPart?.quantity || ''}
                  onChange={(e) => handlePartQuantityChange(part.id, e.target.value)}
                  className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="0"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 flex justify-end space-x-3">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {product ? 'Update' : 'Create'} Product
        </button>
      </div>
    </form>
  );
}