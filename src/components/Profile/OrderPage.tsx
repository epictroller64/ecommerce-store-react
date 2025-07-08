'use client'
import { FaArrowLeft } from 'react-icons/fa';
import { useLanguage } from '../../lib/i18n/LanguageProvider';
import { Order } from '../../lib/interface/Order';
import { ComponentStyles } from '../../lib/styles/componentStyles';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import { getStatusColor, getStatusIcon } from './ProfileUtils';


export default function OrderPage({ order }: { order: Order }) {
    const { t } = useLanguage();

    return (
        <div className={ComponentStyles.orderPage.container}>
            <div className={ComponentStyles.orderPage.header.container}>
                <div className="flex items-center gap-4 mb-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2"
                    >
                        <FaArrowLeft className="w-4 h-4" />
                        {t('common.back')}
                    </Button>
                </div>
                <h1 className={ComponentStyles.orderPage.header.title}>
                    {t('order.orderDetails')}
                </h1>
                <p className={ComponentStyles.orderPage.header.subtitle}>
                    {t('order.orderId')}: {order.id}
                </p>
            </div>
            <div className={ComponentStyles.orderPage.orderInfo.container}>
                <div className={ComponentStyles.orderPage.orderInfo.header}>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={ComponentStyles.orderPage.orderInfo.orderId}>
                                {t('order.orderId')}:
                            </span>
                            <span className={ComponentStyles.orderPage.orderInfo.orderIdValue}>
                                {order.id}
                            </span>
                        </div>
                        <div className={ComponentStyles.orderPage.orderInfo.date}>
                            {t('common.date')}: {order.createdAt.toLocaleDateString()}
                        </div>
                    </div>
                    <div className={ComponentStyles.orderPage.orderInfo.status}>
                        <Badge color={getStatusColor(order.status)}>
                            <span className="flex items-center gap-1">
                                {getStatusIcon(order.status)}
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                        </Badge>
                    </div>
                </div>
            </div>

            <div className={ComponentStyles.orderPage.orderItems.container}>
                <h2 className={ComponentStyles.orderPage.orderItems.title}>
                    {t('navigation.cart.items')}
                </h2>
                <div className="space-y-2">
                    {order.items.map((item) => (
                        <div key={item.id} className={ComponentStyles.orderPage.orderItems.item}>
                            <div className={ComponentStyles.orderPage.orderItems.itemContent}>
                                <div className={ComponentStyles.orderPage.orderItems.itemName}>
                                    {item.variant.name}
                                </div>
                                {item.variant.label && (
                                    <div className={ComponentStyles.orderPage.orderItems.itemVariant}>
                                        {item.variant.label}
                                    </div>
                                )}
                                <div className={ComponentStyles.orderPage.orderItems.itemQuantity}>
                                    {t('navigation.cart.quantity')}: {item.quantity}
                                </div>
                            </div>
                            <div className={ComponentStyles.orderPage.orderItems.itemPrice}>
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={ComponentStyles.orderPage.orderSummary.container}>
                <h2 className={ComponentStyles.orderPage.orderSummary.title}>
                    {t('navigation.cart.orderSummary')}
                </h2>
                <div className="space-y-2">
                    <div className={ComponentStyles.orderPage.orderSummary.row}>
                        <span className={ComponentStyles.orderPage.orderSummary.label}>
                            {t('navigation.cart.subtotal')}:
                        </span>
                        <span className={ComponentStyles.orderPage.orderSummary.value}>
                            ${order.totalPrice.toFixed(2)}
                        </span>
                    </div>
                    <div className={ComponentStyles.orderPage.orderSummary.row}>
                        <span className={ComponentStyles.orderPage.orderSummary.label}>
                            {t('order.paymentMethod')}:
                        </span>
                        <span className={ComponentStyles.orderPage.orderSummary.value}>
                            {order.paymentMethodId}
                        </span>
                    </div>
                    <div className={ComponentStyles.orderPage.orderSummary.row}>
                        <span className={ComponentStyles.orderPage.orderSummary.label}>
                            {t('order.deliveryMethod')}:
                        </span>
                        <span className={ComponentStyles.orderPage.orderSummary.value}>
                            {order.deliveryMethodId}
                        </span>
                    </div>
                    <div className={`${ComponentStyles.orderPage.orderSummary.row} ${ComponentStyles.orderPage.orderSummary.total}`}>
                        <span className={ComponentStyles.orderPage.orderSummary.label}>
                            {t('navigation.cart.total')}:
                        </span>
                        <span className={ComponentStyles.orderPage.orderSummary.value}>
                            ${order.totalPrice.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
} 