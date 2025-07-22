import { useEffect, useState, useRef, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Spinner from "../components/Spinner";
import heroImage from "../assets/hero_image.png";

function Home() {
  // =============================== Infinite Scroll State ===============================
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState([]); // <-- new state

  const itemsPerPage = 6;
  const observerRef = useRef();
  const productsRef = useRef(null);
  // =============================== Contexts ===============================
  const { cart, addToCart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();
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
    addToCart(product);
    setRecentlyAdded((prev) => [...prev, product.id]);
    setTimeout(() => {
      setRecentlyAdded((prev) => prev.filter((id) => id !== product.id));
    }, 1500);
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
      <section
        className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center rounded-3xl overflow-hidden mb-16 shadow-2xl transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: "linear-gradient(to bottom right, #f0f0f0, #e0e0e0)",
        }}
      >
        <img
          src={heroImage}
          alt="Curated Modern Essentials"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-75 md:opacity-90 transform scale-105 transition-transform duration-1000 ease-in-out group-hover:scale-100"
        />

        {/* Overlay for text readability and subtle depth */}
        <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col items-center justify-center text-center px-6 md:px-12 z-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg animate-fade-in-up">
            Elevate Your Everyday
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl text-gray-200 mb-8 max-w-3xl leading-relaxed animate-fade-in-up delay-200">
            Discover beautifully curated essentials designed for **modern,
            elevated living**.
          </p>
          <button
            onClick={() => {
              if (productsRef.current) {
                productsRef.current.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-white text-[#212121] hover:bg-gray-100 px-8 py-4 rounded-full shadow-lg transition-all duration-300 ease-in-out font-bold text-lg md:text-xl transform hover:-translate-y-1 animate-fade-in-up delay-400 focus:outline-none focus:ring-4 focus:ring-[#20B2AA] focus:ring-opacity-50"
          >
            Explore the Collection
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
      <section
        ref={productsRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
      >
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
              isInCart={
                cart.some((item) => item.id === product.id) ||
                recentlyAdded.includes(product.id)
              }
              isInWishlist={wishlist.some((item) => item.id === product.id)}
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
