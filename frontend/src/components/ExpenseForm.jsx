import { useState } from "react";

function ExpenseForm({
  initialData = {
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  },
  onSubmit,
  buttonText = "Save Expense",
}) {
  const [expense, setExpense] = useState(initialData);

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !expense.title ||
      !expense.amount ||
      !expense.category ||
      !expense.date
    ) {
      alert("Please fill all required fields.");
      return;
    }

    onSubmit(expense);
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>{buttonText}</h2>

      <div className="form-group">
        <label>Expense Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter expense title"
          value={expense.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Amount</label>
        <input
          type="number"
          name="amount"
          placeholder="Enter amount"
          value={expense.amount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          value={expense.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Bills">Bills</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          rows="4"
          placeholder="Enter description"
          value={expense.description}
          onChange={handleChange}
        />
      </div>

      <button type="submit">
        {buttonText}
      </button>
    </form>
  );
}

export default ExpenseForm;