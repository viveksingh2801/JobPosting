import React, { useEffect } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";
import SkillFilter from "./SkillFilter";
import SearchJob from "./SearchJob";

const JobList = () => {
  const navigate = useNavigate();
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const getFeed = async () => {
    const res = await axios.get(
      BASE_URL + "/feed",
      {},
      { withCredentials: true }
    );
    dispatch(addFeed(res?.data));
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length === 0) {
    return (
      <div className="flex flex-col items-center my-10">
        <h1 className="text-xl font-semibold text-gray-700">
          No new jobs found!
        </h1>
        <button
          onClick={() => window.location.reload()} // Page refresh
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Home Page
        </button>
      </div>
    );
  }

  return (
    feed && (
      <div className="px-56 py-10 bg-white min-h-screen">
        <div className="bg-white h-[223px] p-6 border shadow-[0px_0px_22px_4px_#FF202040] mb-6">
          <SearchJob />
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
          {feed.map((job, index) => {
            return <JobCard key={index} job={job} />;
          })}
        </div>
      </div>
    )
  );
};

export default JobList;
