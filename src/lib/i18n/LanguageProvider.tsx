'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { LanguageContextType, Translation } from '../interface/Language';
import { translations } from './translations';
import { supportedLanguages, defaultLanguage, fallbackLanguage, getLanguageByCode, isRTL } from './languages';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
    initialLanguage?: string;
}

// Provider for easy translation switching
export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
    const [currentLanguage, setCurrentLanguageState] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('preferred-language');
            if (saved && getLanguageByCode(saved)) {
                return saved;
            }
        }
        return initialLanguage || defaultLanguage;
    });

    // Func which returns the translation
    const t = useCallback((key: string): string => {
        const keys = key.split('.');

        let translation: Translation | string = translations[currentLanguage] || translations[fallbackLanguage];

        for (const k of keys) {
            try {
                if (typeof translation === 'string') {
                    break
                }
                translation = translation[k]
            } catch {
                return key
            }
        }
        return typeof translation === 'string' ? translation : key
    }, [currentLanguage]);

    const setLanguage = useCallback((languageCode: string) => {
        const language = getLanguageByCode(languageCode);
        if (language) {
            setCurrentLanguageState(languageCode);
            if (typeof window !== 'undefined') {
                localStorage.setItem('preferred-language', languageCode);
                document.cookie = `preferred-language=${languageCode}; path=/; max-age=31536000; samesite=lax; secure`;
            }
            document.documentElement.dir = language.rtl ? 'rtl' : 'ltr';
            document.documentElement.lang = languageCode;
        }
    }, []);

    const formatDate = useCallback((date: Date): string => {
        const language = getLanguageByCode(currentLanguage);
        if (!language) return date.toLocaleDateString();

        try {
            return new Intl.DateTimeFormat(currentLanguage, {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).format(date);
        } catch {
            return date.toLocaleDateString();
        }
    }, [currentLanguage]);
    const formatNumber = useCallback((number: number, options?: Intl.NumberFormatOptions): string => {
        const language = getLanguageByCode(currentLanguage);
        if (!language) return number.toString();

        try {
            return new Intl.NumberFormat(currentLanguage, options).format(number);
        } catch {
            return number.toString();
        }
    }, [currentLanguage]);
    const formatCurrency = useCallback((amount: number, currency?: string): string => {
        const language = getLanguageByCode(currentLanguage);
        const currencyCode = currency || language?.numberFormat.currency || 'USD';

        try {
            return new Intl.NumberFormat(currentLanguage, {
                style: 'currency',
                currency: currencyCode,
            }).format(amount);
        } catch {
            return `${currencyCode} ${amount}`;
        }
    }, [currentLanguage]);
    useEffect(() => {
        const language = getLanguageByCode(currentLanguage);
        if (language) {
            document.documentElement.dir = language.rtl ? 'rtl' : 'ltr';
            document.documentElement.lang = currentLanguage;
        }
    }, [currentLanguage]);

    const value: LanguageContextType = {
        currentLanguage,
        setLanguage,
        t,
        isRTL: isRTL(currentLanguage),
        formatDate,
        formatNumber,
        formatCurrency,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage(): LanguageContextType {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

export function useSupportedLanguages() {
    return supportedLanguages;
}

export function useCurrentLanguage() {
    const { currentLanguage } = useLanguage();
    return getLanguageByCode(currentLanguage);
} 