import React, { useEffect } from "react";
import Products from "./Products";
import { AiFillCaretDown } from "react-icons/ai";
import { getProduct } from "../../actions/producaction";
import { useSelector, useDispatch } from "react-redux";



const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

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

      <Products products={products} />
    </>
  );
};

export default Home;
