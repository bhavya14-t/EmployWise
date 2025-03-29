// UsersList.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";
import EditUser from "./EditUser";
import "../styles/UsersList.css";

const UsersList = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchUsers(currentPage);
    }
  }, [token, currentPage]);

  const fetchUsers = async (page) => {
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const data = await response.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEdit = (user) => {
    navigate(`/edit-user/${user.id}`, {state: { user } });
  };

  const handleDelete = async (userId) => {
    try {
        const response = await fetch(`https://reqres.in/api/users/${userId}`, {
            method: "DELETE",
        });
        if (response.ok) {
            setUsers(users.filter((user) => user.id !== userId));
            alert("User deleted successfully");
        } else {
            alert ("Failed to delete user");
        }
    } catch (error) {
        console.log("Error deleting user:", error);    
    }
   };

  return (
    <div>
      <Navbar />
      <div className="users-list-container">
        {users.map((user) => (
            <div key={user.id} className="user-card">
          <UserCard user={user} />
           <div className="user-actions">
            <button className="edit-btn" onClick={() => handleEdit(user)}>
                Edit
            </button>
            <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                Delete
            </button>
           </div>
           </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default UsersList;
