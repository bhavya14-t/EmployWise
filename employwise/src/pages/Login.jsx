import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
import "../styles/Login.css";

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const validEmail = "eve.holt@reqres.in";
    const validPassword = "cityslicka";

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email and password are required!");
            return;
        }
        
        if (email !== validEmail || password !== validPassword) {
            setError("Invalid email or password. Try again.");
            return;
        }

        try {
            const response = await fetch("https://reqres.in/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token",data.token);
                navigate("/users");
            } else {
                setError("Invalid email or password. Try again.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

return (
    <div className="login-page">
        <div className="login-container">
            <h2> Login </h2>
            {error && <p className="error">{error}
            </p>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email:
                    </label>
                    <input type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:
                    </label>
                    <input type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    </div>
);
};
export default Login;