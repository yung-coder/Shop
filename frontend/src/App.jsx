import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import ProductDetails from "./components/Details/ProductDetails";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Product from "./components/Product/Product";
import Search from "./components/Search/Search";
import AuthUser from "./components/User/AuthUser";
import axios from "axios";
import { useEffect } from "react";
import store from "./store";
import { LoadUser } from "./actions/useraction";
import { useSelector } from "react-redux";
import UserOptions from "./components/Navbar/UserOptions";
import Profile from "./components/User/Profile";
import UpdatedProfile from "./components/User/UpdatedProfile";
import Cart from "./components/Cart/Cart";

function App() {
  axios.defaults.withCredentials = true;
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(LoadUser());
  }, []);

  return (
    <div className="App">
      <Navbar />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:keyword" element={<Product />} />
        {isAuthenticated ? (
          <Route path="/account" element={<Profile />} />
        ) : (
          <Route path="/login" element={<AuthUser />} />
        )}
        <Route path="/Search" element={<Search />} />
        <Route path="/login" element={<AuthUser />} />
        <Route path="/me/update" element={<UpdatedProfile />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
