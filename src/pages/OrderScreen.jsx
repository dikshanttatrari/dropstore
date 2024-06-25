import React, { useEffect } from "react";
import Lottie from "react-lottie";
import orderPlaced from "../assets/order-placed.json";
import { useNavigate } from "react-router-dom";

function OrderScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);

  return (
    <div className="flex">
      <Lottie
        style={{
          height: 300,
          width: 300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
        options={{ animationData: orderPlaced }}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </div>
  );
}

export default OrderScreen;
