import React, { useState } from 'react';
import { Plus, Minus, Search, X } from 'lucide-react';
import { useCustomerStore } from '../../store/customerStore';
import { useProductStore } from '../../store/productStore';
import { useSaleStore } from '../../store/saleStore';
import { useSettingsStore } from '../../store/settingsStore';
import { useTranslation } from 'react-i18next';
import { Customer, Product, Sale, SaleItem } from '../../types';

interface SaleEditProps {
  sale: Sale;
  onSubmit: () => void;
}

export function SaleEdit({ sale, onSubmit }: SaleEditProps) {
  const { t } = useTranslation();
  const { customers } = useCustomerStore();
  const { products } = useProductStore();
  const { updateSale } = useSaleStore();
  const { tvaRate } = useSettingsStore();
  
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    customers.find(c => c.id === sale.customerId) || null
  );
  const [items, setItems] = useState<SaleItem[]>(sale.items);
  const [notes, setNotes] = useState(sale.notes || '');
  const [customerSearch, setCustomerSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [includeTva, setIncludeTva] = useState(sale.tvaIncluded ?? false);
  
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      customer.company?.toLowerCase().includes(customerSearch.toLowerCase())
  );
  
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      product.referenceCode.toLowerCase().includes(productSearch.toLowerCase())
  );
  
  const addItem = (product: Product) => {
    const existingItem = items.find(item => item.productId === product.id);
    if (existingItem) {
      setItems(items.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.unitPrice }
          : item
      ));
    } else {
      setItems([...items, {
        productId: product.id,
        quantity: 1,
        unitPrice: product.unitPrice,
        subtotal: product.unitPrice
      }]);
    }
  };
  
  const updateItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(items.filter(item => item.productId !== productId));
    } else {
      setItems(items.map(item =>
        item.productId === productId
          ? { ...item, quantity, subtotal: quantity * item.unitPrice }
          : item
      ));
    }
  };
  
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const tvaAmount = includeTva ? (subtotal * tvaRate) / 100 : 0;
  const totalAmount = subtotal + tvaAmount;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer || items.length === 0) return;
    
    updateSale(sale.id, {
      customerId: selectedCustomer.id,
      items,
      totalAmount,
      tvaAmount: includeTva ? tvaAmount : undefined,
      tvaIncluded: includeTva,
      notes
    });
    
    onSubmit();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Customer Selection */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">{t('customerInformation')}</h2>
        {selectedCustomer ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{selectedCustomer.name}</p>
              <p className="text-sm text-gray-500">{selectedCustomer.company}</p>
              <p className="text-sm text-gray-500">{selectedCustomer.email}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedCustomer(null)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                placeholder={t('searchCustomers')}
                className="pl-10 w-full rounded-md border-gray-300"
              />
            </div>
            <div className="mt-2 max-h-48 overflow-y-auto">
              {filteredCustomers.map((customer) => (
                <button
                  key={customer.id}
                  type="button"
                  onClick={() => setSelectedCustomer(customer)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50"
                >
                  <div className="font-medium">{customer.name}</div>
                  {customer.company && (
                    <div className="text-sm text-gray-500">{customer.company}</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Products Selection */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">{t('products')}</h2>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            placeholder={t('searchProducts')}
            className="pl-10 w-full rounded-md border-gray-300"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => addItem(product)}
              className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-12 h-12 rounded-md object-cover mr-4"
                />
              )}
              <div className="flex-1">
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-500">${product.unitPrice.toFixed(2)}</div>
              </div>
              <Plus className="h-5 w-5 text-gray-400" />
            </button>
          ))}
        </div>
        
        {/* Selected Items */}
        {items.length > 0 && (
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('product')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('quantity')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('unitPrice')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('subtotal')}</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item) => {
                  const product = products.find(p => p.id === item.productId);
                  return (
                    <tr key={item.productId}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product?.imageUrl && (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-8 h-8 rounded-full mr-3"
                            />
                          )}
                          <div className="text-sm font-medium text-gray-900">
                            {product?.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => updateItemQuantity(item.productId, item.quantity - 1)}
                            className="p-1 rounded-md hover:bg-gray-100"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateItemQuantity(item.productId, item.quantity + 1)}
                            className="p-1 rounded-md hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${item.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${item.subtotal.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          type="button"
                          onClick={() => updateItemQuantity(item.productId, 0)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-gray-50">
                  <td colSpan={3} className="px-6 py-4 text-right font-medium">
                    {t('subtotal')}:
                  </td>
                  <td colSpan={2} className="px-6 py-4 text-left font-medium">
                    ${subtotal.toFixed(2)}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td colSpan={3} className="px-6 py-4 text-right font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <input
                        type="checkbox"
                        id="includeTva"
                        checked={includeTva}
                        onChange={(e) => setIncludeTva(e.target.checked)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="includeTva">
                        {t('tva')} ({tvaRate}%):
                      </label>
                    </div>
                  </td>
                  <td colSpan={2} className="px-6 py-4 text-left font-medium">
                    ${tvaAmount.toFixed(2)}
                  </td>
                </tr>
                <tr className="bg-gray-50 font-bold">
                  <td colSpan={3} className="px-6 py-4 text-right">
                    {t('total')}:
                  </td>
                  <td colSpan={2} className="px-6 py-4 text-left">
                    ${totalAmount.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Notes */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">{t('additionalNotes')}</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full rounded-md border-gray-300"
          placeholder={t('addNotesPlaceholder')}
        />
      </div>
      
      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onSubmit}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          {t('cancel')}
        </button>
        <button
          type="submit"
          disabled={!selectedCustomer || items.length === 0}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('save')}
        </button>
      </div>
    </form>
  );
}