## 📁 Step 1: Project Structure

In your root project folder (where your `frontend/` folder is), create a new folder:

```
/project-root
  ├── frontend/
  └── backend/
```

---

## ✅ Phase 2: Initialize Node.js Project

Initialize `package.json`Inside `/backend`:

```bash
cd backend
npm init -y
```

This creates a `package.json` file that manages your backend dependencies.

---

## ✅ Phase 3: Install Core Dependencies

### 📚 Step 3: Install Required Packages

```bash
npm install express mongoose dotenv cors
```

- **express** – server framework
- **mongoose** – MongoDB ODM (for schema/data modeling)
- **dotenv** – manage secret keys like DB password
- **cors** – enables frontend-backend communication

For development:

```bash
npm install --save-dev nodemon
```

Also update `package.json` to auto-restart server:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

---

## ✅ Phase 4: Create Initial Backend Boilerplate

### 🗂️ Folder Structure

```
/backend
  ├── controllers/
  ├── models/
  ├── routes/
  ├── config/
  ├── .env
  ├── index.js
  └── db.js
```

### 🧠 Step 4: Create `index.js` (Main Server File)

```jsx
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes placeholder
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
```

---

### `app.use(cors());`

- **`app.use()`:** This is an Express method used to mount middleware functions. Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the `next` middleware function in the application's request-response cycle. They can execute code, make changes to the request and response objects, end the request-response cycle, or call the next middleware in the stack.
- **`cors()`:** When called as a function (as shown here, `cors()`), the `cors` package returns an Express middleware function configured with default (or specified) CORS options.
- **What it's doing:**
  - It applies the CORS middleware to your Express application. This means that for every incoming HTTP request, the `cors` middleware will be executed

### `app.use(express.json());`

- **`express.json()`:** This is a built-in middleware function provided by Express.
- **What it's doing:**
  - It applies the `express.json()` middleware to your application. This middleware is responsible for **parsing incoming request bodies with JSON payloads**.
- **Why it's there:** When a client (like a web browser or a mobile app) sends data to your server via `POST`, `PUT`, or `PATCH` requests, especially when sending data in JSON format (e.g., when submitting a form or sending data for a new user), this middleware automatically parses that JSON data. It then makes the parsed data available on the `req.body` object in your route handlers. Without this middleware, `req.body` would be `undefined` for JSON requests.

### `app.get("/", (req, res) => { res.send("API is running..."); });`

- `app**.get(path, handler)`:** This is an Express method that defines a route for handling HTTP **GET\*\* requests.
- `path` (`"/"`): This is the URL path that this route will respond to. In this case, it's the root path of your server (e.g., `http://localhost:5000/`).
- `handler` (`(req, res) => { ... }`): This is the **callback function** that Express executes when an HTTP GET request is received at the specified path. This function always receives two main arguments:
  - `req` (Request object): Contains information about the incoming HTTP request (e.g., headers, URL parameters, query strings, request body after middleware parsing).
  - `res` (Response object): An object that provides methods for sending an HTTP response back to the client (e.g., `res.send()`, `res.json()`, `res.status()`).
- **`res.send("API is running...");`:** This is a method of the `res` (response) object.
- **What it's doing:**
  - It sets up a basic API endpoint. When a client makes a GET request to the root URL (`/`) of your server, this function will be triggered.
  - It then sends back the simple text string "API is running..." as the response.
- **Why it's there:** This is commonly used as a "health check" or a simple welcome message to confirm that your server is running and accessible.

## ✅ Phase 5: Set up the MongoDB Database

### ✅ Step-by-Step Guide to Set Up MongoDB Atlas and Connect

---

### **🧱 Phase 1: Create a New MongoDB Project**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/).
2. On the **Projects Dashboard**, click **"New Project"**.
3. Name the project (e.g., `eCommerceBackend`) and click **Next**.
4. You can skip adding members (unless working in a team) and click **"Create Project"**.

---

### **💡 Phase 2: Create a Cluster**

1. Inside your new project, click **"Build a Database"**.
2. Choose:
   - **Deployment Type**: "Shared" (Free) Tier (for development).
   - **Cloud Provider & Region**: Choose a region near you.
3. Click **Create Cluster**.

---

### **👤 Phase 3: Create a Database User**

1. Once the cluster is ready, click **"Database Access"** from the left sidebar.
2. Click **"Add New Database User"**:
   - **Username**: `myuser`
   - **Password**: Use a strong password (e.g., `mypassword123`)
