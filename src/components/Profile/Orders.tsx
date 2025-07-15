import { FaBox } from 'react-icons/fa';
import TranslatedText from '../Text';
import Button from '../UI/Button';
import { ComponentStyles } from '../../lib/styles/componentStyles';
import { Order } from '../../lib/interface/Order';
import Badge from '../UI/Badge';
import ManageOrder from './ManageOrder';
import { getStatusColor, getStatusIcon } from './ProfileUtils';
import Link from 'next/link';



export default function OrdersPage({ orders }: { orders: Order[] }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <TranslatedText className="text-3xl font-bold text-gray-900 mb-2" textTag="h1">
                    navigation.orders
                </TranslatedText>
                <TranslatedText className="text-gray-600" textTag="p">
                    View and track your order history
                </TranslatedText>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-12">
                    <FaBox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <TranslatedText className="text-xl text-gray-600 mb-4" textTag="h2">
                        No orders found
                    </TranslatedText>
                    <TranslatedText className="text-gray-500 mb-6" textTag="p">
                        You haven&apos;t placed any orders yet
                    </TranslatedText>
                    <Button variant="primary">
                        <Link href="/">
                            <TranslatedText>order.continueShopping</TranslatedText>
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className={`${ComponentStyles.checkout.section.container}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <TranslatedText className="text-sm text-gray-600" textTag="span">
                                            order.orderId
                                        </TranslatedText>
                                        <span className="font-mono text-sm">{order.id}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge color={getStatusColor(order.status)}>
                                        <span className='flex items-center gap-1'>
                                            {getStatusIcon(order.status)}
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </Badge>
                                </div>
                            </div>

                            <div className="space-y-3 mb-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                        <div>
                                            <div className="font-medium">{item.variant.name}</div>
                                            {item.variant.label && (
                                                <div className="text-sm text-gray-500">{item.variant.label}</div>
                                            )}
                                            <div className="text-sm text-gray-500">
                                                Quantity: {item.quantity}
                                            </div>
                                        </div>
                                        <div className="font-medium">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <ManageOrder order={order} />
                                <div className="text-right">
                                    <TranslatedText className="text-sm text-gray-600" textTag="div">
                                        order.totalAmount
                                    </TranslatedText>
                                    <div className="text-xl font-bold">
                                        ${order.totalPrice.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}