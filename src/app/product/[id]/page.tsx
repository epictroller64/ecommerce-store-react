import { LocalApi } from "../../../lib/api/LocalApi";
import ProductPageClient from "../../../components/Product/ProductPageClient";
import { ComponentStyles } from "../../../lib/styles/componentStyles";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await LocalApi.getProduct(id);
    console.log(`product:`, product, id)
    if (product.success && product.data) {
        const productData = product.data;

        return (
            <div className={ComponentStyles.productPage.container}>
                <div className={ComponentStyles.productPage.internalContainer}>
                    <ProductPageClient productData={productData} />
                </div>
            </div>
        )
    }
    return <div>Product not found</div>
}
