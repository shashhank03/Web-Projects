import React, { useState } from 'react'
import axios from '../../utils/axiosConfig';
import { type Course } from '../Context/AuthContext'

interface AddCourseProps {
    setOpenCoursePopup: (open: boolean) => void;
}

const AddCourse: React.FC<AddCourseProps> = ({ setOpenCoursePopup }) => {
    const [courseName, setCourseName] = useState<string>('');
    const [courseCode, setCourseCode] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [, setError] = useState<string>('');
    const [, setMessage] = useState<string>('');

    const handleAddCourse = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try{
            const res = await axios.post<Course>('/api/courses/add', {
                course_name: courseName,
                course_code: courseCode,
                description,
                duration
            });
            setMessage('Course added successfully');
            setError('');
            console.log(res.data);
            window.location.reload();
            if (setOpenCoursePopup) {
                setOpenCoursePopup(false);
            }
        } catch(err: any){
            setError(err.response?.data?.message || 'Adding course failed');
            setMessage('');
        }
    }
    return (
        <div className="flex flex-col">
            <h2 className='text-2xl font-medium mb-6 text-center'>Add Course</h2>
            <div className='flex justify-center gap-4 mb-6'>
                <form onSubmit={handleAddCourse} className="space-y-4">
                    <div className='flex items-center space-x-4 mb-4'>
                        <label className="block text-sm font-semibold w-32" htmlFor='courseName'>Course Name:</label>
                            <input
                                type="text"
                                className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-5 transition-colors duration-200"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                                required
                            />
                    </div>
                    <div className='flex items-center space-x-4 mb-4'>
                        <label className="block text-sm font-semibold w-32" htmlFor='courseCode'>Course Code:</label>
                            <input
                                type="text"
                                className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-5 transition-colors duration-200"
                                value={courseCode}
                                onChange={(e) => setCourseCode(e.target.value)}
                                required
                            />
                    </div>
                    <div className='flex items-center space-x-4 mb-4'>
                            <label className="block text-sm font-semibold w-32" htmlFor='description'>Description:</label>
                            <textarea
                                className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-5 transition-colors duration-200"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                    </div>
                    <div className='flex items-center space-x-4 mb-4'>
                        <label className="block text-sm font-semibold w-32" htmlFor='duration'>Duration:</label>
                            <input
                                type="number"
                                className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-5 transition-colors duration-200"
                                value={duration}
                                placeholder='Add Duration in Hours'
                                onChange={(e) => setDuration(e.target.value)}
                                required
                            />
                    </div>
                    <div className='flex justify-center gap-4'>
                        <button
                            type="submit"
                            className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded"
                        >
                            Add Course
                        </button>
                        <button
                            type="button"
                            className="bg-white outline outline-orange-700 hover:bg-gray-300 text-orange-700 px-4 py-2 rounded"
                            onClick={() => setOpenCoursePopup(false)}
                        >   
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCourse
