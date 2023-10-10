import React, { useState } from 'react';
import { loginUser, registerUser } from './authAPI'; // Import API functions

const Auth = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isLogin, setIsLogin] = useState(true); // Default to login mode

  const [errors, setErrors] = useState({}); // State to hold validation errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};

    // Basic validation example (you can customize this):
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    // Additional validation for registration
    if (!isLogin) {
      if (!formData.username) {
        errors.username = 'Username is required';
      }
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSwitchMode = () => {
    setIsLogin(!isLogin); // Toggle between login and registration mode
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Don't submit if there are validation errors
    }

    try {
      if (isLogin) {
        // Handle login
        const loginResponse = await loginUser(formData);
        // Handle login success/failure
        if (loginResponse.message === 'Login successful') {
          // Redirect or update UI for successful login
        } else {
          // Handle login failure (e.g., display an error message)
        }
      } else {
        // Handle registration
        const registerResponse = await registerUser(formData);
        // Handle registration success/failure
        if (registerResponse.message === 'User registered successfully') {
          // Redirect or update UI for successful registration
        } else {
          // Handle registration failure (e.g., display an error message)
        }
      }
    } catch (error) {
      console.error('Authentication error', error);
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
        )}
        <div>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p onClick={handleSwitchMode}>
        {isLogin ? "Don't have an account? Register here" : 'Already have an account? Login here'}
      </p>
    </div>
  );
};

export default Auth;
