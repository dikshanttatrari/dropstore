import React, { useContext, useEffect, useState } from "react";
import Avatar from "../assets/images/avatar.png";
import logo from "../assets/images/logo.png";
import { LuShoppingCart } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import useWindowSize from "../helper/windowSize";
import { UserContext } from "../../userContext";
import { toast } from "react-toastify";

export default function Header() {
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();
  const { user, cartItemsCount } = useContext(UserContext);
  const navigate = useNavigate();
  const size = useWindowSize();
  const placeholderText =
    size.width <= 425 ? "Search.." : "Search any product...";

  const goToCartPage = () => {
    if (!user?._id) {
      history.push("/login");
      toast.error("Please login to continue.");
      return;
    }
    navigate("/cart");
  };

  const handleSearch = (e) => {
    const { value } = e.target;

    setSearchInput(value);

    if (value) {
      navigate(`/search?q=${value}`);
    }
    if (value.length === 0) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/cart" ||
      location.pathname === "/profile"
    ) {
      setSearchInput("");
    }
  }, [location]);

  return (
    <div className="flex justify-between align-center w-full p-2 bg-[#222] shadow-md container min-w-full fixed z-40">
      <div className="flex items-center" onClick={() => navigate("/")}>
        <img
          src={logo}
          alt="logo"
          className="w-[50px] h-[50px] md:ml-[30px] cursor-pointer"
        />
      </div>
      <div className="bg-[#e28854] text-white w-[50%] rounded-xl items-center flex flex-row">
        <input
          value={searchInput}
          onChange={(e) => handleSearch(e)}
          type="text"
          placeholder={placeholderText}
          className="bg-[#e28854] p-3 rounded-xl search"
          style={{
            outline: "none",
            border: "none",
            width: "100%",
            color: "white",
          }}
        />
        <div
          className="h-full w-16 bg-white text-center items-center flex justify-center"
          style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
        >
          <FiSearch className="mr-0" color="black" size={22} />
        </div>
      </div>
      <div className="flex flex-row items-center text-white gap-5 mr-2 md:mr-40 md:gap-14">
        <div onClick={() => navigate("/profile")} className="cursor-pointer">
          {user?.profilePic ? (
            <img src={user.profilePic} className="w-10 h-10 rounded-full" />
          ) : (
            <img src={Avatar} className="w-10 h-10 rounded-full" />
          )}
        </div>

        <div className="relative">
          {user?._id && (
            <div className="flex items-center justify-center w-5 p-1 h-5 absolute -top-1 -right-2 bg-[#e23856] rounded-full">
              <p className="text-xs font-semibold text-center mx-auto">
                {cartItemsCount}
              </p>
            </div>
          )}
          <div className="bg-[#1E88E5] rounded-full p-1">
            <LuShoppingCart
              className="cursor-pointer p-1"
              onClick={goToCartPage}
              size={26}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
