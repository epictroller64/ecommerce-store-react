
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    images: string[];
    category: string;
    inStock: boolean;
    rating?: number;
    reviewCount?: number;
    createdAt: string;
    updatedAt: string;
}


export interface ProductFilters {
    priceRange?: {
        min: number;
        max: number;
    };
    categories?: string[];
    inStock?: boolean;
    rating?: number;
}