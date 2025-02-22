import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
// import {logo} from "../assets/image.png"

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleLogin = async () => {
  //   try {
  //     const res = await axios.post(
  //       BASE_URL + "/login",
  //       {
  //         email,
  //         password,
  //       },
  //       { withCredentials: true }
  //     );
  //     dispatch(addUser(res.data));
  //     navigate("/");
  //   } catch (err) {
  //     setError(err?.response?.data || "something went wrong");
  //     console.log(err);
  //   }
  // };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          name,
          email,
          mobile,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "something went wrong");
      console.log(err);
    }
  };
  return (
    <div className="flex justify-between ml-0 items-center mr-0 min-h-screen bg-white">
      <div className="bg-white p-8 w-1/3 px-12">
        <h2 className="w-[391px] h-[58px] absolute top-[65px] left-[50px] font-dm-sans font-bold text-[40px] leading-[57.61px] text-center">
          Create an account
        </h2>
        <p className="w-[325px] h-[30px] absolute top-[115px] left-[50px] font-dm-sans font-medium text-[21px] leading-[30.24px] text-center text-[#525252] p-2 rounded-md">
          Your personal job finder is here
        </p>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-[590px] h-[50px] pl-6 absolute top-[175px] left-[60px] rounded-[5px] border-2 border-[#C2C2C2] bg-white px-4 text-gray-700"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[590px] h-[50px] pl-6 absolute top-[245px] left-[60px] rounded-[5px] border-2 border-[#C2C2C2] bg-white px-4 text-gray-700"
        />

        <input
          type="number"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-[590px] h-[50px] absolute top-[315px] left-[60px] rounded-[5px] border-2 border-[#C2C2C2] bg-white px-4 text-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[590px] h-[50px] absolute top-[385px] left-[60px] rounded-[5px] border-2 border-[#C2C2C2] bg-white px-4 text-gray-700"
        />

        <p className="text-red-500 w-[610px] absolute top-[150px] left-[60px] text-sm">
          {error}
        </p>
        <div className="">
          <div className="w-[530px] h-[24px] top-[620px] left-[125px]">
            <input
              type="checkbox"
              id="terms"
              className="w-3 h-3 mt-[330px] ml-3 accent-blue-600 cursor-pointer"
            />
            <label htmlFor="terms" className="ml-2  text-sm text-gray-700">
              By creating an account, I agree to our Terms of Use and Privacy
              Policy .
            </label>
          </div>
          <div>
            <button
              onClick={handleSignUp}
              className="w-[200px] h-[52px] absolute top-[490px] left-[60px] rounded-[5px] bg-[#ED5353] text-white font-semibold"
            >
              Create Account
            </button>
          </div>
          <div className="mt-[410px] ml-3">
            <p className="text-sm w-[838px] top-[225px] mt-[390px] text-gray-700 inline">
              Already have an account?
            </p>

            <p
              className="text-sm w-[404px] top-[195px] mt-[0px] mr-48 text-blue-700 underline cursor-pointer inline"
              onClick={() => navigate("/login")}
            >
              Sign In
            </p>
          </div>
        </div>
      </div>
      <div>
        <img
          className="w-[696.47px] h-[680px] left-[816px]"
          src="/assets/image.png"
          alt="img"
        />
      </div>
    </div>
  );
};

export default Login;
