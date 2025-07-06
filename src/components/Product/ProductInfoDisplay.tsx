'use client'
import React from 'react';
import { formatPrice } from '../../lib/Utils';

interface ProductInfoDisplayProps {
    productName: string;
    variantName: string;
    price: number;
    currency: string;
    variantKey: string;
    variantLabel: string;
    inStock: boolean;
}

export const ProductInfoDisplay: React.FC<ProductInfoDisplayProps> = ({
    productName,
    variantName,
    price,
    currency,
    variantKey,
    variantLabel,
    inStock
}) => {
    return (
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                    {productName} - {variantName}
                </h3>
                <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(price, currency)}
                </span>
            </div>

            <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 capitalize">
                    {variantKey}:
                </span>
                <span className="text-sm font-medium text-gray-900">
                    {variantLabel}
                </span>
            </div>

            <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${inStock
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                    {inStock ? 'In Stock' : 'Out of Stock'}
                </span>
            </div>
        </div>
    );
}; 