'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { ProductWithVariants, Variant } from '../../lib/interface/Products';
import { formatPrice } from '../../lib/Utils';
import { useCartStore } from '../../lib/stores/cartStore';
import { useLikedStore } from '../../lib/stores/likedStore';
import { HiOutlineHeart } from 'react-icons/hi';
import Button from '../UI/Button';
import Badge from '../UI/Badge';

interface VariantSelectorProps {
    product: ProductWithVariants;
    onVariantChange?: (variant: Variant) => void;
}

interface SelectedVariantData {
    price: number;
    currency: string;
    variantName: string;
    variantKey: string;
    variantLabel: string;
    inStock: boolean;
}

interface VariantCombination {
    [key: string]: string;
}

export function VariantSelector({ product, onVariantChange }: VariantSelectorProps) {
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
    const { addToCart } = useCartStore();
    const { addToLiked, removeFromLiked, isLiked: _isLiked } = useLikedStore();
    const handleLiked = () => {
        if (selectedVariant) {
            if (isLiked) {
                removeFromLiked(selectedVariant);
            } else {
                addToLiked({ variant: selectedVariant });
            }
        }
    }
    const isLiked = selectedVariant ? _isLiked(selectedVariant) : false;


    const [variantData, setVariantData] = useState<SelectedVariantData | null>(null);
    const [selectedCombination, setSelectedCombination] = useState<VariantCombination>({});
    const groupedVariants = product.variants.reduce((acc, variant) => {
        if (!acc[variant.key]) {
            acc[variant.key] = new Map();
        }
        // Use label as key to avoid duplicates
        acc[variant.key].set(variant.label, variant);
        return acc;
    }, {} as Record<string, Map<string, Variant>>);

    const variantKeys = Object.keys(groupedVariants);
    const updateVariantData = useCallback((variant: Variant) => {
        setVariantData({
            price: variant.price,
            currency: variant.currency,
            variantName: variant.name,
            variantKey: variant.key,
            variantLabel: variant.label,
            inStock: true,
        });
        onVariantChange?.(variant);
    }, [onVariantChange]);

    useEffect(() => {
        if (product.variants.length > 0 && !selectedVariant) {
            const firstVariant = product.variants[0];
            setSelectedVariant(firstVariant);
            updateVariantData(firstVariant);
            const initialCombination: VariantCombination = {};
            variantKeys.forEach(key => {
                const variantsForKey = groupedVariants[key];
                if (variantsForKey.size > 0) {
                    const firstVariant = Array.from(variantsForKey.values())[0];
                    initialCombination[key] = firstVariant.label;
                }
            });
            setSelectedCombination(initialCombination);
        }
    }, [product.variants, selectedVariant, groupedVariants, variantKeys, updateVariantData]);

    // gotta handle size/color combinations
    const handleVariantSelect = (variant: Variant) => {
        const newCombination = {
            ...selectedCombination,
            [variant.key]: variant.label
        };
        setSelectedCombination(newCombination);
        const matchingVariant = product.variants.find(v =>
            Object.entries(newCombination).every(([key, label]) =>
                v.key === key && v.label === label
            )
        );

        if (matchingVariant) {
            setSelectedVariant(matchingVariant);
            updateVariantData(matchingVariant);
        } else {
            setSelectedVariant(variant);
            updateVariantData(variant);
        }
    };

    const isVariantAvailable = () => {
        // Todo: make it work
        return true;
    };

    const getVariantButtonClass = (variant: Variant, isSelected: boolean) => {
        const baseClass = "px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200";
        if (!isVariantAvailable()) {
            return `${baseClass} border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed`;
        }
        if (isSelected) {
            return `${baseClass} border-blue-500 bg-blue-50 text-blue-700`;
        }
        return `${baseClass} border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50`;
    };

    //Currently special button only for color variants
    const renderVariantButton = (variant: Variant, isSelected: boolean) => {
        const isColor = variant.key.toLowerCase() === 'color';
        return (
            <button
                key={variant.id}
                onClick={() => handleVariantSelect(variant)}
                disabled={!isVariantAvailable()}
                className={getVariantButtonClass(variant, isSelected)}
                title={!isVariantAvailable() ? 'Out of stock' : ''}
            >
                {isColor ? (
                    <div className="flex flex-col items-center space-y-1">
                        <div
                            className="w-6 h-6 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: variant.label.toLowerCase() }}
                        />
                        <span className="text-xs">{variant.label}</span>
                        <span className="text-xs text-gray-500">
                            {formatPrice(variant.price, variant.currency)}
                        </span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-1">
                        <span>{variant.label}</span>
                        <span className="text-xs text-gray-500">
                            {formatPrice(variant.price, variant.currency)}
                        </span>
                    </div>
                )}
            </button>
        );
    };

    if (!product.variants || product.variants.length === 0) {
        return null;
    }

    return (
        <div className="space-y-6">
            {variantData && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {product.name} - {variantData.variantName}
                        </h3>
                        <span className="text-2xl font-bold text-gray-900">
                            {formatPrice(variantData.price, variantData.currency)}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 capitalize">
                            {variantData.variantKey}:
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                            {variantData.variantLabel}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Badge keyValue="Status" label={variantData.inStock ? 'In Stock' : 'Out of Stock'} color={variantData.inStock ? 'green' : 'red'} />
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {Object.entries(groupedVariants).map(([key, variants]) => (
                    <div key={key} className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900 capitalize">
                            Select {key}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {Array.from(variants.values()).map((variant) => (
                                renderVariantButton(
                                    variant,
                                    selectedCombination[variant.key] === variant.label
                                )
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {Object.keys(selectedCombination).length > 0 && (
                <div className="bg-blue-50 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Selected Options:</h4>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(selectedCombination).map(([key, label]) => (
                            <Badge key={key} label={label} color="blue" keyValue={key} />
                        ))}
                    </div>
                </div>
            )}

            {variantData && (
                <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-900">
                            Total Price
                        </span>
                        <span className="text-2xl font-bold text-gray-900">
                            {formatPrice(variantData.price, variantData.currency)}
                        </span>
                    </div>

                    <div className="flex space-x-3">
                        <Button
                            variant="primary"
                            size="lg"
                            disabled={!variantData.inStock}
                            onClick={() => addToCart({ variant: selectedVariant!, quantity: 1 })}
                        >
                            {variantData.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleLiked}
                        >
                            <HiOutlineHeart fill={isLiked ? 'black' : 'none'} className="w-8 h-8" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
} 