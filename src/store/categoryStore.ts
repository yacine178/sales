import { create } from 'zustand';
import { Category } from '../types';

interface CategoryState {
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [
    {
      id: '1',
      name: 'Electronics',
      description: 'Electronic devices and components',
    },
    {
      id: '2',
      name: 'Furniture',
      description: 'Office and home furniture',
    },
  ],
  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, { ...category, id: Math.random().toString() }],
    })),
  updateCategory: (id, updatedCategory) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === id ? { ...category, ...updatedCategory } : category
      ),
    })),
  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),
}));