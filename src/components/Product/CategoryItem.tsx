'use client'
import React from 'react';
import type { Category } from '../../lib/interface/Category';
import Image from 'next/image';

interface CategoryProps {
    category: Category;
}

export default function Category({ category }: CategoryProps) {
    return (
        <div className="flex flex-col items-center cursor-pointer group p-4">
            <div className="relative w-40 h-40">
                <Image
                    src={`https://prd.place/150`}
                    alt={category.name}
                    className="object-cover rounded-full transition-transform duration-300 group-hover:scale-105 bg-slate-100"
                    fill
                />
            </div>
            <h3 className="text-sm font-medium text-gray-800 text-center group-hover:text-blue-600 transition-colors duration-300">
                {category.name}
            </h3>
            <span className="text-xs text-gray-500 mt-1">
                {category.productCount} items
            </span>
        </div>
    )
}