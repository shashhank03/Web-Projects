import React, { useState, useEffect } from 'react'
import axios from '../../utils/axiosConfig';

function EditUser({ setEditUserPopup, userToEdit, onUpdate, isProfileEdit = false }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (userToEdit) {
            setFirstName(userToEdit.first_name || '');
            setLastName(userToEdit.last_name || '');
            setEmail(userToEdit.email || '');
            setPassword(userToEdit.password || '');
            setPhoneNumber(userToEdit.phone_number || '');
            setGender(userToEdit.gender || '');
            setDateOfBirth(userToEdit.date_of_birth?.split('T')[0] || '');
            setRole(userToEdit.role || '');
        }
    }, [userToEdit]);
 
    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        
        try {
            const userId = userToEdit.user_id || userToEdit.id;
            
            if (!userId) {
                console.log('userToEdit object:', userToEdit);
                setError('User ID not found');
                return;
            }
            
            const endpoint = isProfileEdit 
                ? (userToEdit.role === 'Staff' 
                    ? `/api/staff/self/${userId}`
                    : `/api/students/self/${userId}`)
                : (userToEdit.role === 'Staff' 
                    ? `/api/staff/${userId}`
                    : `/api/students/${userId}`);
                
            const res = await axios.put(endpoint, {
                first_name: firstName,
                last_name: lastName,
                email,
                phone_number: phoneNumber,
                gender,
                date_of_birth: dateOfBirth
            });
            setMessage('User updated successfully');
            setError('');
            if (setEditUserPopup) {
                setEditUserPopup(false);
            }
            if (onUpdate) {
                onUpdate();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Update failed');
            setMessage('');
        }
    };

    return (
        <div className='flex flex-col'>
            <h2 className='text-2xl font-medium mb-6 text-center'>Edit User</h2>
            <div className='flex justify-center gap-4 mb-6'>
                <form onSubmit={handleUpdate} className="space-y-4">
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
                        placeholder="Leave blank to keep current password"
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
                        <option value="Student">Student</option>  
                        <option value="Staff">Staff</option>  
                    </select>
                    </div>
                    <div className='flex justify-center gap-4 mb-2'>
                    <button
                        type="submit"
                        className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded"
                    >
                        Update User
                    </button>
                    <button
                        type="button"
                        className="bg-white outline outline-orange-700 hover:bg-gray-300 text-orange-700 px-4 py-2 rounded"
                        onClick={() => setEditUserPopup(false)}
                    >
                        Cancel
                    </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUser
