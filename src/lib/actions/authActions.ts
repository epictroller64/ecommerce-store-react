'use server'
import { cookies } from "next/headers";
import { LocalApi } from "../api/LocalApi";
import { loginUserSchema, registerUserSchema } from "../schemas/zodSchemas";
import z from "zod";

export async function loginUser(data: z.infer<typeof loginUserSchema>) {
    const validatedData = loginUserSchema.safeParse(data);
    // backend sends translation keys as error message
    if (!validatedData.success) {
        return { error: validatedData.error.message, success: false };
    }
    const response = await LocalApi.loginUser(validatedData.data);
    if (response.error) {
        return { error: response.error, success: false };
    }
    if (!response.data) {
        return { error: "No data received from server", success: false };
    }

    //Set httponly cookie
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
    return { success: true, error: null };
}


export async function registerUser(data: z.infer<typeof registerUserSchema>) {
    const validatedData = registerUserSchema.safeParse(data);
    if (!validatedData.success) {
        return { error: validatedData.error.message };
    }

    const response = await LocalApi.registerUser(validatedData.data);

    if (response.error) {
        return { error: response.error };
    }

    if (!response.data) {
        return { error: "No data received from server" };
    }

    //Set httponly cookie
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
    return { success: true };
}