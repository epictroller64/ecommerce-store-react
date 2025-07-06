import Link from "next/link"
import { ProductWithVariants } from "../../lib/interface/Products"
import Image from "next/image"


type FeaturedCardProps = {
    product: ProductWithVariants
    originalPrice: number
    salePrice: number
    ctaText: string,
    tailwindWidth: string
}

// Shows a featured product card which is bigger than the basic product card
export default function FeaturedCard({ product, originalPrice, salePrice, tailwindWidth }: FeaturedCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };
    const firstImage = product.variants[0]?.images[0];
    return (
        <div className={`bg-slate-100 ${tailwindWidth} rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col`}>
            <Link href={`/product/${product.id}`}>
                <div className="relative h-64 bg-gray-100">
                    {firstImage ? (
                        <Image
                            src={firstImage}
                            alt={product.name}
                            fill
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}
                    {salePrice < originalPrice && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            SALE
                        </div>
                    )}
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                    </h3>

                    <div className="flex items-center space-x-2 mb-4">
                        <span className="text-2xl font-bold text-gray-900">
                            {formatPrice(salePrice)}
                        </span>
                        {salePrice < originalPrice && (
                            <span className="text-lg text-gray-500 line-through">
                                {formatPrice(originalPrice)}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}