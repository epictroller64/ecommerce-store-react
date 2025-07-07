"use client"
import { createContext, useContext, ReactNode } from 'react';
import { useConfig } from '../lib/hooks/useConfig';
import { TranslatedSiteConfig } from '../lib/utils/configTranslator';
import { LanguageProvider } from '../lib/i18n/LanguageProvider';

interface ConfigContextType {
    config: TranslatedSiteConfig | null;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

interface ConfigProviderProps {
    children: ReactNode;
}

export function ConfigProvider({ children }: ConfigProviderProps) {
    const { config, loading, error, refresh } = useConfig();

    const value: ConfigContextType = {
        config,
        loading,
        error,
        refresh,
    };

    return (
        <ConfigContext.Provider value={value}>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </ConfigContext.Provider>
    );
}

export function useConfigContext() {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfigContext must be used within a ConfigProvider');
    }
    return context;
} 