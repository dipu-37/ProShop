import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

const SearchBox = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  // Debounced navigation
  const handleSearch = debounce((value) => {
    const keyword = value.trim();
    if (keyword) {
      navigate(`/products?searchTerm=${encodeURIComponent(keyword)}&page=1`);
    } else {
      navigate(`/products?page=1`);
    }
  }, 500);

  useEffect(() => {
    handleSearch(searchText);
    return () => handleSearch.cancel();
  }, [searchText]);

  return (
    <input
      type="text"
      placeholder="Search products..."
      className="input input-bordered w-full md:w-64 text-black"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  );
};

export default SearchBox;
