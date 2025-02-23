import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import axios from "axios";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative w-[1512px] h-[139px] bg-[#ED5353] text-white rounded-br-[62px] rounded-bl-[55px] flex justify-between items-center p-8">
      {/* Rectangles for Design */}
      <div
        className="absolute rounded-bl-[55px] top-[76px] left-0 w-[349px] h-[63px] bg-[#FF6B6B]"
        style={{ clipPath: "polygon(0% 100%, 100% 100%, 0% 0%)" }}
      ></div>
      <div
        className="absolute top-0 left-[509px] w-[490px] h-[105px] bg-[#FF6B6B] rounded-b-[30px]"
        style={{
          clipPath: "polygon(100% 100%, 0% 0%, 0% 100%)",
          transform: "rotate(-25deg)",
          transformOrigin: "top left",
        }}
      ></div>
      <div
        className="absolute top-[-13px] left-[1040px] w-[407.5px] h-[166px] bg-[#FF6B6B] rounded-br-[60px] rounded-bl-[160px]"
        style={{
          clipPath: "polygon(0% 20%, 92% 0%, 100% 80%, 14% 100%)",
          transform: "rotate(5deg)",
        }}
      ></div>

      {/* Left Logo */}
      <div className="navbar-left z-10">
        <Link
          to="/"
          className="text-xl font-bold cursor-pointer w-[140px] h-[43px]"
        >
          Jobfinder
        </Link>
      </div>

      {/* Auth Buttons */}
      {!user && (
        <div className="flex gap-4 absolute left-[1190px] z-10">
          <button
            className="w-[113px] h-[46px] border-2 border-white bg-[#FF6B6B] rounded-[7px]"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="w-[113px] h-[46px] rounded-[7px] bg-[#FFFFFF] text-[#ED5353]"
            onClick={() => navigate("/signup")}
          >
            Register
          </button>
        </div>
      )}

      {/* User Dropdown */}
      {user && (
        <div className="flex items-center z-10">
          <ul className="m-2">
            <li>
              <a
                className="text-xl font-bold cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </a>
            </li>
          </ul>
          <p className="m-2 text-xl font-bold">Hello! {user?.name}</p>
          <div className="m-2 border border-white w-[54px] h-[54px] rounded-full overflow-hidden flex items-center justify-center">
            <button>
              <img
                alt="user photo"
                src="https://geographyandyou.com/images/user-profile.png"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
