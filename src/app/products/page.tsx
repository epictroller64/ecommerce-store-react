'use client'
import React from 'react';
import { ProductFilters, ProductWithPrice } from '../../lib/interface/Products';
import { Category } from '../../lib/interface/Category';
import { ProductItem } from '../../components/Product/ProductItem';
import Button from '../../components/UI/Button';
import Filter from '../../components/Products/Filter';
import { useQueryState, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs";
import { ApiResponse } from '../../lib/interface/ApiResponse';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from '../../lib/hooks/useTranslations';
import ErrorDisplay from '../../components/Error/Error';




export default function ProductsPage() {
    const { t } = useTranslations();
    // URL state management with nuqs
    const [searchQuery] = useQueryState('q', parseAsString.withDefault(''));
    const [categoriesFilter] = useQueryState('categories', parseAsArrayOf(parseAsString).withDefault([]));
    const [minPrice] = useQueryState('minPrice', parseAsInteger.withDefault(0));
    const [maxPrice] = useQueryState('maxPrice', parseAsInteger.withDefault(1000));
    const [inStockStr] = useQueryState('inStock', parseAsString.withDefault(''));
    const [ratingStr] = useQueryState('rating', parseAsString.withDefault(''));

    // Convert string values to proper types
    const inStock = inStockStr === '' ? null : inStockStr === 'true';
    const rating = ratingStr === '' ? null : parseInt(ratingStr);

    // Create filters object from URL state
    const filters: ProductFilters = {
        categories: categoriesFilter.length > 0 ? categoriesFilter : undefined,
        priceRange: { min: minPrice, max: maxPrice },
        searchQuery: searchQuery || undefined,
        inStock,
        rating
    };
    const { data: products, isLoading: productsLoading, isError: productsError } = useQuery({
        queryKey: ['products', filters],
        initialData: [],
        queryFn: () => loadProducts()
    });

    const { data: categories, isLoading: categoriesLoading, isError: categoriesError } = useQuery({
        queryKey: ['categories'],
        initialData: [],
        queryFn: () => loadCategories()
    });

    const loadCategories = async () => {
        const response = await fetch('/api/categories');
        const data = await response.json() as ApiResponse<Category[]>;
        if (data.success && data.data) {
            return data.data;
        }
        // keeping like this for now, maybe bettrer way to handle this
        throw new Error(data.error?.message || t('failedToLoadCategories'));
    }

    const loadProducts = async () => {
        const filtersToApply: ProductFilters = {};

        if (filters.categories && filters.categories.length > 0) {
            filtersToApply.categories = filters.categories;
        }

        if (filters.priceRange && (filters.priceRange.min > 0 || filters.priceRange.max < 1000)) {
            filtersToApply.priceRange = filters.priceRange;
        }

        if (filters.inStock !== null) {
            filtersToApply.inStock = filters.inStock;
        }

        if (filters.rating !== null) {
            filtersToApply.rating = filters.rating;
        }

        const response = await fetch(`/api/products/filtered?filters=${JSON.stringify(filtersToApply)}`);
        const data = await response.json() as ApiResponse<ProductWithPrice[]>;
        if (data.success && data.data) {
            let filteredProducts = data.data;
            //apply the filters
            if (filters.searchQuery && filters.searchQuery.trim()) {
                const query = filters.searchQuery.toLowerCase();
                filteredProducts = filteredProducts.filter(product =>
                    product.name.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query)
                );
            }

            return filteredProducts;
        }
        return [];
    };

    if (productsLoading || categoriesLoading) {
        return <ErrorDisplay message={t('loading')} />
    }
    if (productsError || categoriesError) {
        return <ErrorDisplay message={t('errorLoadingProductsOrCategories')} />
    }
    if (!categories) {
        return <ErrorDisplay message={t('noCategoriesFound')} />
    }
    if (!products || !categories) {
        return <ErrorDisplay message={t('noProductsOrCategoriesFound')} />
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('allProducts')}</h1>
                    <p className="text-gray-600">{t('discoverOurCompleteCollection')}</p>
                </div>
                <Filter categories={categories} />
                <div className="mb-6">
                    <p className="text-gray-600">
                        {productsLoading ? t('loading') : `${products.length} ${t('product', { count: products.length })} ${t('found')}`}
                    </p>
                </div>
                {productsLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-sm animate-pulse">
                                <div className="h-64 bg-gray-200 rounded-2xl mb-4"></div>
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noProductsFound')}</h3>
                        <p className="text-gray-600 mb-4">{t('tryAdjustingYourFiltersOrSearchTerms')}</p>
                        <Button onClick={() => window.location.href = '/products'} variant="primary">
                            {t('clearFilters')}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
