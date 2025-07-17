import { ApiResponse, createSuccessResponse, SiteInfoResponse, ProductsResponse, AuthResponse, createErrorResponse, CompleteCheckoutResponse } from "../interface/ApiResponse";
import { Category } from "../interface/Category";
import { Order } from "../interface/Order";
import { ProductWithVariants } from "../interface/Products";
import { SiteConfig } from "../interface/SiteConfig";
import { PaymentMethodResponse } from "../interface/PaymentMethod";
import { DeliveryMethodResponse } from "../interface/DeliveryMethod";
import { Review } from "../interface/Review";
import { exampleConfig } from "./config";
import { User } from "../interface/User";

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
    "get-orders": () => Promise<ApiResponse<Order[]>>;
    "get-order": () => Promise<ApiResponse<Order>>;
    "create-order": () => Promise<ApiResponse<Order>>;
    "cancel-order": () => Promise<ApiResponse<Order>>;
    "get-payment-methods": () => Promise<ApiResponse<PaymentMethodResponse>>;
    "get-delivery-methods": () => Promise<ApiResponse<DeliveryMethodResponse>>;
    "get-user": () => Promise<ApiResponse<User>>;
    "complete-checkout": () => Promise<ApiResponse<CompleteCheckoutResponse>>;
    "get-product-reviews": () => Promise<ApiResponse<Review[]>>;
    "create-review": () => Promise<ApiResponse<Review>>;
};

export const TestApi: ApiMethods = {
    "get-user": async () => {
        return Promise.resolve(createSuccessResponse({
            id: "user-123",
            name: "Test User",
            email: "user@example.com",
            role: "user",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }, "User retrieved successfully"));
    },
    "complete-checkout": async () => {
        return Promise.resolve(createSuccessResponse({
            orderId: "order-1",
            totalPrice: 100,
            deliveryMethodId: "dm-1",
            paymentMethodId: "pm-1",
        }, "Order completed successfully"));
    },
    "get-orders": async () => {
        return Promise.resolve(createSuccessResponse([
            {
                id: "order-1",
                userId: "user-123",
                totalPrice: 100,
                status: "pending" as const,
                items: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                deliveryMethodId: "dm-1",
                paymentMethodId: "pm-1",
            }
        ], "Orders retrieved successfully"));
    },
    "create-order": async () => {
        return Promise.resolve(createSuccessResponse({
            id: "order-1",
            userId: "user-123",
            totalPrice: 100,
            status: "pending" as const,
            items: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            deliveryMethodId: "dm-1",
            paymentMethodId: "pm-1",
        }, "Order created successfully"));
    },
    "cancel-order": async () => {
        return Promise.resolve(createSuccessResponse({
            id: "order-1",
            userId: "user-123",
            totalPrice: 100,
            status: "cancelled" as const,
            items: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            deliveryMethodId: "dm-1",
            paymentMethodId: "pm-1",
        }, "Order cancelled successfully"));
    },
    "get-payment-methods": async () => {
        return Promise.resolve(createSuccessResponse({
            paymentMethods: [
                {
                    id: "pm-1",
                    name: "Credit Card",
                    description: "Pay with Visa, Mastercard, or American Express",
                    icon: "💳",
                    type: "card" as const,
                    isAvailable: true,
                    processingFee: 0,
                    processingTime: "Instant"
                },
                {
                    id: "pm-2",
                    name: "PayPal",
                    description: "Pay with your PayPal account",
                    icon: "🔵",
                    type: "digital_wallet" as const,
                    isAvailable: true,
                    processingFee: 0,
                    processingTime: "Instant"
                },
                {
                    id: "pm-3",
                    name: "Apple Pay",
                    description: "Pay with Apple Pay",
                    icon: "🍎",
                    type: "digital_wallet" as const,
                    isAvailable: true,
                    processingFee: 0,
                    processingTime: "Instant"
                },
                {
                    id: "pm-4",
                    name: "Bank Transfer",
                    description: "Pay via bank transfer (3-5 business days)",
                    icon: "🏦",
                    type: "bank_transfer" as const,
                    isAvailable: true,
                    processingFee: 0,
                    processingTime: "3-5 business days"
                }
            ]
        }, "Payment methods retrieved successfully"));
    },
    "get-delivery-methods": async () => {
        return Promise.resolve(createSuccessResponse({
            deliveryMethods: [
                {
                    id: "dm-1",
                    name: "Standard Shipping",
                    description: "Free shipping on orders over $50",
                    icon: "📦",
                    type: "standard" as const,
                    price: 5.99,
                    currency: "USD",
                    estimatedDays: "5-7 business days",
                    isAvailable: true,
                    trackingAvailable: true
                },
                {
                    id: "dm-2",
                    name: "Express Shipping",
                    description: "Fast delivery with tracking",
                    icon: "🚀",
                    type: "express" as const,
                    price: 12.99,
                    currency: "USD",
                    estimatedDays: "2-3 business days",
                    isAvailable: true,
                    trackingAvailable: true
                },
                {
                    id: "dm-3",
                    name: "Same Day Delivery",
                    description: "Get your order today (available in select areas)",
                    icon: "⚡",
                    type: "same_day" as const,
                    price: 24.99,
                    currency: "USD",
                    estimatedDays: "Same day",
                    isAvailable: true,
                    trackingAvailable: true
                },
                {
                    id: "dm-4",
                    name: "Store Pickup",
                    description: "Pick up your order from our store",
                    icon: "🏪",
                    type: "pickup" as const,
                    price: 0,
                    currency: "USD",
                    estimatedDays: "Ready in 1 hour",
                    isAvailable: true,
                    trackingAvailable: false
                }
            ]
        }, "Delivery methods retrieved successfully"));
    },
    "get-order": async () => {
        return Promise.resolve(createSuccessResponse({
            id: "order-1",
            userId: "user-123",
            totalPrice: 100,
            status: "pending" as const,
            items: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            deliveryMethodId: "dm-1",
            paymentMethodId: "pm-1",
        }, "Order retrieved successfully"));
    },
    "get-product": async () => {
        const availableProducts = [
            {
                id: "prod-1",
                name: "Premium Wireless Headphones",
                description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals alike.",
                category: "Electronics",
                rating: "4.8",
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
                rating: "4.6",
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
                    rating: "4.5",
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
                    rating: "4.5",
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
                    rating: "3.8",
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
    },
    "get-product-reviews": async () => {
        return Promise.resolve(createSuccessResponse([
            {
                id: "review-1",
                productId: "prod-1",
                userId: "user-123",
                rating: 5,
                comment: "Great headphones! Very comfortable and sound quality is amazing.",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                id: "review-2",
                productId: "prod-1",
                userId: "user-456",
                rating: 4,
                comment: "Good but could be better. The noise cancellation is decent.",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                id: "review-3",
                productId: "prod-2",
                userId: "user-789",
                rating: 3,
                comment: "Average product. The battery life is decent but the GPS tracking is not accurate.",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
        ], "Product reviews retrieved successfully"));
    },
    "create-review": async () => {
        return Promise.resolve(createSuccessResponse({
            id: "review-4",
            productId: "prod-1",
            userId: "user-123",
            rating: 5,
            comment: "Excellent headphones! Perfect for music and calls.",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }, "Review created successfully"));
    }
};

export type Path = keyof ApiMethods;