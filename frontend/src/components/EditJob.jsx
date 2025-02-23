import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    companyName: "",
    logoUrl: "",
    jobPosition: "",
    monthlySalary: "",
    jobType: "Full-time",
    remoteOrOffice: "Remote",
    location: "",
    jobDescription: "",
    aboutCompany: "",
    skillsRequired: "",
    additionalInformation: "",
  });

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/job/${id}`, {
        withCredentials: true,
      });
       
      const jobData = response.data;
      setJob({
        companyName: jobData.companyName,
        logoUrl: jobData.logoUrl,
        jobPosition: jobData.jobPosition,
        monthlySalary: jobData.monthlySalary,
        jobType: jobData.jobType,
        remoteOrOffice: jobData.remoteOrOffice,
        location: jobData.location,
        jobDescription: jobData.jobDescription,
        aboutCompany: jobData.aboutCompany,
        skillsRequired: jobData.skillsRequired
          ? jobData.skillsRequired.join(", ")
          : "",
        additionalInformation: jobData.additionalInformation,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${BASE_URL}/job/edit/${id}`,
        {
          ...job,
          skillsRequired: job.skillsRequired
            .split(",")
            .map((skill) => skill.trim()),
        },
        { withCredentials: true }
      );
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-[700px]  bg-white p-6 rounded-lg mt-36">
        <h2 className="text-2xl font-bold mb-4">Edit Job</h2>
        <form onSubmit={handleSubmit} className="space-y-0">
          <div className="flex items-center">
            <label className=" w-40 block font-medium">Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={job.companyName}
              onChange={handleChange}
              className="w-96 p-[6px] rounded-md border-[1.84px] border-[#c2c2c2]"
              required
            />
          </div>
          <div className="flex items-center pt-4">
            <label className="w-40 block font-medium">Logo URL:</label>
            <input
              type="text"
              name="logoUrl"
              value={job.logoUrl}
              onChange={handleChange}
              className="w-96 p-[6px] border-[1.84px] border-[#c2c2c2] rounded-md"
            />
          </div>
          <div className="flex items-center pt-4">
            <label className="w-40 block font-medium">Job Position:</label>
            <input
              type="text"
              name="jobPosition"
              value={job.jobPosition}
              onChange={handleChange}
              required
              className="w-96 p-[6px] border-[1.84px] border-[#c2c2c2] rounded-md"
            />
          </div>
          <div className="flex items-center pt-4">
            <label className="w-40 block font-medium">Monthly Salary:</label>
            <input
              type="number"
              name="monthlySalary"
              value={job.monthlySalary}
              onChange={handleChange}
              required
              className="w-96 p-[6px] border-[1.84px] border-[#c2c2c2] rounded-md"
            />
          </div>
          <div className="flex items-center pt-4">
            <label className="w-40 block font-medium">Job Type:</label>
            <select
              className="w-36 p-[6px] border-[1.84px] border-[#c2c2c2] rounded-md"
              name="jobType"
              value={job.jobType}
              onChange={handleChange}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div className="flex items-center pt-4">
            <label className="w-40 block font-medium">Remote/Office:</label>
            <select
              name="remoteOrOffice"
              value={job.remoteOrOffice}
              onChange={handleChange}
              className="w-36 p-[6px] border-[1.84px] border-[#c2c2c2] rounded-md"
            >
              <option value="Remote">Remote</option>
              <option value="Office">Office</option>
            </select>
          </div>
          <div className="flex items-center pt-4">
            <label className="w-40 block font-medium">Location:</label>
            <input
              type="text"
              name="location"
              value={job.location}
              onChange={handleChange}
              className="w-96 p-[6px] border-[1.84px] border-[#c2c2c2] rounded-md"
            />
          </div>
          <div className="flex items-center pt-4">
            <label className="w-40 block font-medium">Job Description:</label>
            <textarea
              name="jobDescription"
              value={job.jobDescription}
              onChange={handleChange}
              required
              className="w-96 p-[6px] border-[1.84px] border-[#c2c2c2] rounded-md"
            />
          </div>
          <div className="flex items-center pt-4">
            <label className="w-40 block font-medium">About Company:</label>
            <textarea
              name="aboutCompany"
              value={job.aboutCompany}
              onChange={handleChange}
              className="w-96 p-[6px] border-[1.84px] border-[#c2c2c2] rounded-md"
            />
          </div>
          <div className="flex items-center pt-4">
            <label className="w-40 block font-medium">
              Skills Required (comma-separated):
            </label>
            <input
              type="text"
              name="skillsRequired"
              value={job.skillsRequired}
              onChange={handleChange}
              className="w-96 p-[6px] border-[1.84px] border-[#c2c2c2] rounded-md"
            />
          </div>
          <div className="flex items-center py-4">
            <label className="w-40 block font-medium">
              Additional Information:
            </label>
            <textarea
              name="additionalInformation"
              value={job.additionalInformation}
              onChange={handleChange}
              className="w-96 p-[6px] border-[1.84px] border-[#c2c2c2] rounded-md"
            />
          </div>
          <button
            className="w-36 bg-[#ED5353] text-white p-2 ml-96 rounded-md"
            type="submit"
          >
            Update Job
          </button>
        </form>
      </div>
      <div className="flex justify-center items-center mt-[184px]">
        <img
          className="w-[620px] h-[880px] mt-[3px]"
          src={"/assets/addjob.jpg"}
          alt=""
        />
      </div>
    </div>
  );
};

export default EditJob;
