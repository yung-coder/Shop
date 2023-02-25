import React from "react";
import ProductCard from "../Card/ProductCard";

const Products = ({ products }) => {
  return (
    <div
      className=" h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 flex justify-center  flex-col space-y-11"
      id="products"
    >
      <div className="w-full h-full flex    space-x-5 flex-wrap  justify-center items-center p-5 space-y-4">
        <div className="w-full flex justify-center items-center">
          <h1 className="text-white uppercase  underline underline-offset-8 text-4xl ">
            Trending Products
          </h1>
        </div>
        <ProductCard products={products} />
        <ProductCard products={products} />
        <ProductCard products={products} />
        <ProductCard products={products} />
        <ProductCard products={products} />
        <ProductCard products={products} />
        <ProductCard products={products} />
        <ProductCard products={products} />
        <ProductCard products={products} />
        <ProductCard products={products} />
      </div>
    </div>
  );
};

export default Products;
