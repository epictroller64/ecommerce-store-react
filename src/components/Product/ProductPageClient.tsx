'use client'
import { useEffect, useState } from "react";
import { ProductWithVariants, Variant } from "../../lib/interface/Products";
import { User } from "../../lib/interface/User";
import { Gallery } from "./ProductGallery";
import { ProductStars, ReviewCount } from "./ProductStars";
import { VariantSelector } from "./VariantSelector";
import ErrorDisplay from "../Error/Error";
import { useTranslations } from "../../lib/hooks/useTranslations";
import ReviewList from "../Reviews/ReviewList";
import ReviewForm from "../Reviews/ReviewForm";

interface ProductPageClientProps {
    productData: ProductWithVariants;
    user?: User;
}

export default function ProductPageClient({ productData, user }: ProductPageClientProps) {
    const [selectedVariant, setSelectedVariant] = useState<Variant>(productData.variants[0]);
    const { t } = useTranslations();
    const [loaded, setLoaded] = useState(false);
    const [refreshReviews, setRefreshReviews] = useState(0);

    useEffect(() => {
        setLoaded(true);
    }, []);

    const handleReviewSubmitted = () => {
        setRefreshReviews(prev => prev + 1);
    };

    if (!loaded) {
        // avoid hydration error
        return <ErrorDisplay message={t('loading')} />
    }

    return <>
        <Gallery variant={selectedVariant} />
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">{productData.name}</h1>
                <p className="text-sm text-gray-500 mt-2">Category: {productData.category}</p>
            </div>
            <VariantSelector product={productData} onVariantChange={setSelectedVariant} />

            {productData.rating && productData.reviewCount && (
                <div className="flex items-center space-x-2">
                    <ProductStars rating={parseFloat(productData.rating)} />
                    <ReviewCount reviewCount={productData.reviewCount} />
                </div>
            )}

            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{productData.description}</p>
            </div>

            <div className="border-t pt-6">
                <dl className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <dt className="text-gray-600">Product ID:</dt>
                        <dd className="text-gray-900">{productData.id}</dd>
                    </div>
                    {productData.createdAt && (
                        <div className="flex justify-between text-sm">
                            <dt className="text-gray-600">Added:</dt>
                            <dd className="text-gray-900">
                                {new Date(productData.createdAt).toLocaleDateString()}
                            </dd>
                        </div>
                    )}
                </dl>
            </div>

            <div className="border-t pt-6">
                <ReviewList key={refreshReviews} productId={productData.id} />
                {user ? (
                    <ReviewForm productId={productData.id} onReviewSubmitted={handleReviewSubmitted} />
                ) : (
                    <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Write a Review</h3>
                        <p className="text-gray-600 mb-4">Please log in to share your thoughts about this product.</p>
                        <a
                            href="/authentication"
                            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            Log In to Review
                        </a>
                    </div>
                )}
            </div>
        </div>
    </>
}