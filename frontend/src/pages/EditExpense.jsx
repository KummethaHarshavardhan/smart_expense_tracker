import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { getExpenseById, updateExpense } from "../services/expenseService";
import "../styles/expense.css";

function EditExpense() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [existingExpense, setExistingExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    getExpenseById(id)
      .then((data) => {
        if (mounted) setExistingExpense(data);
      })
      .catch((err) => {
        if (mounted) {
          setError(err?.message || "Could not load this expense");
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleUpdateExpense = async (updatedExpense) => {
    try {
      await updateExpense(id, updatedExpense);
      alert("Expense updated successfully!");
      navigate("/expenses");
    } catch (err) {
      setError(err?.message || "Failed to update expense");
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-content">
        <Sidebar />

        <main className="dashboard-main">

          <div className="page-header">
            <h2>Edit Expense</h2>
            <p>
              Update your expense information and keep your records accurate.
            </p>
          </div>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          {loading ? (
            <Loader />
          ) : (
            existingExpense && (
              <ExpenseForm
                initialData={existingExpense}
                buttonText="Update Expense"
                onSubmit={handleUpdateExpense}
              />
            )
          )}

        </main>
      </div>

      <Footer />
    </>
  );
}

export default EditExpense;