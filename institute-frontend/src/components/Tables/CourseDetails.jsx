import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import axios from 'axios';
import AddCourse from '../AddCourses/AddCourse';
import Modal from '../modal/modal';

export default function CourseDetails() {
    const [openCoursePopup, setOpenCoursePopup]=useState(false);
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/courses')
          .then(res => setCourses(res.data))
          .catch(err => console.error(err));
      }, []);

    return (
        <>    
        <div className='flex flex-col min-h-screen'>
            <div className='flex justify-between items-center mb-4 mt-8'>
                <div></div>
                <h2 className="text-2xl font-bold">Course Details</h2>
                <button
                    onClick={() => setOpenCoursePopup(true)}
                    className="text-white bg-orange-700 hover:bg-orange-800 rounded-lg px-4 py-3"
                >
                    Add Course
                </button>
            </div>
            {   
                openCoursePopup && 
                <div className='fixed inset-0 bg-gray-400 bg-opacity-10 flex justify-center items-center z-50'>
                    <div className='rounded-lg shadow-xl p-8 bg-white max-w-md w-full mx-4 relative'>
                        <h2 className='text-2xl font-medium mb-6 text-center'>Add Course</h2>
                        <button 
                            className='absolute top-4 right-4 outline outline-red-600 text-red-600 hover:text-white bg-white hover:bg-red-700 font-medium rounded-lg text-sm px-1.5 py-0.9'
                            onClick={() => setOpenCoursePopup(false)}
                        >X
                        </button>
                        <AddCourse/>
                    </div>
                </div>
            }
            <div className='overflow-x-auto'>
                <table className='min-w-full border border-gray-300'>
                    <thead className='bg-gray-300'>
                            <tr>
                                <th className='border px-4 py-2 '>Course Name</th>
                                <th className='border px-4 py-2 '>Course Code</th>
                                <th className='border px-4 py-2 '>Course Description</th>
                                <th className='border px-4 py-2 '>Course Duration</th>
                                <th className='border px-4 py-2 '>Start Date</th>
                                <th className='border px-4 py-2 '>Staff</th>
                                <th className='border px-4 py-2 '>Students</th>
                            </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id} className="hover:bg-gray-200">
                                <td className="border px-4 py-2">{course.course_name}</td>
                                <td className="border px-4 py-2">{course.course_code}</td>
                                <td className="border px-4 py-2">{course.description}</td>
                                <td className="border px-4 py-2">{course.duration}</td>
                                <td className="border px-4 py-2">{course.start_date?.split("T")[0]}</td>
                                <td className="border px-4 py-2">{course.staff_names}</td>
                                <td className="border px-4 py-2">{course.student_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
        <Modal isOpenState={openCoursePopup} onClose={() => setOpenCoursePopup(false)}>
            <AddCourse/>
        </Modal>
        </>
    );
}
