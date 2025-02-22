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
    <div className="navbar flex justify-between items-center w-[1515px] h-[139px] p-8 bg-[#FF6B6B] text-white rounded-br-[62px] rounded-bl-[55px]">
      <div className="navbar-left">
        <Link
          to={"/"}
          className="logo text-xl font-bold cursor-pointer w-[140px] h-[43px]"
        >
          Jobfinder
        </Link>
      </div>
      {!user && <div className="flex gap-4 mt-[44px] absolute left-[1190px]">
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
      </div>}

      {user && (
        <div className="navbar-right flex items-center">
          <ul className="dropdown-menu m-2">
            <li>
              <a
                className="text-xl font-bold cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </a>
            </li>
          </ul>
          <p className="welcome-text m-2 text-xl font-bold">
            Hello! {user?.name}
          </p>

          <div className="dropdown flex items-center m-2 border border-white rounded-full">
            <button className="avatar-btn">
              <img
                alt="user photo"
                src="https://geographyandyou.com/images/user-profile.png"
                className="avatar w-10 h-10 rounded-full"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
