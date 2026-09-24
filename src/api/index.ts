const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Checks if local MongoDB Express backend server is online.
 */
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
    if (!res.ok) return false;
    const data = await res.json();
    return data.status === 'online';
  } catch (err) {
    return false;
  }
};

/**
 * MongoDB Users API Service
 */
export const apiUsers = {
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/users`);
    return await res.json();
  },
  create: async (userData: any) => {
    const res = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return await res.json();
  },
  update: async (id: string, userData: any) => {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return await res.json();
  }
};

/**
 * MongoDB Shops API Service
 */
export const apiShops = {
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/shops`);
    return await res.json();
  },
  create: async (shopData: any) => {
    const res = await fetch(`${API_BASE_URL}/shops`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shopData)
    });
    return await res.json();
  },
  update: async (id: string, shopData: any) => {
    const res = await fetch(`${API_BASE_URL}/shops/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shopData)
    });
    return await res.json();
  }
};

/**
 * MongoDB Products API Service
 */
export const apiProducts = {
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/products`);
    return await res.json();
  },
  create: async (productData: any) => {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    return await res.json();
  },
  update: async (id: string, productData: any) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    return await res.json();
  },
  delete: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  }
};

/**
 * MongoDB Orders API Service
 */
export const apiOrders = {
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/orders`);
    return await res.json();
  },
  create: async (orderData: any) => {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return await res.json();
  },
  updateStatus: async (id: string, status: string) => {
    const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return await res.json();
  }
};
