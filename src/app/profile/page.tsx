import { LocalApi } from "../../lib/api/LocalApi";
import ProfileOverview from "../../components/Profile/ProfileOverview";

export default async function Profile() {
    // Fetch user data
    const userResponse = await LocalApi.getUser(""); // Empty string as token is handled by getAuthToken
    if (userResponse.error || !userResponse.data) {
        // TODO: Redirect to login if not authenticated
        return null;
    }

    // Fetch orders data
    const ordersResponse = await LocalApi.getOrders();
    if (ordersResponse.error || !ordersResponse.data) {
        // If orders fail, we'll still show the profile with empty orders
        return <ProfileOverview user={userResponse.data} orders={[]} />;
    }

    return <ProfileOverview user={userResponse.data} orders={ordersResponse.data} />;
}
