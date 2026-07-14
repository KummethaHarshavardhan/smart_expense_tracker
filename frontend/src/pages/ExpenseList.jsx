import { useState } from "react";
import { Link } from "react-router-dom";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseCard from "../components/ExpenseCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/expense.css";

function ExpenseList() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: "Lunch",
      category: "Food",
      amount: 250,
      date: "2026-07-14",
      description: "Lunch at restaurant",
    },
    {
      id: 2,
      title: "Bus Ticket",
      category: "Travel",
      amount: 80,
      date: "2026-07-13",
      description: "College to Home",
    },
  ]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "" || expense.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <div className="dashboard-content">
        <Sidebar />

        <main className="dashboard-main">
          <div className="expense-header">
            <h2>Expense Management</h2>

            <Link to="/add-expense">
              <button>Add Expense</button>
            </Link>
          </div>

          <div className="expense-filters">
            <input
              type="text"
              placeholder="Search expense..."
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

          <ExpenseTable
            expenses={filteredExpenses}
            onDelete={handleDelete}
          />

          <div className="expense-card-grid">
            {filteredExpenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default ExpenseList;