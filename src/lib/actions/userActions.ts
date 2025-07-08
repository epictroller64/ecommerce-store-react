'use server'
import { LocalApi } from "../api/LocalApi";
import { ApiResponse } from "../interface/ApiResponse";
import { UpdateUserSettingsRequest } from "../interface/Request";
import { User } from "../interface/User";
import { updateUserSettingsSchema } from "../schemas/zodSchemas";
import { createAction } from "./action";


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