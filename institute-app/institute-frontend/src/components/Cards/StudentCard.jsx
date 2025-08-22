import React, { useState, useEffect } from 'react'
import axios from '../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import EnrollStudent from '../AddCourses/EnrollStudent';
import Modal from '../modal/modal';

function StudentCard() {
    const [courses, setCourses] = useState([]);
    const [openEnrollPopup, setOpenEnrollPopup] = useState(false);
    const [studentID, setStudentID] = useState('');

    useEffect(() => {
        axios.get('/api/students/get-courses', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => setCourses(res.data))
        .catch(err => console.error(err));
    }, []);


    return (
        <div className=''>
            <h2 className='text-center text-2xl sm:text-2xl py-4 font-medium'>Courses Enrolled</h2>
            <div className='overflow-x-auto mb-4'>
                <table className='min-w-full border border-gray-300'>
                    <thead className='bg-gray-300'>
                        <tr>
                            <th className='border px-4 py-2 font-semibold'>Course</th>
                            <th className='border px-3 py-2'>Code</th>
                            <th className='border px-4 py-2'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id} className='hover:bg-gray-200'>
                                <td className='border px-4 py-2 font-semibold'>{course.course_name}</td>
                                <td className='border px-3 py-2'>{course.course_code}</td>
                                <td className='border px-4 py-2'>{course.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-center gap-4'>
                <button
                    className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded-full"
                    onClick={() => setOpenEnrollPopup(true)}
                >
                    Enroll Courses
                </button>
            </div>
            <Modal isOpenState={openEnrollPopup} onClose={() => setOpenEnrollPopup(false)}>
                <EnrollStudent 
                    setOpenEnrollPopup={setOpenEnrollPopup} 
                    studentID={studentID}
                    setStudentID={setStudentID}
                />
            </Modal>
        </div>
    )
}

export default StudentCard
