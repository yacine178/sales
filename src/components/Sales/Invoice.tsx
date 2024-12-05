import React from 'react';
import { Sale } from '../../types';
import { useCustomerStore } from '../../store/customerStore';
import { useProductStore } from '../../store/productStore';
import { useTranslation } from 'react-i18next';

interface InvoiceProps {
  sale: Sale;
}

export function Invoice({ sale }: InvoiceProps) {
  const { t } = useTranslation();
  const { customers } = useCustomerStore();
  const { products } = useProductStore();
  const customer = customers.find(c => c.id === sale.customerId);

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-200 pb-8 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{t('invoice')}</h1>
            <p className="text-gray-600 mt-2">{sale.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-semibold text-gray-900">Company Name</h2>
            <p className="text-gray-600">123 Business Street</p>
            <p className="text-gray-600">City, State 12345</p>
            <p className="text-gray-600">Phone: (123) 456-7890</p>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="mb-8">
        <h3 className="text-gray-600 font-medium mb-2">{t('customerInformation')}:</h3>
        <div className="text-gray-900">
          <p className="font-medium">{customer?.name}</p>
          {customer?.company && <p>{customer.company}</p>}
          <p>{customer?.address}</p>
          <p>{customer?.email}</p>
          {customer?.phones.map(phone => (
            <p key={phone.id}>{phone.label}: {phone.number}</p>
          ))}
          {customer?.nif && <p className="mt-2 font-mono">NIF: {customer.nif}</p>}
          {customer?.nis && <p className="font-mono">NIS: {customer.nis}</p>}
          {customer?.rc && <p className="font-mono">RC: {customer.rc}</p>}
        </div>
      </div>

      {/* Invoice Details */}
      <div className="mb-8">
        <div className="flex justify-between text-gray-600 mb-2">
          <p>{t('date')}: {new Date(sale.date).toLocaleDateString()}</p>
          <p>{t('status')}: {sale.status}</p>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full mb-8">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4">{t('product')}</th>
            <th className="text-right py-3 px-4">{t('quantity')}</th>
            <th className="text-right py-3 px-4">{t('unitPrice')}</th>
            <th className="text-right py-3 px-4">{t('subtotal')}</th>
          </tr>
        </thead>
        <tbody>
          {sale.items.map((item) => {
            const product = products.find(p => p.id === item.productId);
            return (
              <tr key={item.productId} className="border-b border-gray-200">
                <td className="py-4 px-4">
                  <div className="font-medium">{product?.name}</div>
                  <div className="text-sm text-gray-500">{product?.referenceCode}</div>
                </td>
                <td className="text-right py-4 px-4">{item.quantity}</td>
                <td className="text-right py-4 px-4">${item.unitPrice.toFixed(2)}</td>
                <td className="text-right py-4 px-4">${item.subtotal.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="text-right py-4 px-4 font-medium">{t('subtotal')}:</td>
            <td className="text-right py-4 px-4 font-medium">
              ${(sale.totalAmount - (sale.tvaAmount || 0)).toFixed(2)}
            </td>
          </tr>
          {sale.tvaIncluded && (
            <tr>
              <td colSpan={3} className="text-right py-4 px-4 font-medium">{t('tva')}:</td>
              <td className="text-right py-4 px-4 font-medium">
                ${(sale.tvaAmount || 0).toFixed(2)}
              </td>
            </tr>
          )}
          <tr>
            <td colSpan={3} className="text-right py-4 px-4 font-bold">{t('total')}:</td>
            <td className="text-right py-4 px-4 font-bold">${sale.totalAmount.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      {/* Notes */}
      {sale.notes && (
        <div className="mb-8">
          <h3 className="text-gray-600 font-medium mb-2">{t('notes')}:</h3>
          <p className="text-gray-900">{sale.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-gray-600 text-sm">
        <p>{t('thankYou')}</p>
      </div>
    </div>
  );
}