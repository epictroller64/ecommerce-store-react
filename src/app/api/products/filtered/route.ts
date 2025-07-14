import { NextResponse } from "next/server";
import { LocalApi } from "../../../../lib/api/LocalApi";
import { ProductFilters } from "../../../../lib/interface/Products";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const filtersParam = searchParams.get('filters');

        let filters: ProductFilters | undefined;

        if (filtersParam) {
            try {
                filters = JSON.parse(filtersParam);
            } catch (error) {
                console.error('Error parsing filters:', error);
            }
        }

        // Try to use the filtered endpoint first
        try {
            const response = await LocalApi.getFilteredProducts(filters);
            return NextResponse.json(response);
        } catch {
            console.log('Filtered endpoint not available, falling back to getProducts');

            // Fallback to getProducts and apply filters on server side
            const response = await LocalApi.getProducts();

            if (response.success && response.data && filters) {
                let filteredProducts = response.data.products;

                // Apply category filter
                if (filters.categories && filters.categories.length > 0) {
                    filteredProducts = filteredProducts.filter(product =>
                        filters.categories!.includes(product.category)
                    );
                }

                // Apply price range filter
                if (filters.priceRange) {
                    filteredProducts = filteredProducts.filter(product =>
                        product.price >= filters.priceRange!.min &&
                        product.price <= filters.priceRange!.max
                    );
                }

                // Apply stock filter
                if (filters.inStock !== undefined) {
                    filteredProducts = filteredProducts.filter(product =>
                        product.inStock === filters.inStock
                    );
                }

                // Apply rating filter
                if (filters.rating !== undefined) {
                    filteredProducts = filteredProducts.filter(product =>
                        product.rating && product.rating >= filters.rating!
                    );
                }

                return NextResponse.json({
                    success: true,
                    data: {
                        products: filteredProducts
                    }
                });
            }

            return NextResponse.json(response);
        }
    } catch (error) {
        console.error('Error in products API:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
} 