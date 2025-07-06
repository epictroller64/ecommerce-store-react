'use client'
import React from 'react';
import { Product } from '../../lib/interface/Products';
import Image from 'next/image';
import { ProductStars } from './ProductStars';
import { formatPrice } from '../../lib/Utils';

interface ProductItemProps {
    product: Product;
}

function ProductItem({ product }: ProductItemProps) {
    return (
        <div
            className="bg-white overflow-hidden  duration-300 cursor-pointer rounded-2xl"
            onClick={() => {
                console.log(product)
            }}
        >
            <div className="relative group">
                <div className="w-full h-64 relative">
                    <Image
                        src={product.images[0] || '/placeholder-image.jpg'}
                        alt={product.name}
                        className="object-cover transition-opacity duration-300 group-hover:opacity-0 bg-slate-100 rounded-2xl"
                        fill
                    />
                    {product.images.length > 1 && (
                        <Image
                            src={product.images[1]}
                            alt={product.name}
                            className="object-cover rounded-2xl absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-100 duration-300"
                            fill
                        />
                    )}
                </div>

                {!product.inStock && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Out of Stock
                    </div>
                )}
            </div>

            <div className="p-4">

                {product.rating && (
                    <div className="flex items-center gap-2">
                        <div className="flex">
                            <ProductStars rating={product.rating} />
                        </div>
                        <span className="text-sm text-gray-600">
                            {product.rating.toFixed(1)}
                        </span>
                        {product.reviewCount && (
                            <span className="text-sm text-gray-500">
                                ({product.reviewCount})
                            </span>
                        )}
                    </div>
                )}
                <div className='flex flex-row justify-between'>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                        {product.name}
                    </h3>

                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold text-gray-900">
                            {formatPrice(product.price, product.currency)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { ProductItem };
