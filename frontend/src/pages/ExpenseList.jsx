import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExpenseTable from "../components/ExpenseTable";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { getExpenses, deleteExpense } from "../services/expenseService";
import "../styles/expense.css";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadExpenses = () => {
    setLoading(true);

    getExpenses({
      search: search || undefined,
      category: category || undefined,
    })
      .then((data) => setExpenses(data))
      .catch((err) => console.error("Failed to load expenses:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const timeout = setTimeout(loadExpenses, 300);
    return () => clearTimeout(timeout);
  }, [search, category]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {
      await deleteExpense(id);

      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
    } catch (err) {
      alert(err?.message || "Failed to delete expense");
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-content">
        <Sidebar />

        <main className="dashboard-main">
          <div className="expense-page-header">
            <div>
              <h2>Expense Management</h2>
              <p>Manage, search and organize your daily expenses.</p>
            </div>

            <Link to="/add-expense">
              <button>Add Expense</button>
            </Link>
          </div>

          <div className="expense-filters">
            <input
              type="text"
              placeholder="🔍 Search expenses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Bills">Bills</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {loading ? (
            <Loader />
          ) : expenses.length === 0 ? (
            <div className="empty-expense">
              <h3>No expenses found</h3>
              <p>Try changing your search or add a new expense.</p>
            </div>
          ) : (
            <ExpenseTable
              expenses={expenses}
              onDelete={handleDelete}
            />
          )}
        </main>
      </div>

      <Footer />
    </>
  );
}

export default ExpenseList;