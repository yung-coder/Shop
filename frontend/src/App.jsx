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
import { useEffect, useState } from "react";
import store from "./store";
import { LoadUser } from "./actions/useraction";
import { useSelector } from "react-redux";
import UserOptions from "./components/Navbar/UserOptions";
import Profile from "./components/User/Profile";
import UpdatedProfile from "./components/User/UpdatedProfile";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  axios.defaults.withCredentials = true;
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/stripeapiKey"
    );

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(LoadUser());
    getStripeApiKey();
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
        {isAuthenticated ? (
          <Route path="/shipping" element={<Shipping />} />
        ) : (
          <Route path="/login" element={<AuthUser />} />
        )}
        {isAuthenticated ? (
          <Route path="/order/confirm" element={<ConfirmOrder />} />
        ) : (
          <Route path="/login" element={<AuthUser />} />
        )}
        {isAuthenticated && setStripeApiKey ? (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />
        ) : (
          <Route path="/login" element={<AuthUser />} />
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
