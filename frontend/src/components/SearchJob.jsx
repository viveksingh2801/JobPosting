import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const SearchJob = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSearch = async () => {
    if (!query) return;

    try {
      const res = await axios.get(
        `${BASE_URL}/search?searchTerm=${query}`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        dispatch(addFeed(res.data)); // API response ko Redux store me update karenge
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2 border border-gray-300 p-2 rounded-lg w-[900px] m-auto mb-6">
      <span className="text-gray-400 cursor-pointer">
        <img
          onClick={handleSearch}
          className="w-[20px] h-[20px] brightness-5 opacity-50"
          src="/assets/search_icon.png"
          alt=""
          disabled={!!user}
        />
      </span>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type any job title"
        className="outline-none bg-white w-full p-1"
        disabled={!!user}
      />
    </div>
  );
};

export default SearchJob;
 
 