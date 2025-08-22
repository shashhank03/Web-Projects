import React, { useState, useEffect } from 'react'
import axios from '../../utils/axiosConfig'
import EnrollStudent from '../AddCourses/EnrollStudent'
import Modal from '../modal/modal'

function AdminStudentCard() {
  const [students, setStudents] = useState([])
  const [openEnrollPopup, setOpenEnrollPopup] = useState(false)
  const [studentID, setStudentID] = useState('')

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = () => {
    axios.get('/api/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err))
  }

  return (
    <div>
      <h2 className="text-center text-2xl sm:text-2xl py-4 font-medium">
        Students & Courses
      </h2>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-300">
            <tr>
              <th className="border px-4 py-2 font-semibold">Student</th>
              <th className="border px-4 py-2 font-semibold">Courses</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-200">
                <td className="border px-4 py-2 font-semibold">
                  {student.first_name} {student.last_name}
                </td>
                <td className="border px-4 py-2">
                  {Array.isArray(student.courses)
                    ? student.courses.map((c) => c.course_name).join(', ')
                    : student.courses || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-4">
        <button
          className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded-full"
          onClick={() => setOpenEnrollPopup(true)}
        >
          Enroll Student
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

export default AdminStudentCard
