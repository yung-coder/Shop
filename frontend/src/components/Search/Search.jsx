import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcSearch } from "react-icons/fc";

const Search = () => {
  const [Keyword, setKeyword] = useState("");

  console.log(Keyword);
  const navigate = useNavigate();

  const fromHandler = (e) => {
    e.preventDefault();
    if (Keyword.trim()) {
      navigate(`/products/${Keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <>
      <div
        className="justify-center items-center h-screen overflow-auto bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-200 via-emerald-200 to-yellow-200 flex  flex-col space-y-11"
        id="products"
      >
        <form
          action=""
          onSubmit={fromHandler}
          className="flex space-x-5 justify-center items-center w-[300px] md:w-[500px]"
        >
          <input
            type="text"
            value={Keyword}
            onChange={(e) => setKeyword(e.target.value)}
            class="bg-green-50  text-white placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 md:p-4  dark:bg-gray-700 dark:border-green-500"
          />
          <button type="submit" value="Search">
            <FcSearch size={45} />
          </button>
        </form>
      </div>
    </>
  );
};

export default Search;
