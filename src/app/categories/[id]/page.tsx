import React from 'react';
import { LocalApi } from '../../../lib/api/LocalApi';
import { Category } from '../../../lib/interface/Category';
import { ProductWithPrice, ProductFilters } from '../../../lib/interface/Products';
import { ProductItem } from '../../../components/Product/ProductItem';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface CategoryPageProps {
    params: {
        id: string;
    };
}

async function getCategory(id: string): Promise<Category | null> {
    try {
        const response = await LocalApi.getCategories();
        if (response.success && response.data) {
            return response.data.find(category => category.id === id) || null;
        }
        return null;
    } catch (error) {
        console.error('Error loading category:', error);
        return null;
    }
}

async function getCategoryProducts(categoryId: string): Promise<ProductWithPrice[]> {
    try {
        const filters: ProductFilters = {
            categories: [categoryId]
        };

        const response = await LocalApi.getFilteredProducts(filters);
        if (response.success && response.data) {
            return response.data.products;
        }
        return [];
    } catch (error) {
        console.error('Error loading category products:', error);
        return [];
    }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const category = await getCategory(params.id);

    if (!category) {
        notFound();
    }

    const products = await getCategoryProducts(params.id);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                        <Link href="/categories" className="hover:text-gray-700">
                            Categories
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900">{category.name}</span>
                    </nav>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
                    {category.description && (
                        <p className="text-gray-600 mb-4">{category.description}</p>
                    )}
                </div>

                <div className="mb-6">
                    <p className="text-gray-600">
                        {products.length} product{products.length !== 1 ? 's' : ''} in {category.name}
                    </p>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600 mb-4">There are no products in this category at the moment.</p>
                        <Link
                            href="/products"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Browse All Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                )}

                <div className="mt-12 text-center">
                    <Link
                        href="/categories"
                        className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                        Back to Categories
                    </Link>
                </div>
            </div>
        </div>
    );
} 