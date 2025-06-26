## Folder Structure

- /src
  /assets # Images, logos, icons
  /components # Reusable UI components (Button, Card, etc.)
  /pages # Route-based pages (Home, ProductPage, Cart, etc.)
  /layouts # Page layouts (Header + Footer wrapper)
  /routes # Route definitions
  /hooks # Custom React hooks
  /contexts # Context API providers (Auth, Cart, etc.)
  /services # API calls (auth, products, orders)
  /utils # Utility/helper
  functions
  /constants # Constants (API URLs, messages, etc.)
  /styles # Global styles or Tailwind setup
  App.jsx
  main.jsx

## **Install Essential Packages**

Install packages you'll definitely use:

```bash
# Routing
npm install react-router-dom

# HTTP requests
npm install axios

# Icons
npm install react-icons

# State management (optional, or later)
npm install zustand         # or redux, recoil, jotai, etc.

# UI library (optional but helps with speed)
npm install @shadcn/ui     # or Chakra UI, Tailwind CSS, MUI

```

[]()

## **Git & Version Control**

1. **Push only root folder to GitHub:**
   - Your Git repo should be initialized from the **root (`ecommerce-platform/`)**, not just the frontend.
   - Run this inside `ecommerce-platform/`:
     ```bash
     git init
     echo "node_modules/" > .gitignore
     echo ".env" >> .gitignore
     git add .
     git commit -m "Initial frontend setup"
     ```
2. Connect your local repo to the GitHub one

In your terminal (make sure you’re in the `ecommerce-platform/` folder):

```bash
bash
CopyEdit
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-platform.git
```

1. Push your code to GitHub

```bash
bash
CopyEdit
git branch -M main
git push -u origin main
```

## Compontents

### Step 1: Create a `components/` folder

```
/src
  /components
    Navbar.jsx
    Footer.jsx
    ProductCard.jsx

```

### Step 2: Build your first 3 components

### 1. **Navbar**

```jsx
jsx;
CopyEdit;
// src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between p-4 shadow bg-white">
      <Link to="/" className="font-bold text-xl">
        MyShop
      </Link>
      <div className="flex gap-4">
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
export default Navbar;
```

---

### 2. **Footer**

```jsx
jsx;
CopyEdit;
// src/components/Footer.jsx
function Footer() {
  return (
    <footer className="text-center p-4 mt-10 text-sm text-gray-600 border-t">
      © 2025 MyShop. All rights reserved.
    </footer>
  );
}
export default Footer;
```

---

### 3. **ProductCard**

We'll connect this later to real data. For now:

```jsx
jsx;
CopyEdit;
// src/components/ProductCard.jsx
function ProductCard({ title, price, image }) {
  return (
    <div className="border rounded-xl p-4 shadow hover:scale-105 transition">
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover rounded"
      />
      <h2 className="text-lg font-semibold mt-2">{title}</h2>
      <p className="text-gray-700">${price}</p>
    </div>
  );
}
export default ProductCard;
```

---

### ✅ Step 3: Use these in a layout or page

Update `App.jsx`:

```jsx
jsx;
CopyEdit;
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default App;
```

After doing these, I got an error in the console:
You're using `<Link>` from `react-router-dom`, but you **didn't wrap your app in `<BrowserRouter>`**. So when `<Link>` tries to access the routing context, it crashes.

✅ Fix: Go to `main.jsx` and **wrap `<App />` with `<BrowserRouter>`**.

import { BrowserRouter } from 'react-router-dom'; // ✅ import this

<BrowserRouter> {/_ ✅ wrap your App _/}
<App />
</BrowserRouter>

### ✅ Why this works:

- `<Link>` needs to be inside a **Router context** (provided by `<BrowserRouter>`)
- Without it, `useContext(RouterContext)` returns `null`, causing the error

### 💡 Why are we using **`react-router-dom`**?

`react-router-dom` is a library that allows your **React app to have pages and navigation**, just like a real website, without refreshing the whole page.

### 🔗 What is `<Link>` doing?

`<Link>` is a component from `react-router-dom` that replaces regular `<a>` tags.

