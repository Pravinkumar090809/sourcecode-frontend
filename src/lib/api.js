const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://sourcecode-backend-rxvt.onrender.com";

export async function api(endpoint, options = {}) {
  const { method = "GET", body, token, adminKey, isFormData } = options;
  const headers = {};
  if (!isFormData) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (adminKey) headers["x-admin-api-key"] = adminKey;

  const config = { method, headers };
  if (body) config.body = isFormData ? body : JSON.stringify(body);

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, config);
    return await res.json();
  } catch (err) {
    console.error(`API Error [${method} ${endpoint}]:`, err);
    return { success: false, message: "Network error. Please check your connection." };
  }
}

export const authAPI = {
  register: (body) => api("/api/auth/register", { method: "POST", body }),
  login: (body) => api("/api/auth/login", { method: "POST", body }),
  getProfile: (token) => api("/api/auth/profile", { token }),
  updateProfile: (token, body) => api("/api/auth/profile", { method: "PUT", body, token }),
};

export const productAPI = {
  getAll: () => api("/api/products"),
  getById: (id) => api(`/api/products/${id}`),
  create: (adminKey, body) => api("/api/products", { method: "POST", body, adminKey }),
  update: (adminKey, id, body) => api(`/api/products/${id}`, { method: "PUT", body, adminKey }),
  delete: (adminKey, id) => api(`/api/products/${id}`, { method: "DELETE", adminKey }),
  hardDelete: (adminKey, id) => api(`/api/products/${id}/permanent`, { method: "DELETE", adminKey }),
  adminAll: (adminKey) => api("/api/products/admin/all", { adminKey }),
};

export const orderAPI = {
  create: (token, body) => api("/api/orders", { method: "POST", body, token }),
  getById: (id) => api(`/api/orders/${id}`),
  getByEmail: (token, email) => api(`/api/orders/email/${email}`, { token }),
  download: (token, id, email) => api(`/api/orders/${id}/download?email=${email}`, { token }),
  adminAll: (adminKey) => api("/api/orders/admin/all", { adminKey }),
  adminStats: (adminKey) => api("/api/orders/admin/stats", { adminKey }),
};

export const paymentAPI = {
  create: (token, body) => api("/api/payments/create", { method: "POST", body, token }),
  verify: (cashfreeOrderId) => api(`/api/payments/verify/${cashfreeOrderId}`),
};

export const adminAPI = {
  dashboard: (adminKey) => api("/api/admin/dashboard", { adminKey }),
  uploadFile: (adminKey, formData) => api("/api/admin/upload", { method: "POST", body: formData, adminKey, isFormData: true }),
  listFiles: (adminKey) => api("/api/admin/files", { adminKey }),
  deleteFile: (adminKey, path) => api(`/api/admin/files/${path}`, { method: "DELETE", adminKey }),
  getUsers: (adminKey) => api("/api/auth/users", { adminKey }),
};
