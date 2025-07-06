import CategoryCollection from "../components/Product/CategoryCollection";
import Hero from "../components/Home/Hero";
import { Styles } from "../lib/Style";
import ProductSection from "../components/Product/ProductSection";
import BestSellingSection from "../components/Product/BestSellingSection";

export default async function Home() {
  return (
    <main>
      <Hero />
      <div className={`flex flex-col gap-4 px-4 ${Styles.container}`}>
        <CategoryCollection />
        <ProductSection />
        <BestSellingSection />
      </div>
    </main>
  );
}
