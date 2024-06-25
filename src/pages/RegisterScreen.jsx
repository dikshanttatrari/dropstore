import React, { useEffect, useState } from "react";
import Avatar from "../assets/images/avatar.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoMailOpen } from "react-icons/io5";
import { MdPassword } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import imgToBase64 from "../helper/imgToBase64";

function RegisterScreen() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          navigate("/");
        }
      } catch (err) {
        console.log("Login error", err);
      }
    };
    checkLoginStatus();
  }, [navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imgToBase64(file);
    setData((prev) => ({ ...prev, profilePic: imagePic }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://api.drop-store.me/register", data);
      toast.success(
        "Registration successful! Please check your email to verify your account."
      );
      navigate("/registered-successfully");
    } catch (err) {
      console.log("Error registering user", err?.response?.data?.message);
      toast.error(
        err?.response?.data?.message || "Image size should be less than 1MB"
      );
    }
  };

  return (
    <section id="register">
      <div className="mx-auto container px-4 pt-5 mb-10">
        <div className="bg-[#e28854] p-2 w-full max-w-md mx-auto rounded-lg mt-5">
          <div className="relative overflow-hidden rounded-full">
            <div>
              <img
                src={data?.profilePic || Avatar}
                className=" w-20 h-20 mx-auto rounded-full"
              />
            </div>
            <form>
              <label>
                <div className="flex items-center justify-center cursor-pointer mt-5">
                  <p className="text-sm bg-white text-[#e28854] font-semibold p-1 absolute rounded-md bottom-0 bg-opacity-75">
                    Upload image
                  </p>
                </div>
                <input
                  type="file"
                  className="absolute bottom-0 left-28 hidden"
                  onChange={handleUpload}
                />
              </label>
            </form>
          </div>
          <div>
            <h1 className="text-center mt-2 text-white font-semibold text-xl">
              Create your account now.
            </h1>
          </div>
          <form className="flex flex-col" onSubmit={handleRegister}>
            <div className="rounded-lg mt-3 grid">
              <label className="text-white font-semibold">Name: </label>
              <div className="flex flex-row items-center bg-white rounded-lg">
                <IoMdPerson color="gray" className="ml-2 text-xl" />
                <input
                  required
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  placeholder="Enter your name.."
                  type="text"
                  className="rounded-lg pt-2 pl-2 pb-2 w-full h-full outline-none text-black"
                />
              </div>
            </div>
            <div className="rounded-lg mt-3 grid">
              <label className="text-white font-semibold">E-mail: </label>
              <div className="flex flex-row items-center bg-white rounded-lg">
                <IoMailOpen color="gray" className="ml-2 text-xl" />
                <input
                  required
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  placeholder="Enter your email.."
                  type="email"
                  className="rounded-lg pt-2 pl-2 pb-2 w-full h-full outline-none text-black"
                />
              </div>
            </div>
            <div className="rounded-lg mt-2 grid">
              <label className="text-white font-semibold">Password: </label>
              <div className="flex p-2 bg-white rounded-lg items-center">
                <MdPassword color="gray" className="mr-2 text-xl" />
                <input
                  required
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  placeholder="Enter your password.."
                  type={showPassword ? "text" : "password"}
                  className="rounded-lg w-full h-full outline-none text-black"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>
                    {showPassword ? (
                      <FaRegEyeSlash size={22} color="black" />
                    ) : (
                      <FaRegEye size={22} color="black" />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#e23854] text-white px-6 py-2 rounded-lg w-full max-w-[150px] hover:scale-125 mx-auto block mt-6 mb-4"
            >
              Register
            </button>
          </form>
          <p className="mx-auto text-center my-3 font-semibold">
            Already have an account?{" "}
            <Link className="font-semibold hover:text-[#e23854]" to={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterScreen;
