import React from 'react';
import { Product } from '../../lib/interface/Products';
import { ProductItem } from './ProductItem';
import { LocalApi } from '../../lib/api/LocalApi';

async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await LocalApi.getProducts();
        if (response.success && response.data) {
            return response.data.products;
        } else {
            console.error('Failed to fetch products:', response.error?.message);
            return [];
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export default async function ProductCollection() {
    const products = await fetchProducts();

    if (products.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No products available at the moment.</p>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
}