// frontend/src/auth.js

export const login = async (email, password) => {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  
    if (response.ok) {
      const data = await response.json();
      // Save the JWT token in localStorage
      localStorage.setItem('token', data.token);
      return true; // Login successful
    } else {
      console.error('Login failed');
      return false; // Login failed
    }
  };
  