import { LocalApi } from "../../../lib/api/LocalApi";
import ProductPageClient from "../../../components/Product/ProductPageClient";
import { ComponentStyles } from "../../../lib/styles/componentStyles";
import { getUser } from "../../../lib/actions/userActions";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await LocalApi.getProduct(id);
    const authentication = await getUser();

    console.log(`product:`, product, id)
    if (product.success && product.data) {
        const productData = product.data;

        return (
            <div className={ComponentStyles.productPage.container}>
                <div className={ComponentStyles.productPage.internalContainer}>
                    <ProductPageClient productData={productData} user={authentication.data} />
                </div>
            </div>
        )
    }
    return <div>Product not found</div>
}
