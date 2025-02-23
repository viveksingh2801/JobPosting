import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, resetFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";
import SkillFilter from "./SkillFilter";
import SearchJob from "./SearchJob";

const JobList = () => {
  const navigate = useNavigate();
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const dispatch = useDispatch();

  // Create a ref for SearchJob component
  const searchRef = useRef(null);

  const getFeed = async () => {
    const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
    dispatch(addFeed(res?.data));
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleSearch = () => {
    if (searchRef.current) {
      setIsSearchActive(true);
      searchRef.current.handleSearch();
    }
  };

  if (!feed) return null;

  const filteredFeed = isSearchActive ? feed : user ? feed.filter(job => String(job.postedBy?._id) === String(user._id)) : feed;
  console.log(filteredFeed)

  

  return (
    <div className="px-56 py-10 bg-white min-h-screen">
      <div className="bg-white h-[223px] p-6 border shadow-[0px_0px_22px_4px_#FF202040] mb-6">
        <SearchJob ref={searchRef} onSearch={handleSearch} />
        <div className="flex items-center mt-12 mb-6 justify-between gap-4">
          <SkillFilter />
          {user && (
            <button
              onClick={() => navigate("/add")}
              className="w-[150px] h-[50px] px-6 mr-24  bg-[#ED5353] text-white rounded-lg"
            >
              + Add Job
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {filteredFeed.length === 0 ? (
          <div className="flex flex-col items-center my-10">
            <h1 className="text-xl font-semibold text-gray-700">
              No new jobs found!
            </h1>
          </div>
        ) : (
          filteredFeed.map((job, index) => (
            <JobCard key={index} job={job} isSearchActive={isSearchActive} />
          ))
        )}
      </div>
    </div>
  );
};

export default JobList;