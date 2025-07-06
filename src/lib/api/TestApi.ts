import { ApiResponse, createSuccessResponse, SiteInfoResponse, ProductsResponse, AuthResponse } from "../interface/ApiResponse";
import { Category } from "../interface/Category";
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
};

export const TestApi: ApiMethods = {
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