3. **Database User Privileges**:
   - **Built-in Role**: Select `Atlas Admin` (for full access during dev).
4. Click **"Add User"**.

---

### **🌍 Phase 4: Set IP Whitelist**

1. Go to **Network Access** → Click **"Add IP Address"**.
2. Choose:
   - ✅ `"Add My Current IP"` — preferred if you're using a stable IP.
   - ✅ Or `"Allow Access from Anywhere"` (0.0.0.0/0) — convenient for dev.
3. Click **Confirm**.

---

### **🌱 Phase 5: Create Your First Database**

1. Go to **"Database"** → click your Cluster → click **"Browse Collections"**.
2. Click **"Create Database"**:
   - **Database Name**: `ecommerceDB`
   - **Collection Name**: `test` or `products`
   - Click **Create**.

This will ensure the DB exists and is ready for connections.

---

### **🔗 Phase 6: Get Connection String**

1. Go back to your **Cluster page** and click **"Connect"**.
2. Choose **"Connect your application"**.
3. Copy the connection string:

   ```
   mongodb+srv://myuser:<password>@cluster0.abcd123.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```

4. Replace `<password>` with your real password. Also, you can append your DB name:

   ```
   mongodb+srv://myuser:mypassword123@cluster0.abcd123.mongodb.net/ecommerceDB?retryWrites=true&w=majority&appName=Cluster0
   ```

---

### **🛠 Phase 7: Add to .env**

```
env
CopyEdit
MONGO_URI=mongodb+srv://myuser:mypassword123@cluster0.abcd123.mongodb.net/ecommerceDB?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
```

---

### **🚀 Phase 8: Connect in Your Backend**

You already have this — it’s perfect:

**📁 `db.js`**

```jsx
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

**📁 `index.js`**

```jsx
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
```

---

**[ Must use Mobile’s HOTSPOT ]**

## ✅ Step-by-Step Plan for User Schema & Auth System

---

### ✅ Phase 1: Setup File Structure

Inside your `backend` folder, create the following structure:

```
pgsql
CopyEdit
backend/
├── models/
│   └── User.js
├── routes/
│   └── authRoutes.js
├── controllers/
│   └── authController.js

```

Each file serves a specific purpose:

- `User.js`: MongoDB schema and model for user.
- `authRoutes.js`: Routes like `/signup`, `/login`.
- `authController.js`: Logic for signup/login requests.

---

### ✅ Phase 2: Install Required Packages

Run this to install necessary packages:

```bash
bash
CopyEdit
npm install bcryptjs jsonwebtoken

```

- `bcryptjs`: For hashing passwords securely.
- `jsonwebtoken` (JWT): For generating secure login tokens.

---

### ✅ Phase 3: Create the User Model (`models/User.js`)

```jsx
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
```

📌 **Explanation**:

- `email` is unique — no duplicate accounts.
- `password` is required but we’ll hash it before saving.
- `createdAt` helps track when the user joined.

---

### ✅ Phase 4: Create Auth Controller (`controllers/authController.js`)

### What is a Controller in the Backend?

In backend architecture, a **controller** is responsible for:

- Receiving requests from the frontend (like login form submissions),
- Processing data (e.g., verifying passwords),
- Interacting with the database if needed (e.g., checking if the user exists),
- Sending a proper response back to the frontend.

```jsx
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST /signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST /login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
```

📌 **Explanation**:

- `bcrypt.hash()` hashes password for security.
- `bcrypt.compare()` validates entered password on login.
- `jwt.sign()` creates a token for frontend to store for future authenticated requests.

---

## ✅ Phase 5: Define Auth Routes (`routes/authRoutes.js`)

```jsx
const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

