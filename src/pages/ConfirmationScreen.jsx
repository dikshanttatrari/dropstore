import React, { useContext, useEffect, useState } from "react";
import { FaRegCircle, FaRegDotCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../userContext";
import useRazorpay from "react-razorpay";
import Lottie from "react-lottie";
import loadingAnimation from "../assets/loading3.json";

function ConfirmationScreen() {
  const { fetchUserCartItems } = useContext(UserContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  const [razorpay] = useRazorpay();
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const { itemTotal, grandTotal, data } = location.state || {};

  const Free = "";

  const deliveryCharge = itemTotal >= 500 ? Free : itemTotal >= 200 ? 15 : 25;

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
        fetchUserCartItems();
      } else {
        toast.error(dataResponse?.message || "Error while clearing the cart.");
      }
    } catch (err) {
      toast.error(err?.message || "Error while clearing the cart.");
    }
  };

  const steps = [
    {
      title: "Address",
      content: "Address Form",
    },
    {
      title: "Payment",
      content: "Payment Details",
    },
    {
      title: "Place Order",
      content: "Order Summary",
    },
  ];

  const fetchAddress = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      return;
    }

    const response = await fetch("http://192.168.1.8:8080/get-addresses", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setLoading(false);
    const data = await response.json();

    if (response.ok) {
      setAddresses(data);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const handleSelectClick = (addressId) => {
    setSelectedAddress(addressId);
  };

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch("http://192.168.1.8:8080/order", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address: selectedAddress,
          paymentMethod: selectedOption,
          grandTotal,
          cartItem: data,
        }),
      });

      if (response.ok) {
        window.history.replaceState({ orderCompleted: true }, "");

        clearCart();
        navigate("/order");
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  const pay = async () => {
    // try {
    //   const options = {
    //     description: "Adding money to wallet",
    //     currency: "INR",
    //     key: "rzp_test_3tx4nHt1Q7N3EA",
    //     amount: grandTotal * 100,
    //     name: "Dropstore",
    //     prefill: {
    //       email: "dropstoredotme@gmail.com",
    //       contact: "9999999999",
    //       name: "Dropstore",
    //     },
    //     theme: { color: "#e23856" },
    //     handler: async function (response) {
    //       const token = localStorage.getItem("authToken");

    //       try {
    //         const dataResponse = await fetch(
    //           "http://192.168.1.8:8080/order",
    //           {
    //             method: "POST",
    //             headers: {
    //               "content-type": "application/json",
    //               Authorization: `Bearer ${token}`,
    //             },
    //             body: JSON.stringify({
    //               address: selectedAddress,
    //               paymentMethod: "card",
    //               grandTotal,
    //               cartItem: data,
    //             }),
    //           }
    //         );

    //         if (dataResponse.ok) {
    //           toast.success("Order placed successfully");
    //           clearCart();
    //           navigate("/order");
    //         } else {
    //           toast.error("Failed to place order");
    //         }
    //       } catch (error) {
    //         console.error("Error placing order:", error);
    //         toast.error("Failed to place order. Please try again.");
    //       }
    //     },
    //     modal: {
    //       ondismiss: function () {
    //         console.log("Checkout form closed");
    //       },
    //     },
    //     debug: true,
    //   };

    //   const rzp = new window.Razorpay(options);

    //   rzp.on("payment.failed", function (response) {
    //     console.error("Payment failed:", response);
    //     toast.error("Payment failed. Please try again.");
    //   });

    //   console.log("Opening Razorpay checkout...");
    //   rzp.open();
    // } catch (err) {
    //   console.error("Error in pay function", err);
    // }
    toast.error("Payment gateway is disabled for now. Please select COD");
  };

  return (
    <div className="container mx-auto mb-4">
      <div>
        <div className="bg-[#333] mt-4 py-2 rounded-lg">
          <h1 className="text-2xl font-bold ml-2">Checkout</h1>
        </div>
        <div className="flex justify-center mt-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center mr-2 gap-3">
              <div
                className={`h-6 w-6 rounded-full ${
                  currentStep >= index ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                <p className="text-md text-center font-semibold">{index + 1}</p>
              </div>

              <div className="text-sm font-semibold">{step.title}</div>
            </div>
          ))}
        </div>
        {currentStep === 0 && (
          <div className="ml-2 mt-6 font-bold text-2xl">
            <h1>Select Delivery Address</h1>
          </div>
        )}

        {currentStep === 0 && (
          <div>
            {loading ? (
              <div>
                <Lottie
                  style={{
                    height: 150,
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
              </div>
            ) : (
              <div>
                <div className="mt-4">
                  {!addresses ||
                    (addresses.length === 0 && (
                      <p className="text-lg md:text-2xl font-semibold mt-8 text-center">
                        No Address found. Please add an address from profile
                        screen
                      </p>
                    ))}

                  {addresses.map((address, index) => (
                    <div key={index} className="bg-[#333] rounded-lg p-2 mt-2">
                      <div className="flex justify-between">
                        <div className="ml-2">
                          <h1 className="text-lg font-semibold">
                            {address.name}
                          </h1>
                          <p className="text-sm">{address?.street}</p>
                          <p className="text-sm">{address?.landmark}</p>
                          <p className="text-sm">{address?.postalCode}</p>
                          <p className="text-sm">{address?.mobileNo}</p>
                        </div>
                        <div className="flex items-center mr-2">
                          {selectedAddress &&
                          selectedAddress?._id === address?._id ? (
                            <button className="bg-[#7CB342] px-2 py-1 rounded-lg">
                              Selected
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSelectClick(address)}
                              className="bg-[#1e85e8] px-2 py-1 rounded-lg"
                            >
                              Select
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-center mt-8">
                        {selectedAddress &&
                          selectedAddress?._id === address?._id && (
                            <button
                              onClick={() => setCurrentStep(1)}
                              className="bg-[#e23856] p-2 rounded-full mb-2 w-full"
                            >
                              Deliver to this address
                            </button>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {currentStep === 1 && (
        <div>
          <div>
            <h1 className="mx-2 my-4 text-2xl font-bold">
              Choose your payment method
            </h1>
          </div>
          <div className="bg-slate-400 p-2 flex gap-2 items-center mx-2 rounded-lg my-2">
            {selectedOption === "cash" ? (
              <FaRegDotCircle className="text-green-800 text-lg" />
            ) : (
              <FaRegCircle
                onClick={() => setSelectedOption("cash")}
                className="text-black text-lg"
              />
            )}

            <p className="text-black font-semibold">Cash on Delivery (COD)</p>
          </div>
          <div className="bg-slate-400 p-2 flex gap-2 items-center mx-2 rounded-lg my-2 mt-4">
            {selectedOption === "card" ? (
              <FaRegDotCircle className="text-green-800 text-lg" />
            ) : (
              <FaRegCircle
                onClick={() => {
                  setSelectedOption("card");
                }}
                className="text-black text-lg"
              />
            )}

            <p className="text-black font-semibold">
              UPI / Credit or Debit card
            </p>
          </div>
          <div className="container flex items-center mt-8">
            {selectedOption ? (
              <button
                onClick={
                  selectedOption === "cash"
                    ? () => setCurrentStep(2)
                    : () => pay()
                }
                className=" bg-[#e23856] px-8 py-2 rounded-full mb-2 mx-auto "
              >
                Continue
              </button>
            ) : (
              <button className=" bg-gray-500 px-8 py-2 rounded-full mb-2 mx-auto cursor-not-allowed">
                Continue
              </button>
            )}
          </div>
        </div>
      )}

      {currentStep === 2 && selectedOption === "cash" && (
        <div>
          <div className="mx-2 my-4 text-2xl font-bold">
            <p>Order Now</p>
          </div>
          <div className="bg-slate-400 mt-4 mx-2 rounded-lg p-2">
            <p className="text-black font-bold text-lg ml-2 mt-2">
              Shipping to {selectedAddress?.name}
            </p>
            <div className="flex items-center justify-between mt-4">
              <p className="text-md  font-semibold ml-2">Items Total:</p>
              <p className="font-semibold text-black text-md mr-2">
                ₹ {itemTotal}.00
              </p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className=" text-md  font-semibold ml-2">Delivery Charge:</p>
              {deliveryCharge === Free ? (
                <p className="text-white text-md font-semibold mr-2">Free</p>
              ) : (
                <p className="text-white text-md font-semibold mr-2">
                  ₹ {deliveryCharge}.00
                </p>
              )}
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-md font-semibold ml-2">Grand Total</p>
              <p className="font-bold text-red-700 text-lg mr-2">
                ₹ {grandTotal}.00
              </p>
            </div>
          </div>
          <div className="bg-slate-400 mt-4 mx-2 rounded-lg p-2">
            <p className="font-semibold text-sm">Payment Method:</p>
            <p className="text-black font-semibold mt-1 mb-1">
              Cash on Delivery (COD)
            </p>
          </div>
          <div className="container flex items-center mt-8">
            <button
              onClick={handlePlaceOrder}
              className=" bg-[#e23856] px-8 py-2 rounded-full mb-2 mx-auto "
            >
              Place your order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmationScreen;
