import { LocalApi } from "../../lib/api/LocalApi";
import ProductCollection from "./ProductCollection";


export default async function ProductSection() {
    const products = await LocalApi.getProducts();
    if (products.success && products.data?.products) {
        return (
            <ProductCollection products={products.data.products} title={"products.featured"} />
        );
    }
    return (
        <div className="text-center py-8">
            <p className="text-gray-500">No products available at the moment.</p>
        </div>
    );
}