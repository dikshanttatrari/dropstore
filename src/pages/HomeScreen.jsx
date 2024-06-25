import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import HorizontalSlider from "../components/HorizontalSlider";

function HomeScreen({ fetchUserCartItems }) {
  useEffect(() => {
    window.history.replaceState({ entryPoint: true }, "");

    const handlePopstate = (event) => {
      if (!event.state || !event.state.entryPoint) {
        if (event.state && event.state.orderCompleted) {
          window.location.href = "https://example.com";
        } else {
          window.location.href = "https://example.com";
        }
      }
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  return (
    <div>
      <Categories />
      <HorizontalSlider
        fetchUserCartItems={fetchUserCartItems}
        category={"snacks & Munchies"}
        heading={"Movie Without Snacks? Grab Now!"}
      />
      <HorizontalSlider
        category={"sweets & Ice cream"}
        heading={"Craving for sweets?"}
      />
      <HorizontalSlider
        category={"personalCare"}
        heading={"Selected products for you!"}
      />
    </div>
  );
}

export default HomeScreen;
