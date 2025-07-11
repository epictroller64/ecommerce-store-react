export function ProductStars({ rating }: { rating?: number }) {
    if (!rating) return null;

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
    }

    if (hasHalfStar) {
        stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<span key={`empty-${i}`} className="text-gray-300">☆</span>);
    }

    return stars;
};

export function ReviewCount({ reviewCount }: { reviewCount: number }) {
    return <span className="text-sm text-gray-600">
        {reviewCount} reviews
    </span>
}