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

## Conditional Rendering

- Conditional rendering means showing or hiding UI based on some condition (state or props).
- Instead of always rendering the same JSX, you tell React:"Only show this if something is true."

Here are common places you'll use conditional rendering:

- Change "Add to Cart" ➝ "Added" ✅
- Hide "Remove from Cart" unless item is in cart ❌
- Show "Out of Stock" label when quantity = 0
- Show "Login" or "Logout" button based on auth state
- Show cart overlay only when it's open

You're already passing the whole **cart** to **Home** and rendering product cards from there.
We’ll now check if the current product is in the cart.

Update `ProductCard.jsx` Add a new prop: `isInCart`

```jsx
function ProductCard({ title, price, image, onAddToCart, isInCart }) {
  return ( .....
        {/* ✅ Conditionally render the button */}
        {isInCart ? (
          <buttonclassName="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded cursor-not-allowed"
            disabled
          >
            ✅ Added
          </button>
        ) : (
          <buttononClick={onAddToCart}
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            ➕ Add to Cart
          </button> ...............
```

---

Update `Home.jsx` to pass `isInCart`

```jsx
{products.map((product) => {
  const isInCart = cart.some((item) => item.id === product.id); // ✅ check if already added
  return (
    <ProductCard .....
      image={product.image}
      onAddToCart={() => handleAddToCart(product)}
      isInCart={isInCart} // ✅ pass condition
    />
.....
```

## Cart Page Creation and Routing

Wrap Your App with React Router

In `main.jsx`:

```jsx
...
import { BrowserRouter as Router } from "react-router-dom";
....
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
```

Create a `CartPage.jsx` Create a new file in `src/pages/CartPage.jsx` and add this:

```jsx
function CartPage({ cart }) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <likey={item.id}
              className="border rounded p-4 flex items-center justify-between"
            >
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p>${item.price.toFixed(2)}</p>
              </div>
              {/* We'll add Remove button here later */}
              <button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">
                Remove
              </button>
            </li>
          ))}
        ......
export default CartPage;
```

---

Define Routes in `App.jsx`

```jsx
......
import CartPage from "./pages/CartPage";
....
  return (
    <><Navbar cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
      </Routes>
    </>
 .......
```

### Why Both <Link/> and <Route/> Are Needed?

- **`react-router`** is the **core routing library** (used in all environments).
- **`react-router-dom`** is the **version meant specifically for the DOM (web apps)**.

**Navigation Links**

- Component: `<Link />`
- **Purpose**: User clicks → Go to another page

**Route Definitions** (What should show for each URL)

- Components: `<BrowserRouter>`, `<Routes>`, `<Route>`
- **Purpose**: Tell React what UI to render when a certain path is visited

Why Both Are Needed:

- Use `<Link to="/cart">`: To **navigate** the user from one page to another **without reloading the page.** You **already** used this in the Navbar.
- Use `<Route path="/cart" element={<CartPage />} />`: To **display the CartPage component** when the browser URL is `/cart`. We **just** implemented this in `App.jsx`.

### **Remove from Cart”** functionality

1. Add a `handleRemoveFromCart()` function in `CartPage.jsx`
2. Use it in the Remove button for each item

Update `CartPage.jsx`

```jsx
function CartPage({ cart, setCart }) {
  const handleRemoveFromCart = (idToRemove) => {
    const updatedCart = cart.filter((item) => item.id !== idToRemove);
    setCart(updatedCart);
  };

  return (
......
              <buttononClick={() => handleRemoveFromCart(item.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 trans
        ......
```

### **Add Total Price to CartPage**

Update `CartPage.jsx` like this:

```jsx
jsx
CopyEdit
function CartPage({ cart, setCart }) {
.....
// ✅ Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    .............
		{/* ✅ Total Price Section */}
          <div className="text-right text-xl font-semibold text-gray-800">
            Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
          </div>
        </>
.....
```

### Improvements We'll Make

| Area  | Improvement                     | Why                                              |
| ----- | ------------------------------- | ------------------------------------------------ |
| ✅ UI | Show product image              | Feels real, visual context                       |
| ✅ UX | Add quantity label              | Helps if later you implement quantity management |
| ✅ UX | Use consistent spacing & colors | Improves clarity and professionalism             |
| ✅ UX | Add "Continue Shopping" link    | Better navigation experience                     |

