import OrdersPage from "../../../components/Profile/Orders";
import { LocalApi } from "../../../lib/api/LocalApi";

export default async function Orders() {
    //todo: Redirect to login if not authed
    const orders = await LocalApi.getOrders();
    if (orders.error || !orders.data) {
        return null
    }
    return <OrdersPage orders={orders.data} />
}