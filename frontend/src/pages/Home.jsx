import { useEffect, useState, useRef, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Spinner from "../components/Spinner";

function Home() {
  // =============================== Infinite Scroll State ===============================
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 6;
  const observerRef = useRef();
  // =============================== Contexts ===============================
  const { cart, setCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { user } = useUser();
  const navigate = useNavigate();

  // =============================== Fetching All Products Once ===============================
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setAllProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      }
    }
    fetchProducts();
  }, []);

  // =============================== Filtering and Pagination ===============================
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const searchTerm = searchParams.get("search") || "";

  const categories = [
    "all",
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    const categoryFiltered = selectedCategory
      ? allProducts.filter((p) => p.category === selectedCategory)
      : allProducts;

    const finalFiltered = categoryFiltered.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginated = finalFiltered.slice(0, page * itemsPerPage);
    setVisibleProducts(paginated);
    setLoading(false);
  }, [allProducts, selectedCategory, searchTerm, page]);

  // =============================== Infinite Scroll Observer ===============================
  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          visibleProducts.length < allProducts.length
        ) {
          setLoading(true);
          setTimeout(() => setPage((prev) => prev + 1), 1000);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, visibleProducts.length, allProducts.length]
  );

  // =============================== Handlers ===============================
  const handleAddToCart = (product) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value) {
      searchParams.set("search", value);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };

  return (
    <main className="bg-gradient-to-br from-[#dcc6ea] to-[#c1eaf0] min-h-screen px-4 py-10 sm:px-8">
      {/* Hero Section */}
      <section className="rounded-3xl overflow-hidden relative bg-[#E0F2F1] mb-12 shadow-xl">
        <img
          src="/src/assets/hero_image.png"
          alt="Hero"
          className="w-full h-72 object-cover opacity-70"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#212121] px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-2 tracking-tight">
            Elevate Your Everyday
          </h1>
          <p className="text-lg md:text-2xl mb-4 max-w-2xl text-[#444]">
            Discover beautifully curated essentials designed for modern living.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#20B2AA] hover:bg-[#179c97] text-white text-sm md:text-base px-6 py-3 rounded-full shadow-md transition font-semibold"
          >
            Explore Collection
          </button>
        </div>
      </section>
      {/* ===================== Search Input ===================== */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="🔍 Search stylish essentials..."
        className="mb-6 px-4 py-3 border border-gray-300 rounded-xl w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#20B2AA]"
      />
      {/* Filter Tags */}
      <div className="flex gap-3 flex-wrap justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border border-gray-300 shadow hover:shadow-md backdrop-blur-md ${
              selectedCategory === cat || (cat === "all" && !selectedCategory)
                ? "bg-[#20B2AA] text-white"
                : "bg-white text-[#333] hover:bg-[#F1F5F9]"
            }`}
            onClick={() => {
              if (cat === "all") {
                searchParams.delete("category");
                setSearchParams(searchParams);
              } else {
                setSearchParams({ category: cat });
              }
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {visibleProducts.map((product, index) => (
          <div
            key={product.id}
            ref={index === visibleProducts.length - 1 ? lastProductRef : null}
          >
            <ProductCard
              productId={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              isInCart={cart.some((item) => item.id === product.id)}
              onAddToCart={() => handleAddToCart(product)}
              onAddToWishlist={() => {
                if (!user) return navigate("/auth");
                addToWishlist(product);
              }}
            />
          </div>
        ))}
      </section>

      {/* Spinner */}
      {loading && <Spinner />}
    </main>
  );
}

export default Home;
