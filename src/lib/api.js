const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://sourcecode-backend-rxvt.onrender.com";
console.log("API_BASE is", API_BASE); // debug: show which backend URL is in use

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
  // `id` here is product_id, not order id; backend will look up your paid order
  download: (token, productId) => api(`/api/download?productId=${productId}`, { token }),
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
  // Product + Upload (one-step)
  createProductWithUpload: (adminKey, formData) => api("/api/admin/products/create-with-upload", { method: "POST", body: formData, adminKey, isFormData: true }),
  updateProductWithUpload: (adminKey, id, formData) => api(`/api/admin/products/${id}/update-with-upload`, { method: "PUT", body: formData, adminKey, isFormData: true }),
  // Reviews
  getReviews: (adminKey) => api("/api/admin/reviews", { adminKey }),
  deleteReview: (adminKey, id) => api(`/api/admin/reviews/${id}`, { method: "DELETE", adminKey }),
  // Coupons
  getCoupons: (adminKey) => api("/api/admin/coupons", { adminKey }),
  createCoupon: (adminKey, body) => api("/api/admin/coupons", { method: "POST", body, adminKey }),
  deleteCoupon: (adminKey, id) => api(`/api/admin/coupons/${id}`, { method: "DELETE", adminKey }),
  toggleCoupon: (adminKey, id, active) => api(`/api/admin/coupons/${id}/toggle`, { method: "PATCH", body: { active }, adminKey }),
  // Refunds
  getRefunds: (adminKey) => api("/api/admin/refunds", { adminKey }),
  createRefund: (adminKey, body) => api("/api/admin/refunds", { method: "POST", body, adminKey }),
  updateRefund: (adminKey, id, status) => api(`/api/admin/refunds/${id}`, { method: "PATCH", body: { status }, adminKey }),
  // Support Tickets
  getTickets: (adminKey) => api("/api/admin/tickets", { adminKey }),
  updateTicketStatus: (adminKey, id, status) => api(`/api/admin/tickets/${id}/status`, { method: "PATCH", body: { status }, adminKey }),
  replyToTicket: (adminKey, id, reply) => api(`/api/admin/tickets/${id}/reply`, { method: "PATCH", body: { reply }, adminKey }),
  // Activity Logs
  getActivityLogs: (adminKey, limit) => api(`/api/admin/activity-logs${limit ? `?limit=${limit}` : ""}`, { adminKey }),
  // Download Logs
  getDownloadLogs: (adminKey, limit) => api(`/api/admin/download-logs${limit ? `?limit=${limit}` : ""}`, { adminKey }),
  // Settings
  getSettings: (adminKey, prefix) => api(`/api/admin/settings${prefix ? `?prefix=${prefix}` : ""}`, { adminKey }),
  updateSettings: (adminKey, body) => api("/api/admin/settings", { method: "PUT", body, adminKey }),
  // Admin Profile
  getProfile: (adminKey) => api("/api/admin/profile", { adminKey }),
  updateProfile: (adminKey, body) => api("/api/admin/profile", { method: "PUT", body, adminKey }),
  changePassword: (adminKey, body) => api("/api/admin/change-password", { method: "POST", body, adminKey }),
};

// user support API
export const supportAPI = {
  getTickets: (token) => api("/api/support", { token }),
  getTicket: (token, id) => api(`/api/support/${id}`, { token }),
  createTicket: (token, body) => api("/api/support", { method: "POST", body, token }),
  // public contact form (no auth needed)
  contact: (body) => api("/api/support/contact", { method: "POST", body }),
};
