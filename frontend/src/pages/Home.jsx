// Parent Component
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

function Home() {
  const [products, setProducts] = useState([]);
  // useState lets us store product data in this component
  // const [cart, setCart] = useState([]);  (later it moved to App.jsx for a reason and then passed here as props)
  const { cart, setCart } = useCart();

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

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log("Cart:", [...cart, product]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => {
          const isInCart = cart.some((item) => item.id == product.id);
          return (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              onAddToCart={() =>
                // console.log(`${product.title} added to cart`);
                handleAddToCart(product)
              }
              isInCart={isInCart}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
