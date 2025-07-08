"use client"
import Link from "next/link";
import { useConfigContext } from "./ConfigProvider";
import { useLanguage } from "../lib/i18n/LanguageProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useCartStore } from "../lib/stores/cartStore";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Button from "./UI/Button";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ComponentStyles } from "../lib/styles/componentStyles";

export function NavBar() {
    const { config, loading } = useConfigContext();
    const { t } = useLanguage();
    const { getCartCount } = useCartStore();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        console.log(`t changed: `)
    }, [t]);
    if (loading) {
        return (
            <nav className={ComponentStyles.navbar.container}>
                <div className={ComponentStyles.navbar.content}>
                    <div className={ComponentStyles.navbar.header}>
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
        <nav className={ComponentStyles.navbar.container}>
            <div className={ComponentStyles.navbar.content}>
                <div className={ComponentStyles.navbar.header}>
                    <div className="flex-shrink-0 md:block hidden">
                        <Link href="/" className={ComponentStyles.navbar.logo}>
                            {siteInfo.name}
                        </Link>
                    </div>

                    <div className={ComponentStyles.navbar.desktopMenu}>
                        <div className={ComponentStyles.navbar.desktopMenuItems}>
                            {config?.navigation.mainMenu.map((item) => (
                                <NavButton key={item.id} href={item.url}>
                                    {item.label}
                                </NavButton>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <div className="hidden sm:block">
                            <LanguageSwitcher variant="dropdown" />
                        </div>
                        <Link
                            href="/cart"
                            className={ComponentStyles.navbar.cartButton}
                        >
                            <HiOutlineShoppingCart className={ComponentStyles.navbar.cartIcon} />
                            <span className="hidden sm:inline">{t('navigation.cart')}</span>
                            {getCartCount() > 0 && (
                                <span className={ComponentStyles.navbar.cartBadge}>
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>
                    </div>

                    <div className={ComponentStyles.navbar.mobileMenu}>
                        <div className="sm:hidden">
                            <LanguageSwitcher variant="dropdown" />
                        </div>
                        <button
                            type="button"
                            className={ComponentStyles.navbar.mobileMenuButton}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={ComponentStyles.navbar.mobileMenuContent}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
                        {config?.navigation.mainMenu.map((item) => (
                            <Link
                                key={item.id}
                                href={item.url}
                                className={ComponentStyles.navbar.mobileMenuItem}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </nav>
    );
}

const NavButton = ({ href, children }: { href: string, children: React.ReactNode }) => {
    return (
        <Button variant="ghost" size="sm">
            <Link href={href}>
                {children}
            </Link>
        </Button>
    )
}