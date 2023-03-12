import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <Link
      class="h-fit p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl hove  r:scale-105 transition-all transform duration-500"
      to={`/product/${product._id}`}
    >
      <img
        class="w-full h-40   object-contain rounded-t-md"
        src={product.images[0] ? product.images[0] : "https://www.erdshoppe.com/wp-content/uploads/2021/12/ERD-TC-21-Micro-USB-Charger-2-Amp-Mobile-Charger-with-Detachable-Cable-White-Cable-Included-1.jpg"}
        alt=""
      />
      <div class="mt-4">
        <h1 class="text-2xl font-bold text-gray-700">{product.name}</h1>
        <ReactStars
          count={5}
          onChange={"   "}
          size={24}
          activeColor="#ffd700"
        />
        <div class="mt-4 mb-2 flex justify-between space-x-5 pl-4 pr-2">
          <button class="block text-xl font-semibold text-gray-700 cursor-auto">
            $ {product.price}
          </button>
          <button class="text-lg block font-semibold py-2 px-6 text-green-100 hover:text-white bg-green-400 rounded-lg shadow hover:shadow-md transition duration-300">
            Buy
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
