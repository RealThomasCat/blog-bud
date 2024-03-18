// Authentication layout component
// A mechanism to protect routes from unauthorized access

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  // Assume authentication is true by default
  const navigate = useNavigate();
  const [useLoader, setLoader] = useState(true);

  // Ask the store if user is logged in or not
  const authStatus = useSelector((state) => state.auth.status);

  // Run the effect when authStatus, useNavigate, or authentication changes
  useEffect(() => {
    // TODO: make it more easy to understand

    // Matching prop status with store status and redirecting accordingly
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }

    // Hide the loader
    setLoader(false);
  }, [authStatus, useNavigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>; // Show loader if loader is true else show children
}
