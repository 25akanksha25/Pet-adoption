import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

  // Fetch Users Data
  const fetchUsersData = async () => {
    try {
      // const response = await axios.get("http://localhost:8080/api/Admin/allUsers");

      const response = await axios.get("http://localhost:8080/api/Admin/allUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Users data:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Delete User
  const handleDeleteUser = async (id) => {
    try {
      // await axios.delete(`http://localhost:8080/api/Admin/deleteUser/${id}`);
      await axios.delete(`http://localhost:8080/api/Admin/deleteUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
      // window.location.reload();
      // fetchUsersData(); 
      setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error.response?.data?.msg || error.message);
    }
  };
  

  useEffect(() => {
    fetchUsersData();
  }, []);

  return (
    <div>
    <div>
        <img 
          src="../../assets/users.png"
          alt="Admin Dashboard" 
          style={{ width: '100vw', height: '80vh', marginBottom: '20px' }} 
        />
        {/* <h1>This is the Admin Dashboard and is currently in progress.</h1> */}
      </div>
      <h2 className="text-4xl font-semibold text-gray-800 mb-4 p-10">Users</h2>
      <div className="space-y-4 p-10">
        {users.map((user) => (
          <div key={user._id} className="p-4 bg-white text-lg rounded shadow flex justify-between">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <button
              onClick={() => handleDeleteUser(user._id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
