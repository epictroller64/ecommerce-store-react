import { LocalApi } from "../../../lib/api/LocalApi";
import ProductPageClient from "../../../components/Product/ProductPageClient";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await LocalApi.getProduct(id);
    if (product.success && product.data) {
        const productData = product.data;

        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ProductPageClient productData={productData} />
                </div>
            </div>
        )
    }
    return <div>Product not found</div>
}
