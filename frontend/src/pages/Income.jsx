import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IncomeForm from "../components/IncomeForm";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { createIncome } from "../services/incomeService";
import "../styles/expense.css";

function Income() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleAddIncome = async (incomeData) => {
    try {
      await createIncome(incomeData);
      alert("Income added successfully!");
      navigate("/income");
    } catch (err) {
      setError(err?.message || "Failed to add income");
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-content">
        <Sidebar />

        <main className="dashboard-main">

          <div className="page-header">
            <h2>Add New Income</h2>
            <p>
              Record your income sources to keep an accurate picture of your
              total balance alongside your expenses.
            </p>
          </div>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <IncomeForm
            buttonText="Add Income"
            onSubmit={handleAddIncome}
          />

        </main>
      </div>

      <Footer />
    </>
  );
}

export default Income;
