import { ApiResponse, createSuccessResponse, SiteInfoResponse, ProductsResponse, AuthResponse, createErrorResponse } from "../interface/ApiResponse";
import { Category } from "../interface/Category";
import { ProductWithVariants } from "../interface/Products";
import { SiteConfig } from "../interface/SiteConfig";
import { exampleConfig } from "./config";


// Create mock data until backend is built

type ApiMethods = {
    "register": () => Promise<ApiResponse<AuthResponse>>;
    "login": () => Promise<ApiResponse<AuthResponse>>;
    "get-products": () => Promise<ApiResponse<ProductsResponse>>;
    "get-site-info": () => Promise<ApiResponse<SiteInfoResponse>>;
    "get-categories": () => Promise<ApiResponse<Category[]>>;
    "get-hero-images": () => Promise<ApiResponse<string[]>>;
    "get-config": () => Promise<ApiResponse<SiteConfig>>;
    "get-best-selling-products": () => Promise<ApiResponse<ProductsResponse>>;
    "get-product": () => Promise<ApiResponse<ProductWithVariants>>;
};

export const TestApi: ApiMethods = {
    "get-product": async () => {
        const availableProducts = [
            {
                id: "prod-1",
                name: "Premium Wireless Headphones",
                description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals alike.",
                images: [
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                    "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                    "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                ],
                category: "Electronics",
                rating: 4.8,
                reviewCount: 156,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                variants: [
                    {
                        id: "var-1",
                        productId: "prod-1",
                        name: "Black - Small",
                        price: 129.99,
                        currency: "USD",
                        key: "color",
                        label: "Black",
                        translationKey: "black",
                    },
                    {
                        id: "var-2",
                        productId: "prod-1",
                        name: "Black - Medium",
                        price: 129.99,
                        currency: "USD",
                        key: "color",
                        label: "Black",
                        translationKey: "black",
                    },
                    {
                        id: "var-3",
                        productId: "prod-1",
                        name: "Black - Large",
                        price: 129.99,
                        currency: "USD",
                        key: "color",
                        label: "Black",
                        translationKey: "black",
                    },
                    {
                        id: "var-4",
                        productId: "prod-1",
                        name: "White - Small",
                        price: 129.99,
                        currency: "USD",
                        key: "color",
                        label: "White",
                        translationKey: "white",
                    },
                    {
                        id: "var-5",
                        productId: "prod-1",
                        name: "White - Medium",
                        price: 129.99,
                        currency: "USD",
                        key: "color",
                        label: "White",
                        translationKey: "white",
                    },
                    {
                        id: "var-6",
                        productId: "prod-1",
                        name: "White - Large",
                        price: 129.99,
                        currency: "USD",
                        key: "color",
                        label: "White",
                        translationKey: "white",
                    },
                    {
                        id: "var-7",
                        productId: "prod-1",
                        name: "Blue - Small",
                        price: 139.99,
                        currency: "USD",
                        key: "color",
                        label: "Blue",
                        translationKey: "blue",
                    },
                    {
                        id: "var-8",
                        productId: "prod-1",
                        name: "Blue - Medium",
                        price: 139.99,
                        currency: "USD",
                        key: "color",
                        label: "Blue",
                        translationKey: "blue",
                    },
                    {
                        id: "var-9",
                        productId: "prod-1",
                        name: "Blue - Large",
                        price: 139.99,
                        currency: "USD",
                        key: "color",
                        label: "Blue",
                        translationKey: "blue",
                    },
                    {
                        id: "var-10",
                        productId: "prod-1",
                        name: "Black - Small",
                        price: 129.99,
                        currency: "USD",
                        key: "size",
                        label: "Small",
                        translationKey: "small",
                    },
                    {
                        id: "var-11",
                        productId: "prod-1",
                        name: "Black - Medium",
                        price: 129.99,
                        currency: "USD",
                        key: "size",
                        label: "Medium",
                        translationKey: "medium",
                    },
                    {
                        id: "var-12",
                        productId: "prod-1",
                        name: "Black - Large",
                        price: 129.99,
                        currency: "USD",
                        key: "size",
                        label: "Large",
                        translationKey: "large",
                    },
                    {
                        id: "var-13",
                        productId: "prod-1",
                        name: "White - Small",
                        price: 129.99,
                        currency: "USD",
                        key: "size",
                        label: "Small",
                        translationKey: "small",
                    },
                    {
                        id: "var-14",
                        productId: "prod-1",
                        name: "White - Medium",
                        price: 129.99,
                        currency: "USD",
                        key: "size",
                        label: "Medium",
                        translationKey: "medium",
                    },
                    {
                        id: "var-15",
                        productId: "prod-1",
                        name: "White - Large",
                        price: 129.99,
                        currency: "USD",
                        key: "size",
                        label: "Large",
                        translationKey: "large",
                    },
                    {
                        id: "var-16",
                        productId: "prod-1",
                        name: "Blue - Small",
                        price: 139.99,
                        currency: "USD",
                        key: "size",
                        label: "Small",
                        translationKey: "small",
                    },
                    {
                        id: "var-17",
                        productId: "prod-1",
                        name: "Blue - Medium",
                        price: 139.99,
                        currency: "USD",
                        key: "size",
                        label: "Medium",
                        translationKey: "medium",
                    },
                    {
                        id: "var-18",
                        productId: "prod-1",
                        name: "Blue - Large",
                        price: 139.99,
                        currency: "USD",
                        key: "size",
                        label: "Large",
                        translationKey: "large",
                    }
                ]
            },
            {
                id: "prod-2",
                name: "Smart Fitness Watch",
                description: "Advanced fitness tracking with heart rate monitoring, GPS, and 7-day battery life. Perfect for athletes and health enthusiasts.",
                images: [
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                    "https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                ],
                category: "Electronics",
                rating: 4.6,
                reviewCount: 89,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                variants: [
                    {
                        id: "var-19",
                        productId: "prod-2",
                        name: "Silver - 40mm",
                        price: 299.99,
                        currency: "USD",
                        key: "color",
                        label: "Silver",
                        translationKey: "silver",
                    },
                    {
                        id: "var-20",
                        productId: "prod-2",
                        name: "Silver - 44mm",
                        price: 329.99,
                        currency: "USD",
                        key: "color",
                        label: "Silver",
                        translationKey: "silver",
                    },
                    {
                        id: "var-21",
                        productId: "prod-2",
                        name: "Black - 40mm",
                        price: 299.99,
                        currency: "USD",
                        key: "color",
                        label: "Black",
                        translationKey: "black",
                    },
                    {
                        id: "var-22",
                        productId: "prod-2",
                        name: "Black - 44mm",
                        price: 329.99,
                        currency: "USD",
                        key: "color",
                        label: "Black",
                        translationKey: "black",
                    },
                    {
                        id: "var-23",
                        productId: "prod-2",
                        name: "Silver - 40mm",
                        price: 299.99,
                        currency: "USD",
                        key: "size",
                        label: "40mm",
                        translationKey: "40mm",
                    },
                    {
                        id: "var-24",
                        productId: "prod-2",
                        name: "Silver - 44mm",
                        price: 329.99,
                        currency: "USD",
                        key: "size",
                        label: "44mm",
                        translationKey: "44mm",
                    },
                    {
                        id: "var-25",
                        productId: "prod-2",
                        name: "Black - 40mm",
                        price: 299.99,
                        currency: "USD",
                        key: "size",
                        label: "40mm",
                        translationKey: "40mm",
                    },
                    {
                        id: "var-26",
                        productId: "prod-2",
                        name: "Black - 44mm",
                        price: 329.99,
                        currency: "USD",
                        key: "size",
                        label: "44mm",
                        translationKey: "44mm",
                    }
                ]
            }
        ]
        const product = availableProducts.find(p => p.id === "prod-1");
        if (product) {
            return Promise.resolve(createSuccessResponse(product, "Product retrieved successfully"));
        }
        return Promise.resolve(createErrorResponse("404", "Product not found"));
    },
    "get-best-selling-products": async () => {
        return Promise.resolve(createSuccessResponse({
            products: [
                {
                    id: "prod-1",
                    name: "Mock Product 1",
                    description: "This is a mock product for testing",
                    price: 29.99,
                    currency: "USD",
                    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"],
                    category: "Electronics",
                    inStock: true,
                    stockQuantity: 50,
                    rating: 4.5,
                    reviewCount: 12,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }
            ],
        }, "Best selling products retrieved successfully"));
    },
    "get-config": async () => {
        return Promise.resolve(createSuccessResponse(exampleConfig, "Config retrieved successfully"));
    },
    "get-hero-images": async () => {
        return Promise.resolve(createSuccessResponse([
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80",
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        ], "Hero images retrieved successfully"));
    },
    "get-categories": async () => {
        return Promise.resolve(createSuccessResponse([
            {
                id: "cat-1",
                name: "Electronics",
                description: "Electronic devices and accessories",
                productCount: 15,
            },
            {
                id: "cat-2",
                name: "Clothing",
                description: "Fashion and apparel",
                productCount: 23,
            }
        ], "Categories retrieved successfully"));
    },
    "register": async () => {
        return Promise.resolve(createSuccessResponse({
            token: "mock-jwt-token",
            refreshToken: "mock-refresh-token",
            user: {
                id: "user-123",
                email: "user@example.com",
                name: "Test User",
                role: "user",
                createdAt: new Date().toISOString(),
                lastLoginAt: new Date().toISOString(),
            },
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
        }, "User registered successfully"));
    },
    "login": async () => {
        return Promise.resolve(createSuccessResponse({
            token: "mock-jwt-token",
            refreshToken: "mock-refresh-token",
            user: {
                id: "user-123",
                email: "user@example.com",
                name: "Test User",
                role: "user",
                createdAt: new Date().toISOString(),
                lastLoginAt: new Date().toISOString(),
            },
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
        }, "User logged in successfully"));
    },
    "get-products": async () => {
        return Promise.resolve(createSuccessResponse({
            products: [
                {
                    id: "prod-1",
                    name: "Mock Product 1",
                    description: "This is a mock product for testing",
                    price: 29.99,
                    currency: "USD",
                    images: ["https://prd.place/400", "https://prd.place/400"],
                    category: "electronics",
                    inStock: true,
                    rating: 4.5,
                    reviewCount: 12,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: "prod-2",
                    name: "Mock Product 2",
                    description: "Another mock product for testing",
                    price: 49.99,
                    currency: "USD",
                    images: ["https://prd.place/400", "https://prd.place/400"],
                    category: "clothing",
                    inStock: false,
                    rating: 3.8,
                    reviewCount: 8,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }
            ],
            categories: [
                {
                    id: "cat-1",
                    name: "Electronics",
                    description: "Electronic devices and accessories",
                    productCount: 15,
                },
                {
                    id: "cat-2",
                    name: "Clothing",
                    description: "Fashion and apparel",
                    productCount: 23,
                }
            ],
            filters: {
                priceRange: {
                    min: 10,
                    max: 500,
                },
                categories: ["electronics", "clothing"],
                inStock: true,
                rating: 3.5,
            },
        }, "Products retrieved successfully"));
    },
    "get-site-info": async () => {
        return Promise.resolve(createSuccessResponse({
            name: "Mock E-commerce Store",
            description: "A modern e-commerce platform built with React and TypeScript",
            logoSrc: "https://prd.place/150",
            version: "1.0.0",
            features: ["User Authentication", "Product Catalog", "Shopping Cart", "Order Management"],
            contactInfo: {
                email: "support@mockstore.com",
                phone: "+1-555-0123",
                address: "123 Mock Street, Mock City, MC 12345",
                socialMedia: {
                    twitter: "@mockstore",
                    facebook: "mockstore",
                    instagram: "mockstore_official",
                },
            },
        }, "Site information retrieved successfully"));
    }
};

export type Path = keyof ApiMethods;