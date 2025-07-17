'use client'
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReviewAction } from "../../lib/actions/reviewActions";
import { CreateReviewRequest } from "../../lib/interface/Request";
import { createReviewSchema } from "../../lib/schemas/zodSchemas";
import Button from "../UI/Button";

interface ReviewFormProps {
    productId: string;
    onReviewSubmitted?: () => void;
}

function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<CreateReviewRequest>({
        resolver: zodResolver(createReviewSchema),
        defaultValues: {
            productId,
            rating: 5,
            comment: ""
        }
    });

    const onSubmit = async (data: CreateReviewRequest) => {
        try {
            const response = await createReviewAction(data);

            if (response.success) {
                reset({ productId, rating: 5, comment: "" });
                if (onReviewSubmitted) onReviewSubmitted();
            } else {
                throw new Error(typeof response.error?.details === 'string' ? response.error.details : "Failed to submit review");
            }
        } catch (error) {
            console.error('Review submission error:', error);
        }
    };

    return (
        <div className="mt-8 p-6 bg-slate-50 rounded-lg ">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input type="hidden" {...register("productId")} value={productId} />

                <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                    </label>
                    <select
                        id="rating"
                        {...register("rating", { valueAsNumber: true })}
                        className="w-full px-3 py-2 border border-transparent bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        {[5, 4, 3, 2, 1].map(num => (
                            <option key={num} value={num}>
                                {num} {num === 1 ? 'Star' : 'Stars'}
                            </option>
                        ))}
                    </select>
                    {errors.rating && (
                        <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Comment (Optional)
                    </label>
                    <textarea
                        id="comment"
                        {...register("comment")}
                        rows={4}
                        placeholder="Share your thoughts about this product..."
                        className="w-full px-3 py-2 border border-transparent rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                    {errors.comment && (
                        <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
            </form>
        </div>
    );
}

export default ReviewForm;