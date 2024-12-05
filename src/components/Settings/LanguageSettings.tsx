import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../../store/settingsStore';

export function LanguageSettings() {
  const { t, i18n } = useTranslation();
  const { language, availableLanguages, setLanguage } = useSettingsStore();

  const handleLanguageChange = (code: string) => {
    setLanguage(code);
    i18n.changeLanguage(code);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('languageSettings')}</h3>
        <p className="mt-1 text-sm text-gray-500">
          {t('languageSettingsDescription')}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('currentLanguage')}
          </label>
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {availableLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            {t('availableLanguages')}
          </h4>
          <ul className="divide-y divide-gray-200">
            {availableLanguages.map((lang) => (
              <li
                key={lang.code}
                className="flex items-center justify-between py-3"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {lang.name}
                  </p>
                  <p className="text-sm text-gray-500">{lang.code}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}