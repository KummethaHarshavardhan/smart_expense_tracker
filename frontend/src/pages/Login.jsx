import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginUser } from "../services/authService";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await loginUser(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Welcome Back 👋</h2>

        <p className="auth-subtitle">
          Login to continue managing your expenses.
        </p>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Email Address</label>

            <div className="input-box">
              <FaEnvelope className="input-icon" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="input-box">
              <FaLock className="input-icon" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  onChange={() => setShowPassword(!showPassword)}
                />
                Show Password
              </label>

              <a href="#">Forgot Password?</a>
            </div>
          </div>

          <button className="btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;