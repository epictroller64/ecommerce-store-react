import { User } from "../interface/User";

export function useAuth(user: User | undefined) {
    const isAuthenticated = !!user;

    return {
        user,
        isAuthenticated,
        userId: user?.id,
        userName: user?.name,
        userEmail: user?.email,
    };
} 