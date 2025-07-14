import { useState } from "react";
import Button from "../UI/Button";
import { Category } from "../../lib/interface/Category";
import { useTranslations } from "../../lib/hooks/useTranslations";
import { useQueryState, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs";

export default function Filter({ categories }: { categories: Category[] }) {
    const { t } = useTranslations();
    const [showFilters, setShowFilters] = useState(false);

    // manage url state with nuqs
    const [searchQuery, setSearchQuery] = useQueryState('q', parseAsString.withDefault(''));
    const [categoriesFilter, setCategoriesFilter] = useQueryState('categories', parseAsArrayOf(parseAsString).withDefault([]));
    const [minPrice, setMinPrice] = useQueryState('minPrice', parseAsInteger.withDefault(0));
    const [maxPrice, setMaxPrice] = useQueryState('maxPrice', parseAsInteger.withDefault(1000));
    const [inStockStr, setInStockStr] = useQueryState('inStock', parseAsString.withDefault(''));
    const [ratingStr, setRatingStr] = useQueryState('rating', parseAsString.withDefault(''));

    //convert string values to proper types
    const inStock = inStockStr === '' ? null : inStockStr === 'true';
    const rating = ratingStr === '' ? null : parseInt(ratingStr);
    const handleCategoryToggle = (categoryId: string) => {
        setCategoriesFilter(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handlePriceRangeChange = (type: 'min' | 'max', value: number) => {
        if (type === 'min') {
            setMinPrice(value);
        } else {
            setMaxPrice(value);
        }
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const handleStockFilter = (stockValue: boolean | null) => {
        setInStockStr(stockValue === null ? '' : stockValue.toString());
    };

    const handleRatingFilter = (ratingValue: number | null) => {
        setRatingStr(ratingValue === null ? '' : ratingValue.toString());
    };

    const clearFilters = () => {
        setSearchQuery('');
        setCategoriesFilter([]);
        setMinPrice(0);
        setMaxPrice(1000);
        setInStockStr('');
        setRatingStr('');
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (categoriesFilter.length > 0) count++;
        if (minPrice > 0 || maxPrice < 1000) count++;
        if (searchQuery.trim()) count++;
        if (inStock !== null) count++;
        if (rating !== null) count++;
        return count;
    };
    return <div className="bg-white rounded-lg p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full lg:w-auto">
                <input
                    type="text"
                    placeholder={t('searchProducts')}
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                {t('filters')}
                {getActiveFiltersCount() > 0 && (
                    <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                        {getActiveFiltersCount()}
                    </span>
                )}
            </Button>
            {getActiveFiltersCount() > 0 && (
                <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-gray-700"
                >
                    {t('clearAll')}
                </Button>
            )}
        </div>
        {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">{t('categories')}</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                            {categories.map((category) => (
                                <label key={category.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={categoriesFilter.includes(category.id)}
                                        onChange={() => handleCategoryToggle(category.id)}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">
                                        {category.name} ({category.productCount})
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">{t('priceRange')}</h3>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(e) => handlePriceRangeChange('min', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(e) => handlePriceRangeChange('max', Number(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">{t('stockStatus')}</h3>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="stock"
                                    checked={inStock === null}
                                    onChange={() => handleStockFilter(null)}
                                    className="border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">{t('all')}</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="stock"
                                    checked={inStock === true}
                                    onChange={() => handleStockFilter(true)}
                                    className="border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">{t('inStock')}</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="stock"
                                    checked={inStock === false}
                                    onChange={() => handleStockFilter(false)}
                                    className="border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">{t('outOfStock')}</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">{t('minimumRating')}</h3>
                        <div className="space-y-2">
                            {[null, 1, 2, 3, 4, 5].map((rating) => (
                                <label key={rating ?? 'all'} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="rating"
                                        checked={rating === rating}
                                        onChange={() => handleRatingFilter(rating)}
                                        className="border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">
                                        {rating === null ? 'All' : `${rating}+ stars`}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
}