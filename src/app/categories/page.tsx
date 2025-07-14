import React from 'react';
import { LocalApi } from '../../lib/api/LocalApi';
import { Category } from '../../lib/interface/Category';
import CategoryCard from '../../components/Product/CategoryCard';
import Link from 'next/link';
import Button from '../../components/UI/Button';
import TranslatedText from '../../components/Text';
import { MdCategory } from 'react-icons/md';

async function getCategories(): Promise<Category[]> {
    try {
        const response = await LocalApi.getCategories();
        if (response.success && response.data) {
            return response.data;
        }
        return [];
    } catch (error) {
        console.error('Error loading categories:', error);
        return [];
    }
}

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <TranslatedText textTag='h1' className='text-3xl font-bold text-gray-900 mb-2'>categories</TranslatedText>
                    <TranslatedText textTag='p' className='text-gray-600'>browseProductsByCategory</TranslatedText>
                </div>

                {categories.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <MdCategory className="mx-auto h-12 w-12" />
                        </div>
                        <TranslatedText textTag='h3' className='text-lg font-medium text-gray-900 mb-2'>noCategoriesFound</TranslatedText>
                        <TranslatedText textTag='p' className='text-gray-600 mb-4'>noCategoriesFoundDescription</TranslatedText>
                    </div>
                ) : (
                    <>
                        <div className="mb-6">
                            <p className="text-gray-600">
                                {categories.length} categor{categories.length !== 1 ? 'ies' : 'y'} found
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {categories.map((category) => (
                                <CategoryCard key={category.id} category={category} />
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <Button
                                variant="primary">
                                <Link
                                    href="/products"
                                >
                                    <TranslatedText>viewAllProducts</TranslatedText>
                                </Link>
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
