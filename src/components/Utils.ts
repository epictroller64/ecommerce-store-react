import { toast } from "react-hot-toast";
import { ApiResponse } from "../lib/interface/ApiResponse";


// Automatically handle toast messages for API responses
export async function handleWithToast<T>(promise: Promise<ApiResponse<T>>, t: (key: string, params?: Record<string, string | number>) => string, successMessage?: string, errorMessage?: string) {
    return promise.then(data => {
        if (data.success) {
            if (successMessage) {
                toast.success(successMessage);
            }
            else {
                toast.success(t(data.message))
            }
            return data;
        }
        if (errorMessage) {
            toast.error(errorMessage);
        }
        else {
            toast.error(t(data.message))
        }
        return data;
    }).catch(error => {
        throw error;
    });
}