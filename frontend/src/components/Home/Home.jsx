import React from "react";
import Products from "./Products";
import { AiFillCaretDown } from "react-icons/ai";

const products ={
   name: "Shirt",
   price: 456,
   _id: "sample",
   images: [{ url: "https://cdn.shopify.com/s/files/1/0752/6435/products/0E4A0809_765x.jpg?v=1660050592" }]
}

const Home = () => {
  return (
    <>
      <div className="h-screen flex justify-center items-center flex-col bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r">
        <div className="p-5 text-white tracking-wider text-4xl uppercase font-sans flex flex-col font-bold  md:justify-center md:items-center space-y-10">
          <h1>Welcome to E-cart</h1>
          <h1>EVERY THING YOU ARE LOOKING FOR</h1>
          <div>
            <a
              class="bg-transparent   font-semibold py-2 px-4 animate-pulse border-gray-400"
              href="#products"
            >
              <AiFillCaretDown />
            </a>
          </div>
        </div>
      </div>

      <Products products={products}/>
    </>
  );
};

export default Home;
