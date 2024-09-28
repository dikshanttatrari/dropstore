import React, { useContext, useEffect, useState } from "react";
import Logo from "../assets/images/logo.png";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoMailOpen } from "react-icons/io5";
import { MdPassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../userContext";

function LoginScreen() {
  const { fetchUserDetails } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await localStorage.getItem("authToken");
        if (token) {
          navigate("/");
        }
      } catch (err) {
        console.log("Login error", err);
      }
    };
    checkLoginStatus();
  }, []);

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://nqsiggh7uuup6bryq6kxzjouam0xefid.lambda-url.us-west-1.on.aws/login",
        data
      );
      const token = res.data.token;

      localStorage.setItem("authToken", token);
      console.log("token", token);
      toast.success("Login Successfully!");
      await fetchUserDetails();
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container px-4 pt-5 mb-10">
        <div className="bg-[#e28854] p-2 w-full max-w-md mx-auto rounded-lg mt-5">
          <div>
            <img src={Logo} className="w-20 h-20 mx-auto" />
          </div>
          <div>
            <h1 className="text-center mt-2 text-white font-semibold text-xl">
              Login to your account now.
            </h1>
          </div>
          <form className="flex flex-col" onSubmit={handleLogin}>
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
            <div className="rounded-lg mt-2">
              <label className="text-white font-semibold">Password: </label>
              <div className="flex  p-2 bg-white rounded-lg items-center">
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
              <Link
                to={"/forgot-password"}
                className="block text-right mt-3 font-semibold text-[#e23854]"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              onClick={handleLogin}
              className="bg-[#e23854] text-white px-6 py-2 rounded-lg w-full max-w-[150px] hover:scale-125 mx-auto block mt-6 mb-4"
            >
              Login
            </button>
          </form>
          <p className="mx-auto text-center my-3 font-semibold">
            Don't have an account?{" "}
            <Link
              className="font-semibold hover:text-[#e23854]"
              to={"/register"}
            >
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginScreen;
