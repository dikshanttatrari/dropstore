import React, { useContext, useEffect, useState } from "react";
import { FaCirclePlus, FaCircleMinus, FaReceipt } from "react-icons/fa6";
import { MdDeliveryDining, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { UserContext } from "../../userContext";
import useScrollToTop from "../helper/scrollToTop";
import { Link, useNavigate } from "react-router-dom";
import loadingAnimation from "../assets/loading5.json";
import loadingAnim from "../assets/loading6.json";
import Lottie from "react-lottie";

function CartScreen() {
  const [quantityLoading, setQuantityLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useScrollToTop();
  const [data, setData] = useState([]);
  const { fetchUserCartItems } = useContext(UserContext);
  const [added, setAdded] = useState(false);

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("You must be logged in to clear the cart.");
        return;
      }

      const response = await fetch("http://192.168.1.8:8080/clear-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const dataResponse = await response.json();

      if (response.ok) {
        localStorage.removeItem("cartItems");
        setData([]);
        fetchUserCartItems();
        fetchData();
        toast.success(dataResponse?.message);
      } else {
        toast.error(dataResponse?.message || "Error while clearing the cart.");
      }
    } catch (err) {
      toast.error(err?.message || "Error while clearing the cart.");
    }
  };

  const fetchData = async () => {
    const response = await fetch("http://192.168.1.8:8080/user-cart", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    setLoading(false);
    const data = await response.json();
    if (response.ok) {
      setData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemoveFromCart = async (productId, e) => {
    e?.stopPropagation();
    e?.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("You must be logged in to remove products from the cart.");
        return;
      }

      const response = await fetch("http://192.168.1.8:8080/remove-from-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const dataResponse = await response.json();

      if (response.ok) {
        setAdded(false);
        fetchUserCartItems();
        fetchData();
        // toast.success(dataResponse?.message);

        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const updatedCartItems = cartItems.filter((id) => id !== productId);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      } else {
        toast.error(dataResponse?.message || "Error while removing from cart.");
      }
    } catch (err) {
      toast.error(err?.message || "Error while removing from cart.");
    }
  };

  const increaseQty = async (productId, qty) => {
    setQuantityLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("You must be logged in to update the cart.");
        return;
      }

      const response = await fetch(
        "http://192.168.1.8:8080/update-cart-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId,
            quantity: qty + 1,
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        fetchData();
      } else {
        toast.error(responseData?.message || "Error updating cart.");
      }
    } catch (err) {
      toast.error(err?.message || "Error updating cart.");
    } finally {
      setQuantityLoading(false);
      fetchData();
    }
  };

  const decreaseQty = async (productId, qty) => {
    setQuantityLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("You must be logged in to update the cart.");
        return;
      }

      if (qty <= 1) {
        // toast.error("Quantity cannot be less than 1.");
        return;
      }

      const response = await fetch(
        "http://192.168.1.8:8080/update-cart-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId,
            quantity: qty - 1,
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        fetchData();
      } else {
        toast.error(responseData?.message || "Error updating cart.");
      }
    } catch (err) {
      toast.error(err?.message || "Error updating cart.");
    } finally {
      setQuantityLoading(false);
      fetchData();
    }
  };

  const Free = "";

  const itemTotal = data.reduce(
    (prev, current) => prev + current?.quantity * current?.productId?.price,
    0
  );
  const deliveryCharge = itemTotal >= 500 ? Free : itemTotal >= 200 ? 15 : 25;

  const grandTotal = itemTotal + deliveryCharge;

  const goToConfirmation = () => {
    if (data?.length === 0) {
      toast.error("Add products to the cart to proceed to checkout.");
      return;
    }
    navigate("/confirmation", {
      state: { itemTotal, deliveryCharge, grandTotal, data },
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center text-lg py-2 my-3 bg-[#333] rounded-lg justify-between">
        <div className="flex items-center">
          <p className="ml-4 font-semibold">My Cart</p>
          <p className="ml-1 text-sm">({data?.length})</p>
        </div>
        <div
          onClick={clearCart}
          className="bg-[#e23856] mr-4 rounded-lg cursor-pointer text-sm font-semibold p-2"
        >
          Clear Cart
        </div>
      </div>
      <div>
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
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8 md:gap-24 mb-6">
            <div className="bg-slate-400 p-2 rounded-lg w-full md:w-2/3 h-full ">
              {data.length === 0 && (
                <p className="text-center text-black font-semibold">
                  No products in the cart
                </p>
              )}
              {data.map((item, index) => {
                return (
                  <Link
                    // to={"/product/" + item?.productId?._id}
                    key={index}
                    className="bg-white flex items-center border-b-2 mb-2 rounded-lg w-full relative"
                  >
                    <div className="h-24 w-24">
                      <img
                        className="h-full w-full object-cover hover:scale-110 p-2"
                        src={item?.productId?.productImage[0]}
                        alt={item?.productId?.brandName}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between p-2">
                      <p className="text-black font-semibold">
                        {item?.productId?.productName}
                      </p>
                      <p className="text-black font-semibold">
                        ₹ {item?.productId?.price}.00
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-between p-2">
                      <div
                        onClick={(e) =>
                          handleRemoveFromCart(item?.productId._id, e)
                        }
                        className="bg-[#e23856] p-1 rounded-full absolute top-0 right-0"
                      >
                        <MdDelete className="text-white text-sm cursor-pointer" />
                      </div>
                      <div className="bg-[#1E88E5] mt-2 flex items-center justify-between rounded-lg w-20 py-1">
                        <FaCircleMinus
                          onClick={() =>
                            decreaseQty(item?.productId?._id, item?.quantity)
                          }
                          className="ml-1 cursor-pointer text-sm"
                        />

                        {quantityLoading ? (
                          <Lottie
                            style={{
                              height: 30,
                              width: 30,
                              alignSelf: "center",
                              justifyContent: "center",
                            }}
                            options={{
                              loop: true,
                              autoplay: true,
                              animationData: loadingAnim,
                              rendererSettings: {
                                preserveAspectRatio: "xMidYMid slice",
                                progressiveLoad: true,
                              },
                            }}
                          />
                        ) : (
                          <p className="font-bold">{item?.quantity}</p>
                        )}
                        <FaCirclePlus
                          onClick={() =>
                            increaseQty(item?.productId?._id, item?.quantity)
                          }
                          className="mr-1 cursor-pointer text-sm"
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="bg-slate-400 p-2 rounded-lg w-full md:h-1/3 md:w-1/3 flex-shrink-0 md:mt-12">
              <div className="flex flex-col">
                <p className="font-bold text-black text-lg">Bill Details</p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <FaReceipt className="text-black text-xs" />
                    <p className="text-black text-sm font-semibold">
                      Items Total:
                    </p>
                  </div>
                  <div className="mr-4">
                    <p className="text-black text-sm font-semibold">
                      ₹ {itemTotal}.00
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <MdDeliveryDining className="text-black text-sm" />
                    <p className="text-black text-sm font-semibold">
                      Delivery Charge:
                    </p>
                  </div>
                  <div className="mr-4">
                    {deliveryCharge === Free ? (
                      <p className="text-white text-sm font-semibold">Free</p>
                    ) : (
                      <p className="text-white text-sm font-semibold">
                        ₹ {deliveryCharge}.00
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-black text-sm font-semibold">
                    Grand Total:
                  </p>

                  <div className="mr-4">
                    <p className="text-red-700 text-lg font-bold">
                      ₹ {grandTotal}.00
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-center">
                  <p className="text-sm text-green-700 font-semibold ">
                    Free Delivery on order above ₹500
                  </p>
                </div>
              </div>
              <div>
                <button
                  onClick={goToConfirmation}
                  className={
                    data?.length === 0
                      ? "bg-gray-300 text-black text-lg font-semibold w-full py-2 rounded-lg cursor-not-allowed mt-2"
                      : "bg-[#e23856] text-white text-lg font-semibold w-full py-2 rounded-lg mt-2"
                  }
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartScreen;