### ❌ If you use:

```html
<a href="/cart">Cart</a>
```

It will **reload the whole app** when clicked (bad UX in React SPA).

### ✅ Instead, use:

```jsx
<Link to="/cart">Cart</Link>
```

This:

- **Changes the URL** without page reload
- **Loads the corresponding component** (`CartPage.jsx`)
- Keeps your app fast and responsive (Single Page App behavior)

## Props

Props (short for **properties**) are how you **pass data from a parent component to a child component**. Use props in your `ProductCard` to pass product details like:

- Title
- Price
- Image

Instead of hardcoding values, you'll pass them dynamically from a parent (like a `ProductList` page).

## ✅ Updated `ProductCard.jsx` (with improved sizing & styling)

```jsx
function ProductCard({ title, price, image }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
      <imgsrc={image}
        alt={title}
        className="h-56 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>
        <p className="text-gray-600 mt-1">${price.toFixed(2)}</p>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

```

---

## ✅ Adjust your Home page layout

```jsx
import ProductCard from "../components/ProductCard";

function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <ProductCardtitle="Nike Running Shoes"
          price={129.99}
          image="https://via.placeholder.com/300x300.png?text=Nike+Shoes"
        />
        <ProductCardtitle="Adidas Hoodie"
          price={59.99}
          image="https://via.placeholder.com/300x300.png?text=Adidas+Hoodie"
        />
        <ProductCardtitle="Puma Watch"
          price={89.99}
          image="https://via.placeholder.com/300x300.png?text=Puma+Watch"
        />
      </div>
    </div>
  );
}

export default Home;

```

In `App.jsx`, replace `Outlet` with direct usage (until we do dynamic routes):

<Navbar />
<main className="p-4">
<Home />
</main>
<Footer />

## Hooks in React (UseEffect, UseState)

### 🛒 Where Hooks fit into your E-Commerce Project

Let’s use a **real case**: You want to **load products from a fake/dummy API** and display them using your `ProductCard`.

This requires:

1. **Storing the products** in a component → `useState`
2. **Fetching the products once on load** → `useEffect`

Let’s do this inside `Home.jsx`

We’ll:

- Store products in **state**
- Fetch them using **`useEffect`**
- Pass them as **props** to `ProductCard`

---

```jsx
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  // ✅ useState lets us store product data in this component

  useEffect(() => {
    // ✅ useEffect runs after the component mounts (like componentDidMount)
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
        // ✅ this updates state with the fetched data
      } catch (error) {
        console.error("Failed to load products", error);
      }
    }

    fetchProducts();
  }, []);
  // ✅ empty dependency array = only run once

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCardkey={product.id}
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
```

Hooks are essential because they:

- Add interactivity (state)
- Connect with external APIs (side effects)

### **_Component Mount_** In React:

When a component first **appears on the screen**, React says it has “**mounted**”.

For example:

- You open the Home page
- React builds the component (calls the `Home()` function)
- Then it **displays** the JSX on the screen

👉 That moment is called **mounting**

This is when we typically want to **load data**, like fetching product info from an API.

`componentDidMount` is an **old React (class-based)** lifecycle method that runs once, right after a component mounts. In functional components, we don’t use `componentDidMount`. Instead, we use:

useEffect(() => {
// runs after component mounts
}, []);

The fetch process is **asynchronous** — it takes time. So we use Async/Await.

Are these enough hooks to apply in my ecommerce platform, or for now, is this enough?

For now, **yes** — this is enough

Where you’ll reuse these later:

- `useState()` for:
  - Cart items
  - Auth status (logged in/out)
  - Search filters
  - Admin form inputs
- `useEffect()` for:
  - Fetching products, categories, orders
  - Syncing with backend on mount/update

Later (not now), you **might** need:

| Hook                          | Why                                                            |
| ----------------------------- | -------------------------------------------------------------- |
| `useContext()`                | Share data like user info or cart across all components        |
| `useReducer()`                | Manage complex state updates (like a cart reducer)             |
| `useRef()`                    | Access DOM elements or store values without causing re-renders |
| `useMemo()` / `useCallback()` | Optimize performance in large lists                            |

