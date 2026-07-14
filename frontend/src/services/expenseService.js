import { useNavigate, useParams } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/expense.css";

function EditExpense() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Temporary dummy data
  // Later replace with API call using the id
  const existingExpense = {
    title: "Lunch",
    amount: 250,
    category: "Food",
    date: "2026-07-14",
    description: "Lunch at restaurant",
  };

  const handleUpdateExpense = (updatedExpense) => {
    console.log("Updated Expense:", updatedExpense);

    alert("Expense updated successfully!");

    navigate("/expenses");
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-content">
        <Sidebar />

        <main className="dashboard-main">
          <ExpenseForm
            initialData={existingExpense}
            buttonText="Update Expense"
            onSubmit={handleUpdateExpense}
          />
        </main>
      </div>

      <Footer />
    </>
  );
}

export default EditExpense;