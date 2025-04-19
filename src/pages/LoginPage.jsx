import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ratImage from '../assets/ratorange.png'; 
import '../css/LoginPage.css'; 

const LoginPage = () => {
  const [formData, setFormData] = useState({
    EmailAddress: '',
    Password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.EmailAddress.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    if (formData.Password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="logo-wrapper">
            <img src={ratImage} alt="Crochet Rat Logo" className="logo" />
          </div>
          
          <div className="login-content">
            <h1>Welcome Back!</h1>
            <p className="subtitle">Log in to your account</p>
            
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="EmailAddress">Email</label>
                <input
                  type="email"
                  id="EmailAddress"
                  name="EmailAddress"
                  value={formData.EmailAddress}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="Password"
                    name="Password"
                    value={formData.Password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? (
                  <span className="button-loader"></span>
                ) : (
                  'Log In'
                )}
              </button>
            </form>

            <div className="footer-links">
              <a href="/forgot-password" className="forgot-password">
                Forgot Password?
              </a>
              <a href="/register" className="register-link">
                Create Account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;