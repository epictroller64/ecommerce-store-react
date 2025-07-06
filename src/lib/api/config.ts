import { SiteConfig } from '../interface/SiteConfig';
import { defaultTheme } from '../Style';
import { supportedLanguages, defaultLanguage, fallbackLanguage } from '../i18n/languages';

// placeholder config until backend is implemented
export const exampleConfig: SiteConfig = {
    siteInfo: {
        name: 'E-Commerce Store',
        description: 'Your one-stop shop for amazing products',
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
            title: 'Welcome to My Awesome Store',
            subtitle: 'Discover amazing products at unbeatable prices',
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
            title: 'Featured Products',
            subtitle: 'Handpicked items just for you',
            productIds: ['prod-1', 'prod-2', 'prod-3'],
        },
        categories: {
            enabled: true,
            title: 'Shop by Category',
            subtitle: 'Find what you\'re looking for',
            featuredCategories: ['electronics', 'clothing', 'home'],
        },
    },
    navigation: {
        mainMenu: [
            { id: 'home', label: 'Home', url: '/' },
            { id: 'products', label: 'Products', url: '/products' },
            { id: 'categories', label: 'Categories', url: '/categories' },
            { id: 'deals', label: 'Deals', url: '/deals' },
            { id: 'about', label: 'About', url: '/about' },
            { id: 'contact', label: 'Contact', url: '/contact' },
        ],
        footerLinks: [
            { id: 'privacy', label: 'Privacy Policy', url: '/privacy' },
            { id: 'terms', label: 'Terms of Service', url: '/terms' },
            { id: 'shipping', label: 'Shipping Info', url: '/shipping' },
            { id: 'returns', label: 'Returns', url: '/returns' },
            { id: 'faq', label: 'FAQ', url: '/faq' },
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
            { id: 'standard', name: 'Standard Shipping', price: 5.99, estimatedDays: '3-5 business days', enabled: true },
            { id: 'express', name: 'Express Shipping', price: 12.99, estimatedDays: '1-2 business days', enabled: true },
            { id: 'overnight', name: 'Overnight', price: 24.99, estimatedDays: 'Next business day', enabled: true },
        ],
        paymentMethods: [
            { id: 'credit-card', name: 'Credit Card', icon: 'credit-card', enabled: true },
            { id: 'paypal', name: 'PayPal', icon: 'paypal', enabled: true },
            { id: 'apple-pay', name: 'Apple Pay', icon: 'apple-pay', enabled: true },
            { id: 'google-pay', name: 'Google Pay', icon: 'google-pay', enabled: true },
        ],
        inventoryManagement: true,
        stockThreshold: 10,
    },
    seo: {
        title: 'My Awesome Store - Amazing Products at Great Prices',
        description: 'Discover amazing products at unbeatable prices. Shop now for the best deals!',
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



