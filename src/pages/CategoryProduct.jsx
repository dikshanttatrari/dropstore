import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import loadingAnimation from "../assets/loading5.json";
import Lottie from "react-lottie";
import { FaBullseye } from "react-icons/fa6";

function CategoryProduct() {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.8:8080/category/${category}`
        );

        setProducts(response?.data);
      } catch (error) {
        console.log("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div className="container mx-auto">
      {loading ? (
        <Lottie
          style={{
            height: 200,
            width: 200,
            alignSelf: "center",
            marginTop: 40,
            justifyContent: "center",
          }}
          options={{
            loop: true,
            autoplay: true,
            animationData: loadingAnimation,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
              progressiveLoad: true,
            },
          }}
        />
      ) : (
        <div>
          <div className="bg-[#333] mt-4 rounded-lg p-2">
            <h1 className="capitalize text-2xl font-semibold ml-2">
              {category}
            </h1>
          </div>
          <div className="gridd grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-400 p-3 rounded-lg mt-4 mb-8">
            {products.map((item, index) => {
              return <ProductCard key={index} item={item} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryProduct;
