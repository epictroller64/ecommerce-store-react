import { useState, useEffect, useCallback } from 'react';
import { SiteConfig } from '../interface/SiteConfig';
import { LocalApi } from '../api/LocalApi';
import { translateConfig, TranslatedSiteConfig } from '../utils/configTranslator';
import { useLanguage } from '../i18n/LanguageProvider';
import { ThemeConfig } from '../Style';

interface UseConfigReturn {
    config: TranslatedSiteConfig | null;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

export function useConfig(): UseConfigReturn {
    const [config, setConfig] = useState<SiteConfig | null>(null);
    const [translatedConfig, setTranslatedConfig] = useState<TranslatedSiteConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useLanguage();

    const fetchConfig = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const fetchedConfig = await LocalApi.getConfig();
            if (fetchedConfig.success && fetchedConfig.data) {
                setConfig(fetchedConfig.data);
            } else {
                setError(fetchedConfig.error?.message || 'Failed to load configuration');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load configuration';
            setError(errorMessage);
            console.error('Config fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const refresh = useCallback(async () => {
        await fetchConfig();
    }, [fetchConfig]);

    useEffect(() => {
        fetchConfig();
    }, [fetchConfig]);

    useEffect(() => {
        if (config && t) {
            const translated = translateConfig(config, t);
            setTranslatedConfig(translated);
        } else if (config && !t) {
            //console.log('Config available but no translation function yet');
        }
    }, [config, t]);

    return { config: translatedConfig, loading, error, refresh };
}

// separated hook for theme otherwise its gonna loop with the config hook
export function useTheme() {
    const [theme, setTheme] = useState<ThemeConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTheme = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log('Fetching theme...');
                const fetchedConfig = await LocalApi.getConfig();
                console.log('Fetched config for theme:', fetchedConfig);
                if (fetchedConfig.success && fetchedConfig.data) {
                    setTheme(fetchedConfig.data.theme);
                    console.log('Theme set:', fetchedConfig.data.theme);
                } else {
                    setError(fetchedConfig.error?.message || 'Failed to load theme');
                    console.error('Theme fetch failed:', fetchedConfig.error);
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load theme';
                setError(errorMessage);
                console.error('Theme fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTheme();
    }, []);

    return {
        data: theme,
        loading,
        error,
    };
}

export function useConfigSection<T extends keyof TranslatedSiteConfig>(
    section: T
): { data: TranslatedSiteConfig[T] | null; loading: boolean; error: string | null } {
    const { config, loading, error } = useConfig();

    return {
        data: config ? config[section] : null,
        loading,
        error,
    };
}

export function useContent() {
    return useConfigSection('content');
}

export function useHero() {
    const { data: content, loading, error } = useContent();

    return {
        data: content?.hero || null,
        loading,
        error,
    };
}

export function useNavigation() {
    return useConfigSection('navigation');
}

export function useEcommerce() {
    return useConfigSection('ecommerce');
}

export function useFeatures() {
    return useConfigSection('features');
} 