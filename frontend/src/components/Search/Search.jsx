import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <form action="" onSubmit={fromHandler}>
        <input
          type="text"
          value={Keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
