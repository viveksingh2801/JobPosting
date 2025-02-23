import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const JobForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [remoteOrOffice, setRemoteOrOffice] = useState("Remote");
  const [location, setLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        BASE_URL + "/job/add",
        {
          companyName,
          logoUrl,
          jobPosition,
          monthlySalary,
          jobType,
          remoteOrOffice,
          location,
          jobDescription,
          aboutCompany,
          skillsRequired: skillsRequired
            .split(",")
            .map((skill) => skill.trim()),
          additionalInformation,
        },
        {
          withCredentials: true, // Automatically send cookies
        }
      );

      navigate("/");
    } catch (error) {
      console.error(error.response.data);
      alert(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-[700px]  bg-white p-6 rounded-lg mt-36">
        <h2 className="text-2xl font-bold mb-4">Add job description</h2>
        <form onSubmit={handleSubmit} className="space-y-0">
          <div className="flex items-center">
            <label className=" w-40 block font-medium">Company Name:</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="w-96 p-[6px] rounded-md border-[1.84px] border-[#c2c2c2]"
            />
          </div>
          <div className="flex items-center pt-4">
            <label className="w-40 block font-medium">Logo URL:</label>
            <input
              type="text"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="w-96 p-[6px] rounded-md border-[1.84px] border-[#c2c2c2]"
            />
          </div>
          <div className="flex items-center pt-4">
            <label className="w-40 block font-medium">Job Position:</label>
            <input
              type="text"
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
              required
              className="w-96 p-[6px] border-[1.84px] border-[#c2c2c2] rounded-md"
            />
          </div>
          <div className="flex items-center pt-4">
            <label className="w-40 block font-medium">Monthly Salary:</label>
            <input
              type="number"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
              required
              className="w-96 p-[6px] border-[1.84px] border-[#c2c2c2] rounded-md"
            />
          </div>
          <div className="flex items-center pt-4">
            <label className="w-40 block font-medium">Job Type:</label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-36 p-[6px] border-[1.84px] border-[#c2c2c2] rounded-md"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div className="flex items-center pt-4">
            <label className="w-40 block font-medium">Remote/Office:</label>
            <select
              value={remoteOrOffice}
              onChange={(e) => setRemoteOrOffice(e.target.value)}
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-96 p-[6px] border-[1.84px] border-[#c2c2c2] rounded-md"
            />
          </div>
          <div className="flex items-center pt-4">
            <label className="w-40 block font-medium">Job Description:</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
              className="w-96 p-[6px] border-[1.84px] border-[#c2c2c2] rounded-md"
            />
          </div>
          <div className="flex items-center pt-4">
            <label className="w-40 block font-medium">About Company:</label>
            <textarea
              value={aboutCompany}
              onChange={(e) => setAboutCompany(e.target.value)}
              className="w-96 p-[6px] border-[1.84px] border-[#c2c2c2] rounded-md"
            />
          </div>
          <div className="flex items-center pt-4">
            <label className="w-40 block font-medium">
              Skills Required (comma-separated):
            </label>
            <input
              type="text"
              value={skillsRequired}
              onChange={(e) => setSkillsRequired(e.target.value)}
              className="w-96 p-[6px] border-[1.84px] border-[#c2c2c2] rounded-md"
            />
          </div>
          <div className="flex items-center py-4">
            <label className="w-40 block font-medium">
              Additional Information:
            </label>
            <textarea
              value={additionalInformation}
              onChange={(e) => setAdditionalInformation(e.target.value)}
              className="w-96 p-[6px] border-[1.84px] border-[#c2c2c2] rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-36 bg-[#ED5353] text-white p-2 ml-96 rounded-md"
          >
            +Add Job
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

export default JobForm;
