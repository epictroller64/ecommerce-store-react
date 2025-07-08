import { LocalApi } from "../../../../lib/api/LocalApi";
import OrderPage from "../../../../components/Profile/OrderPage";

export default async function Order({ params }: { params: { id: string } }) {
    const order = await LocalApi.getOrder(params.id)
    if (order.error || !order.data) {
        return null
    }
    return <OrderPage order={order.data} />
}