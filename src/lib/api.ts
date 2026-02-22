const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://sourcecode-backend-rxvt.onrender.com";

interface ApiOptions {
  method?: string;
  body?: unknown;
  token?: string;
  adminKey?: string;
  isFormData?: boolean;
}

export async function api(endpoint: string, options: ApiOptions = {}) {
  const { method = "GET", body, token, adminKey, isFormData } = options;

  const headers: Record<string, string> = {};
  if (!isFormData) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (adminKey) headers["x-admin-api-key"] = adminKey;

  const config: RequestInit = { method, headers };
  if (body)
    config.body = isFormData ? (body as FormData) : JSON.stringify(body);

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, config);
    return await res.json();
  } catch (err) {
    console.error(`API Error [${method} ${endpoint}]:`, err);
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

// ─── Auth APIs ───
export const authAPI = {
  register: (body: { name: string; email: string; password: string }) =>
    api("/api/auth/register", { method: "POST", body }),
  login: (body: { email: string; password: string }) =>
    api("/api/auth/login", { method: "POST", body }),
  getProfile: (token: string) => api("/api/auth/profile", { token }),
  updateProfile: (token: string, body: Record<string, string>) =>
    api("/api/auth/profile", { method: "PUT", body, token }),
};

// ─── Product APIs (public read, admin write) ───
export const productAPI = {
  getAll: () => api("/api/products"),
  getById: (id: string) => api(`/api/products/${id}`),
  create: (adminKey: string, body: Record<string, unknown>) =>
    api("/api/products", { method: "POST", body, adminKey }),
  update: (adminKey: string, id: string, body: Record<string, unknown>) =>
    api(`/api/products/${id}`, { method: "PUT", body, adminKey }),
  delete: (adminKey: string, id: string) =>
    api(`/api/products/${id}`, { method: "DELETE", adminKey }),
  hardDelete: (adminKey: string, id: string) =>
    api(`/api/products/${id}/permanent`, { method: "DELETE", adminKey }),
  adminAll: (adminKey: string) =>
    api("/api/products/admin/all", { adminKey }),
};

// ─── Order APIs (require auth token) ───
export const orderAPI = {
  create: (
    token: string,
    body: { product_id: string; buyer_email: string }
  ) => api("/api/orders", { method: "POST", body, token }),
  getById: (id: string) => api(`/api/orders/${id}`),
  getByEmail: (token: string, email: string) =>
    api(`/api/orders/email/${email}`, { token }),
  download: (token: string, id: string, email: string) =>
    api(`/api/orders/${id}/download?email=${email}`, { token }),
  adminAll: (adminKey: string) =>
    api("/api/orders/admin/all", { adminKey }),
  adminStats: (adminKey: string) =>
    api("/api/orders/admin/stats", { adminKey }),
};

// ─── Payment APIs (create requires auth) ───
export const paymentAPI = {
  create: (
    token: string,
    body: {
      product_id: string;
      buyer_email: string;
      buyer_name?: string;
      buyer_phone?: string;
    }
  ) => api("/api/payments/create", { method: "POST", body, token }),
  verify: (cashfreeOrderId: string) =>
    api(`/api/payments/verify/${cashfreeOrderId}`),
};

// ─── Admin APIs ───
export const adminAPI = {
  dashboard: (adminKey: string) =>
    api("/api/admin/dashboard", { adminKey }),
  uploadFile: (adminKey: string, formData: FormData) =>
    api("/api/admin/upload", {
      method: "POST",
      body: formData,
      adminKey,
      isFormData: true,
    }),
  listFiles: (adminKey: string) => api("/api/admin/files", { adminKey }),
  deleteFile: (adminKey: string, path: string) =>
    api(`/api/admin/files/${path}`, { method: "DELETE", adminKey }),
  getUsers: (adminKey: string) =>
    api("/api/auth/users", { adminKey }),
};
