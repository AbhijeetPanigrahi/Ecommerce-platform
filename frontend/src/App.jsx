import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        {/* <Outlet /> */}
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;
