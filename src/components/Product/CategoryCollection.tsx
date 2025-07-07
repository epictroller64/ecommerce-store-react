import { LocalApi } from "../../lib/api/LocalApi";
import { ComponentStyles } from "../../lib/styles/componentStyles";
import TranslatedText from "../Text";
import CategoryItem from "./CategoryItem";

export default async function CategoryCollection() {
    const categories = await LocalApi.getCategories();
    if (categories.success) {
        return (
            <div>
                <TranslatedText className="text-2xl font-bold mb-4" textTag="h2">products.categories</TranslatedText>
                <div className={ComponentStyles.categoryCollection.container}>
                    {categories.data?.map((category) => (
                        <CategoryItem key={category.id} category={category} />
                    ))}
                </div>
            </div>
        )
    }
    return null
}