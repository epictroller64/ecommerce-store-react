import { SiteConfig } from '../interface/SiteConfig';
import { defaultTheme } from '../Style';
import { supportedLanguages, defaultLanguage, fallbackLanguage } from '../i18n/languages';

// placeholder config until backend is implemented
export const exampleConfig: SiteConfig = {
    siteInfo: {
        name: 'E-Commerce Store',
        descriptionTranslationKey: 'navigation.description',
        logo: '/logo.svg',
        favicon: '/favicon.ico',
        domain: 'localhost:3000',
    },
    theme: {
        ...defaultTheme,
        colors: {
            ...defaultTheme.colors,
            primary: '#FF6B35',
            accent: '#4ECDC4',
        },
    },
    content: {
        hero: {
            titleTranslationKey: 'navigation.hero.title',
            subtitleTranslationKey: 'navigation.hero.subtitle',
            images: [
                'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80',
                'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
            ],
            autoPlay: true,
            autoPlayInterval: 4000,
        },
        featured: {
            enabled: true,
            titleTranslationKey: 'navigation.featured.title',
            subtitleTranslationKey: 'navigation.featured.subtitle',
            productIds: ['prod-1', 'prod-2', 'prod-3'],
        },
        categories: {
            enabled: true,
            titleTranslationKey: 'navigation.categories.title',
            subtitleTranslationKey: 'navigation.categories.subtitle',
            featuredCategories: ['electronics', 'clothing', 'home'],
        },
    },
    navigation: {
        mainMenu: [
            { id: 'home', label: 'Home', url: '/', translationKey: 'navigation.home' },
            { id: 'products', label: 'Products', url: '/products', translationKey: 'navigation.products' },
            { id: 'categories', label: 'Categories', url: '/categories', translationKey: 'navigation.categories' },
            { id: 'deals', label: 'Deals', url: '/deals', translationKey: 'navigation.deals' },
            { id: 'about', label: 'About', url: '/about', translationKey: 'navigation.about' },
            { id: 'contact', label: 'Contact', url: '/contact', translationKey: 'navigation.contact' },
        ],
        footerLinks: [
            { id: 'privacy', label: 'Privacy Policy', url: '/privacy', translationKey: 'navigation.privacy' },
            { id: 'terms', label: 'Terms of Service', url: '/terms', translationKey: 'navigation.terms' },
            { id: 'shipping', label: 'Shipping Info', url: '/shipping', translationKey: 'navigation.shipping' },
            { id: 'returns', label: 'Returns', url: '/returns', translationKey: 'navigation.returns' },
            { id: 'faq', label: 'FAQ', url: '/faq', translationKey: 'navigation.faq' },
        ],
        socialLinks: [
            { id: 'facebook', platform: 'Facebook', url: 'https://facebook.com/myawesomestore', icon: 'facebook' },
            { id: 'twitter', platform: 'Twitter', url: 'https://twitter.com/myawesomestore', icon: 'twitter' },
            { id: 'instagram', platform: 'Instagram', url: 'https://instagram.com/myawesomestore', icon: 'instagram' },
        ],
    },
    ecommerce: {
        currency: 'USD',
        currencySymbol: '$',
        taxRate: 0.08,
        shippingMethods: [
            { id: 'standard', nameTranslationKey: 'navigation.shipping.standard', price: 5.99, estimatedDaysTranslationKey: 'navigation.shipping.estimatedDays.standard', enabled: true },
            { id: 'express', nameTranslationKey: 'navigation.shipping.express', price: 12.99, estimatedDaysTranslationKey: 'navigation.shipping.estimatedDays.express', enabled: true },
            { id: 'overnight', nameTranslationKey: 'navigation.shipping.overnight', price: 24.99, estimatedDaysTranslationKey: 'navigation.shipping.estimatedDays.overnight', enabled: true },
        ],
        paymentMethods: [
            { id: 'credit-card', nameTranslationKey: 'navigation.payment.credit-card', icon: 'credit-card', enabled: true },
            { id: 'paypal', nameTranslationKey: 'navigation.payment.paypal', icon: 'paypal', enabled: true },
            { id: 'apple-pay', nameTranslationKey: 'navigation.payment.apple-pay', icon: 'apple-pay', enabled: true },
            { id: 'google-pay', nameTranslationKey: 'navigation.payment.google-pay', icon: 'google-pay', enabled: true },
        ],
        inventoryManagement: true,
        stockThreshold: 10,
    },
    seo: {
        titleTranslationKey: 'navigation.seo.title',
        descriptionTranslationKey: 'navigation.seo.description',
        keywords: ['ecommerce', 'products', 'shopping', 'online store', 'deals', 'discounts'],
        ogImage: '/og-image.jpg',
        canonicalUrl: 'https://localhost:3000',
    },
    analytics: {
        googleAnalyticsId: 'GA-XXXXXXXXX',
        facebookPixelId: 'XXXXXXXXXX',
        hotjarId: 'XXXXXXXXXX',
    },
    features: {
        reviews: true,
        wishlist: true,
        compare: true,
        quickView: true,
        liveChat: true,
        newsletter: true,
    },
    api: {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
        timeout: 10000,
        retryAttempts: 3,
        cacheTimeout: 300000, // 5 mins
    },
    language: {
        defaultLanguage,
        supportedLanguages,
        fallbackLanguage,
        autoDetect: true,
        persistLanguage: true,
    },
};



