import { Link } from "react-router-dom";

function ExpenseCard({ expense, onDelete }) {
  return (
    <div className="expense-card">
      <div className="expense-card-header">
        <h3>{expense.title}</h3>
        <span className="expense-category">
          {expense.category}
        </span>
      </div>

      <div className="expense-card-body">
        <p>
          <strong>Amount:</strong> ₹{expense.amount}
        </p>

        <p>
          <strong>Date:</strong> {expense.date}
        </p>

        <p>
          <strong>Description:</strong> {expense.description}
        </p>
      </div>

      <div className="expense-card-footer">
        <Link to={`/edit-expense/${expense.id}`}>
          <button className="edit-btn">
            Edit
          </button>
        </Link>

        <button
          className="delete-btn"
          onClick={() => onDelete(expense.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseCard;