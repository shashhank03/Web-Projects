import React, { useState, useEffect } from 'react'
import axios from '../../utils/axiosConfig';
import AddInstructer from '../AddCourses/AddInstructer';
import EnrollStudent from '../AddCourses/EnrollStudent';
import Modal from '../modal/modal';


function AdminCard() {
    const [stats, setStats] = useState({
        students: 0,
        staff: 0,
        courses: 0
        
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [studentsRes, staffRes, coursesRes] = await Promise.all([
                    axios.get('/api/students'),
                    axios.get('/api/staff'),
                    axios.get('/api/courses')
                ]);
                setStats({
                    students: studentsRes.data.length,
                    staff: staffRes.data.length,
                    courses: coursesRes.data.length
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
                setStats({ students: 0, staff: 0, courses: 0 });
            }
        };
        fetchStats();
    }, []);


    return (
        <div className=''>
            <h2 className='text-center text-2xl sm:text-2xl py-4 font-medium'>Admin Dashboard</h2>
            
            <div className='grid grid-cols-2 gap-4 mb-6'>
                <div className='bg-blue-100 p-4 rounded-lg text-center'>
                    <h3 className='text-lg font-semibold text-blue-800'>Total Students</h3>
                    <p className='text-2xl font-bold text-blue-600'>{stats.students}</p>
                </div>
                <div className='bg-green-100 p-4 rounded-lg text-center'>
                    <h3 className='text-lg font-semibold text-green-800'>Total Staff</h3>
                    <p className='text-2xl font-bold text-green-600'>{stats.staff}</p>
                </div>
                <div className='bg-orange-100 p-4 rounded-lg text-center'>
                    <h3 className='text-lg font-semibold text-orange-800'>Total Courses</h3>
                    <p className='text-2xl font-bold text-orange-600'>{stats.courses}</p>
                </div>
            </div>

            <div className='bg-gray-50 p-4 rounded-lg mb-4'>
                <h3 className='text-lg font-semibold mb-3'>Quick Actions</h3>
                <div className='flex flex-col gap-2'>
                    <div className='text-sm text-gray-600'>
                        • Manage users, courses, and enrollments
                    </div>
                    <div className='text-sm text-gray-600'>
                        • View detailed reports and analytics
                    </div>
                    <div className='text-sm text-gray-600'>
                        • Monitor system activity
                    </div>
                </div>
            </div>

            <div className='text-center'>
                <p className='text-sm text-gray-500'>
                </p>
            </div>
        </div>
    )
}

export default AdminCard
