'use server'
import { LocalApi } from "../api/LocalApi";
import { ApiResponse, createErrorResponse, createSuccessResponse } from "../interface/ApiResponse";
import { UpdateUserSettingsRequest } from "../interface/Request";
import { User } from "../interface/User";
import { updateUserSettingsSchema } from "../schemas/zodSchemas";
import { createAction } from "./action";
import { getCookieAuthentication } from "./authActions";


export const updateUserSettings = createAction(updateUserSettingsSchema, async (parsedInput: UpdateUserSettingsRequest) => {
    return LocalApi.updateUserSettings(parsedInput);
});


export async function updateUserSettings_(data: UpdateUserSettingsRequest): Promise<ApiResponse<User>> {
    const parsedData = updateUserSettingsSchema.safeParse(data);
    if (!parsedData.success) {
        return {
            success: false,
            error: {
                message: parsedData.error.message,
                code: "400",
                timestamp: new Date().toISOString() // todo: gotta make sure clocks are synced
            },
            message: "settings.failedToUpdate"
        }
    }
    return await LocalApi.updateUserSettings(data);
}
export async function getUser(): Promise<ApiResponse<User>> {
    const { token } = await getCookieAuthentication();
    if (!token) {
        return createErrorResponse("400", "user.noToken", {
            details: "No token found"
        });
    }
    const response = await LocalApi.getUser(token.value);
    if (response.error) {
        return createErrorResponse("400", "user.failedToGet", {
            details: response.error
        });
    }
    if (!response.data) {
        return createErrorResponse("400", "user.noDataReceived", {
            details: "No data received from server"
        });
    }
    return createSuccessResponse(response.data, "user.getSuccess");
}