import { createAction } from "./action";
import { createReviewSchema } from "../schemas/zodSchemas";
import { LocalApi } from "../api/LocalApi";

export const createReviewAction = createAction(
    createReviewSchema,
    async (input) => {
        return await LocalApi.createReview(input);
    }
);
