// Simple report service with mock data to avoid runtime errors
// Replace with real API calls when backend is available

export const getCategoryBreakdown = async () => {
	// sample data
	return Promise.resolve([
		{ label: "Food", value: 520, color: "#4caf50" },
		{ label: "Transport", value: 180, color: "#2196f3" },
		{ label: "Shopping", value: 300, color: "#ff9800" },
		{ label: "Bills", value: 250, color: "#f44336" },
	]);
};

export const getMonthlyReport = async () => {
	return Promise.resolve([
		{ month: "Jan", amount: 3500 },
		{ month: "Feb", amount: 4200 },
		{ month: "Mar", amount: 5100 },
		{ month: "Apr", amount: 3800 },
		{ month: "May", amount: 4600 },
	]);
};

