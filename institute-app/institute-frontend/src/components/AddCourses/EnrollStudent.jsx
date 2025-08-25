import React, { useState, useEffect } from 'react'
import axios from '../../utils/axiosConfig';
import { useAuth } from '../Context/AuthContext';

function EnrollStudent({ setOpenEnrollPopup, studentID, setStudentID }) {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState('');
    const [status, setStatus] = useState('enrolled'); 
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { user } = useAuth();
    const student = students.find(s => s.user_id === user.id);


    useEffect(() => {
        axios.get('/api/students')
          .then(res => setStudents(res.data))
          .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        axios.get('/api/courses')
          .then(res => setCourses(res.data))
          .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (user.role !== 'Admin') {
            setStudentID(user.id || user.user_id);
        }
    }, [user]);

    const handleEnroll = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try{
            const res = await axios.post('/api/students/add-courses', {
                student_id: studentID,
                course_id: selectedCourses,
                status: status
            });
            setMessage('Student enrolled successfully');
            setError('');
            window.location.reload();
            if (setOpenEnrollPopup) {
                setOpenEnrollPopup(false);
            }
        }
        catch(err){
            console.error('Enrollment error:', err);
            setError(err.response?.data?.message || 'Enrollment failed');
            setMessage('');
        }
    }

    return (
        <div className="flex flex-col">
            <h2 className='text-2xl font-medium mb-6 text-center'>Enroll Student</h2>
            <div className='flex justify-center gap-4 mb-6'>
                <form onSubmit={handleEnroll} className="space-y-4">
                    
                    <div className='flex items-center space-x-4 mb-4'>
                        <label className="block text-sm font-semibold w-32" htmlFor='student'>Student:</label>
                        {user.role === 'Admin' ? (<select 
                            className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-3 transition-colors duration-200"
                            value={studentID || ''}
                            onChange={(e) => setStudentID(e.target.value)}
                            required
                        >  
                            <option value="">Select Student</option>
                            {students.map((student) => (
                                <option key={student.user_id || student.id} value={student.user_id || student.id}>
                                    {student.first_name} {student.last_name}
                                </option>
                            ))}
                        </select>):(
                            <input
                            type="text"
                            className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-3 transition-colors duration-200"
                            value={student ? `${student.first_name} ${student.last_name}` : ''}
                            disabled
                        />
                        )}
                    </div>
                    <div className='flex items-center space-x-4 mb-4'>
                        <label className="block text-sm font-semibold w-32" htmlFor='course'>Course:</label>
                        <select 
                            className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-3 transition-colors duration-200"
                            value={selectedCourses}
                            onChange={(e) => setSelectedCourses(e.target.value)}
                            required
                        >  
                            <option value="">Select Course</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.course_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex items-center space-x-4 mb-4'>
                        <label className="block text-sm font-semibold w-32" htmlFor='status'>Status:</label>
                        <select 
                            className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-3 transition-colors duration-200"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >  
                            <option value="">Select Status</option>  
                            <option value="enrolled">Enrolled</option>  
                            <option value="completed">Completed</option> 
                            <option value="dropped">Dropped</option> 
                        </select>  
                    </div>  
                    <div className='flex justify-center gap-4'>
                        <button
                            type="submit"
                            className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded"
                        >
                            Enroll
                        </button>
                        <button
                            type="button"
                            className="bg-white outline outline-orange-700 hover:bg-gray-300 text-orange-700 px-4 py-2 rounded"
                            onClick={() => setOpenEnrollPopup(false)}
                        >   
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            {error && <p className='text-red-500 text-center'>{error}</p>}
            {message && <p className='text-green-500 text-center'>{message}</p>}
        </div>
    )
}

export default EnrollStudent



