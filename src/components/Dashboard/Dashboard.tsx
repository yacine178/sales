import React from 'react';
import { BarChart, Users, Package, AlertTriangle } from 'lucide-react';
import { useProductStore } from '../../store/productStore';
import { useCategoryStore } from '../../store/categoryStore';

export function Dashboard() {
  const { products } = useProductStore();
  const { categories } = useCategoryStore();

  const stats = [
    {
      name: 'Total Products',
      value: products.length,
      icon: Package,
      change: '+4.75%',
      changeType: 'positive',
    },
    {
      name: 'Categories',
      value: categories.length,
      icon: BarChart,
      change: '+54.02%',
      changeType: 'positive',
    },
    {
      name: 'Low Stock Items',
      value: products.filter((p) => p.quantity < 5).length,
      icon: AlertTriangle,
      change: '-1.39%',
      changeType: 'negative',
    },
    {
      name: 'Active Users',
      value: 3,
      icon: Users,
      change: '+2.02%',
      changeType: 'positive',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium">Recent Products</h2>
          <div className="mt-4">
            <ul className="divide-y divide-gray-200">
              {products.slice(0, 5).map((product) => (
                <li key={product.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {product.category}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-sm font-semibold text-gray-900">
                      {product.quantity} in stock
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium">Low Stock Alerts</h2>
          <div className="mt-4">
            <ul className="divide-y divide-gray-200">
              {products
                .filter((p) => p.quantity < 5)
                .map((product) => (
                  <li key={product.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {product.category}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-sm font-semibold text-red-600">
                        {product.quantity} left
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}