import Link from "next/link"
import { ProductWithVariants } from "../../lib/interface/Products"
import Image from "next/image"
import { ComponentStyles } from "../../lib/styles/componentStyles"

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
        <div className={`${ComponentStyles.featuredCard.container} ${tailwindWidth}`}>
            <Link href={`/product/${product.id}`}>
                <div className={ComponentStyles.featuredCard.imageContainer}>
                    {firstImage ? (
                        <Image
                            src={firstImage}
                            alt={product.name}
                            fill
                            className={ComponentStyles.featuredCard.image}
                        />
                    ) : (
                        <div className={ComponentStyles.featuredCard.placeholder}>
                            <svg className={ComponentStyles.featuredCard.placeholderIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}
                    {salePrice < originalPrice && (
                        <div className={ComponentStyles.featuredCard.saleBadge}>
                            SALE
                        </div>
                    )}
                </div>
                <div className={ComponentStyles.featuredCard.content}>
                    <h3 className={ComponentStyles.featuredCard.title}>
                        {product.name}
                    </h3>

                    <div className={ComponentStyles.featuredCard.priceContainer}>
                        <span className={ComponentStyles.featuredCard.price}>
                            {formatPrice(salePrice)}
                        </span>
                        {salePrice < originalPrice && (
                            <span className={ComponentStyles.featuredCard.originalPrice}>
                                {formatPrice(originalPrice)}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}