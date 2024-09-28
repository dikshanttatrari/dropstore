import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../userContext";
import loadingAnimation from "../assets/loading3.json";
import Lottie from "react-lottie";

function ProductCard({ item }) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const { fetchUserCartItems } = useContext(UserContext);
  const [added, setAdded] = useState(false);

  const handleRemoveFromCart = async (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    setButtonLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("You must be logged in to remove products from the cart.");
        return;
      }

      const response = await fetch(
        "http://192.168.1.13:8080/remove-from-cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: item?._id }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAdded(false);
        fetchUserCartItems();
        // toast.success(data?.message);

        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const updatedCartItems = cartItems.filter((id) => id !== item?._id);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }
    } catch (err) {
      toast.error(err?.message || "Error while removing from cart.");
    } finally {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (cartItems.includes(item?._id)) {
      setAdded(true);
    }
  }, [item]);

  const addToCart = async (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();
    setButtonLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("You must be logged in to add products to the cart.");
        return;
      }

      const response = await fetch("http://192.168.1.13:8080/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: id, quantity: 1 }),
      });

      const data = await response.json();

      if (response.ok) {
        setAdded(true);
        fetchUserCartItems();
        // toast.success(data?.message);

        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.push(item?._id);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      } else {
        toast.error(data?.message || "Failed to add to cart.");
      }
    } catch (err) {
      toast.error(err?.message || "Error while adding to cart.");
    } finally {
      setButtonLoading(false);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      progressiveLoad: true,
    },
  };

  return (
    <Link
      to={"/product/" + item?._id}
      className="flex flex-col items-center bg-white rounded-lg w-36 justify-between"
    >
      <div className="flex items-center h-32 w-32">
        <img
          src={item?.productImage[0]}
          className="h-full w-full hover:scale-125 md:p-1 p-1 md:hover:scale-125 mix-blend-multiply object-fit"
          alt={item?.productName}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-black text-center font-semibold p-1 line-clamp-3 text-sm">
          {item?.productName}
        </h1>
        <div className="flex flex-row items-center justify-between mt-2">
          <p className="text-black p-1 font-semibold text-xs ml-2 mb-2">
            ₹{item?.price}.00
          </p>
          {buttonLoading ? (
            <Lottie
              options={defaultOptions}
              height={30}
              width={30}
              style={{
                alignSelf: "center",
                justifyContent: "center",
                marginTop: -10,
              }}
            />
          ) : added ? (
            <p
              onClick={(e) => handleRemoveFromCart(e)}
              className="bg-[#e23856] rounded-lg px-2 py-1 text-xs mr-2 mb-2 cursor-pointer"
            >
              REMOVE
            </p>
          ) : (
            <p
              onClick={(e) => addToCart(e, item?._id)}
              className="bg-[#7CB342] rounded-lg p-1 px-3 text-xs mr-2 mb-2 cursor-pointer"
            >
              ADD
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
