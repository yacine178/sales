import React from 'react';
import { Product, Part } from '../../types';

interface ProductDetailsProps {
  product: Product;
  parts: Part[];
}

export function ProductDetails({ product, parts }: ProductDetailsProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Assembly Parts</h3>
      <div className="space-y-4">
        {product.assemblyParts.map((assemblyPart) => {
          const part = parts.find(p => p.id === assemblyPart.partId);
          if (!part) return null;
          
          return (
            <div key={part.id} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
              <div className="flex items-center space-x-4">
                {part.imageUrl && (
                  <img
                    src={part.imageUrl}
                    alt={part.name}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                )}
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{part.name}</h4>
                  <p className="text-sm text-gray-500">{part.referenceCode}</p>
                </div>
              </div>
              <div className="text-sm text-gray-900">
                Quantity: {assemblyPart.quantity}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}