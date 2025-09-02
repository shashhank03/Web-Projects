import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { type User } from '../components/Context/AuthContext';


interface RegisterResponse {
  token: string;
  user: User;
}


const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName,setLastName] = useState<string>('');
  const [phoneNumber,setPhoneNumber] = useState<string>('');
  const [gender,setGender] = useState<string>('');
  const [dateOfBirth,setDateOfBirth] = useState<string>('');
  const [role,setRole] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const res = await axios.post<RegisterResponse>('/api/users/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        phone_number: phoneNumber,
        gender,
        date_of_birth: dateOfBirth || null,
        role
      });
      setMessage('Registration successful');
      setError('');
      console.log(res.data);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      setMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        
        <div className='flex justify-center gap-4 mb-6'>
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className='flex items-center space-x-4 mb-4'>
            <label className="block text-sm font-semibold w-32" htmlFor='firstName'>First Name:</label>
            <input
              type="text"
              className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-5 transition-colors duration-200"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className='flex items-center space-x-4 mb-4'>
            <label className="block text-sm font-semibold w-32" htmlFor='lastName'>Last Name:</label>
            <input
              type="text"
              className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-5 transition-colors duration-200"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
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
        <div className='flex items-center space-x-4 mb-4'>
          <label className="block text-sm font-semibold w-32" htmlFor='phoneNumber'>Phone Number:</label>
          <input
            type="text"
            className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-3 transition-colors duration-200"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className='flex items-center space-x-4 mb-4'>
          <label className="block text-sm font-semibold w-32" htmlFor='gender'>Gender:</label>
          <select 
            className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-3 transition-colors duration-200"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >  
            <option value="">Select Gender</option>  
            <option value="male">Male</option>  
            <option value="female">Female</option>  
          </select>  
        </div>
        <div className='flex items-center space-x-4 mb-4'>
          <label className="block text-sm font-semibold w-32" htmlFor='dateOfBirth'>Date of Birth:</label>
          <input 
            type="date" 
            className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-3 transition-colors duration-200" 
            value={dateOfBirth} 
            onChange={(e) => setDateOfBirth(e.target.value)} 
            required
          />  
        </div>  
        <div className='flex items-center space-x-4 mb-4'>  
          <label className="block text-sm font-semibold w-32" htmlFor='role'>Role:</label>  
          <select 
            className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-3 transition-colors duration-200" 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Student">Student</option>
          </select>
        </div>
        <div className='flex justify-center gap-4 mb-6'>
          <button
            type="submit"
            className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded"
          >
            Register
          </button>
          <button
            type="button"
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

export default Register;
