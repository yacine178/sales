import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../../store/settingsStore';

export function TvaSettings() {
  const { t } = useTranslation();
  const { tvaEnabled, tvaRate, setTvaEnabled, setTvaRate } = useSettingsStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('tvaSettings')}</h3>
        <p className="mt-1 text-sm text-gray-500">
          {t('tvaSettingsDescription')}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="tvaEnabled"
            checked={tvaEnabled}
            onChange={(e) => setTvaEnabled(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="tvaEnabled" className="ml-2 block text-sm text-gray-900">
            {t('enableTva')}
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('tvaRate')}
          </label>
          <div className="mt-1 relative rounded-md shadow-sm w-32">
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={tvaRate}
              onChange={(e) => setTvaRate(parseFloat(e.target.value))}
              disabled={!tvaEnabled}
              className="block w-full rounded-md border-gray-300 pr-8 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 sm:text-sm">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}