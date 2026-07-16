import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { registerUser } from "../services/authService";
import "../styles/login.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      await registerUser(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Create Account</h2>

        <p className="auth-subtitle">
          Create your account to manage your expenses.
        </p>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Full Name</label>

            <div className="input-box">
              <FaUser className="input-icon" />

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email</label>

            <div className="input-box">
              <FaEnvelope className="input-icon" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
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
      placeholder="Minimum 6 characters"
      value={formData.password}
      onChange={handleChange}
      required
    />

    <span
      className="password-toggle"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>

  </div>
</div>

          <div className="input-group">
  <label>Confirm Password</label>

  <div className="input-box">

    <FaLock className="input-icon" />

    <input
      type={showConfirmPassword ? "text" : "password"}
      name="confirmPassword"
      placeholder="Confirm password"
      value={formData.confirmPassword}
      onChange={handleChange}
      required
    />

    <span
      className="password-toggle"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
    >
      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
    </span>

  </div>
</div>

          <button className="btn" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;