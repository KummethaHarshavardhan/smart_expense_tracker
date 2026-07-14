import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import "../styles/report.css";

function Analytics() {
	return (
		<div className="dashboard-container">
			<Navbar />

			<div className="dashboard-content">
				<Sidebar />

				<main className="dashboard-main">
					<h2>Analytics</h2>

					<div className="analytics-grid">
						<BarChart />
						<PieChart />
					</div>
				</main>
			</div>

			<Footer />
		</div>
	);
}

export default Analytics;

