import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import PieChart from "../components/PieChart";
import {
  getCategoryBreakdown,
  getMonthlyReport,
} from "../services/reportService";
import "../styles/report.css";

function Reports() {
  const [categories, setCategories] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const categoryData = await getCategoryBreakdown();
        const monthlyData = await getMonthlyReport();

        setCategories(categoryData || []);
        setMonthly(monthlyData || []);
      } catch (err) {
        console.error("Failed to load reports:", err);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
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
            <h2>Expense Reports</h2>
            <p>
              View your spending by category and monthly summary.
            </p>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="report-summary">

                <div className="report-card">
                  <h4>Total Categories</h4>
                  <h2>{categories.length}</h2>
                </div>

                <div className="report-card">
                  <h4>Total Expense</h4>
                  <h2>₹{totalExpense}</h2>
                </div>

                <div className="report-card">
                  <h4>Months Recorded</h4>
                  <h2>{monthly.length}</h2>
                </div>

              </div>

              <div className="reports-grid">

                <div className="chart-card">
                  <h3>Category Distribution</h3>

                  {categories.length ? (
                    <PieChart data={categories} />
                  ) : (
                    <p className="no-data">No category data available.</p>
                  )}
                </div>

                <div className="chart-card">
                  <h3>Monthly Expense Report</h3>

                  <table className="reports-table">
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Amount</th>
                      </tr>
                    </thead>

                    <tbody>
                      {monthly.length ? (
                        monthly.map((item, index) => (
                          <tr key={index}>
                            <td>{item.month}</td>
                            <td>
                              ₹{item.amount || item.total}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2" className="no-data">
                            No monthly report available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

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

export default Reports;