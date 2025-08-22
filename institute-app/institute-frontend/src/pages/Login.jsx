import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');
    setMessage('');
    try {
      const res = await axios.post('/api/users/login', {
        email,
        password
      });

      setMessage('Login successful');
      const { token, user } = res.data;
      login(token, user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setMessage('');
    }
  };

  return (
    <div className="flex justify-center w-full mt-20">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 h-70">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
        <div className='flex items-center space-x-4 mb-4'>
          <label className="block text-sm font-semibold w-32" htmlFor='email'>Email:</label>
          <input
            type="email"
            className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-3 transition-colors duration-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='flex items-center space-x-4 mb-4'>
          <label className="block text-sm font-semibold w-32" htmlFor='password'>Password:</label>
          <input
            type="password"
            className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-3 transition-colors duration-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center items-start space-x-4 mb-4">
        <button
          type="submit"
          className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded"
        >
          Login
        </button>
        <button
          type="cancel"
          className="bg-white outline outline-orange-700 hover:bg-gray-300 text-orange-700 px-4 py-2 rounded"
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Login;
