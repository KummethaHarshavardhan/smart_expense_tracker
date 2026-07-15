import api from "./api";

// Get income list -> GET /api/income
export const getIncomes = async (params = {}) => {
  const response = await api.get("/income", { params });
  return response.data.incomes;
};

// Get single income (for edit form prefill) -> GET /api/income/:id
export const getIncomeById = async (id) => {
  const response = await api.get(`/income/${id}`);
  return response.data;
};

// Create income -> POST /api/income
export const createIncome = async (incomeData) => {
  const response = await api.post("/income", incomeData);
  return response.data;
};

// Update income -> PUT /api/income/:id
export const updateIncome = async (id, incomeData) => {
  const response = await api.put(`/income/${id}`, incomeData);
  return response.data;
};

// Delete income -> DELETE /api/income/:id
export const deleteIncome = async (id) => {
  const response = await api.delete(`/income/${id}`);
  return response.data;
};
