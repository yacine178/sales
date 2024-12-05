import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { navigationConfig } from '../../config/navigation';
import { cn } from '../../lib/utils';

export function Sidebar() {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const navigation = navigationConfig
    .filter(item => !item.requiresAdmin || user?.role === 'admin')
    .map(item => ({
      name: t(item.key),
      href: item.key === 'dashboard' ? '/' : `/${item.key}`,
      icon: item.icon
    }));

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-800">
      <div className="flex h-16 items-center justify-center">
        <h1 className="text-xl font-bold text-white">IMS</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center px-2 py-2 text-sm font-medium rounded-md',
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              )
            }
          >
            <item.icon className="mr-3 h-6 w-6" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="flex-shrink-0 p-4">
        <button
          className="flex w-full items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
          onClick={() => useAuthStore.getState().setUser(null)}
        >
          <LogOut className="mr-3 h-6 w-6" />
          {t('logout')}
        </button>
      </div>
    </div>
  );
}