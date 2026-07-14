import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function Profile() {
  return (
    <>
      <Navbar />

      <div className="dashboard-content">
        <Sidebar />

        <main className="dashboard-main">
          <h2>My Profile</h2>

          <div className="profile-card">
            <p>
              <strong>Name:</strong> Demo User
            </p>

            <p>
              <strong>Email:</strong> demo@example.com
            </p>

            <p>
              <strong>Role:</strong> User
            </p>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default Profile;