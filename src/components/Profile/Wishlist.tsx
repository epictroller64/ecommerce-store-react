'use client'

import { FaHeart, FaBox } from 'react-icons/fa';
import { useLanguage } from '../../lib/i18n/LanguageProvider';
import { useLikedStore, LikedItem } from '../../lib/stores/likedStore';
import { ComponentStyles } from '../../lib/styles/componentStyles';
import Button from '../UI/Button';
import { useRouter } from 'next/navigation';
import WishlistProductItem from '../Product/WishlistProductItem';
import { useCartStore } from '../../lib/stores/cartStore';

export default function Wishlist() {
    const { t } = useLanguage();
    const { liked, removeFromLiked } = useLikedStore();
    const cart = useCartStore();
    const router = useRouter();
    const handleRemoveFromWishlist = (item: LikedItem) => {
        removeFromLiked(item.variant);
    };

    const handleAddToCart = (item: LikedItem) => {
        cart.addToCart({ variant: item.variant, quantity: 1 });
    };

    if (liked.length === 0) {
        return (
            <div className={ComponentStyles.wishlist.container}>
                <div className={ComponentStyles.wishlist.header.container}>
                    <h1 className={ComponentStyles.wishlist.header.title}>
                        {t('navigation.wishlist')}
                    </h1>
                    <p className={ComponentStyles.wishlist.header.subtitle}>
                        {t('wishlist.yourSavedItems')}
                    </p>
                </div>

                <div className={ComponentStyles.wishlist.empty.container}>
                    <FaHeart className={ComponentStyles.wishlist.empty.icon} />
                    <h2 className={ComponentStyles.wishlist.empty.title}>
                        {t('wishlist.wishlistEmpty')}
                    </h2>
                    <p className={ComponentStyles.wishlist.empty.description}>
                        {t('wishlist.startAddingItems')}
                    </p>
                    <Button
                        variant="primary"
                        onClick={() => router.push('/')}
                        className={ComponentStyles.wishlist.empty.button}
                    >
                        <FaBox className="w-4 h-4" />
                        {t('profile.continueShopping')}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={ComponentStyles.wishlist.container}>
            <div className={ComponentStyles.wishlist.header.container}>
                <h1 className={ComponentStyles.wishlist.header.title}>
                    {t('navigation.wishlist')}
                </h1>
                <p className={ComponentStyles.wishlist.header.subtitle}>
                    {t('wishlist.yourSavedItemsCount').replace('{count}', liked.length.toString())}
                </p>
            </div>

            <div className={ComponentStyles.wishlist.grid.container}>
                {liked.map((item) => (
                    <WishlistProductItem key={item.variant.id} item={item} handleRemoveFromWishlist={handleRemoveFromWishlist} handleAddToCart={handleAddToCart} />
                ))}
            </div>
        </div>
    );
} 