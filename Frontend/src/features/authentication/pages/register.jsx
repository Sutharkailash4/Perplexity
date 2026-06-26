import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();

  const { handleRegister } = useAuth();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const hasLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isPasswordValid = hasLength && hasUppercase && hasNumber;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!fullname.trim()) {
      toast.error("Full name is required");
      return;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    if (!isPasswordValid) {
      toast.error("Password does not meet all security criteria");
      return;
    }

    try {
      await handleRegister({ username: fullname, email, password });
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed");
      console.log(error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="auth-brand">
          <div className="auth-logo">P</div>
          <h1>Perplexity</h1>
          <p>Where knowledge begins</p>
        </div>

        <div className="auth-subtitle">
          <h2>Create Account</h2>
          <p>Join Perplexity today</p>
        </div>

        <form className="auth-form" onSubmit={submitHandler}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />

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
              placeholder="Create password"
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

          <ul className="password-hints">
            <li className={hasLength ? "valid" : "invalid"}>
              {hasLength ? "✓" : "✕"} At least 8 characters
            </li>
            <li className={hasUppercase ? "valid" : "invalid"}>
              {hasUppercase ? "✓" : "✕"} One uppercase letter
            </li>
            <li className={hasNumber ? "valid" : "invalid"}>
              {hasNumber ? "✓" : "✕"} One number
            </li>
          </ul>

          <button type="submit" className="primary-btn">
            Create Account
          </button>
        </form>

        <div className="auth-alt">
          <span>or continue with</span>

          <div className="auth-social-buttons">
            <button
              type="button"
              className="social-btn"
              onClick={() => toast.info("Google signup coming soon")}
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
              onClick={() => toast.info("Apple signup coming soon")}
            >
              <span className="apple-icon"></span>
              Continue with Apple
            </button>
          </div>
        </div>

        <div className="auth-footer">
          <p>
            Already have an account?
            <span
              className="login-register-toggle"
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
