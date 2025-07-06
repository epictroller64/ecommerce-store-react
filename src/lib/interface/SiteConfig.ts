import { ThemeConfig } from '../Style';
import { LanguageConfig } from './Language';


export interface HeroConfig {
    title: string;
    subtitle: string;
    images: string[];
    autoPlay: boolean;
    autoPlayInterval: number;
}


export interface SiteConfig {
    // Basic site info
    siteInfo: {
        name: string;
        description: string;
        logo: string;
        favicon: string;
        domain: string;
    };

    // Theme configuration
    theme: ThemeConfig;

    // Content configuration
    content: {
        hero: HeroConfig;
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

    // Navigation configuration
    navigation: {
        mainMenu: MenuItem[];
        footerLinks: FooterLink[];
        socialLinks: SocialLink[];
    };

    // E-commerce settings
    ecommerce: {
        currency: string;
        currencySymbol: string;
        taxRate: number;
        shippingMethods: ShippingMethod[];
        paymentMethods: PaymentMethod[];
        inventoryManagement: boolean;
        stockThreshold: number;
    };

    // SEO configuration
    seo: {
        title: string;
        description: string;
        keywords: string[];
        ogImage: string;
        canonicalUrl: string;
    };

    // Analytics and tracking
    analytics: {
        googleAnalyticsId?: string;
        facebookPixelId?: string;
        hotjarId?: string;
    };

    // Feature flags
    features: {
        reviews: boolean;
        wishlist: boolean;
        compare: boolean;
        quickView: boolean;
        liveChat: boolean;
        newsletter: boolean;
    };

    // API configuration
    api: {
        baseUrl: string;
        timeout: number;
        retryAttempts: number;
        cacheTimeout: number;
    };

    // Language configuration
    language: LanguageConfig;
}

// Supporting interfaces
export interface MenuItem {
    id: string;
    label: string;
    url: string;
    children?: MenuItem[];
    icon?: string;
    external?: boolean;
}

export interface FooterLink {
    id: string;
    label: string;
    url: string;
    external?: boolean;
}

export interface SocialLink {
    id: string;
    platform: string;
    url: string;
    icon: string;
}

export interface ShippingMethod {
    id: string;
    name: string;
    price: number;
    estimatedDays: string;
    enabled: boolean;
}

export interface PaymentMethod {
    id: string;
    name: string;
    icon: string;
    enabled: boolean;
    processingFee?: number;
}

// Configuration update interface
export interface ConfigUpdate {
    path: string;
    value: unknown;
    timestamp: Date;
    userId?: string;
}

// Configuration response interface
export interface ConfigResponse {
    success: boolean;
    data?: SiteConfig;
    error?: string;
    lastUpdated: Date;
    version: string;
} 