import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../services/authService";
import "../styles/profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changing, setChanging] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setUser(data);

      setProfileData({
        name: data.name,
        email: data.email,
      });
    } catch (err) {
      setError(err?.message || "Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setSaving(true);

      await updateProfile(profileData);

      setSuccess("Profile updated successfully.");

      loadProfile();
    } catch (err) {
      setError(err?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const updateUserPassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setChanging(true);

      await changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      setSuccess("Password changed successfully.");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err?.message || "Unable to change password.");
    } finally {
      setChanging(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <div className="dashboard-content">
        <Sidebar />

        <main className="dashboard-main">

          <div className="profile-page">

            <div className="profile-header">

              <div className="profile-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <h2>{user?.name}</h2>

              <p>Manage your personal account information</p>

            </div>

            {error && (
              <div className="profile-error">
                {error}
              </div>
            )}

            {success && (
              <div className="profile-success">
                {success}
              </div>
            )}

            <div className="profile-grid">

              <div className="profile-card">

                <h3>Edit Profile</h3>

                <form onSubmit={saveProfile}>

                  <div className="profile-group">

                    <label>Full Name</label>

                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      required
                    />

                  </div>

                  <div className="profile-group">

                    <label>Email Address</label>

                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      required
                    />

                  </div>

                  <button
                    className="profile-btn"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>

                </form>

              </div>

              <div className="profile-card">

                <h3>Change Password</h3>

                <form onSubmit={updateUserPassword}>

                  <div className="profile-group">

                    <label>Current Password</label>

                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />

                  </div>

                  <div className="profile-group">

                    <label>New Password</label>

                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />

                  </div>

                  <div className="profile-group">

                    <label>Confirm Password</label>

                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />

                  </div>

                  <button
                    className="profile-btn"
                    disabled={changing}
                  >
                    {changing
                      ? "Changing..."
                      : "Change Password"}
                  </button>

                </form>

              </div>

            </div>

          </div>

        </main>

      </div>

      <Footer />
    </>
  );
}

export default Profile;