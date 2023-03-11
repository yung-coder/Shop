import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProductDetails } from "../../actions/producaction";
import ReviewCard from "../Card/ReviewCard";
import Loader from "../loader/Loader";
import "./Product.css";
import {addItemsToCart } from "../../actions/cartaction";

const ProductDetails = () => {
  const dispatch = useDispatch();

  let { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      dispatch(clearErrors);
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const options = {
    size: "30",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setquantity] = useState(1);

  const increasequantity = () => {
    if (product.Stock <= quantity) {
      return;
    }
    const qty = quantity + 1;
    setquantity(qty);
  };

  const decreasequantity = () => {
    if (1 >= quantity) {
      return;
    }
    const qty = quantity - 1;
    setquantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
  };

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="w-screen h-screen flex flex-col">
            <section class="text-gray-400 bg-gray-900 body-font overflow-hidden h-full flex justify-center items-center">
              <div class="container px-5 py-24 mx-auto">
                <div class="lg:w-4/5 mx-auto flex flex-wrap">
                  <img
                    alt="ecommerce"
                    class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                    src="https://dummyimage.com/400x400"
                  />
                  <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h1 class="text-white text-4xl title-font font-medium mb-1">
                      {product.name}
                    </h1>
                    <ReactStars {...options} />
                    <p class="leading-relaxed md:ml-1">{product.description}</p>
                    <div class="flex mt-6 pb-5 border-b-2 border-b-gray-600 items-start   mb-5">
                      <div class="flex md:    ml-1 items-center">
                        <span class="mr-3 text-xl">Quantity:</span>
                        <div class="relative flex  space-x-5 p-3">
                          <button
                            className="bg-black text-white w-10"
                            onClick={increasequantity}
                          >
                            +
                          </button>
                          <input
                            type="number"
                            value={quantity}
                            readOnly
                            className="w-8"
                          />
                          <button
                            className="bg-black text-white w-10"
                            onClick={decreasequantity}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="flex">
                      <span class="title-font font-medium text-2xl text-white">
                        ₹{product.price}
                      </span>
                      <button
                        class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                        onClick={addToCartHandler}
                      >
                        ADD TO CART
                      </button>
                      <button class="rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                        <svg
                          fill="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          class="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div>
            {product.reviews && product.reviews[0] ? (
              <>
                <div className=" flex justify-start overflow-x-scroll w-full  bg-gray-900 p-12 space-x-6">
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <ReviewCard review={review} key={review._id} />
                    ))}
                </div>
              </>
            ) : (
              <>
                <div className="bg-gray-900 flex justify-center items-center p-11">
                  <h1 className="text-3xl text-white underline-offset-8">
                    No reviews
                  </h1>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
