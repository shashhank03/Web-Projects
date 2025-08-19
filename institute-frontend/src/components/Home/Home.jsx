import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from '../../utils/axiosConfig';
import { useAuth } from '../Context/AuthContext';

export default function Home() {
    const [stats, setStats] = useState({
        students: 0,
        staff: 0,
        courses: 0
    });
    const { isAuthenticated } = useAuth();

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

        if (isAuthenticated) {
            fetchStats();
        }
    }, [isAuthenticated]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-cover text-white py-30" style={{ backgroundImage: `url('https://hips.hearstapps.com/hmg-prod/images/berry-college-historic-campus-at-twilight-royalty-free-image-1652127954.jpg')` }}>
                <div className="bg-gradient-to-l from-gray-900 to-transparent bg-opacity-40 py-15">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Institute Management System
                        </h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">{stats.students}</div>
                        <h3 className="text-xl font-semibold text-gray-800">Students</h3>
                        <p className="text-gray-600">Total enrolled students</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">{stats.staff}</div>
                        <h3 className="text-xl font-semibold text-gray-800">Staff</h3>
                        <p className="text-gray-600">Teaching & non-teaching staff</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <div className="text-4xl font-bold text-purple-600 mb-2">{stats.courses}</div>
                        <h3 className="text-xl font-semibold text-gray-800">Courses</h3>
                        <p className="text-gray-600">Available courses</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Link to="/students" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow">
                        <div className="flex justify-center text-4xl mb-4">
                            <img src="https://static.thenounproject.com/png/35785-200.png" className="w-25 h-25 " alt="Student" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Student Management</h3>
                        <p className="text-gray-600">Manage student records and enrollment</p>
                    </Link>
                    
                    <Link to="/staff" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow">
                        <div className="flex justify-center text-4xl mb-4">
                            <img src="https://cdn-icons-png.flaticon.com/512/1089/1089129.png" className="w-25 h-25 " alt="Student" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Staff Management</h3>
                        <p className="text-gray-600">Handle staff information, roles, and course assignments</p>
                    </Link>
                    
                    <Link to="/courses" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow">
                        <div className="flex justify-center text-4xl mb-4">
                            <img src="https://cdn-icons-png.flaticon.com/512/5526/5526535.png" className="w-25 h-25 mt-2 " alt="Student" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Course Management</h3>
                        <p className="text-gray-600">Create and manage courses</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}


{/* <div className='flex justify-center gap-4'>
                        <button
                            onClick={() => setOpenStudentPopup(true)}
                            className="text-white bg-orange-700 hover:bg-orange-800 rounded-lg px-4 py-2.5 mb-2"
                        >
                            Edit Details
                        </button>
                        <button
                            onClick={() => setOpenStudentPopup(true)}
                            className="text-white bg-orange-700 hover:bg-orange-800 rounded-lg px-4 py-2.5 mb-2"
                        >
                            Add Address
                        </button>
                    </div> */}
