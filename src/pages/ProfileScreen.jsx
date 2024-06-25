import axios from "axios";
import Avatar from "../assets/images/avatar.png";
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext";
import { toast } from "react-toastify";
import AddAddress from "../components/AddAddress";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import loadingAnimation from "../assets/loading.json";
import Lottie from "react-lottie";

const ProfileScreen = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const { user, resetUser } = useContext(UserContext);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [openAddAddress, setOpenAddAddress] = useState(false);

  const [addressData, setAddressData] = useState({
    name: "",
    street: "",
    landmark: "",
    houseNo: "",
    postalCode: "",
    mobileNo: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    resetUser();
    navigate("/login");
  };

  const fetchOrders = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return;
    }

    const response = await fetch("https://api.drop-store.me/all-orders", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    const orders = data?.orders.reverse();
    setOrders(orders);
  };

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("authToken");
    setToken(token);
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "https://api.drop-store.me/user-details",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data);
    } catch (error) {
      console.log("Error fetching user details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchOrders();
  }, [orders]);

  const addAddress = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login to add address.");
      return;
    }

    if (userData?.addresses?.length >= 5) {
      toast.error("You can add only 5 addresses");
      return;
    }

    try {
      const response = await fetch("https://api.drop-store.me/add-address", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      });

      const data = await response.json();

      if (response.ok) {
        setOpenAddAddress(false);
        // toast.success("Address added successfully.");
        fetchUserDetails();

        setAddressData({
          name: "",
          street: "",
          landmark: "",
          houseNo: "",
          postalCode: "",
          mobileNo: "",
        });
      } else {
        toast.error(data.message || "Error adding address");
      }
    } catch (error) {
      toast.error("Error adding address");
      console.log(error);
    }
  };

  const handleDeleteAddress = async (id) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login to delete address.");
      return;
    }

    const response = await fetch("https://api.drop-store.me/delete-address", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Address deleted successfully.");
      fetchUserDetails();
    }
  };

  return (
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
            options={{ animationData: loadingAnimation }}
            autoPlay
            loop={false}
            speed={0.7}
          />
        </div>
      ) : (
        <div className="flex justify-center mt-2 mb-5 w-full">
          <div className="flex bg-[#e23856] mt-2 rounded-lg p-2 flex-col w-full max-w-screen-lg">
            <div className="flex items-center flex-col justify-center relative">
              {userData?.profilePic ? (
                <img
                  src={userData?.profilePic}
                  className="md:w-24 md:h-24 w-20 h-20 rounded-full"
                />
              ) : (
                <img
                  src={Avatar}
                  className="md:w-24 md:h-24 w-20 h-20 rounded-full"
                />
              )}
            </div>
            <div className="mt-2">
              <h1 className="md:text-xl text-lg text-center font-semibold">
                Hello, {userData?.name || "User"}
              </h1>
            </div>
            <div className="mt-1">
              <h1 className="text-sm text-center">{userData?.email}</h1>
            </div>

            {token && (
              <button
                onClick={handleLogout}
                className="bg-[#c88568] mt-5 mb-5 rounded-lg mx-auto"
              >
                <p className="text-white p-2">Logout</p>
              </button>
            )}

            {!token && (
              <div className="flex flex-col items-center">
                <p className="text-center">
                  Please Login to start shopping with us.
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-[#c88568] p-1 rounded-lg mt-3 text-center mx-auto"
                >
                  <p className="text-center text-md font-semibold px-2 mx-auto">
                    Login
                  </p>
                </button>
              </div>
            )}

            <div className="mt-6 flex justify-between items-center">
              <h1 className="ml-2 font-semibold text-lg">Your Addresses</h1>
              <p
                onClick={() => setOpenAddAddress(true)}
                className="bg-[#1E88E5] p-1 rounded-lg cursor-pointer"
              >
                Add address
              </p>
              {openAddAddress && (
                <AddAddress
                  onClose={() => setOpenAddAddress(false)}
                  onSubmit={addAddress}
                  addressData={addressData}
                  setAddressData={setAddressData}
                />
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              {userData?.addresses?.length === 0 ? (
                <div className="mt-6">
                  <p className="text-center">
                    No addresses found. Please add your address.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-2 mt-4">
                  {userData?.addresses &&
                    userData?.addresses?.map((item, index) => (
                      <div
                        className="bg-white rounded-lg p-2 relative md:w-[50%] "
                        key={index}
                      >
                        <div
                          onClick={() => handleDeleteAddress(item?._id)}
                          className="bg-[#e23856] rounded-full absolute bottom-0 right-0 p-1"
                        >
                          <MdDelete className="text-lg" />
                        </div>
                        <p className="text-black">{item?.name}</p>
                        <p className="text-black">{item?.street}</p>
                        <p className="text-black">{item?.landmark}</p>
                        <p className="text-black">{item?.houseNo}</p>
                        <p className="text-black">{item?.postalCode}</p>
                        <p className="text-black">{item?.mobileNo}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div>
              <div className="mt-4">
                <h1 className="font-semibold text-lg ml-2">Your Orders</h1>
              </div>
              {!orders || orders.length === 0 ? (
                <div className="mt-4 flex items-center justify-center gap-2">
                  <p className="text-lg text-center">No orders found.</p>
                  <p
                    onClick={() => navigate("/")}
                    className="text-[#7CB342] text-lg text-center font-bold cursor-pointer"
                  >
                    Shop Now
                  </p>
                </div>
              ) : (
                <div className="mt-4">
                  {orders?.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="ml-2 bg-[#1e88e5] rounded-lg p-2 flex items-center justify-between">
                          <p className="font-bold">
                            Your {index === 0 ? "latest" : "previous"} orders
                          </p>
                          <p className="text-sm font-bold mr-2">
                            ₹ {item?.totalPrice}.00
                          </p>
                        </div>
                        <div
                          key={index}
                          className="flex flex-col md:grid grid-cols-3 p-3 gap-2 items-center"
                        >
                          {item?.products?.map((product, idx) => {
                            return (
                              <div
                                key={idx}
                                className="flex flex-col items-center justify-between bg-white h-full w-full rounded-lg"
                              >
                                <img
                                  src={product?.image}
                                  alt={product?.name}
                                  className="w-32 h-32 object-cover"
                                />
                                <div className="container mx-auto">
                                  <p className="text-black text-center font-semibold mx-auto w-[70%]">
                                    {product?.name}
                                  </p>
                                  {product?.cancelled ? (
                                    <p className="text-[#e23856] text-center mt-2 text-lg md:text-xl mx-3 font-bold mb-2">
                                      This product is cancelled by the seller.
                                    </p>
                                  ) : (
                                    <div>
                                      <div className="flex items-center justify-between">
                                        <p className="text-gray-400 text-xs ml-4 font-semibold">
                                          Qty: {product?.quantity}
                                        </p>
                                        <p className="text-[#7CB342] text-xs ml-4 font-semibold mr-2">
                                          ₹ {product?.price * product?.quantity}
                                          .00
                                        </p>
                                      </div>
                                      <div className="flex gap-2 mt-2 mb-2 ml-4">
                                        <p className="text-gray-400 text-sm font-semibold">
                                          Delivery Status:
                                        </p>
                                        <p
                                          className={
                                            item?.delivered
                                              ? "text-[#7CB342] text-sm font-semibold"
                                              : "text-[#e23856] text-sm font-semibold"
                                          }
                                        >
                                          {item?.delivered
                                            ? "Delivered"
                                            : "Pending.."}
                                        </p>
                                        {item?.delivered ? (
                                          <p>&#9989;</p>
                                        ) : (
                                          <p></p>
                                        )}
                                      </div>
                                      <div className="flex items-center ml-4 mb-2 gap-2">
                                        <p className="text-gray-400 font-semibold text-sm">
                                          Order on:{" "}
                                        </p>
                                        <p className="text-black text-sm font-semibold">
                                          {moment(item?.timeStamp).format(
                                            "Do MMM YYYY hh:mm a"
                                          )}
                                        </p>
                                      </div>
                                      <div>
                                        {item?.delivered ? (
                                          <p className="text-[#7CB342] text-xs font-semibold text-center mb-2">
                                            Your order was delivered on {""}
                                            {moment(item?.deliveredAt).format(
                                              "Do MMM YYYY hh:mm a"
                                            )}
                                          </p>
                                        ) : (
                                          <p className="text-[#e23856] text-xs font-semibold text-center mb-2">
                                            Your order will be delivered under
                                            24h.
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {userData?.role === "admin" && (
              <div className="w-full">
                <button
                  className="bg-white mt-2 mb-2 p-2 rounded-lg w-full"
                  onClick={() => navigate("/admin-panel")}
                >
                  <p className="text-black">Go To Admin Panel</p>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
