import { LocalApi } from "../../lib/api/LocalApi";
import CategoryItem from "./CategoryItem";

export default async function CategoryCollection() {
    const categories = await LocalApi.getCategories();
    if (categories.success) {
        return (
            <div>
                <h2 className="text-2xl font-bold mb-4">Browse by category</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.data?.map((category) => (
                        <CategoryItem key={category.id} category={category} />
                    ))}
                </div>
            </div>
        )
    }
    return null
}