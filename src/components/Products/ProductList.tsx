import React, { useState } from 'react';
import { Plus, Edit, Trash2, FileDown, Plus as PlusCircle, Minus } from 'lucide-react';
import { useProductStore } from '../../store/productStore';
import { usePartStore } from '../../store/partStore';
import { Modal } from '../UI/Modal';
import { ProductForm } from './ProductForm';
import { ProductSearch } from './ProductSearch';
import { ProductDetails } from './ProductDetails';
import { Product } from '../../types';

export function ProductList() {
  const { products, deleteProduct, adjustQuantity } = useProductStore();
  const { parts } = usePartStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [quantityToAdd, setQuantityToAdd] = useState(1);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.referenceCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    const csv = [
      ['Name', 'Category', 'Quantity', 'Reference Code', 'Unit Price', 'Assembly Parts'],
      ...products.map((product) => [
        product.name,
        product.category,
        product.quantity,
        product.referenceCode,
        product.unitPrice,
        product.assemblyParts.map((part) => {
          const partInfo = parts.find(p => p.id === part.partId);
          return `${partInfo?.name || 'Unknown'} (${part.quantity})`;
        }).join(', ')
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleQuickQuantityAdjust = (product: Product) => {
    setSelectedProduct(product);
    setQuantityToAdd(1);
    setIsQuantityModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <FileDown className="h-5 w-5 mr-2" />
            Export
          </button>
          <button
            onClick={() => {
              setSelectedProduct(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      <ProductSearch value={searchTerm} onChange={setSearchTerm} />

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference Code
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assembly Parts
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <React.Fragment key={product.id}>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {product.imageUrl && (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-10 w-10 rounded-full mr-3 object-cover"
                        />
                      )}
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.referenceCode}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-900">{product.quantity}</div>
                      <button
                        onClick={() => handleQuickQuantityAdjust(product)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <PlusCircle className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${product.unitPrice.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setShowDetails(showDetails === product.id ? null : product.id)}
                      className="text-sm text-indigo-600 hover:text-indigo-900"
                    >
                      {product.assemblyParts.length} parts
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsModalOpen(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
                {showDetails === product.id && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4">
                      <ProductDetails
                        product={product}
                        parts={parts}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedProduct ? 'Edit Product' : 'Add Product'}
      >
        <ProductForm
          product={selectedProduct || undefined}
          onSubmit={() => setIsModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isQuantityModalOpen}
        onClose={() => setIsQuantityModalOpen(false)}
        title="Adjust Quantity"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity to {quantityToAdd >= 0 ? 'Add' : 'Remove'}
            </label>
            <div className="mt-1 flex items-center space-x-3">
              <button
                onClick={() => setQuantityToAdd(prev => prev - 1)}
                className="p-2 rounded-md border border-gray-300 hover:bg-gray-50"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                value={Math.abs(quantityToAdd)}
                onChange={(e) => setQuantityToAdd(parseInt(e.target.value) || 0)}
                className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                min="1"
              />
              <button
                onClick={() => setQuantityToAdd(prev => prev + 1)}
                className="p-2 rounded-md border border-gray-300 hover:bg-gray-50"
              >
                <PlusCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <button
              onClick={() => {
                if (selectedProduct) {
                  adjustQuantity(selectedProduct.id, quantityToAdd, 'adjustment');
                }
                setIsQuantityModalOpen(false);
              }}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Adjust Quantity
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}