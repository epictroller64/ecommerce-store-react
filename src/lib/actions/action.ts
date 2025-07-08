// Own implementation of next-safe-action

import { ZodSchema } from "zod";
import { ApiResponse, createErrorResponse } from "../interface/ApiResponse";

// Handle the input parsing and return the response
export function createAction<TInput, TOutput = TInput>(
    inputSchema: ZodSchema<TInput>,
    action: (input: TInput) => Promise<ApiResponse<TOutput>>
) {
    return async function (input: TInput): Promise<ApiResponse<TOutput>> {
        try {
            const parsedInput = inputSchema.safeParse(input);
            if (!parsedInput.success) {
                return createErrorResponse("400", "validation.failed", {
                    details: parsedInput.error.message
                });
            }
            return await action(parsedInput.data);
        }
        catch (error) {
            if (error instanceof Error) {
                return createErrorResponse("500", "action.failed", {
                    details: error.message
                });
            }
            return createErrorResponse("500", "action.failed", {
                details: "Unknown error"
            });
        }
    }
}