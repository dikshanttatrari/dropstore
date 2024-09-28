import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import Avatar from "../assets/images/avatar.png";
import moment from "moment";

function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });
  const fetchAllUsers = async () => {
    try {
      const response = await fetch(
        "https://nqsiggh7uuup6bryq6kxzjouam0xefid.lambda-url.us-west-1.on.aws/all-users"
      );
      const data = await response.json();

      if (response.ok) {
        setAllUsers(data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <table className="w-full userTable">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Verified</th>
            <th>Role</th>
            <th>Account Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.profilePic ? item?.profilePic : Avatar}
                    className="ml-4 w-10 h-10 rounded-full"
                  />
                </td>
                <td>{item?.name}</td>
                <td>{item?.email}</td>
                <td>{String(item?.verified)}</td>
                <td>{item?.role}</td>
                <td>
                  {moment(item?.timeStamp).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <td>
                  <button
                    onClick={() => toast.error("This feature is disabled")}
                    // onClick={() => {
                    //   setUpdateUserDetails(item);
                    //   setOpenUpdateRole(true);
                    // }}
                    className="bg-red-100 rounded-full cursor-pointer hover:bg-red-400 p-2"
                  >
                    <MdEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunction={fetchAllUsers}
        />
      )} */}
    </div>
  );
}

export default AllUsers;
