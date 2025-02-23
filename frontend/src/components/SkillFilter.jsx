import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";

const SkillFilter = () => {
  const dispatch = useDispatch();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(BASE_URL + "/skills", {
          withCredentials: true,
        });
        console.log("Fetched skills:", res.data); // Debugging log
        setAvailableSkills(res.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  const handleSkillChange = async (event) => {
    const skill = event.target.value;
    if (skill && !selectedSkills.includes(skill)) {
      const updatedSkills = [...selectedSkills, skill];
      setSelectedSkills(updatedSkills);
      fetchJobs(updatedSkills);
    }
  };

  const fetchJobs = async (skills) => {
    try {
      let url = BASE_URL + "/search";
      if (skills.length > 0) {
        url += `?skills=${skills.join(",")}`;
      }

      const res = await axios.get(url, { withCredentials: true });
      console.log("Fetched jobs:", res?.data);
      dispatch(addFeed(res?.data));
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const removeSkill = (skill) => {
    const updatedSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(updatedSkills);
    fetchJobs(updatedSkills);
  };

  const clearAll = () => {
    setSelectedSkills([]);
    fetchJobs([]);
  };

  return (
    <div className="flex flex-row gap-4">
      {/* Dropdown */}
      <div>
        <select
          className="w-190px ml-16 px-2 h-12 border border-gray-300 text-gray-600 rounded-lg p-2 focus:outline-none focus:ring-0"
          onChange={handleSkillChange}
          value=""
          disabled={!!user}
        >
          <option value="" disabled hidden>
            Skills
          </option>
          {availableSkills.map((skill) => (
            <option className="" key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {selectedSkills.map((skill) => (
          <div
            key={skill}
            className="flex items-center bg-red-100 pl-6 ml-1 py-0 text-gray-700"
          >
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(skill)}
              className="ml-4 h-11 w-10 bg-red-400 text-white px-2 py-1"
            >
              X
            </button>
          </div>
        ))}

        {selectedSkills.length > 0 && (
          <button
            onClick={clearAll}
            className="text-[#FF6B6B] text-lg font-semibold"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default SkillFilter;
