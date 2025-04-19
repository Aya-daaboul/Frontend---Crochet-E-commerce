// frontend/src/api.js
export const fetchWithToken = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    
    // Default headers
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }), // Only add if token exists
      ...options.headers
    };
  
    try {
      const response = await fetch(url, {
        ...options,
        headers
      });
  
      // Check for unauthorized response (401)
      if (response.status === 401) {
        // Handle token expiration or invalid token
        localStorage.removeItem('token');
        window.location.href = '/login?sessionExpired=true';
        return Promise.reject(new Error('Session expired'));
      }
  
      // Handle other error statuses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return Promise.reject({
          status: response.status,
          message: errorData.message || 'Request failed'
        });
      }
  
      return response;
  
    } catch (error) {
      console.error('API request failed:', error);
      return Promise.reject(error);
    }
  };
  
  // Helper function for common HTTP methods
  export const api = {
    get: (url) => fetchWithToken(url),
    post: (url, body) => fetchWithToken(url, {
      method: 'POST',
      body: JSON.stringify(body)
    }),
    put: (url, body) => fetchWithToken(url, {
      method: 'PUT',
      body: JSON.stringify(body)
    }),
    delete: (url) => fetchWithToken(url, { method: 'DELETE' })
  };