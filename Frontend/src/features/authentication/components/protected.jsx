import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const initialized = useSelector((state) => state.auth.initialized);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && initialized && !user) {
      navigate("/login");
    }
  }, [loading, initialized, user, navigate]);

  if (!initialized || loading) {
    return (
      <div className="loading-screen">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return children;
};

export default Protected;
