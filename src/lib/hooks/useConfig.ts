import { useState, useEffect, useCallback } from 'react';
import { SiteConfig } from '../interface/SiteConfig';
import { LocalApi } from '../api/LocalApi';
import { translateConfig, TranslatedSiteConfig } from '../utils/configTranslator';
import { useLanguage } from '../i18n/LanguageProvider';

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
            setError(err instanceof Error ? err.message : 'Failed to load configuration');
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

    // Translate config when it changes or when translation function changes
    useEffect(() => {
        if (config && t) {
            const translated = translateConfig(config, t);
            setTranslatedConfig(translated);
        }
    }, [config, t]);

    return { config: translatedConfig, loading, error, refresh };
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

export function useTheme() {
    return useConfigSection('theme');
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