import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddStudent from '../AddUser/AddStudent';

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [openStudentPopup, setOpenStudentPopup]=useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex justify-between items-center mb-4 mt-8'>
        <div></div>
          <h2 className="text-2xl font-bold">Student Details</h2>
            <button
              onClick={() => setOpenStudentPopup(true)}
              className="text-white bg-orange-700 hover:bg-orange-800 rounded-lg px-4 py-3"
            >
              Add Student
            </button>
      </div>
      {   
        openStudentPopup && 
          <div className='fixed inset-0 bg-gray-400 bg-opacity-10 flex justify-center items-center z-50'>
            <div className='rounded-lg shadow-xl p-8 bg-white max-w-md w-full mx-4 relative'>
              <h2 className='text-2xl font-medium mb-6 text-center'>Add Student</h2>
                <button 
                  className='absolute top-4 right-4 outline outline-red-600 text-red-600 hover:text-white bg-white hover:bg-red-700 font-medium rounded-lg text-sm px-1.5 py-0.9'
                  onClick={() => setOpenStudentPopup(false)}
                >X
                  </button>
                  <AddStudent/>
            </div>
          </div>
      }
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-300">
            <tr>
              <th className="border px-4 py-2 ">Name</th>
              <th className="border px-4 py-2 ">Email</th>
              <th className="border px-4 py-2 ">Phone</th>
              <th className="border px-4 py-2 ">Gender</th>
              <th className="border px-4 py-2 ">DOB</th>
              <th className="border px-4 py-2 ">Address</th>
              <th className="border px-4 py-2 ">Courses</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-200">
                <td className="border px-4 py-2">
                  {student.first_name} {student.last_name}
                </td>
                <td className="border px-4 py-2">{student.email}</td>
                <td className="border px-4 py-2">{student.phone_number}</td>
                <td className="border px-4 py-2">{student.gender}</td>
                <td className="border px-4 py-2">
                  {student.date_of_birth?.split("T")[0]}
                </td>
                <td className="border px-4 py-2">
                  {student.street}, {student.city}, {student.state} -{" "}
                  {student.pin_code}, {student.country}
                </td>
                <td className="border px-4 py-2">{student.courses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default StudentDetails;
