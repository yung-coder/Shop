import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import ProductDetails from "./components/Details/ProductDetails";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Product from "./components/Product/Product";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Product />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
