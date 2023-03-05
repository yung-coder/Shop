import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../actions/producaction";
import ProductCard from "../Card/ProductCard";
import Pagination from "react-js-pagination";
import "./Product.css";
import { Typography } from "@mui/material";
import { Slider } from "@mui/material";

const categories = ["laptop", "Footwear", "Bottom", "Tops", "Camera"];

const Product = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setcategory] = useState("");
  const { loading, error, products, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  let { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  console.log(products);
  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category));
  }, [dispatch, keyword, currentPage, price, category]);

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

            <div className="absolute top-[10vmax] left-[4vmax] w-[10vmax]">
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
              />
              <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setcategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>

            {resultPerPage < productCount && (
              <div className="p-5 ">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productCount}
                  onChange={setCurrentPageNo}
                  nextPageText="next"
                  prevPageText="prev"
                  firstPageText="1st"
                  lastPageText="last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Product;
