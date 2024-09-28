import React, { useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import loadingAnimation from "../assets/loading3.json";
import Lottie from "react-lottie";

export default function HorizontalSlider({ category, heading }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const goToCategory = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://nqsiggh7uuup6bryq6kxzjouam0xefid.lambda-url.us-west-1.on.aws/horizontal-products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category }),
        }
      );
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (err) {
      console.log("Error Fetching data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 my-6 mt-12 cursor-pointer">
      {loading ? (
        <div className="flex items-center justify-center">
          <Lottie
            style={{
              height: 300,
              width: 300,
              alignSelf: "center",
              marginTop: 40,
              justifyContent: "center",
            }}
            options={{ animationData: loadingAnimation }}
            loop={false}
            speed={0.7}
          />
        </div>
      ) : (
        <div>
          <div className="flex flex-row items-center justify-between">
            <h1 className="md:text-2xl font-bold">{heading}</h1>
            <p
              onClick={() => goToCategory(category)}
              style={{ whiteSpace: "nowrap" }}
              className="md:text-lg text-[#e25876] cursor-pointer"
            >
              See all
            </p>
          </div>
          <div className="relative">
            <button
              className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hidden md:block"
              onClick={scrollLeft}
            >
              <FaChevronLeft className="text-black" />
            </button>
            <div
              ref={sliderRef}
              className="mt-5 flex flex-row gap-5 overflow-x-scroll scrollbar-none"
              style={{
                scrollSnapType: "x mandatory",
                scrollSnapAlign: "start",
              }}
            >
              {data.slice(0, 15).map((item, index) => (
                <ProductCard key={index} item={item} />
              ))}
            </div>
            <button
              className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hidden md:block"
              onClick={scrollRight}
            >
              <FaChevronRight className="text-black" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
