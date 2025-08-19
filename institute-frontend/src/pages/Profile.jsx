import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        axios.get('http://localhost:5000/api/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => setUser(res.data))
        .catch(err => console.error(err));
    }, []);
    return (
        <div className='flex mt-15 justify-center w-full items-center'>
            <div className='max-w-2xl w-full bg-white rounded-lg shadow-lg p-8'>
                <h1 className='text-center text-2xl sm:text-5xl py-10 font-medium'>Profile</h1>
                
                <div className='flex justify-center mb-6'>
                    <img 
                        src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" 
                        alt="Profile" 
                        className='w-24 h-24 rounded-full'
                    />
                </div>

                <div className='space-y-4'>
                    <div className='flex justify-between border-b pb-2'>
                        <span className='font-semibold'>Name:</span>
                        <span>{user.full_name}</span>
                    </div>
                    <div className='flex justify-between border-b pb-2'>
                        <span className='font-semibold'>Email:</span>
                        <span>{user.email}</span>
                    </div>
                    <div className='flex justify-between border-b pb-2'>
                        <span className='font-semibold'>Phone:</span>
                        <span>{user.phone_number}</span>
                    </div>
                    <div className='flex justify-between border-b pb-2'>
                        <span className='font-semibold'>Gender:</span>
                        <span>{user.gender}</span>
                    </div>
                    <div className='flex justify-between border-b pb-2'>
                        <span className='font-semibold'>Date of Birth:</span>
                        <span>{user.date_of_birth?.split('T')[0]}</span>
                    </div>
                    <div className='flex justify-between border-b pb-2'>
                        <span className='font-semibold'>Role:</span>
                        <span>{user.role}</span>
                    </div>
                    <div className='flex justify-between border-b pb-2'>
                        <span className='font-semibold'>Address:</span>
                        <span>{user.street}, {user.city}, {user.state} - {user.pin_code}, {user.country}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
