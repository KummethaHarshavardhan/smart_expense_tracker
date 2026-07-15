import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { createExpense } from "../services/expenseService";
import "../styles/expense.css";

function AddExpense() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleAddExpense = async (expenseData) => {
    try {
      await createExpense(expenseData);
      alert("Expense added successfully!");
      navigate("/expenses");
    } catch (err) {
      setError(err?.message || "Failed to add expense");
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-content">
        <Sidebar />

        <main className="dashboard-main">
          {error && <p className="error-text">{error}</p>}

          <ExpenseForm
            buttonText="Add Expense"
            onSubmit={handleAddExpense}
          />
        </main>
      </div>

      <Footer />
    </>
  );
}

export default AddExpense;
