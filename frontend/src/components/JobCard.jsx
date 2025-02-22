import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const isLoggedIn = !!user;
  const isUserJob = isLoggedIn && String(user._id) === String(job.postedBy._id);

  if (isLoggedIn && !isUserJob) {
    return null;
  }

  return (
    <div className="flex justify-between bg-white p-4 shadow-[0px_0px_8px_2px_#FF202040]">
      <div className="flex flex-col ">
        <div className="flex items-center gap-4">
          <img
            src={job.logoUrl}
            alt="Company Logo"
            className="w-12 h-12 rounded-lg"
          />
          <div>
            <h2 className="text-lg font-semibold">{job.jobPosition}</h2>
            <p className="text-gray-600 flex items-center mt-4 gap-2">
              <span>👥 {"11-50"}</span>&nbsp;
              <span>💰 ₹{job.monthlySalary}</span>&nbsp;
              <span>🇮🇳 {job.location}</span>
            </p>
          </div>
        </div>
        <div className="mt-4 text-sm px-12 text-gray-500">
          <span className="ml-2 px-2 py-1 text-red-600 rounded-md">
            {job.remoteOrOffice}
          </span>
          <span className="px-2 py-1 text-red-600 rounded-md">
            {job.jobType}
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="mt-3 flex gap-2 justify-end flex-wrap">
          {job.skillsRequired.map((skill, index) => (
            <span
              key={index}
              className="px-6 w-[105px] py-1 bg-[#FFEEEE] text-gray-700 rounded-md border flex items-center justify-center"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-4 flex justify-end gap-3">
          {/* Show Edit button only if it's the user's own job */}
          {isUserJob && (
            <button
              onClick={() => navigate(`/edit/${job._id}`)}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-lg"
            >
              Edit job
            </button>
          )}

          {/* View Details button visible to everyone */}
          <button
            onClick={() => navigate(`/details/${job._id}`)}
            className="px-4 py-2 bg-[#ED5353] text-white rounded-md"
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
