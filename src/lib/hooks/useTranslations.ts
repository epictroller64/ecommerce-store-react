'use client';

import { useLanguage } from '../i18n/LanguageProvider';

export function useTranslations() {
    const { currentLanguage, t, formatDate, formatNumber, formatCurrency } = useLanguage();

    return {
        currentLanguage,
        t,
        formatDate,
        formatNumber,
        formatCurrency,
        isClient: true,
    };
}
