import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required");
      return;
    }

    try {
      await handleLogin({ email, password });
      toast.success("Login successfull");
      navigate("/");
    } catch (error) {
      toast.error("Log in Failed");
    }
  };

  React.useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  if (!loading && user) {
    return null;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="auth-brand">
          <div className="auth-logo">P</div>
          <h1>Perplexity</h1>
          <p>Where knowledge begins</p>
        </div>

        <div className="auth-subtitle">
          <h2>Welcome Back</h2>
          <p>Log in to your account</p>
        </div>

        <form className="auth-form" onSubmit={submitHandler}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="forgot-password">
            <span>Forgot password?</span>
          </div>

          <button type="submit" className="primary-btn">
            Log In
          </button>
        </form>

        <div className="auth-alt">
          <span>or continue with</span>

          <div className="auth-social-buttons">
            <button
              type="button"
              className="social-btn"
              onClick={() => toast.info("Google login coming soon")}
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="Google"
              />
              Continue with Google
            </button>

            <button
              type="button"
              className="social-btn"
              onClick={() => toast.info("Apple login coming soon")}
            >
              <span className="apple-icon"></span>
              Continue with Apple
            </button>
          </div>
        </div>

        <div className="auth-footer">
          <p>
            Don't have an account?
            <span
              className="login-register-toggle"
              onClick={() => navigate("/register")}
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
