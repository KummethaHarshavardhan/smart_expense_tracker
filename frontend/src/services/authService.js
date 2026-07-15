import api from "./api";

// Register User -> POST /api/auth/register
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", {
    name: userData.name,
    email: userData.email,
    password: userData.password,
  });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Login User -> POST /api/auth/login
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", {
    email: userData.email,
    password: userData.password,
  });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// Logout User
export const logoutUser = () => {
  localStorage.removeItem("token");
};

// Get Saved Token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Check Login Status
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Get logged-in user's profile -> GET /api/auth/profile
export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

// Update name / email -> PUT /api/auth/profile
export const updateProfile = async (profileData) => {
  const response = await api.put("/auth/profile", profileData);
  return response.data;
};

// Change password -> PUT /api/auth/change-password
export const changePassword = async (currentPassword, newPassword) => {
  const response = await api.put("/auth/change-password", { currentPassword, newPassword });
  return response.data;
};
