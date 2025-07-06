'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, useSupportedLanguages } from '../lib/i18n/LanguageProvider';

interface LanguageSwitcherProps {
    className?: string;
    variant?: 'dropdown' | 'buttons' | 'select';
}

export function LanguageSwitcher({ className = '', variant = 'dropdown' }: LanguageSwitcherProps) {
    const { currentLanguage, setLanguage, t } = useLanguage();
    const supportedLanguages = useSupportedLanguages();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLanguageChange = (languageCode: string) => {
        setLanguage(languageCode);
        setIsOpen(false);
    };

    if (variant === 'buttons') {
        return (
            <div className={`flex gap-2 ${className}`}>
                {supportedLanguages.map((language) => (
                    <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${currentLanguage === language.code
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        title={language.nativeName}
                    >
                        <span className="mr-1">{language.flag}</span>
                        {language.code.toUpperCase()}
                    </button>
                ))}
            </div>
        );
    }

    if (variant === 'select') {
        return (
            <select
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className={`px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
            >
                {supportedLanguages.map((language) => (
                    <option key={language.code} value={language.code}>
                        {language.flag} {language.nativeName}
                    </option>
                ))}
            </select>
        );
    }

    // Default dropdown variant
    const currentLanguageInfo = supportedLanguages.find(lang => lang.code === currentLanguage);

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label={t('common.language')}
            >
                <span>{currentLanguageInfo?.flag}</span>
                <span>{currentLanguageInfo?.nativeName}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="py-1">
                        {supportedLanguages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => handleLanguageChange(language.code)}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${currentLanguage === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                                    }`}
                            >
                                <span className="text-lg">{language.flag}</span>
                                <span>{language.nativeName}</span>
                                {currentLanguage === language.code && (
                                    <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
} 