import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <form onSubmit={searchSubmitHandler} className="relative">
      <input
        type="text"
        className="block w-full py-2 pl-10 pr-16 leading-5 rounded-md border border-gray-300 bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:bg-white"
        placeholder="Search a Product ..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center px-4 bg-blue-500 text-white rounded-r  border-transparent hover:bg-blue-600 focus:outline-none"
      >
        <FiSearch className="text-white" />
      </button>
    </form>
  );
};

export default Search;
