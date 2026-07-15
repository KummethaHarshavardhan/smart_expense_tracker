import api from "./api";

// Get all expenses for the logged-in user -> GET /api/expenses
// params example: { search: "lunch", category: "Food" }
export const getExpenses = async (params = {}) => {
  const response = await api.get("/expenses", { params });
  return response.data.expenses; // backend returns { expenses, pagination }
};

// Get a single expense (used to prefill the Edit Expense form) -> GET /api/expenses/:id
export const getExpenseById = async (id) => {
  const response = await api.get(`/expenses/${id}`);
  return response.data;
};

// Create a new expense -> POST /api/expenses
export const createExpense = async (expenseData) => {
  const response = await api.post("/expenses", expenseData);
  return response.data;
};

// Update an expense -> PUT /api/expenses/:id
export const updateExpense = async (id, expenseData) => {
  const response = await api.put(`/expenses/${id}`, expenseData);
  return response.data;
};

// Delete an expense -> DELETE /api/expenses/:id
export const deleteExpense = async (id) => {
  const response = await api.delete(`/expenses/${id}`);
  return response.data;
};

// Dashboard summary cards + recent expenses -> GET /api/expenses/dashboard-summary
export const getDashboardSummary = async () => {
  const response = await api.get("/expenses/dashboard-summary");
  return response.data; // { totalIncome, totalExpense, balance, thisMonth, recentExpenses }
};
