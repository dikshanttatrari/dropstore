import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "../userContext";
import { useEffect, useState } from "react";
import useScrollToTop from "./helper/scrollToTop";

function App() {
  useScrollToTop();
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const fetchUserCartItems = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return;
      }

      const response = await fetch("https://api.drop-store.me/cart-count", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setCartItemsCount(data?.cartCount);
      } else {
        console.error("Error Response:", data);
        toast.error(data?.message || "Failed to fetch user cart items.");
      }
    } catch (err) {
      console.error("Error while fetching user cart items", err);
      toast.error(err?.message || "Error while fetching user cart items.");
    }
  };

  useEffect(() => {
    fetchUserCartItems();
  }, []);

  return (
    <UserProvider>
      <ToastContainer position="bottom-left" />
      <Header
        cartCount={cartItemsCount}
        fetchUserCartItems={fetchUserCartItems}
      />
      <main className="min-h-[calc(100vh-260px)] pt-16">
        <Outlet />
      </main>
      <Footer />
    </UserProvider>
  );
}

export default App;
