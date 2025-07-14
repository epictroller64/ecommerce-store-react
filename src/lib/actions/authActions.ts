'use server'
import { cookies } from "next/headers";
import { LocalApi } from "../api/LocalApi";
import { loginUserSchema, registerUserSchema } from "../schemas/zodSchemas";
import z from "zod";
import { redirect } from "next/navigation";
import { ApiResponse, createErrorResponse, createSuccessResponse } from "../interface/ApiResponse";
import { AuthResponse } from "../interface/ApiResponse";
import { createAction } from "./action";

export async function logoutUser() {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    cookieStore.delete("refreshToken");
    redirect("/");
}

export async function getCookieAuthentication() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const refreshToken = cookieStore.get("refreshToken");
    return { token, refreshToken };
}


export const loginUser = createAction(loginUserSchema, async (parsedInput: z.infer<typeof loginUserSchema>): Promise<ApiResponse<AuthResponse>> => {
    const response = await LocalApi.loginUser(parsedInput);
    if (response.error) {
        return createErrorResponse("400", "auth.loginFailed", {
            details: response.error
        });
    }

    if (!response.data) {
        return createErrorResponse("400", "auth.noDataReceived", {
            details: "No data received from server"
        });
    }

    // Set httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set("token", response.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    });
    cookieStore.set("refreshToken", response.data.refreshToken || "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });

    return createSuccessResponse(response.data, "auth.loginSuccess");
});

export const registerUser = createAction(registerUserSchema, async (parsedInput: z.infer<typeof registerUserSchema>): Promise<ApiResponse<AuthResponse>> => {
    const response = await LocalApi.registerUser(parsedInput);
    if (response.error) {
        return createErrorResponse("400", "auth.registrationFailed", {
            details: response.error
        });
    }

    if (!response.data) {
        return createErrorResponse("400", "auth.noDataReceived", {
            details: "No data received from server"
        });
    }

    // Set httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set("token", response.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    });
    cookieStore.set("refreshToken", response.data.refreshToken || "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });

    return createSuccessResponse(response.data, "auth.registrationSuccess");
});
