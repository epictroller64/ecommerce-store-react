import { useState, useEffect, useCallback } from 'react';
import { SiteConfig } from '../interface/SiteConfig';
import { LocalApi } from '../api/LocalApi';

interface UseConfigReturn {
    config: SiteConfig | null;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

export function useConfig(): UseConfigReturn {
    const [config, setConfig] = useState<SiteConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    return { config, loading, error, refresh };
}

export function useConfigSection<T extends keyof SiteConfig>(
    section: T
): { data: SiteConfig[T] | null; loading: boolean; error: string | null } {
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