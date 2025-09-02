import { useState, useEffect } from 'react'
import axios from '../../utils/axiosConfig';
import { type Course } from '../Context/AuthContext';

interface EditCourseProps {
    setEditCoursePopup: (value: boolean) => void;
    courseToEdit: Course | null;
    onUpdate: () => void;
}

function EditCourse({ setEditCoursePopup, courseToEdit, onUpdate }: EditCourseProps) {
    const [courseName, setCourseName] = useState<string>('');
    const [courseCode, setCourseCode] = useState<number | null>(null);
    const [description, setDescription] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [, setError] = useState<string>('');
    const [, setMessage] = useState<string>('');

    useEffect(() => {
        if (courseToEdit) {
            setCourseName(courseToEdit.course_name || '');
            setCourseCode(courseToEdit.course_code || null);
            setDescription(courseToEdit.description || '');
            setDuration(courseToEdit.duration || '');
        }
    }, [courseToEdit]);

    if (!courseToEdit) return <div>Course not found</div>

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            await axios.put<Course>(`/api/courses/${courseToEdit.id}`, {
                course_name: courseName,
                course_code: courseCode,
                description,
                duration
            });
            setMessage('Course updated successfully');
            setError('');
            if (setEditCoursePopup) {
                setEditCoursePopup(false);
            }
            if (onUpdate) {
                onUpdate();
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Update failed');
            setMessage('');
        }
    };

    return (
        <div className="flex flex-col">
            <h2 className='text-2xl font-medium mb-6 text-center'>Edit Course</h2>
            <div className='flex justify-center gap-4 mb-6'>
                <form onSubmit={handleUpdate} className="space-y-4">
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
                            value={courseCode ?? ''}
                            onChange={(e) => setCourseCode(Number(e.target.value))}
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
                            placeholder='Duration in Hours'
                            onChange={(e) => setDuration(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex justify-center gap-4'>
                        <button
                            type="submit"
                            className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded"
                        >
                            Update Course
                        </button>
                        <button
                            type="button"
                            className="bg-white outline outline-orange-700 hover:bg-gray-300 text-orange-700 px-4 py-2 rounded"
                            onClick={() => setEditCoursePopup(false)}
                        >   
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCourse