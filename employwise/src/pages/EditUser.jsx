 import React, { useState, useEffect, useContext } from "react"; 
 import { useNavigate, useParams } from "react-router-dom";
 import { AuthContext } from "../components/context/AuthContext";
 import "../styles/EditUser.css";

 const EditUser = () => {
    const  { token } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ first_name: "", last_name:"", email: ""});

    useEffect(() => {
        if (!token) {
            navigate("/");
        } else{
            fetchUser();
        }
    }, [token, id]);
    
    const fetchUser = async() => {
        try {
            const response = await fetch(`https://reqres.in/api/users/${id}`);
            const data = await response.json();
            setUser(data.data);
        }catch (error) {
            console.log("Error fetching user details:", error);        
        }
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value});
    };

    const handleSave = async (e) => {
        try {
            const response = await fetch(`https://reqres.in/api/users/${id}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(user),
            });
            if (response.ok) {
                alert ("User updated successfully!");
                navigate("/users");
            } else {
                alert ("Failed to update user!");
            }
        } catch (error) {
            console.log("Error updating user:", error);
            
        }
    };

    return (
        <div className="edit-user-container">
            <h2> Edit User </h2>
            <input type="text" name="first_name" value={user.first_name} onChange={handleChange} placeholder="First Name" />
            <input type="text" name="last_name" value={user.last_name} onChange={handleChange} placeholder="Last Name" />
            <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />

            <button className="save-btn" onClick={handleSave}> Save </button>

        </div>
    );
 };

 export default EditUser;