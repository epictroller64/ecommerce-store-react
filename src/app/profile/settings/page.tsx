import { LocalApi } from "../../../lib/api/LocalApi";
import Settings from "../../../components/Profile/Settings";

export default async function SettingsPage() {
    // Fetch user data
    const userResponse = await LocalApi.getUser(""); // Empty string as token is handled by getAuthToken
    if (userResponse.error || !userResponse.data) {
        // TODO: Redirect to login if not authenticated
        return null;
    }

    return <Settings user={userResponse.data} />;
} 