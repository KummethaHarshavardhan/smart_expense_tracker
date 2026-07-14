import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import SummaryCard from "../components/SummaryCard";
import "./../styles/dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        <Sidebar />

        <main className="dashboard-main">
          <h2>Dashboard</h2>
          <p>Welcome to Smart Expense Tracker 👋</p>

          <div className="summary-section">
            <SummaryCard title="Total Income" amount="₹0" />
            <SummaryCard title="Total Expense" amount="₹0" />
            <SummaryCard title="Balance" amount="₹0" />
            <SummaryCard title="This Month" amount="₹0" />
          </div>

          <div className="recent-expenses">
            <h3>Recent Expenses</h3>

            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan="4">
                    No expenses available.
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;