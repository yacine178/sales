import {
  LayoutDashboard,
  Package,
  Component,
  FolderTree,
  Users,
  Settings,
  ShoppingCart,
  FileText,
  UserCircle
} from 'lucide-react';

export const navigationConfig = [
  { 
    key: 'dashboard',
    icon: LayoutDashboard,
    requiresAdmin: false 
  },
  { 
    key: 'products',
    icon: Package,
    requiresAdmin: false 
  },
  { 
    key: 'parts',
    icon: Component,
    requiresAdmin: false 
  },
  { 
    key: 'categories',
    icon: FolderTree,
    requiresAdmin: false 
  },
  { 
    key: 'customers',
    icon: UserCircle,
    requiresAdmin: false 
  },
  { 
    key: 'sales',
    icon: ShoppingCart,
    requiresAdmin: false 
  },
  { 
    key: 'reports',
    icon: FileText,
    requiresAdmin: false 
  },
  { 
    key: 'users',
    icon: Users,
    requiresAdmin: true 
  },
  { 
    key: 'settings',
    icon: Settings,
    requiresAdmin: true 
  },
];