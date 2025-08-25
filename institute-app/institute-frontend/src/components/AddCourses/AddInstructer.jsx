import React, { useState, useEffect } from 'react'
import axios from '../../utils/axiosConfig';
import { useAuth } from '../Context/AuthContext';

function AddInstructer({ setOpenInstructerPopup, staffID, setStaffID }) {
  const [staff, setStaff] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const staff_id = staff.find(s => s.user_id === staffID);



  useEffect(() => {
    axios.get('/api/staff')
      .then(res => setStaff(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('/api/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (user.role !== 'Admin') {
      setStaffID(user.id || user.user_id);
    }
  }, [user]);

  const handleAddInstructer = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await axios.post('/api/staff/add-courses', {
        staff_id: staffID,
        course_id: selectedCourses

      });
      setMessage('Instructor added successfully');
      setError('');
      window.location.reload();
      if (setOpenInstructerPopup) {
        setOpenInstructerPopup(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Adding instructor failed');
      setMessage('');
    }
  }

  return (
    <div className="flex flex-col">
      <h2 className='text-2xl font-medium mb-6 text-center'>Add Course</h2>
      <div className='flex justify-center gap-4 mb-6'>
        <form onSubmit={handleAddInstructer} className="space-y-4">
          
          <div className='flex items-center space-x-4 mb-4'>
            <label className="block text-sm font-semibold w-32" htmlFor='staff'>Staff:</label>
            {user.role === 'Admin' ? (
              <select
                className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-3 transition-colors duration-200"
                value={staffID || ''}
                onChange={(e) => setStaffID(e.target.value)}
                required
              >
                <option value="">Select Staff</option>
                {staff.map((staff) => (
                    <option key={staff.user_id || staff.id} value={staff.user_id || staff.id}>
                    {staff.first_name} {staff.last_name}
                    </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-3 transition-colors duration-200"
                value={user.first_name + ' ' + user.last_name}
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

          <div className='flex justify-center gap-4'>
            <button
              type='submit'
              className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded"
            >
              Add Course
            </button>
            <button
              type='button' 
              className="bg-white outline outline-orange-700 hover:bg-gray-300 text-orange-700 px-4 py-2 rounded"
              onClick={() => setOpenInstructerPopup(false)}
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

export default AddInstructer
