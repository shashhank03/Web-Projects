import React, { useState, useEffect } from 'react'
import axios from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import StudentCard from '../components/Cards/StudentCard';
import StaffCard from '../components/Cards/StaffCard';
import AddAddress from '../components/AddUser/AddAddress';
import EditUser from '../components/AddUser/EditUser';
import Modal from '../components/modal/modal';
import AdminCard from '../components/Cards/AdminCard';
import { useAuth } from '../components/Context/AuthContext';
import AttendanceChart from '../components/Charts/AttendanceChart';

function Dashboard() {
    
    const { user } = useAuth();
    return (
        <>
        <h1 className='text-center text-2xl sm:text-5xl py-10 font-sans md:font-serif'>{user.role} Dashboard</h1>
        <div className='flex justify-center gap-8 w-full pl-20 pr-20'>
            <div className='max-w-2xl w-1/2  bg-white hover:bg-gray-50 hover:shadow-2xl rounded-2xl h-fit shadow-lg p-8'>
                {user.role === 'Student' && <StudentCard />} 
                {user.role === 'Staff' && <StaffCard />} 
                {user.role === 'Admin' && <AdminCard />}
            </div>
            <div className='max-w-2xl w-1/2 bg-white hover:bg-gray-50 hover:shadow-2xl rounded-2xl h-fit shadow-lg p-8'>
                <AttendanceChart />
            </div>
        </div>
        </>
    )
}

export default Dashboard
