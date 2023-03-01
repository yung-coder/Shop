import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/producaction";
import ProductCard from "../Card/ProductCard";

const Product = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );

  console.log(products);
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <>
          <p>Loading.....</p>
        </>
      ) : (
        <>
          <div
            className=" h-screen overflow-auto  bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 flex justify-center  flex-col space-y-11"
            id="products"
          >
            <div className="w-full h-full flex  space-x-5 flex-wrap  justify-center items-center p-5 space-y-4">
              {products &&
                products.map((product) => <ProductCard product={product} />)}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Product;
