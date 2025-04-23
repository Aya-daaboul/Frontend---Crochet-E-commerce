import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api'; // Import your API helper
import ratImage from '../assets/ratorange.png';
import '../css/LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    form: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Enhanced validation function
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate on change
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const validateForm = () => {
    const newErrors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password)
    };
    
    setErrors(newErrors);
    
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setErrors(prev => ({
        ...prev,
        form: 'Please fix the errors before submitting'
      }));
      return;
    }
    
    setLoading(true);
    setErrors(prev => ({ ...prev, form: '' }));

    try {
      const response = await api.post('/api/users/login', {
        EmailAddress: formData.email,
        Password: formData.password
      });

      const data = await response.json();

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect to home or previous protected route
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo);

    } catch (error) {
      console.error('Login error:', error);
      setErrors(prev => ({
        ...prev,
        form: error.message || 'Login failed. Please try again.'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <img src={ratImage} alt="Rat Logo" className="logo-image" />
        </div>
        
        <div className="login-content">
          <h1>Welcome Back!</h1>
          <p className="subtitle">Log in to your account</p>
          <p className="instruction">Enter your details below</p>

          {errors.form && <div className="error-message">{errors.form}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                onBlur={(e) => setErrors(prev => ({
                  ...prev,
                  email: validateField('email', e.target.value)
                }))}
                className={errors.email ? 'error' : ''}
                required
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={(e) => setErrors(prev => ({
                  ...prev,
                  password: validateField('password', e.target.value)
                }))}
                className={errors.password ? 'error' : ''}
                required
              />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                <span className="button-loader"></span>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          <a href="/forgot-password" className="forgot-password">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;