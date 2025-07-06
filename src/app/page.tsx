import CategoryCollection from "../components/Product/CategoryCollection";
import Hero from "../components/Home/Hero";
import ProductCollection from "../components/Product/ProductCollection";
import { Styles } from "../lib/Style";

export default async function Home() {
  return (
    <main>
      <Hero />
      <div className={`flex flex-col gap-4 px-4 ${Styles.container}`}>
        <CategoryCollection />
        <ProductCollection />
      </div>
    </main>
  );
}
