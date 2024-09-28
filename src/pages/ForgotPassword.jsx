import React, { useState } from "react";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleClick = async () => {
    const response = await fetch(
      "https://nqsiggh7uuup6bryq6kxzjouam0xefid.lambda-url.us-west-1.on.aws/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
    }
  };

  return (
    <div className="flex items-center flex-col mt-8">
      <h1 className="text-xl md:text-2xl text-[#e23856] font-bold">
        Forgot Password
      </h1>

      <p className="mt-4 text-lg font-semibold ">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>

      <input
        className="mt-4 rounded-lg px-2 py-1 outline-none w-[40%] text-black"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleClick}
        className="mt-4 bg-[#c88568] p-2 rounded-lg"
      >
        Reset Password
      </button>
    </div>
  );
}

export default ForgotPassword;
