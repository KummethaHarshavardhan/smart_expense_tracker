import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import { getCategoryBreakdown, getMonthlyReport } from "../services/reportService";
import "../styles/report.css";

function Analytics() {
  const [categories, setCategories] = useState([]);
  const [monthly, setMonthly] = useState([]);

  useEffect(() => {
    let mounted = true;

    getCategoryBreakdown().then((data) => {
      if (mounted) setCategories(data);
    });

    getMonthlyReport().then((data) => {
      if (mounted) setMonthly(data);
    });

    return () => (mounted = false);
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        <Sidebar />

        <main className="dashboard-main">
          <h2>Analytics</h2>

          <div className="analytics-grid">
            <BarChart data={monthly} />
            <PieChart data={categories} />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Analytics;
