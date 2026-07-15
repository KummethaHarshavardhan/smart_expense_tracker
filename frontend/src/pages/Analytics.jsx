import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import Loader from "../components/Loader";
import {
  getCategoryBreakdown,
  getMonthlyReport,
} from "../services/reportService";
import "../styles/report.css";

function Analytics() {
  const [categories, setCategories] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      const categoryData = await getCategoryBreakdown();
      const monthlyData = await getMonthlyReport();

      setCategories(categoryData || []);
      setMonthly(monthlyData || []);
    } catch (err) {
      console.error("Failed to load analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalExpense = monthly.reduce(
    (sum, item) => sum + (item.amount || item.total || 0),
    0
  );

  const highestExpense =
    monthly.length > 0
      ? Math.max(...monthly.map((item) => item.amount || item.total || 0))
      : 0;

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        <Sidebar />

        <main className="dashboard-main">

          <div className="report-header">
            <div>
              <h2>Expense Analytics</h2>
              <p>Understand your spending patterns with charts.</p>
            </div>

            <button onClick={loadAnalytics}>
              Refresh Data
            </button>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="report-summary">

                <div className="report-card">
                  <h4>Total Expense</h4>
                  <h2>₹{totalExpense.toLocaleString()}</h2>
                </div>

                <div className="report-card">
                  <h4>Total Categories</h4>
                  <h2>{categories.length}</h2>
                </div>

                <div className="report-card">
                  <h4>Highest Monthly Expense</h4>
                  <h2>₹{highestExpense.toLocaleString()}</h2>
                </div>

              </div>

              <div className="analytics-grid">

                <div className="chart-card">
                  <h3>Monthly Expense Trend</h3>
                  <BarChart data={monthly} />
                </div>

                <div className="chart-card">
                  <h3>Category-wise Spending</h3>
                  <PieChart data={categories} />
                </div>

              </div>

            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Analytics;