export interface Review {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    comment?: string;
    createdAt: string;
    user?: {
        id: string;
        name?: string;
        email: string;
    };
}
