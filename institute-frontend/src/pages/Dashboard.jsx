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
import AdminStudentCard from '../components/Cards/AdminStudent';
import AdminStaffCard from '../components/Cards/AdminStaffCard';

function Dashboard() {
    
    const { user } = useAuth();
    return (
        <>
        <h1 className='text-center text-2xl sm:text-5xl py-10 font-sans md:font-serif'>{user.role} Dashboard</h1>
        <div className='flex justify-center gap-8 w-full pl-20 pr-20'>
            <div className='flex flex-col gap-6 w-1/2'>
                {user.role === 'Student' && (<div className='max-w-2xl bg-white hover:bg-gray-50 hover:shadow-2xl rounded-2xl h-fit shadow-lg p-8'>
                    <StudentCard />
                </div>)}

                {user.role === 'Staff' && (<div className='max-w-2xl bg-white hover:bg-gray-50 hover:shadow-2xl rounded-2xl h-fit shadow-lg p-8'>
                    <StaffCard />
                </div>)}

                {user.role === 'Admin' && (
                <>
                    <div className='max-w-2xl bg-white hover:bg-gray-50 hover:shadow-2xl rounded-2xl h-fit shadow-lg p-8'>
                    <AdminCard />
                    </div>
                    <div className='max-w-2xl bg-white hover:bg-gray-50 hover:shadow-2xl rounded-2xl h-fit shadow-lg p-8'>
                    <AdminStaffCard />
                    </div>
                </>
                )}
            </div>

            <div className='max-w-2xl w-1/2 bg-white hover:bg-gray-50 hover:shadow-2xl rounded-2xl h-fit shadow-lg p-8'>
                {user.role !== 'Admin' && <AttendanceChart />}
                {user.role === 'Admin' && <AdminStudentCard />}
            </div>
        </div>
        </>
    )
}

export default Dashboard