// Public routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
```

---

### ✅ Phase 6: Connect Routes to Server (`index.js`)

At the bottom of your `index.js`, import and use the route:

```
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
```

✅ Now you’ll have:

- `POST /api/auth/signup`
- `POST /api/auth/login`

### 🔥 What is an "Endpoint"?

An **endpoint** is a URL path that the frontend can call (via `fetch`, `axios`, etc.) to **send data to or get data from the backend**.

---

### 💡 Understanding `POST /api/auth/signup`

- **Method:** `POST`
  - Means you're **sending data** (like name, email, password) to the server.
- **Path:** `/api/auth/signup`
  - The route you've defined for registering a new user.
- **What it does:**
  - When the frontend sends a `POST` request with user details to `/api/auth/signup`, your backend runs the `register()` function from `authController.js`.

✅ **Example frontend call:**

```jsx
await fetch("http://localhost:5000/api/auth/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Abhijeet",
    email: "abhi@email.com",
    password: "123456",
  }),
});
```

---

### 💡 Understanding `POST /api/auth/login`

- **Method:** `POST`
  - You're sending login credentials.
- **Path:** `/api/auth/login`
  - The route for signing in existing users.
- **What it does:**
  - When this is called, it runs the `login()` function from `authController.js`.
  - Checks if user exists, verifies password, then returns a token and user data.

✅ **Example frontend call:**

```jsx
await fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "abhi@email.com", password: "123456" }),
});
```

---

## 🚀 Why is this useful?

Once these endpoints are working:

- Your **frontend authentication form** (signup/login) can now **connect to the backend**.
- You'll store the `JWT token` and logged-in user in the frontend's localStorage or context.
- All authenticated features (like Cart, Wishlist, Order History) can now be **secured**.

### ✅ Fix: Add `JWT_SECRET` to Your `.env` File

Your `.env` file should contain **three environment variables**:

```
MONGO_URI=mongodb+srv://myuser:your_password@cluster0.typ81pr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
JWT_SECRET=mySuperSecretKey123
```

> 🔐 Replace mySuperSecretKey123 with a strong, random secret in real projects!

## ✅ Phase 7: Test Your API

Use Postman or Thunder Client (VSCode Extension)

# ✅ What is Postman?

**Postman** is a free tool that lets you **send HTTP requests** (like `POST`, `GET`, `PUT`, etc.) to your backend **without needing a frontend**.

### Why use Postman?

- You can **test your backend APIs** independently.
- It shows you:
  - The **request** you're sending (e.g., email, password).
  - The **response** from your backend (e.g., user data, token, error message).
- Helps catch bugs **before** you connect the frontend.

---

### 🛠️ How to Use Postman to Test Your Backend API

## ✅ Step 1: Install Postman

- Go to https://www.postman.com/downloads/
- Download and install Postman for Windows/Mac.
- Open the app after installing.

---

## ✅ Step 2: Start Your Backend Server

In your backend terminal, run:

```bash
bash
CopyEdit
npm run dev

```

You should see:

```
pgsql
CopyEdit
🚀 Server started on port 5000
✅ MongoDB Connected Successfully

```

---

## ✅ Step 3: Open Postman and Send a Signup Request

### 🎯 Goal: Test the `/api/auth/signup` route

### 🧾 Fill the request like this:

1. **Method:** `POST`
2. **URL:** `http://localhost:5000/api/auth/signup`
3. Go to the **"Body"** tab
4. Select **raw** and choose **JSON** from the dropdown.
5. Enter this JSON (you can change the values):

```json
json
CopyEdit
{
  "name": "Abhijeet",
  "email": "abhi@example.com",
  "password": "mypassword123"
}

```

1. Click the **"Send"** button.

---

### ✅ If everything is working:

You’ll see a response like:

```json
json
CopyEdit
{
  "_id": "64ee1f3b5c9b7a6ad0...",
  "name": "Abhijeet",
  "email": "abhi@example.com",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}

```

> This means your backend created a user and returned a JWT token. 🎉

---

## ✅ Step 4: Test the Login Route

### 🎯 Goal: Test the `/api/auth/login` route

1. Change the **URL** to:

   `http://localhost:5000/api/auth/login`

2. Keep **method as `POST`**
3. Go to the **Body > raw > JSON** again and type:

```json
json
CopyEdit
{
  "email": "abhi@example.com",
  "password": "mypassword123"
}

```

1. Click **Send**

✅ You’ll get a response like:

```json
json
CopyEdit
{
  "_id": "64ee1f3b5c9b7a6ad0...",
  "name": "Abhijeet",
  "email": "abhi@example.com",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}

```

> If the password is wrong, you'll get an error like:

```json
json
CopyEdit
{ "error": "Invalid email or password" }

```

---

##

| API Tested         | What You Did           | What Happened                        |
| ------------------ | ---------------------- | ------------------------------------ |
| `/api/auth/signup` | Created a new user     | Added user to MongoDB + returned JWT |
| `/api/auth/login`  | Logged in as that user | Validated user + returned JWT        |

Once this is working, you will have:

- A working User model
- Authentication using hashed passwords and JWT
- Frontend-ready API endpoints for Signup/Login

## **JWT-based route protection**

Awesome! Let’s now **implement JWT-based route protection** to secure private routes like `/cart`, `/orders`, `/wishlist`, etc.

