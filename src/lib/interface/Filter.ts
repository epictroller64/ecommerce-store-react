
export interface FilterState {
    categories: string[];
    priceRange: { min: number; max: number };
    searchQuery: string;
    inStock: boolean | null;
    rating: number | null;
}