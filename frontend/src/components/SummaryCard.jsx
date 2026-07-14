function SummaryCard({ title, amount }) {
  return (
    <div className="summary-card">
      <h4>{title}</h4>
      <h2>{amount}</h2>
    </div>
  );
}

export default SummaryCard;