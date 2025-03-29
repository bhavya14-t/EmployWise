import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/users" className="logo">EmployWise</Link>
      {token && <button onClick={() => { logout(); navigate("/"); }}>Logout</button>}
    </nav>
  );
};

export default Navbar;
