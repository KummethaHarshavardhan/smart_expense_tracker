function BarChart({ data }) {
  const defaultExpenses = [
    { month: "Jan", amount: 3500 },
    { month: "Feb", amount: 4200 },
    { month: "Mar", amount: 5100 },
    { month: "Apr", amount: 3800 },
    { month: "May", amount: 4600 },
  ];

  const expenses = data && data.length ? data : defaultExpenses;

  const maxAmount = Math.max(...expenses.map((item) => item.amount)) || 1;

  return (
    <div className="chart-card">
      <h3>Monthly Expenses</h3>

      <div className="bar-chart">
        {expenses.map((item) => (
          <div key={item.month} className="bar-item">
            <div
              className="bar"
              style={{
                height: `${(item.amount / maxAmount) * 180}px`,
              }}
            ></div>

            <p>{item.month}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BarChart;