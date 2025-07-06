import { Language } from '../interface/Language';



// Supported language - AI generated placeholders
export const supportedLanguages: Language[] = [
    {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        flag: '🇺🇸',
        rtl: false,
        dateFormat: 'MM/DD/YYYY',
        numberFormat: {
            decimal: '.',
            thousands: ',',
            currency: 'USD',
        },
    },
    {
        code: 'es',
        name: 'Spanish',
        nativeName: 'Español',
        flag: '🇪🇸',
        rtl: false,
        dateFormat: 'DD/MM/YYYY',
        numberFormat: {
            decimal: ',',
            thousands: '.',
            currency: 'EUR',
        },
    },
    {
        code: 'fr',
        name: 'French',
        nativeName: 'Français',
        flag: '🇫🇷',
        rtl: false,
        dateFormat: 'DD/MM/YYYY',
        numberFormat: {
            decimal: ',',
            thousands: ' ',
            currency: 'EUR',
        },
    },
    {
        code: 'de',
        name: 'German',
        nativeName: 'Deutsch',
        flag: '🇩🇪',
        rtl: false,
        dateFormat: 'DD.MM.YYYY',
        numberFormat: {
            decimal: ',',
            thousands: '.',
            currency: 'EUR',
        },
    },
    {
        code: 'it',
        name: 'Italian',
        nativeName: 'Italiano',
        flag: '🇮🇹',
        rtl: false,
        dateFormat: 'DD/MM/YYYY',
        numberFormat: {
            decimal: ',',
            thousands: '.',
            currency: 'EUR',
        },
    },
    {
        code: 'pt',
        name: 'Portuguese',
        nativeName: 'Português',
        flag: '🇵🇹',
        rtl: false,
        dateFormat: 'DD/MM/YYYY',
        numberFormat: {
            decimal: ',',
            thousands: '.',
            currency: 'EUR',
        },
    },
    {
        code: 'ar',
        name: 'Arabic',
        nativeName: 'العربية',
        flag: '🇸🇦',
        rtl: true,
        dateFormat: 'DD/MM/YYYY',
        numberFormat: {
            decimal: '.',
            thousands: ',',
            currency: 'SAR',
        },
    },
    {
        code: 'zh',
        name: 'Chinese',
        nativeName: '中文',
        flag: '🇨🇳',
        rtl: false,
        dateFormat: 'YYYY-MM-DD',
        numberFormat: {
            decimal: '.',
            thousands: ',',
            currency: 'CNY',
        },
    },
    {
        code: 'ja',
        name: 'Japanese',
        nativeName: '日本語',
        flag: '🇯🇵',
        rtl: false,
        dateFormat: 'YYYY-MM-DD',
        numberFormat: {
            decimal: '.',
            thousands: ',',
            currency: 'JPY',
        },
    },
    {
        code: 'ko',
        name: 'Korean',
        nativeName: '한국어',
        flag: '🇰🇷',
        rtl: false,
        dateFormat: 'YYYY-MM-DD',
        numberFormat: {
            decimal: '.',
            thousands: ',',
            currency: 'KRW',
        },
    },
];

export const defaultLanguage = 'en';
export const fallbackLanguage = 'en';

export function getLanguageByCode(code: string): Language | undefined {
    return supportedLanguages.find(lang => lang.code === code);
}

export function getLanguageName(code: string): string {
    const language = getLanguageByCode(code);
    return language ? language.name : code;
}

export function getNativeLanguageName(code: string): string {
    const language = getLanguageByCode(code);
    return language ? language.nativeName : code;
}

export function isRTL(code: string): boolean {
    const language = getLanguageByCode(code);
    return language?.rtl ?? false;
} 