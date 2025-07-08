'use client'

import { useEffect, useState } from 'react';
import { PaymentMethod } from '../../lib/interface/PaymentMethod';
import { DeliveryMethod } from '../../lib/interface/DeliveryMethod';
import { useCartStore } from '../../lib/stores/cartStore';
import { ComponentStyles } from '../../lib/styles/componentStyles';
import CheckoutLoading from './CheckoutLoading';
import CheckoutError from './CheckoutError';
import { useForm } from 'react-hook-form';
import { completeCheckoutSchema } from '../../lib/schemas/zodSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from '../../lib/hooks/useTranslations';
import { handleWithToast } from '../Utils';
import { completeCheckout } from '../../lib/actions/orderActions';

interface CheckoutFormProps {
    orderId: string;
    paymentMethods: PaymentMethod[];
    deliveryMethods: DeliveryMethod[];
}

export default function CheckoutForm({ orderId, paymentMethods, deliveryMethods }: CheckoutFormProps) {
    const form = useForm<z.infer<typeof completeCheckoutSchema>>({
        resolver: zodResolver(completeCheckoutSchema),
        defaultValues: {
            orderId,
            paymentMethodId: '',
            deliveryMethodId: '',
        },
    });
    const { t } = useTranslations();
    const router = useRouter();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    const { getCartItems, getCartTotal } = useCartStore();
    const cartItems = getCartItems();
    const subtotal = getCartTotal();

    const selectedDelivery = deliveryMethods.find(dm => dm.id === selectedDeliveryMethod);
    const deliveryCost = selectedDelivery?.price || 0;
    const total = subtotal + deliveryCost;

    const onSubmit = async (data: z.infer<typeof completeCheckoutSchema>) => {
        const response = await handleWithToast(
            completeCheckout(data),
            t,
            'checkout.orderCompleted',
            'checkout.failedToComplete'
        );

        if (response.success && response.data) {
            router.push(`/checkout/order-confirmed/${response.data.orderId}`);
        } else {
            setError(response.error?.message || 'Something went wrong');
        }
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return <CheckoutLoading />;
    }

    if (error) {
        return (
            <CheckoutError
                error={error}
                onRetry={() => {
                    setError('');
                    setLoading(true);
                }}
            />
        );
    }

    return (
        <div className={ComponentStyles.checkout.container}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className={ComponentStyles.checkout.section.container}>
                    <h2 className={ComponentStyles.checkout.section.title}>{t('orderSummary')}</h2>
                    <div className={ComponentStyles.checkout.section.content}>
                        {cartItems.map((item, index) => (
                            <div key={index} className={ComponentStyles.checkout.orderSummary.item}>
                                <div className={ComponentStyles.checkout.orderSummary.itemContent}>
                                    <p className={ComponentStyles.checkout.orderSummary.itemName}>{item.variant.name}</p>
                                    <p className={ComponentStyles.checkout.orderSummary.itemDetails}>Qty: {item.quantity}</p>
                                </div>
                                <p className={ComponentStyles.checkout.orderSummary.itemPrice}>${(item.variant.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                        <div className={ComponentStyles.checkout.orderSummary.item}>
                            <span className="font-medium">{t('subtotal')}</span>
                            <span className="font-semibold">${subtotal.toFixed(2)}</span>
                        </div>
                        {selectedDelivery && (
                            <div className={ComponentStyles.checkout.orderSummary.item}>
                                <span className="font-medium">{t('shipping')}</span>
                                <span className="font-semibold">${deliveryCost.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center py-2">
                            <span className={ComponentStyles.checkout.orderSummary.total}>{t('total')}</span>
                            <span className={ComponentStyles.checkout.orderSummary.total}>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className={ComponentStyles.checkout.section.container}>
                    <h2 className={ComponentStyles.checkout.section.title}>{t('paymentMethod')}</h2>
                    <div className={ComponentStyles.checkout.section.content}>
                        {paymentMethods.filter(pm => pm.isAvailable).map((method) => (
                            <label key={method.id} className={ComponentStyles.checkout.paymentMethod.container}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={method.id}
                                    checked={selectedPaymentMethod === method.id}
                                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                    className={ComponentStyles.checkout.paymentMethod.radio}
                                />
                                <div className={ComponentStyles.checkout.paymentMethod.content}>
                                    <span className={ComponentStyles.checkout.paymentMethod.icon}>{method.icon}</span>
                                    <div className={ComponentStyles.checkout.paymentMethod.details}>
                                        <p className={ComponentStyles.checkout.paymentMethod.name}>{method.name}</p>
                                        <p className={ComponentStyles.checkout.paymentMethod.description}>{method.description}</p>
                                        {method.processingFee && method.processingFee > 0 && (
                                            <p className={ComponentStyles.checkout.paymentMethod.fee}>Fee: ${method.processingFee.toFixed(2)}</p>
                                        )}
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div className={ComponentStyles.checkout.section.container}>
                    <h2 className={ComponentStyles.checkout.section.title}>{t('deliveryMethod')}</h2>
                    <div className={ComponentStyles.checkout.section.content}>
                        {deliveryMethods.filter(dm => dm.isAvailable).map((method) => (
                            <label key={method.id} className={ComponentStyles.checkout.deliveryMethod.container}>
                                <input
                                    type="radio"
                                    name="deliveryMethod"
                                    value={method.id}
                                    checked={selectedDeliveryMethod === method.id}
                                    onChange={(e) => setSelectedDeliveryMethod(e.target.value)}
                                    className={ComponentStyles.checkout.deliveryMethod.radio}
                                />
                                <div className={ComponentStyles.checkout.deliveryMethod.content}>
                                    <span className={ComponentStyles.checkout.deliveryMethod.icon}>{method.icon}</span>
                                    <div className={ComponentStyles.checkout.deliveryMethod.details}>
                                        <div className={ComponentStyles.checkout.deliveryMethod.header}>
                                            <div>
                                                <p className={ComponentStyles.checkout.deliveryMethod.name}>{method.name}</p>
                                                <p className={ComponentStyles.checkout.deliveryMethod.description}>{method.description}</p>
                                                <p className={ComponentStyles.checkout.deliveryMethod.estimatedDays}>{method.estimatedDays}</p>
                                            </div>
                                            <p className={ComponentStyles.checkout.deliveryMethod.price}>${method.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div className={ComponentStyles.checkout.submitButton.container}>
                    <button
                        type="submit"
                        disabled={!selectedPaymentMethod || !selectedDeliveryMethod}
                        className={ComponentStyles.checkout.submitButton.button}
                    >
                        {form.formState.isSubmitting ? t('processing') : t('completeOrder', { total: total.toFixed(2) })}
                    </button>
                </div>
            </form>
        </div>
    );
} 