import React, { useState } from "react";
import registeredAnimation from "../assets/registered-successfully.json";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RegisteredSuccessfully() {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleVerifyOTP = async () => {
    setIsVerifying(true);
    try {
      const response = await fetch(`http://192.168.1.13:8080/verify/${otp}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.message === "OTP Verified") {
        navigate("/login");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error verifying OTP");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOnChange = (e) => {
    setOtp(e.target.value);
  };

  const handleResendOTP = async () => {
    const response = await fetch("http://192.168.1.13:8080/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.message === "OTP Sent") {
      toast.success("OTP Sent Successfully");
    } else {
      toast.error("Error sending OTP");
    }
  };

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
          Thank you for registering with us. Please check your email address for
          a 6 digit OTP to verify your account.
        </p>

        <div className="mx-auto flex items-center justify-center mt-4 flex-col">
          <input
            maxLength={6}
            name="otp"
            type="text"
            value={otp}
            onChange={handleOnChange}
            className="bg-[#111] w-1/6 mt-4 text-center font-semibold outline-none border-b-2"
            placeholder="000000"
          />
          <button
            onClick={handleResendOTP}
            className="text-[#c88568] font-semibold mt-2"
          >
            Resend OTP
          </button>
          <button
            onClick={handleVerifyOTP}
            className="bg-[#c88568] px-2 rounded-lg py-1 font-semibold mt-5"
            disabled={isVerifying}
          >
            {isVerifying ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisteredSuccessfully;
