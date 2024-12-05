import React, { useState } from 'react';
import { Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { usePartStore } from '../../store/partStore';
import { Modal } from '../UI/Modal';
import { PartForm } from './PartForm';
import { Part } from '../../types';

export function PartList() {
  const { parts, deletePart } = usePartStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Parts Inventory</h1>
        <button
          onClick={() => {
            setSelectedPart(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Part
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {parts.map((part) => (
          <div
            key={part.id}
            className="bg-white overflow-hidden shadow rounded-lg flex flex-col"
          >
            {part.imageUrl && (
              <img
                src={part.imageUrl}
                alt={part.name}
                className="h-48 w-full object-cover"
              />
            )}
            <div className="px-4 py-5 sm:p-6 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {part.name}
                  </h3>
                  <p className="text-sm text-gray-500">{part.referenceCode}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedPart(part);
                      setIsModalOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deletePart(part.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">In Stock:</span>
                  <span className="font-medium">{part.quantity}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium">{part.category}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">Unit Price:</span>
                  <span className="font-medium">${part.unitPrice.toFixed(2)}</span>
                </div>
              </div>
              {part.quantity <= part.minimumStock && (
                <div className="mt-4 flex items-center text-red-600">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  <span className="text-sm">Low stock alert</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPart ? 'Edit Part' : 'Add Part'}
      >
        <PartForm
          part={selectedPart || undefined}
          onSubmit={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}