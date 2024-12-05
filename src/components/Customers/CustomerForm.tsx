import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useCustomerStore } from '../../store/customerStore';
import { Customer, PhoneNumber } from '../../types';

interface CustomerFormProps {
  customer?: Customer;
  onSubmit: () => void;
}

export function CustomerForm({ customer, onSubmit }: CustomerFormProps) {
  const { addCustomer, updateCustomer } = useCustomerStore();
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phones: customer?.phones || [{ id: '1', number: '', label: 'Primary' }],
    address: customer?.address || '',
    company: customer?.company || '',
    nif: customer?.nif || '',
    nis: customer?.nis || '',
    rc: customer?.rc || '',
    notes: customer?.notes || '',
  });

  const addPhone = () => {
    setFormData(prev => ({
      ...prev,
      phones: [...prev.phones, { 
        id: Math.random().toString(),
        number: '',
        label: `Phone ${prev.phones.length + 1}`
      }]
    }));
  };

  const removePhone = (id: string) => {
    if (formData.phones.length > 1) {
      setFormData(prev => ({
        ...prev,
        phones: prev.phones.filter(phone => phone.id !== id)
      }));
    }
  };

  const updatePhone = (id: string, field: keyof PhoneNumber, value: string) => {
    setFormData(prev => ({
      ...prev,
      phones: prev.phones.map(phone =>
        phone.id === id ? { ...phone, [field]: value } : phone
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customer) {
      updateCustomer(customer.id, formData);
    } else {
      addCustomer(formData);
    }
    onSubmit();
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
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Phone Numbers</label>
          <button
            type="button"
            onClick={addPhone}
            className="inline-flex items-center px-2 py-1 text-sm text-indigo-600 hover:text-indigo-900"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Phone
          </button>
        </div>
        <div className="space-y-2">
          {formData.phones.map((phone) => (
            <div key={phone.id} className="flex gap-2">
              <input
                type="text"
                value={phone.label}
                onChange={(e) => updatePhone(phone.id, 'label', e.target.value)}
                placeholder="Label"
                className="mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <input
                type="tel"
                value={phone.number}
                onChange={(e) => updatePhone(phone.id, 'number', e.target.value)}
                placeholder="Phone number"
                className="mt-1 block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
              {formData.phones.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePhone(phone.id)}
                  className="mt-1 text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Company (Optional)</label>
        <input
          type="text"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">NIF</label>
          <input
            type="text"
            value={formData.nif}
            onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">NIS</label>
          <input
            type="text"
            value={formData.nis}
            onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">RC</label>
          <input
            type="text"
            value={formData.rc}
            onChange={(e) => setFormData({ ...formData, rc: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {customer ? 'Update' : 'Create'} Customer
        </button>
      </div>
    </form>
  );
}