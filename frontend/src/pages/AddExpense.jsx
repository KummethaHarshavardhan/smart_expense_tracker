import { useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/expense.css";

function AddExpense() {
  const navigate = useNavigate();

  const handleAddExpense = (expenseData) => {
    // TODO: Replace with backend API call
    console.log("New Expense:", expenseData);

    alert("Expense added successfully!");

    navigate("/expenses");
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-content">
        <Sidebar />

        <main className="dashboard-main">
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