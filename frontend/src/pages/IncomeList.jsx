import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IncomeTable from "../components/IncomeTable";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { getIncomes, deleteIncome } from "../services/incomeService";
import "../styles/expense.css";

function IncomeList() {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadIncomes = () => {
    setLoading(true);

    getIncomes({
      search: search || undefined,
      category: category || undefined,
    })
      .then((data) => setIncomes(data))
      .catch((err) => console.error("Failed to load income:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const timeout = setTimeout(loadIncomes, 300);
    return () => clearTimeout(timeout);
  }, [search, category]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this income entry?"
    );

    if (!confirmDelete) return;

    try {
      await deleteIncome(id);

      setIncomes((prev) =>
        prev.filter((income) => income._id !== id)
      );
    } catch (err) {
      alert(err?.message || "Failed to delete income");
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
              <h2>Income Management</h2>
              <p>Manage, search and organize your income sources.</p>
            </div>

            <Link to="/add-income">
              <button>Add Income</button>
            </Link>
          </div>

          <div className="expense-filters">
            <input
              type="text"
              placeholder="🔍 Search income..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Business">Business</option>
              <option value="Investment">Investment</option>
              <option value="Gift">Gift</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {loading ? (
            <Loader />
          ) : incomes.length === 0 ? (
            <div className="empty-expense">
              <h3>No income entries found</h3>
              <p>Try changing your search or add a new income.</p>
            </div>
          ) : (
            <IncomeTable
              incomes={incomes}
              onDelete={handleDelete}
            />
          )}

        </main>
      </div>

      <Footer />
    </>
  );
}

export default IncomeList;