import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";

const JobDetails = () => {
  const { id } = useParams(); //Extracting job ID from URL
  const [job, setJob] = useState(null);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/job/${id}`);
        setJob(res.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    fetchJobDetails();
  }, [id]);

  if (!job) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="w-[899px] h-[1100px] mx-auto p-6 shadow-2xl rounded-lg mt-10">
      <p className="text-[#999999] text-sm font-medium font-sans m-2 inline">
        {(() => {
          const createdDate = new Date(job.createdAt);
          const currentDate = new Date();
          const diffTime = currentDate - createdDate;
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          return diffDays === 0 ? "Today" : `${diffDays} days ago`;
        })()}
      </p>

      <p className="text-[#999999] text-md font-medium font-sans inline">
        {job.remoteOrOffice}
      </p>
      <div className="flex justify-between items-center">
        <h1 className="ml-1 text-3xl font-bold">{job.jobPosition}</h1>
       {user && <button
          onClick={() => navigate(`/edit/${job._id}`)}
          className="px-4 mr-4 py-2 border text-white bg-[#ED5353] rounded-lg"
        >
          Edit job
        </button>}
      </div>
      <p className="ml-1 text-[#ED5353] font-sans font-medium">
        {job.location}
      </p>
      <p className="mt-8 text-[#999999] text-sm font-semibold font-sans">
        💰Stipend:
      </p>
      <p className="mt-0 ml-1 text-[#595959] text-md font-semibold">
        ₹{job.monthlySalary}/month
      </p>

      <h3 className="mt-10 text-lg font-semibold">About company</h3>
      <p className="mt-4 text-gray-700">{job.aboutCompany}</p>

      <h3 className="mt-5 text-lg font-semibold">About the job/internship:</h3>
      <p className="mt-2 text-gray-700">{job.jobDescription}</p>

      <h3 className="mt-6 text-lg font-semibold">Skill(s) Required</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {job.skillsRequired.map((skill, index) => (
          <span key={index} className="px-3 py-1 bg-[#FFEEEE] rounded-2xl">
            {skill}
          </span>
        ))}
      </div>
      <h3 className="mt-4 text-lg font-semibold">Additional Information</h3>
      <p className="mt-2 text-gray-700">{job.additionalInformation}</p>
    </div>
  );
};

export default JobDetails;
