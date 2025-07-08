import CheckoutError from "../../../../components/Checkout/CheckoutError";
import OrderConfirmation from "../../../../components/Checkout/OrderConfirmation";
import { LocalApi } from "../../../../lib/api/LocalApi";

export default async function OrderConfirmedPage({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = await params;
    const order = await LocalApi.getOrder(orderId);
    if (order.error || !order.data) {
        return <CheckoutError error={order.error?.message || 'Something went wrong'} />;
    }
    return <OrderConfirmation orderId={orderId} total={order.data.totalPrice} deliveryMethod={order.data.deliveryMethodId} paymentMethod={order.data.paymentMethodId} />;
}