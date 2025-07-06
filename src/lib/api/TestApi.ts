import { ApiResponse, createSuccessResponse, SiteInfoResponse, ProductsResponse, AuthResponse, createErrorResponse } from "../interface/ApiResponse";
import { Category } from "../interface/Category";
import { ProductWithVariants } from "../interface/Products";
import { SiteConfig } from "../interface/SiteConfig";
import { exampleConfig } from "./config";

// Helper function to ensure all variants have required properties
const createVariant = (id: string, productId: string, name: string, price: number, currency: string, key: string, label: string, translationKey: string) => ({
    id,
    productId,
    name,
    price,
    currency,
    key,
    label,
    translationKey,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"]
});

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
                category: "Electronics",
                rating: 4.8,
                reviewCount: 156,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                sharedImages: true,
                variants: [
                    // Color variants
                    createVariant("var-1", "prod-1", "Black - Small", 129.99, "USD", "color", "Black", "black"),
                    createVariant("var-2", "prod-1", "Black - Medium", 129.99, "USD", "color", "Black", "black"),
                    createVariant("var-3", "prod-1", "Black - Large", 129.99, "USD", "color", "Black", "black"),
                    createVariant("var-4", "prod-1", "White - Small", 129.99, "USD", "color", "White", "white"),
                    createVariant("var-5", "prod-1", "White - Medium", 129.99, "USD", "color", "White", "white"),
                    createVariant("var-6", "prod-1", "White - Large", 129.99, "USD", "color", "White", "white"),
                    createVariant("var-7", "prod-1", "Blue - Small", 139.99, "USD", "color", "Blue", "blue"),
                    createVariant("var-8", "prod-1", "Blue - Medium", 139.99, "USD", "color", "Blue", "blue"),
                    createVariant("var-9", "prod-1", "Blue - Large", 139.99, "USD", "color", "Blue", "blue"),
                    // Size variants
                    createVariant("var-10", "prod-1", "Black - Small", 129.99, "USD", "size", "Small", "small"),
                    createVariant("var-11", "prod-1", "Black - Medium", 129.99, "USD", "size", "Medium", "medium"),
                    createVariant("var-12", "prod-1", "Black - Large", 129.99, "USD", "size", "Large", "large"),
                    createVariant("var-13", "prod-1", "White - Small", 129.99, "USD", "size", "Small", "small"),
                    createVariant("var-14", "prod-1", "White - Medium", 129.99, "USD", "size", "Medium", "medium"),
                    createVariant("var-15", "prod-1", "White - Large", 129.99, "USD", "size", "Large", "large"),
                    createVariant("var-16", "prod-1", "Blue - Small", 139.99, "USD", "size", "Small", "small"),
                    createVariant("var-17", "prod-1", "Blue - Medium", 139.99, "USD", "size", "Medium", "medium"),
                    createVariant("var-18", "prod-1", "Blue - Large", 139.99, "USD", "size", "Large", "large")
                ]
            },
            {
                id: "prod-2",
                name: "Smart Fitness Watch",
                description: "Advanced fitness tracking with heart rate monitoring, GPS, and 7-day battery life. Perfect for athletes and health enthusiasts.",
                category: "Electronics",
                rating: 4.6,
                reviewCount: 89,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                sharedImages: true,
                variants: [
                    // Color variants
                    createVariant("var-19", "prod-2", "Silver - 40mm", 299.99, "USD", "color", "Silver", "silver"),
                    createVariant("var-20", "prod-2", "Silver - 44mm", 329.99, "USD", "color", "Silver", "silver"),
                    createVariant("var-21", "prod-2", "Black - 40mm", 299.99, "USD", "color", "Black", "black"),
                    createVariant("var-22", "prod-2", "Black - 44mm", 329.99, "USD", "color", "Black", "black"),
                    // Size variants
                    createVariant("var-23", "prod-2", "Silver - 40mm", 299.99, "USD", "size", "40mm", "40mm"),
                    createVariant("var-24", "prod-2", "Silver - 44mm", 329.99, "USD", "size", "44mm", "44mm"),
                    createVariant("var-25", "prod-2", "Black - 40mm", 299.99, "USD", "size", "40mm", "40mm"),
                    createVariant("var-26", "prod-2", "Black - 44mm", 329.99, "USD", "size", "44mm", "44mm")
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
                    sharedImages: true,
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
                    sharedImages: true,
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
                    sharedImages: true,
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