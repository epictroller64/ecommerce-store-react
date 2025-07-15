'use client'

import { FaCheck } from 'react-icons/fa';
import { ComponentStyles } from '../../lib/styles/componentStyles';
import TranslatedText from '../Text';
import Button from '../UI/Button';
import { useCartStore } from '../../lib/stores/cartStore';
import { useEffect } from 'react';
import Link from 'next/link';

interface OrderConfirmationProps {
    orderId: string;
    total: number;
    deliveryMethod: string;
    paymentMethod: string;
}

export default function OrderConfirmation({ orderId, total, deliveryMethod, paymentMethod }: OrderConfirmationProps) {
    const { clearCart } = useCartStore();
    useEffect(() => {
        clearCart();
        //clear the cart as checkout is complete
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={ComponentStyles.checkout.container}>
            <div className="text-center">
                <div className="mb-6">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <FaCheck className="w-8 h-8 text-green-600" />
                    </div>
                    <TranslatedText className='text-3xl font-bold text-gray-900 mb-2' textTag='h1'>order.orderConfirmed</TranslatedText>
                    <TranslatedText className='text-gray-600' textTag='p'>order.orderConfirmedDescription</TranslatedText>
                </div>

                <div className={`${ComponentStyles.checkout.section.container} max-w-md mx-auto`}>
                    <TranslatedText className={ComponentStyles.checkout.section.title} textTag='h2'>order.orderDetails</TranslatedText>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <TranslatedText className="text-gray-600" textTag='span'>order.orderId</TranslatedText>
                            <span className="font-medium">{orderId}</span>
                        </div>
                        <div className="flex justify-between">
                            <TranslatedText className="text-gray-600" textTag='span'>order.totalAmount</TranslatedText>
                            <span className="font-bold">${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <TranslatedText className="text-gray-600" textTag='span'>order.paymentMethod</TranslatedText>
                            <span className="font-medium">{paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                            <TranslatedText className="text-gray-600" textTag='span'>order.deliveryMethod</TranslatedText>
                            <span className="font-medium">{deliveryMethod}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    <TranslatedText className="text-gray-600" textTag='p'>order.orderConfirmedDescription</TranslatedText>
                    <div className="flex justify-center space-x-4">
                        <Button
                            variant='primary'
                        >
                            <Link href="/">
                                <TranslatedText>order.continueShopping</TranslatedText>
                            </Link>
                        </Button>
                        <Button
                            variant='outline'
                        >
                            <Link href="/profile/orders">
                                <TranslatedText>order.viewOrders</TranslatedText>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
} 