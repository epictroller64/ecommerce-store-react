'use client'
import { CartItem, useCartStore } from "../../lib/stores/cartStore";
import { useLanguage } from "../../lib/i18n/LanguageProvider";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Button, { RoundedButton } from "../../components/UI/Button";
import Minus from "../../components/SVG/Minus";
import Plus from "../../components/SVG/Plus";

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
                            <HiOutlineShoppingCart className="w-full h-full" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {t('cart.empty.title') || 'Your cart is empty'}
                        </h2>
                        <p className="text-gray-600 mb-8">
                            {t('cart.empty.description') || 'Add some products to get started'}
                        </p>
                        <Button variant="primary" size="lg">
                            <Link
                                href="/products"
                            >
                                {t('cart.empty.shopNow') || 'Shop Now'}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-lg">
                    <div className="px-6 py-4 ">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {t('cart.title') || 'Shopping Cart'}
                            </h1>
                            <span className="text-sm text-gray-500">
                                {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'}
                            </span>
                        </div>
                    </div>

                    <div className="px-6 py-4 rounded-lg bg-white">
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.variant.id} className="flex items-center space-x-4 py-4">
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
                                        <RoundedButton
                                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            size="md"
                                        >
                                            <Minus />
                                        </RoundedButton>
                                        <span className="w-12 text-center font-medium">
                                            {item.quantity}
                                        </span>
                                        <RoundedButton
                                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                            size="md"
                                        >
                                            <Plus></Plus>
                                        </RoundedButton>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-gray-900">
                                            {formatPrice(item.variant.price * item.quantity)}
                                        </p>
                                        <Button
                                            variant="ghost"
                                            onClick={() => removeFromCart(item.variant)}
                                            className="text-red-600 hover:text-red-800 text-sm mt-1 transition-colors"
                                        >
                                            {t('cart.remove') || 'Remove'}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="px-6 py-4  bg-gray-50">
                        <div className="flex items-center justify-between mb-4">
                            <Button
                                variant="ghost"
                                onClick={clearCart}
                                className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                            >
                                {t('cart.clearAll') || 'Clear Cart'}
                            </Button>
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
                            <Button variant="primary" size="lg">
                                <Link
                                    href="/checkout"
                                >
                                    {t('cart.checkout') || 'Proceed to Checkout'}
                                </Link>
                            </Button>
                            <Button variant="secondary" size="lg">
                                <Link
                                    href="/products"
                                >
                                    {t('cart.continueShopping') || 'Continue Shopping'}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}