"use client"
import Link from "next/link";
import { useConfigContext } from "./ConfigProvider";
import { useLanguage } from "../lib/i18n/LanguageProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useCartStore } from "../lib/stores/cartStore";

export function NavBar() {
    const { config, loading } = useConfigContext();
    const { t } = useLanguage();
    const { getCartCount } = useCartStore();

    if (loading) {
        return (
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0">
                            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    const siteInfo = config?.siteInfo || {
        name: 'E-Commerce Store',
        description: 'Your one-stop shop for amazing products',
        logo: '/logo.svg',
        favicon: '/favicon.ico',
        domain: 'localhost:3000',
    };

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold text-gray-900">
                            {siteInfo.name}
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                                {t('navigation.home')}
                            </Link>
                            <Link href="/products" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                                {t('navigation.products')}
                            </Link>
                            <Link href="/login" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                                {t('navigation.login')}
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <LanguageSwitcher variant="dropdown" />
                        <Link href="/cart" className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                            </svg>
                            {t('navigation.cart')}
                            {getCartCount() > 0 && (
                                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full min-w-[1.25rem] h-5">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button
                            type="button"
                            className="text-gray-900 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                            onClick={() => {
                            }}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="md:hidden hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className="text-gray-900 hover:text-gray-600 block px-3 py-2 text-base font-medium">
                            {t('navigation.home')}
                        </Link>
                        <a href="/products" className="text-gray-900 hover:text-gray-600 block px-3 py-2 text-base font-medium">
                            {t('navigation.products')}
                        </a>
                        <a href="/login" className="text-gray-900 hover:text-gray-600 block px-3 py-2 text-base font-medium">
                            {t('navigation.login')}
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}