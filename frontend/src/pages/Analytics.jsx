import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
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
    const loadAnalytics = async () => {
      try {
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

    loadAnalytics();
  }, []);

  const totalExpense = monthly.reduce(
    (sum, item) => sum + (item.amount || item.total || 0),
    0
  );

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        <Sidebar />

        <main className="dashboard-main">

          <div className="page-header">
            <h2>Expense Analytics</h2>
            <p>
              Visualize your spending trends using charts.
            </p>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="report-summary">

                <div className="report-card">
                  <h4>Total Expense</h4>
                  <h2>₹{totalExpense}</h2>
                </div>

                <div className="report-card">
                  <h4>Categories</h4>
                  <h2>{categories.length}</h2>
                </div>

                <div className="report-card">
                  <h4>Monthly Records</h4>
                  <h2>{monthly.length}</h2>
                </div>

              </div>

              <div className="analytics-grid">

                <div className="chart-card">
                  <h3>Monthly Expense Trend</h3>

                  {monthly.length ? (
                    <BarChart data={monthly} />
                  ) : (
                    <p className="no-data">
                      No monthly data available.
                    </p>
                  )}
                </div>

                <div className="chart-card">
                  <h3>Expense by Category</h3>

                  {categories.length ? (
                    <PieChart data={categories} />
                  ) : (
                    <p className="no-data">
                      No category data available.
                    </p>
                  )}
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
