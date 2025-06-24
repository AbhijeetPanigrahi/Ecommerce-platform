import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  // useState lets us store product data in this componen

  useEffect(() => {
    // useEffect runs after the component mounts (like componentDidMount)
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
        //  this updates state with the fetched data
      } catch (error) {
        console.error("Failed to load products", error);
      }
    }
    fetchProducts();
  }, []); // empty dependency array = run only once after initial render

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
