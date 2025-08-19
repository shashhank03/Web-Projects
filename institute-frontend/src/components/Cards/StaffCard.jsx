import React, { useState, useEffect } from 'react'
import axios from '../../utils/axiosConfig';
import AddInstructer from '../AddCourses/AddInstructer';
import Modal from '../modal/modal';

function StaffCard() {
    const [courses, setCourses] = useState([]);
    const [openInstructerPopup, setOpenInstructerPopup] = useState(false);
    const [staffID, setStaffID] = useState('');
    
    useEffect(() => {
        axios.get('/api/staff/get-courses', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => setCourses(res.data))
        .catch(err => console.error(err));
    }, []);

    return (
        <div className=''>
            <h2 className='text-center text-2xl sm:text-2xl py-4 font-medium'>Courses Instructing</h2>
            <div className='overflow-x-auto mb-4'>
                <table className='min-w-full border border-gray-300'>
                    <thead className='bg-gray-300'>
                        <tr>
                            <th className='border px-4 py-2 font-semibold'>Course</th>
                            <th className='border px-3 py-2'>Course Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id} className='hover:bg-gray-200'>
                                <td className='border px-4 py-2 font-semibold'>{course.course_name}</td>
                                <td className='border px-3 py-2'>{course.course_code}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-center gap-4'>
                <button
                    className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded-full"
                    onClick={() => setOpenInstructerPopup(true)}
                >
                    Add Courses
                </button>
            </div>
            <Modal isOpenState={openInstructerPopup} onClose={() => setOpenInstructerPopup(false)}>
                <AddInstructer 
                    setOpenInstructerPopup={setOpenInstructerPopup}
                    staffID={staffID}
                    setStaffID={setStaffID}
                />
            </Modal>
        </div>
    )
}

export default StaffCard
