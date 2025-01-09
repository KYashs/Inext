import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [emailPhone, setEmailPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email_phone: emailPhone,
        password,
      });
      const { token } = response.data;
  
      // Save token to sessionStorage
      sessionStorage.setItem('token', token);
  
      // Decode the token to extract role
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
  
      // Navigate based on role
      if (role === 'customer') {
        navigate('/home');
      } else if (role === 'admin') {
        navigate('/adminhome');
      } else {
        setError('Unexpected role received. Contact support.');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="emailPhone" className="block text-sm font-medium">
              Email or Phone
            </label>
            <input
              type="text"
              id="emailPhone"
              className="w-full p-2 border border-gray-300 rounded"
              value={emailPhone}
              onChange={(e) => setEmailPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
