import { NextResponse } from "next/server";
import { LocalApi } from "../../../lib/api/LocalApi";

export async function GET() {
    try {
        const response = await LocalApi.getCategories();
        return NextResponse.json(response);
    } catch (error) {
        console.error('Error in categories API:', error);

        // Fallback mock categories
        const mockCategories = [
            { id: 'electronics', name: 'Electronics', description: 'Electronic devices and gadgets', productCount: 15 },
            { id: 'clothing', name: 'Clothing', description: 'Fashion and apparel', productCount: 25 },
            { id: 'home', name: 'Home & Garden', description: 'Home improvement and garden supplies', productCount: 20 },
            { id: 'sports', name: 'Sports & Outdoors', description: 'Sports equipment and outdoor gear', productCount: 12 },
            { id: 'books', name: 'Books', description: 'Books and literature', productCount: 30 },
            { id: 'toys', name: 'Toys & Games', description: 'Toys and entertainment', productCount: 18 }
        ];

        return NextResponse.json({
            success: true,
            data: mockCategories
        });
    }
} 