## Event Handling

Where It Applies in E-Commerce

You’ll use event handling for:

- "Add to Cart" buttons
- Login form submission
- Search filters
- Checkout flow

Let’s Apply It: "Add to Cart" Button:

You already have this button in `ProductCard.jsx`:

<button className="...">Add to Cart</button>

Let’s now make it functional:

Modify `ProductCard` to accept an event handler via props

```jsx
function ProductCard({ title, price, image, onAddToCart }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
      <img src={image} alt={title} className="h-56 w-full object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>
        <p className="text-gray-600 mt-1">${price.toFixed(2)}</p>
        <button onClick={onAddToCart} // ✅ Event handler here
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">Add to Cart </button>
```

2.  In `Home.jsx`, define what happens when the button is clicked

```jsx
{products.map(product => (
  <ProductCardkey={product.id} title={product.title} price={product.price}
    image={product.image}
    onAddToCart={() => {
      console.log("Added to cart:", product.title); // ✅ Event handler function }}
```

## Later, we’ll replace `console.log` with real cart logic (`useState` or `useContext`).

State Lifting

When **a child component needs to update or share state**, that state should **live in the nearest common parent**.

Why do we lift state?

Because in your app:

- `ProductCard` (child) triggers **Add to Cart**
- But the actual **cart state** should live in the `Home` component (parent), so it can manage the full list

What we’ll do now:

1. Create a **`cart` state** in `Home.jsx`
2. Lift the `onAddToCart` logic to update this state
3. Show the cart items in the console (for now)

Modify `Home.jsx`

```jsx
.....
function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // ✅ cart state lives here now

  useEffect(() => {
    async function fetchProducts() { ..... }, []);

  // ✅ Function to handle adding a product to cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]); // Add product to cart
    console.log("Cart:", [...cart, product]); // View cart in console
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
     ......
            image={product.image}
            onAddToCart={() => handleAddToCart(product)} // ✅ pass handler with product info
          />
...
```

This function is responsible for **adding a clicked product to the cart**.
`[...prevCart, product]` You’re creating a **new array** that:

- Spreads all previous cart items → `...prevCart`
- Adds the new `product` at the end

## Prop Drilling

- **Prop Drilling** refers to the process of **passing data from a parent component down to deeply nested child components** by going through intermediate components that **don't actually need the data**, but are required to pass it along.

Show the cart item count in the Navbar using prop drilling. Display a **Cart (3)** indicator in the `Navbar` that updates as items are added.

1. Pass the cart length from `Home` to `Navbar` via props

   Since both `Navbar` and `Home` are used in `App.jsx`, we need to **lift the `cart` state** up from `Home.jsx` → into `App.jsx`. Move `cart` state to `App.jsx`

   ```jsx
   // src/App.jsx
   import { useState } from "react";
   ....
   function App() {
     const [cart, setCart] = useState([]); // ✅ cart state moved here

     return (
       <><Navbar cartCount={cart.length} /> {/* ✅ pass cart length to Navbar */}
         <Home cart={cart} setCart={setCart} /> {/* ✅ pass cart + setter to Home */}
       </>
     ); } .....
   ```

2. Update `Home.jsx` to use props

```jsx
// src/pages/Home.jsx
import ProductCard from "../components/ProductCard";

function Home({ cart, setCart }) {
  const [products, setProducts] = useState([]);
......
```

1. Display `cartCount` in the `Navbar`

```jsx
// src/components/Navbar.jsx
function Navbar({ cartCount }) {
  return (....
      <Link to="/cart">
          Cart{" "}
          <p className="bg-white text-black px-2 py-0.5 rounded">{cartCount}</p>
        </Link>
   .......
```

| What We Did                | Why                                       |
| -------------------------- | ----------------------------------------- |
| Lifted `cart` to `App.jsx` | So both `Navbar` and `Home` can access it |
| Passed props               | To share data between components          |
| Updated UI                 | To reflect cart count in the top nav      |