---

## 🔒 Goal of This Phase:

Only authenticated users (those with a valid JWT token) should be able to access certain routes. We'll:

1. Create a **JWT verification middleware**.
2. Apply it to routes that require login.
3. Test protected routes using Postman (with JWT in headers).

---

### ✅ Step-by-Step Guide

### 📁 1. Create `middleware/authMiddleware.js`

This middleware will:

- Extract the token from headers.
- Verify it using the secret key.
- Attach the user info (from token) to `req.user`.

```jsx
// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token. Unauthorized access!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, name } from token
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
```

> 🔐 req.headers.authorization should include:
>
> `Authorization: Bearer <token>`

---

### 🧪 2. Create a Protected Route to Test

In `routes/protectedRoutes.js`, let's create a dummy route:

```jsx
// backend/routes/protectedRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/private", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized to access this protected route.",
    user: req.user, // contains id, name, email
  });
});

module.exports = router;
```

---

### 🔌 3. Plug the Route into `index.js`

In your `index.js`:

```
const protectedRoutes = require("./routes/protectedRoutes");
app.use("/api", protectedRoutes);

```

Now you have a protected route at:

```
GET /api/private
```

---

### 🧪 4. Test in Postman

### 🔑 First, Login

- **POST** `http://localhost:5000/api/auth/login`
- Body (JSON):

```json
{
  "email": "abhi@example.com",
  "password": "mypassword123"
}
```

✅ It will return a token like:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

### 🔐 Then, Access Protected Route

- **GET** `http://localhost:5000/api/private`
- **Headers:**
  - `Authorization: Bearer <your_token>`

✅ If token is valid → you’ll get:

```json
{
  "message": "You are authorized to access this protected route.",
  "user": {
    "id": "...",
    "name": "Abhijeet",
    "email": "abhi@example.com",
    "iat": ...,
    "exp": ...
  }
}
```

❌ If the token is missing or invalid → error:

```json
{
  "message": "No token. Unauthorized access!"
}
```

---

## **(Frontend + Backend Integration)**

###

We want to **connect your frontend AuthPage to your backend**:

- When users **sign up**, send data to `POST /api/auth/signup`
- When users **log in**, send data to `POST /api/auth/login`
- Store the **JWT token** in `localStorage`
- Store the **user data** in React Context (`UserContext`)
- Automatically **authenticate** all future actions (like add to cart, wishlist, orders) using this token

### 🔁 1. Update `UserContext.jsx` to Store Token + User

> 🔐 We'll store the JWT token in localStorage so it persists even after refresh.

```jsx
// context/UserContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
```

---

### ⚙️ 2. Update `AuthPage.jsx` to Call Backend and Use Real Login

> Replace your mock login() with real API calls.

First, create a helper function to make API calls easier:

```jsx
// utils/api.js (create this new file)
const API_BASE = "http://localhost:5000/api"; // adjust if needed

export const signupUser = async (data) => {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};
```

Then, update your `AuthPage.jsx`:

```jsx
import { signupUser, loginUser } from "../utils/api"; // add this line

const onSubmit = async (data) => {
  try {
    let response;
    if (isLogin) {
      response = await loginUser(data);
    } else {
      response = await signupUser(data);
    }

    if (response.token && response.user) {
      login(response.user, response.token); // save to context + localStorage
      navigate("/");
    } else {
      alert(response.message || "Something went wrong");
    }
  } catch (error) {
    console.error("Auth Error:", error);
    alert("Server error. Try again later.");
  }
};
```

---

### ✅ 3. Test the Login/Signup Flow

> Run your backend server and test login/signup on the frontend.

🧪 Use these sample details:

- Sign Up: name = `"Abhijeet"`, email = `abhi@example.com`, password = `mypassword123`
- Log In: use same credentials
- Check browser `localStorage`:
  - `user` should be stored
  - `token` should be stored

### 1. Update `onSubmit()` to send only what the backend expects

In your `AuthPage.jsx`, change this:

```jsx
const onSubmit = async (data) => {
  try {
    let response;
    if (isLogin) {
      response = await loginUser(data);
    } else {
      response = await signupUser(data);
    }
```

To this — only send required fields:

```jsx
const onSubmit = async (data) => {
  try {
    let response;
    if (isLogin) {
      response = await loginUser({
        email: data.email,
        password: data.password,
      });
    } else {
      response = await signupUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    }
```

✅ This ensures `confirmPassword` is **not sent** to the backend (since the backend doesn't need it).
