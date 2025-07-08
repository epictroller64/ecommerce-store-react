'use server'

import { LocalApi } from "../api/LocalApi";
import { createOrderSchema, completeCheckoutSchema } from "../schemas/zodSchemas";
import { z } from "zod";
import { ApiResponse, createErrorResponse, createSuccessResponse } from "../interface/ApiResponse";
import { Order } from "../interface/Order";
import { CompleteCheckoutResponse } from "../interface/ApiResponse";
import { createAction } from "./action";

export const createOrder = createAction(createOrderSchema, async (parsedInput: z.infer<typeof createOrderSchema>): Promise<ApiResponse<Order>> => {
    const response = await LocalApi.createOrder(parsedInput);
    if (response.error || !response.data) {
        return createErrorResponse("400", "order.failedToCreate", {
            details: response.error?.message || "Failed to create order"
        });
    }
    return createSuccessResponse(response.data, "order.createdSuccessfully");
});

export const completeCheckout = createAction(completeCheckoutSchema, async (parsedInput: z.infer<typeof completeCheckoutSchema>): Promise<ApiResponse<CompleteCheckoutResponse>> => {
    const response = await LocalApi.completeCheckout(parsedInput);
    if (response.error || !response.data) {
        return createErrorResponse("400", "checkout.failedToComplete", {
            details: response.error?.message || "Failed to complete checkout"
        });
    }
    return createSuccessResponse(response.data, "checkout.orderCompleted");
});

export const cancelOrder = createAction(z.object({ orderId: z.string() }), async (parsedInput: { orderId: string }): Promise<ApiResponse<null>> => {
    const response = await LocalApi.cancelOrder(parsedInput.orderId);
    if (response.error) {
        return createErrorResponse("400", "order.failedToCancel", {
            details: response.error?.message || "Failed to cancel order"
        });
    }
    return createSuccessResponse(null, "order.cancelledSuccessfully");
});
