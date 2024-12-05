import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  language: string;
  tvaEnabled: boolean;
  tvaRate: number;
  availableLanguages: { code: string; name: string }[];
  setLanguage: (language: string) => void;
  setTvaEnabled: (enabled: boolean) => void;
  setTvaRate: (rate: number) => void;
  addLanguage: (code: string, name: string) => void;
  removeLanguage: (code: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'en',
      tvaEnabled: true,
      tvaRate: 19,
      availableLanguages: [
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'Français' },
      ],
      setLanguage: (language) => set({ language }),
      setTvaEnabled: (enabled) => set({ tvaEnabled }),
      setTvaRate: (rate) => set({ tvaRate }),
      addLanguage: (code, name) =>
        set((state) => ({
          availableLanguages: [...state.availableLanguages, { code, name }],
        })),
      removeLanguage: (code) =>
        set((state) => ({
          availableLanguages: state.availableLanguages.filter((lang) => lang.code !== code),
        })),
    }),
    {
      name: 'settings-storage',
    }
  )
);