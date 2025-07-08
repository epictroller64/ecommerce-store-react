import { CheckoutError, CheckoutForm } from '../../../components/Checkout';
import TranslatedText from '../../../components/Text';
import { LocalApi } from '../../../lib/api/LocalApi';
import { ComponentStyles } from '../../../lib/styles/componentStyles';

interface CheckoutPageProps {
    params: Promise<{
        orderId: string;
    }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
    const { orderId } = await params;
    const paymentMethods = await LocalApi.getPaymentMethods();
    const deliveryMethods = await LocalApi.getDeliveryMethods();
    if (paymentMethods.error || deliveryMethods.error || !paymentMethods.data || !deliveryMethods.data) {
        return <CheckoutError error={paymentMethods.error?.message || deliveryMethods.error?.message || 'Something went wrong'} />;
    }
    return (
        <div className={`${ComponentStyles.layout.container} ${ComponentStyles.layout.section}`}>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <TranslatedText className="text-3xl font-bold text-gray-900 mb-2" textTag="h1">checkout</TranslatedText>
                    <TranslatedText className="text-gray-600" textTag="p">completeOrder</TranslatedText>
                </div>

                <CheckoutForm orderId={orderId} paymentMethods={paymentMethods.data?.paymentMethods} deliveryMethods={deliveryMethods.data?.deliveryMethods} />
            </div>
        </div>
    );
}