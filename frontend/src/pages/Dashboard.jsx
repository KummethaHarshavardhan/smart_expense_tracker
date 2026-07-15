import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import SummaryCard from "../components/SummaryCard";
import { getDashboardSummary } from "../services/expenseService";
import "../styles/dashboard.css";

function Dashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    thisMonth: 0,
    recentExpenses: [],
  });

  useEffect(() => {
    let mounted = true;

    getDashboardSummary()
      .then((data) => {
        if (mounted) setSummary(data);
      })
      .catch((err) => console.error("Failed to load dashboard summary:", err));

    return () => (mounted = false);
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        <Sidebar />

        <main className="dashboard-main">
          <h2>Dashboard</h2>
          <p>Welcome to Smart Expense Tracker 👋</p>

          <div className="summary-section">
            <SummaryCard title="Total Income" amount={`₹${summary.totalIncome}`} />
            <SummaryCard title="Total Expense" amount={`₹${summary.totalExpense}`} />
            <SummaryCard title="Balance" amount={`₹${summary.balance}`} />
            <SummaryCard title="This Month" amount={`₹${summary.thisMonth}`} />
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
                {summary.recentExpenses.length === 0 ? (
                  <tr>
                    <td colSpan="4">No expenses available.</td>
                  </tr>
                ) : (
                  summary.recentExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.title}</td>
                      <td>{expense.category}</td>
                      <td>₹{expense.amount}</td>
                      <td>{expense.date}</td>
                    </tr>
                  ))
                )}
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
