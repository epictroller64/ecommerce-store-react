import { NextRequest, NextResponse } from "next/server";
import { LocalApi } from "../../../lib/api/LocalApi";
import { createErrorResponse } from "../../../lib/interface/ApiResponse";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const productId = searchParams.get('productId');

        if (!productId) {
            return NextResponse.json(
                createErrorResponse('400', 'Missing productId parameter'),
                { status: 400 }
            );
        }

        const response = await LocalApi.getProductReviews(productId);
        return NextResponse.json(response);
    } catch (error) {
        console.error('Error in reviews API:', error);
        return NextResponse.json(
            createErrorResponse('500', 'Failed to fetch reviews'),
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const response = await LocalApi.createReview(body);
        return NextResponse.json(response);
    } catch (error) {
        console.error('Error in reviews API:', error);
        return NextResponse.json(
            createErrorResponse('500', 'Failed to create review'),
            { status: 500 }
        );
    }
} 