## React Context

**React Context** lets you share data (like cart, user, theme) across your app **without prop drilling**.

> ✅ Instead of passing props manually through 5+ components,
>
> 🧠 You wrap them in Context and access them anywhere.

Why Use Context in an E-Commerce Platform?

Here’s how **Context** makes your project scalable and cleaner:

| What You Can Store         | Why it Helps                                      |
| -------------------------- | ------------------------------------------------- |
| 🛒 Cart items              | So any page/component can read or update the cart |
| 👤 User info / auth token  | For login/logout, protected routes                |
| 🎨 Theme / layout settings | For light/dark mode, preferences                  |
| 💬 Notifications           | To show toasts or alerts globally                 |

- Create a `CartContext`
- Wrap your whole app with it
- Use it instead of `props` for `cart` and `setCart`

### Step 1: Create `CartContext.js`

Inside `src/context/CartContext.js`:

```jsx
jsx;
CopyEdit;
import { createContext, useState, useContext } from "react";

// Create context
const CartContext = createContext();

// Custom hook for easy usage
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
```

---

### Step 2: Wrap `App` with `CartProvider`

In your `main.jsx`:

```jsx
.....
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <CartProvider>
      <App />
    </CartProvider>
  </Router>
);
```

---

### Step 3: Update Components to Use Context

in App.jsx remove the `useState` for cart:

Just render routes like this :-

const [cart, setCart] = useState([]);

Just render routes like this:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/cart" element={<CartPage />} />
</Routes>
```

---

in Navbar.jsx update to use the `useCart` hook:

```jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-semibold">
        E-Commerce
      </Link>
      <Link to="/cart" className="text-white hover:underline">
        🛒 Cart ({cart.length})
      </Link>
    </nav>
  );
}
```

---

in Home.jsx and CartPage.jsx same thing — remove `cart` and `setCart` props and use `useCart()`

```jsx
import { useCart } from "../context/CartContext";
const { cart, setCart } = useCart();
```

### 🔍 What’s Happening?

### 1. `const CartContext = createContext();`

> ✅ This creates a Context object — like a global storage bucket for cart and setCart.

You don’t use this directly — instead, you **provide** it to your app and **consume** it in components.

---

### 2. `export const useCart = () => useContext(CartContext);`

> ✅ This is a custom hook for easier usage.

Instead of writing:

```jsx
const { cart } = useContext(CartContext);
```

You write:

```jsx
const { cart } = useCart();
```

It’s **just a shortcut** to make your components cleaner ✅

---

### 3. `CartProvider` component

> ✅ This is the most important part — it wraps your app and shares the cart state with every component.

```jsx
<CartContext.Provider value={{ cart, setCart }}>
  {children}
</CartContext.Provider>
```

Here:

- You're using React’s `useState([])` to create the cart
- You put both `cart` and `setCart` inside the Context’s `.Provider`
- You wrap the whole app with this, so now **any component** can access the cart via `useCart()`

---

### Where Is `CartProvider` Used?

In `main.jsx` (entry point of app):

```jsx
<CartProvider>
  <App />
</CartProvider>
```

So your `App.jsx` (and everything inside it like `Navbar`, `Home`, `CartPage`) is now **inside the Provider**.

That’s what gives them access to the global cart state.

## Best Use of Context in E-Commerce

Here are **3 solid and common use cases**:

| Feature                  | Description                                       | Benefits                                          |
| ------------------------ | ------------------------------------------------- | ------------------------------------------------- |
| 🔐 **Auth/User Context** | Store logged-in user info like name, token, email | Access user data across pages (Profile, Checkout) |
| ❤️ **Wishlist Context**  | Store liked/saved products                        | Enable "Add to Wishlist" like Amazon              |
| 🌙 **Theme Context**     | Light/dark mode or preferences                    | Easy UI toggle globally                           |

## Implementing **User Context** (Authentication)

Even before login form is built, we can:

- Set up the Context
- Simulate a login/logout state
- Use it in Navbar to show user status or conditional buttons (like "Sign Out")

---

### ✅ Step-by-Step: Setup `UserContext`

---

### 🧩 1. Create `context/UserContext.js`

```jsx
import { createContext, useContext, useState } from "react";

