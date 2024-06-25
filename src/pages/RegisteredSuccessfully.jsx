import React from "react";
import registeredAnimation from "../assets/registered-successfully.json";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";

function RegisteredSuccessfully() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center mt-2">
      <div>
        <Lottie
          style={{
            height: 300,
            width: 300,
            alignSelf: "center",
            marginTop: 40,
            justifyContent: "center",
          }}
          options={{ animationData: registeredAnimation }}
          autoPlay
          loop={false}
        />
        <h1 className="text-xl md:text-2xl text-[#7CB342] font-semibold ">
          Registered Successfully!!
        </h1>
        <p className="text-lg mt-2">
          Thank you for registering with us. Please verify your email address
          and login to start shopping with us.
        </p>
        <div className="mx-auto flex items-center justify-center mt-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-[#c88568] px-2 rounded-lg py-1 font-semibold"
          >
            Login Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisteredSuccessfully;
