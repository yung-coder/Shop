import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import ProductDetails from "./components/Details/ProductDetails";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
