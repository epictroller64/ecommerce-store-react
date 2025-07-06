'use client'
import { CartItem, useCartStore } from "../../lib/stores/cartStore";
import { useLanguage } from "../../lib/i18n/LanguageProvider";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
    const { t } = useLanguage();
    const {
        cart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
        addToCart
    } = useCartStore();

    const handleQuantityChange = (item: CartItem, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromCart(item.variant);
        } else {
            // Remove current item and add with new quantity
            removeFromCart(item.variant);
            addToCart({ ...item, quantity: newQuantity });
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16">
                        <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {t('cart.empty.title') || 'Your cart is empty'}
                        </h2>
                        <p className="text-gray-600 mb-8">
                            {t('cart.empty.description') || 'Add some products to get started'}
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                            {t('cart.empty.shopNow') || 'Shop Now'}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {t('cart.title') || 'Shopping Cart'}
                            </h1>
                            <span className="text-sm text-gray-500">
                                {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'}
                            </span>
                        </div>
                    </div>

                    <div className="px-6 py-4">
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.variant.id} className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-b-0">
                                    <div className="flex-shrink-0">
                                        {item.variant.images[0] ? (
                                            <Image
                                                src={item.variant.images[0]}
                                                alt={item.variant.name}
                                                width={80}
                                                height={80}
                                                className="rounded-md object-cover"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-medium text-gray-900 truncate">
                                            {item.variant.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {t(item.variant.translationKey)}: {item.variant.name}
                                        </p>
                                        <p className="text-lg font-semibold text-gray-900 mt-1">
                                            {formatPrice(item.variant.price)}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                            disabled={item.quantity <= 1}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                            </svg>
                                        </button>
                                        <span className="w-12 text-center font-medium">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-gray-900">
                                            {formatPrice(item.variant.price * item.quantity)}
                                        </p>
                                        <button
                                            onClick={() => removeFromCart(item.variant)}
                                            className="text-red-600 hover:text-red-800 text-sm mt-1 transition-colors"
                                        >
                                            {t('cart.remove') || 'Remove'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={clearCart}
                                className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                            >
                                {t('cart.clearAll') || 'Clear Cart'}
                            </button>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">
                                    {t('cart.total') || 'Total'}
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {formatPrice(getCartTotal())}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/products"
                                className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            >
                                {t('cart.continueShopping') || 'Continue Shopping'}
                            </Link>
                            <Link
                                href="/checkout"
                                className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                            >
                                {t('cart.checkout') || 'Proceed to Checkout'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}