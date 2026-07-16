import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword } from "../services/authService";
import "../styles/forgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      setLoading(true);

      const data = await forgotPassword(email);

      setMessage(data.message || "OTP sent successfully.");
      setStep(2);
    } catch (err) {
      setError(err?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await resetPassword(email, otp, newPassword);

      alert("Password reset successfully.");
      navigate("/login");
    } catch (err) {
      setError(err?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">

        <h1 className="forgot-title">
          Forgot Password
        </h1>

        <p className="forgot-subtitle">
          {step === 1
            ? "Enter your registered email to receive an OTP."
            : "Enter the OTP and create a new password."}
        </p>

        {error && (
          <div className="forgot-error">
            {error}
          </div>
        )}

        {message && (
          <div className="forgot-success">
            {message}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOtp}>

            <div className="forgot-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="forgot-btn"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

          </form>
        ) : (
          <form onSubmit={handleResetPassword}>

            <div className="forgot-group">
              <label>Email Address</label>

              <input
                type="email"
                value={email}
                readOnly
              />
            </div>

            <div className="forgot-group">
              <label>OTP</label>

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <div className="forgot-group">
              <label>New Password</label>

              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="forgot-group">
              <label>Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="forgot-btn"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

          </form>
        )}

        <div className="forgot-footer">
          Remember your password?{" "}
          <Link to="/login">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;