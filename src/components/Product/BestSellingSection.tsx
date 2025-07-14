import { LocalApi } from "../../lib/api/LocalApi";
import ProductCollection from "./ProductCollection";

export default async function BestSellingSection() {
    const products = await LocalApi.getBestSellingProducts();
    if (products.success && products.data?.products) {
        return <ProductCollection products={products.data.products} title={"products.bestSelling"} />;
    }

    return null;
}