'use client'
import React from 'react';
import { Category } from '../../lib/interface/Category';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface CategoryCardProps {
    category: Category;
    variant?: 'grid' | 'list';
}

export default function CategoryCard({ category, variant = 'grid' }: CategoryCardProps) {
    if (variant === 'list') {
        return (
            <Link href={`/categories/${category.id}`}>
                <div className="bg-white rounded-lg p-6">
                    <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                                src={`https://picsum.photos/150/150?random=${category.id}`}
                                alt={category.name}
                                className="object-cover rounded-lg"
                                fill
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                                {category.name}
                            </h3>
                            {category.description && (
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                    {category.description}
                                </p>
                            )}
                            <p className="text-sm text-gray-500 mt-2">
                                {category.productCount} product{category.productCount !== 1 ? 's' : ''}
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={`/categories/${category.id}`}>
            <div className="bg-white rounded-lg p-6 group">
                <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                        <Image
                            src={`https://picsum.photos/150/150?random=${category.id}`}
                            alt={category.name}
                            className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                            fill
                        />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {category.name}
                    </h3>
                    {category.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {category.description}
                        </p>
                    )}
                    <p className="text-sm text-gray-500">
                        {category.productCount} product{category.productCount !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>
        </Link>
    );
} 