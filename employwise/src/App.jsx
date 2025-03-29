import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./components/context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import UsersList from "./pages/UsersList";
import "./App.css";
import EditUser from "./pages/EditUser";

 const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/users",
      element: (
        <ProtectedRoute>
          <UsersList />
        </ProtectedRoute>
      ),
    },
    {
      path: "/edit-user/:id",
      element: (
        <ProtectedRoute>
          <EditUser />
        </ProtectedRoute>
      ),
    },
  ]);

  return(
    <AuthProvider>
       <RouterProvider router={router} />;
    </AuthProvider>
  );
 };

export default App;