import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../actions/producaction";
import ProductCard from "../Card/ProductCard";
import Pagination from "react-js-pagination";
import "./Product.css";

const Product = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, products, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  let { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  console.log(products);
  useEffect(() => {
    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);

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
