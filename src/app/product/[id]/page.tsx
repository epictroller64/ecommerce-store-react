import { LocalApi } from "../../../lib/api/LocalApi";
import { ProductStars, ReviewCount } from "../../../components/Product/ProductStars";
import { VariantSelector } from "../../../components/Product/VariantSelector";
import { Gallery } from "../../../components/Product/ProductGallery";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await LocalApi.getProduct(id);
    if (product.success && product.data) {
        const productData = product.data;

        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Gallery product={productData} />
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{productData.name}</h1>
                            <p className="text-sm text-gray-500 mt-2">Category: {productData.category}</p>
                        </div>
                        <VariantSelector product={productData} />

                        {productData.rating && productData.reviewCount && (
                            <div className="flex items-center space-x-2">
                                <ProductStars rating={productData.rating} />
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
                    </div>
                </div>
            </div>
        )
    }
    return <div>Product not found</div>
}
