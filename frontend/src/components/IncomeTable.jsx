import { Link } from "react-router-dom";

function IncomeTable({ incomes = [], onDelete }) {
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

          {incomes.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                No income entries found.
              </td>
            </tr>
          ) : (
            incomes.map((income) => (
              <tr key={income.id}>

                <td>
                  <strong>{income.title}</strong>
                </td>

                <td>
                  <span
                    className={`category-badge ${income.category
                      ?.toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    {income.category}
                  </span>
                </td>

                <td className="amount">
                  ₹{Number(income.amount).toLocaleString("en-IN")}
                </td>

                <td>{income.date}</td>

                <td className="description">
                  {income.description || "-"}
                </td>

                <td className="action-buttons">

                  <Link to={`/edit-income/${income.id}`}>
                    <button className="edit-btn">
                      ✏ Edit
                    </button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(income.id)}
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

export default IncomeTable;
