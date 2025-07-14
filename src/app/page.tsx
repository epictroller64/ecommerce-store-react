import CategoryCollection from "../components/Product/CategoryCollection";
import Hero from "../components/Home/Hero";
import ProductSection from "../components/Product/ProductSection";
import BestSellingSection from "../components/Product/BestSellingSection";
import ShopFeatures, { ShopFeature } from "../components/Home/ShopFeatures";
import { ComponentStyles } from "../lib/styles/componentStyles";

import { FaShippingFast, FaHeadset, FaUndo, FaShieldAlt } from "react-icons/fa";

const features: ShopFeature[] = [
  {
    title: "shopFeatures.free-shipping",
    description: "shopFeatures.free-shipping-description",
    icon: <FaShippingFast />
  },
  {
    title: "shopFeatures.24-7-support",
    description: "shopFeatures.24-7-support-description",
    icon: <FaHeadset />
  },
  {
    title: "shopFeatures.easy-returns",
    description: "shopFeatures.easy-returns-description",
    icon: <FaUndo />
  },
  {
    title: "shopFeatures.secure-payment",
    description: "shopFeatures.secure-payment-description",
    icon: <FaShieldAlt />
  }
]

export default async function Home() {
  // Fetch featured product
  return (
    <main className={ComponentStyles.layout.main}>
      <Hero />
      <ShopFeatures features={features} />
      <div className={`flex flex-col gap-4 px-4 sm:px-6 lg:px-8 mt-4 ${ComponentStyles.layout.container}`}>
        <div className="w-full max-w-4xl mx-auto">
        </div>
        <CategoryCollection />
        <ProductSection />
        <BestSellingSection />
      </div>
    </main>
  );
}
