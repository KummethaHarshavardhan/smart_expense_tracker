import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PieChart from "../components/PieChart";
import { getCategoryBreakdown, getMonthlyReport } from "../services/reportService";
import "../styles/report.css";

function Reports() {
	const [categories, setCategories] = useState([]);
	const [monthly, setMonthly] = useState([]);

	useEffect(() => {
		let mounted = true;

		getCategoryBreakdown().then((data) => {
			if (mounted) setCategories(data);
		});

		getMonthlyReport().then((data) => {
			if (mounted) setMonthly(data);
		});

		return () => (mounted = false);
	}, []);

	return (
		<div className="dashboard-container">
			<Navbar />

			<div className="dashboard-content">
				<Sidebar />

				<main className="dashboard-main">
					<h2>Reports</h2>

					<div className="reports-grid">
						<PieChart data={categories} />

						<div className="chart-card">
							<h3>Monthly Summary</h3>

							<table className="reports-table">
								<thead>
									<tr>
										<th>Month</th>
										<th>Amount</th>
									</tr>
								</thead>
								<tbody>
									{monthly.length ? (
										monthly.map((m) => (
											<tr key={m.month}>
												<td>{m.month}</td>
												<td>₹{m.amount}</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan="2">No data available</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</main>
			</div>

			<Footer />
		</div>
	);
}

export default Reports;

