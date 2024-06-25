import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://api.drop-store.me/reset-password/${token}`,
        { newPassword: password }
      );
      setMessage(response.data.message);
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      setMessage("Error resetting password. Please try changing browser.");
    }
  };

  return (
    <div className="flex items-center flex-col">
      <h1 className="mt-8 text-lg md:text-2xl text-[#e23856] font-bold">
        Reset Password
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          className="mt-4 px-2 py-1 rounded-lg outline-none text-black"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </form>
      <button
        className=" mt-4 ml-2 bg-[#c88568] px-2 py-1 rounded-lg "
        type="submit"
      >
        Reset Password
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
