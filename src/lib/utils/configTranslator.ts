import { SiteConfig } from '../interface/SiteConfig';

export interface TranslatedSiteConfig {
    siteInfo: {
        name: string;
        description: string;
        logo: string;
        favicon: string;
        domain: string;
    };
    theme: SiteConfig['theme'];
    content: {
        hero: {
            title: string;
            subtitle: string;
            images: string[];
            autoPlay: boolean;
            autoPlayInterval: number;
        };
        featured: {
            enabled: boolean;
            title: string;
            subtitle: string;
            productIds: string[];
        };
        categories: {
            enabled: boolean;
            title: string;
            subtitle: string;
            featuredCategories: string[];
        };
    };
    navigation: {
        mainMenu: Array<{
            id: string;
            label: string;
            url: string;
            children?: Array<{
                id: string;
                label: string;
                url: string;
                icon?: string;
                external?: boolean;
            }>;
            icon?: string;
            external?: boolean;
        }>;
        footerLinks: Array<{
            id: string;
            label: string;
            url: string;
            external?: boolean;
        }>;
        socialLinks: SiteConfig['navigation']['socialLinks'];
    };
    ecommerce: {
        currency: string;
        currencySymbol: string;
        taxRate: number;
        shippingMethods: Array<{
            id: string;
            name: string;
            price: number;
            estimatedDays: string;
            enabled: boolean;
        }>;
        paymentMethods: Array<{
            id: string;
            name: string;
            icon: string;
            enabled: boolean;
            processingFee?: number;
        }>;
        inventoryManagement: boolean;
        stockThreshold: number;
    };
    seo: {
        title: string;
        description: string;
        keywords: string[];
        ogImage: string;
        canonicalUrl: string;
    };
    analytics: SiteConfig['analytics'];
    features: SiteConfig['features'];
    api: SiteConfig['api'];
    language: SiteConfig['language'];
}

export function translateConfig(
    config: SiteConfig,
    translate: (key: string) => string
): TranslatedSiteConfig {
    return {
        siteInfo: {
            name: config.siteInfo.name,
            description: translate(config.siteInfo.descriptionTranslationKey),
            logo: config.siteInfo.logo,
            favicon: config.siteInfo.favicon,
            domain: config.siteInfo.domain,
        },
        theme: config.theme,
        content: {
            hero: {
                title: translate(config.content.hero.titleTranslationKey),
                subtitle: translate(config.content.hero.subtitleTranslationKey),
                images: config.content.hero.images,
                autoPlay: config.content.hero.autoPlay,
                autoPlayInterval: config.content.hero.autoPlayInterval,
            },
            featured: {
                enabled: config.content.featured.enabled,
                title: translate(config.content.featured.titleTranslationKey),
                subtitle: translate(config.content.featured.subtitleTranslationKey),
                productIds: config.content.featured.productIds,
            },
            categories: {
                enabled: config.content.categories.enabled,
                title: translate(config.content.categories.titleTranslationKey),
                subtitle: translate(config.content.categories.subtitleTranslationKey),
                featuredCategories: config.content.categories.featuredCategories,
            },
        },
        navigation: {
            mainMenu: config.navigation.mainMenu.map(item => ({
                id: item.id,
                label: translate(item.translationKey),
                url: item.url,
                children: item.children?.map(child => ({
                    id: child.id,
                    label: translate(child.translationKey),
                    url: child.url,
                    icon: child.icon,
                    external: child.external,
                })),
                icon: item.icon,
                external: item.external,
            })),
            footerLinks: config.navigation.footerLinks.map(item => ({
                id: item.id,
                label: translate(item.translationKey),
                url: item.url,
                external: item.external,
            })),
            socialLinks: config.navigation.socialLinks,
        },
        ecommerce: {
            currency: config.ecommerce.currency,
            currencySymbol: config.ecommerce.currencySymbol,
            taxRate: config.ecommerce.taxRate,
            shippingMethods: config.ecommerce.shippingMethods.map(method => ({
                id: method.id,
                name: translate(method.nameTranslationKey),
                price: method.price,
                estimatedDays: translate(method.estimatedDaysTranslationKey),
                enabled: method.enabled,
            })),
            paymentMethods: config.ecommerce.paymentMethods.map(method => ({
                id: method.id,
                name: translate(method.nameTranslationKey),
                icon: method.icon,
                enabled: method.enabled,
                processingFee: method.processingFee,
            })),
            inventoryManagement: config.ecommerce.inventoryManagement,
            stockThreshold: config.ecommerce.stockThreshold,
        },
        seo: {
            title: translate(config.seo.titleTranslationKey),
            description: translate(config.seo.descriptionTranslationKey),
            keywords: config.seo.keywords,
            ogImage: config.seo.ogImage,
            canonicalUrl: config.seo.canonicalUrl,
        },
        analytics: config.analytics,
        features: config.features,
        api: config.api,
        language: config.language,
    };
} 