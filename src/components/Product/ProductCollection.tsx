import React from 'react';
import { Product } from '../../lib/interface/Products';
import { ProductItem } from './ProductItem';
import TranslatedText from '../Text';


export default async function ProductCollection({ products, title }: { products: Product[], title: string }) {
    return (
        <div className="container py-8">
            <TranslatedText className="text-2xl font-bold text-gray-800 mb-6" textTag="h2">{title}</TranslatedText>
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