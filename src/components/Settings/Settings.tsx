import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSettings } from './LanguageSettings';
import { TvaSettings } from './TvaSettings';

export function Settings() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t('settings')}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <TvaSettings />
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <LanguageSettings />
        </div>
      </div>
    </div>
  );
}