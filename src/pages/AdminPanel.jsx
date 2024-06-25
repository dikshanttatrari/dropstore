import React, { useEffect, useState } from "react";
import Avatar from "../assets/images/avatar.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useWindowSize from "../helper/windowSize";

function AdminPanel() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        toast.error("Please log in to access the admin panel");
        return;
      }

      try {
        const response = await axios.get(
          "http://192.168.1.8:8080/user-details",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching user details", error);
      }
    };

    fetchUserDetails();
  }, []);

  const size = useWindowSize();

  useEffect(() => {
    if (user && user?.role !== "admin") {
      navigate("/");
      toast.error("You are not authorized to access this page");
    }
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-120px)] flex bg-[#333]">
      <aside className="bg-[#e28568] w-full min-h-full max-w-60 rounded-br-lg">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center mt-5">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <img
                src={Avatar}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            )}
          </div>
          <p className="capitalize font-semibold text-lg">{user?.name}</p>
          <p className="text-sm uppercase">{user?.role}</p>
        </div>

        <div className="mt-4">
          <nav className="grid p-4">
            <Link
              className="px-2 py-1 hover:bg-red-500 rounded-lg"
              to={"all-users"}
            >
              All Users
            </Link>
            <Link
              className="px-2 py-1 hover:bg-red-500 rounded-lg"
              to={"all-products"}
            >
              All Products
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPanel;
