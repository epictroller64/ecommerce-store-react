
// Using this to fetch required info for the productcollections
export interface ProductWithPrice extends Product {
    price: number;
    currency: string;
    inStock: boolean;
}

export interface ProductWithVariants extends Product {
    variants: Variant[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    images: string[];
    category: string;
    rating?: number;
    reviewCount?: number;
    createdAt: string;
    updatedAt: string;
}

export interface Variant {
    id: string;
    key: string; // color, size, etc
    label: string; // Red, Small, etc
    translationKey: string; // red, small, etc
    productId: string;
    name: string;
    price: number;
    currency: string;
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