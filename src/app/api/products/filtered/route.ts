import { NextResponse } from "next/server";
import { LocalApi } from "../../../../lib/api/LocalApi";
import { ProductFilters } from "../../../../lib/interface/Products";
import { createErrorResponse } from '../../../../lib/interface/ApiResponse';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const filtersParam = searchParams.get('filters');
        let filters: ProductFilters | undefined;
        console.log(filtersParam)
        if (filtersParam) {
            try {
                filters = JSON.parse(filtersParam);
            } catch (error) {
                console.error('Error parsing filters:', error);
            }
        }
        try {
            const response = await LocalApi.getFilteredProducts(filters);
            return NextResponse.json(response);
        } catch {
            return NextResponse.json(createErrorResponse('Failed to fetch products', 'Failed to fetch products'), { status: 500 });
        }
    } catch (error) {
        console.error('Error in products API:', error);
        return NextResponse.json(
            createErrorResponse('Failed to fetch products', 'Failed to fetch products'),
            { status: 500 }
        );
    }
} 