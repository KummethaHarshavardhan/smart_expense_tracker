import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { getProfile } from "../services/authService";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    getProfile()
      .then((data) => {
        if (mounted) setUser(data);
      })
      .catch((err) => {
        if (mounted) setError(err?.message || "Could not load profile");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => (mounted = false);
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard-content">
        <Sidebar />

        <main className="dashboard-main">
          <h2>My Profile</h2>

          {loading && <Loader />}
          {error && <p className="error-text">{error}</p>}

          {user && (
            <div className="profile-card">
              <p>
                <strong>Name:</strong> {user.name}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>Role:</strong> {user.role}
              </p>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
