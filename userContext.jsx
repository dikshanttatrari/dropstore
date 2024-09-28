import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const fetchUserCartItems = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(
        "https://nqsiggh7uuup6bryq6kxzjouam0xefid.lambda-url.us-west-1.on.aws/cart-count",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setCartItemsCount(data?.cartCount);
      } else {
        toast.error(data?.message || "Failed to fetch user cart items.");
      }
    } catch (err) {
      toast.error(err?.message || "Error while fetching user cart items.");
    }
  };

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await axios.get(
        "https://nqsiggh7uuup6bryq6kxzjouam0xefid.lambda-url.us-west-1.on.aws/user-details",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  const resetUser = () => {
    setUser(null);
    toast.success("Logged out successfully.");
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserCartItems();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        cartItemsCount,
        resetUser,
        fetchUserDetails,
        fetchUserCartItems,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
