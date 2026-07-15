import api from "./api";

const CATEGORY_COLORS = [
  "#4caf50",
  "#2196f3",
  "#ff9800",
  "#f44336",
  "#9c27b0",
  "#00bcd4",
  "#795548",
  "#607d8b",
];

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Category-wise Expense Summary
export const getCategoryBreakdown = async () => {
  try {
    const response = await api.get("/expenses/summary");

    return response.data.byCategory.map((category, index) => ({
      label: category._id,
      value: category.total,
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    }));
  } catch (error) {
    console.error("Failed to fetch category summary:", error);
    return [];
  }
};

// Monthly Expense Report
export const getMonthlyReport = async (
  year = new Date().getFullYear()
) => {
  try {
    const response = await api.get("/expenses/monthly-report", {
      params: { year },
    });

    return response.data.months.map((month) => ({
      month: MONTH_NAMES[month.month - 1],
      amount: month.total,
    }));
  } catch (error) {
    console.error("Failed to fetch monthly report:", error);
    return [];
  }
};