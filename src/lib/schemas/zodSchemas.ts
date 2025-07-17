import { z } from "zod";

export const registerUserSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});


export const createOrderSchema = z.object({
    items: z.array(z.object({
        variantId: z.string(),
        quantity: z.number().min(1),
    })).min(1),
    deliveryMethodId: z.string(),
    paymentMethodId: z.string(),
    shippingAddress: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
        country: z.string(),
    }),
});

export const completeCheckoutSchema = z.object({
    orderId: z.string(),
    paymentMethodId: z.string(),
    deliveryMethodId: z.string(),
});

export const cancelOrderSchema = z.object({
    orderId: z.string(),
});

export const updateUserSettingsSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    currentPassword: z.string().optional(),
    newPassword: z.string().min(6, "Password must be at least 6 characters").optional(),
    confirmPassword: z.string().optional(),
}).refine((data) => {
    // If any password field is filled, all password fields are required
    const hasPasswordFields = data.currentPassword || data.newPassword || data.confirmPassword;
    if (hasPasswordFields) {
        return data.currentPassword && data.newPassword && data.confirmPassword;
    }
    return true;
}, {
    message: "All password fields are required when changing password",
    path: ["currentPassword"],
}).refine((data) => {
    // If new password is provided, confirm password gotta match
    if (data.newPassword && data.confirmPassword) {
        return data.newPassword === data.confirmPassword;
    }
    return true;
}, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


export const createReviewSchema = z.object({
    productId: z.string().uuid("Invalid product ID"),
    rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
    comment: z.string().optional(),
});
