import { useState, useEffect } from 'react'
import axios from '../../utils/axiosConfig';

function AdminCard() {
    const [stats, setStats] = useState({
        students: 0,
        staff: 0,
        courses: 0,
        batches: 0
    });
    const [, setBatchDetails] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [studentsRes, staffRes, coursesRes, batchRes] = await Promise.all([
                    axios.get('/api/students'),
                    axios.get('/api/staff'),
                    axios.get('/api/courses'),
                    axios.get('/api/batch')
                ]);
                setStats({
                    students: studentsRes.data.length,
                    staff: staffRes.data.length,
                    courses: coursesRes.data.length,
                    batches: batchRes.data.length
                });
                setBatchDetails(batchRes.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
                setStats({ students: 0, staff: 0, courses: 0, batches: 0 });
                setBatchDetails([]);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className=''>
            <h2 className='text-center text-2xl sm:text-2xl py-4 font-medium'>Overview</h2>
            <div className='grid grid-cols-2 gap-4 mb-4'>
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
                <div className='bg-purple-100 p-4 rounded-lg text-center'>
                    <h3 className='text-lg font-semibold text-purple-800'>Total Batches</h3>
                    <p className='text-2xl font-bold text-purple-600'>{stats.batches}</p>
                </div>
            </div>
        </div>
    );
}

export default AdminCard;
