import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("vicky@gmail.com");
  const [password, setPassword] = useState("28@Vicky");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allJobs = useSelector((store) => store.feed);
  console.log(allJobs);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="flex justify-between  ml-0 items-center mr-0 min-h-screen bg-white">
      <div className="bg-white p-8 w-1/3 px-12">
        <h2 className="w-[531px] h-[58px] absolute top-[150px] left-[50px] font-dm-sans font-bold text-[40px] leading-[57.61px] text-center">
          Already have an account?
        </h2>
        <p className="w-[330px] h-[30px] absolute top-[196px] left-[50px] font-dm-sans font-medium text-[21px] leading-[30.24px] text-center text-[#525252] p-2 rounded-md">
          Your personal job finder is here
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[590px] h-[50px] absolute pl-6 top-[270px] left-[60px] rounded-[5px] border-2 border-[#C2C2C2] bg-white px-4 text-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[590px] h-[50px] pl-6 absolute top-[340px] left-[60px] rounded-[5px] border-2 border-[#C2C2C2] bg-white px-4 text-gray-700"
        />

        <p className="text-red-500 w-[610px] absolute top-[240px] left-[60px] text-sm">
          {error}
        </p>

        <button
          onClick={handleLogin}
          className="w-[190px] h-[46px] absolute top-[423px] left-[60px] rounded-[5px] bg-[#ED5353] text-white font-semibold"
        >
          Sign in
        </button>
        <div className="mt-72 ml-3">
          <p className="text-sm w-[838px] top-[195px] mt-[310px] text-gray-700 inline">
            Don't have an account?&nbsp;
          </p>

          <p
            className="text-sm w-[404px] top-[195px] mt-[0px] mr-48 text-blue-700 underline cursor-pointer inline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </p>
        </div>
      </div>
      <div>
        <img
          className="w-[675px] h-[680px] left-[816px]"
          src="/assets/image.png"
          alt="img"
        />
      </div>
    </div>
  );
};

export default Login;
