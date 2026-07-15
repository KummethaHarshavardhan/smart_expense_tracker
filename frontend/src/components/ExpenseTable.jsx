import { Link } from "react-router-dom";

function ExpenseTable({ expenses = [], onDelete }) {
  return (
    <div className="expense-table-container">

      <table className="expense-table">

        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {expenses.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                No expenses found.
              </td>
            </tr>
          ) : (
            expenses.map((expense) => (
              <tr key={expense.id}>

                <td>
                  <strong>{expense.title}</strong>
                </td>

                <td>
                  <span
                    className={`category-badge ${expense.category
                      ?.toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    {expense.category}
                  </span>
                </td>

                <td className="amount">
                  ₹{Number(expense.amount).toLocaleString("en-IN")}
                </td>

                <td>{expense.date}</td>

                <td className="description">
                  {expense.description || "-"}
                </td>

                <td className="action-buttons">

                  <Link to={`/edit-expense/${expense.id}`}>
                    <button className="edit-btn">
                      ✏ Edit
                    </button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(expense.id)}
                  >
                    🗑 Delete
                  </button>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default ExpenseTable;