// Create context
const UserContext = createContext();

// Custom hook
export const useUser = () => useContext(UserContext);

// Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = not logged in

  // Simulate login
  const login = (userData) => {
    setUser(userData);
  };

  // Simulate logout
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
```

---

### 🧩 2. Wrap `App` in `UserProvider` (in `main.jsx`)

```jsx
.....
ReactDOM.createRoot(document.getElementById("root ..........
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
```

> ✅ Now your entire app can access user, login(), logout() from anywhere.

---

### 🧪 3. Update `Navbar.jsx` to Use `UserContext`

This is where you **display the login status**:

```jsx
jsx
CopyEdit
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { cart } = useCart();
  const { user, login, logout } = useUser();

  return (
    ......
        {user ? (
          <>
            <span className="text-sm text-gray-300">👋 {user.name}</span>
            <buttononClick={logout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <buttononClick={() => login({ name: "Abhijeet" })}
            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
          >
            Login
          </button>
        )}
      </div>......
```

## Protected Routes

> ✅ Only logged-in users can access certain pages
>
> ❌ If not logged in, user is **redirected to homepage (or login page)**

---

## 🧱 Example Use Case

- `/cart` → only accessible if user is logged in
- If not logged in → redirect to `/`

1. Create a `ProtectedRoute` component

Inside `src/components/ProtectedRoute.jsx`:

```jsx
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    // Not logged in, redirect to homepage
    return <Navigate to="/" replace />;
  }

  // Logged in → show the protected page
  return children;
};

export default ProtectedRoute;
```

---

### 🛠️ 2. Use `ProtectedRoute` in `App.jsx`

Wrap any route you want to protect, like this:

```jsx
....
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (.......
       {/* Protected Route for Cart */}
        <Routepath="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } />     .......
```

Want to Redirect to the Login Page Instead?

Just change this line in `ProtectedRoute.jsx`:

```jsx
return <Navigate to="/login" replace />;
```

> You can create a /login route later when you build forms.

## Actual login and sign-up form

### 📦 What We’ll Do

### ✅ Features:

- Tab-style toggle between **Login** and **Signup**
- Form handling with `react-hook-form`
- Simple validation (email, password, etc.)
- On submit, call `login()` or `register()` from context
- Prepped for backend API calls (currently mocked)

---

1️⃣ Install React Hook Form

Run this in your terminal: npm install react-hook-form

---

2️⃣ Create `AuthPage.jsx` inside `src/pages/`

```jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Simulated backend-ready submit handler
  const onSubmit = (data) => {
    if (isLogin) {
      // In future: call backend login API here
      console.log("Logging in with:", data);
      login({ name: data.email });
    } else {
      // In future: call backend signup API here
      console.log("Registering with:", data);
      login({ name: data.email }); // simulate auto-login after signup
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex justify-between mb-6">
        <buttonclassName={`w-1/2 py-2 ${isLogin ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <buttonclassName={`w-1/2 py-2 ${!isLogin ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setIsLogin(false)}
        >
          Signup
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <inputtype="email"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <inputtype="password"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "At least 6 characters" },
            })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {!isLogin && (
          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <inputtype="password"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              {...register("confirmPassword", {
                required: "Confirm your password",
              })}
            />
            {/* For backend password match logic later */}
          </div>
        )}

        <buttontype="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default AuthPage;
```

---

3️⃣ Add Route in `App.jsx`

```jsx
import AuthPage from "./pages/AuthPage";
<Route path="/auth" element={<AuthPage />} />;
```

---

4️⃣ Update Navbar (optional): Add Login/Logout Button

You're already doing this with `login()` and `logout()` — you can now change the login logic to redirect to `/auth` instead of mock login if you prefer:

```jsx
import { useNavigate } from "react-router-dom";
// inside Navbar:
const navigate = useNavigate();
<button onClick={() => navigate("/auth")}>Login</button>;
```

---

🛠️ Later, When the Backend is Ready

Replace this: login({ name: data.email }); with:

const response = await fetch("/api/login", { ... });
const userData = await response.json();
login(userData);

---

## 🧾 Full File: `AuthPage.jsx` — Explained Section by Section

🔷 **1. Imports**

```jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
```

What do These Do?

| Line        | Purpose                                                          |
| ----------- | ---------------------------------------------------------------- |
| `useState`  | Local toggle between Login and Signup                            |
| `useForm`   | From `react-hook-form`, it handles all form inputs               |
| `useUser()` | Custom hook to access `user`, `login()`, `logout()` from context |

🔷 **2. Component Definition + States**

```jsx
function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
```

✅ `isLogin` State:

- It controls **which form** is shown (login or signup)
- If `isLogin === true` → Show Login form
- If `isLogin === false` → Show Signup form

```
const { login } = useUser();
```

- This gives access to `login()` function from your `UserContext`
- We will call this when form submits successfully

---

🔷 **3. Setup react-hook-form**

```jsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();
```

Explanation:

| Hook/Value       | Purpose                                                        |
| ---------------- | -------------------------------------------------------------- |
| `register()`     | Connects inputs to the form state                              |
| `handleSubmit()` | Wraps the form submit function                                 |
| `errors`         | Object that holds validation errors (like "password required") |

🔷 **4. `onSubmit` Function**

```jsx
const onSubmit = (data) => {
  if (isLogin) {
    console.log("Logging in with:", data);
    login({ name: data.email });
  } else {
    console.log("Registering with:", data);
    login({ name: data.email });
  }
};
```

- This function is called **when the form is submitted**
- `data` is an object like: `{ email: "abc@mail.com", password: "123456" }`
- Right now, it just logs data and calls `login()` to simulate login/signup
- Later, you can replace it with **API calls**

---

🔷 **6. Toggle Buttons: Login ↔ Signup**

```jsx
<div className="flex justify-between mb-6">
  <buttonclassName={`w-1/2 py-2 ${isLogin ? "bg-blue-600 text-white" : "bg-gray-200"}`}
    onClick={() => setIsLogin(true)}
  >
    Login
  </button>
  <buttonclassName={`w-1/2 py-2 ${!isLogin ? "bg-blue-600 text-white" : "bg-gray-200"}`}
    onClick={() => setIsLogin(false)}
  >
    Signup
  </button>
</div>
```

- These two buttons allow the user to **switch between login and signup**
- `setIsLogin(true)` means: show Login
- Button color changes based on active state

---

🔷 **7. The Actual Form**

```jsx
<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
```

- `handleSubmit(onSubmit)` = When user submits the form → call `onSubmit(data)`
- `register()` connects each field to `react-hook-form`

---

🔸 Email Field

```jsx
<input
  type="email"
  {...register("email", { required: "Email is required" })}
/>;
{
  errors.email && <p>{errors.email.message}</p>;
}
```

- Connected to the form as `email`
- If left empty, it shows an error: `"Email is required"`

---

🔸 Password Field

```jsx
  type="password"
  {...register("password", {
    required: "Password is required",
    minLength: { value: 6, message: "At least 6 characters" },
  })}
/>
{errors.password && <p>{errors.password.message}</p>}
```

- Required + must be **at least 6 characters**
- Shows error if invalid

---

🔸 Confirm Password (only in Signup mode)

```jsx
{!isLogin && (
  <inputtype="password"
    {...register("confirmPassword", {
      required: "Confirm your password",
    })}
  />
)}
```

- This input **only shows in signup mode**
- Later, you can validate that it matches `password` using `watch()` or custom validation

---

🔷 **8. Submit Button**

```jsx
<button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
```

- Shows different text depending on active mode
- Clicking it submits the form and runs `onSubmit()`

### After successful login/signup → navigate to homepage using React Router

1️⃣ **Import the `useNavigate()` hook** from React Router DOM

At the top of your `AuthPage.jsx`, add: import { useNavigate } from "react-router-dom";

2️⃣ **Initialize `navigate`** inside your component Inside your `AuthPage()` function, add:

const navigate = useNavigate();

---

3️⃣ **Use `navigate("/")` after login/signup,** Update your `onSubmit` like this:

```jsx
const onSubmit = (data) => {
  if (isLogin) {
    ....
    navigate("/"); // ✅ redirect after login
  } else {
    .....
    navigate("/"); // ✅ redirect after signup
  }
};
```

---
