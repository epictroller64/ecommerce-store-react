import CategoryCollection from "../components/Product/CategoryCollection";
import Hero from "../components/Home/Hero";
import { Styles } from "../lib/Style";
import ProductSection from "../components/Product/ProductSection";
import BestSellingSection from "../components/Product/BestSellingSection";
import FeaturedCard from "../components/Home/FeaturedCard";
import { LocalApi } from "../lib/api/LocalApi";

export default async function Home() {
  const product = await LocalApi.getProduct("prod-1");
  if (!product.data) {
    return <div>Product not found</div>
  }
  return (
    <main>
      <Hero />
      <div className={`flex flex-col gap-4 px-4 mt-4 ${Styles.container}`}>
        <FeaturedCard product={product.data} originalPrice={100} salePrice={80} ctaText="Add to Cart" tailwindWidth="w-[20vw]" />
        <CategoryCollection />
        <ProductSection />
        <BestSellingSection />
      </div>
    </main>
  );
}
