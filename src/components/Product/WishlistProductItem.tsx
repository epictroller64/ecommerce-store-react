import Image from "next/image";
import { ComponentStyles } from "../../lib/styles/componentStyles";
import { useLanguage } from "../../lib/i18n/LanguageProvider";
import { LikedItem } from "../../lib/stores/likedStore";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { formatPrice } from "../../lib/Utils";
import Button from "../UI/Button";
import Link from "next/link";

export default function WishlistProductItem({ item, handleRemoveFromWishlist, handleAddToCart }: { item: LikedItem, handleRemoveFromWishlist: (item: LikedItem) => void, handleAddToCart: (item: LikedItem) => void }) {

    const { t } = useLanguage();

    return <Link href={`/product/${item.variant.productId}`} className={ComponentStyles.wishlist.grid.item}>
        <div className="relative">
            <div className='relative h-48 w-full'>
                <Image
                    src={item.variant.images[0] || '/placeholder-product.jpg'}
                    alt={item.variant.name}
                    fill
                />
            </div>
            <button
                onClick={() => handleRemoveFromWishlist(item)}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                title={t('wishlist.removeFromWishlist')}
            >
                <FaTrash className="w-4 h-4" />
            </button>
        </div>
        <div className={ComponentStyles.wishlist.item.content}>
            <h3 className={ComponentStyles.wishlist.item.title}>
                {item.variant.name}
            </h3>
            {item.variant.label && (
                <p className="text-sm text-gray-600 mb-2">
                    {item.variant.label}
                </p>
            )}
            <div className={ComponentStyles.wishlist.item.price}>
                {formatPrice(item.variant.price, item.variant.currency)}
            </div>
            <div className={ComponentStyles.wishlist.item.actions}>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 flex flex-row items-center gap-2 justify-center"
                >
                    <FaShoppingCart className="w-4 h-4 mr-2" />
                    {t('wishlist.addToCart')}
                </Button>
            </div>
        </div>
    </Link>
}