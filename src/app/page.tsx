import CategoryCollection from "../components/Product/CategoryCollection";
import Hero from "../components/Home/Hero";
import { Styles } from "../lib/Style";
import ProductSection from "../components/Product/ProductSection";
import BestSellingSection from "../components/Product/BestSellingSection";
import FeaturedCard from "../components/Home/FeaturedCard";
import { LocalApi } from "../lib/api/LocalApi";
import ShopFeatures, { ShopFeature } from "../components/Home/ShopFeatures";

import { FaShippingFast, FaHeadset, FaUndo, FaShieldAlt } from "react-icons/fa";

const features: ShopFeature[] = [
  {
    title: "Free Shipping",
    description: "For orders over $100",
    icon: <FaShippingFast />
  },
  {
    title: "24/7 Support",
    description: "Get help whenever you need it",
    icon: <FaHeadset />
  },
  {
    title: "Easy Returns",
    description: "30-day hassle-free returns",
    icon: <FaUndo />
  },
  {
    title: "Secure Payment",
    description: "Your payment information is always safe",
    icon: <FaShieldAlt />
  }
]

export default async function Home() {
  const product = await LocalApi.getProduct("prod-1");
  if (!product.data) {
    return <div>Product not found</div>
  }
  return (
    <main>
      <Hero />
      <ShopFeatures features={features} />
      <div className={`flex flex-col gap-4 px-4 mt-4 ${Styles.container}`}>
        <FeaturedCard product={product.data} originalPrice={100} salePrice={80} ctaText="Add to Cart" tailwindWidth="w-[20vw]" />
        <CategoryCollection />
        <ProductSection />
        <BestSellingSection />
      </div>
    </main>
  );
}
