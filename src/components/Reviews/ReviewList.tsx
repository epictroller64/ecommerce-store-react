'use client'
import React from "react";
import { Review } from "../../lib/interface/Review";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../lib/interface/ApiResponse";

interface ReviewListProps {
    productId: string;
}

function ReviewList({ productId }: ReviewListProps) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['reviews', productId],
        queryFn: () => fetch(`/api/reviews?productId=${productId}`).then(res => res.json() as Promise<ApiResponse<Review[]>>),
    });

    if (isLoading) return (
        <div className="mt-8 p-6 bg-slate-50 rounded-lg">
            <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                    <div className="h-20 bg-gray-200 rounded"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );

    if (error) return (
        <div className="mt-8 p-6 bg-slate-50 rounded-lg ">
            <p className="text-red-600">Error loading reviews: {error.message}</p>
        </div>
    );

    if (!data?.data || data.data.length === 0) return (
        <div className="mt-8 p-6 bg-slate-50 rounded-lg ">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reviews</h3>
            <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
        </div>
    );

    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
            <div className="space-y-4">
                {data.data.map((review) => (
                    <div key={review.id} className="p-4 bg-slate-50 rounded-lg ">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                                }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">{review.rating}/5</span>
                            </div>
                            <span className="text-xs text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        {review.comment && (
                            <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                        )}
                        <div className="mt-2 text-xs text-gray-500">
                            By: {review.user?.name || `User ${review.userId.slice(0, 8)}`}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewList; 