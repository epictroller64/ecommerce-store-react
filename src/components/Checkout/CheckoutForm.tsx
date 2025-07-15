'use client'

import { useEffect, useState } from 'react';
import { PaymentMethod } from '../../lib/interface/PaymentMethod';
import { DeliveryMethod } from '../../lib/interface/DeliveryMethod';
import { useCartStore } from '../../lib/stores/cartStore';
import { ComponentStyles } from '../../lib/styles/componentStyles';
import CheckoutLoading from './CheckoutLoading';
import CheckoutError from './CheckoutError';
import { useForm } from 'react-hook-form';
import { createOrderSchema } from '../../lib/schemas/zodSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from '../../lib/hooks/useTranslations';
import { handleWithToast } from '../Utils';
import { createOrder } from '../../lib/actions/orderActions';
import Button from '../UI/Button';

interface CheckoutFormProps {
    paymentMethods: PaymentMethod[];
    deliveryMethods: DeliveryMethod[];
}

export default function CheckoutForm({ paymentMethods, deliveryMethods }: CheckoutFormProps) {
    const form = useForm<z.infer<typeof createOrderSchema>>({
        resolver: zodResolver(createOrderSchema),
        defaultValues: {
            items: [],
            paymentMethodId: '',
            deliveryMethodId: '',
            shippingAddress: {
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
            },
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

    // Update form values when selections change
    useEffect(() => {
        form.setValue('paymentMethodId', selectedPaymentMethod);
        form.setValue('deliveryMethodId', selectedDeliveryMethod);

        // Set cart items
        const items = cartItems.map(item => ({
            variantId: item.variant.id,
            quantity: item.quantity,
        }));
        form.setValue('items', items);
    }, [selectedPaymentMethod, selectedDeliveryMethod, cartItems, form]);

    const onSubmit = async (data: z.infer<typeof createOrderSchema>) => {
        const response = await handleWithToast(
            createOrder(data),
            t,
            'checkout.orderCompleted',
            'checkout.failedToComplete'
        );

        if (response.success && response.data) {
            router.push(`/checkout/order-confirmed/${response.data.id}`);
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
                    <h2 className={ComponentStyles.checkout.section.title}>{t('shippingAddress')}</h2>
                    <div className={ComponentStyles.checkout.section.content}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className={ComponentStyles.form.group}>
                                <label htmlFor="street" className={ComponentStyles.form.label}>
                                    {t('street')} *
                                </label>
                                <input
                                    id="street"
                                    type="text"
                                    {...form.register('shippingAddress.street')}
                                    className={form.formState.errors.shippingAddress?.street ? ComponentStyles.auth.form.inputError : ComponentStyles.form.input}
                                    placeholder={t('streetPlaceholder')}
                                />
                                {form.formState.errors.shippingAddress?.street && (
                                    <p className={ComponentStyles.form.error}>
                                        {form.formState.errors.shippingAddress.street.message}
                                    </p>
                                )}
                            </div>

                            <div className={ComponentStyles.form.group}>
                                <label htmlFor="city" className={ComponentStyles.form.label}>
                                    {t('city')} *
                                </label>
                                <input
                                    id="city"
                                    type="text"
                                    {...form.register('shippingAddress.city')}
                                    className={form.formState.errors.shippingAddress?.city ? ComponentStyles.auth.form.inputError : ComponentStyles.form.input}
                                    placeholder={t('cityPlaceholder')}
                                />
                                {form.formState.errors.shippingAddress?.city && (
                                    <p className={ComponentStyles.form.error}>
                                        {form.formState.errors.shippingAddress.city.message}
                                    </p>
                                )}
                            </div>

                            <div className={ComponentStyles.form.group}>
                                <label htmlFor="state" className={ComponentStyles.form.label}>
                                    {t('state')} *
                                </label>
                                <input
                                    id="state"
                                    type="text"
                                    {...form.register('shippingAddress.state')}
                                    className={form.formState.errors.shippingAddress?.state ? ComponentStyles.auth.form.inputError : ComponentStyles.form.input}
                                    placeholder={t('statePlaceholder')}
                                />
                                {form.formState.errors.shippingAddress?.state && (
                                    <p className={ComponentStyles.form.error}>
                                        {form.formState.errors.shippingAddress.state.message}
                                    </p>
                                )}
                            </div>

                            <div className={ComponentStyles.form.group}>
                                <label htmlFor="zipCode" className={ComponentStyles.form.label}>
                                    {t('zipCode')} *
                                </label>
                                <input
                                    id="zipCode"
                                    type="text"
                                    {...form.register('shippingAddress.zipCode')}
                                    className={form.formState.errors.shippingAddress?.zipCode ? ComponentStyles.auth.form.inputError : ComponentStyles.form.input}
                                    placeholder={t('zipCodePlaceholder')}
                                />
                                {form.formState.errors.shippingAddress?.zipCode && (
                                    <p className={ComponentStyles.form.error}>
                                        {form.formState.errors.shippingAddress.zipCode.message}
                                    </p>
                                )}
                            </div>

                            <div className={ComponentStyles.form.group}>
                                <label htmlFor="country" className={ComponentStyles.form.label}>
                                    {t('country')} *
                                </label>
                                <input
                                    id="country"
                                    type="text"
                                    {...form.register('shippingAddress.country')}
                                    className={form.formState.errors.shippingAddress?.country ? ComponentStyles.auth.form.inputError : ComponentStyles.form.input}
                                    placeholder={t('countryPlaceholder')}
                                />
                                {form.formState.errors.shippingAddress?.country && (
                                    <p className={ComponentStyles.form.error}>
                                        {form.formState.errors.shippingAddress.country.message}
                                    </p>
                                )}
                            </div>
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
                        {form.formState.errors.paymentMethodId && (
                            <p className={ComponentStyles.form.error}>
                                {form.formState.errors.paymentMethodId.message}
                            </p>
                        )}
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
                        {form.formState.errors.deliveryMethodId && (
                            <p className={ComponentStyles.form.error}>
                                {form.formState.errors.deliveryMethodId.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className={ComponentStyles.checkout.submitButton.container}>
                    <Button
                        type="submit"
                        disabled={!selectedPaymentMethod || !selectedDeliveryMethod || form.formState.isSubmitting}
                        className={ComponentStyles.checkout.submitButton.button}
                    >
                        {form.formState.isSubmitting ? t('processing') : t('completeOrder', { total: total.toFixed(2) })}
                    </Button>
                </div>
            </form>
        </div>
    );
} 